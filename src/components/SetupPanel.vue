<script setup lang="ts">
import {setupIsOpen, stepValue} from "@/setup";
import {ref, computed} from "vue";
import {IonRange} from "@ionic/vue";
import {getSetupList, userIsLogged, userUid} from "@/store";
import {addItemFireStoreWithCustomId, addJobItemToFireStore} from "@/firestore";


function saveSetupPanel() {
  if(userIsLogged.value === false) {
    alert('You need to login first')

  }
  else {
    console.log(userIsLogged.value)
   addItemFireStoreWithCustomId({stepValue: stepValue.value}, 'users/' + userUid.value + '/setup', 'settings')
    setupIsOpen.value = !setupIsOpen.value;
  }
}




</script>

<template>

  <div>
    <div :class="{
    'setupPanelWrapper': setupIsOpen ,
    'setupPanelWrapperClose': !setupIsOpen
}">
      <div class="setupWrapper">
        <div class="setupTitle">Setup</div>
        <div class="setupStepsForCounts">
          <div class="stepsNameForCounts">Counts Steps:</div>
          <div class="stepsValueForCounts">{{ stepValue }}</div>
          <div class="stepsRangeWrapper">
            <ion-range class="randgeSlider"
                       aria-label="Range with custom ticks"
                       :pin="true"
                       :step="1"
                       :ticks="true"
                       :snaps="true"
                       :min="1"
                       :max="10"
                       v-model="stepValue"></ion-range>
          </div>
        </div>
        <div class="saveSetupButton">
          <ion-button @click=" saveSetupPanel() ">Save</ion-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.setupPanelWrapper {
  background-color: #eee4c6;
  position: absolute;
  width: 100%;
  height: 50%;
  z-index: 4;
  margin: 20px 0 0 20px;
  display: flex;
  animation: setupSlideIn 0.3s ease-in-out;
  border: grey 1px solid;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
@keyframes setupSlideIn {

  0%{
  transform: translateX(100%);
}
100%{
  transform: translateX(0);
}
}
@keyframes setupSlideOut {

  0%{
    left: 0;
    transform: translateX(0);
  }
  100%{
    transform: translateX(100%);
  }
}
.setupPanelWrapperClose {
  background-color: #eee4c6;
  left: 100%;
  position: absolute;
  width: 100%;
  height: 50%;
  z-index: 3;
  margin: 20px 0 0 20px;
  display: flex;
  animation: setupSlideOut 0.35s ease-in ;
  border: grey 1px solid;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;

}
.setupWrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;



}
.setupTitle{
  font-size: 1.5rem;
  padding: 5px;
  width: 100%;
  text-align: center;
  border-bottom: grey 1px solid;
}
.setupStepsForCounts {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 40px;
  margin: 0;
  padding: 0;
  background-color: white;
  border-bottom: grey 1px solid;
}
.setupStepsForCounts ion-range {

  margin: 0 5px;

  --bar-background: #a2d2ff;
  --bar-background-active: #bde0fe;
  --bar-height: 8px;
  --bar-border-radius: 6px;
  --knob-background: #03650c;
  --knob-size: 30px;
  --pin-background: #33af0a;
  --pin-color: #fff;

}
.stepsRangeWrapper {
  position: absolute;
  display: flex;

  width: 45%;
  height: 100%;
  left:40%;
  top: -15px;


}
.stepsNameForCounts {
  font-size: 0.9rem;
  padding: 5px;
  width: fit-content;
}
.saveSetupButton {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px;
  font-size: 1.5rem;
  cursor: pointer;

}
</style>