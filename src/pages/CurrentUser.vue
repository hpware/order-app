<script setup lang="ts">
// Import
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon,} from "@ionic/vue";
import {personCircle, refreshOutline, logOut, key} from "ionicons/icons";
import ChangePwdApp from "@/components/ChangePasswordApp.vue";
import { ref, onMounted } from "vue";
import cookie from "vue-cookies";
// On Start
onMounted(() => {
  authcookie();
});

// Set values
const logincookie = cookie.get("user");
const loggedin = ref(false);
const verifying = ref(true);
const loggeduser = ref("");
const pleaserelogin = ref(false);

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

// Logout Func
function logout() {
  cookie.remove("user");
  window.location.href="/app/login";
}


</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>使用者中心</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">使用者中心</ion-title>
        </ion-toolbar>
      </ion-header>
      <br />
      <div v-if="verifying">
        <ion-spinner size="large"></ion-spinner>
        <h3>正在取得使用者資料...</h3>
      </div>
      <div v-if="loggeduser">
      <div class="userbox">
      <span class="icon"><ionIcon :icon="personCircle"></ionIcon></span>
        <br/>
        <span class="user">{{loggeduser}}</span>
        <main>
          <!-- First button -->
          <ChangePwdApp></ChangePwdApp>
          <br/>
          <!-- Last button -->
          <ion-button @click="logout()" expand="block"><ionIcon :icon="logOut"></ionIcon>&nbsp;登出</ion-button>
        </main>
      </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
div.userbox {
  span.icon {
    font-size:5em;
    color: #74c2ff;
    margin-bottom:0;
  }
  span.user {
    margin-top:0;
    font-size:1.4em;
  }
}
ion-button {
  color:white;
}
@media (prefers-color-scheme: light) {
  div.userbox {
    span.icon {
      font-size:5em;
      color: #035ea6;
      margin-bottom:0;
    }
    span.user {
      margin-top:0;
      font-size:1.4em;
    }
  }

}

</style>
