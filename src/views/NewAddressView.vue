<template>
    <div class="editAddress">
        <van-nav-bar title="修改地址" left-arrow @click-left="goBack" />

        <van-address-edit :area-list="areaList" show-delete show-set-default show-search-result
            :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave"
            @delete="onDelete" @change-detail="onChangeDetail" />
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
const $route = useRoute();
import { showToast } from 'vant';

import { areaList } from '@vant/area-data';
const searchResult = ref([]);

const onSave = (info) => {
    // 将地址信息存储到LocalStorage中
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const addressList = userInfo.addressList;
    // 为每个地址对象添加一个唯一的id属性
    addressList.forEach((address, index) => {
        address.id = index + 1;
    });
    addressList.push(info);
    localStorage.setItem('user', JSON.stringify(userInfo));

    showToast('保存成功');
    console.log(info);
}
const onDelete = () => showToast('delete');

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