<script setup lang="ts">
import { IonButton } from '@ionic/vue';
</script>

<template>

  <div class="loginPanel">
   <div class="logMenu">Job Panel</div>

    <div class="logMenu"><ion-button size="small"> Login</ion-button></div>
    <div class="logMenu"><ion-button size="small"> Sign up</ion-button></div>
    <div class="logMenu" ><ion-button size="small"> Log out</ion-button></div>



  </div>

</template>

<style scoped>

.loginPanel {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  gap: 5px;
}

ion-button {
  --background: #ffffff;
  --background-hover: #ffffff;
  --background-activated: #ffffff;
  --background-focused: #ffffff;
  --color: #000000;
  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);
  --padding-top: 5px;
  --padding-bottom: 5px;
}
.logMenu:first-child {
 font-size: 1rem;
  margin-right: 10px;
}



</style>