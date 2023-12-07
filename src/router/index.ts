import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChannelView from '../views/ChannelView.vue'
import MiCircleView from '../views/MiCircleView.vue'
import CartView from '../views/CartView.vue'
import UserView from '../views/UserView.vue'
import SearchView from '../views/SearchView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'recommend',
          name: 'recommend',
          component: () => import('../views/HomeViewChild/RecommendView.vue')
        },
        {
          path: 'smart',
          name: 'smart',
          component: () => import('../views/HomeViewChild/SmartView.vue')
        },
        {
          path: 'radio',
          name: 'radio',
          component: () => import('../views/HomeViewChild/RadioView.vue')
        },
        {
          path: 'homeAppliance',
          name: 'homeAppliance',
          component: () => import('../views/HomeViewChild/HomeApplianceView.vue')
        },
        {
          path: 'notebook',
          name: 'notebook',
          component: () => import('../views/HomeViewChild/NotebookView.vue')
        },
      ],
      redirect: '/home/recommend'
    },
    {
      //没写就是任意路由都是定向这个
      path: '/',
      //重定向
      redirect: '/home/recommend'
    },
    {
      path: '/channel',
      name: 'channel',
      component: ChannelView
    },
    {
      path: '/miCircle',
      name: 'miCircle',
      component: MiCircleView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/user',
      name: 'user',
      component: UserView
    },
    // 搜索
    {
      path: '/search',
      name: 'search',
      component: SearchView
    },
  ]
})

export default router
