<template>
    <div class="userInfo">
        <van-nav-bar title="个人信息" left-arrow @click-left="goBack" />

        <div class="userImg">
            <span class="left">头像</span>
            <div class="right">
                <van-uploader :after-read="afterRead">
                    <img :src="`${userImg}`" />
                </van-uploader>
                <!-- <van-icon name="arrow" size="16" /> -->
            </div>
        </div>

        <van-field v-model="userName" input-align="right" clearable label="昵称" />

        <van-cell title="收货地址" @click="goShipAddress" is-link />

        <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" @click="clearToken">
            退出登录
        </van-button>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
let $route = useRoute()
let $router = useRouter()

let userName = ref($route.params.userName);
let userImg = ref($route.params.userImg);

// 图片修改
const afterRead = (file) => {
    // 此时可以自行将文件上传至服务器
    console.log(file);
    // 将获取到的图片地址重新赋值给 LocalStorage 中的 userImg
    const userInfo = JSON.parse(localStorage.getItem('user'));
    userInfo.userImg = file.content;
    localStorage.setItem('user', JSON.stringify(userInfo));

    // 更新当前显示的图片
    userImg.value = file.content;
};

// 昵称修改
watch(userName, (newVal) => {
    console.log(newVal);
    const userInfo = JSON.parse(localStorage.getItem('user'));
    userInfo.nickname = newVal;
    localStorage.setItem('user', JSON.stringify(userInfo));

});

// 点击跳转收货地址
const goShipAddress = () => {
    $router.push({name: 'shipAddress'});
}

// import { Toast } from 'vant';
// import { showToast } from 'vant';
// 退出登录
const clearToken = () => {
    // 清除LocalStorage中的token
    localStorage.removeItem('token');
    // showToast('退出成功!');
    $router.push('/home');
}

function goBack() {
    // 返回上一页
    history.back()
}

onMounted(() => {
    // console.log($route.params.userName, $route.params.userImg);
})
</script>

<style lang="scss" scoped>
.userInfo {

    .van-nav-bar {
        --van-nav-bar-background: #ededed;
        --van-nav-bar-arrow-size: 20px;
        --van-nav-bar-icon-color: #333;
    }

    .userImg {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        margin: 0 10px;
        box-sizing: border-box;

        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 5px;
            right: 5px;
            border-bottom: 1px solid #ebedf0;
            transform: scaleY(.5);
        }

        .left {}

        .right {
            display: flex;
            align-items: center;
        }

        .right img {
            width: 65px;
            height: 65px;
            border-radius: 10px;
            vertical-align: bottom;
        }

        .right i {
            color: #969799;
            margin-left: 10px;
        }
    }

    .van-cell {
        --van-cell-vertical-padding: 15px;
        --van-cell-horizontal-padding: 10px;
        --van-cell-font-size: 16px;

        i {
            margin-left: 10px;
        }
    }

    .van-button {
        width: 250px;
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 999px;
    }
}
</style>