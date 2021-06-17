
<template>
  <b-card :id="'card'+this.name" no-body class="overflow-hidden" md="10" style="max-width: 400px">
    <div>
      <b-row no-gutters class="b-row">
        <b-col class="b-col">
          <b-card-img
            :src="pokemon.imgUrl"
            alt="Image"
            class="rounded-0"
          ></b-card-img>
        </b-col>
        <b-col class="b-col">
          <b-card-body :title="name">
            <b-card-text>
              {{ name }}, {{ pokemon.weight }},

              {{ pokemon.height }}
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </div>
    <b-button
      pill
      v-on:click="editPokedex"
      :variant="pokemon.pokedex ? 'danger' : 'outline-danger'"
    >
      {{ pokemon.pokedex ? "Remover" : "Adicionar" }}
    </b-button>
  </b-card>
</template>

<script>
import { apiPokedeks, apiPokemons } from "../services/api";


export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    updatedPokedex:{
      type: Function,
      required: false,
    }
  },
  data() {
    return {
      pokemon: {
        imgUrl: "",
        height: 0,
        weight: 0,
        pokedex: false
      },
      setPokemon: function () {
        apiPokemons.get(`/pokemon/${this.name}`).then((res) => {
          // this.pokemon = res.data.results;weight
          this.pokemon.height = res.data.height;
          this.pokemon.weight = res.data.weight;
          this.pokemon.imgUrl =
            res.data.sprites.versions["generation-v"][
              "black-white"
            ].animated.front_default || res.data.sprites.front_default;
             console.log(res.data.sprites.front_default);
          apiPokedeks
            .get(`/existsPokedex/Janaylla/${this.name}`)
            .then((res) => {
              this.pokemon.pokedex = res.data.exist;
            });
        });
      }
    };
  },
  methods: {
      editPokedex: function () {
        this.setPokemon();
        apiPokedeks
          .put(`/pokedex/Janaylla/${this.name}`)
          .then(() => {
            this.setPokemon();
          })
          .catch((err) => {
            console.log(err);
          });
      }
  },
  beforeMount() {
    this.setPokemon();
  },
  updated() {
    this.setPokemon();
  },
};
</script>

<style scope>
.overflow-hidden {
  margin: 10px;
  display: flex;
  align-items: center;
  height: auto;
  padding: 10px;
}
.overflow-hidden > div {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}
.b-row > :first-of-type {
  display: flex;
  justify-items: center;
  align-items: center;
}
.b-row > :last-of-type {
  display: flex;
  flex-direction: column;
}
</style>