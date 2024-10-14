<script setup lang="ts">
import cookie from 'vue-cookies';
import { ref } from 'vue';
async function loginsubmit() {
  alert('登入成功');
  if (username.value === 'admin') {
    cookie.set('admin', 'true');
  }
  else {
    cookie.set('login', 'true');
  }
}
if (cookie.get('login') === 'true') {
  window.location.href = '/app/home';
}
if (cookie.get('admin')) {
    window.location.href = '/app/management';
}
</script>

<template>
      <div class="login-container">
        <form @submit="loginsubmit">
          <h1>登入 Order App</h1>
          <label for="username">使用者</label><br/>
          <input type="text" id="username" name="username" :is="username" required/><br/>
          <label for="password">密碼</label><br/>
          <input type="password" id="password" name="password" :is="password" required/>
          <br/><br/>
          <input type="submit" value="登入" />
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
</style>