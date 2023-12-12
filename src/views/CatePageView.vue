<template>
    <div class="catePage">
        <!-- 预加载图 -->
        <div class="loading" v-show="!(cateList.length > 0)">
            <img src="../assets/navLoading1.gif" />
        </div>

        <!-- 回到顶部 -->
        <div class="go-top" @click="goTop">
            <van-icon name="arrow-up" />
            <p>Top</p>
        </div>

        <div class="searchBox">
            <van-icon name="arrow-left" @click="goBack()" />
            <input v-model="searchVal" ref="inputRef" type="text" placeholder="请搜索商品名称" @click="inputFocus" />
            <van-icon name="search" @click="setSearchResList(searchVal)" />
        </div>

        <ul class="searchRes" v-show="showSearchRes">
            <li v-for="i in searchResList" :key="i.log_code" @click="setSearchResList(i.title)">{{ i.title }}</li>
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

        <!-- cate列表 -->
        <ul class="resList" v-if="cateList.length > 0">
            <li v-for="i in cateList" :key="i.product_id" @click="goPageView(i.product_id)">
                <div class="left">
                    <img :src="`${i.puzzle_url}`" />
                </div>
                <div class="right">
                    <p class="title">{{ i.name }}</p>
                    <p class="description">{{ i.product_desc }}</p>
                    <div class="msg">
                        <ul class="top">
                            <li v-for=" item in i.class_parameters">
                                <p></p>
                                <span></span>
                            </li>
                        </ul>
                        <div class="bottom">
                            <p class="price">￥<b>{{ i.price }}</b> 起 <span>￥{{ i.market_price }}</span></p>
                            <p class="assess">
                                <span v-if="i.comments_total">{{ assessCount(i.comments_total) }}条评价</span>
                                <span v-if="i.satisfy_per">{{ i.satisfy_per }}满意</span>
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
let searchVal = ref('');
// 商品id
let cateId = ref($route.params.cateId);
let cateList = ref([]);

// 获取input元素
const inputRef = ref(null);
// 搜索词列表展示状态
let showSearchRes = ref(false);

const axios = inject("$axios");


// 商品id数据列表
async function getCateList() {
    const data = await axios.post(`/api/v1/product/all_product?cat_id=${cateId.value}`);

    cateList.value = data.data.data.product;
    console.log(cateId.value);
    console.log(cateList.value);
}

// 搜索结果列表
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

// 获取搜索结果数据
function setSearchResList(value) {
    searchVal.value = value;
    // 点击后取消搜索结果展示
    showSearchRes.value = false;
    getResList();

}
// 判断input焦点状态
function inputFocus() {
    if (inputRef.value == document.activeElement) {
        console.log('获取焦点');
        showSearchRes.value = true;
    } else {
        console.log('未获取焦点');
        showSearchRes.value = false;
    }
}
// 回到顶部
function goTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 可选，使滚动平滑进行
    });
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

// 点击商品跳转相关详情页
function goPageView(id, type) {
    console.log(id, type);
    if (type === 'cate') {
        $router.push({ name: 'cate', params: { cateId: id } })
    }
    else if (type === 'keyword') {
        $router.push({ name: 'searchPage', params: { value: id } });
    }
    else {
        $router.push({ name: 'details', params: { id: id } })
    }
}

// 监听搜索词
watch(searchVal, (newVal) => {
    getSearchResList(newVal);
    console.log("搜索词改变=>", newVal);
})

onMounted(() => {
    // searchVal.value = $route.params.value;
    // getResList();
    getCateList();
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

.catePage {
    background-color: #f8faff;
    height: 100%;

    // 回到顶部样式
    .go-top {
        width: 30px;
        height: 30px;
        background-color: #c5e6dd;
        border-radius: 50%;
        font-size: 12px;
        text-align: center;
        position: fixed;
        bottom: 50px;
        right: 30px;
    }

    .searchBox {
        position: relative;
        padding: 10px 0;
        box-sizing: border-box;
        background-color: #c5e6dd;
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
        border: none;
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
            margin: 10px 0;
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
            font-size: 14px;
            margin-bottom: 8px;
        }

        .msg .bottom .price b {
            font-size: 20px;
            font-weight: bold;
            color: #ff4d53;
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