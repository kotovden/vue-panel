import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/templates',
    name: 'Templates',
    component: () => import(/* webpackChunkName: "about" */ '../views/Templates.vue'),
  },
  {
    path: '/orders-in-work',
    name: 'OrdersInWork',
    component: () => import(/* webpackChunkName: "about" */ '../views/OrdersInWork.vue'),
  },
  {
    path: '/orders-completed',
    name: 'OrdersCompleted',
    component: () => import(/* webpackChunkName: "about" */ '../views/OrdersCompleted.vue'),
  },
  {
    path: '/edit-order/:id',
    name: 'EditOrder',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditOrder.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
