<script setup lang="ts">

import {loginOpen} from "@/store";
import {resetPassword} from "@/firestore";
import {ref} from "vue";
import {IonButton, IonItem, IonLabel, IonInput} from "@ionic/vue";

const newEmailToReset = ref('')
function resetPass () {
  console.log(newEmailToReset.value);
  resetPassword(newEmailToReset.value)
  newEmailToReset.value = ''
}

</script>

<template>
  <fieldset v-if="loginOpen" class="loginWrapper">
    <div class="loginInputWrapper">
      Reset password
      <ion-item color="light">
        <ion-label position="floating">Email</ion-label>
        <ion-input type="text" v-model="newEmailToReset"></ion-input>
      </ion-item>
      <ion-button @click="resetPass(); $emit('closeResetPanel', false)">Send Email
      </ion-button>
     </div>
    <div class="googleLoginWrapper">

      <!--    logowanie przez google nie dziala na androidzie-->

      <!--  <button v-if="!userIsLogged" @click="signInWithGoogle">Sign in with Google</button>-->
    </div>
  </fieldset>
</template>

<style scoped>
.loginInputWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: rgba(128, 128, 128, 0.7) 1px solid;
  padding: 10px;
  border-radius: 5px;
  box-shadow: rgba(128, 128, 128, 0.7) 1px 2px 4px 0;
  background-color: beige;

}
fieldset {
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 10px;
  border-radius: 5px;
}
</style>