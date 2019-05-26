<template>
  <v-app>
    <v-toolbar app dark color="#5054F0" >
    <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>

    <v-toolbar-title class="white--text">Mão Dupla</v-toolbar-title>
    <v-spacer></v-spacer>
    
  </v-toolbar>
   <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click=""
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <GmapMap
      ref="mapRef"
      :center="{lat:10, lng:10}"
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
      <!-- <v-card tile>
        <v-progress-linear
          :value="50"
          class="my-0"
          height="3"
        ></v-progress-linear>

        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{selectCar.model}}</v-list-tile-title>
              <v-list-tile-sub-title>Fitz & The Trantrums</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-spacer></v-spacer>

            <v-list-tile-action>
              <v-btn icon>
                <v-icon>fast_rewind</v-icon>
              </v-btn>
            </v-list-tile-action>

            <v-list-tile-action :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
              <v-btn icon>
                <v-icon>pause</v-icon>
              </v-btn>
            </v-list-tile-action>

            <v-list-tile-action :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }">
              <v-btn icon>
                <v-icon>fast_forward</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card> -->
      <v-card
    class="mx-auto"
    color="#26c6da"
    dark
    max-width="100%"
  >
   <v-btn
              absolute
              dark
              fab
              top
              right
              color="pink"
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
    </v-content>
  </v-app>
</template>

<script>

import HelloWorld from './components/HelloWorld'
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
    HelloWorld
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
  var meuPai = this
  this.$refs.mapRef.$mapPromise.then((map) => {  
       this.personMark = new google.maps.Marker({
          map: map,
          title: 'Hello World!',
        });
        var infoWindow = this.personMark
        this.map = map
        
        google.maps.event.addListener(this.personMark, 'click', this.markerClicked() );
    
        // Try HTML5 geolocation.
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);   
            map.setCenter(pos);
            navigator.geolocation.watchPosition(meuPai.updateUserPosition)
          }, function (error) {
            },
            {timeout:10000}
            );
      } 
      else {
          // Browser doesn't support Geolocation
          console.log('error')
          handleLocationError(false, infoWindow, map.getCenter());
      }
    }) 
      this.$refs.mapRef.$mapPromise.then((map) => {  
          axios.post('https://x647przbde.execute-api.us-east-1.amazonaws.com/default',{operation: "list"})
            .then(response => {
              console.log(response)
              const cars = response.data.Items
              for (var carIndex = 0; carIndex < cars.length; carIndex++ ){
                this.carsInfo.push(cars[carIndex])
                this.carMasks.push( new google.maps.Marker({
                  map: map,
                  title: 'Car ' + carIndex,
                  position:{
                    lat: cars[carIndex].coordinates.lat,
                    lng: cars[carIndex].coordinates.lon
                  }
                  })
                );
                google.maps.event.addListener(this.carMasks[carIndex], 'click', () => {
                  meuPai.markerClicked(carIndex)
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
      console.log(day)
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
      console.log('dale')
      if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
    !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
    alert('User Media API not supported.');
    return;
  }
  
  var constraints = {
    video: true
  };

  getUserMedia(constraints, function (stream) {
    var mediaControl = document.querySelector('video');
    if ('srcObject' in mediaControl) {
      mediaControl.srcObject = stream;
      mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
    } else if (navigator.mozGetUserMedia) {
      mediaControl.mozSrcObject = stream;
    }
    theStream = stream;
  }, function (err) {
    alert('Error: ' + err);
  });
  
    },
    updateUserPosition(location, verb){
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
     console.log(index)
    
    }
  },

}
</script>
