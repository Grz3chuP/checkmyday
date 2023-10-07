<script setup lang="ts">

import {jobList} from "../store";
import {computed, ref} from "vue";

const today = ref(new Date().getDate())

const todayJobs = computed(() => {

 return jobList.value.filter(job =>new Date(job.date).getDate() === today.value)


});

</script>

<template>
  <div class="todayJobsWrapper">
    <div class="todayJobs" v-for="job in todayJobs">
      <div> {{job.name}}</div>
      <div>{{job.pay}}</div>
      <div>{{new Date(job.date).toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      })}}</div>



    </div>
  </div>


</template>

<style scoped>
.todayJobsWrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  width: 100%;
  background-color: #ffffff;
  margin: 10px;
}
.todayJobs {
 background-color: beige;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  box-shadow:  grey 2px 4px 6px 0;
  border-radius: 5px;
  border:  rgba(13, 13, 13, 0.4) 1px solid;
}


</style>