<script setup lang="ts">

import {computed, reactive, ref} from "vue";
import {IonIcon, IonButton} from "@ionic/vue";
import {getJobList, jobList} from "@/store";
import {DateTime} from "luxon";
import {refresh} from "ionicons/icons";
import {IDniTygodnia} from "@/Interfaces/IDniTygodnia";
import HistoryMonth from "@/components/HistoryMonth.vue";

getJobList();

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const thisWeekList = ref<any[]>([]);
const minusWeek = ref([0, 604800000, 1209600000, 1814400000, 2419200000, 3024000000, 3628800000, 4233600000,4838400000, 5443200000, 6048000000 ]);
const minusWeekNumber = ref(0);
let firstDayOfWeek = ref<any>(0)
let lastDayOfWeek = ref<any>(0)
function changeWeek() {
  if (minusWeekNumber.value < 10) {
    minusWeekNumber.value += 1;
  }

}

// const thisWeekItems = computed(() => {
//
//   const currentDate = new Date();
//   const firstDayOfWeek = new Date(currentDate);
//   firstDayOfWeek.setHours(0, 0, 0, 0);
//   firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay());
//
//   const lastDayOfWeek = new Date(firstDayOfWeek);
//   lastDayOfWeek.setHours(23, 59, 59, 999);
//   lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
//
//  return jobList.value.filter(job => {
//    const jobDate = new Date(job.date);
//
//     return  jobDate >= firstDayOfWeek  && jobDate <= lastDayOfWeek
//
//  });
//
// })
function showWeekStartAndEnd (time: any) {
  let dayToPick = time;
  console.log('dzien 1' +dayToPick);
  dayToPick = new Date(dayToPick);
  console.log('dzien 2' +dayToPick);
  const monthToPick = dayToPick.getMonth() + 1;
  dayToPick = dayToPick.getDate();

  const finaleTime = dayToPick + '/' + monthToPick;
  console.log('dzien 3' +dayToPick);
  return finaleTime;
}

const thisWeekItems = computed(() => {
  const currentDate = DateTime.now();
   firstDayOfWeek = +currentDate.startOf('week').setLocale('en-GB') - minusWeek.value[minusWeekNumber.value]  ;
   lastDayOfWeek = +currentDate.endOf('week').setLocale('en-GB') - minusWeek.value[minusWeekNumber.value];

 // firstDayOfWeek = firstDayOfWeek.setLocale('en-GB');
 // lastDayOfWeek = lastDayOfWeek.setLocale('en-GB');
//  firstDayOfWeek -= minusWeek.value[minusWeekNumber.value];
//  lastDayOfWeek -= minusWeek.value[minusWeekNumber.value];
  console.log('start ' + firstDayOfWeek + firstDayOfWeek.day);
  console.log('i koniec' + lastDayOfWeek.toLocaleString({weekday: 'long'}));
  return jobList.value.filter(job => {
    const jobDate = DateTime.fromMillis(job.date).setLocale('en-GB');

    console.log(jobDate);
    return +jobDate >= firstDayOfWeek && +jobDate <= lastDayOfWeek;
  });
});

function addJob(day: any) {

//console.log(thisWeekList.date.toLocaleString({weekday: 'long'} ));
  return thisWeekItems.value.filter(job => {
    const jobDate = DateTime.fromMillis(job.date).setLocale('en-GB');
    console.log('jobDate ' + jobDate);
    console.log(jobDate.weekdayLong)
    return jobDate.weekdayLong === day;
  });
  console.log('nowa dzienna lista ' + day + thisWeekItems);
  //console.log('test' + thisWeek[day].jobs );

}



const thisWeek = ref <IDniTygodnia[]>([
  {day: 'Monday', jobs: []},
  {day: 'Tuesday', jobs: []},
  {day: 'Wednesday', jobs: []},
  {day: 'Thursday', jobs: []},
  {day: 'Friday', jobs: []},
  {day: 'Saturday', jobs: []},
  {day: 'Sunday', jobs: []},

]);

const addDayJobs = computed(() => {
  thisWeek.value.forEach(day => {
    day.jobs = addJob(day.day);
  })
})

// Monday: {day: 'Monday', jobs: [addJob(0)]},
// Tuesday: {day: 'Tuesday', jobs: [addJob(1)]},
// Wednesday: {day: 'Wednesday', jobs: [addJob(2)]},
// Thursday: {day: 'Thursday', jobs: [addJob(3)]},
// Friday: {day: 'Friday', jobs: [addJob(4)]},
// Saturday: {day: 'Saturday', jobs: [addJob(5)]},
// Sunday: {day: 'Sunday', jobs: [addJob(6)]},
const weekTotalPay = computed(() => {
  let total = 0;
  thisWeekItems.value.forEach(job => {
    total += job.pay;
  })
  return total;
})

</script>

<template>
  <!--<FullCalendar :options="options"/>-->
  <div class="topBar">
    <div class="buttonsWrapper" >
      <div class="refresh" @click="getJobList"><ion-icon :icon="refresh" size="large"  > </ion-icon></div>
      <div class="weekButtons">
        <ion-button @click="changeWeek "> Prev Week </ion-button>
        <ion-button @click="minusWeekNumber = 0 "> This Week</ion-button>
      </div>
    </div>

    <div class="weekTotal">
      <div>Week: {{showWeekStartAndEnd(firstDayOfWeek)}} - {{showWeekStartAndEnd(lastDayOfWeek)}}</div>

    </div >
    <div style="display: flex; align-items: center ">
    Total:
    <div class="weekTotalPay">{{weekTotalPay}}</div>
    </div>
    <div style="display: flex; align-items: center ">
      Jobs:
      <div >{{thisWeekItems.length}}</div>
    </div>
  </div>


  <div class="historyWrapper">
    <div v-for="day in thisWeek" class="thisWeek">
      <div class="singleDay">
        <div class="weekName">
          <div>
            {{ day.day }}
            {{ addDayJobs }}
          </div>

        </div>
        <div class="noJob">
          {{ day.jobs.length === 0 ? 'no jobs'  : '' }}
        </div>
        <div v-for="job in day.jobs" class="singleJob">

         <div style="max-width: 90px; white-space: nowrap; overflow: hidden" >{{ job.name }}</div>
          {{ job.pay }}
        </div>
        <div>

        </div>
      </div>

    </div>


  </div>
  <div v-if="jobList.length">

    <HistoryMonth/>

  </div>

</template>

<style scoped>
.buttonsWrapper {
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;
}
.weekButtons ion-button {
  font-size: 0.8rem;
  padding: 0;
}

.weekTotal{
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100%;
  background-color: #ffffff;
  margin: 5px;
}
.topBar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 100%;
  background-color: #ffffff;
  margin: 10px 0 0 30px;
}
.weekTotalPay {
 padding: 5px;

  font-size: 2rem;
 width: fit-content;

}
.historyWrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 100%;
  background-color: #ffffff;
  margin: 10px;
}

.thisWeek {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 5px;
  box-shadow: grey 1px 2px 4px 0;
  border-radius: 5px;
  background-color: beige;
  width:100%;
  height: 30px;
  padding: 5px;
  margin: 5px;
}

.singleDay {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 5px;
  width: 100%;
  height: 100%;
  padding: 5px;


}

.singleJob:first-child {
  justify-content: end;
}

.singleJob {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: fit-content;
  height: fit-content;
  padding: 5px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #ffffff;

}

.weekName {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 5px;
  width: 15%;
}

@media (max-width: 500px ) {
  .weekName {
    width: 23%;
    font-size: 0.8rem;
  }
  .singleJob {
    font-size: 0.8rem;
  }
  .noJob {
    font-size: 0.8rem;
  }
}
ion-icon {
  color: #007c08;
}
.refresh {
  position: absolute;
  width: fit-content;
  top: 0;
  left: 0;
  margin: 5px;
  padding: 0;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: grey 1px 2px 4px 0;
}
</style>