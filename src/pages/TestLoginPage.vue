<script setup lang="ts">
import cookie from 'vue-cookies';
import { ref } from 'vue';
import { IonIcon } from '@ionic/vue';
import { logInOutline } from 'ionicons/icons';
const displayError = ref(false);
import { supabase } from '@/components/supabase';
async function login() {
  try {
    const { error } = await supabase.auth.signIn({
      email: email.value,
      password: password.value,
    });
    if (error) {
      alert(error);
    }
    alert('登入成功');
    window.location.href = '/app/home';
  } catch (error) {
    alert(error);
  }
}
</script>

<template>
  <div class="login-container">
    <form @submit.prevent="login">
      <ion-icon :icon="logInOutline" class="start"></ion-icon>
      <h2>登入 Order App</h2>
      <label for="username">Email</label><br/>
      <input type="email" id="email" name="email" :is="email" required placeholder="example@gmail.com"/><br/>
      <label for="password">密碼</label><br/>
      <input type="password" id="password" name="password" :is="password" required placeholder=""/>&nbsp;<button><i></i></button>
      <br/><br/>
      <input type="submit" value="登入" />
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
</style>