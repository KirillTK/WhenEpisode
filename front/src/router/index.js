import Vue from 'vue'
import TopList from "../views/TopList";
import VueRouter from 'vue-router'
import Registration from "../views/Registration";
import Login from "../views/Login";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: TopList
  },
  {
    path: '/registration',
    component: Registration
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '*',
    redirect: '/'
  }
];

const router = new VueRouter({
  routes
});


export default router;
