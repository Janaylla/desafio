<template>
  <div id="app">Not founf</div>
</template>

<script>
import Vue from "vue";
import { PaginationPlugin } from "bootstrap-vue";
Vue.use(PaginationPlugin);
import { BPagination } from "bootstrap-vue";
Vue.component("b-pagination", BPagination);

export default {
  name: "NotFound",
};
</script>
