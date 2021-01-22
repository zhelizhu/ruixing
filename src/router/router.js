const IndexRoute = [

  {
    path: '/home',
    alias:'/',
    name: 'Home',
    component: () => import('../views/main/Home.vue')
  },
  {
    path: '/meun',
    name: 'Meun',
    component: () => import('../views/main/Meun.vue')
  }, {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/main/Cart.vue')
  }, {
    path: '/mine',
    name: 'Mine',
    component: () => import('../views/user/userAddress.vue')
  }

]

export const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children:IndexRoute
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/user/login.vue')
  },
  {
    path: '/product/:pid',
    name: 'Product',
    component: () => import('../views/product/ProductDetail.vue'),
    props:true
  }
]

