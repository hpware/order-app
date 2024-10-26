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
  personOutline,
} from "ionicons/icons";
import cookie from "vue-cookies";
const login_user = cookie.get("user");
const admin_user = cookie.get("admin");
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
        <ion-tab-button tab="user" href="/app/user">
          <ion-icon aria-hidden="true" :icon="personOutline" />
          <ion-label>你的帳號</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
      <ion-tab-bar slot="bottom" v-if="admin_user">
        <ion-tab-button tab="management" href="/app/management">
          <ion-icon aria-hidden="true" :icon="personCircle" />
          <ion-label>首頁</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="user" href="/app/user">
          <ion-icon
            aria-hidden="true"
            :icon="personOutline"
            style="color: red"
          />
          <ion-label>你的帳號</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>
