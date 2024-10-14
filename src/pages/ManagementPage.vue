<script setup lang="ts">

</script>

<template>
  <ion-tabs>
    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="tab1">
        <ion-icon name="triangle" />
        <ion-label>Tab 1</ion-label>
      </ion-tab-button>
      <ion-tab-button tab="tab2">
        <ion-icon name="ellipse" />
        <ion-label>Tab 2</ion-label>
      </ion-tab-button>
      <ion-tab-button tab="tab3">
        <ion-icon name="square" />
        <ion-label>Tab 3</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
    <ion-tab tab="tab1">
      <ion-content>
        <ion-list>
          <ion-item>
            <ion-label>Tab 1</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-tab>
    <ion-tab tab="tab2">
      <ion-content>
        <ion-list>
          <ion-item>
            <ion-label>Tab 2</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-tab>
    <ion-tab tab="tab3">
      <ion-content>
        <ion-list>
          <ion-item>
            <ion-label>Tab 3</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-tab>
  </ion-tabs>
</template>

<style scoped>

</style>