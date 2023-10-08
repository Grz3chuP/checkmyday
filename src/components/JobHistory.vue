<script setup lang="ts">
// dodany kalendaz ale nie dzialal za dobrze
// import '@fullcalendar/core';
// import FullCalendar from "@fullcalendar/vue3";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import listPlugin from "@fullcalendar/list";
// import interactionPlugin from "@fullcalendar/interaction";

// const options = reactive({
//   plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
//   initialView: 'dayGridMonth'
// })
import {computed, reactive, ref} from "vue";
import {IonIcon} from "@ionic/vue";
import {getJobList, jobList} from "@/store";
import {DateTime} from "luxon";
import {refresh} from "ionicons/icons";

getJobList();

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const thisWeekList = ref<any[]>([]);
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


const thisWeekItems = computed(() => {
  const currentDate = DateTime.now();
  let firstDayOfWeek = currentDate.startOf('week');
  let lastDayOfWeek = currentDate.endOf('week');
  firstDayOfWeek = firstDayOfWeek.setLocale('en-GB');
  lastDayOfWeek = lastDayOfWeek.setLocale('en-GB');
  console.log('start ' + firstDayOfWeek + firstDayOfWeek.day);
  console.log('i koniec' + lastDayOfWeek.toLocaleString({weekday: 'long'}));
  return jobList.value.filter(job => {
    const jobDate = DateTime.fromMillis(job.date).setLocale('en-GB');

    console.log(jobDate);
    return jobDate >= firstDayOfWeek && jobDate <= lastDayOfWeek;
  });
});

function addJob(day: any) {

//console.log(thisWeekList.date.toLocaleString({weekday: 'long'} ));
  return thisWeekItems.value.filter(job => {
    const jobDate = DateTime.fromMillis(job.date).setLocale('en-GB');
    console.log('jobDate ' + jobDate);
    return jobDate.weekdayLong === day;
  });
  console.log('nowa dzienna lista ' + day + thisWeekItems);
  //console.log('test' + thisWeek[day].jobs );

}


const thisWeek = ref([
  {day: 'Monday', jobs: null},
  {day: 'Tuesday', jobs: null},
  {day: 'Wednesday', jobs: null},
  {day: 'Thursday', jobs: null},
  {day: 'Friday', jobs: null},
  {day: 'Saturday', jobs: null},
  {day: 'Sunday', jobs: null},

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
    <div class="refresh" @click="getJobList"><ion-icon :icon="refresh" size="large"  > </ion-icon></div>
    <div class="weekTotal">
      <div>Week Total:</div>
      <div class="weekTotalPay">{{weekTotalPay}}</div>
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

          {{ job.name }}
          {{ job.pay }}
        </div>
        <div>

        </div>
      </div>

    </div>


  </div>
  <div v-if="jobList.length">

    {{ thisWeekItems }}

  </div>
  {{ addJob(6) }}
  {{ thisWeek }}
</template>

<style scoped>
.topBar {
  display: flex;

  align-items: center;
  gap: 5px;
  width: 100%;
  background-color: #ffffff;
  margin: 10px 0 0 30px;
}
.weekTotalPay {
 padding: 5px;
  margin: 10px;
  font-size: 2rem;
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
</style>