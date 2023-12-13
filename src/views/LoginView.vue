<template>
    <div class="login">
        <div class="topBox">
            <p class="title">账号登录</p>
            <img src="../assets/loginLogo.jpg" />
        </div>

        <div class="inputBox">
            <input type="number" v-model.trim="state.userName" placeholder="手机号码/账号ID" />
            <div v-if="state.userName && !isPhoneNumberValid" class="error"><van-icon name="warning-o" /> 手机号码格式不正确</div>
            <input type="password" v-model.trim="state.userPsd" placeholder="请输入密码" />
            <div v-if="state.userPsd && !isPasswordValid" class="error"><van-icon name="warning-o" /> 密码长度必须大于等于10</div>

            <div class="protocol">
                <van-checkbox v-model="state.checked">
                    已阅读并同意 <a href="#">用户协议</a> 和 <a href="#">隐私政策</a>
                </van-checkbox>
            </div>
        </div>

        <div class="bottomBox">
            <button :style="showBtn" :disabled="!isFormValid" @click="goLogin">登录</button>
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

const isPhoneNumberValid = computed(() => {
    const phoneNumberRegex = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
    return state.userName && phoneNumberRegex.test(state.userName)
})

const isPasswordValid = computed(() => {
    return state.userPsd && state.userPsd.length >= 10
})

const showBtn = computed(() => {
    if (state.checked === true && isPhoneNumberValid.value && isPasswordValid.value) {
        console.log('条件满足');
        return 'opacity: 1'
    }
    else {
        console.log('条件不满足');
        return 'opacity: 0.5'
    }
})
const isFormValid = computed(() => {
    return state.checked && isPhoneNumberValid.value && isPasswordValid.value;
});

import { Toast } from 'vant';
import { showToast } from 'vant';
// 点击登录
function goLogin() {
    // 获取LocalStorage中的账号信息
    const storedUser = localStorage.getItem('user');
    // 判断账号信息是否存在
    if (storedUser) {
        // 账号信息存在，进行登录验证
        const user = JSON.parse(storedUser);

        // 获取用户输入的用户名和密码
        const username = state.userName;
        const password = state.userPsd;

        // 进行账号验证
        if (username === user.username && password === user.password) {
            const token = generateToken();
            console.log(token);
            // 将token保存在LocalStorage中
            localStorage.setItem('token', token);

            showToast('登录成功!');
            // 跳转至我的页面
            $router.replace({ name: 'user' });
        } else {
            showToast('账号或密码错误!');
            console.log('账号或密码错误!');
        }
    } else {
        showToast('账号不存在!');
        console.log('账号不存在!');
    }
}

// 登录生成token
function generateToken() {
    // 生成UUID
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });

    // 将UUID转换为token
    const token = btoa(uuid);

    return token;
}

function goRegisterView() {
    showToast('跳转注册页');
    $router.replace({ name: 'register' });
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

        .error {
            width: 100%;
            font-size: 14px;
            text-align: left;
            margin-bottom: 10px;
            padding-left: 40px;
            box-sizing: border-box;
            color: red;
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