<script setup lang="ts">

import {IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonList, IonCol, IonRow} from "@ionic/vue";
import { ref, computed } from "vue"
import {useStore} from "vuex";
import { useRouter } from 'vue-router';

const login = ref("admin");
const password = ref("admin");

const router = useRouter();
const store = useStore();

const isAuthenticated = computed(() => store.getters.isAuthenticated);

function loginHandle() {
  if (password.value === login.value && login.value === 'admin') {
    store.dispatch('login', { username: login.value, password: password.value });
  }
}

function logoutHandle() {
  store.dispatch('logout');
}

</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <form novalidate @submit.prevent="loginHandle">
        <ion-list>
          <ion-item>
            <ion-input
                label="Username"
                labelPlacement="stacked"
                v-model="login"
                name="username"
                type="text"
                required
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-input
                labelPlacement="stacked"
                label="Password"
                v-model="password"
                name="password"
                type="password"
                required
            ></ion-input>
          </ion-item>
        </ion-list>

        <ion-row responsive-sm class="ion-padding">
          <ion-col>
            <ion-button type="submit" expand="block">
              Login
            </ion-button>
          </ion-col>
          <ion-col>
            <ion-button
                @click="() => router.push('/profile')"
                color="light"
                expand="block">
              Signup
            </ion-button>

            <div v-if="isAuthenticated"><h1>YA ZALOGINILSYA</h1></div>
          </ion-col>
        </ion-row>
      </form>
    </ion-content>
  </ion-page>
</template>

<style scoped>
#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}

</style>