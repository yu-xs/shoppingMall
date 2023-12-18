<template>
    <div class="payment">
        <van-nav-bar title="确认订单" left-arrow @click-left="goBack" />

        <!-- 地址 -->
        <div class="addressBox" @click="goAddress" v-if="address">
            <p class="address">{{ address }}</p>
            <p class="addressDetail">{{ addressDetail }}</p>
            <p class="userInfo">
                <span class="addressee">{{ addressName }}</span> <span class="phone">{{ tel }}</span>
            </p>

            <van-icon name="arrow" />
        </div>
        <div class="addressBox" @click="goAddress" v-if="!address">
            <p>选择地址</p>

            <van-icon name="arrow" />
        </div>

        <!-- 商品信息 -->
        <ul class="goodInfo">
            <li v-for="i in orderData">
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
            </li>
        </ul>

        <!-- 费用明细 -->
        <div class="cost">
            <p class="goodPrice"><span>商品金额</span><span>¥{{ totalPrice }}</span></p>
            <p class="freight-fee"><span>运费</span><span>¥0</span></p>
        </div>
    </div>

    <van-submit-bar :price="totalPrice * 100" button-text="提交订单" @click="goPayment" />
</template>

<script setup>
import { Toast } from 'vant';
import { showToast } from 'vant';
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const $route = useRoute();
const $router = useRouter();

import qs from 'qs';
import axios from "axios";

// 商品信息
const goodsImg = ref($route.query.goodsImg);
const goodsName = ref($route.query.name);
const goodsPrice = ref($route.query.price);
const goodsTypes = ref($route.query.goodsInfo);
const goodsNum = ref($route.query.count);
const totalPrice = ref($route.query.totalPrice);

// 地址信息
const address = ref('');
const addressDetail = ref('');
const addressName = ref('');
const tel = ref('');

// 订单信息
const orderData = ref([])
if (goodsImg.value !== undefined) {
    console.log(goodsImg.value);
    orderData.value.push(
        {
            goodsImg: goodsImg.value,
            goodsName: goodsName.value,
            goodsPrice: goodsPrice.value,
            goodsTypes: goodsTypes.value,
            goodsNum: goodsNum.value,
            totalPrice: totalPrice.value,
        }
    )
}
// 购物车商品列表
const cartList = ref([]);

// 生成随机订单编号
function generateOrderNumber() {
    const current_time = new Date();
    const timestamp = current_time.getTime();
    const year = current_time.getFullYear();
    const month = (current_time.getMonth() + 1).toString().padStart(2, '0');
    const day = current_time.getDate().toString().padStart(2, '0');
    const order_number = `${year}${month}${day}${timestamp}`;
    return order_number;
}

async function goPayment() {
    if (!address.value) {
        showToast('请先选择地址!');
    }
    else {
        const orderId = generateOrderNumber();
        // console.log(orderId, totalPrice.value, name.value, goodsInfo.value);
        if (goodsImg.value !== undefined) {
            var data = { orderId: orderId, totalPrice: totalPrice.value, name: goodsName.value, goodsInfo: goodsTypes.value }
        }
        if (cartList.value) {
            let goodsInfo = ref('');
            let goodsName = ref();
            for (let i = 0; i < (orderData.value).length; i++) {
                goodsInfo.value += orderData.value[i].goodsTypes + '  ';
                goodsName.value += orderData.value[i].goodsName + '  ';
                console.log(orderData.value[i]);
            }
            var data = { orderId: orderId, totalPrice: totalPrice.value, name: goodsName.value, goodsInfo: goodsInfo.value }
        }

        // const res = await axios.post(
        //     'http://localhost:8085/pay/api/payment',
        //     data,
        //     {
        //         headers: {
        //             "Content-type": "application/x-www-form-urlencoded",
        //         }
        //     }
        // );

        // console.log(res);
        // window.location.href = res.data.result;

        // 将商品信息存入LocalStorage中的orderList数组
        // 获取地址列表
        const userInfo = JSON.parse(localStorage.getItem('user'));
        const orderList = userInfo.orderList;
        for (let i = 0; i < (orderData.value).length; i++) {
            // console.log(orderData.value[i]);
            orderList.unshift(orderData.value[i]);
        }
        // 更新地址列表信息
        localStorage.setItem('user', JSON.stringify(userInfo));

        // 从LocalStorage中删除对应的购物车数据
        let cartCount = ref(0);
        const cartListLocal = JSON.parse(localStorage.getItem('goods'));
        const BuyCar = JSON.parse(localStorage.getItem('BuyCar'));

        for (let i = 0; i <= cartListLocal.length; i++) {
            const cartListLocal = JSON.parse(localStorage.getItem('goods'));
            const index = cartListLocal.findIndex((item) => item.goodsZt === true);
            if (index !== -1) {
                cartListLocal.splice(index, 1);
                localStorage.setItem('goods', JSON.stringify(cartListLocal));
            }
        }
        for (const item in cartListLocal) {
            cartCount.value += item.goodsNum;
        }
        BuyCar[0] = cartCount.value
        localStorage.setItem('BuyCar', JSON.stringify(BuyCar));


    }

}

// 返回上一页
function goBack() {
    // 返回上一页
    $router.back()
}

// 选择地址
function goAddress() {
    $router.push({ name: 'shipAddress' });
}

onMounted(() => {
    // 获取购物车列表
    const cartLists = JSON.parse(localStorage.getItem('cartList'));
    // 获取商品总价
    const cartTotalPrice = JSON.parse(localStorage.getItem('cartTotalPrice'));
    cartList.value = cartLists;
    if (cartList.value) {
        console.log('遍历cartList存入orderData');
        // 数组合并
        orderData.value = orderData.value.concat(cartList.value);
        // 清除购物车列表
        localStorage.removeItem('cartList');

        totalPrice.value = cartTotalPrice;
        localStorage.removeItem('cartTotalPrice');
    }
    console.log(orderData.value);

    const userInfo = JSON.parse(localStorage.getItem('user'));
    const addressList = userInfo.addressList;
    // 判断是否有地址
    if (addressList.length) {
        // 获取addreList中的默认地址
        const defaultAddress = addressList.filter(item => item.isDefault)[0];
        console.log(defaultAddress);
        if (defaultAddress) {
            address.value = defaultAddress.province + defaultAddress.city + defaultAddress.county;
            addressDetail.value = defaultAddress.addressDetail;
            addressName.value = defaultAddress.name;
            tel.value = defaultAddress.tel;
            // 清除LocalStorage
            localStorage.removeItem('addressList');
        }
    }
    const addressInfo = JSON.parse(localStorage.getItem('addressInfo'));
    if (addressInfo) {
        address.value = addressInfo.province + addressInfo.city + addressInfo.county;
        addressDetail.value = addressInfo.addressDetail;
        addressName.value = addressInfo.name;
        tel.value = addressInfo.tel;
        console.log("收货地址传递的值=>", addressInfo);
        // 清除LocalStorage
        localStorage.removeItem('addressInfo');
    }
});
</script>

<style lang="scss" scoped>
.payment {
    height: 100vh;
    background-color: rgb(250, 250, 250);

    .van-nav-bar {
        --van-nav-bar-background: #fff;
        --van-nav-bar-arrow-size: 20px;
        --van-nav-bar-icon-color: #333;
    }

    // 地址
    .addressBox {
        position: relative;
        margin: 15px 10px;
        padding: 10px;
        box-sizing: border-box;
        background-color: white;
        border-radius: 10px;

        p {
            margin: 8px 0;
            font-size: 15px;
        }

        .addressDetail {
            font-size: 18px;
            font-weight: bold;
        }

        i {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 20px;
        }
    }

    // 商品信息
    .goodInfo {
        margin: 15px 10px;
        padding: 10px;
        background-color: white;
        border-radius: 10px;
    }

    .goodInfo li {
        margin: 5px 0;
    }

    .goodInfo .top {
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
    .norm {
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

    // 费用明细
    .cost {
        margin: 15px 10px;
        padding: 0 10px;
        background-color: white;
        border-radius: 10px;

        p {
            padding: 15px 0;
            display: flex;
            justify-content: space-between;
            font-size: 15px;
        }

        p span:last-child {
            font-weight: bold;
        }
    }
}
</style>