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
                autocapitalize="off"
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
                href="/register"
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

<script setup lang="ts">

import {IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonList, IonCol, IonRow} from "@ionic/vue";
import { ref } from "vue"

const login = ref("niga");
const password = ref("niga");

const emit = defineEmits();

function loginHandle(event: Event){
   if (password.value === login.value && login.value === "admin"){

   }
}

</script>

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