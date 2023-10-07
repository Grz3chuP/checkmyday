<script setup lang="ts">

import {getJobList, jobList, todayPay} from "../store";
import {getJobListFromFireStoreOrEmptyArray} from "@/firestore";
import JobAdd from "@/components/JobAdd.vue";
import JobToday from "@/components/JobToday.vue";


getJobList()


</script>

<template>
  <section>

    <JobAdd/>
    {{todayPay}}
    <JobToday/>
  </section>

</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  background-color: #ffffff;
  margin: 10px;
}
</style>