
<template>
<div>
  <b-navbar type="danger" variant="danger">
    <b-navbar-nav>
      <b-nav-item href="pokedex">Pokedex</b-nav-item>

    </b-navbar-nav>
  </b-navbar>
</div>
 </template>

<script>
  import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import { BNavbar } from 'bootstrap-vue'
Vue.component('b-navbar', BNavbar)

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
