
<template>
  <b-card
    :id="'card' + name"
    no-body
    :class="
      pokemonSelected === name ? 'notShow overflow-hidden' : 'overflow-hidden'
    "
  >
    <div>
      <b-col class="b-col">
          <h4>{{ `${level}` }}</h4>
        <b-card-body :title="name">
          <b-card-img
            :src="pokemon.imgUrl"
            alt="Image"
            class="rounded-0"
          ></b-card-img>
        </b-card-body>
      </b-col>
    </div>
    <b-button
      pill
      v-on:click="editPokedex"
      :variant="pokemon.pokedex ? 'danger' : 'outline-danger'"
      :class="pokemonSelected === name ? 'notShow' : ''"
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
    updatedPokedex: {
      type: Function,
      required: false,
    },
    pokemonSelected: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      pokemon: {
        imgUrl: "",
        pokedex: false,
      },
      setPokemon: function () {
        apiPokemons.get(`/pokemon/${this.name}`).then((res) => {
          this.pokemon.imgUrl =
            res.data.sprites.versions["generation-v"]["black-white"].animated
              .front_default || res.data.sprites.front_default;
          console.log(res.data.sprites.front_default);

          this.pokemon.name = this.name;
          this.selected = this.pokemon.pokemonSelected === this.pokemonSelected;
          apiPokedeks
            .get(`/existsPokedex/Janaylla/${this.name}`)
            .then((res) => {
              this.pokemon.pokedex = res.data.exist;
              this.updatedPokedex();
            });
        });
      },
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
    },
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
.notShow button {
  display: none !important;
}
.notShow {
  border: solid red 1px;
  -webkit-box-shadow: 0px 0px 10px 10px rgba(255, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 10px 10px rgba(255, 0, 0, 0.75);
  box-shadow: 0px 0px 10px 10px rgba(255, 0, 0, 0.75);
}
.b-col {
  width: 150px;
}
.overflow-hidden {
  height: 250px;
  display: flex;
  flex-direction: column;
}
.overflow-hidden > div {
  flex-grow: 1;
}
</style>