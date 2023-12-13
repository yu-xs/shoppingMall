<template>
    <!-- 预加载图 -->
    <div class="loading" v-show="!(reviewsList.length > 0)">
        <img src="../assets/loading01.gif" />
    </div>

    <div class="buyerShow">
        <van-nav-bar fixed="true" title="评论" left-arrow @click-left="goBack" />

        <!-- 评论类型 -->
        <ul class="reviews">
            <li v-for="(i, index) in reviewsType" :key="i.profile_id" @click="getReviewList(i.profile_id, index)"
                :class="{ active: active === index }">{{ i.tag_name
                }}</li>
        </ul>

        <ul class="reviewsList">
            <li v-for="i in reviewsList">
                <div class="top">
                    <div class="left">
                        <img :src="`${i.user_avatar}`" />
                        <span class="name">{{ i.user_name }}</span>
                    </div>
                    <div class="right">
                        <van-icon name="ellipsis" />
                    </div>
                </div>
                <p class="content">{{ i.comment_content }}</p>
                <ul class="imgBox" v-if="i.comment_images">
                    <li v-for="i in i.comment_images">
                        <img :src="i" />
                    </li>
                </ul>
                <div class="bottom">
                    <van-icon name="share-o" />
                    <van-icon name="chat-o" />
                    <van-icon name="good-job-o" />
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, inject, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
let route = useRoute()
let router = useRouter()

let goodsId = ref(route.params.id);

const axios = inject("$axios");

function goBack() {
    router.back();
}

// 获取评论页数据
let reviewsType = ref([]);
let reviewsList = ref([]);
async function getReviewsData() {
    const data = await axios.post(`/api/v1/communicate/mizone_buyer_show_list?commodity_id=${goodsId.value}&page_size=10&need_detail=true`);
    reviewsType.value = data.data.data.detail.comment_tags;
    reviewsList.value = data.data.data.comments;
    console.log(reviewsType.value);
}

let reviewsId = ref('');
async function getReviewsList() {
    const data = await axios.post(`/api/v1/communicate/mizone_buyer_show_list?commodity_id=${goodsId.value}&page_size=10&profile_id=${reviewsId.value}`);
    reviewsList.value = data.data.data.comments;
    console.log(reviewsList.value);
}

// 切换评论类型
let active = ref(0);
function getReviewList(id, activeId) {
    reviewsId.value = id;
    active.value = activeId;
}

watch(reviewsId, (newVal) => {
    console.log(newVal);
    getReviewsList();
});

onMounted(() => {
    getReviewsData();
})
</script>

<style lang="scss" scoped>
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

.buyerShow {
    padding-top: 46px;
    background-color: rgb(250, 250, 250);
    // padding: 0 10px;
    box-sizing: border-box;

    .van-nav-bar {
        --van-nav-bar-icon-color: #698FCB;
        --van-nav-bar-arrow-size: 20px;
    }

    .reviews {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        overflow: auto;
        margin: 10px 0;

        li {
            color: rgb(95, 95, 95);
            font-size: 14px;
            white-space: nowrap;
            padding: 5px 10px;
            box-sizing: border-box;
            // 渐变背景颜色
            background: linear-gradient(to bottom right, #ffffff, rgb(255, 226, 188));
            margin: 0 5px;
            border-radius: 999px;
        }

        li.active {
            background: linear-gradient(to bottom right, rgb(255, 145, 0), #ffffff);
        }
    }

    // 评论列表
    .reviewsList {
        padding: 0 8px;
        box-sizing: border-box;

        li {
            margin: 10px 0;
            padding: 0 10px;
            box-sizing: border-box;
            background-color: white;
            border-radius: 10px;
        }

        li .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
        }

        li .top .left {
            display: flex;
            align-items: center;
        }

        li .top .left img {
            width: 25px;
            height: 25px;
            vertical-align: bottom;
            border-radius: 50%;
            margin-right: 5px;
        }

        li .top .left .name {
            font-size: 13px;
        }

        li .top .right i {
            font-size: 20px;
        }

        li .content {
            width: 90vw;
            font-size: 15px;
            color: #333;
            line-height: 1.2;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
        }

        li .bottom {
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 15px 0;
            font-size: 18px;
            color: #333;
        }

        li .imgBox {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            margin-top: 10px;
        }

        li .imgBox>li {
            margin: 0;
            padding: 0;
            flex: 0 1 30%;
            margin-bottom: 5px;
            margin-right: 5px;
        }

        li .imgBox>li img {
            width: 100%;
            vertical-align: bottom;
            border-radius: 5px;
        }
    }
}
</style>