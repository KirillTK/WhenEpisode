import Vue from 'vue'
import TopList from "../components/TopList";
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: TopList
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
