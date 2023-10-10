<script setup lang="ts">


import {testList} from "../store";
import {searchByDate, serchByName, serchValue} from "@/firestore";
import {ref} from "vue";
import {IonDatetime} from "@ionic/vue";
import {DateTime, Info} from "luxon";
import {startOfDay} from "@fullcalendar/core/internal";
import months = Info.months;

let nameToSearch = ref('');
let startDate = ref<any>(DateTime.now());
let endDate = ref<any>(DateTime.now());

function searchByDateRange() {
 let start: any = new Date(startDate.value);
  let end: any  = new Date(endDate.value);
   start = start.setHours(0, 0, 0, 0);
   end = end.setHours(23, 59, 59, 999);
   console.log('ostateczny test' + start);
  searchByDate(start, end);
}
</script>

<template>
  <div class="namePickerWrapper">
    <input type="text" v-model="nameToSearch" placeholder="Search by name">

    <button @click="serchByName(nameToSearch)">Search by Name</button>
  </div>


  {{serchValue}}

  {{nameToSearch}}
  <div class="datePickerWrapper">
    <div class="datePickers">
     <div class="fromAndTo">From: {{new Date(startDate).toLocaleDateString()}}</div>
<ion-datetime class="startTime " presentation="date" :prefer-wheel="true" v-model="startDate"></ion-datetime>
    </div>
    <div class="datePickers">
      <div class="fromAndTo"> To:{{new Date(endDate).toLocaleDateString()}} </div>
<ion-datetime  class="endTime" presentation="date" :prefer-wheel="true" v-model="endDate"></ion-datetime>
    </div>
    <button class="searchByNameButton" @click="searchByDateRange()" >Search by Date</button>
  </div>


  {{endDate.toLocaleString()}}
  {{new Date(startDate).getTime()}}
  {{new Date(endDate).getTime()}}
  {{testList}}
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
.searchByNameButton {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 1px;
  font-size: 1.1rem;
  cursor: pointer;
  color: #ff0000;
  border-radius: 5px;
  border: grey 1px solid;

  background-color: #ececb5;
}
.namePickerWrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin: 8px 0;
}
.namePickerWrapper button {
  padding: 1px;
  font-size: 1.1rem;
  cursor: pointer;
  color: #ff0000;
  border-radius: 5px;
  border: grey 1px solid;
  background-color: #ececb5;
}
.namePickerWrapper input {
  padding: 3px;
  font-size: 1.1rem;
  cursor: pointer;

  border-radius: 5px;
  border: grey 1px solid;

}
</style>