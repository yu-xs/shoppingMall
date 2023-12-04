import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChannelView from '../views/ChannelView.vue'
import MiCircleView from '../views/MiCircleView.vue'
import CartView from '../views/CartView.vue'
import UserView from '../views/UserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
  ]
})

export default router
