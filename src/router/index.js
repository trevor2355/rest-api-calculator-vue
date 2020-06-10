import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'adminHome',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "adminHome" */ '../views/AdminHome.vue'),
    meta: {
      requiresAdminAuth: true
    }
  },
  {
    path: '/user',
    name: 'userHome',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "userHome" */ '../views/UserHome.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login/admin',
    name: 'adminLogin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "adminLogin" */ '../views/AdminLogin.vue')
  },
  {
    path: '/login/user',
    name: 'userLogin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "userLogin" */ '../views/UserLogin.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAdminAuth) {
    //send to admin login screen
    if (!store.adminUser) {
      console.log('store: ', store)
      next({
        name: "adminLogin"
      })
    } else {
      next()
    }
  } else {
    next()
  }
  if (to.meta.requiresAuth) {
    //send to user login screen
    if (!store.user) {
      next({
        name: "userLogin"
      })
    } else {
      next()
    }
  } else {
    next()
  }
});

export default router
