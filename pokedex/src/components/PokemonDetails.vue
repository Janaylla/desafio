
<template>
  <div id="'card'+this.name" class="pokemon">
    <h1 id="title">{{ name }}</h1>
    <div class="informationBasics">
      <div class="img">
        <img :src="pokemon.imgUrl" :alt="`Image${name}`" />
      </div>
      <ul>
        <li>
          <h4>ID:</h4>
          <h5>{{ pokemon.textid }}</h5>
        </li>
        <li>
          <h4>Weight:</h4>
          <h5>{{ pokemon.weight / 10 }} Kg</h5>
        </li>
        <li>
          <h4>Height:</h4>
          <h5>{{ pokemon.height / 10 }} m</h5>
        </li>
      </ul>
    </div>
    <div class="details">
      <div class="list">
        <ul>
          <li>
            <h4>Tipes</h4>
            <div class="type">
              <b-button
                v-for="(type, index) in pokemon.types"
                :key="`type${+index}`"
                pill
                disabled
                :class="`${type.type.name} button`"
                size="sm"
              >
                {{ type.type.name }}
              </b-button>
            </div>
          </li>

          <li>
            <h4>Abilities</h4>
            <div class="abilities">
              <b-button
                v-for="(ability, index) in pokemon.abilities"
                :key="`type${+index}`"
                class="button"
                pill
                disabled
                size="sm"
                variant="outline-danger"
              >
                {{ ability.ability.name }}</b-button
              >
            </div>
          </li>
        </ul>
        <div>
          <h4>States</h4>
          <div v-for="(stat, index) in pokemon.stats" :key="stat" class="stats">
            <div>
              <span>{{ stat.stat.name }}</span
              ><span>{{ stat.base_stat }}</span>
            </div>
            <div>
              <b-progress
                :value="stat.base_stat / 2"
                :key="index"
                :animated="true"
                variant="danger"
              ></b-progress>
            </div>
          </div>
        </div>
        <div class="evolution">
          <div class="title">
            <h4>Evolution</h4>
            <div class="pokes">
              <CardPokeEvolutin
                v-for="(pokemon, index) in pokemon.pokemonsEvolutin"
                :updatedPokedex="updatedPokedex"
                :key="index"
                :name="pokemon.name"
                :pokemonSelected="name"
                :level="pokemon.level"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
     <b-button
      pill
      v-on:click="editPokedex"
      :variant="pokemon.pokedex ? 'danger' : 'outline-danger'"
    >
      {{ pokemon.pokedex ? "Remover" : "Adicionar" }}
    </b-button>
  </div>
</template>

<script>
import { apiPokedeks, apiPokemons } from "../services/api";
import CardPokeEvolutin from "../components/CardPokeEvolutin.vue";

export default {
  components: {
    CardPokeEvolutin,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    updatedPokedex: {
      type: Function,
      required: false,
    },
  },
  data() {
    return {
      pokemon: {
        imgUrl: "",
        height: 0,
        weight: 0,
        types: [],
        abilities: [],
        stats: [
          {
            stat: {
              name: "hp",
            },
            base_stat: 0,
          },
          {
            stat: {
              name: "attack",
            },
            base_stat: 0,
          },
          {
            stat: {
              name: "defense",
            },
            base_stat: 0,
          },
          {
            stat: {
              name: "special-attack",
            },
            base_stat: 0,
          },
          {
            stat: {
              name: "special-defense",
            },
            base_stat: 0,
          },
          {
            stat: {
              name: "speed",
            },
            base_stat: 0,
          },
        ],
        pokedex: true,
        id: 0,
        pokemonsEvolutin: [],
        textid: "000",
      },
      setPokemon: function () {
        apiPokemons.get(`/pokemon/${this.name}`).then((res) => {
          let { height, weight, imgUrl, types, abilities, stats, id, textid } =
            this.pokemon;
          this.getSpecie(res.data.id);
          id = res.data.id;
          height = res.data.height;
          weight = res.data.weight;
          imgUrl =
            res.data.sprites.versions["generation-v"]["black-white"].animated
              .front_default || res.data.sprites.front_default;
          types = res.data.types;
          abilities = res.data.abilities;
          stats = res.data.stats;

          if (id > 100) textid = `${id}`;
          else if (id > 10) textid = `0${id}`;
          else textid = `00${id}`;
          console.log(res.data);
          this.pokemon = {
            ...this.pokemon,
            height,
            weight,
            imgUrl,
            types,
            abilities,
            stats,
            id,
            textid,
          };
        });
         apiPokedeks
            .get(`/existsPokedex/Janaylla/${this.name}`)
            .then((res) => {
              this.pokemon.pokedex = res.data.exist;
              this.updatedPokedex();
            });
      },
      getSpecie: function (id) {
        apiPokemons.get(`/pokemon-species/${id}`).then((res) => {
          const idEvolution = res.data.evolution_chain.url.replace(
            "https://pokeapi.co/api/v2/evolution-chain/",
            ""
          );
          this.getEvolution(idEvolution);
        });
      },
      getEvolution: function (id) {
        console.log(`/evolution_chain/${id}`);
        apiPokemons.get(`/evolution-chain/${id}`).then((res) => {
          const pokemoonsEvolutin = [];
          console.log(res.data.chain);
          let poke = res.data.chain;
          while (poke) {
            pokemoonsEvolutin.push({...poke.species, level:pokemoonsEvolutin.length+1});
            poke = poke["evolves_to"] ? poke["evolves_to"][0] : false;
          }
          this.pokemon.pokemonsEvolutin = pokemoonsEvolutin;
          console.log(pokemoonsEvolutin[0].name);
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
};
</script>

<style scope>
.pokemon {
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
}
.details {
  display: flex;
}
.list ul {
  display: flex;
  flex-direction: column;
  width: 700px;
}
.list ul li {
  display: flex;
  align-items: center;

  flex-direction: column;
}
.list ul li div {
  flex-direction: row;
}
.list ul li h4 {
  width: 100%;
}
h4 {
  font-size: 20px;
  font-weight: 600;
}
h5 {
  font-size: 20px;
  font-weight: 400;
  margin: 0 10px;
}
.informationBasics {
  display: flex;
  align-items: center;
  justify-items: center;
  margin: 30px;
}
.informationBasics ul {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.informationBasics ul li {
  display: flex;
}
.img {
  width: 400px !important;
  height: 200px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px grey solid;
  
  -webkit-box-shadow: 0px 0px 15px 15px rgba(255, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 15px 15px rgba(255, 0, 0, 0.75);
  box-shadow: 0px 0px 15px 15px rgba(255, 0, 0, 0.75);
}
.img img {
  min-width: auto;
  min-height: auto;
  min-width: 60%;
  min-height: 60%;
}
.evolution {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 40px 0;
}
.pokes,
.type,
.abilities {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}
.stats {
  width: 100%;
}
.stats div:first-child {
  display: flex;
  justify-content: space-between;
}
.button {
  margin: 0px 10px;
  opacity: 1 !important;
}
.grass {
  background: rgb(3, 139, 44) !important;
}
.poison {
  background: rgb(74, 7, 105) !important;
}
.water {
  background: rgb(8, 135, 219) !important;
}
.dragon {
  background: rgb(27, 2, 68) !important;
}
.ice {
  background: rgb(78, 199, 255) !important;
}
.flying {
  background: rgb(145, 215, 255) !important;
}
.fire {
  background: rgb(238, 135, 17) !important;
}
.ghost {
  background: rgb(74, 52, 87) !important;
}
.fighting {
  background: rgb(122, 0, 0) !important;
}
.normal {
  background: rgb(104, 104, 104) !important;
}
.psychic {
  background: rgb(195, 0, 255) !important;
}
.bug {
  background: rgb(52, 87, 6) !important;
}
.dark {
  background: rgb(43, 43, 43) !important;
}
.steel {
  background: rgb(116, 116, 116) !important;
}
.fairy {
  background: rgb(255, 28, 174) !important;
}
.eletric {
  background: rgb(255, 217, 1) !important;
}
.rock {
  background: rgb(88, 95, 100) !important;
}
.ground {
  background: rgb(92, 70, 70) !important;
}
</style>