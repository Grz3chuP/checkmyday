<script setup lang="ts">


import {computed, ref} from "vue";
import {IonButton} from "@ionic/vue";
import {getJobList, jobList} from "@/store";
import {DateTime} from "luxon";

let prevMonthNumber = ref<any>(0)
let firstDayOfMonth = ref<any>(0)
let lastDayOfMonth = ref<any>(0)
let currentMonth = ref<any>('')
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
  let lastDay = currentDate.endOf('month');
   firstDayOfMonth = DateTime.local(year, month, 1, 0, 0, 0).minus({ months: Math.abs(prevMonthNumber.value)  });
   lastDayOfMonth = DateTime.local(year, month, lastDay.day, 23, 59, 59).minus({  months: Math.abs(prevMonthNumber.value)});
  firstDayOfMonth = new DateTime(firstDayOfMonth).toMillis();
  currentMonth.value = new Date(firstDayOfMonth).toLocaleDateString('en-GB', {
    month: 'long'
  });
  lastDayOfMonth = new DateTime(lastDayOfMonth).toMillis();
  return jobList.value.filter(item => {
   // return new Date(item.date).getTime() >= firstDayOfMonth && new Date(item.date).getTime() <= lastDayOfMonth
     return item.date >= firstDayOfMonth && item.date <= lastDayOfMonth;
  })
});
function goBack() {

  prevMonthNumber.value -= 1;


}
</script>

<template>
<section>
  <div class="monthButtons">
    <ion-button @click="goBack"> Prev Month</ion-button>
    <ion-button @click="prevMonthNumber = 0"> This Month</ion-button>
  </div>
  <div class="monthName">
    {{currentMonth}}
  </div>
  <div class="totalMonthPay">

    Month Total:
    <p>{{startOfTheMonth.reduce((acc, item) => acc + item.pay, 0)}}</p>
  </div>
  <div class="totalNumberOfJobs">
   Jobs:
    <p> {{startOfTheMonth.length}} </p>
  </div>



</section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 10px;
}
.totalMonthPay {
  display: flex;
  align-items: center;

}
p {
  margin: 0 5px;
  font-size: 1.5rem;
}
.totalNumberOfJobs {
  display: flex;
  align-items: center;

}
.monthButtons ion-button{
  font-size: 0.8rem;
}
</style>