<script setup lang="ts">
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonIcon} from '@ionic/vue';
import {ref} from "vue";
import {loginEmailPassword, logout, registerEmailPassword, signInWithGoogle} from "@/firestore";
import {loginOpen, resetPasswordOpen, signInOpen, userIsLogged} from "@/store";
import {logoGoogle} from "ionicons/icons";
import ResetPassword from "@/components/ResetPassword.vue";
import * as events from "events";


const login = ref('')
const password = ref('')
const emailToSignIn = ref('')
const passwordToSignIn = ref('')


</script>

<template>
  <ResetPassword v-if="resetPasswordOpen" @closeResetPanel="resetPasswordOpen = false"/>
  <section>
    <fieldset v-if="loginOpen" class="loginWrapper">

      <div class="loginInputWrapper">
        Login
        <ion-item color="light">
          <ion-label position="floating">Email</ion-label>
          <ion-input type="text" v-model="login"></ion-input>
        </ion-item>
        <ion-item color="light">
          <ion-label position="floating">Password</ion-label>
          <ion-input type="password" v-model="password"></ion-input>
        </ion-item>
        <ion-button @click="loginEmailPassword(login, password); loginOpen= false; login=''; password=''">Login
        </ion-button>
        <div class="forgotPassword" @click="resetPasswordOpen = !resetPasswordOpen">
          Forgot password?
        </div>

      </div>

      <div class="googleLoginWrapper">

        <!--    logowanie przez google nie dziala na androidzie-->

        <!--  <button v-if="!userIsLogged" @click="signInWithGoogle">Sign in with Google</button>-->
      </div>
    </fieldset>
    <fieldset v-if="signInOpen" class="signInWrapper">

      <div class="loginInputWrapper">
        Sign up
        <ion-item color="light">
          <ion-label position="floating">Email</ion-label>
          <ion-input type="text" v-model="emailToSignIn"></ion-input>
        </ion-item>
        <ion-item color="light">
          <ion-label position="floating">Password</ion-label>
          <ion-input type="password" v-model="passwordToSignIn"></ion-input>
        </ion-item>
        <ion-button
            @click="registerEmailPassword(emailToSignIn, passwordToSignIn); signInOpen= false; emailToSignIn=''; passwordToSignIn=''">
          Sign up
        </ion-button>
      </div>
      <div class="googleLoginWrapper">

        <!--    logowanie przez google nie dziala na androidzie-->
        <!--    <ion-icon :icon="logoGoogle"></ion-icon>-->
        <!--  <button v-if="!userIsLogged" @click="signInWithGoogle">Sign in with Google</button>-->
      </div>
    </fieldset>

  </section>

</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;


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

.signInWrapper {
  opacity: 0;
  animation: fadeIn 0.2s ease-in-out forwards;
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

.loginWrapper {
  opacity: 0;
  animation: fadeIn 0.2s ease-in-out forwards;

}

@keyframes fadeIn {
  100% {
    opacity: 1;
  }
}
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
.forgotPassword {
  font-size: 0.8rem;
  color: #0d0d0d;
    cursor: pointer;
  text-decoration: underline;
  margin-top: 8px;
}
</style>