<template>
    <div class="recommend">
        <div class="playBill">
            <img :src="`${dataList[0].body.items[0].img_url}`" />
        </div>
        <ul class="goodsList">
            <p class="title">{{ dataList[1].body.category_name }}</p>
            <li v-for="i in dataList[2].body.product_list">
                <div class="left">
                    <img :src="`${i.puzzle_url}`" />
                </div>
                <div class="right">
                    <p class="title">{{ i.name }}</p>
                    <p class="price">￥{{ i.price }} 起</p>
                </div>
            </li>
        </ul>
        <ul class="gridList">
            <li>
                <img src="" />
                <p class="title">商品名</p>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, reactive, inject, watch, onMounted } from 'vue'

let dataList = ref([]);

const axios = inject("$axios");

async function getDataList() {
    console.log('请求数据')
    // 分类数据
    const data = await axios.post(`/api/v1/home/category_v2?cat_id=-1`);
    // if (data.data.data.length > 1) {
    //     dataList.value = data.data.data[1].category_list[0].body.items;
    //     console.log("dataCategory长度大于1", dataList)
    // }
    // else {
    //     dataList.value = data.data.data[0].category_list[0].body.items;
    //     console.log("dataCategory长度等于1", dataList);
    // }

    dataList.value = data.data.data[0].category_list;
    console.log(dataList.value);
}

onMounted(() => {
    getDataList();
})
</script>

<style lang="scss" scoped>
.recommend {
    padding-top: 5px;
    padding-left: 5px;
    padding-right: 10px;

    .playBill {
        width: 100%;

        img {
            width: 100%;
            border-radius: 5px;
        }
    }

    .goodsList {
        margin-top: 25px;

    }

    .goodsList>.title {
        font-weight: bold;
    }

    .goodsList li{
        display: flex;
        margin: 5px 0;
        background-color: rgb(250, 250, 250);
        border-radius: 5px;

        .left{
            width: 70px;
            margin-right: 5px;
        }
        .left img{
            width: 100%;
            height: 70px;
            vertical-align: bottom;
        }

        .right{
            flex: 1;
        }
        .right p{
            width: 200px;
            margin: 14px 0;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>