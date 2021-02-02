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
    component: () => import('../views/main/Mine.vue')
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
    path: '/forgotPwd',
    name: 'ForgotPwd',
    component: () => import('../views/user/forgotPwd.vue'),
    props:true
  },
  {
    path: '/requestPwd',
    name: 'RequestPwd',
    component: () => import('../views/user/requestPwd.vue'),
    props:true
  },
  {
    path: '/product/:pid',
    name: 'Product',
    component: () => import('../views/product/ProductDetail.vue'),
    props:true
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import('../views/address/UserAddress.vue'),
    props:true
  },
  {
    path: '/editaddress/:aid?',
    name: 'EditAddress',
    component: () => import('../views/address/EditAddress.vue'),
    props:true
  },
  {
    path: '/pay',
    name: 'Pay',
    component: () => import('../views/product/pay.vue'),
    props:true
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/product/order.vue'),
    props:true
  },
  {
    path: '/preInfo',
    name: 'PreInfo',
    component: () => import('../views/user/preInfo.vue'),
    props:true
  },
  {
    path: '/myPocket',
    name: 'myPocket',
    component: () => import('../views/user/myPocket.vue'),
    props:true
  },
  {
    path: '/safetyCenter',
    name: 'safetyCenter',
    component: () => import('../views/user/safetyCenter.vue'),
    props:true
  }
]

