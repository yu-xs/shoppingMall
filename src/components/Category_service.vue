<template>
    <div class="recommend" v-if="dataList.length > 0">
        <div class="playBill" v-if="dataList.length > 0">
            <img :src="`${dataList[0].body.items[0].img_url}`" />
        </div>

        <p class="title">{{ dataList[1].body.category_name }}</p>
        <ul class="gridList" v-if="dataList.length > 0">
            <li v-for="i in dataList[2].body.items">
                <img :src="`${i.img_url}`" />
                <p class="title">{{ i.product_name }}</p>
            </li>
        </ul>

        <p class="title">{{ dataList[3].body.category_name }}</p>
        <ul class="gridList" v-if="dataList.length > 0">
            <li v-for="i in dataList[4].body.items">
                <img :src="`${i.img_url}`" />
                <p class="title">{{ i.product_name }}</p>
            </li>
        </ul>

        <p class="title">{{ dataList[5].body.category_name }}</p>
        <ul class="gridList" v-if="dataList.length > 0">
            <li v-for="i in dataList[6].body.items">
                <img :src="`${i.img_url}`" />
                <p class="title">{{ i.product_name }}</p>
            </li>
        </ul>

        <p class="title">{{ dataList[7].body.category_name }}</p>
        <ul class="gridList" v-if="dataList.length > 0">
            <li v-for="i in dataList[8].body.items">
                <img :src="`${i.img_url}`" />
                <p class="title">{{ i.product_name }}</p>
            </li>
        </ul>

        <p class="title">{{ dataList[9].body.category_name }}</p>
        <ul class="gridList" v-if="dataList.length > 0">
            <li v-for="i in dataList[10].body.items">
                <img :src="`${i.img_url}`" />
                <p class="title">{{ i.product_name }}</p>
            </li>
        </ul>

        <p class="title">{{ dataList[11].body.category_name }}</p>
        <ul class="gridList" v-if="dataList.length > 0">
            <li v-for="i in dataList[12].body.items">
                <img :src="`${i.img_url}`" />
                <p class="title">{{ i.product_name }}</p>
            </li>
        </ul>

        <p class="title">{{ dataList[13].body.category_name }}</p>
        <ul class="gridList" v-if="dataList.length > 0">
            <li v-for="i in dataList[14].body.items">
                <img :src="`${i.img_url}`" />
                <p class="title">{{ i.product_name }}</p>
            </li>
        </ul>

        <p class="title">{{ dataList[15].body.category_name }}</p>
        <ul class="gridList" v-if="dataList.length > 0">
            <li v-for="i in dataList[16].body.items">
                <img :src="`${i.img_url}`" />
                <p class="title">{{ i.product_name }}</p>
            </li>
        </ul>

        <p class="title">{{ dataList[17].body.category_name }}</p>
        <ul class="gridList" v-if="dataList.length > 0">
            <li v-for="i in dataList[18].body.items">
                <img :src="`${i.img_url}`" />
                <p class="title">{{ i.product_name }}</p>
            </li>
        </ul>

        <p class="title">{{ dataList[19].body.category_name }}</p>
        <ul class="gridList" v-if="dataList.length > 0">
            <li v-for="i in dataList[20].body.items">
                <img :src="`${i.img_url}`" />
                <p class="title">{{ i.product_name }}</p>
            </li>
        </ul>

        <p class="title">{{ dataList[21].body.category_name }}</p>
        <ul class="gridList" v-if="dataList.length > 0">
            <li v-for="i in dataList[22].body.items">
                <img :src="`${i.img_url}`" />
                <p class="title">{{ i.product_name }}</p>
            </li>
        </ul>

        <p class="title">{{ dataList[23].body.category_name }}</p>
        <ul class="gridList" v-if="dataList.length > 0">
            <li v-for="i in dataList[24].body.items">
                <img :src="`${i.img_url}`" />
                <p class="title">{{ i.product_name }}</p>
            </li>
        </ul>

        <p class="title">{{ dataList[25].body.category_name }}</p>
        <ul class="gridList" v-if="dataList.length > 0">
            <li v-for="i in dataList[26].body.items">
                <img :src="`${i.img_url}`" />
                <p class="title">{{ i.product_name }}</p>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'

let dataList = ref([]);

const axios = inject("$axios");

async function getDataList() {
    console.log('请求数据')
    // 分类数据
    const data = await axios.post(`/api/v1/home/category_v2?cat_id=737`);

    dataList.value = data.data.data[0].category_list;
    console.log(dataList.value);
}

onMounted(() => {
    getDataList();
})
</script>

<style lang="scss" scoped>
.recommend {
    padding: 0 8px;
    padding-top: 5px;

    .playBill {
        width: 100%;

        img {
            width: 100%;
            border-radius: 5px;
            box-shadow: 10px 15px 15px rgba(0, 0, 0, 0.2);
        }
    }

    // 网格列表
    &>.title {
        margin-top: 20px;
        font-size: 15px;
        font-weight: bold;
    }

    .gridList {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        li {
            flex: 0 1 33%;
            margin: 10px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        li img {
            width: 65%;
            border-radius: 5px;
            vertical-align: bottom;
        }

        li>.title {
            width: 90px;
            margin-top: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
            font-size: 13px;
            color: #333;
        }
    }
}
</style>