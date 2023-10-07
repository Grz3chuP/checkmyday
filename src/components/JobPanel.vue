<script setup lang="ts">

import {jobList} from "../store";
import {getJobListFromFireStoreOrEmptyArray} from "@/firestore";
import JobAdd from "@/components/JobAdd.vue";

async function getJobList() {
  jobList.value = await getJobListFromFireStoreOrEmptyArray('joblist');
}
getJobList()


</script>

<template>
  <section>
    <H1>
      DB test: {{jobList}}
    </H1>
    <JobAdd/>
  </section>

</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
}
</style>