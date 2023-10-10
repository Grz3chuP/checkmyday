<script setup lang="ts">


import {testList} from "../store";
import {serchByName, serchValue} from "@/firestore";
import {ref} from "vue";
import {IonDatetime} from "@ionic/vue";

let nameToSearch = ref('');
let startDate = ref('');
let endDate = ref('');

</script>

<template>
  <input type="text" v-model="nameToSearch" >
<button @click="serchByName(nameToSearch)">wisla</button>
  {{serchValue}}
  {{testList}}
  {{nameToSearch}}
  <div class="datePickerWrapper">
    <div class="datePickers">
     <div class="fromAndTo">From:</div>
<ion-datetime class="startTime " presentation="date" :prefer-wheel="true" v-model="startDate"></ion-datetime>
    </div>
    <div class="datePickers">
      <div class="fromAndTo"> To: </div>
<ion-datetime  class="endTime" presentation="date" :prefer-wheel="true" v-model="endDate"></ion-datetime>
    </div>
  </div>
  {{startDate}}
</template>

<style scoped>
.datePickerWrapper {
    position: relative;
    display: flex;
  width: 100%;

}
ion-datetime {

  padding: 0;
  margin: 0;
  font-size: 0.5rem;
  scale: 0.5;
  border: #0d0d0d 1px solid;
  border-radius: 10px;
  box-shadow: rgba(128, 128, 128, 0.7) 1px 4px 2px 2px;

}
.startTime .endTime {
 position: absolute;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;

}

.datePickers {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 0;
  padding: 0;
}
.fromAndTo {
  position: absolute;
  top: 15px;
}
</style>