<script setup lang="ts">

import {changeNameValue, getJobList, jobList, todayPay} from "../store";
import {getAuth, signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth";
import JobAdd from "@/components/JobAdd.vue";
import JobToday from "@/components/JobToday.vue";
import {computed, ref} from "vue";
import LoginPanel from "@/components/LoginPanel.vue";


const nameUsed = ref('');



getJobList()
const thisDayLastJobs = computed( ()=> {
  const today = new Date().getDay();
  console.log(today);
  return jobList.value.filter(job => {
    const jobDate = new Date(job.date).getDay();
    console.log(jobDate);
    return jobDate === today
  })
})

const auth = getAuth();

const todayUniName = computed( () => {
  return [...new Set(thisDayLastJobs.value.map((item: any) => item.name))];
})

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
}

const signOutUser = async () => {
  await signOut(auth);
};

</script>

<template>
<!--  <button @click="signInWithGoogle">Sign in with Google</button>-->
<!--  <button @click="signOutUser">Sign out</button>-->
  <LoginPanel/>
  <section>
    <div class="uniNameWrapper">
    <div v-for="name in todayUniName" class="uniName">
      <button @click="nameUsed = name">{{name}}</button>
    </div>
    </div>


    <JobAdd :nameUsed="nameUsed"/>
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
.uniNameWrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  width: 100%;
  background-color: #ffffff;
  margin:5px;
}

.uniName {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  box-shadow: grey 1px 2px 4px 0;
  border-radius: 5px;
  border: rgba(13, 13, 13, 0.4) 1px solid;
  background-color: beige;
  font-size: 1rem;

}
.uniName button {
  background-color: beige;
  border-radius: 5px;
  font-size: 1rem;

  padding: 7px;
}
</style>