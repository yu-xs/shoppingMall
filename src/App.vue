<script setup>
import { ref, reactive, onMounted } from 'vue';

let isActive = ref(0);

const navList = reactive([
  { name: '首页', path: 'home', picUrl: '../public/images/icon-home.png' },
  { name: '分类', path: 'channel', picUrl: '../public/images/icon-category.png' },
  { name: '社区', path: 'miCircle', picUrl: '../public/images/icon-star.png' },
  { name: '购物车', path: 'cart', picUrl: '../public/images/icon-cart.png' },
  { name: '我的', path: 'user', picUrl: '../public/images/icon-user.png' },
])

function activeIndex(i) {
  isActive = i;
  console.log(isActive, i);
}

</script>

<template>
  <div class="nav">
    <RouterLink v-for="(i, index) in navList" :key="index" :to="{ name: `${i.path}` }" @click="activeIndex(index)">
      <img :src="`${i.picUrl}`" />
      <span :class="{ active: index == isActive }">{{ i.name }}</span>
    </RouterLink>
  </div>

  <RouterView />
</template>

<style lang="scss" scoped>
.nav {
  width: 100vw;
  height: 7vh;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
  background-color: white;

  a {
    padding: 10px 15px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  a img {
    width: 21px;
    height: 21px;
    vertical-align: bottom;
    margin-bottom: 5px;
  }

  a span {
    color: #999;
    font-weight: bold;
  }

  a span.active {
    color: #82A99F;
  }
}
</style>
