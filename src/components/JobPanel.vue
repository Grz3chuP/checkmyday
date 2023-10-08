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
    <div class="todayTotalPay">
      {{todayPay}}

    </div>

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
.todayTotalPay {
 width: max-content;
  padding: 5px;
  border: rgba(13, 13, 13, 0.4) 1px solid;
  border-radius: 5px;
  box-shadow: grey 2px 4px 6px 0;
  background-color: beige;
  font-size: 1.5rem;
  color: #007c08
}
</style>