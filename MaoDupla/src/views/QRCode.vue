<template>
<v-content>
  <router-view></router-view>
  <qrcode-stream  @decode="onDecode"></qrcode-stream>
  <v-snackbar
      v-model="snackbar"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
</v-content>
</template>

<script>
import router from '../router'
import axios from 'axios'
  export default {
    components: {
    },
    data() {
      return {
        snackbar: false,
        color: 'success',
        mode: 'vertical',
        timeout: 6000,
        text: 'Carro desbloqueado com sucesso!'
        
      }
    },
    mounted() {
      
    },
    methods: {
      onDecode (decodedString) {
        axios.post('https://x647przbde.execute-api.us-east-1.amazonaws.com/default',{operation: "unlock", id: this.$route.params.carId, key: decodedString })
            .then(response => {
              this.snackbar = true
            }
          )
      }
}
  }
</script>
