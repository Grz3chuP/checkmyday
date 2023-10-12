<script setup lang="ts">
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonIcon} from '@ionic/vue';
import {ref} from "vue";
import {loginEmailPassword, logout, registerEmailPassword, signInWithGoogle} from "@/firestore";
import {userIsLogged} from "@/store";
import {logoGoogle} from "ionicons/icons";


const login = ref('')
const password = ref('')
const emailToSignIn = ref('')
const passwordToSignIn = ref('')

</script>

<template>
<section >
<fieldset v-if="!userIsLogged" class="loginWrapper">
 Login
  <div class="loginInputWrapper">
  <ion-item color="light">
    <ion-label position="floating">Email</ion-label>
    <ion-input type="text" v-model="login" ></ion-input>
  </ion-item>
    <ion-item color="light">
      <ion-label position="floating">Password</ion-label>
      <ion-input type="password" v-model="password" ></ion-input>
    </ion-item>
    <ion-button @click="loginEmailPassword(login, password)">Login</ion-button>
  </div>
  <div class="googleLoginWrapper">
  <ion-icon :icon="logoGoogle"></ion-icon>
  <button v-if="!userIsLogged" @click="signInWithGoogle">Sign in with Google</button>
  </div>
</fieldset>
<fieldset v-if="!userIsLogged" class="signInWrapper">
  Sign up
  <div class="loginInputWrapper">
    <ion-item color="light">
      <ion-label position="floating">Email</ion-label>
      <ion-input type="text" v-model="emailToSignIn" ></ion-input>
    </ion-item>
    <ion-item color="light">
      <ion-label position="floating">Password</ion-label>
      <ion-input type="password" v-model="passwordToSignIn" ></ion-input>
    </ion-item>
    <ion-button @click="registerEmailPassword(emailToSignIn, passwordToSignIn)">Sign up</ion-button>
  </div>
  <div class="googleLoginWrapper">
  <ion-icon :icon="logoGoogle"></ion-icon>
  <button v-if="!userIsLogged" @click="signInWithGoogle">Sign in with Google</button>
  </div>
</fieldset>

</section>
<ion-button v-if="userIsLogged" @click="logout()">Log out</ion-button>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;


}
fieldset {

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 10px;
}
.signInWrapper {
  position: absolute;
}

.googleLoginWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

}
.googleLoginWrapper button {
  background-color: transparent;

  font-size: 1rem;
  color: #0d0d0d;

}
</style>