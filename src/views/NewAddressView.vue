<template>
    <div class="editAddress">
        <van-nav-bar title="新增地址" left-arrow @click-left="goBack" />

        <van-address-edit :area-list="areaList" show-delete show-set-default show-search-result
            :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" area-placeholder @save="onSave"
            @delete="onDelete" @change-detail="onChangeDetail" :address-info="AddressEditInfo">
            <van-icon name="location-o" @click="goMapView" />
        </van-address-edit>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const $route = useRoute();
const $router = useRouter();
import { showToast } from 'vant';

import { areaList } from '@vant/area-data';
const searchResult = ref([]);
// 地理位置信息
let MapLocation = ref(null);

const AddressEditInfo = reactive({});


// 保存地址信息
const onSave = (info) => {
    // 获取地址列表
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const addressList = userInfo.addressList;

    info.address = info.province + info.city + info.county + info.addressDetail;
    // 如果新增的地址为默认地址，则将其他地址的isDefault属性设置为false
    if (info.isDefault) {
        addressList.forEach(address => {
            address.isDefault = false;
        });
    }
    userInfo.addressList = addressList;
    // 将新地址假如地址列表中
    addressList.push(info);
    // 为每个地址对象添加一个唯一的id属性
    addressList.forEach((address, index) => {
        address.id = index + 1;
    });
    // 更新地址列表信息
    localStorage.setItem('user', JSON.stringify(userInfo));

    showToast('保存成功');
    console.log(info);
    // 跳转收货地址页
    $router.replace({ name: 'shipAddress' });
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
    $router.back()
}

// 跳转地图页
function goMapView() {
    $router.push({ name: 'map' });
}

onMounted(() => {
    const storedAddressInfo = localStorage.getItem('AddressInfo');
    if (storedAddressInfo) {
        MapLocation = JSON.parse(storedAddressInfo);
        // 更新页面数据
        AddressEditInfo.province = MapLocation.province;
        AddressEditInfo.city = MapLocation.city;
        AddressEditInfo.county = MapLocation.district;
        AddressEditInfo.addressDetail = MapLocation.street;
        // 清除地理位置信息
        localStorage.removeItem('AddressInfo');
    }
})
</script>

<style lang="scss" scoped>
.editAddress {

    .van-nav-bar {
        --van-nav-bar-background: #fff;
        --van-nav-bar-arrow-size: 20px;
        --van-nav-bar-icon-color: #333;
    }

    .van-cell .van-field .van-address-edit-detail {
        position: relative;
    }

    .van-form .van-icon-location-o {
        position: absolute;
        right: 28px;
        font-size: 20px;
        transform: translateY(-32px);
    }
}
</style>