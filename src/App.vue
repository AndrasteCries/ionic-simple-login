<template>
  <ion-app>
    <Menu />
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import Menu from "./components/Menu.vue";
</script>
