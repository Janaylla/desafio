<template>
  <div id="todo">
  <div id="login">
      <h3>Faça seu login/cadastro para acessar a pokedex, você só precisa de um nome de usurio e uma senha</h3>
   <b-form-input v-on:click="login" v-model="userName" placeholder="Enter your userName"></b-form-input>
   <b-form-input v-model="password" placeholder="Enter your password"></b-form-input>
  <b-button pill   variant="primary">Login/Cadastrar</b-button>
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
          password: ''
      }
  },
  methods: {
      login: function(){
          const body = {userName: this.userName, password: this.password};
          apiPokedeks.post("/singup", body).then((res) => {
            
              console.log(res)
              window.localStorage.setItem('token', res.data.token)
              window.location.href = '/'
          }).catch((erro) => {
              console.log(erro)
          })
      }
  }
};
</script>

<style scope>

#todo {
    display: flex;
    width: 100%;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
}
#login{
    width: 500px;
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
