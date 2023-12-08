<template>
    <div class="searchPage">
        <!-- 预加载图 -->
        <div class="loading" v-show="!(resList.length > 0)">
            <img src="../assets/navLoading1.gif" />
        </div>

        <div class="searchBox">
            <van-icon name="arrow-left" @click="goBack()" />
            <input v-model="searchVal" type="text" placeholder="请搜索商品名称" />
            <van-icon name="search" />
        </div>

        <ul class="searchRes" v-show="searchVal">
            <li v-for="i in searchResList" :key="i.log_code" @click="goSearchPage(i.title)">{{ i.title }}</li>
        </ul>

        <!-- 搜索结果列表 -->
        <ul class="resList" v-if="resList.length > 0">
            <li v-for="i in resList" :key="i.body.product_id" v-show="i.body.image">
                <div class="left">
                    <img :src="`${i.body.image}`" />
                </div>
                <div class="right">
                    <p class="title">{{ i.body.name }}</p>
                    <p class="description" v-html="`${i.body.desc}`"></p>
                    <div class="msg">
                        <ul class="top">
                            <li v-for=" item in i.body.class_parameters">
                                <p></p>
                                <span></span>
                            </li>
                        </ul>
                        <div class="bottom">
                            <p class="price">￥<b>{{ i.body.price }}</b> 起 <span>￥{{ i.body.market_price }}</span></p>
                            <p class="assess">
                                <span v-if="i.body.comments_total">{{ assessCount(i.body.comments_total) }}条评价</span>
                                <span v-if="i.body.satisfy_per">{{ i.body.satisfy_per }}满意</span>
                            </p>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
let $route = useRoute();
let $router = useRouter();

let resList = ref([]);
let searchResList = ref([]);
let searchVal = ref($route.params.value);

const axios = inject("$axios");

async function getResList() {
    const data = await axios.post(`/api/v1/hisearch/query_v3?query=${searchVal.value}`);

    resList.value = data.data.data.list_v2;
    console.log(resList.value);
}

// 搜索词数据
async function getSearchResList(value) {
    const data = await axios.post(`/api/v1/hisearch/suggestion_v3?query=${value}`);

    searchResList.value = data.data.data.list;
    console.log(searchResList.value);
}

// 返回
function goBack() {
    $router.go(-1);
}

// 计算评价量
function assessCount(count) {
    if (count > 100000000) {
        return (count / 100000000).toFixed(2) + '亿'
    }
    else if (count > 10000) {
        return (count / 10000).toFixed(2) + '万'
    }
    else {
        return count;
    }
}

// 监听搜索词
watch(searchVal, (newVal) => {
    getSearchResList(newVal);
    console.log("搜索词改变=>", newVal);
})

onMounted(() => {
    // searchVal.value = $route.params.value;
    getResList();
});
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

.searchPage {
    background-color: rgb(250, 250, 250);
    height: 100%;

    .searchBox {
        position: relative;
        padding: 10px 0;
        box-sizing: border-box;
        background-color: #82a99f;
        display: flex;
        align-items: center;
    }

    .searchBox i {
        font-size: 20px;
        font-weight: bold;
        padding: 0 15px;
    }

    .searchBox input {
        flex: 1;
        height: 30px;
        padding-left: 10px;
        box-sizing: border-box;
        outline: none;
        border: #82a99f;
        border-radius: 10px;
        font-size: 14px;
    }

    // 搜索词列表
    .searchRes {
        position: absolute;
        top: 50px;
        left: 0;
        right: 0;
        padding: 0 10px;
        background-color: rgb(250, 250, 250);

        li {
            padding: 14px 0;
            border-bottom: 1px solid rgba(204, 204, 204, 0.3);
            box-sizing: border-box;

            color: #333;
            font-size: 15px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    // 搜索结果列表
    .resList {
        padding: 5px;
        padding-bottom: 0;
        box-sizing: border-box;
    }

    .resList>li {
        display: flex;
        align-items: center;
        // margin: 10px 0;
        margin-top: 10px;
        border-bottom: 1px solid #c5e6dd;
    }

    .resList>li:last-child {
        display: none;
    }

    .resList li .left {
        flex: 0 1 32%;

        img {
            width: 100%;
            vertical-align: bottom;
        }
    }

    .resList li .right {
        flex: 0 1 68%;

        .title {
            width: 245px;
            margin-bottom: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .description {
            width: 245px;
            font-size: 13px;
            color: #777;
            line-height: 1.3;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
        }

        .msg .top {
            display: flex;
            margin: 10px 0;
        }

        .msg .top>li {
            font-size: 12px;
            text-align: center;
            padding: 0 5px;
            border-right: 0.5px solid #c5e6dd;
        }

        .msg .top>li:last-child {
            border-right: none;
        }

        .msg .top>li p {
            margin-bottom: 3px;
        }

        .msg .bottom {
            padding-bottom: 10px;
        }

        .msg .bottom .price {
            font-size: 16px;
            margin-bottom: 8px;
        }

        .msg .bottom .price b {
            font-weight: bold;
            color: #ff4d79;
        }

        .msg .bottom .price span {
            font-size: 13px;
            color: #777;
            text-decoration: line-through;
        }

        .msg .bottom .assess {
            font-size: 13px;
            color: #777;
        }

        .msg .bottom .assess span {
            margin-right: 5px;
        }
    }
}
</style>