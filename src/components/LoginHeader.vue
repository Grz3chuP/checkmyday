<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import {loginOpen, resetPasswordOpen, signInOpen, userIsLogged} from "@/store";
import {logout} from "@/firestore";
import {eventName, setupIsOpen} from "@/setup";


function openLoginPanel() {
  loginOpen.value = !loginOpen.value;
  if(signInOpen.value)  {
    signInOpen.value = !signInOpen.value
  } if (!signInOpen.value) {
    resetPasswordOpen.value = false;
  }


}
function openSignInPanel() {
  signInOpen.value = !signInOpen.value;
  if(loginOpen.value) {
    loginOpen.value = !loginOpen.value;
  } if (!loginOpen.value) {
      resetPasswordOpen.value = false;
  }
}
function closeOpenLoginPanel() {
 setupIsOpen.value = !setupIsOpen.value;
}

</script>

<template>

  <div class="loginPanel">
   <div class="logMenu">Add Panel</div>

    <div class="logMenu" v-if="!userIsLogged"><ion-button size="small" @click="openLoginPanel">Login</ion-button></div>
    <div class="logMenu" v-if="!userIsLogged"><ion-button size="small" @click="openSignInPanel">Sign up</ion-button></div>
    <div class="logMenu" v-if="userIsLogged"><ion-button size="small" @click="logout()">Log out</ion-button></div>
    <div class="logMenu"><ion-button size="small" @click="closeOpenLoginPanel">Setup</ion-button></div>


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