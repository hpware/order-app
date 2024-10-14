<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { ref } from 'vue';
import cookie from 'vue-cookies';
const login_user = ref(cookie.get('login'));
if (!cookie.get('login')) {
  setTimeout(() => {
    window.location.href = '/app/login';
  }, 0);
}
const moneycount = ref(51);
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
        <h2>剩餘餘額</h2>
        <br/>
        <div class="box">
        <span class="moneycountbox" v-if="moneycount > 100">{{ moneycount }}</span>
          <span class="moneycountbox" style="color:red;" v-else>{{ moneycount }}</span>
        </div>
        <p v-if="moneycount <= 100">建議儲值</p>
      </div>
      <div v-else>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
div.box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
span.moneycountbox {
  font-size: 50px;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  align-items: center;
  display: block;
  margin: 0;
  width: 200px;
  padding: 10px;
  border: 1px solid #72ba3f;
  border-radius: 10px;
  background-color: rgba(72, 115, 44, 0.38);
  box-shadow: 5px 5px 5px #72ba3f;
}
</style>