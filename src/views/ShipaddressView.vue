<template>
    <div class="shipAddress">
        <van-nav-bar title="收货地址" left-arrow @click-left="goBack" />

        <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="onAdd" @edit="onEdit" />
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
    // {
    //     id: '1',
    //     name: '张三',
    //     tel: '13000000000',
    //     address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
    //     isDefault: true,
    // },
    // {
    //     id: '2',
    //     name: '李四',
    //     tel: '1310000000',
    //     address: '浙江省杭州市拱墅区莫干山路 50 号',
    // },
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
    showToast('编辑地址:' + index)
    console.log(item);
    // 跳转修改地址页面
    $router.push({ name: 'editAddress', query: { item: JSON.stringify(item) } });
};

// 返回上一页
function goBack() {
    // 返回上一页
    history.back()
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