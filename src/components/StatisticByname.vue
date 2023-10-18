<script setup lang="ts">
import {computed} from "vue";
import {jobList, nameToSearch} from "@/store";

const nameToStatisticByLetters = computed( () => {
   let singleNamesInJobList = [...new Set(jobList.value.map((item: any) => item.name))];
   console.log('imina' + singleNamesInJobList);
   let searchText = nameToSearch.value.toLowerCase();
   return  singleNamesInJobList.filter(item => item.toLowerCase().includes(searchText));

})
</script>

<template>

<div class="nameToStatisticWrapper" v-for="item in nameToStatisticByLetters" @click="nameToSearch = item; $emit('searchName')">
 {{item}}
</div>


</template>

<style scoped>
.nameToStatisticWrapper {
  padding: 4px;
  width: fit-content;
  background-color: #F5F5DC;
  border-radius: 5px;
  border: grey 1px solid;
  text-align: center;

}
</style>