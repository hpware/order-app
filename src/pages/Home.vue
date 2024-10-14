<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { ref } from 'vue';
import cookie from 'vue-cookies';
const login_user = ref(cookie.get('login'));
if (!cookie.get('login')) {
  setTimeout(() => {
    window.location.href = '/app/login';
  }, 500);
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
      <div v-if="login_user">
        <p>首頁</p>
      </div>
      <div v-else>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>