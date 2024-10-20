<script setup lang="ts">
import { ref } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import cookie from "vue-cookies";
const admin_user = cookie.get("admin");
const total_amount = ref(1000);
const selectrestaurantform = ref(false);
if (!admin_user) {
  setTimeout(() => {
    window.location.href = "/app/login";
  }, 0);
}
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>管理員</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">管理員系統</ion-title>
        </ion-toolbar>
      </ion-header>
      <div>
        <h2>總金額: {{ total_amount }}</h2>
        <button @click="selectrestaurantform = !selectrestaurantform">
          選擇餐廳
        </button>
        <br /><br />
        <div v-if="selectrestaurantform">
          <form @submit.prevent="restaurantselect" style="align-items: center">
            <label for="restaurant">餐廳名稱</label><br />
            <input
              type="text"
              id="restaurant"
              name="restaurant"
              :is="restaurant"
              required
              placeholder=""
            /><br />
            <label for="memu">菜單URL</label><br />
            <input
              type="text"
              id="memu"
              name="memu"
              :is="memu"
              required
              placeholder="https://....."
            /><br /><br />
            <input type="submit" value="確認" />
          </form>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped></style>
