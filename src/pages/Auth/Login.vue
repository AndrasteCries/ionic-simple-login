<script setup lang="ts">

import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import {ref} from "vue"
import {useStore} from "vuex";
import {useRouter} from 'vue-router';
import {IMyIonInputs} from '@/components/interfaces/IMyIonInputs'

const login = ref("admin");
const password = ref("admin");

const router = useRouter();
const store = useStore();

const loginHandle = () => {
  if (password.value === login.value && login.value === 'admin') {
    store.dispatch('store/login', { username: login.value, password: password.value });
    router.push('/profile');
  }
}

const ionInputs: IMyIonInputs[] = [
  { label: "Username", vModel: "login", name: "username", type: "text", labelPlacement: "stacked" },
  { label: "Password", vModel: "password", name: "password", type: "password", labelPlacement: "stacked" },
];

</script>

<template>
  <ion-page id="main-content">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <form novalidate @submit.prevent="loginHandle">
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

        <ion-row responsive-sm class="ion-padding">
          <ion-col>
            <ion-button type="submit" expand="block">
              Login
            </ion-button>
          </ion-col>
          <ion-col>
            <ion-button
                @click="() => router.push('/register')"
                color="light"
                expand="block">
              Signup
            </ion-button>
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