<script setup lang="ts">
// Import
import cookie from 'vue-cookies';
import { ref } from 'vue';
import { IonIcon } from '@ionic/vue';
import { logInOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';
import crypto from 'crypto-js';
import SHA512 from 'crypto-js/sha512';

// Set values
const displayError = ref(false);

// Submit User Input Data Function
function loginsubmit() {
  username.value = username.value.toLowerCase();
  if (username.value === 'admin') {
    cookie.set('admin', 'true');
    alert('登入成功');
    window.location.href = '/app/management';
  } else if (username.value === 'user') {
    cookie.set('login', 'user');
    alert('登入成功');
    window.location.href = '/app/home';
  } else {
    displayError.value = true;
  }
}
// Function 2
</script>

<template>
      <div class="login-container">
        <form @submit.prevent="loginsubmit">
          <ion-icon :icon="logInOutline" class="start"></ion-icon>
          <h2>登入 Order App</h2>
          <label for="username">使用者</label><br/>
          <input type="username" id="username" name="username" :is="username" required placeholder="example"/><br/>
          <label for="password">密碼</label><br/>
          <input type="password" id="password" name="password" :is="password" required placeholder=""/><!--&nbsp;<button class="pwddisplay" @click="displaypwd"><ion-icon :icon="eyeOutline" v-if="hideeye"></ion-icon><ion-icon :icon="eyeOffOutline" v-if="!hideeye"></ion-icon></button>-->
          <br/><br/>
          <button class="submit" type="submit">登入</button>
          <p v-if="displayError" style="color: red;">帳號或密碼錯誤</p>
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
  background-color:transparent;
  border:none;
  cursor:pointer;
  outline:none;
}
</style>