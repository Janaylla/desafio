<template>
  <div id="todo">
  <div id="login">
      <h3>Faça seu login/cadastro para acessar a pokedex, você só precisa de um nome de usurio e uma senha</h3>
   <b-form-input v-model="userName" placeholder="Your userName"></b-form-input>
   <b-form-input v-model="password" placeholder="Your password"></b-form-input>
   <div id="buttons">
  <b-button pill variant="primary" v-on:click="login" >Login</b-button>
  <b-button pill variant="primary" v-on:click="singup" >Cadastrar</b-button>

  <b-spinner v-if="loading" variant="primary"></b-spinner>
   </div>
  
  </div>
    </div>
</template>

<script>
import Vue from "vue";
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
import {apiPokedeks} from "../services/api"
export default {
  name: "Login",
  data() {
      return {
          userName: '',
          password: '',
          loading: false
      }
  },
  methods: {
      login: function(){
          this.loading = true;
          const body = {userName: this.userName, password: this.password};
          apiPokedeks.post("/login", body).then((res) => {
              window.localStorage.setItem('token', res.data.token)
              window.location.href = '/'
          }).catch(() => {
              this.loading = false;
          })
      },
      singup:  function(){
          this.loading = true;
          const body = {userName: this.userName, password: this.password};
          apiPokedeks.post("/singup", body).then((res) => {
              window.localStorage.setItem('token', res.data.token)
              window.location.href = '/'
          }).catch(() => {
              this.loading = false;
          })
      },
  }
};
</script>

<style scope>
#buttons{
    display: flex;
    align-items: center;
}
#buttons button{
    margin: 10px;
}
#todo {
    display: flex;
    width: 100%;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
}
#login{
    max-width: 500px;
    width: 80%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ff00006b;
    border-radius: 10px;
}
h3{
    font-size: 25px;
}
#login > input{
    margin: 10px 0;
}
</style>
