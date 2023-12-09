<template>
    <div class="recommend" v-if="dataList.length > 0">
        <div class="playBill" v-if="dataList.length > 0">
            <img :src="`${dataList[0].body.items[0].img_url}`" />
        </div>

        <p class="title">{{ dataList[1].body.category_name }}</p>
        <ul class="gridList" v-if="dataList.length > 0">
            <li v-for="i in dataList[2].body.items" @click="goPageView(i.action.path, i.action.type)">
                <img :src="`${i.img_url}`" />
                <p class="title">{{ i.product_name }}</p>
            </li>
        </ul>

        <p class="title">{{ dataList[3].body.category_name }}</p>
        <ul class="gridList" v-if="dataList.length > 0">
            <li v-for="i in dataList[4].body.items" @click="goPageView(i.action.path, i.action.type)">
                <img :src="`${i.img_url}`" />
                <p class="title">{{ i.product_name }}</p>
            </li>
        </ul>

        <p class="title">{{ dataList[5].body.category_name }}</p>
        <ul class="gridList" v-if="dataList.length > 0">
            <li v-for="i in dataList[6].body.items" @click="goPageView(i.action.path, i.action.type)">
                <img :src="`${i.img_url}`" />
                <p class="title">{{ i.product_name }}</p>
            </li>
        </ul>

        <p class="title">{{ dataList[7].body.category_name }}</p>
        <ul class="gridList" v-if="dataList.length > 0">
            <li v-for="i in dataList[8].body.items" @click="goPageView(i.action.path, i.action.type)">
                <img :src="`${i.img_url}`" />
                <p class="title">{{ i.product_name }}</p>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
let $route = useRoute();
let $router = useRouter();

let dataList = ref([]);

const axios = inject("$axios");

async function getDataList() {
    console.log('请求数据')
    // 分类数据
    const data = await axios.post(`/api/v1/home/category_v2?cat_id=1186`);

    dataList.value = data.data.data[0].category_list;
    console.log(dataList.value);
}

// 点击商品跳转相关详情页
function goPageView(id, type) {
    console.log(id, type);
    if (type === 'cate') {
        $router.push({ name: 'cate', params: { cateId: id } })
    }
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