<template>
    <div class="recommend">
        <div class="playBill" v-if="dataList.length > 0">
            <img :src="`${dataList[0].body.items[0].img_url}`" />
        </div>
        <ul class="goodsList" v-if="dataList.length > 0">
            <p class="title">{{ dataList[1].body.category_name }}</p>
            <li v-for="i in dataList[2].body.product_list" @click="goPageView(i.action.path, i.action.type)">
                <div class="left">
                    <img :src="`${i.puzzle_url}`" />
                </div>
                <div class="right">
                    <p class="title">{{ i.name }}</p>
                    <span class="price">￥<b>{{ i.price }}</b> 起</span>
                    <span class="label" v-if="i.labels" v-for="item in i.labels">{{ item }}</span>
                </div>
            </li>
        </ul>
        <ul class="goodsList" v-if="dataList.length > 0">
            <p class="title">{{ dataList[3].body.category_name }}</p>
            <li v-for="i in dataList[4].body.product_list" @click="goPageView(i.action.path, i.action.type)">
                <div class="left">
                    <img :src="`${i.puzzle_url}`" />
                </div>
                <div class="right">
                    <p class="title">{{ i.name }}</p>
                    <span class="price">￥<b>{{ i.price }}</b> 起</span>
                    <span class="label" v-if="i.labels" v-for="item in i.labels">{{ item }}</span>
                </div>
            </li>
        </ul>
        <ul class="goodsList" v-if="dataList.length > 0">
            <p class="title">{{ dataList[5].body.category_name }}</p>
            <li v-for="i in dataList[6].body.product_list" @click="goPageView(i.action.path, i.action.type)">
                <div class="left">
                    <img :src="`${i.puzzle_url}`" />
                </div>
                <div class="right">
                    <p class="title">{{ i.name }}</p>
                    <span class="price">￥<b>{{ i.price }}</b> 起</span>
                    <span class="label" v-if="i.labels" v-for="item in i.labels">{{ item }}</span>
                </div>
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
    const data = await axios.post(`/api/v1/home/category_v2?cat_id=1242`);

    dataList.value = data.data.data[0].category_list;
    console.log(dataList.value);
}

// 点击商品跳转相关详情页
function goPageView(id, type) {
    console.log(id, type);
    if (type === 'cate') {
        $router.push({ name: 'cate', params: { cateId: id } })
    }
    else if (type === 'keyword') {
        $router.push({ name: 'searchPage', params: { value: id } });
    }
    else {
        $router.push({ name: 'details', params: { id: id } })
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

    .goodsList {
        margin-top: 25px;

    }

    .goodsList>.title {
        font-size: 15px;
        font-weight: bold;
    }

    .goodsList li {
        display: flex;
        margin: 8px 0;
        background-color: rgb(250, 250, 250);
        border-radius: 5px;
        overflow: hidden;

        .left {
            width: 70px;
            margin-right: 5px;
        }

        .left img {
            width: 100%;
            height: 70px;
            vertical-align: bottom;
            border-radius: 5px;
        }

        .right {
            flex: 1;
        }

        .right p {
            width: 200px;
            margin: 14px 0;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .right .price b {
            font-weight: bold;
        }

        .right .label {
            font-size: 10px;
            vertical-align: 3px;
            margin-left: 10px;
            padding: 1px 5px;
            border-radius: 3px;
            border: 1px solid #c69768;
            color: #c69768;
        }
    }

    // 网格列表
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

        li .title {
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