npm
<script setup lang="ts">
// Import
import cookie from "vue-cookies";
import { ref } from "vue";
import { IonIcon } from "@ionic/vue";
import {
  logInOutline,
  eyeOutline,
  eyeOffOutline,
  keypad,
} from "ionicons/icons";
import crypto from "crypto-js";
import SHA512 from "crypto-js/sha512";

// Set values
const displayError = ref(false);
const displayErrorServer = ref(false);
const username = ref("");
const password = ref("");
const cookiedata = ref("");
const loading = ref(false);

// Submit User Input Data Function
async function loginsubmit() {
  displayError.value = false;
  displayErrorServer.value = false;
  username.value = username.value.toLowerCase();
  const passwordhash = SHA512(password.value).toString();
  loading.value = true;
  try {
    const fetchURL = await fetch(
      "https://am.yuanhau.com/webhook/98b18c1e-9beb-4085-8579-c6219b99b98e-order-app-login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.value,
          password: passwordhash,
        }),
      },
    );
    const data = await fetchURL.json();
    console.log(data);
    cookiedata.value = data.cookie;
    if (data.isadmin === "true" || data.isadmin === "false") {
      cookie.set("user", cookiedata.value, "1d");
      alert("登入成功");
      window.location.href = "/app/home";
    } else {
      displayError.value = true;
    }
  } catch (error) {
    displayErrorServer.value = true;
  }
  loading.value = false;
}
// Function 2
if (cookie.get("user")) {
  setTimeout(() => {
    window.location.href = "/app/home";
  }, 0);
}
</script>

<template>
  <div class="login-container">
    <div v-if="loading">
      <ion-spinner /><br />
      <p>正在傳送資料到伺服器中...</p>
    </div>
    <form @submit.prevent="loginsubmit" v-else>
      <ion-icon :icon="keypad" class="start"></ion-icon>
      <h2>登入 Order App</h2>
      <label for="username">使用者</label><br />
      <input
        type="username"
        id="username"
        name="username"
        v-model="username"
        required
        placeholder="example"
      /><br />
      <label for="password">密碼</label><br />
      <input
        type="password"
        id="password"
        name="password"
        v-model="password"
        required
        placeholder=""
      /><!--&nbsp;<button class="pwddisplay" @click="displaypwd"><ion-icon :icon="eyeOutline" v-if="hideeye"></ion-icon><ion-icon :icon="eyeOffOutline" v-if="!hideeye"></ion-icon></button>-->
      <br /><br />
      <button class="submit" type="submit">登入</button>
      <p v-if="displayError" style="color: red">帳號或密碼錯誤</p>
      <p v-if="displayErrorServer" style="color: red">伺服器錯誤</p>
    </form>
  </div>
</template>

<style scoped>
div.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
ion-icon.start {
  font-size: 50px;
}
button.pwddisplay {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
}
</style>
