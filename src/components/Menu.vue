<script setup lang="ts">
import {computed, ref} from 'vue';
import {IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle,} from '@ionic/vue';
import * as ionIcons from 'ionicons/icons';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';

const router = useRouter();
const store = useStore();
const loggedIn = ref(false);

const isAuthenticated = computed(() => store.getters['store/isAuthenticated']);

const logout = () => {
  store.dispatch('store/logout');
  router.push('/login')
};


</script>

<template>
  <ion-menu content-id="main-content">
    <ion-content class="ion-padding">
      <ion-list v-if="!loggedIn" lines="none">
        <ion-list-header>
          Main menu
        </ion-list-header>
        <ion-menu-toggle :auto-hide="false">
          <ion-item button @click="router.push('/home')">
            <ion-icon slot="start" :icon="ionIcons.homeSharp"></ion-icon>
            <ion-label>
              Home
            </ion-label>
          </ion-item>
        </ion-menu-toggle>
        <ion-menu-toggle :auto-hide="false">
          <ion-item button @click="router.push('/profile')">
            <ion-icon slot="start" :icon="ionIcons.people"></ion-icon>
            <ion-label>
              Profile
            </ion-label>
          </ion-item>
        </ion-menu-toggle>
        <ion-menu-toggle v-if="!isAuthenticated" :auto-hide="false">
          <ion-item button @click="router.push('/login')">
            <ion-icon slot="start" :icon="ionIcons.logIn"></ion-icon>
            <ion-label>
              Login
            </ion-label>
          </ion-item>
        </ion-menu-toggle>
        <ion-menu-toggle v-if="!isAuthenticated" :auto-hide="false">
          <ion-item button @click="router.push('/register')">
          <ion-icon slot="start" :icon="ionIcons.personAdd"></ion-icon>
            <ion-label>
              Signup
            </ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
      <ion-list v-if="isAuthenticated" lines="none">
        <ion-menu-toggle :auto-hide="false">
          <ion-item button @click="logout">
            <ion-icon slot="start" :icon="ionIcons.logOut"></ion-icon>
            <ion-label>
              Logout
            </ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>
