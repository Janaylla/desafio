
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
        <b-card-body :title="'#' + textid + ' ' + name" class="b-col-tilte">
        </b-card-body>
        <div class="b-col-img">
          <b-card-img :src="pokemon.imgUrl" alt="Image"></b-card-img>
        </div>
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
    pokemonSelected: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      pokemon: {
        imgUrl: "",
        pokedex: false,
        textid: "",
      },
      setPokemon: function () {
        apiPokemons.get(`/pokemon/${this.name}`).then((res) => {
          this.pokemon.imgUrl =
            res.data.sprites.versions["generation-v"]["black-white"].animated
              .front_default || res.data.sprites.front_default;
          this.pokemon.name = this.name;
          this.selected = this.pokemon.pokemonSelected === this.pokemonSelected;
          const id = res.data.id;
          if (id >= 100) this.textid = `${id}`;
          else if (id >= 10) this.textid = `0${id}`;
          else this.textid = `00${id}`;

          apiPokedeks.get(`/existsPokedex/${this.name}`).then((res) => {
            this.pokemon.pokedex = res.data.exist;
          });
        });
      },
    };
  },
  methods: {
    editPokedex: function () {
      this.setPokemon();
      apiPokedeks
        .put(`/pokedex/${this.name}`)
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
.b-col {
  width: 150px;
}
.overflow-hidden {
  height: 350px;
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 20px;
}
.overflow-hidden img {
  max-height: 100%;
}
.b-col-img {
  flex-grow: 1;
  height: 200px;
  display: flex;
  align-items: center;
}
.b-col-tilte {
  padding: 0;
}
.b-col-img img {
  max-height: 100%;
}
</style>