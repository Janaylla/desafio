
<template>
<div>
  <div id="nav">
    <b-navbar type="danger" variant="danger">
      <b-navbar-nav>
        <b-nav-item href="/"
          ><b-button
          class="homeButton"
            variant="outline-primary"
          >
            <b-icon icon="house-door"></b-icon>
          </b-button>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
  <div id="nav-space">
  </div>
</div>
</template>

<script>
import "core-js/stable";
import "regenerator-runtime/runtime";
import Vue from "vue";
import { BNavbar } from "bootstrap-vue";
Vue.component("b-navbar", BNavbar);

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#nav{
  position: fixed;
  width: 100vw;
  z-index: 1;
}
#nav-space{
  height: 100px;;
}
.homeButton{
  background-color: white;
}
.homeButton:hover{
  background-color: #0d6efd   ;
}
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
