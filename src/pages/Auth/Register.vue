<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonContent,
  IonList,
  IonItem,
  IonTitle,
  IonMenuButton,
  IonButton,
  IonInput,
  IonToast,
} from '@ionic/vue';

import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const username = ref("");
const email = ref("");
const password = ref("");
const repeatPassword = ref("");
const submitted = ref(false);

const showToast = ref(false);
const toastMessage = ref("");

const usernameValid = computed(() => {
  return username.value.length >= 4;
});

const passwordValid = computed(() => {
  return password.value.length >= 8 && password.value == repeatPassword.value;
});

const onSignup = () => {
  submitted.value = true;

  if (usernameValid.value && passwordValid.value) {
    toastMessage.value = "Successfully signed up!";
    showToast.value = true;

    setTimeout(() => {
      showToast.value = false;
    }, 2000);

    username.value = "";
    password.value = "";
    store.dispatch('store/login', { username: email.value, password: password.value });
    router.push('/profile');
  } else if (!usernameValid.value) {
    toastMessage.value = "Incorrect username!";
    showToast.value = true;

    setTimeout(() => {
      showToast.value = false;
    }, 2000);
  } else {
    toastMessage.value = "Incorrect password!";
    showToast.value = true;

    setTimeout(() => {
      showToast.value = false;
    }, 2000);
  }
};


</script>

<template>
  <ion-page id="main-content">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Registration</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :translucent="true">
      <form @submit.prevent="onSignup">
        <ion-list>
          <ion-item>
            <ion-input
                labelPlacement="stacked"
                label="Email"
                v-model="email"
                name="username"
                type="text"
                required
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-input
                labelPlacement="stacked"
                label="Username"
                v-model="username"
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
          <ion-item>
            <ion-input
                labelPlacement="stacked"
                label="Repeat password"
                v-model="repeatPassword"
                name="password"
                type="password"
                required
            ></ion-input>
          </ion-item>
        </ion-list>
          <ion-list inset lines="none" id="btns">
            <ion-item>
              <ion-button type="submit" color="light" expand="block">
                Register
              </ion-button>
            </ion-item>
          </ion-list>
      </form>
      <ion-toast
          :is-open="showToast"
          :message="toastMessage"
          :duration="2000"
      ></ion-toast>
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
