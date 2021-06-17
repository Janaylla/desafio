
<template>
<b-list-group-item class="li">
     <img
            :src="pokemon.imgUrl"
            alt="Image"
            class="rounded-0"
          />
     {{name}}
 </b-list-group-item>
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
        pokedex: false
      },
      setPokemon: function () {
        apiPokemons.get(`/pokemon/${this.name}`).then((res) => {
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
  beforeMount() {
    this.setPokemon();
  },
  updated() {
    this.setPokemon();
  },
};
</script>

<style scope>
.li{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-transform: capitalize;
}
.li img{
    height: 40px;
    margin-right: 10px;
}

</style>