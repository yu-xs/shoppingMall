<template>
    <div style="margin-top: 5px;">
        <!-- 预加载图 -->
        <div class="loading" v-show="tpurl.length < 0">
            <img src="../../assets/navLoading.gif" />
        </div>

        <div class="waike" v-for="(i, index) in tpurl" :key="i">
            <img :src="i" />
            <div class="jiange" v-show="index >= 1"></div>
        </div>
    </div>
</template>



<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

let imgurl = ref(null)

let tpurl = ref([])

const data = () => {
    axios.get('https://apis.netstart.cn/xmsc/home/page?page_type=activity&page_id=18642')
        .then(response => {




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

.jiange {
    width: 100vw;
    height: 8.33px;
    background-color: rgb(225, 65, 57)
}
</style>