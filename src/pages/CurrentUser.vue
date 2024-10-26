<script setup lang="ts">
// Import
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon,} from "@ionic/vue";
import {personCircle, refreshOutline, logOut, key} from "ionicons/icons";
import { ref, onMounted } from "vue";
import cookie from "vue-cookies";
import sha512 from "crypto-js/sha512";
import cryptojs from "crypto-js";

// On Start
onMounted(() => {
  authcookie();
});

// Set values
const logincookie = cookie.get("user");
const loggedin = ref(false);
const verifying = ref(true);
const loggeduser = ref("");
const pleaserelogin = ref(false);
const oldpassword = ref("");
const newpassword = ref("");
const confirmpassword = ref("");
const oldpasswordc = ref('');
const newpasswordc = ref('');
const confirmpasswordc = ref('');
const displayError = ref(false);
const loading = ref(false);
const changepass = ref(false);
const ErrorText = ref("");


// Check Cookie
async function authcookie() {
  const fetchURL = await fetch(
      "https://am.yuanhau.com/webhook/b39eff47-1aa7-4baf-a073-9bcfcc6cc29f",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cookie: logincookie,
        }),
      },
  );
  const data = await fetchURL.json();
  if (data.cookieMatch === true) {
    loggedin.value = true;
    loggeduser.value = data.user;
  } else {
    loggedin.value = false;
    setTimeout(() => {
      pleaserelogin.value = true;
      cookie.remove("user");
      window.location.href = "/app/login";
    }, 1000);
  }
  verifying.value = false;
}

// Logout Func
function logout() {
  cookie.remove("user");
  cookie.remove("admin");
  window.location.href="/app/login";
}

// Change Password Toggle
function changepasstoggle() {
  changepass.value = !changepass.value;
}

// Basic Actions
function basic() {
  displayError.value = false;
  loading.value = true;
}

// Password Changing Function
async function changepasswordsubmitaction() {
  basic();
  oldpasswordc.value = sha512(oldpassword.value).toString();
  newpasswordc.value = sha512(newpassword.value).toString();
  confirmpasswordc.value = sha512(confirmpassword.value).toString();
    if (newpasswordc.value === confirmpasswordc.value) {
      if (newpassword.value.length >= 8) {
        try {
          const fetchURI = await fetch(
              "https://am.yuanhau.com/webhook/d3c76e8a-622f-4168-a310-d77ace006df9",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  user: loggeduser.value,
                  old: oldpasswordc.value,
                  new: newpasswordc.value,
                })
              }
          )
          if (fetchURI.status === 200) {
            alert("密碼更改成功");
            changepass.value = false;
          } else if (fetchURI.status === 403) {
            displayError.value = true;
            ErrorText.value = "密碼錯誤";
          }
        } catch (error) {
          displayError.value = true;
          ErrorText.value = "伺服器錯誤";
        }
    } else {

        displayError.value = true;
        ErrorText.value = "密碼太短！";
        loading.value = false;
    }
  } else {
      displayError.value = true;
      ErrorText.value = "密碼不相同";
  }
  loading.value = false;
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>使用者中心</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">使用者中心</ion-title>
        </ion-toolbar>
      </ion-header>
      <br />
      <div v-if="verifying">
        <ion-spinner size="large"></ion-spinner>
        <h3>正在取得使用者資料...</h3>
      </div>
      <div v-if="loggeduser">
        <div class="userbox">
          <span class="icon"><ionIcon :icon="personCircle"></ionIcon></span>
          <br />
          <span class="user">{{ loggeduser }}</span>
          <main>
            <!--First button-->
            <button @click="changepasstoggle()" expand="block"
              ><ionIcon :icon="key"></ionIcon>&nbsp;改變密碼</button
            >
            <br />
            <!--Main Change Password Action-->
            <div class="changepwd">
              <div v-if="loading">
                <ion-spinner />
                <br />
                <p>運行中...</p>
              </div>
              <div v-if="!loading && changepass">
                <form @submit.prevent="changepasswordsubmitaction()">
                  <label for="oldpassword">舊密碼</label><br />
                  <input
                    type="password"
                    id="oldpassword"
                    name="oldpassword"
                    v-model="oldpassword"
                    required
                    placeholder=""
                  /><br />
                  <label for="newpassword">新密碼</label><br />
                  <input
                    type="password"
                    id="newpassword"
                    name="newpassword"
                    v-model="newpassword"
                    required
                    placeholder=""
                    >
                  <p class="newpwdtext">新密碼必須要8個字元或以上</p>

                  <label for="confirmpassword">確認新密碼</label><br />
                  <input
                    type="password"
                    id="confirmpassword"
                    name="confirmpassword"
                    v-model="confirmpassword"
                    required
                    placeholder=""
                    >
                  <br /><br/>
                  <button class="submit" type="submit" size="small">確認</button>
                  <p v-if="displayError" style="color: red">{{ ErrorText }}</p>
                </form>
              </div>
            </div>
            <br /><br/>
            <!--Last button-->
            <button @click="logout()" expand="block"
              ><ionIcon :icon="logOut"></ionIcon>&nbsp;登出</button
            >
          </main>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
div.userbox {
  span.icon {
    font-size: 5em;
    color: #74c2ff;
    margin-bottom: 0;
  }
  span.user {
    margin-top: 0;
    font-size: 1.4em;
  }
}
p.newpwdtext {
  font-size: 0.8em;
  margin-top: 0;
  margin-bottom:0.3em;
}
@media (prefers-color-scheme: light) {
  div.userbox {
    span.icon {
      font-size: 5em;
      color: #035ea6;
      margin-bottom: 0;
    }
    span.user {
      margin-top: 0;
      font-size: 1.4em;
    }
  }
}
</style>
