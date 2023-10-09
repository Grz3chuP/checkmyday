<script setup lang="ts">


import {computed, ref} from "vue";
import {IonButton} from "@ionic/vue";
import {getJobList, jobList} from "@/store";
import {DateTime} from "luxon";

let prevMonthNumber = ref<any>(0)
const thisMonthList = computed(() => {
  return jobList.value.filter((item: any) => {
    console.log('lista w miesiacu' + new Date(item.date).getMonth());
    console.log(new Date(item.date).getMonth()  + prevMonthNumber.value);


    return new Date(item.date).getMonth()   === new Date().getMonth() + prevMonthNumber.value;
  });
});
const startOfTheMonth = computed(() => {
  const currentDate = DateTime.now();
  let month = currentDate.month;
  let year = currentDate.year;

  let firstDayOfMonth = DateTime.local(year, month, 1, 0, 0, 0).minus({ months: prevMonthNumber.value});


  let lastDay = firstDayOfMonth.endOf('day');
  console.log('ostatni miesiaca' + lastDay);
  let lastDayOfMonth = DateTime.local(year, month, lastDay.day, 23, 59, 59).minus({ months: prevMonthNumber.value});
      console.log('dzien miesiaca' + DateTime.local(2023, 10,1,0,0,0).minus({ months: 16}));
  console.log('dzien miesiaca PPPPPP' + firstDayOfMonth);
  firstDayOfMonth = firstDayOfMonth + prevMonthNumber.value;
  return firstDayOfMonth;
});
function goBack() {
  prevMonthNumber.value -= 1;


}
</script>

<template>
<section>
  <ion-button @click="goBack"> Prev Month</ion-button>
  {{prevMonthNumber}}
  {{thisMonthList.length}}
 {{startOfTheMonth}}
</section>
</template>

<style scoped>

</style>