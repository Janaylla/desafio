<template>
  <div id="app">
    <Header page="pokedex" />
    <div>
      <b-sidebar
        backdrop-variant="dark"
        id="sidebar-right"
        title="Pokedex"
        right
        shadow
      >
        <div class="px-3 py-2">
          <div class="pokedex">
            <b-list-group class="ul">
              <CardPokedexRow
                v-for="(pokemon, index) in pokemons"
                :key="index"
                :name="pokemon.name"
                :setPokemonSelected="setPokemonSelected"
                :pokemonSelected="pokemonSelected"
              />
            </b-list-group>
          </div>
        </div>
      </b-sidebar>
    </div>
    <div class="pokemon">
      <PokemonDetails
        :key="pokemonSelected"
        :name="pokemonSelected"
        :updatedPokedex="updatedPokedex"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { apiPokedeks } from "../services/api";
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
import PokemonDetails from "../components/PokemonDetails.vue";
import CardPokedexRow from "../components/CardPokedexRow.vue";
export default {
  name: "App",
  components: {
    Header,
    PokemonDetails,
    CardPokedexRow,
  },
  data() {
    return {
      rows: 1,
      currentPage: 1,
      perPage: 24,
      pokemons: [],
      pokemonSelected: "",
    };
  },
  methods: {
    setPokedex: async function () {
      apiPokedeks
        .get(`/pokedex`)
        .then((res) => {
          this.pokemons = res.data.pokemons.map((pokeName, index) => {
            if (index === 0 && this.pokemonSelected === "")
              this.pokemonSelected = pokeName;
            return { name: pokeName };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setPokemonSelected: function (name) {
      this.pokemonSelected = name;
    },
    updatedPokedex: function () {
      this.setPokedex();
    },
  },

  mounted() {
    this.setPokedex();
  },
  update() {
    this.setPokedex();
  },
};
</script>

<style scope>
.pokemons {
  justify-content: center;
  flex-wrap: wrap;
  display: flex;
  flex-grow: 1;
  align-items: center;
  width: 100%;
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
