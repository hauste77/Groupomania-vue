import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';


Vue.use( VueRouter )

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      requiresAuth: false
    },
    component: Home
  },
  {
    path: '/signup',
    name: 'signup',
    meta: {
      requiresAuth: false
    },
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      requiresAuth: false
    },
    component: () => import('../views/Login.vue')
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
    path: '/post/',
    name: 'post',
    component: () => import('../components/post.vue')
  },
  {
    path: '/comment/',
    name: 'comment',
    component: () => import('../views/Comment.vue')
  },
  {
    path: '/updatePost',
    name: 'updatePost',
    component: () => import('../views/UpdatePost.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin.vue')
  },
]

const router = new VueRouter( {
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes,
} );

router.beforeEach( function ( to, from, next ) {
  if ( ( !router.app.$session.exists() && ['login', 'signup', 'home'].includes(to.name) ) 
  || ( router.app.$session.exists() && !( ['login', 'signup'].includes(to.name) ) ) ) {
  next();
} else {
  next( { name: "home" } )
}
} );

export default router
