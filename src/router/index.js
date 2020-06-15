import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import AdminUsersBalance from '../views/adminViews/AdminUsersBalance.vue';
// import AdminUsersManage from '../views/adminViews/AdminUsersManage.vue';

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
    component: () => import(/* webpackChunkName: "adminHome" */ '../views/adminViews/AdminHome.vue'),
    meta: {
      requiresAdminAuth: true
    },
    children: [
      {
        path: ':userId/records',
        name: 'adminRecords',
        props: true,
        component: () => import(/* webpackChunkName: "adminRecords" */ '../views/adminViews/AdminRecords.vue'),
        meta: {
          requiresAdminAuth: true
        }
      },
      {
        path: ':userId/services',
        name: 'adminServices',
        props: true,
        component: () => import(/* webpackChunkName: "adminServices" */ '../views/adminViews/AdminServices.vue'),
        meta: {
          requiresAdminAuth: true
        }
      },
      {
        path: ':userId/users',
        name: 'adminUsers',
        props: true,
        component: () => import(/* webpackChunkName: "adminUsers" */ '../views/adminViews/AdminUsers.vue'),
        meta: {
          requiresAdminAuth: true
        },
        children: [
          {
            path: 'balance',
            name: 'adminUsersBalance',
            props: true,
            component: () => import(/* webpackChunkName: "adminUsersBalance" */ '../views/adminViews/AdminUsersBalance.vue'),
            meta: {
              requiresAdminAuth: true
            }
          },
          {
            path: 'manage',
            name: 'adminUsersManage',
            props: true,
            component: () => import(/* webpackChunkName: "adminUsersMange" */ '../views/adminViews/AdminUsersManage.vue'),
            meta: {
              requiresAdminAuth: true
            }
          }
        ]
      }
    ]
  },
  {
    path: '/user',
    name: 'userHome',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "userHome" */ '../views/userViews/UserHome.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: ':userId/profile',
        name: 'myProfile',
        props: true,
        component: () => import(/* webpackChunkName: "myProfile" */ '../views/userViews/MyProfile.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: ':userId/records',
        name: 'myRecords',
        props: true,
        component: () => import(/* webpackChunkName: "myRecords" */ '../views/userViews/MyRecords.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'services',
        name: 'services',
        props: true,
        component: () => import(/* webpackChunkName: "services" */ '../views/userViews/Services.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/login/admin',
    name: 'adminLogin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "adminLogin" */ '../views/adminViews/AdminLogin.vue')
  },
  {
    path: '/login/user',
    name: 'userLogin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "userLogin" */ '../views/userViews/UserLogin.vue')
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
    if (!JSON.parse(localStorage.getItem('adminUser'))) {
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
    if (!JSON.parse(localStorage.getItem('user'))) {
      //send to user login screen
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
