<template>
    <van-cell>
        <template #title>
            <span class="custom-title">购物车</span>
        </template>
    </van-cell>
    <div class="bg">

        <div class="gwclb" v-show="bye == true">
            <div class="xmzy" v-show="cz == false">
                <div class="qxwc"><input class="qx" type="checkbox" v-model="qx" @change="qxgb"></div> 小米自营<div class="ck"
                    v-show="qxl"><span @click="BuyCarBye">清空购物车</span></div>
            </div>
            <div class="mgsp" v-for="i in spsj">
                <div class="xzwc"><input class="xz" type="checkbox" v-model="i.goodsZt"
                        @change="gb(i.goodsTypes, i.goodsZt)" /></div>
                <div class="spwc"><img class="spsjimg" :src="i.goodsImg"></div>
                <div class="you">
                    <p class="cpmz">{{ i.goodsName }}<van-icon name="clear" @click="Del(i.goodsTypes)" /></p>
                    <p class="lx">{{ i.goodsTypes }}</p>
                    <div class="jgd">
                        <div class="jg">{{ '¥' + i.goodsPrice }}
                        </div>
                        <div> <van-icon name="minus" @click="jian(i.goodsNum, i.goodsTypes, i.goodsZt)" /><span
                                class="spsl">{{ i.goodsNum }}</span><van-icon name="plus"
                                @click="jia(i.goodsNum, i.goodsTypes, i.goodsZt)" /></div>
                    </div>
                </div>
            </div>
            <div class="xm" v-show="cz == false"></div>
        </div>

        <div><img v-show="cz" class="xr"
                src="https://cdn.cnbj1.fds.api.mi-img.com/mishop-m/production/trade_center/res/images/common/no_result_mi_cart.png">
            <div class="text" v-show="cz">购物车还是空的</div>
            <div>
                <div class="sbkk" v-show="cz"><span>随便看看</span></div>
            </div>
            <div class="jxhw">
                <div><img class="hengr"
                        src="https://cdn.cnbj1.fds.api.mi-img.com/mishop-m/production/trade_center/res/images/common/rec_header_right.png">
                </div>精选好物<div><img class="heng"
                        src="https://cdn.cnbj1.fds.api.mi-img.com/mishop-m/production/trade_center/res/images/common/rec_header_right.png">
                </div>
            </div>
            <div class="goods">
                <div class="wp" v-for="(i, index) in imgurl" :key="index" @click="jumpDetails(i.action.path)">
                    <img class="sptp" :src="i.image_url">
                    <p class="down-text">
                    <p>{{ i.name }}</p>
                    <p class="xj">{{ '¥' + i.price }} <span class="yj" v-if="i.market_price > i.price">{{ '¥' +
                        i.market_price
                    }}</span></p>

                    </p>

                </div>

            </div>
        </div>
    </div>

    <van-submit-bar :price="spzj * 100" button-text="结算" @click="jiesuan" v-show="cz == false">
        <van-checkbox v-model="qx">全选</van-checkbox>
    </van-submit-bar>
</template>


<script setup>
import { onMounted, ref, } from "vue";
import { useRoute, useRouter } from "vue-router"
import axios from "axios";

let imgurl = ref(null)

let $route = useRoute();
let $router = useRouter();

let cz = ref(null)

let sl = ref(0)

let bye = ref(true)

let qx = ref(true)

let qxpd = ref(0)

let BuyCarBye = () => {
    localStorage.removeItem('goods');
    localStorage.removeItem('BuyCar');
    cz.value = true
    bye.value = false
}

let qxl = ref(null)

let Del = (sp) => {
    spzj.value = 0

    let BuyCar = localStorage.BuyCar || "[]";
    let goods = localStorage.goods || "[]";
    goods = JSON.parse(goods);
    BuyCar = JSON.parse(BuyCar);

    for (let i in goods) {



        if (goods[i].goodsTypes == sp && i == 0) {

            goods.shift()


            localStorage.goods = JSON.stringify(goods);
            spsj.value = goods



        }


        else if (goods[i].goodsTypes == sp && i != 0) {
            console.log(i)
            goods.splice(i);
            console.log(goods)

            localStorage.goods = JSON.stringify(goods);
            spsj.value = goods



        }


    }


    for (let i in spsj.value) {

        sl.value += spsj.value[i].goodsNum
        spzj.value += spsj.value[i].goodsNum * goods[i].goodsPrice

    }


    console.log(sl.value)
    BuyCar[0] = sl.value
    localStorage.BuyCar = JSON.stringify(BuyCar);
    sl.value = 0

    if (goods.length == []) {
        localStorage.removeItem('goods');
        localStorage.removeItem('BuyCar');
        bye.value = false
        cz.value = true
    }

}


let gb = (Type, zt) => {
    console.log(Type)
    console.log(zt)

    if (zt == false) {
        qxpd.value = 0
        console.log('该反选了')
        qx.value = false
        qxl.value = false
        spzj.value = 0

        let goods = localStorage.goods || "[]";
        goods = JSON.parse(goods);

        for (let i in goods) {


            if (goods[i].goodsTypes == Type) {
                goods[i].goodsZt = false
                localStorage.goods = JSON.stringify(goods);
                spsj.value = goods
                console.log(spsj.value)
                console.log(spzj.value)

            }


            if (goods[i].goodsZt != false) {

                qxpd.value++


                console.log(qxpd.value)
                spzj.value += goods[i].goodsNum * goods[i].goodsPrice
                localStorage.goods = JSON.stringify(goods);
                spsj.value = goods
                console.log(spzj.value)


            }
        }



    }

    if (zt == true) {


        spzj.value = 0

        let goods = localStorage.goods || "[]";
        goods = JSON.parse(goods);

        for (let i in goods) {


            if (goods[i].goodsTypes == Type && goods[i].goodsZt == false) {
                goods[i].goodsZt = true
                qxpd.value++
                console.log(qxpd.value)
                if (qxpd.value == goods.length) {

                    qx.value = true
                    qxl.value = true
                    qxpd.value = 0

                }
                localStorage.goods = JSON.stringify(goods);
                spsj.value = goods
                console.log(spsj.value)
                console.log(spzj.value)
                console.log('我被选了')

            }

            if (goods[i].goodsZt == true) {

                spzj.value += goods[i].goodsNum * goods[i].goodsPrice
            }





        }



    }




}

let spsj = ref(null)

let spzj = ref(0)

let jiesuan = () => {

    let cartList = ref([]);


    let goods = localStorage.goods || "[]";
    goods = JSON.parse(goods);



    // 全购买
    if (qx.value == true) {
        for (let i in goods) {

            cartList.value.push(goods[i]);
            localStorage.setItem('cartList', JSON.stringify(cartList.value));
            localStorage.setItem('cartTotalPrice', JSON.stringify(spzj.value));
            console.log(spzj.value)
        }

    }

    //  部分购买
    else if (qx.value == false) {


        for (let i in goods) {

            if (goods[i].goodsZt == true) {
                cartList.value.push(goods[i]);
                localStorage.setItem('cartList', JSON.stringify(cartList.value));
                localStorage.setItem('cartTotalPrice', JSON.stringify(spzj.value));
                console.log(cartList.value)
            }

        }

    }

    $router.push({ name: 'payment' });
}

let qxgb = () => {



    if (qx.value == true) {
        qxl.value = true
        spzj.value = 0
        let goods = localStorage.goods || "[]";
        goods = JSON.parse(goods);
        for (let i in goods) {
            goods[i].goodsZt = true

            spzj.value += goods[i].goodsNum * goods[i].goodsPrice
            localStorage.goods = JSON.stringify(goods);
        }

        spsj.value = goods
        console.log(spsj.value)
        console.log(spzj.value)

    }


    if (qx.value == false) {
        qxl.value = false
        qxpd.value = 0
        console.log(spsj.value)
        let goods = localStorage.goods || "[]";
        goods = JSON.parse(goods);
        for (let i in goods) {
            goods[i].goodsZt = false

            spzj.value = 0
            localStorage.goods = JSON.stringify(goods);
        }

        spsj.value = goods
        console.log(spsj.value)
        console.log(spzj.value)

    }
}








let jia = (num, Type, zt) => {
    console.log(num, Type, zt)
    let BuyCar = localStorage.BuyCar || "[]";
    let goods = localStorage.goods || "[]";
    goods = JSON.parse(goods);
    BuyCar = JSON.parse(BuyCar);

    if (qx.value == true) {
        for (let i in goods) {
            if (goods[i].goodsTypes == Type) {
                goods[i].goodsNum++
                spsj.value = goods
                localStorage.goods = JSON.stringify(goods);
            }
        }


        for (let i in spsj.value) {

            sl.value += spsj.value[i].goodsNum

        }

        console.log(sl.value)
        BuyCar[0] = sl.value
        localStorage.BuyCar = JSON.stringify(BuyCar);
        sl.value = 0
    }



    if (qx.value == true) {

        spzj.value = 0
        for (let i in goods) {


            spzj.value += goods[i].goodsNum * goods[i].goodsPrice
            localStorage.goods = JSON.stringify(goods);
        }

        spsj.value = goods
        console.log(spsj.value)
        console.log(spzj.value)

    }

    if (zt == true && qx.value == false) {

        spzj.value = 0
        for (let i in goods) {
            if (goods[i].goodsTypes == Type) {
                goods[i].goodsNum++
            }

            if (goods[i].goodsZt == true) {

                spzj.value += goods[i].goodsNum * goods[i].goodsPrice
                spsj.value = goods
                localStorage.goods = JSON.stringify(goods);
            }

        }

        for (let i in spsj.value) {

            sl.value += spsj.value[i].goodsNum

        }

        console.log(sl.value)
        BuyCar[0] = sl.value
        localStorage.BuyCar = JSON.stringify(BuyCar);
        sl.value = 0

    }

    if (zt == false && qx.value == false) {

        for (let i in goods) {
            if (goods[i].goodsTypes == Type) {
                goods[i].goodsNum++
                // spzj.value=0
                spsj.value = goods
                localStorage.goods = JSON.stringify(goods);
            }
            for (let i in spsj.value) {

                sl.value += spsj.value[i].goodsNum

            }

            console.log(sl.value)
            BuyCar[0] = sl.value
            localStorage.BuyCar = JSON.stringify(BuyCar);
            sl.value = 0

        }

    }


}
let jian = (num, Type, zt) => {
    let BuyCar = localStorage.BuyCar || "[]";
    BuyCar = JSON.parse(BuyCar);



    //  全选状态下的减
    if (qx.value == true && num >= 2 && zt == true) {
        let goods = localStorage.goods || "[]";
        goods = JSON.parse(goods);

        spzj.value = 0



        for (let i in goods) {
            if (goods[i].goodsTypes == Type) {
                goods[i].goodsNum--
                spsj.value = goods
                localStorage.goods = JSON.stringify(goods);
            }
        }


        for (let i in goods) {


            spzj.value += goods[i].goodsNum * goods[i].goodsPrice
            localStorage.goods = JSON.stringify(goods);
        }

        spsj.value = goods
        console.log(spsj.value)


        for (let i in spsj.value) {

            sl.value += spsj.value[i].goodsNum

        }

        console.log(sl.value)
        BuyCar[0] = sl.value
        localStorage.BuyCar = JSON.stringify(BuyCar);
        sl.value = 0


    }


    //   非全选状态下
    if (zt == true && num >= 2 && qx.value == false) {
        let goods = localStorage.goods || "[]";
        goods = JSON.parse(goods);

        spzj.value = 0
        for (let i in goods) {
            if (goods[i].goodsTypes == Type) {
                goods[i].goodsNum--
                spsj.value = goods
                localStorage.goods = JSON.stringify(goods);
            }
        }


        for (let i in goods) {

            if (goods[i].goodsZt == true) {

                spzj.value += goods[i].goodsNum * goods[i].goodsPrice
                spsj.value = goods
                localStorage.goods = JSON.stringify(goods);
            }



        }

        spsj.value = goods
        console.log(spsj.value)


        for (let i in spsj.value) {

            sl.value += spsj.value[i].goodsNum

        }

        console.log(sl.value)
        BuyCar[0] = sl.value
        localStorage.BuyCar = JSON.stringify(BuyCar);
        sl.value = 0

    }


    if (zt == false && num >= 2 && qx.value == false) {
        let goods = localStorage.goods || "[]";
        goods = JSON.parse(goods);
        for (let i in goods) {
            if (goods[i].goodsTypes == Type) {
                goods[i].goodsNum--
                // spzj.value=0
                spsj.value = goods
                localStorage.goods = JSON.stringify(goods);
            }
            for (let i in spsj.value) {

                sl.value += spsj.value[i].goodsNum

            }

            console.log(sl.value)
            BuyCar[0] = sl.value
            localStorage.BuyCar = JSON.stringify(BuyCar);
            sl.value = 0

        }


    }


}



const data = () => {
    axios.get('https://apis.netstart.cn/xmsc/cart_recom')
        .then(response => {


            imgurl.value = response.data.data.recom_list

            console.log(imgurl.value);


        })
        .catch(error => {
            console.log('没请到');

        })
}

onMounted(() => {
    data()
    let goods = localStorage.goods || "[]";
    if (goods != "[]") {
        cz.value = false
        goods = JSON.parse(goods);
        spsj.value = goods

    } else {
        cz.value = true
    }

    qxgb()

})

const jumpDetails = (id) => {
    $router.push({ name: 'details', params: { id: id } });

}





</script>



<style scoped>
.ck {
    margin-left: 200px;

}

.xzwc {
    width: 40px;
    padding: 10px;
    padding-top: 30px;
    box-sizing: border-box;
}

.spsl {
    display: inline-block;
    padding: 1px 10px;

    border: 1px solid #F6F6F6;
}

.xmzy {
    display: flex;
    color: rgb(51, 51, 51);
    font-size: 13px;
    font-weight: bold;
    height: 40px;
    line-height: 40px;
    padding-left: 25px;

    .qxwc {
        padding-top: 2px;
        box-sizing: border-box;
        margin-right: 5px;
    }

    .qx {
        margin-left: -11px;

    }

}

.xm {
    height: 1px;
}

.mgsp {
    display: flex;

    margin: 0px 20px 20px 0px;

    .spwc {
        width: 86.5px;
        height: 86.5px;
        background-color: #EDEDED;
        border-radius: 8px;
    }



    .cpmz {
        display: flex;
        justify-content: space-between;
        font-size: 15px;
        -webkit-line-clamp: 2;
        color: rgb(51, 51, 51);
    }

    .lx {
        color: rgb(102, 102, 102);
        font-size: 12px;
    }

    .jg {
        color: rgb(255, 89, 52);
        font-size: 19px;
        font-weight: 500;

    }

    .jgd {
        width: 220px;
        display: flex;
        justify-content: space-between;
    }

    .you {
        display: flex;
        flex-flow: column;
        justify-content: space-around;
        margin-left: 10px;
    }
}

.spsjimg {
    width: 100%;
}

.gwclb {
    background-color: #FFFFFF;
    border-radius: 15px;



}



.custom-title {
    margin-left: 145px;
    font-size: 18px;
    font-weight: bold;
}

.bg {
    background-color: #F4F4F4;
    width: 100vw;

    padding-top: 10px;
    box-sizing: border-box;
}

.xr {
    width: 125px;
    height: 125px;
    object-fit: cover;
    margin-left: 120px;
    margin-top: 50px;

}

.text {
    margin-left: 140px;
    color: rgba(0, 0, 0, 0.3);
    font-size: 13px;
}

.sbkk {
    margin-left: 140px;
    margin-top: 25px;
    border-radius: 15px;
    width: 95px;
    height: 30px;
    line-height: 31px;
    text-align: center;
    border-color: rgb(178, 178, 178);
    border: 0.1px solid;
    color: rgba(0, 0, 0, 0.5);
    font-size: 13px;
}

.jxhw {
    display: flex;
    margin-left: 142px;
    color: rgb(0, 0, 0);
    font-size: 17px;
    font-weight: bold;
    margin-top: 60px;
    margin-bottom: 20px;
}

.heng {
    display: block;
    width: 13px;
    height: 1.5px;
    margin-top: 6.5px;
}

.hengr {
    display: block;
    width: 13px;
    height: 1.5px;
    margin-top: 6.5px;
    transform: rotate(180deg);
}

.goods {

    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.wp {
    width: 173px;
    height: 276px;
    background-color: #FFFFFF;
    border-radius: 5px;
    margin-top: 10px;
    padding: 4px;

}

.sptp {
    width: 173px;
    height: 173px;
    vertical-align: bottom;
}

.down-text {
    width: 173px;
    height: 104px;

    color: rgba(0, 0, 0, 0.9);
    font-size: 15px;
    -webkit-line-clamp: 2;
    padding-top: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

}

.yj {
    color: rgb(175, 175, 175);
    font-size: 11.5px;
    margin-bottom: 1px;
    margin-left: 3px;
    text-decoration-line: line-through;
}

.xj {
    color: rgba(0, 0, 0, 0.9);
    font-size: 16.5px;
    margin-bottom: 5px;
}
</style>