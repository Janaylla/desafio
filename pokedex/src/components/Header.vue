
<template>
  <div>
    <div id="nav">
      <b-navbar type="danger" variant="danger">
        <b-navbar-nav class="menu">
          <b-nav-item href="/" v-if="page === 'pokedex'"
            ><b-button class="navButton" id="house-door" variant="outline-primary">
              <b-icon icon="house-door"></b-icon>
            </b-button>
          </b-nav-item>
          <div v-else></div>

          <div v-if="page === 'home'" >
            <b-nav-item id="navHome">
                <div id="search">
                  <b-form-input
                    v-model="search"
                    placeholder="Name or ID"
                    class="text"
                  ></b-form-input>

                  <b-icon icon="search" class="icon" v-on:click="() => onClickSearch(0, search)"></b-icon>
                </div>
            </b-nav-item>
            <b-nav-item >
              <b-button
                variant="outline-primary"
                class="navButton"
                  v-b-toggle.sidebar-right
              >
                <b-icon icon="list"></b-icon></b-button
              >
            </b-nav-item>
          </div>
          <div v-else-if="page === 'pokedex'">
            <b-nav-item>
              <b-button
                v-b-toggle.sidebar-right
                variant="outline-primary"
                class="navButton"
              >
                <b-icon icon="circle-square"></b-icon> Pokemons
              </b-button>
            </b-nav-item>
          </div>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <div id="nav-space"></div>
  </div>
</template>

<script>
import "core-js/stable";
import "regenerator-runtime/runtime";
import Vue from "vue";
import { BNavbar } from "bootstrap-vue";
Vue.component("b-navbar", BNavbar);
import { FormInputPlugin } from "bootstrap-vue";
Vue.use(FormInputPlugin);

export default {
  name: "Header",
  props: {
    page: String,
    onClickSearch: Function,
  },
  data(){
    return{
      search: ''
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#nav {
  position: fixed;
  width: 100%;
  z-index: 1;
}
#nav-space {
  height: 100px;
}
.navButton {
  background-color: white;
  margin: 0 5px;
}
.navButton:hover {
  background-color: #0d6efd;
}
.menu {
  display: flex;
  justify-content: space-between;
  width: 100%;
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
}
#search {
  display: flex;
  align-items: center;
}
#search .text{
  margin: 0 10px ;
}
@media only screen and (max-width: 600px) {
  #navHome{
    display: flex;
    flex-wrap: nowrap;
  }
  .notShow{
    display: none;
  }
}
</style>
