<script setup lang="ts">
import {computed, ref} from 'vue';
import {IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle,} from '@ionic/vue';
import * as ionIcons from 'ionicons/icons';
import {RouteLocationRaw, useRouter} from 'vue-router';
import {useStore} from 'vuex';

const router = useRouter();
const store = useStore();
const loggedIn = ref(false);

const isAuthenticated = computed(() => store.getters['store/isAuthenticated']);

const logout = () => {
  store.dispatch('store/logout');
  loggedIn.value = false;
  router.push('/login')
};

interface IMyIonMenuToggle {
  label: string;
  icon: string;
  route: RouteLocationRaw;
  showCondition?: boolean;
  onClick?: () => void;
}

const menuItems= computed<IMyIonMenuToggle[]>(() => [
  { label: 'Home', icon: ionIcons.homeSharp, route: '/home', showCondition: true },
  { label: 'Profile', icon: ionIcons.people, route: '/profile', showCondition: true },
  { label: 'Login', icon: ionIcons.logIn, route: '/login', showCondition: !isAuthenticated.value },
  { label: 'Signup', icon: ionIcons.personAdd, route: '/register', showCondition: !isAuthenticated.value },
  { label: 'Logout', icon: ionIcons.logOut, route: '', showCondition: isAuthenticated.value, onClick: logout },
]);

</script>
<template>
  <ion-menu content-id="main-content">
    <ion-content class="ion-padding">
      <ion-list lines="none">
        <ion-list-header>
          Main menu
        </ion-list-header>
        <ion-menu-toggle v-for="item in menuItems" :key="item.label" :auto-hide="false">
          <ion-item button @click="item.onClick ? item.onClick() : router.push(item.route)" v-if="item.showCondition || item.showCondition === undefined">
            <ion-icon slot="start" :icon="item.icon" />
            <ion-label>
              {{ item.label }}
            </ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>
