<template>
<div class="container">
  <router-link :to="{name: 'Home'}">Home</router-link> | 
  <router-link :to="{name: 'login'}">Login</router-link> | 
  <router-link :to="{name: 'register'}">Register</router-link> |
  <router-view></router-view>
</div>
</template>

<script>
import showBlogsVue from "./components/Blogs/showBlogs.vue"
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


