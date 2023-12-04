<template>
    <!-- https://m.mi.com/v1/home/page -->
    <div class="recommend">
        <div class="banner">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#82A99F">
                <van-swipe-item v-for="i in bannerList" :key="i.material_id">
                    <img :src="`${i.img_url}`" />
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
let bannerList = ref([]);

const axios = inject("$axios");

async function getBannerList() {
    const data = await axios.post("/api/v1/home/page");
    bannerList.value = data.data.data.data.sections[0].body.items;
    console.log(bannerList);
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
}
</style>