<template>
<v-content>
  <router-view></router-view>
  <qrcode-stream  @decode="onDecode"></qrcode-stream>
</v-content>
</template>

<script>
import router from '../router'
import axios from 'axios'
  export default {
    components: {
    },
    mounted() {
      
    },
    methods: {
      onDecode (decodedString) {
        console.log(decodedString)
        console.log(this.$route.params.carId)
        axios.post('https://x647przbde.execute-api.us-east-1.amazonaws.com/default',{operation: "unlock", id: this.$route.params.carId, key: decodedString })
            .then(response => {
              console.log(response)
              
            }
          )
      }
}
  }
</script>
