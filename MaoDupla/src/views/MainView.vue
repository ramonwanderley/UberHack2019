<template>
<v-container 
    justify-start
    align-start
    fluid
    width="100%"
    height="100%"
     class="View pa-0 ma-0"
     style="height: 100%">
  <router-view></router-view>
  <GmapMap
      ref="mapRef"
      :center="{lat:-8.0538900	, lng: -34.8811100}"
      :zoom="15"
      map-type-id="terrain"
      style="width: 100%; height: 100%"
      :options="{
        streetViewControl: false,
        zoomControl: false,
         fullscreenControl: false,
        disableDefaultUi: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
      }"
    >
     </GmapMap>
      <v-bottom-sheet v-model="call" ref="bottom" >
      <v-card
    class="mx-auto"
    color="#47CA58"
    dark
    max-width="100%"
  >
   <v-btn
              absolute
              dark
              fab
              top
              right
              color="#16e206"
              @click="readQRCode"
            >
        
              <v-icon>vpn_key</v-icon>
            </v-btn>
    <v-card-title>
      <v-icon
        large
        left
      >
        directions_car
      </v-icon>
      <span class="title font-weight-light">{{selectCar.model}}</span>
      <span style="margin-left: 20px" class="title font-weight-light">{{this.selectCar.plate}}</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      {{this.startDate  + " - " + this.endDate  }}
    </v-card-text>

    <v-card-actions>
      <v-list-tile class="grow">
        <v-list-tile-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{selectCar.ownerName}}</v-list-tile-title>
        </v-list-tile-content>

        <v-layout
          align-center
          justify-end
        >
          
          <span class="subheading">4.8</span>
          <v-icon class="mr-1">start</v-icon>
        </v-layout>
      </v-list-tile>
    </v-card-actions>
  </v-card>
    </v-bottom-sheet>
</v-container>
</template>

<script>
import router from '../router'
import axios from 'axios'
function getUserMedia(options, successCallback, failureCallback) {
  var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;
  if (api) {
    return api.bind(navigator)(options, successCallback, failureCallback);
  }
}
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      drawer: null,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ],
      personMark: undefined,
      map: undefined,
      call: false,
      carsInfo:[],
      carMasks:[],
      selectCar:{
        model: ''}
    }
  },
  mounted() {
  var myParent = this
  this.$refs.mapRef.$mapPromise.then((map) => {  
       this.personMark = new google.maps.Marker({
          map: map,
          title: 'Hello World!',
          animation: google.maps.Animation.DROP,
        });
        var infoWindow = this.personMark
        this.map = map
        
        google.maps.event.addListener(this.personMark, 'click', this.markerClicked() );
    
        //Tentativa de localização pelo HTML5
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            //centralização da tela no usuário
            infoWindow.setPosition(pos);   
            map.setCenter(pos);
            navigator.geolocation.watchPosition(myParent.updateUserPosition)
          }, function (error) {
            },
            {timeout:10000}
            );
      } 
      else {
          // Quando o browser não tem suporte pra HTML
          handleLocationError(false, infoWindow, map.getCenter());
      }
    }) 
      this.$refs.mapRef.$mapPromise.then((map) => {  
          axios.post('https://x647przbde.execute-api.us-east-1.amazonaws.com/default',{operation: "list"})
            .then(response => {
              const cars = response.data.Items
              for (var carIndex = 0; carIndex < cars.length; carIndex++ ){
                this.carsInfo.push(cars[carIndex])
                this.carMasks.push( new google.maps.Marker({
                  map: map,
                  animation: google.maps.Animation.DROP,
                  title: 'Car ' + carIndex,
                  icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                  position:{
                    lat: cars[carIndex].coordinates.lat,
                    lng: cars[carIndex].coordinates.lon
                  }
                  })
                );
                google.maps.event.addListener(this.carMasks[carIndex], 'click', () => {
                  myParent.markerClicked(carIndex)
                });
              }
            }
          )
      })      
  },
  computed: {
    
    startDate(){
      if(this.selectCar.startTime != undefined ){
      var date = new Date(this.selectCar.startTime*1000);
      var day = date.getDate()
      var month = date.getMonth()
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      return( day+ "/" + month + ", " + hours + ':' + minutes.substr(-2))
      }
      else{
        return "today"
      }
    },
    endDate(){
     if(this.selectCar.startTime != undefined ){
      var date = new Date(this.selectCar.endTime*1000);
      var day = date.getDate()
      var month = date.getMonth()
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      return( day+ "/" + month + ", " + hours + ':' + minutes.substr(-2))
      }
      else{
        return "today"
      } 
    }
  },
  methods: {
    
    readQRCode(){
        router.push({ name: 'qrcode', params: { carId: this.selectCar.id }})
    },
    updateUserPosition(location){
      var pos = {
              lat: location.coords.latitude,
              lng: location.coords.longitude
            };

      this.personMark.setPosition(pos);
      this.map.setCenter(pos);
    },
    markerClicked(index){
    this.selectCar = this.carsInfo[index -1 ]
     this.call = true
    }
  },

}
</script>


