`
<script setup lang="ts">


import {testList, jobList} from "../store";
import {searchByDate, searchByName} from "@/firestore";
import {computed, ref} from "vue";
import {IonDatetime} from "@ionic/vue";
import {DateTime, Info} from "luxon";


function initWeekDays() {
  return [{

    name: 'Sunday',
    list: []
  }, {
    name: 'Monday',
    list: []
  }, {
    name: 'Tuesday',
    list: []
  }, {
    name: 'Wednesday',
    list: []
  }, {
    name: 'Thursday',
    list: []
  }, {
    name: 'Friday',
    list: []
  }, {
    name: 'Saturday',
    list: []
  }];
}

const weekDays = ref<any>(initWeekDays());
const jobListIsOn = ref(true);

let nameToSearch = ref('');
let startDate = ref<any>(DateTime.now());
let endDate = ref<any>(DateTime.now());

function searchByDateRange() {
  weekDays.value = initWeekDays();

  let start: any = new Date(startDate.value);
  let end: any = new Date(endDate.value);
  start = start.setHours(0, 0, 0, 0);
  end = end.setHours(23, 59, 59, 999);
  console.log('ostateczny test' + start);
  searchByDate(start, end).then((res: any) => {
    testList.value = res;
    pickWeekDay(testList.value);
  })
  // pickWeekDay(testList.value);


  // testList.value = [];

}


const pickWeekDay = (listName: any) => {
  weekDays.value.forEach((day: any, index: number) => {
    console.log('tttttt' + listName);
    day.list = dayFilter(index, listName);

  })
}

const dayFilter = (day: any, listName: any) => {
  console.log(listName)
  return listName.filter(job => {
    const jobOnWeekDay = new Date(job.date).getDay();
    console.log('jobOnWeekDay' + jobOnWeekDay);
    return jobOnWeekDay === day;
  })
};

const calculatingPercent = (day: any) => {
  if (!jobListIsOn.value) {
    return (day.list.length / testList.value.length) * 100;
  } else {
    return (day.list.length / jobList.value.length) * 100;
  }
}
async function clickSearchByName() {
  await searchByName(nameToSearch.value);
  pickWeekDay(testList.value);
  jobListIsOn.value=false;
}

</script>

<template>
  <div class="namePickerWrapper">
    <input type="text" v-model="nameToSearch" placeholder="Search by name">
 <div style="position: relative">
    <button class="searchByNameButton" @click="clickSearchByName()">Search by Name</button>
 </div>
  </div>

  <div style="position: relative">
    <div class="datePickerWrapper">
      <div class="datePickers">

        <ion-datetime class="startTime " presentation="date" :prefer-wheel="true" v-model="startDate"></ion-datetime>
      </div>
      <div class="datePickers">

        <ion-datetime class="endTime" presentation="date" :prefer-wheel="true" v-model="endDate"></ion-datetime>
      </div>

    </div>
    <div class="buttonSearchWrapper">
      <div class="fromAndTo">From: {{ new Date(startDate).toLocaleDateString() }}</div>
      <button class="searchByNameButton searchByDateButton" @click="searchByDateRange(); jobListIsOn=false">Search by Date</button>

      <div class="fromAndTo"> To:{{ new Date(endDate).toLocaleDateString() }}</div>
    </div>
  </div>
  <div style="width: 100%; display: flex; justify-content: center"   >
    <button class="showAllJobsButton" @click="pickWeekDay(jobList); jobListIsOn=true">Show All Jobs</button>
  </div>
  <div class="statisticOverviewWrapper">
    <div class="statisticOverview">
      <div class="statisticDay" v-for="day in weekDays">
        <div class="nameDay">{{ day.name }}</div>
        <div style="flex: 1; height: 100% ">
          <div class="testPercents" :style="{width: calculatingPercent(day) + '%',  backgroundColor: 'red' }">

            <div class="jobTotalAndJobNumbers"> {{ day.list.reduce((acc, item) => acc + item.pay, 0) }}</div>
            <div class="jobTotalAndJobNumbers"> {{ day.list.length }}</div>

          </div>
        </div>
      </div>
    </div>
  </div>

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
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 2px;
  font-size: 0.8rem;
  font-weight: bold;
  color: #0a1828;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: rgba(128, 128, 128, 0.7) 1px 2px 1px 0;
  border: grey 1px solid;
}

.showAllJobsButton {
  width: fit-content;

  padding: 3px;
  font-size: 1rem;
  cursor: pointer;
  color: #0d1105;
  border-radius: 5px;
  border: grey 1px solid;
  margin: 0 0 10px 0;
  background-color: #ececb5;
}

.buttonSearchWrapper {
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0;
  bottom: 15px;
  gap: 5px;
  z-index: 1;
}

.searchByNameButton {
  padding: 2px 11px;
  font-size: 1rem;
  cursor: pointer;
  color: #0d1105;
  border-radius: 5px;
  border: grey 1px solid;
  background-color: #ececb5;
}
.searchByNameButton:last-child::after {
  content: '';
  position: absolute;
  width: 15px;
  height: 15px;
  left: -5px;
  background-color: #ececb5;
  border-top: grey solid 1px;
  border-left: grey solid 1px;
  rotate: -45deg;
}
.searchByDateButton {
  position: relative;
}

.searchByDateButton::before {
  content: '';
  position: absolute;
  width: 15px;
  height: 15px;
  left: -7px;
  background-color: #ececb5;
  border-top: grey solid 1px;
  border-left: grey solid 1px;
  rotate: -45deg;

}
.searchByDateButton::after {
  content: '';
  position: absolute;
  width: 15px;
  height: 15px;
  right: -7px;
  background-color: #ececb5;
  border-top: grey solid 1px;
  border-left: grey solid 1px;
  rotate: 135deg;


}
.namePickerWrapper {
  display: flex;
  width: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin: 8px 0;
  z-index: 1;
}

.namePickerWrapper input {
  padding: 3px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  border: grey 1px solid;
}

.statisticDay {
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  box-shadow: grey 1px 2px 4px 0;
  border-radius: 5px;
  background-color: beige;
  width: 100%;
  height: 30px;
  padding: 5px;
  margin: 5px;
}

.statisticDay:first-child::after {
  content: 'Total: Pay | Jobs';
  position: absolute;
  left: 55px;
  top: -50%;
  font-size: 0.7rem;
}

.testPercents {
  display: flex;
  height: 100%;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  z-index: 1;
  transition: 0.4s ease-out;
}

.nameDay {
  font-size: 0.8rem;
  width: 70px;

}
.nameDay::after {
  content: '';
  position: absolute;
  width: 2px;
  height: 100%;
  background-color: #0a1828;
  top: 50%;
  transform: translateY(-50%);
  left: 75px;
  z-index: 2;

}

.jobTotalAndJobNumbers {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 9px;
  font-size: 0.8rem;
  min-width: 35px;
  width: 35px;
  background-color: rgba(255, 255, 255, 0.4);
  color: #000000;
}

</style>`