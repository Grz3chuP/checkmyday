<script setup lang="ts">
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput} from '@ionic/vue';
</script>

<template>
<section>
<fieldset class="loginWrapper">
 Login
  <div class="loginInputWrapper">
  <ion-item color="light">
    <ion-label position="floating">Email</ion-label>
    <ion-input type="text" ></ion-input>
  </ion-item>
    <ion-item color="light">
      <ion-label position="floating">Password</ion-label>
      <ion-input type="password" ></ion-input>
    </ion-item>
  </div>
  Sign up
  <div class="loginInputWrapper">
    <ion-item color="light">
      <ion-label position="floating">Email</ion-label>
      <ion-input type="text" ></ion-input>
    </ion-item>
    <ion-item color="light">
      <ion-label position="floating">Password</ion-label>
      <ion-input type="password" ></ion-input>
    </ion-item>
  </div>
</fieldset>
</section>

</template>

<style scoped>

</style>