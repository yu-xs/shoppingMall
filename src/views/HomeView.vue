<script setup>
import navComponents from '../components/bottom-navBar/navComponents.vue'
import { inject, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from 'vue-router'
let $route = useRoute();
let $router = useRouter();

const axios = inject("$axios");

let childArr = ref(['recommend', 'smart', 'radio', 'homeAppliance', 'notebook']);

// 顶部导航栏高亮
let topNavActive = ref(0);

let navBarList = ref([]);

async function getNavBar() {
  // const navBar = await axios.get("https://apic.netstart.cn/xmsc/home/page");
  const data = await axios.post("/api/v1/home/page");

  navBarList.value = data.data.data.tabs;
  console.log(navBarList.value);
}

function goUserView() {
  $router.replace({ name: 'user' })
}

// 切换顶部导航栏
function switchNavView({ name }) {
  // $router.replace({ name: `${childArr[name]}` })

  topNavActive.value = name;
  console.log(name);
}

onMounted(() => {
  getNavBar();
});
</script>

<template>
  <!-- 预加载图 -->
  <div class="loading" v-show="!(navBarList.length > 0)">
    <img src="../assets/loading.gif" />
  </div>

  <div class="home">
    <div class="bg"></div>

    <!-- 搜索栏 -->
    <div class="search">
      <div class="logo">
        <img src="../assets/logo01.png" />
      </div>
      <div class="searchInp">
        <van-search shape="round" background="transparent" placeholder="请输入搜索关键词" :to="{ name: 'search' }" />
      </div>
      <div class="user" @click="goUserView">
        <img src="../assets/icon-user.png" />
      </div>
    </div>

    <!-- 顶部导航栏 -->
    <van-tabs v-model:active="topNavActive" background="#82A99F" color="#60627D" title-active-color="#60627D" animated
      sticky @click-tab="switchNavView">
      <keep-alive>
        <van-tab v-for="(i, index) in navBarList " :title="i.name" :name="index" :to="{ name: `${childArr[index]}` }">
          <router-view />
        </van-tab>
      </keep-alive>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}

.loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding-top: 100px;
  box-sizing: border-box;
  background-color: white;
  z-index: 1000;

  img {
    width: 100%;
  }
}

.home {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  overflow-y: scroll;
  background-color: rgb(250, 250, 250);
  z-index: 0;
  padding: 0 5px;
  padding-bottom: 48px;
  box-sizing: border-box;

  .bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 30vh;
    transform: scale(1.2);
    border-radius: 0 0 40% 40%;
    background-color: #82a99f;
    z-index: -1;
  }

  .search {
    display: flex;
    align-items: center;

    .logo img {
      width: 22px;
      margin-left: 5px;
      // height: 30px;
      // border-radius: 5px;
    }

    .searchInp {
      flex: 1;
    }

    .user img {
      width: 25px;
      height: 25px;
    }
  }

  // .van-tabs::before{
  //   position: absolute;
  //   top: 42px;
  //   content: "";
  //   width: 92vw;
  //   height: 2px;
  //   background-color: #ccc;
  // }
}
</style>