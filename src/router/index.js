import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/Main.vue';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    components: {
      header: () => import(/* webpackChunkName: "main" */ '../views/MainHeader.vue'),
      default: () => import(/* webpackChunkName: "main" */ '../views/Main.vue'),
    }
  },
  {
    path: '/login',
    name: 'login',
    components: {
      header: () => import(/* webpackChunkName: "main" */ '../views/LoginHeader.vue'),
      default: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    },
  },
];

const router = new VueRouter({
  routes
});

export default router;
