<template>
<div class="container">
  <a href="#/">Home</a> |
  <a href="#/login">Login</a> |
  <a href="#/register">Register</a>
  <component :is="currentView" />
</div>
</template>

<script>
import showBlogsVue from "./components/showBlogs.vue"
import loginVue from "./components/Authentification/login.vue"
import registrationVue from "./components/Authentification/registration.vue"

const routes = {
  '/': showBlogsVue,
  '/login': loginVue,
  '/register': registrationVue
}

export default {
  name: 'App',
  data(){
    return{
      currentPath: window.location.hash
    }
  },
  computed:{
    currentView(){
      return routes[this.currentPath.slice(1) || '/'] 
    }
  },
  mounted() {
    window.addEventListener('hashchange', () =>{
      this.currentPath = window.location.hash
    })
  },
}
</script>


