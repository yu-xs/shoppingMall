<template>
  <div>
    <div class="hd">
      <div class="user" @click="userInfo">
        <div class="headImage"><img class="tx" :src="`${userImg}`"></div>
        <div class="login">{{ userName }}</div>
        <van-icon name="arrow" />
      </div>
    </div>
    <van-cell title="我的订单" is-link value="全部订单" @click="goOrderView" />
    <van-grid :border="false" :column-num="3" icon-size="24px">
      <van-grid-item icon="pending-payment" text="待付款" />
      <van-grid-item icon="logistics" text="待收货" />
      <van-grid-item icon="phone-o" text="退换修" />
    </van-grid>
    <div class="line"></div>

    <van-cell title="单元格" icon="gem-o" is-link size="large">
      <template #title>
        <span class="custom-title">会员中心</span>

      </template>
    </van-cell>

    <van-cell title="单元格" icon="pending-payment" is-link size="large">
      <template #title>
        <span class="custom-title">我的优惠</span>

      </template>
    </van-cell>
    <div class="line"></div>

    <van-cell title="单元格" icon="like-o" is-link size="large">
      <template #title>
        <span class="custom-title">服务中心</span>

      </template>
    </van-cell>

    <div class="line"></div>

    <van-cell title="单元格" icon="shop-o" is-link size="large">
      <template #title>
        <span class="custom-title">我的F码</span>

      </template>
    </van-cell>

    <van-cell title="单元格" icon="point-gift-o" is-link size="large">
      <template #title>
        <span class="custom-title">礼物码兑换</span>

      </template>
    </van-cell>
    <div class="line"></div>

    <van-cell title="单元格" icon="setting-o" is-link size="large">
      <template #title>
        <span class="custom-title">设置</span>

      </template>
    </van-cell>
  </div>
</template>





<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

let $route = useRoute();
let $router = useRouter();

function goLogin() {
  $router.push({ name: 'login' });
}

let userName = ref('');
let userImg = ref('');

// 获取LocalStorage的信息
onMounted(function () {
  const userInfo = localStorage.getItem('user');
  userName.value = JSON.parse(userInfo).nickname;
  userImg.value = JSON.parse(userInfo).userImg;
});

// 跳转个人信息页
function userInfo() {
  $router.push({
    name: 'userInfo',
    params: {
      userName: userName.value,
      userImg: userImg.value
    }
  });
}

// 跳转我的订单页
function goOrderView() {
  $router.push({
    name: 'order'
  });
}
</script>

<style scoped>
.hd {
  background: url(https://m.mi.com/static/img/bg.63c8e19851.png) center 0 #f37d0f;
  background-size: auto 100%;



  height: 83.4px;
  /* background-color: aqua; */
  padding-top: 16.7px;
  box-sizing: border-box;
}

.user {
  height: 50px;
  /* background-color: yellow; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
}

.headImage {
  width: 50px;
  height: 50px;
  /* background-color: blueviolet; */
}

.login {
  flex: 1;
  height: 50px;
  color: #fff;
  font-size: 16px;
  text-align: left;
  line-height: 50px;
  margin-left: 10px;
}

.user i {
  color: white;
}

.tx {
  width: 100%;
  height: 100%;
  vertical-align: bottom;
  border-radius: 50%;
}

.line {
  background: #f5f5f5;
  height: 10px;
}
</style>