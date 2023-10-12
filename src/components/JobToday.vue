<script setup lang="ts">

import {getJobList, jobList, userUid} from "../store";
import {computed, ref} from "vue";
import {deleteJobItemFromFireStore} from "@/firestore";

const today = ref(new Date().getDate())

const todayJobs = computed(() => {

 return jobList.value.filter(job => {
   let startOfTheDay = new Date().setHours(0, 0, 0, 0);
   let endOfTheDay = new Date().setHours(23, 59, 59, 999);

   return new Date(job.date).getTime() >= startOfTheDay && new Date(job.date).getTime() <= endOfTheDay

 })
});

function deleteJob(job: any) {
console.log('users/'+ userUid + '/joblist');
  deleteJobItemFromFireStore(job, 'users/'+ userUid.value + '/joblist');
  getJobList()
}
</script>

<template>
  <div class="todayJobsWrapper">
    <div class="todayJobs" v-for="job in todayJobs">
      <div class="removeJobButton" @click="deleteJob(job)">X</div>
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
  position: relative;
 background-color: beige;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
  box-shadow:  grey 2px 4px 6px 0;
  border-radius: 5px;
  border:  rgba(13, 13, 13, 0.4) 1px solid;
  padding: 5px;
}
.removeJobButton {
  position: absolute;
  top: 0;
  right: 0;
  padding: 1px;
  font-size: 1.5rem;
  cursor: pointer;
  color: #ff0000;
  border-radius: 5px;
  border-left:  rgba(13, 13, 13, 0.4) 1px solid;
  border-bottom:  rgba(13, 13, 13, 0.4) 1px solid;

  background-color: #ececb5;
}
.removeJobButton:hover {
  background-color: #ff0000;
  color: #ffffff;
}
</style>