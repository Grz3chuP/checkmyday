<script setup lang="ts">
import {computed, onUpdated, ref, watch} from "vue";
import { IonButton, IonInput, IonItem, IonLabel, IonRange, IonIcon } from '@ionic/vue';
import {cash, cashOutline} from "ionicons/icons";
import {addJobItemToFireStore} from "@/firestore";
import {getJobList, nameValue, userIsLogged, userUid} from "@/store";

const nameProps = defineProps(['nameUsed']);

const nameUsed = computed(() => {
 if (!nameProps.nameUsed) {
   return
 }
  console.log(nameProps.nameUsed);
 jobName.value = nameProps.nameUsed;

})

async function addJob() {
  if (!jobName.value || userIsLogged.value === false) {
    return
  }
  const t = new Date().getTime();
  const newJob = {
    name: jobName.value.trim(),
    date: t,
    pay: pay.value
  }
  lastJob.value = newJob;
  await addJobItemToFireStore(newJob, 'users/' + userUid.value +'/joblist')
getJobList()
  jobName.value = '';
  pay.value = 40;
}

const lastJob = ref<any>('');
const jobName = ref('');
const jobDate = ref('');
const jobTime = ref('');
const jobPay = ref(0);
const pay = ref(40);

const lastJobAdd = computed(() => {
  if(!lastJob.value || userIsLogged.value === false) {
    return 'no job added yet'
  }
  return new Date(lastJob.value.date).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
});


</script>

<template>
{{nameUsed}}
<section>
  <fieldset class="backG">
    <ion-item color="light">
      <ion-label position="floating">Job Name</ion-label>
      <ion-input type="text" v-model="jobName"></ion-input>
    </ion-item>
    <ion-item color="light"  >
      <ion-label class="cashLabel" position="floating">Job Pay
      <ion-item color="light"  class="cashIconWithMoney">
        <ion-icon :icon="cashOutline"></ion-icon>
        {{pay}}
      </ion-item>
      </ion-label>

    <ion-range class="randgeSlider"
               aria-label="Range with custom ticks"
               :pin="true"
               :step="5"
               :ticks="true"
               :snaps="true"
               :min="0"
               :max="100"

               v-model="pay" > {{pay}}</ion-range>
    </ion-item>
    <ion-button @click="addJob" >Add Job</ion-button>
  </fieldset>
  <div class="lastJobWrapper">
    <div class="lastJobTitle">Last Job </div>
    <div class="lastJobName">
      {{lastJob.name}}
    </div>
    <div class="lastJobPay">
    {{lastJob.pay}}
    </div>
    <div class="lastJobDate">
   {{lastJobAdd}}
    </div>

  </div>


</section>

</template>

<style scoped>
ion-item {
  overflow: visible;
}

.backG {
  background-color: beige;
  display: flex;
  flex-direction: column;
}
ion-range {
  --bar-background: #a2d2ff;
  --bar-background-active: #bde0fe;
  --bar-height: 8px;
  --bar-border-radius: 6px;
  --knob-background: #03650c;
  --knob-size: 30px;
  --pin-background: #33af0a;
  --pin-color: #fff;

}
.randgeSlider {
  margin: 0;
  padding: 5px 0 0 0;
}
.cashLabel {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
fieldset {

  border: rgba(13, 13, 13, 0.4) 1px solid;
  border-radius: 5px;
  box-shadow: rgba(128, 128, 128, 0.7) 1px 2px 4px 0;
}
.lastJobWrapper {
  gap: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  padding: 10px;
  border: rgba(13, 13, 13, 0.4) 1px solid;
  border-radius: 5px;
  box-shadow: rgba(128, 128, 128, 0.7) 1px 2px 4px 0;
  background-color: beige;
}
.lastJobTitle {
  font-size: 1.2rem;
  border-bottom: rgba(128, 128, 128, 0.6) solid 1px;
  width: max-content;
  padding: 2px 10px;
}
</style>