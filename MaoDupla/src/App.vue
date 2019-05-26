<template>
  <v-app id="app"  data-app=true>
    <v-toolbar app dark color="#47CA58" >
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
          v-for="(item, index) in items"
          :key="item.title"
          @click="callFuncDrawer(index)"
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
      <router-view ></router-view>
      
    </v-content>
  </v-app>
</template>

<script>
import router from './router'
  export default {
    components: {
    },
    data () {
    return {
      drawer: null,
      items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ],
    }
  },
  methods: {
    callFuncDrawer(index){
      switch(index){
        case 0 :
           router.push({ name: 'main'})
          break
      }
    }
  },
  }
</script>

<style>

.logoToolBar{
  width: 50px;
  height: 50px;
}
</style>