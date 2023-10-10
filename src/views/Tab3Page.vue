<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Statistic</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Statistic</ion-title>
        </ion-toolbar>
      </ion-header>

    <StatisticPanel/>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import StatisticPanel from "@/components/StatisticPanel.vue";
</script>
