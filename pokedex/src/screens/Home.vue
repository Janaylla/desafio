<template>
  <div id="app">
    <Header page="home" :onClickSearch="setPageSearch" />
  <div>
      <b-sidebar
        backdrop-variant="dark"
        id="sidebar-right"
        title="Menu"
        right
        shadow
      >
        <div class="px-3 py-2">
          <div class="pokedex">
            <b-list-group class="ul">
              <b-nav-item href="/pokedex">
               <b-button
                variant="outline-primary"
                class="navButton"
              > <b-icon icon="circle-square"> </b-icon>Pokedex</b-button>
              </b-nav-item>
                <b-nav-item >
              <b-button
              v-on:click="logout"
                variant="outline-primary"
                class="navButton"
              >
               <b-icon icon="power"></b-icon> Logout</b-button>
                </b-nav-item>
            </b-list-group>
          </div>
        </div>
      </b-sidebar>
    </div>
    <div class="pokemons">
      <CardPokemon
        v-for="(pokemon, index) in pokemons"
        :key="index"
        :name="pokemon.name"
      />
    </div>
    {{ msg }}
    <div class="overflow-auto" v-on:click.prevent="setPage">
      <div>
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
import { apiPokemons } from "../services/api";
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
      pokemons: [],
      msg: ""
    };
  },
  methods: {
    setPage: async function (idPoke) {
      this.msg = ""
      apiPokemons
        .get(
          `/pokemon?limit=${idPoke>=0 && idPoke!=='null' ? 1:this.perPage}&offset=${idPoke>=0 && idPoke!=='null'?idPoke:(this.currentPage - 1) * 30}`
        )
        .then((res) => {
          this.pokemons = res.data.results;
        });
    },
    setPageSearch: async function (page, search) {
      this.msg = ""
      if(page === 0) this.pokemons=[];
      
      if(search === ""){
        this.setPage('null');
      }
      if(Number(search)>=0 && Number(search)<1118){
          this.setPage(Number(search));
      }
      else{
      await apiPokemons
        .get(`/pokemon?limit=50&offset=${50 * page}}`)
        .then((res) => {
          const pokes = res.data.results.filter((pokemon) => {
            return pokemon.name.includes(search.toLowerCase());
          });
          this.pokemons = [...this.pokemons,...pokes];
         
          if (this.pokemons.length >= 30) {
            this.pokemons.slice(30);
          }else if(((page + 1)*50) <= 1118) {
            this.setPageSearch(page + 1, search);
          }
          else{
            if(this.pokemons.length === 0)
            this.msg = "Não encontramos nenhum pokemon com este nome"
          }
        });
        }
    },
    logout: function (){
      window.localStorage.removeItem('token');
     window.location.href = '/login'
    }
  },
  mounted() {
    this.setPage();
  },
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
.ul *{
  list-style: none;
  
}
.ul li button{
  width: 100%;
}
</style>
