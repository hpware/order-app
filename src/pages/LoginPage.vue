<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
const loginsubmit = (event: Event) => {
  event.preventDefault();
  // Add your login logic here
  console.log('Form submitted');
};
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>登入介面</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">登入介面</ion-title>
        </ion-toolbar>
      </ion-header>
      <div>
        <form @submit="loginsubmit">
          <label for="username">使用者</label><br/>
          <input type="text" id="username" name="username" /><br/>
          <label for="password">密碼</label><br/>
          <input type="password" id="password" name="password" /><br/>
        </form>
      </div>
    </ion-content>

  </ion-page>
</template>

<style scoped>

</style>