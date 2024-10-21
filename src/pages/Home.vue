<script setup lang="ts">
// Import
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon,} from "@ionic/vue";
import { refreshOutline } from "ionicons/icons";
import { ref, onMounted } from "vue";
import cookie from "vue-cookies";

// Set values
const logincookie = cookie.get("user");
const loggedin = ref(false);
const lazyload = ref(true);
const verifying = ref(true);
const loggeduser = ref("");
const pleaserelogin = ref(false);
const moneycount = ref('');

// Check Cookie
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
    setTimeout(() => {
      pleaserelogin.value = true;
      cookie.remove("user");
      window.location.href = "/app/login";
    }, 1000);
  }
  verifying.value = false;
}

// Load Money Count
async function moneycountload() {
  lazyload.value = false;
  const fetchURL = await fetch(
    "https://am.yuanhau.com/webhook/e5df975b-7543-4c77-beae-83503aa4d1df-money-j2kjowefkoeprvoprekpgooewkprekgoegkvropdsfkvw-43iksg0opvdk23-w0gejksvdpoxj2ogj-0nje0-rjg-r0sdjc0qjj0wj9dpfjbw4t-q23iqweasoverhejrgojdpfjw430-gfjvwkeds0jgv9pw4jt092j34we0ogjvreopdsvjopjeioprjgx0j34w0-etjfrw0-esfpdxcjbipdfjt043wep9svpojgvp4j390egiordfpvj2pt4jw0ipvoj43tjgf9er0sdjg90jeg90tj",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: loggeduser.value,
      }),
    },
  );
  const data = await fetchURL.json();
  moneycount.value = data.moneyleft;
}
onMounted(() => {
  authcookie();
});

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
      <div v-if="pleaserelogin">
        <p>請登入</p>
      </div>
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
