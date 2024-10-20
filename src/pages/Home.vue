<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
} from "@ionic/vue";
import { refreshOutline } from "ionicons/icons";
import { ref, onMounted } from "vue";
import cookie from "vue-cookies";
const logincookie = cookie.get("user");
const loggedin = ref(false);
const lazyload = ref(true);
const verifying = ref(true);
const loggeduser = ref("");
async function authcookie() {
  const fetchURL = await fetch(
    "https://am.yuanhau.com/webhook/b39eff47-1aa7-4baf-a073-9bcfcc6cc29f",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cookie: logincookie,
      }),
    },
  );
  const data = await fetchURL.json();
  if (data.cookieMatch === true) {
    loggedin.value = true;
    loggeduser.value = data.user;
  } else {
    loggedin.value = false;
  }
  verifying.value = false;
}
async function moneycountload() {
  lazyload.value = false;
  const fetchURL = await fetch("https://w", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cookie: logincookie,
    }),
  });
  const data = await fetchURL.json();
  if (data.cookieMatch === true) {
    loggedin.value = true;
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
      <div v-if="verifying">
        <br />
        <ion-spinner size="large"></ion-spinner>
        <h3>正在驗證Cookie...</h3>
      </div>
      <div v-if="loggedin && !verifying">
        <h2>
          剩餘餘額&nbsp;<button
            style="font-size: 0.8em; background-color: transparent"
            @click="moneycountload()"
            v-if="lazyload"
          >
            <ion-icon :icon="refreshOutline"></ion-icon>
          </button>
        </h2>
        <br />
        <div class="box">
          <span class="moneycountbox" v-if="lazyload">----</span>
          <span class="moneycountbox" v-else-if="moneycount > 100">{{
            moneycount
          }}</span>
          <span class="moneycountbox" style="color: red" v-else>{{
            moneycount
          }}</span>
        </div>
        <p v-if="!lazyload && moneycount <= 100">建議儲值</p>
      </div>
      <div v-else></div>
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
