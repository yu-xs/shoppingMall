<template>
    <div class="login">
        <div class="topBox">
            <p class="title">账号登录</p>
            <img src="../assets/loginLogo.jpg" />
        </div>

        <div class="inputBox">
            <input type="number" v-model="state.userName" placeholder="手机号码/账号ID" />
            <input type="password" v-model="state.userPsd" placeholder="请输入密码" />

            <div class="protocol">
                <van-checkbox v-model="state.checked">
                    已阅读并同意 <a href="#">用户协议</a> 和 <a href="#">隐私政策</a>
                </van-checkbox>
            </div>
        </div>

        <div class="bottomBox">
            <button :style="showBtn">登录</button>
            <div class="login-method">
                <span @click="goRegisterView">立即注册 | </span>
                <span>忘记密码?</span>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
let $router = useRouter();

let checked = ref(0);

let state = reactive({
    checked: 0,
    userName: '',
    userPsd: ''
})

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

function goRegisterView() {
    $router.push({ name: 'register' });
}
</script>

<style lang="scss" scoped>
.login {
    width: 100vw;
    height: 100vh;
    background: url(../assets/login-bg.png) no-repeat;
    background-size: 100%;

    .topBox {
        padding: 50px 0;
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