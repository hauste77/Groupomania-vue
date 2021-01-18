import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

// import Cookies from 'js-cookie';

Vue.use( VueRouter )

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/signup.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('../views/Chat.vue')
  },

  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue')
  },
 
  {
    path: '/post',
    name: 'post',
    component: () => import('../components/post.vue')
  },
  {
    path: '/adminUserList',
    name: 'adminUserList',
    component: () => import('../views/adminUserList.vue')
  },
]

const router = new VueRouter( {
  mode: 'history',
  base: process.env.BASE_URL,
  routes
} );

router.beforeEach( function ( to, from, next ) {
  if ( to.name !== 'login' && !router.app.$session.exists() ) {
    next( { name: 'login' } )
  } else next();
} );

export default router
