<script setup lang="ts">
import {computed, ref} from 'vue';
import {useStore} from 'vuex';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/vue';

import {IMyIonInputs} from '@/components/interfaces/IMyIonInputs'
import {useRouter} from "vue-router";

const store = useStore();
const router = useRouter();

const username = ref("");
const email = ref("");
const password = ref("");
const repeatPassword = ref("");
const submitted = ref(false);

const showToast = ref(false);
const toastMessage = ref("");

const usernameValid = computed(() => username.value.length >= 4);
const passwordValid = computed(() => password.value.length >= 8 && password.value === repeatPassword.value);

const onSignup = () => {
  submitted.value = true;

  if (usernameValid.value && passwordValid.value) {
    toastMessage.value = "Successfully signed up!";
    showToast.value = true;

    resetForm();

    store.dispatch('store/login', { username: email.value, password: password.value });
    router.push('/profile');
  } else if (!usernameValid.value) {
    toastMessage.value = "Incorrect username!";
    showToast.value = true;

    resetForm();
  } else {
    toastMessage.value = "Incorrect password!";
    showToast.value = true;

    resetForm();
  }
};

const resetForm = () => {
  setTimeout(() => {
    showToast.value = false;
    username.value = "";
    password.value = "";
    repeatPassword.value = "";
  }, 2000);
};


const ionInputs: IMyIonInputs[] = [
  { label: "Email", vModel: "email", name: "email", type: "text", labelPlacement: "stacked" },
  { label: "Username", vModel: "username", name: "username", type: "text", labelPlacement: "stacked" },
  { label: "Password", vModel: "password", name: "password", type: "password", labelPlacement: "stacked" },
  { label: "Repeat password", vModel: "repeatPassword", name: "repeatPassword", type: "password", labelPlacement: "stacked" },
];

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
          <ion-item v-for="(input, index) in ionInputs" :key="index">
            <ion-input
                :label-placement="input.labelPlacement"
                :label="input.label"
                v-model="input.vModel"
                :name="input.name"
                :type="input.type"
                required
            />
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
