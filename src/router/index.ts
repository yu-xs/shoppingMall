import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChannelView from '../views/ChannelView.vue'
import MiCircleView from '../views/MiCircleView.vue'
import CartView from '../views/CartView.vue'
import UserView from '../views/UserView.vue'
import SearchView from '../views/SearchView.vue'
import SearchPageView from '../views/SearchPageView.vue'
import CatePageView from '../views/CatePageView.vue'

import { checkAuth } from '../untils/auth.js';

import { Toast } from 'vant';
import { showToast } from 'vant';

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
          meta: {
            title: "推荐",
            isTab: true,
          },
          component: () => import('../views/HomeViewChild/RecommendView.vue')
        },
        {
          path: 'smart',
          name: 'smart',
          meta: {
            title: "智能",
            isTab: true,
          },
          component: () => import('../views/HomeViewChild/SmartView.vue')
        },
        {
          path: 'radio',
          name: 'radio',
          meta: {
            title: "电视",
            isTab: true,
          },
          component: () => import('../views/HomeViewChild/RadioView.vue')
        },
        {
          path: 'homeAppliance',
          name: 'homeAppliance',
          meta: {
            title: "家电",
            isTab: true,
          },
          component: () => import('../views/HomeViewChild/HomeApplianceView.vue')
        },
        {
          path: 'notebook',
          name: 'notebook',
          meta: {
            title: "笔记本",
            isTab: true,
          },
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
      meta: {
        title: "分类",
        isTab: true,
      },
      component: ChannelView
    },
    {
      path: '/miCircle',
      name: 'miCircle',
      meta: {
        title: "社区",
        isTab: true,
      },
      component: MiCircleView
    },
    {
      path: '/cart',
      name: 'cart',
      meta: {
        title: "购物车",
        isTab: true,
      },
      component: CartView,
      beforeEnter: (to: any, from: any, next: any): any => {
        if (checkAuth()) {
          next(); // 已登录，继续访问
        } else {
          next('/login'); // 未登录，跳转到登录页
        }
      }
    },
    {
      path: '/user',
      name: 'user',
      meta: {
        title: "我的",
        isTab: true,
      },
      component: UserView,
      beforeEnter: (to: any, from: any, next: any): any => {
        if (checkAuth()) {
          next(); // 已登录，继续访问
        } else {
          next('/login'); // 未登录，跳转到登录页
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: "登录页",
        isTab: false,
      },
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: "注册页",
        isTab: false,
      },
      component: () => import('../views/RegisterView.vue')
    },
    // 详情页
    {
      path: '/details/:id',
      name: 'details',
      component: () => import('../views/DetailsView.vue')

    },
    // 搜索
    {
      path: '/search',
      name: 'search',
      meta: {
        title: "搜索",
        isTab: false,
      },
      component: SearchView
    },
    // 搜索结果详情页
    {
      path: '/searchPage/:value',
      name: 'searchPage',
      meta: {
        title: "搜索结果详情页",
        isTab: false,
      },
      component: SearchPageView
    },
    // 分类cate详情页
    {
      path: '/cate/:cateId',
      name: 'cate',
      meta: {
        title: "分类cate详情页",
        isTab: false,
      },
      component: CatePageView
    },
    // 买家秀详情页
    {
      path: '/buyerShow/:id',
      name: 'buyerShow',
      meta: {
        title: "买家秀详情页",
        isTab: false,
      },
      component: () => import('../views/buyerShowPageView.vue')
    },
    // 个人信息页
    {
      path: '/userInfo/:userName/:userImg',
      name: 'userInfo',
      meta: {
        title: "个人信息页",
        isTab: false,
      },
      component: () => import('../views/UserInfoView.vue')
    },
    // 收货地址页
    {
      path: '/shipAddress',
      name: 'shipAddress',
      meta: {
        title: "收货地址页",
        isTab: false,
      },
      component: () => import('../views/ShipaddressView.vue')
    },
    // 修改收货地址页
    {
      path: '/editAddress',
      name: 'editAddress',
      meta: {
        title: "修改收货地址页",
        isTab: false,
      },
      component: () => import('../views/EditAddressView.vue')
    },
    // 新增收货地址页
    {
      path: '/newAddress',
      name: 'newAddress',
      meta: {
        title: "新增收货地址页",
        isTab: false,
      },
      component: () => import('../views/NewAddressView.vue')
    },
    // 地图页
    {
      path: '/map',
      name: 'map',
      meta: {
        title: "地图页",
        isTab: false,
      },
      component: () => import('../views/MapView.vue')
    },
    // 支付页
    {
      path: '/payment',
      name: 'payment',
      meta: {
        title: "支付页",
        isTab: false,
      },
      component: () => import('../views/PaymentView.vue'),
      beforeEnter: (to: any, from: any, next: any): any => {
        if (checkAuth()) {
          next(); // 已登录，继续访问
        } else {
          showToast('您还未登录, 请先登录!');
          next('/login'); // 未登录，跳转到登录页
        }
      }
    },
    // 订单页
    {
      path: '/order',
      name: 'order',
      meta: {
        title: "订单页",
        isTab: false,
      },
      component: () => import('../views/MyOrderView.vue')
    },
  ]
})

export default router
