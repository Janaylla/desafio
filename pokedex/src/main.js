import Vue from 'vue'
import Pokedex from './screens/Pokedex.vue'
import NotFound from './screens/NotFound.vue'
import Login from './screens/Login.vue'
import Home from './screens/Home.vue'
import VueRouter from  'vue-router'

Vue.use(VueRouter)
let notLogin = false;
const routes = {
  '/': Home,
  '/pokedex': Pokedex,
  '/login': Login
}
Vue.config.productionTip = false;

if(!window.localStorage.getItem('token') && window.location.pathname != "/login"){
  notLogin = true;
  window.location.href = '/login'
}
new Vue({
  el: '#app',
  data: {
    currentRoute: notLogin? '/login' : window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
})