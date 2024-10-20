<script setup lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/vue";
import { defineProps } from "vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{ props.title }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<style scoped></style>
