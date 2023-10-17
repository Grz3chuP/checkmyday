<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> <LoginHeader/> </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Job Panel</ion-title>
        </ion-toolbar>
      </ion-header>

      <JobPanel/>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import JobPanel from "@/components/JobPanel.vue";
import LoginPanel from "@/components/LoginPanel.vue";
import LoginHeader from "@/components/LoginHeader.vue";

</script>
