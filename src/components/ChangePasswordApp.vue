<script setup lang="ts">
// Import Stuff
import cookie from "vue-cookies";
import {key} from "ionicons/icons";
import {IonIcon} from "@ionic/vue";
import { ref, onMounted } from "vue";
import sha512 from "crypto-js/sha512";
import cryptojs from "crypto-js";

// Set Values
const oldpassword = ref("");
const newpassword = ref("");
const confirmpassword = ref("");
const displayError = ref(false);
const displayErrorServer = ref(false);
const loading = ref(false);
const changepass = ref(false);

// Basic Actions
function basic() {
  displayError.value = false;
  displayErrorServer.value = false;
  loading.value = true;
}


// Password Changing Function
async function changepasswordsubmitaction() {
  basic();
  oldpassword.value = sha512(oldpassword.value).toString();
  newpassword.value = sha512(newpassword.value).toString();
  confirmpassword.value = sha512(confirmpassword.value).toString();


}
</script>

<template>
  <ion-button @click="changepass !== changepass" expand="block"><ionIcon :icon="key"></ionIcon>&nbsp;改變密碼</ion-button>
  <br/>
  <div v-if="loading">
    <ion-spinner /><br />
    <p>運行中...</p>
  </div>
  <div v-if="changepass">
  <form @submit.prevent="changepasswordsubmitaction()">
    <label for="oldpassword">舊密碼</label><br />
  </form>
  </div>
</template>

<style scoped>

</style>