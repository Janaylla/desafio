import Vue from 'vue'
import Pokedex from './screens/Pokedex.vue'
import NotFound from './screens/NotFound.vue'
import Home from './screens/Home.vue'
import VueRouter from  'vue-router'

Vue.use(VueRouter)

const routes = {
  '/': Home,
  '/pokedex': Pokedex
}
Vue.config.productionTip = false
new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
})