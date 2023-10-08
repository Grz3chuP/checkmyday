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
import {getJobList, jobList} from "@/store";
import {DateTime} from "luxon";

getJobList();

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const thisWeekList = ref <any[]>([]);
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
  console.log('i koniec' + lastDayOfWeek.toLocaleString({weekday: 'long' }));
  return jobList.value.filter(job => {
    const jobDate = DateTime.fromMillis(job.date).setLocale('en-GB');

   console.log(jobDate);
    return jobDate >= firstDayOfWeek && jobDate <= lastDayOfWeek;
  });
});

function addJob(day: any) {


//console.log(thisWeekList.date.toLocaleString({weekday: 'long'} ));
return  thisWeekItems.value.filter(job =>  {

  const jobDate = DateTime.fromMillis(job.date).setLocale('en-GB');
  console.log('jobDate ' + jobDate);
  return jobDate.weekdayLong === weekDays[day];
});
   console.log('nowa dzienna lista ' + day + thisWeekItems);
   //console.log('test' + thisWeek[day].jobs );

}


const thisWeek = reactive({
  Monday: {day: 'Monday', jobs: [addJob(0)]},
  Tuesday: {day: 'Tuesday', jobs: [addJob(1)]},
  Wednesday: {day: 'Wednesday', jobs: [addJob(2)]},
  Thursday: {day: 'Thursday', jobs: [addJob(3)]},
  Friday: {day: 'Friday', jobs: [addJob(4)]},
  Saturday: {day: 'Saturday', jobs: [addJob(5)]},
  Sunday: {day: 'Sunday', jobs: [addJob(6)]},
})

</script>

<template>
  <!--<FullCalendar :options="options"/>-->
  <div class="historyWrapper">
    <div v-for="day in thisWeek" class="thisWeek">
      <div>
        {{ day.day }}
        {{ day.jobs}}
        <div>

        </div>
      </div>

    </div>


  </div>
  <div v-if="jobList.length">

   {{thisWeekItems}}

  </div>


</template>

<style scoped>
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
  width: 95%;
  height: 30px;
  padding: 5px;
  margin: 5px;
}
</style>