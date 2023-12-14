<template>
    <div class="editAddress">
        <van-nav-bar title="修改地址" left-arrow @click-left="goBack" />

        <van-address-edit :area-list="areaList" show-delete show-set-default show-search-result
            :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave"
            @delete="onDelete" @change-detail="onChangeDetail" :address-info="AddressEditInfo" />
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const $route = useRoute();
const $router = useRouter();
import { showToast } from 'vant';

import { areaList } from '@vant/area-data';
const searchResult = ref([]);
// 收货地址传递的地址
let address = ref(JSON.parse($route.query.item || '{}'));
console.log(address);
// 初始化地址
let AddressEditInfo = reactive({
    id: address.value.id,
    name: address.value.name,
    tel: address.value.tel,
    isDefault: address.value.isDefault || false,
})

// 保存修改的地址
const onSave = (info) => {
    console.log(info);
    showToast('修改成功!');

    // 将修改后的地址数据更新至LocalStorage中
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const addressList = userInfo.addressList;
    const index = addressList.findIndex(item => item.id === AddressEditInfo.id);
    addressList[index] = {
        id: AddressEditInfo.id,
        name: info.name,
        tel: info.tel,
        isDefault: info.isDefault || false,
        addressDetail: info.addressDetail,
        province: info.province,
        city: info.city,
        county: info.county,
        areaCode: info.areaCode,
    };
    localStorage.setItem('user', JSON.stringify(userInfo));

    // 跳转回收货地址页
    $router.replace({ name: 'shipAddress' });
}

// 删除收货地址
const onDelete = (item) => {
    showToast('删除成功!');
    // 从LocalStorage中删除对应的地址数据
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const addressList = userInfo.addressList;
    const index = addressList.findIndex((address) => address.id === item.id);
    addressList.splice(index, 1);
    localStorage.setItem('user', JSON.stringify(userInfo));

    // 跳转回收货地址页
    $router.replace({ name: 'shipAddress' });
}

const onChangeDetail = (val) => {
    if (val) {
        searchResult.value = [
            {
                name: '黄龙万科中心',
                address: '杭州市西湖区',
            },
        ];
    } else {
        searchResult.value = [];
    }
};

// 返回上一页
function goBack() {
    // 返回上一页
    history.back()
}
</script>

<style lang="scss" scoped>
.editAddress {

    .van-nav-bar {
        --van-nav-bar-background: #fff;
        --van-nav-bar-arrow-size: 20px;
        --van-nav-bar-icon-color: #333;
    }
}
</style>