
<template>
<div>
  <div v-if="name" class="pokemon">
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
        <li>
          <b-button
            pill
            v-on:click="editPokedex"
            :variant="pokemon.pokedex ? 'danger' : 'outline-danger'"
          >
            {{ pokemon.pokedex ? "Remover" : "Adicionar" }}
          </b-button>
        </li>
      </ul>
    </div>
    <div class="details">
      <div class="list">
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
        <h4>Abilities</h4>
        <div class="abilities">
          <b-button
            v-for="(ability, index) in pokemon.abilities"
            :key="`ability${index}`"
            class="button"
            pill
            size="sm"
            :variant="pokemon.pokemonsAbilitySelectd ===  ability.ability.name?'danger':'outline-danger'"
            v-on:click="
              () =>
                getSpecieByAbilite(ability.ability.url, ability.ability.name)
            "
          >
            {{ ability.ability.name }}</b-button
          >
        </div>
        <div class="pokes">
          <CardPokeEvolutin
            v-for="(pokemon, index) in pokemon.pokemonsAbility"
            :updatedPokedex="updatedPokedex"
            :key="`pokemon${index}`"
            :name="pokemon.pokemon.name"
            :pokemonSelected="name"
          />
        </div>
        <div>
          <h4>States</h4>
          <div
            v-for="(stat, index) in pokemon.stats"
            :key="`stat${index}`"
            class="stats"
          >
            <div>
              <span>{{ stat.stat.name }}</span
              ><span>{{ stat.base_stat }}</span>
            </div>
            <div>
              <b-progress
                :value="stat.base_stat / 2"
                :key="`stat${index}`"
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
                :key="`pokemon${index}`"
                :name="pokemon.name"
                :pokemonSelected="name"
                :level="pokemon.level"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    Parece que você não capturou nenhum pokemon
  </div>
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
        pokemonsAbility: [],
        textid: "000",
        pokemonsAbilitySelectd: "",
      },
      setPokemon: function () {
        apiPokemons.get(`/pokemon/${this.name}`).then((res) => {
          if(this.name){
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
          console.log(res.data.abilities);
          stats = res.data.stats;

          if (id >= 100) textid = `${id}`;
          else if (id >= 10) textid = `0${id}`;
          else textid = `00${id}`;
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
          }
        });
        apiPokedeks.get(`/existsPokedex/${this.name}`).then((res) => {
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
        apiPokemons.get(`/evolution-chain/${id}`).then((res) => {
          const pokemoonsEvolutin = [];
          let poke = res.data.chain;
          while (poke) {
            pokemoonsEvolutin.push({
              ...poke.species,
              level: pokemoonsEvolutin.length + 1,
            });
            poke = poke["evolves_to"] ? poke["evolves_to"][0] : false;
          }
          this.pokemon.pokemonsEvolutin = pokemoonsEvolutin;
        });
      },
      getSpecieByAbilite: function (url, name) {
        const idAbility = url.replace("https://pokeapi.co/api/v2/ability/", "");
        console.log(idAbility);
        if (name === this.pokemon.pokemonsAbilitySelectd) {
          this.pokemon.pokemonsAbilitySelectd = "";
          this.pokemon.pokemonsAbility = [];
        } else {
          apiPokemons.get(`/ability/${idAbility}`).then((res) => {
            console.log(res.data.pokemon[0].pokemon.name);
            this.pokemon.pokemonsAbility = res.data.pokemon;
          });
          this.pokemon.pokemonsAbilitySelectd = name;
        }
      },
    };
  },
  methods: {
    editPokedex: function () {
      this.setPokemon();
      apiPokedeks.put(`/pokedex/${this.name}`).then(() => {
        this.setPokemon();
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
  width: 100%;
}
.details {
  display: flex;
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
  width: auto;
  flex-wrap: wrap;
  flex-direction: row;
}
.informationBasics ul {
  display: flex;
  flex-direction: column;
}
.informationBasics ul li {
  display: flex;
}

.informationBasics .img {
  width: 200px !important;
  height: 200px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px grey solid;
  margin: 20px;
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
.evolution{
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 40px 0;
}
.pokes{
  display: flex;
  justify-content: center;
  margin: 10px 0;
  flex-wrap: wrap;
  width: 90%;
  max-width: 800px;
}
.stats {
  width: 100%;
  max-width: 600px;
  align-self: center;
  margin: auto;
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