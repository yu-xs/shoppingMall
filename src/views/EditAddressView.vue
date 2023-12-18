<template>
    <div class="editAddress">
        <van-nav-bar title="修改地址" left-arrow @click-left="goBack" />

        <van-address-edit :area-list="areaList" show-delete show-set-default show-search-result
            :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave"
            @delete="onDelete" @change-detail="onChangeDetail" :address-info="AddressEditInfo">
            <van-icon name="location-o" @click="goMapView" />
        </van-address-edit>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const $route = useRoute();
const $router = useRouter();
import { showToast } from 'vant';

import { areaList } from '@vant/area-data';
const searchResult = ref([]);

// 地理位置信息
let MapLocation = ref(null);
// 收货地址传递的地址
let address = ref(JSON.parse($route.query.item || '{}'));
console.log(address);
// 初始化地址
let AddressEditInfo = reactive({
    id: address.value.id,
    name: address.value.name,
    tel: address.value.tel,
    province: address.value.province,
    city: address.value.city,
    county: address.value.county,
    addressDetail: address.value.addressDetail,
    isDefault: address.value.isDefault || false,
})

// 保存修改的地址
const onSave = (info) => {
    showToast('修改成功!');

    console.log(info.isDefault);
    // 将修改后的地址数据更新至LocalStorage中
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const addressList = userInfo.addressList;
    // 如果新增的地址为默认地址，则将其他地址的isDefault属性设置为false
    if (info.isDefault) {
        // 获取地址列表
        addressList.forEach(address => {
            address.isDefault = false;
        });
    }
    userInfo.addressList = addressList;


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
        address: info.province + info.city + info.county + info.addressDetail,
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
                name: '',
                address: '',
            },
        ];
    } else {
        searchResult.value = [];
    }
};

// 返回上一页
function goBack() {
    // 返回上一页
    $router.back();
}

// 跳转地图页
function goMapView() {
    $router.push({ name: 'map' });
}

onMounted(() => {
    const storedAddressInfo = localStorage.getItem('AddressInfo');
    if (storedAddressInfo) {
        MapLocation = JSON.parse(storedAddressInfo);
        console.log(MapLocation);
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