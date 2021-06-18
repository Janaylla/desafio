<template>
  <div id="app">
    <Header />
     <b-button  href="/pokedex" v-b-toggle.sidebar-right variant="outline-primary" class="buttonShowPokes">
        <b-icon icon="menu-button-wide-fill"></b-icon> Pokedex</b-button>
    <div class="pokemons">
      <CardPokemon
        v-for="(pokemon, index) in pokemons"
        :key="index"
        :name="pokemon.name"
      />
    </div>

      <div class="overflow-auto" 
        v-on:click.prevent="setPage">
    <div >
   
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        size="sm"
        align="center"
        pills
      ></b-pagination>
    </div>
  </div>
  </div>
</template>

<script>
import Vue from "vue";
import { apiPokemons} from "../services/api";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { PaginationPlugin } from "bootstrap-vue";
Vue.use(PaginationPlugin);
import { BPagination } from "bootstrap-vue";
Vue.component("b-pagination", BPagination);
// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "../globalStyle.css";
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
import Header from "../components/Header.vue";
import CardPokemon from "../components/CardPokemon.vue";
export default {
  name: "App",
  components: {
    Header,
    CardPokemon,
  },
  data() {
    return {
      rows: 1118,
      currentPage: 1,
      perPage: 30,
      pokemons: []
    };
  },
  methods: {
    setPage:async function () {
      apiPokemons
        .get(`/pokemon?limit=${this.perPage}&offset=${(this.currentPage - 1) * 30}`)
        .then((res) => {
          this.pokemons = res.data.results;
        })
    }
  },
  mounted(){
    this.setPage()
  }
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
.buttonShowPokes{
  position: fixed;
  top: 0;
  right: 0;
  margin: 20px;
  background-color: white;
}
</style>
