<template>
    <!-- 预加载图 -->
    <div class="loading" v-show="bannerList.length < 0">
        <img src="../../assets/navLoading.gif" />
    </div>

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

        <!-- 商品列表 -->
        <ul class="goods" v-if="goodsList.length > 0">
            <li v-for="i in goodsList" :key="i.product_id" @click="goDetails(i.product_id)">
                <img :src="`${i.img_url}`" />
                <div class="msg">
                    <p class="title">{{ i.product_name }}</p>
                    <p class="description">{{ i.product_brief }}</p>
                    <p class="price">￥{{ i.product_price }}起</p>
                    <button class="buy">立即购买</button>
                </div>
            </li>
            <div class="more">更多手机产品<van-icon name="arrow" /></div>
        </ul>

        <!-- 电视海报 -->
        <div class="radio" v-if="radioList.length > 0">
            <img :src="`${radioList[0].img_url}`" />
            <div class="more">更多电视产品<van-icon name="arrow" /></div>
        </div>

        <!-- 笔记本电脑 -->
        <div class="notebook" v-if="notebookPlaybill.length > 0">
            <img :src="`${notebookPlaybill[0].img_url}`" />
            <ul class="goods" v-if="notebookList.length > 0">
                <li v-for="i in notebookList" :key="i.product_id" @click="goDetails(i.product_id)">
                    <img :src="`${i.img_url}`" />
                    <div class="msg">
                        <p class="title">{{ i.product_name }}</p>
                        <p class="description">{{ i.product_brief }}</p>
                        <p class="price">￥{{ i.product_price }}起</p>
                        <button class="buy">立即购买</button>
                    </div>
                </li>
            </ul>
            <div class="more">更多笔记本产品<van-icon name="arrow" /></div>
        </div>

        <!-- 家电海报homeAppliance  -->
        <div class="radio" v-if="homeAppliancePlaybill.length > 0">
            <img :src="`${homeAppliancePlaybill[0].img_url}`" />
            <div class="more">更多家电产品<van-icon name="arrow" /></div>
        </div>

        <!-- 智能产品 -->
        <ul class="smart" v-if="smartList.length > 0">
            <li v-for="i in smartList" :key="i.material_id">
                <img :src="`${i.img_url}`" />
            </li>
            <div class="more">更多智能产品<van-icon name="arrow" /></div>
        </ul>

        <!-- 换新海报 -->
        <div class="radio" v-if="upgradePlaybill.length > 0">
            <img :src="`${upgradePlaybill[0].img_url}`" />
        </div>
    </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import {useRoute, useRouter} from 'vue-router'
let $route = useRoute();
let $router = useRouter();

let bannerList = ref([]);
let categoryList = ref([]);
let bigImgList = ref([]);
let goodsList = ref([]);
let radioList = ref([]);
let notebookPlaybill = ref([]);
let notebookList = ref([]);
let homeAppliancePlaybill = ref([]);
let smartList = ref([]);
let upgradePlaybill = ref([]);

const axios = inject("$axios");

async function getDataList() {
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
    // 商品数据
    const goods1 = data.data.data.data.sections[6].body.items;
    const goods2 = data.data.data.data.sections[8].body.items;
    const goods3 = data.data.data.data.sections[10].body.items;
    goodsList.value = [...goods1, ...goods2, ...goods3];
    // 电视海报数据
    radioList.value = data.data.data.data.sections[14].body.items;
    // 笔记本海报数据
    notebookPlaybill.value = data.data.data.data.sections[18].body.items;
    // 笔记本列表数据
    notebookList.value = data.data.data.data.sections[20].body.items;
    // 家电海报数据
    homeAppliancePlaybill.value = data.data.data.data.sections[24].body.items;
    // 智能产品数据
    const smart1 = data.data.data.data.sections[29].body.items;
    const smart2 = data.data.data.data.sections[31].body.items;
    const smart3 = data.data.data.data.sections[33].body.items;
    smartList.value = [...smart1, ...smart2, ...smart3];
    // 以旧换新
    upgradePlaybill.value = data.data.data.data.sections[35].body.items;

    console.log(data.data.data.data);

}

// 跳转详情页goDetails
function goDetails(id) {
    $router.push({
        name: 'details',
        params: {
            id: id
        }
    })
}

onMounted(() => {
    getDataList();
})
</script>

<style lang="scss" scoped>
// 加载图
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
        background-color: rgb(250, 250, 250);
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
            height: 100%;
            border-radius: 5px;
        }

        .right {
            display: flex;
            flex-direction: column;
            flex: 0 1 49%;
            height: 100%;
            box-sizing: border-box;
        }

        .right img {
            width: 100%;
            height: 100%;
            height: 50%;
            border-radius: 5px;
        }

        .right img:first-child {
            margin-bottom: 8px;
        }
    }

    .goods {
        width: 100%;
        background-color: rgb(250, 250, 250);
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 10px;
    }

    .goods li {
        text-align: center;
        flex: 0 1 49%;
        margin-bottom: 5px;
    }

    .goods li img {
        width: 100%;
        border-radius: 5px;
    }

    .goods li .msg {
        font-size: 14px;

        .description {
            font-size: 13px;
            color: #777;
        }

        .title,
        .description {
            padding: 0 12px;
            box-sizing: border-box;
            margin-bottom: 5px;
            width: 178px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .price {
            font-size: 13px;
            color: #ff4d53;
            font-weight: bold;
            margin-bottom: 5px;
        }

        button {
            border: none;
            padding: 8px 15px;
            margin-bottom: 10px;
            border-radius: 5px;
            background-color: #698FCB;
            color: rgb(250, 250, 250);
        }
    }

    .goods .more {
        width: 100%;
        height: 5vh;
        line-height: 5vh;
        text-align: center;
        font-style: italic;
        font-weight: lighter;

        i {
            font-style: italic;
        }
    }

    // 电视
    .radio {
        width: 100%;
        background-color: rgb(250, 250, 250);
        margin-bottom: 10px;
        border-radius: 5px;

        img {
            width: 100%;
            border-radius: 5px;
        }
    }

    .radio .more {
        width: 100%;
        height: 5vh;
        line-height: 5vh;
        text-align: center;
        font-style: italic;
        font-weight: lighter;

        i {
            font-style: italic;
        }
    }

    // 笔记本
    .notebook {
        width: 100%;
        margin-bottom: 10px;
        background-color: rgb(250, 250, 250);
        border-radius: 5px;

        img {
            width: 100%;
            border-radius: 5px;
            margin-bottom: 5px;
        }
    }

    .notebook .goods {
        width: 100%;
        background-color: rgb(250, 250, 250);
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        border-radius: 5px;
        overflow: hidden;
        margin: 0;
    }

    .notebook .goods li {
        text-align: center;
        flex: 0 1 49%;
        margin-bottom: 5px;
    }

    .notebook .goods li img {
        width: 100%;
        border-radius: 5px;
    }

    .notebook .goods li .msg {
        font-size: 14px;

        .description {
            font-size: 13px;
            color: #777;
        }

        .title,
        .description {
            padding: 0 12px;
            box-sizing: border-box;
            margin-bottom: 5px;
            width: 178px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .price {
            font-size: 13px;
            color: #ff4d53;
            font-weight: bold;
            margin-bottom: 5px;
        }

        button {
            border: none;
            padding: 8px 15px;
            margin-bottom: 10px;
            border-radius: 5px;
            background-color: #698FCB;
            color: rgb(250, 250, 250);
        }
    }

    .notebook .more {
        width: 100%;
        height: 5vh;
        line-height: 5vh;
        text-align: center;
        font-style: italic;
        font-weight: lighter;

        i {
            font-style: italic;
        }
    }

    // 智能产品
    .smart {
        width: 100%;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-bottom: 10px;
        // background-color: rgb(250, 250, 250);

        li {
            flex: 0 1 49%;
        }

        li img {
            width: 100%;
            vertical-align: bottom;
            margin-bottom: 5px;
            border-radius: 5px;
        }

        .more {
            width: 100%;
            height: 5vh;
            line-height: 5vh;
            text-align: center;
            font-style: italic;
            font-weight: lighter;

            i {
                font-style: italic;
            }
        }
    }
}
</style>