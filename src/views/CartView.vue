<template>
    <van-cell>

        <template #title>
            <span class="custom-title">购物车</span>
        </template>
    </van-cell>
    <div class="bg">

        <div><img class="xr"
                src="https://cdn.cnbj1.fds.api.mi-img.com/mishop-m/production/trade_center/res/images/common/no_result_mi_cart.png">
            <div class="text">购物车还是空的</div>
            <div>
                <div class="sbkk"><span>随便看看</span></div>
            </div>
            <div class="jxhw">
                <div><img class="hengr"
                        src="https://cdn.cnbj1.fds.api.mi-img.com/mishop-m/production/trade_center/res/images/common/rec_header_right.png">
                </div>精选好物<div><img class="heng"
                        src="https://cdn.cnbj1.fds.api.mi-img.com/mishop-m/production/trade_center/res/images/common/rec_header_right.png">
                </div>
            </div>
            <div class="goods">
                <div class="wp" v-for="(i, index) in imgurl" :key="index" @click="jumpDetails(i.action.path)">
                    <img class="sptp" :src="i.image_url">
                    <p class="down-text">
                    <p>{{ i.name }}</p>
                    <p class="xj">{{ '¥' + i.price }} <span class="yj" v-if="i.market_price > i.price">{{ '¥' + i.market_price
                    }}</span></p>

                    </p>

                </div>

            </div>
        </div>
    </div>
</template>


<script setup>
import { onMounted, ref, } from "vue";
import { useRoute, useRouter } from "vue-router"
import axios from "axios";

let imgurl = ref(null)

let $route = useRoute();
let $router = useRouter();



// let tpurl=ref([])

const data = () => {
    axios.get('https://apis.netstart.cn/xmsc/cart_recom')
    .then(response => {


        imgurl.value = response.data.data.recom_list

        console.log(imgurl.value);


    })
    .catch(error => {
        console.log('没请到');

    })
}

onMounted(() => {
    data()

})

const jumpDetails = (id) => {
    $router.push({ name: 'details', params: { id: id } });

}





</script>



<style scoped>
.custom-title {
    margin-left: 145px;
    font-size: 18px;
    font-weight: bold;
}

.bg {
    background-color: #F4F4F4;
    width: 100vw;

    padding-top: 10px;
    box-sizing: border-box;
}

.xr {
    width: 125px;
    height: 125px;
    object-fit: cover;
    margin-left: 120px;
    margin-top: 50px;

}

.text {
    margin-left: 140px;
    color: rgba(0, 0, 0, 0.3);
    font-size: 13px;
}

.sbkk {
    margin-left: 140px;
    margin-top: 25px;
    border-radius: 15px;
    width: 95px;
    height: 30px;
    line-height: 31px;
    text-align: center;
    border-color: rgb(178, 178, 178);
    border: 0.1px solid;
    color: rgba(0, 0, 0, 0.5);
    font-size: 13px;
}

.jxhw {
    display: flex;
    margin-left: 142px;
    color: rgb(0, 0, 0);
    font-size: 17px;
    font-weight: bold;
    margin-top: 60px;
    margin-bottom: 20px;
}

.heng {
    display: block;
    width: 13px;
    height: 1.5px;
    margin-top: 6.5px;
}

.hengr {
    display: block;
    width: 13px;
    height: 1.5px;
    margin-top: 6.5px;
    transform: rotate(180deg);
}

.goods {

    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.wp {
    width: 173px;
    height: 276px;
    background-color: #FFFFFF;
    border-radius: 5px;
    margin-top: 10px;
    padding: 4px;

}

.sptp {
    width: 173px;
    height: 173px;
    vertical-align: bottom;
}

.down-text {
    width: 173px;
    height: 104px;

    color: rgba(0, 0, 0, 0.9);
    font-size: 15px;
    -webkit-line-clamp: 2;
    padding-top: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

}

.yj {
    color: rgb(175, 175, 175);
    font-size: 11.5px;
    margin-bottom: 1px;
    margin-left: 3px;
    text-decoration-line: line-through;
}

.xj {
    color: rgba(0, 0, 0, 0.9);
    font-size: 16.5px;
    margin-bottom: 5px;
}</style>