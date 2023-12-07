<template>
    <div class="smart">
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

        <!-- 横幅数据 -->
        <ul class="streamer">
            <li v-for="i in streamerList" :key="i.activity_code">
                <img :src="`${i.img_url}`" />
            </li>
        </ul>

        <!-- 便捷出行 -->
        <ul class="travel" v-if="travelsList.length > 0">
            <li v-for="i in travelsList" :key="i.product_id">
                <img :src="`${i.img_url}`" />
                <div class="msg">
                    <p class="title">{{ i.product_name }}</p>
                    <p class="description">{{ i.product_brief }}</p>
                    <p class="price">￥{{ i.product_price }}</p>
                </div>
            </li>
        </ul>

        <!-- 横幅数据2 -->
        <ul class="streamer">
            <li v-for="i in streamerList_Sec" :key="i.activity_code">
                <img :src="`${i.img_url}`" />
            </li>
        </ul>

        <!-- 便捷出行2 -->
        <ul class="travel" v-if="travelsList_Sec.length > 0">
            <li v-for="i in travelsList_Sec" :key="i.product_id">
                <img :src="`${i.img_url}`" />
                <div class="msg">
                    <p class="title">{{ i.product_name }}</p>
                    <p class="description">{{ i.product_brief }}</p>
                    <p class="price">￥{{ i.product_price }}</p>
                </div>
            </li>
        </ul>

        <div class="playBill" v-if="playbill.length > 0">
            <img :src="playbill[0].img_url" />
        </div>
    </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
let bannerList = ref([]);
let categoryList = ref([]);
let streamerList = ref([]);
let travelsList = ref([]);
let streamerList_Sec = ref([]);
let travelsList_Sec = ref([]);
let playbill = ref([]);

const axios = inject("$axios");

async function getDataList() {
    console.log('请求数据')
    const data = await axios.post("/api/v1/home/page?page_id=10288&page_type=activity");
    // 轮播图数据
    bannerList.value = data.data.data.data.sections[0].body.items;
    // 分类数据 
    const category1 = data.data.data.data.sections[2].body.items;
    const category2 = data.data.data.data.sections[3].body.items;
    categoryList.value = category1.concat(category2);
    // 横幅数据
    const streamer1 = data.data.data.data.sections[5].body.items;
    const streamer2 = data.data.data.data.sections[7].body.items;
    const streamer3 = data.data.data.data.sections[9].body.items;
    const streamer4 = data.data.data.data.sections[11].body.items;
    const streamer5 = data.data.data.data.sections[13].body.items;
    const streamer6 = data.data.data.data.sections[15].body.items;
    const streamer7 = data.data.data.data.sections[17].body.items;
    const streamer8 = data.data.data.data.sections[19].body.items;
    streamerList.value = [...streamer1, ...streamer2, ...streamer3, ...streamer4, ...streamer5, ...streamer6, ...streamer7, ...streamer8,];
    // 便捷出行数据
    const travel1 = data.data.data.data.sections[21].body.items;
    const travel2 = data.data.data.data.sections[23].body.items;
    travelsList.value = [...travel1, ...travel2];
    // 横幅数据2
    const streamer1_Sec = data.data.data.data.sections[25].body.items;
    const streamer2_Sec = data.data.data.data.sections[27].body.items;
    const streamer3_Sec = data.data.data.data.sections[29].body.items;
    streamerList_Sec.value = [...streamer1_Sec, ...streamer2_Sec, ...streamer3_Sec];
    // 便捷出行数据2
    travelsList_Sec.value = data.data.data.data.sections[31].body.items;
    // 底部海报
    playbill.value = data.data.data.data.sections[33].body.items;
    console.log(playbill);

}

onMounted(() => {
    getDataList();
})
</script>

<style lang="scss" scoped>
.smart {
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
        overflow: hidden;
        border-radius: 5px;
        margin: 10px 0;

        li {
            flex: 0 1 20%;
        }

        li img {
            width: 100%;
            vertical-align: bottom;
        }
    }

    // 横幅
    .streamer {
        li {
            width: 100%;
        }

        li img {
            width: 100%;
            vertical-align: bottom;
            margin: 2px 0;
            border-radius: 10px;
        }
    }

    // 便捷出行
    .travel {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 10px;
        margin-bottom: 5px;
    }

    .travel li {
        flex: 0 1 32%;
        background-color: #fff;
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 5px;
    }

    .travel li img {
        width: 100%;
    }

    .travel li .msg {
        width: 100%;
        text-align: center;
        padding: 10px 0;
        box-sizing: border-box;

        .title,
        .description {
            font-size: 13px;
            font-weight: bold;
            width: 115px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 0 5px;
            box-sizing: border-box;
        }

        .description {
            font-size: 12px;
            font-weight: lighter;
            margin: 6px 0;
        }

        .price {
            font-weight: bold;
            color: red;
        }
    }

    // 海报
    .playBill {
        width: 100%;
        background-color: rgb(250, 250, 250);
        margin-bottom: 5px;
        border-radius: 5px;

        img {
            width: 100%;
            border-radius: 5px;
        }
    }
}
</style>