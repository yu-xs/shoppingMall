<template>
    <div class="map">
        <div id="mapContainer"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
const $router = useRouter();
const $route = useRoute();

const location = ref(null);

onMounted(() => {
    // 初始化地图
    const map = new BMap.Map("mapContainer");

    // 创建定位实例
    const geolocation = new BMap.Geolocation();

    // 开始定位
    geolocation.getCurrentPosition((result) => {
        if (geolocation.getStatus() === BMAP_STATUS_SUCCESS) {
            // 定位成功，获取定位信息
            const { point, address } = result;

            // 在地图上显示定位点
            map.centerAndZoom(point, 15);
            const marker = new BMap.Marker(point);
            map.addOverlay(marker);

            // 更新定位信息
            location.value = address;
            console.log(location.value);
            // 当获取到地理信息后跳转回上一个页面
            if (location.value) {
                // localStorage.setItem('MapLocation', JSON.stringify(location));
                localStorage.setItem('AddressInfo', JSON.stringify(location.value));

                setTimeout(() => {
                    $router.back();
                }, 1000);
            }
        } else {
            // 定位失败
            console.log("定位失败");
        }
    });

    // 启用滚轮放大缩小
    map.enableScrollWheelZoom(true);
    // 启用地图拖拽事件，需要开启
    map.enableDragging();
})
</script>

<style lang="scss" scoped>
.map {
    width: 100vw;
    height: 100vh;

    #mapContainer {
        width: 100%;
        height: 100%;
    }
}
</style>