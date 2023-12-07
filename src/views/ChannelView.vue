<template>
    <div class="channel">
        <div class="search">
            <van-search shape="round" background="#82A99F" placeholder="请输入搜索关键词" />
        </div>
        <div style="height: 54px;"></div>

        <div class="content">
            <!-- 左 -->
            <div class="sideBar" v-if="sideBarList.length > 0">
                <van-sidebar v-model="state.active">
                    <van-sidebar-item v-for="(i, index) in sideBarList" :key="i.category_id" :title="`${i.category_name}`"
                        @click="getCategoryId(i.category_id, index)" />
                </van-sidebar>
            </div>
            <!-- 右 -->
            <div class="goods">
                <swiper class="swiper" :slides-per-view="1" :space-between="50" :direction="'vertical'" @swiper="setSwiper"
                    @slideChange="onSlideChange" ref="swiperRef">
                    <swiper-slide>
                        <RecommendComponent />
                    </swiper-slide>
                    <swiper-slide>Slide 2</swiper-slide>
                    <swiper-slide>Slide 3</swiper-slide>
                    <swiper-slide>Slide 4</swiper-slide>
                    <swiper-slide>Slide 5</swiper-slide>
                    <swiper-slide>Slide 6</swiper-slide>
                    <swiper-slide>Slide 7</swiper-slide>
                    <swiper-slide>Slide 8</swiper-slide>
                    <swiper-slide>Slide 9</swiper-slide>
                    <swiper-slide>Slide 10</swiper-slide>
                    <swiper-slide>Slide 11</swiper-slide>
                    <swiper-slide>Slide 12</swiper-slide>
                    <swiper-slide>Slide 13</swiper-slide>
                    <swiper-slide>Slide 14</swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script setup>
// 引入组件, 不用注册
import RecommendComponent from '../components/Category_recommend.vue'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';

import { ref, reactive, inject, watch, onMounted } from 'vue'
let state = reactive({
    active: 0,
});

// 获取swiper实例
const swiperData = reactive({
    swiperRef: null,
});
const setSwiper = (swiper) => {
    swiperData.swiperRef = swiper;
    console.log(swiperData.swiperRef);
}

let categoryId = ref(-1);

let sideBarList = ref([]);
let categoryList1 = ref([]);

const axios = inject("$axios");

const onSlideChange = (swiper) => {
    console.log('slide change');
    var currentIndex = swiper.activeIndex;
    var previousIndex = swiper.previousIndex;

    var direction = currentIndex > previousIndex ? 'next' : 'prev';
    console.log('滚动方向:', direction);

    if (direction === 'next') {
        state.active += 1;
    } else if (direction === 'prev') {
        state.active -= 1;
    }
};

function getCategoryId(id, index) {
    categoryId.value = id;
    console.log(categoryId.value);

    swiperData.swiperRef.slideTo(index);
}

async function getDataList() {
    console.log('请求数据')
    // 侧边栏数据
    const dataSideBar = await axios.post("/api/v1/home/category_v2");
    sideBarList.value = dataSideBar.data.data;

}
async function getCategoryList(categoryId) {
    console.log('请求数据')
    // 分类数据
    const dataCategory = await axios.post(`/api/v1/home/category_v2?cat_id=${categoryId}`);
    if (dataCategory.data.data.length > 1) {
        categoryList1.value = dataCategory.data.data[1].category_list;
        console.log("dataCategory长度大于1", categoryList1)
    }
    else {
        categoryList1.value = dataCategory.data.data[0].category_list;
        console.log("dataCategory长度等于1", categoryList1);
    }
}

watch(categoryId, (newVal) => {
    console.log("categoryId发生改变=>", newVal);
    getCategoryList(newVal);
})

onMounted(() => {
    // let categoryIndex = active.value;
    getDataList();
    // getCategoryList();
})
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
    display: none;
}

.channel {
    // padding-bottom: 47px;

    .search {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
    }

    .content {
        width: 100%;
        height: 85vh;
        display: flex;
    }

    .content .sideBar {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        width: 80px;
        // max-height: 100%;
        padding-top: 54px;
        padding-bottom: 47px;
        overflow: hidden;
        overflow-y: scroll;
    }

    .content .sideBar .van-sidebar {
        width: 100%;
    }


    .content .sideBar .van-sidebar-item {
        text-align: center;
        padding: 15px 0;
        color: #777;
        font-size: 12.5px;
        background-color: rgb(250, 250, 250);
    }

    .van-sidebar-item--select:before {
        background-color: #c5e6dd;
    }

    .content .goods {
        flex: 0 1 100%;
        max-height: 100%;
        margin-left: 80px;
        background-color: #c5e6dd;
        overflow: hidden;
        overflow-y: scroll;
    }

    // 右侧商品swiper
    .swiper {
        width: 100%;
        height: 100%;
    }
}
</style>