<template>
  <div id="app">
    <navigation :brand="brand"></navigation>
    <notifications position="ne" class="notifications"></notifications>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import Notifications from './components/Notifications.vue'

export default {
  name: 'app',
  components: {
    Navigation,
    Notifications
  },
  data () {
    return {
      brand: 'Enschedata'
    }
  }
}
</script>

<style scoped>
  body, html {
    width: 100%;
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 0;
  }

  .notifications {
    margin-top: 55px;
  }
</style>
