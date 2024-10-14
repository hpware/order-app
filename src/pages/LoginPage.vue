<script setup lang="ts">
import cookie from 'vue-cookies';
import { ref } from 'vue';
async function loginsubmit() {
  alert('登入成功');
  cookie.set('login', 'true');
};
if (cookie.get('login') === 'true') {
  window.location.href = '/app/home';
}
</script>

<template>
      <div class="login-container">
        <form @submit="loginsubmit">
          <label for="username">使用者</label><br/>
          <input type="text" id="username" name="username" required/><br/>
          <label for="password">密碼</label><br/>
          <input type="password" id="password" name="password" required/>
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