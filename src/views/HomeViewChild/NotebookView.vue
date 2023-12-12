<template>
    <div style="margin-top: 5px;">
        <!-- 预加载图 -->
        <div class="loading" v-show="tpurl.length < 0">
            <img src="../../assets/navLoading.gif" />
        </div>

        <div class="line"></div>
        <div class="waike" v-for="(i, index) in tpurl" :key="i" v-show="index == 0">
            <img :src="i" />
            <div class="line"></div>
        </div>
        <div class="waike" v-for="(i, index) in tpurl" :key="i" v-show="index == 1">
            <img :src="i" />
            <div class="text">
                <div class="name">
                    <div class="product">RedmiBook Air 13 </div>
                    <div class="price">¥5199起</div>
                </div>
                <div class="description">
                    <div class="jj">打开它，就像翻开一本杂志</div>
                    <div class="buttom"><span>立即购买</span></div>
                </div>
            </div>
            <div class="line"></div>
        </div>
        <div class="waike" v-for="(i, index) in tpurl" :key="i" v-show="index == 2">
            <img :src="i" />
            <div class="line"></div>
        </div>
        <div class="waike" v-for="(i, index) in tpurl" :key="i" v-show="index == 3">
            <img :src="i" />
            <div class="line"></div>
        </div>
        <div class="waike" v-for="(i, index) in tpurl" :key="i" v-show="index == 4">
            <img :src="i" />
            <div class="line"></div>
        </div>
        <div v-for="(i, index) in tpurl" :key="i" v-show="index == 5">
            <img :src="i" />
        </div>
        <div class="down">
            <div v-for="(i, index) in tpurl" :key="i" v-show="index > 5">
                <img class="dntp" :src="i" />
            </div>
        </div>
    </div>
</template>







<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

let imgurl = ref(null)
let tpurl = ref([])

const data = () => {
    axios.get('https://apis.netstart.cn/xmsc/home/page?page_type=activity&page_id=13176')
        .then(response => {

            console.log(response)

            imgurl.value = response.data.data.data.sections


            for (let url in imgurl.value) {


                for (let tp in imgurl.value[url].body.items) {


                    tpurl.value.push(imgurl.value[url].body.items[0].img_url)
                }

            }







        })

        .catch(error => {
            console.log('没请到');

        })
}

onMounted(() => {
    data()
    console.log(tpurl.value)

})
</script>

<style scoped>
/* 加载图 */
.loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    padding-top: 100px;
    box-sizing: border-box;
    background-color: white;
    z-index: 1000;

    img {
        width: 100%;
    }
}

img {
    width: 100vw;
    vertical-align: bottom
}

.line {
    height: 0.266667rem;
    border-bottom: 0.266667rem solid rgb(72, 120, 166);
    background-color: rgb(72, 120, 166);
}

.text {
    width: 100vw;
    height: 63.77px;
    background-color: #FFFFFF;
    padding: 10px 14px;

}

.name {
    width: 332px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    margin-top: 5px;
}

.description {

    width: 332px;
    display: flex;
    justify-content: space-between;
}

.buttom {
    width: 104px;
    height: 31px;
    background-color: #ea625b;
    text-align: center;
    line-height: 31px;
    border-radius: 5px;
    color: white;
    font-size: 12px;
}

.price {
    font-size: 14px;
    color: #ea625b;
}

.product {
    font-size: 16px;
    color: rgba(0, 0, 0, .87);
}

.jj {
    font-size: 12px;
    line-height: 31px;
    color: rgba(0, 0, 0, .54);
}

.down {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.dntp {
    width: 180px;
}
</style>