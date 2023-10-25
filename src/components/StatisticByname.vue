<script setup lang="ts">
import {computed} from "vue";
import {jobList, nameToSearch} from "@/store";

let singleNamesInJobList: string[] = [...new Set(jobList.value.map((item: any) => item.name))].sort();
const nameToStatisticByLetters = computed( () => {
  try {

    console.log('imina' + singleNamesInJobList);
    let searchText: string = nameToSearch.value.toLowerCase();

    let listOfNameToSearch = singleNamesInJobList.filter(item => item.toLowerCase().includes(searchText));
    if (listOfNameToSearch.length === 0) {
      return ['no event in database!']
    } else {
      return listOfNameToSearch
    }
  } catch (e: any) {
    // console.log(e);
    if (e instanceof Error) {
      alert(`Error caught: ${e.message}`);
    } else {
      // Handle any other types of errors or re-throw
      alert(`Error caught'`);
    }
  }

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
  text-wrap: nowrap;

}
</style>