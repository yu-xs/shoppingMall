<template>
    <div class="login">
        <div class="topBox">
            <p class="title">注册账号</p>
            <img src="../assets/loginLogo.jpg" />
        </div>

        <div class="inputBox">
            <input type="number" v-model="state.userName" placeholder="请输入账号" />
            <input type="password" v-model="state.userPsd" placeholder="请输入密码" />

            <div class="protocol">
                <van-checkbox v-model="state.checked">
                    已阅读并同意 <a href="#">用户协议</a> 和 <a href="#">隐私政策</a>
                </van-checkbox>
            </div>
        </div>

        <div class="bottomBox">
            <button :style="showBtn">注册</button>
            <div class="login-method">
                <span @click="goLoginView">手机号登录</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
let $router = useRouter();

let state = reactive({
    checked: 0,
    userName: '',
    userPsd: ''
})

function goLoginView() {
    $router.push({ name: 'login' });
}

const showBtn = computed(() => {
    if (state.checked === true && state.userName && state.userPsd) {
        console.log('条件满足');
        return 'opacity: 1'
    }
    else {
        console.log('条件不满足');
        return 'opacity: 0.5'
    }
})


</script>

<style lang="scss" scoped>
.login {
    width: 100vw;
    height: 100vh;
    background: url(../assets/login-bg.png) no-repeat;
    background-size: 100%;

    .topBox {
        margin: 50px 0;
        display: flex;
        flex-direction: column;
        align-items: center;

        .title {
            text-align: center;
            font-weight: bold;
            color: #333;
            font-size: 18px;
        }

        img {
            width: 54px;
            height: 54px;
            border-radius: 50%;
            margin-top: 20px;
        }
    }

    .inputBox {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px 0;

        input {
            width: 80vw;
            height: 7vh;
            outline: none;
            border: none;
            background-color: #e2f9f4;
            margin-bottom: 10px;
            padding-left: 10px;
            box-sizing: border-box;
            border-radius: 10px;
        }

        .protocol {
            width: 80vw;
            font-size: 14px;
        }

        .protocol a {
            text-decoration: underline;
            color: #698FCB;
        }
    }

    .bottomBox {
        display: flex;
        flex-direction: column;
        align-items: center;

        button {
            width: 80vw;
            height: 7vh;
            margin: 15px 0;
            border-radius: 10px;
            border: none;
            background-color: #698FCB;
            color: #fff;
            font-weight: bold;
        }

        .login-method span {
            font-size: 14px;
            color: #aaa;
        }
    }
}
</style>