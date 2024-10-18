<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import cookie from 'vue-cookies';
const logincookie = cookie.get('user');
const loggedin = ref(true);
async function authcookie() {
  const fetchURL = await fetch('https://am.yuanhau.com/webhook-test/b39eff47-1aa7-4baf-a073-9bcfcc6cc29f', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cookie: logincookie,
    }),
  });
  const data = await fetchURL.json();
  console.log(data);
  if (data.cookieMatch === "true") {
    loggedin.value = true;
  } else {
    loggedin.value = false;
    cookie.remove('user');
    window.location.href = '/app/login';
  }
}
onMounted(() => {
  authcookie();
});
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