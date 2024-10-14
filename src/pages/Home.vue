<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import cookie from 'vue-cookie';
login_user = cookie.get('login');
if (!login_user) {
  window.location.href = '/app/login'
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>首頁</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">首頁</ion-title>
        </ion-toolbar>
      </ion-header>
      <div>
        <p>首頁</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>