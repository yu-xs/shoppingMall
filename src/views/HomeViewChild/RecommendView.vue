<template>
    <div class="recommend">
        <div class="banner" v-if="bannerList.length > 0">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#82A99F">
                <van-swipe-item v-for="i in bannerList" :key="i.material_id">
                    <img :src="`${i.img_url}`" />
                </van-swipe-item>
            </van-swipe>
        </div>

        <ul class="category" v-if="categoryList.length > 0">
            <li v-for="i in categoryList" :key="i.material_id">
                <img :src="`${i.img_url}`" />
            </li>
        </ul>

        <div class="bigImg" v-if="bigImgList.length > 0">
            <div class="left">
                <img :src="`${bigImgList[0].img_url}`" />
            </div>
            <div class="right">
                <img :src="`${bigImgList[1].img_url}`" />
                <img :src="`${bigImgList[2].img_url}`" />
            </div>
        </div>

        <div class="goods"></div>
    </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
let bannerList = ref([]);
let categoryList = ref([]);
let bigImgList = ref([]);

const axios = inject("$axios");

async function getBannerList() {
    console.log('请求数据')
    const data = await axios.post("/api/v1/home/page");
    // 轮播图数据
    bannerList.value = data.data.data.data.sections[0].body.items;
    // 分类数据 
    const category1 = data.data.data.data.sections[1].body.items;
    const category2 = data.data.data.data.sections[2].body.items;
    categoryList.value = category1.concat(category2);
    // 大图商品数据
    bigImgList.value = data.data.data.data.sections[4].body.items;
    console.log(bigImgList);

}

onMounted(() => {
    getBannerList();
})
</script>

<style lang="scss">
.recommend {
    .banner {
        border-radius: 15px;
        overflow: hidden;
        margin-top: 5px;
    }

    .banner .my-swipe img {
        width: 100%;
        vertical-align: bottom;
    }

    .category {
        background-color: white;
        display: flex;
        flex-wrap: wrap;
        border-radius: 10px;
        overflow: hidden;
        margin: 10px 0;

        li {
            flex: 0 1 20%;
        }

        li img {
            width: 100%;
            vertical-align: bottom;
        }
    }

    .bigImg {
        width: 100%;
        height: 265px;
        background-color: white;
        display: flex;
        justify-content: space-between;
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 10px;

        .left {
            flex: 0 1 49%;
            height: 100%;
        }

        .left img {
            width: 100%;
            border-radius: 5px;
        }

        .right {
            display: flex;
            flex-direction: column;
            flex: 0 1 49%;
            height: 100%;
        }

        .right img {
            width: 100%;
            height: 50%;
            border-radius: 5px;
            margin-bottom: 5px;
        }
    }

    .goods{
        width: 100%;
        height: 300px;
    }
}
</style>