<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import {  IonPage,  IonHeader,  IonToolbar,  IonButtons,  IonBackButton,  IonContent,  IonList,  IonItem,  IonTitle,
} from '@ionic/vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const store = useStore();

const updatePicture = () => {};
const changeUsername = () => {};
const changePassword = () => {};
const support = () => {};
const logOutUser = () => {};

// const username = ref(storage.state.user.username);

</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-title>Profile</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :translucent="true" class="outer-content page-account">
      <div>
        <img src="http://www.gravatar.com/avatar?d=mm&s=140" alt="avatar" />
        <h2>Admin</h2>
        <ion-list inset>
          <ion-item @click="updatePicture">Update Picture</ion-item>
          <ion-item @click="changeUsername">Change Username</ion-item>
          <ion-item @click="changePassword">Change Password</ion-item>
          <ion-item @click="support">Support</ion-item>
          <ion-item @click="logOutUser">Logout</ion-item>
        </ion-list>
      </div>
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

img {
  max-width: 140px;
  border-radius: 50%;
}
</style>
