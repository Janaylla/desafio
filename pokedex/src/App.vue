<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { PaginationPlugin } from "bootstrap-vue";
Vue.use(PaginationPlugin);
import { BPagination } from "bootstrap-vue";
Vue.component("b-pagination", BPagination);
// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./globalStyle.css";
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
export default {
  name: "App",
};
</script>

<style scope>
.pokemons {
  justify-content: center;
  flex-wrap: wrap;
  display: flex;
  flex-grow: 1;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
