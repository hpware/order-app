<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import {
  ellipse,
  square,
  triangle,
  home,
  logOut,
  personCircle,
  person,
} from "ionicons/icons";
import cookie from "vue-cookies";
const login_user = cookie.get("user");
const admin_user = cookie.get("admin");
function logout() {
  if (cookie.get("user")) {
    cookie.remove("login");
    alert("登出成功");
  }
  if (cookie.get("admin")) {
    cookie.remove("admin");
    alert("登出成功");
  }
  window.location.href = "/app/login";
}
</script>

<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" v-if="login_user">
        <ion-tab-button tab="Home" href="/app/home">
          <ion-icon aria-hidden="true" :icon="home" />
          <ion-label>首頁</ion-label>
        </ion-tab-button>
        <ion-tab-button @click="logout">
          <ion-icon aria-hidden="true" :icon="logOut" />
          <ion-label>登出</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
      <ion-tab-bar slot="bottom" v-if="admin_user">
        <ion-tab-button tab="management" href="/app/management">
          <ion-icon aria-hidden="true" :icon="personCircle" />
          <ion-label>管理員</ion-label>
        </ion-tab-button>
        <ion-tab-button @click="logout">
          <ion-icon aria-hidden="true" :icon="logOut" />
          <ion-label>登出</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>
