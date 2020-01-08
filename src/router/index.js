import Vue from 'vue';
import VueRouter from 'vue-router';
import movieRouter from './movie';
import mineRouter from  './mine';
import cinemarRouter from './cinema';


Vue.use(VueRouter);

const routes = [
    movieRouter,
    mineRouter,
    cinemarRouter,
    {
        path: '/*',
        redirect: '/movie/nowPlaying'
    }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
