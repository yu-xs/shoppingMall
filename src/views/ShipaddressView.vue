<template>
    <div class="shipAddress">
        <van-nav-bar title="收货地址" left-arrow @click-left="goBack" />

        <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="onAdd" @edit="onEdit"
            @select="onSelect" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const $route = useRoute()
const $router = useRouter()

import { Toast } from 'vant'
import { showToast } from 'vant'
const chosenAddressId = ref('1');
const list = ref([

]);

// 从LocalStorage中获取地址列表
const getAddressList = () => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const addressList = userInfo.addressList;
    list.value = addressList;
    console.log(list);
};

// 新增地址
const onAdd = () => {
    showToast('新增地址');
    // 跳转修改地址页面
    $router.push({ name: 'newAddress', query: {} });
};
// 修改地址
const onEdit = (item, index) => {
    // showToast('编辑地址:' + index)
    console.log(item);
    // 跳转修改地址页面
    $router.push({ name: 'editAddress', query: { item: JSON.stringify(item) } });
};
// 选中地址
const onSelect = (item, index) => {
    // console.log(item, $route.name);
    // 获取上一个页面的路由名
    let url = $router.options.history.state.back;
    let parts = url.split('?'); // 使用问号分割字符串
    let path = parts[0]; // 获取问号前的部分
    let pathParts = path.split('/'); // 使用斜杠分割路径
    let keyword = pathParts[1]; // 获取第一个路径部分
    console.log(keyword); // 输出 "payment"

    if (keyword === 'payment') {
        // 跳转支付页面
        $router.replace(`${$router.options.history.state.back}`);
        localStorage.setItem('addressInfo', JSON.stringify(item));
    }
}

// 返回上一页
function goBack() {
    // 返回上一页
    $router.back();
}

// 在页面加载时获取地址列表
onMounted(() => {
    getAddressList();
});
</script>

<style lang="scss" scoped>
.shipAddress {

    .van-nav-bar {
        --van-nav-bar-background: #fff;
        --van-nav-bar-arrow-size: 20px;
        --van-nav-bar-icon-color: #333;
    }
}
</style>