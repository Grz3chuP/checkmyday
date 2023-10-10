<script setup lang="ts">


import {testList} from "../store";
import {serchByName, serchValue} from "@/firestore";
import {ref} from "vue";

let nameToSearch = ref('');

</script>

<template>
  <input type="text" v-model="nameToSearch" >
<button @click="serchByName(nameToSearch)">wisla</button>
  {{serchValue}}
  {{testList}}
  {{nameToSearch}}

</template>

<style scoped>

</style>