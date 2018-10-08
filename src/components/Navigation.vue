<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <router-link :to="{ name: 'Home', params: {} }" class="navbar-item">
        {{ brand }}
      </router-link>
      <button class="navbar-burger" data-target="navMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div id="navMenu" class="navbar-menu is-transparent">
      <div class="navbar-end">
        <a v-if="authenticated" class="navbar-item" @click="handleLogout()">Log Out</a>
        <a class="navbar-item button develop_button" disabled @click="handleLogin()">
          Developer
          <p class="fa fa-sign-in nav-bar-icon" aria-hidden="true"></p>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import router from './../router'

export default {
  name: 'navigation',
  props: ['brand'],
  components: {},
  data() {
    return {
    }
  },
  mounted() {
    this.buildHamburger()
  },
  computed: {
    authenticated() {
      //TODO: Implement authentication.
      return false
    }
  },
  methods: {
    handleLogin: function() {
      //TODO: Implement authentication (for now redirect to home).
      router.replace('Home')
    },
    handleLogout: function() {
      //TODO: Implement authentication.
    },
    buildHamburger: function() {
      // Get all "navbar-burger" elements
      var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)

      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(function ($el) {
          $el.addEventListener('click', function () {

            // Get the target from the "data-target" attribute
            var target = $el.dataset.target
            var $target = document.getElementById(target)

            // Toggle the class on both the "navbar-burger" and the "navbar-menu"
            $el.classList.toggle('is-active')
            $target.classList.toggle('is-active')
          })
        })
      }
    }
  }
}
</script>
<style scoped>
.develop_button {
  margin: 8px;
}

.navbar {
  border-bottom: 1px solid #1073ba;
  z-index: 10000;
}

.navbar-brand .navbar-item {
  font-weight: bold;
  color: #1073ba;
}

.navbar-burger{
  border: 0;
}

.navbar-sperator {
  margin: auto 0;
  padding-top: 2px;
}

.navbar-end .navbar-item {
  font-style: italic;
}

.nav-bar-icon {
  margin: auto 0;
  padding-left: 8px;
}

.control{
  margin-top: 0.45em;
  margin-left: 16px;
}
.control input {
  font-style: italic;
  color: #4a4a4a;
  padding: 0;
  border: none;
  border-radius:0;
}
.control input:focus, .control input:hover {
  -moz-box-shadow:    none;
  -webkit-box-shadow: none;
  box-shadow:         none;
  border: none;
}
.control input::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: #b5b5b5;
}
.control input::-moz-placeholder { /* Firefox 19+ */
  color: #b5b5b5;
}
.control input:-ms-input-placeholder { /* IE 10+ */
  color: #b5b5b5;
}
.control input:-moz-placeholder { /* Firefox 18- */
  color: #b5b5b5;
}
.no-shadow {
  -moz-box-shadow:    none;
  -webkit-box-shadow: none;
  box-shadow:         none;
}
a.navbar-item:active, a.navbar-item:hover{
  color: #1073ba;
}
</style>
