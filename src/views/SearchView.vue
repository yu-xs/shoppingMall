<template>
    <div class="search">
        <div class="searchBox">
            <van-icon name="arrow-left" @click="goBack()" />
            <input v-model="searchVal" type="text" placeholder="请搜索商品名称" />
            <van-icon name="search" />
        </div>
        <ul class="searchRes" v-show="searchVal">
            <li v-for="i in searchResList" :key="i.log_code" @click="goSearchPage(i.title)">{{ i.title }}</li>
        </ul>

        <div class="search-discover">
            <p>搜索发现</p>
            <ul class="search-list">
                <li v-for="i in discoverList" :key="i.id" @click="setSearchVal(i.desc)">{{ i.desc }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
let $route = useRoute();
let $router = useRouter();

let discoverList = ref([]);
let searchResList = ref([]);
let searchVal = ref('');

const axios = inject("$axios");

async function getDiscoverList() {
    const data = await axios.post("/api/v1/hisearch/se_default?version=2");

    discoverList.value = data.data.data.discover_list;
    console.log(discoverList.value);
}
// 搜索词数据
async function getSearchResList(value) {
    const data = await axios.post(`/api/v1/hisearch/suggestion_v3?query=${value}`);

    searchResList.value = data.data.data.list;
    console.log(searchResList.value);
}

// 搜索发现
function setSearchVal(value) {
    console.log(value);
    searchVal.value = value;
    goSearchPage(value);
}

// 跳转搜索详情页
function goSearchPage(searchVal) {
    console.log(searchVal);

    // 跳转
    $router.push({ name: 'searchPage', params: { value: searchVal } });
}

// 返回
function goBack() {
    $router.go(-1);
}

// 监听搜索词
watch(searchVal, (newVal) => {
    getSearchResList(newVal);
    console.log("搜索词改变=>", newVal);
})

onMounted(() => {
    getDiscoverList();
});

</script>

<style lang="scss" scoped>
.search {
    height: 100vh;
    background-color: white;

    .searchBox {
        position: relative;
        padding: 10px 0;
        box-sizing: border-box;
        background-color: #c5e6dd;
        display: flex;
        align-items: center;
    }

    .searchBox i {
        font-size: 20px;
        font-weight: bold;
        padding: 0 15px;
    }

    .searchBox input {
        flex: 1;
        height: 30px;
        padding-left: 10px;
        box-sizing: border-box;
        outline: none;
        border: none;
        border-radius: 10px;
        font-size: 14px;
    }

    .search-discover {
        padding: 20px 15px;
    }

    .search-discover p {
        font-weight: bold;
    }

    .search-discover .search-list {
        display: flex;
        flex-wrap: wrap;
    }

    .search-discover .search-list li {
        padding: 5px 10px;
        margin: 8px 5px;
        border-radius: 999px;
        background-color: #c5e6dd;
        font-size: 14px;
        color: #777;
    }

    // 搜索词列表
    .searchRes {
        position: absolute;
        top: 50px;
        left: 0;
        right: 0;
        padding: 0 10px;
        background-color: rgb(250, 250, 250);

        li {
            padding: 14px 0;
            border-bottom: 1px solid rgba(204, 204, 204, 0.3);
            box-sizing: border-box;

            color: #333;
            font-size: 15px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>