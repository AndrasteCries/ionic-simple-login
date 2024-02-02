import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { useStore } from 'vuex';
import store from '@/stores/modules/store';
import Profile from '@/pages/Profile/Profile.vue';
import Login from "@/pages/Auth/Login.vue";
import Home from "@/pages/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const store = useStore();
  const isAuthenticated = store.getters['store/isAuthenticated'];

  if (to.path === '/' && isAuthenticated) {
    next('/profile');
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated) {
    next('/profile');
  } else {
    next();
  }
});

export default router;
