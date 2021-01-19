// const IndexRoute = [

// ]

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/meun',
    name: 'Meun',
    component: () => import('../views/Meun.vue')
  }, {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  }, {
    path: '/mine',
    name: 'Mine',
    component: () => import('../views/Mine.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/user/login.vue')
  }
]

