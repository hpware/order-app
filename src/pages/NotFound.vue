<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>404</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">404</ion-title>
        </ion-toolbar>
      </ion-header>
      <div>
        <p>404</p>
        <p>找不到頁面</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped></style>
