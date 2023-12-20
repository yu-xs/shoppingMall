<template>
    <div class="my-order">
        <van-nav-bar title="确认订单" left-arrow fixed="true" placeholder="true" @click-left="goBack" />

        <van-tabs v-model:active="active" sticky>
            <van-tab v-for="i in navList" :title="i.name">
                <div class="not-order" v-if="orderList.length == 0">
                    <img src="../assets//not-order.jpg" />
                </div>

                <ul class="orderList" v-if="orderList.length > 0">
                    <!-- 商品信息 -->
                    <li class="goodInfo" v-for="i in orderList">
                        <div class="top">
                            <div class="left">
                                <img :src="`${i.goodsImg}`" />
                            </div>
                            <div class="right">
                                <p class="title">{{ i.goodsName }}</p>
                                <p class="price">
                                    <span><strong>¥ {{ (i.goodsPrice) * (i.goodsNum) }}</strong></span>
                                    <span>共计{{ i.goodsNum }}件</span>
                                </p>
                            </div>
                        </div>
                        <!-- 规格 -->
                        <p class="norm">规格: {{ i.goodsTypes }}</p>
                        <!-- 按钮 -->
                        <div class="buttonBox">
                            <div class="del"><span @click="delOrder(i.goodsTypes)">删除订单</span></div>
                            <button>取消订单</button>
                            <button>确认收货</button>
                        </div>
                    </li>
                </ul>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script setup>
import { showToast } from 'vant';
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const $route = useRoute();
const $router = useRouter();

let active = ref(0);
let navList = ref([
    { name: "全部", id: 0 },
    { name: "待付款", id: 1 },
    { name: "待发货", id: 2 },
    { name: "待收货", id: 3 },
    { name: "待评价", id: 4 },
])

// 订单列表
let orderList = ref([]);

// 返回上一页
function goBack() {
    // 返回上一页
    $router.replace({ name: 'user' })
}

function delOrder(goodsTypes) {
    showToast('删除成功!');
    // 从LocalStorage中删除对应的地址数据
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const orderList = userInfo.orderList;
    const index = orderList.findIndex((order) => order.goodsTypes === goodsTypes);
    orderList.splice(index, 1);
    localStorage.setItem('user', JSON.stringify(userInfo));

    getOrderLists();
}

function getOrderLists() {
    // 获取地址列表
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const orderLists = userInfo.orderList;
    if (orderLists) {
        orderList.value = orderLists;
        console.log(orderList.value);
    }
}

onMounted(() => {
    getOrderLists();
})
</script>

<style lang="scss" scoped>
.my-order {
    height: 100%;
    background-color: rgb(250, 250, 250);

    .van-nav-bar {
        --van-nav-bar-background: #fff;
        --van-nav-bar-arrow-size: 20px;
        --van-nav-bar-icon-color: #333;
    }

    .not-order img {
        width: 100%;
        height: calc(100vh - 90px);
        vertical-align: bottom;
        position: absolute;
        top: 0;
        z-index: -1;
    }

    // 订单列表
    .orderList {
        overflow: auto;
    }

    .orderList .goodInfo {
        margin: 15px 10px;
        padding: 10px;
        background-color: white;
        border-radius: 10px;
    }

    .orderList .goodInfo .top {
        display: flex;
        align-items: center;
        margin-bottom: 15px;

        .left img {
            width: 80px;
            height: 80px;
            vertical-align: bottom;
            border-radius: 10px;
            margin-right: 10px;
        }

        .right {
            flex: 1;
            height: 70px;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
        }

        .right .title {
            width: 245px;
            font-weight: bold;
            // 最大两行显示
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: 1.2;

        }

        .right .price {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }

        .right .price span {
            font-size: 13px;
            color: #999;
        }

        .right .price span:first-child strong {
            font-size: 16px;
            font-weight: bold;
            color: #333;
        }
    }

    // 规格
    .orderList .goodInfo .norm {
        margin-bottom: 15px;
        padding: 10px;
        box-sizing: border-box;
        background-color: #f8f8fa;
        border-radius: 5px;
        font-size: 14px;
        color: #777;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .orderList .goodInfo .buttonBox {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .del {
            flex: 1;
            font-size: 12px;
            color: #999;
        }

        button {
            padding: 8px 10px;
            font-size: 14px;
            color: #698FCB;
            background-color: #698fcb20;
            border: none;
            border-radius: 999px;
            margin-left: 15px;
        }
    }
}
</style>