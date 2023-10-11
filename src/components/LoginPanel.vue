<script setup lang="ts">
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput} from '@ionic/vue';
import {ref} from "vue";
import {loginEmailPassword, logout, registerEmailPassword, signInWithGoogle} from "@/firestore";
import {userIsLogged} from "@/store";


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
</fieldset>
    <button v-if="!userIsLogged" @click="signInWithGoogle">Sign in with Google</button>
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
</style>