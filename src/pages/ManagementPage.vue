<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import cookie from 'vue-cookies';
const admin_user = cookie.get('admin');
if (!admin_user) {
  setTimeout(() => {
    window.location.href = '/app/login';
  }, 0);
}
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>管理員</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">管理員系統</ion-title>
        </ion-toolbar>
      </ion-header>
        <div>
        </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>