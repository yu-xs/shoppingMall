<template>
  <!-- 预加载图 -->
  <div v-if="bcz">该商品已下架</div>
  <div v-if="bcz == false">
    <div class="loading" v-if="!(lbturl.length > 0)">
      <img src="../assets/navLoading1.gif" />
    </div>
  </div>

  <div class="details" v-if="bcz == false">

    <van-popup v-model:show="show" closeable round position="bottom" :style="{ height: '70%' }">
      <div class="zstp">
        <div class="zsimg"><img :src="zsdtp"></div>
        <div>
          <div class="xzjg">{{ '¥' + jiage }}
            <span class="yqjg" v-if="yqjg > jiage">{{ '¥' + yqjg }}</span>
          </div>
          <div class="qc">{{ qc }}</div>
        </div>
      </div>

      <div class="tcc">
        <div>{{ banben }}</div>
        <div style="display: flex;justify-content: start; flex-wrap: wrap; margin-bottom: 20px;">
          <div :class="{ active: index === currentIndex }" class="bbhz" v-for="(i, index) in qbbb" :key="i"
            @click="pt(index, i.name)">{{ i.name }}</div>
        </div>

        <div>{{ ys }}</div>
        <div style="display: flex;justify-content: flex-start;flex-wrap: wrap;">
          <div :class="{ active: index === currentIndex2 }" class="yshz" v-for="(i, index) in color" :key="i"
            @click="pt2(index, i.name)">{{ i.name }}</div>
        </div>
        <div class="gmsl">购买数量 <div><van-icon name="minus" @click="jian" /><span class="shuliang">{{ sl }}</span><van-icon
              name="plus" @click="jia" /></div>
        </div>
      </div>
      <van-action-bar>

        <van-action-bar-button type="warning" text="加入购物车" @click="tocar" />
        <van-action-bar-button type="danger" text="立即购买" @click="goPaymentView" />
      </van-action-bar>

    </van-popup>

    <van-action-bar class="Buysp">
      <van-action-bar-icon icon="shop-o" text="首页" :to="{ name: 'recommend' }" />
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon icon="cart-o" text="购物车" :badge="carsl" :to="{ name: 'cart' }" />
      <van-action-bar-button type="warning" text="加入购物车" @click="Downbuy" />
      <van-action-bar-button type="danger" text="立即购买" @click="Nowbuy" />
    </van-action-bar>


    <van-popup v-model:show="show3" closeable round position="bottom" :style="{ height: '70%' }">
      <div class="zstp">
        <div class="zsimg"><img :src="zsdtp"></div>
        <div>
          <div class="xzjg">{{ '¥' + jiage }}
            <span class="yqjg" v-if="yqjg > jiage">{{ '¥' + yqjg }}</span>
          </div>
          <div class="qc">{{ qc }}</div>
        </div>
      </div>

      <div class="tcc">
        <div>{{ banben }}</div>
        <div style="display: flex;justify-content: start; flex-wrap: wrap; margin-bottom: 20px;">
          <div :class="{ active: index === currentIndex }" class="bbhz" v-for="(i, index) in qbbb" :key="i"
            @click="pt(index, i.name)">{{ i.name }}</div>
        </div>

        <div>{{ ys }}</div>
        <div style="display: flex;justify-content: flex-start;flex-wrap: wrap;">
          <div :class="{ active: index === currentIndex2 }" class="yshz" v-for="(i, index) in color" :key="i"
            @click="pt2(index, i.name)">{{ i.name }}</div>
        </div>
        <div class="gmsl">购买数量 <div><van-icon name="minus" @click="jian" /><span class="shuliang">{{ sl }}</span><van-icon
              name="plus" @click="jia" /></div>
        </div>
      </div>
      <van-action-bar>
        <van-action-bar-button type="danger" text="确定" @click="tocar" />
      </van-action-bar>

    </van-popup>

    <van-popup v-model:show="show4" closeable round position="bottom" :style="{ height: '70%' }">
      <div class="zstp">
        <div class="zsimg"><img :src="zsdtp"></div>
        <div>
          <div class="xzjg">{{ '¥' + jiage }}
            <span class="yqjg" v-if="yqjg > jiage">{{ '¥' + yqjg }}</span>
          </div>
          <div class="qc">{{ qc }}</div>
        </div>
      </div>

      <div class="tcc">
        <div>{{ banben }}</div>
        <div style="display: flex;justify-content: start; flex-wrap: wrap; margin-bottom: 20px;">
          <div :class="{ active: index === currentIndex }" class="bbhz" v-for="(i, index) in qbbb" :key="i"
            @click="pt(index, i.name)">{{ i.name }}</div>
        </div>

        <div>{{ ys }}</div>
        <div style="display: flex;justify-content: flex-start;flex-wrap: wrap;">
          <div :class="{ active: index === currentIndex2 }" class="yshz" v-for="(i, index) in color" :key="i"
            @click="pt2(index, i.name)">{{ i.name }}</div>
        </div>
        <div class="gmsl">购买数量 <div><van-icon name="minus" @click="jian" /><span class="shuliang">{{ sl }}</span><van-icon
              name="plus" @click="jia" /></div>
        </div>
      </div>
      <van-action-bar>
        <van-action-bar-button type="danger" text="确定" @click="goPaymentView" />
      </van-action-bar>

    </van-popup>






    <van-tabs v-model:active="active" scrollspy sticky>
      <van-tab v-for="index in 1">
        <template #title> <van-icon name="arrow-left" @click="syy" /> </template>

      </van-tab>
      <van-tab title="商品">
        <div>
          <van-swipe>
            <van-swipe-item v-for="(i, index) in lbturl" :key="index"><img :src="i" class="lbttp"></van-swipe-item>
            <template #indicator="{ active, total }">
              <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
            </template>
          </van-swipe>

          <div class="mid" ref="element">
            <div class="midd">
              <div><span style="font-size: 23px;color: rgb(255, 89, 0);font-weight: 600;">{{ '¥' + jiage }}</span><span
                  v-if="yqjg > jiage" class="yqjg">{{ '¥' + yqjg }}</span></div>

              <div class="spmz">{{ name }}</div>

              <div class="texing" v-for="(i, index) in cptx" :key="i">{{ i }}</div>
            </div>

            <div class="pz" v-if="iconurl.length > 0">
              <div class="pzdh" v-for="i in iconurl" :key="i">
                <img class="icon" :src="i.icon">

                <div class="top-title">{{ i.top_title }}</div>
                <div class="bottom-title">{{ i.bottom_title }}</div>

              </div>
            </div>

          </div>

          <div class="mid-2">

            <div class="yx">
              <div class="one" @click="xz">
                <div style="color: gray;">已选</div>
                <div>{{ qc + 'X' + sl }}</div><van-icon name="arrow" />
              </div>
              <div class="two" @click="xz">
                <div class="xzys">
                  <div class="qbys">
                    <div v-for="(i, inde) in kxys" :key="i">
                      <img class="ysfl" v-if="num > 1" :src="j.img_url" v-for="(j, index) in kxysurl" :key="j"
                        v-show="index == inde">

                    </div>
                  </div>
                  <div style=" width: 62.5px;text-align: center;
  background-color: #F8F8F8; padding: 8px; font-size: 11px; box-sizing: border-box;
  line-height:11.5px;border-radius: 4px;height: 41.5px; color: gray;" v-if="num > 1">{{ `共${num}种颜色可选` }}</div>
                </div>

              </div>



              <div class="three">
                <div class="ps" @click="showt = true">
                  <div>配送 </div>
                  <input class="xzdq" type="text" v-model="fieldValue" placeholder="请选择地区">
                  <van-icon c name="arrow" />
                </div>


                <van-popup v-model:show="showt" round position="bottom">
                  <van-cascader v-model="cascaderValue" title="请选择所在地区" :options="options" @close="showt = false"
                    @finish="onFinish" />
                </van-popup>


              </div>

              <div class="four">
                <div>服务</div>
                <div class="fwtwo">
                  <div class="xmzy" v-for="(i, index) in fw" :key="index" v-show="index < 2"><img class="gou"
                      src="https://cdn.cnbj1.fds.api.mi-img.com/mishop-m/production/trade_center/res/images/mishop/product/service_icon.png">{{
                        i.title }}</div>
                </div><van-icon name="arrow" />
              </div>
              <div class="qt" v-for="(i, index) in fw" :key="index" v-show="index == 2"><img class="gou"
                  src="https://cdn.cnbj1.fds.api.mi-img.com/mishop-m/production/trade_center/res/images/mishop/product/service_icon.png">{{
                    i.title }}</div>


            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="评价">
        <div class="buyerShow" @click="buyerShowPageView" v-if="buyerShowData">
          <div class="top">
            <span>买家秀</span>
            <span>共{{ buyerShowData.total }}条评论<van-icon name="arrow" /></span>
          </div>
          <ul class="labels">
            <li v-for="i in buyerShowData.tags">{{ i }}</li>
          </ul>
          <ul class="showImg">
            <li v-for="i in buyerShowData.imgs">
              <img :src="i" />
            </li>
          </ul>
        </div>
      </van-tab>


      <!-- 为你推荐 -->
      <div class="recommend" v-if="recommendList.length > 0">
        <p>为你推荐</p>
        <ul class="recommendList">
          <li v-for="i in recommendList" :key="i.pid">
            <img :src="i.imgUrl" />
            <div class="msg">
              <p class="title">{{ i.name }}</p>
              <span class="price">￥{{ i.price }} <del v-if="!(i.marketPrice === i.price)">￥{{ i.marketPrice
              }}</del></span>
            </div>
          </li>
        </ul>
      </div>

      <!-- 海报轮播图 -->
      <van-swipe class="playbill-swipe" :autoplay="3000" indicator-color="white" v-if="playBillList.length > 0">
        <van-swipe-item v-for="i in playBillList">
          <img style="height: 100%;" :src="i.imgUrl" />
        </van-swipe-item>
      </van-swipe>


      <van-tab title="详情">
        <!-- 商品信息 -->
        <van-tabs v-model:active="productsActive" sticky class="products" v-if="goodsDatas.length > 0">
          <!-- 预加载图 -->
          <div class="loading" v-show="!(goodsDatas[productsActive].materialViewList.length > 0)">
            <img src="../assets/loading03.gif" />
          </div>

          <van-tab v-for="i in goodsDatas" :title="i.tabName">
            <img style="width: 100%;vertical-align: bottom;" v-for="i in goodsDatas[productsActive].materialViewList"
              :src="i.materialList[0].imageUrl" />
          </van-tab>
        </van-tabs>
      </van-tab>
    </van-tabs>





  </div>






  <!-- 返回顶部按钮 -->
  <van-back-top right="5vw" bottom="12vh" />
</template>


<script setup >
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useCascaderAreaData } from '@vant/area-data';
import { checkAuth } from '../untils/auth.js'

const element = ref(null);
const distance = ref(0);

let $route = useRoute();
let $router = useRouter();

let Downbuy = () => {
  show3.value = true



}





let tocar = () => {


  if (checkAuth()) {



    let goods = localStorage.goods || "[]";

    goods = JSON.parse(goods);

    let BuyCar = localStorage.BuyCar || "[]";

    BuyCar = JSON.parse(BuyCar);


    if (goods.length == []) {
      goods.unshift({
        goodsImg: zsdtp.value,
        goodsName: name.value,
        goodsTypes: qc.value,
        goodsPrice: jiage.value,
        goodsNum: sl.value,
        goodsZt: false
      });
      localStorage.goods = JSON.stringify(goods);

      for (let i in goods) {
        BuyCar.push(carsl.value += goods[i].goodsNum)
        carsl.value = BuyCar[0]
        localStorage.BuyCar = JSON.stringify(BuyCar);
      }



    }


    // carsl.value+=sl.value

    // 如果大于0
    else if (goods.length > []) {




      for (let i in goods) {
        if (qc.value == goods[i].goodsTypes) {
          console.log(i)
          goods[i].goodsNum += sl.value
          localStorage.goods = JSON.stringify(goods);
        }
      }

      let valueToCheck = qc.value;

      let exists = goods.some(obj => Object.values(obj).includes(valueToCheck));

      if (exists) {
        console.log('存在')
      } else {
        console.log('不存在')
        goods.unshift({
          goodsImg: zsdtp.value,
          goodsName: name.value,
          goodsTypes: qc.value,
          goodsPrice: jiage.value,
          goodsNum: sl.value,
          goodsZt: false
        });
        localStorage.goods = JSON.stringify(goods);
      }

      BuyCar.shift()
      carsl.value = 0
      BuyCar.push(carsl.value)
      for (let i in goods) {

        BuyCar[0] += goods[i].goodsNum

        carsl.value = BuyCar[0]
        localStorage.BuyCar = JSON.stringify(BuyCar);
      }




    }


    show3.value = false
    show.value = false






  } else {
    $router.push({ name: 'login' }) // 未登录，跳转到登录页
  }

}

let Nowbuy = () => {
  show4.value = true
}

let payView = () => {
  if (checkAuth()) {
    console.log('去结账') //跳结账页面
  } else {
    $router.push({ name: 'login' }) // 未登录，跳转到登录页
  }
}

let id = ref($route.params.id)
let lbturl = ref([])
let img = ref(null)

let gwc = ref(true)
let gm = ref(true)

let active = ref(1)
let dqjg = ref(null)

let yj = ref(null)

let cptx = ref(null)

let name = ref(null)

let show = ref(false)

let carsl = ref(false)

let icon = ref(null)

let fh = ref(true)

let iconurl = ref([])

let kxys = ref(null)

let kxysurl = ref(null)

let show3 = ref(false)
let show4 = ref(false)

let syy = () => {
  $router.go(-1)
}

let num = ref(null)

let fw = ref(null)

let color = ref(null)

let ys = ref(null)

let banben = ref(null)

let qbbb = ref(null)

let currentIndex = ref(0)

let currentIndex2 = ref(0)

let mrbb = (null)

let mrys = (null)

let qc = ref(null)

let qblx = ref(null)

let jiage = ref(null)

let yqjg = ref(null)

let zsdtp = ref(null)

let sl = ref(1)

let bcz = ref(false)


let jia = () => {
  sl.value++
}
let jian = () => {


  if (sl.value >= 2) {
    sl.value--
  }
}

const showt = ref(false);
const fieldValue = ref('');
const cascaderValue = ref('');
const options = useCascaderAreaData();
const onFinish = ({ selectedOptions }) => {
  showt.value = false;
  fieldValue.value = selectedOptions.map((option) => option.text).join('/');
  console.log(fieldValue.value)
};




let pd = () => {
  for (let a in qblx.value) {
    if (qc.value == qblx.value[a].name) {

      jiage.value = qblx.value[a].price
      yqjg.value = qblx.value[a].market_price
      zsdtp.value = qblx.value[a].img_url
    }
  }
}

let xz = () => {

  show.value = true


}

let pt = (index, i) => {
  currentIndex.value = index
  mrbb = i
  qc.value = name.value + ' ' + mrbb + ' ' + mrys
  sl.value = 1
  pd()



}

let pt2 = (index, i) => {
  currentIndex2.value = index
  mrys = i
  qc.value = name.value + ' ' + mrbb + ' ' + mrys
  sl.value = 1

  pd()
}






const data = () => {
  axios.get(`https://apic.netstart.cn/xmsc/miproduct/view?commodity_id=${id.value}`)
    .then(response => {

      console.log(response.data.data)

      color.value = response.data.data.buy_option[1].list

      // console.log(response.data.data.buy_option[1].name)

      qbbb.value = response.data.data.buy_option[0].list

      banben.value = response.data.data.buy_option[0].name

      ys.value = response.data.data.buy_option[1].name

      cptx.value = response.data.data.product_info.sell_point_desc

      fw.value = response.data.data.goods_info[0].service_refound_policy_list.list_new

      img.value = response.data.data.goods_share_datas.gallery_view

      name.value = response.data.data.product_info.name

      icon.value = response.data.data.goods_info[0].class_parameters.list


      if (color.value.length == 1 && color.value[0].name == '通用') { mrys = '' }
      else if (color.value.length >= 1) { mrys = color.value[0].name }


      if (qbbb.value.length >= 1) { mrbb = qbbb.value[0].name }



      //  else{  }


      console.log(color.value.length)

      qc.value = name.value + ' ' + mrbb + ' ' + mrys

      for (let yanse in response.data.data.buy_option) {
        if (response.data.data.buy_option[yanse].name == '颜色') {
          kxys.value = response.data.data.buy_option[yanse].list

        }
      }

      for (let sumys in response.data.data.buy_option) {

        if (response.data.data.buy_option[sumys].name == '颜色') {
          num.value = response.data.data.buy_option[sumys].list.length


        }
      }

      kxysurl.value = response.data.data.goods_info




      console.log(kxysurl.value);



      qblx.value = response.data.data.goods_info

      console.log(qblx.value)


      jiage.value = qblx.value[0].price
      yqjg.value = qblx.value[0].market_price
      zsdtp.value = qblx.value[0].img_url

      for (let a in qblx.value) {


        if (qc.value == qblx.value[a].name) {

          jiage.value = qblx.value[0].price
          yqjg.value = qblx.value[0].market_price
          zsdtp.value = qblx.value[a].img_url
        }
      }

      for (let i in icon.value) {
        if (icon.value[i].icon != undefined && icon.value[i].bottom_title != undefined) {
          iconurl.value.push({
            bottom_title: icon.value[i].bottom_title,
            icon: icon.value[i].icon,
            top_title: icon.value[i].top_title
          })
        }

      }

      for (let i in img.value) {

        lbturl.value.push(img.value[i].img_url)

        dqjg.value = img.value[0].price
        yj.value = img.value[0].market_price
      }
    })
    .catch(error => {
      console.log('没请到');
      bcz.value = true
    })
}


// 跳转支付页
function goPaymentView() {
  $router.push({
    name: 'payment',
    query: {
      goodsImg: zsdtp.value,
      name: name.value,
      goodsInfo: qc.value,
      price: jiage.value,
      count: sl.value,
      totalPrice: Number(jiage.value) * Number(sl.value)
    }
  });
}

// 获取买家秀数据
let buyerShowData = ref([]);
let playBillList = ref([]);
let goodsDatas = ref([]);
let productsActive = ref(0);
async function getBuyerShowData() {
  console.log('请求数据')
  const data = await axios.post(`/api/mtop/xiaomishop/product/info`, [{}, { productId: id.value }], { headers: { 'Content-Type': 'application/json' } });

  buyerShowData.value = data.data.data.buyerShow;
  playBillList.value = data.data.data.carouselAdInfo.carouselAdList;
  // 商品信息获取
  goodsDatas.value = data.data.data.realProduct.realProductInfo[id.value].materialTabList;
  console.log(goodsDatas.value);
}
// 获取推荐列表数据
let recommendList = ref([]);
async function getRecommendData() {
  const data = await axios.post(`/api/mtop/xiaomishop/product/compose`, [{}, { productId: id.value }], { headers: { 'Content-Type': 'application/json' } });

  recommendList.value = data.data.data.recommend.recommendList;
  console.log(recommendList.value);
}

// 跳转买家秀详情页
async function buyerShowPageView() {
  $router.push({ name: 'buyerShow', params: { id: id.value } })
}


onMounted(() => {
  data()
  getBuyerShowData();
  getRecommendData();


  let BuyCar = localStorage.BuyCar || "[]";
  if (BuyCar != "[]") {
    BuyCar = JSON.parse(BuyCar);
    carsl.value = BuyCar[0]
  }

})
</script>

<style scoped lang="scss">
// 轮播图样式
.playbill-swipe {
  height: 105px;
  margin: 0 10px;
  margin-top: 10px;
  border-radius: 10px;
}

.playbill-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

.details {
  background-color: #f4fcfa;
  padding-bottom: 50px;
  box-sizing: border-box;
}



.loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding-top: 100px;
  box-sizing: border-box;
  background-color: white;
  z-index: 1000;

  img {
    width: 100%;
  }
}

.Buysp {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 3;
}

.back {
  width: 27px;
  position: fixed;
  top: 1.5%;
  left: 2%;
  z-index: 666;
}

.midd {

  background-color: #FFFFFF;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
}

.xzjg {
  margin-top: 20px;
  margin-left: 20px;
  color: rgb(255, 89, 0);
  font-size: 19px;
  font-weight: 500;
}

.qc {
  color: rgb(0, 0, 0);
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  margin-top: 8.5px;
  margin-left: 20px;
}

.qbys {
  display: flex;
  width: 160px;
  overflow: auto;
}

.fwtwo {
  display: flex;
  margin-left: -140px;
}

.texing {
  color: rgb(0, 0, 0);
  font-size: 12px;
  height: 21px;
  line-height: 21px;
  opacity: 0.9;
  overflow: hidden;
}

.spmz {
  -webkit-line-clamp: 2;
  color: rgb(0, 0, 0);
  font-size: 17px;
  font-weight: 500;
  opacity: 0.9;
  margin-top: 10px;
  margin-bottom: 10px;
}

.tcc {
  padding-left: 10px;
  padding-right: 10px;
  font-size: 12px;
}

.gmsl {
  display: flex;
  justify-content: space-between;
}

.shuliang {
  display: inline-block;
  background-color: rgb(249, 249, 249);
  border-radius: 4px;
  height: 29px;
  width: 49px;
  text-align: center;
  line-height: 29px;
}

.yqjg {
  color: rgba(0, 0, 0, 0.3);
  font-size: 13px;
  font-weight: 400;
  margin-left: 12px;
  margin-top: 10.5px;
  text-decoration-line: line-through;
}

.tyou {
  margin-left: 136px;
  color: black;
}

.xmfw {
  margin-left: 16px;
}

.xmzy {
  margin-left: 15px;
}

.two {
  // width: 216px;   
  margin-left: 55px;
  overflow: hidden;
  margin-bottom: 10px;
  // background-color: palevioletred;
}

.ps {
  width: 100vw;
  font-size: 12px;
  display: flex;
  text-align: center;
  justify-content: space-between;
  margin-bottom: 20px;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;

  .psdn {
    margin-left: 16px;
  }

  .xzdq {
    border: none;
    text-align: center;
    caret-color: rgba(0, 0, 0, 0);
    // padding: 0 26px;
  }

  .you {
    margin-left: 80px;
    color: black;
  }
}

.lbttp {
  width: 100vw;
  vertical-align: bottom;

}

.custom-indicator {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 2px 5px;
  font-size: 12px;
  background-color: rgba(51, 51, 51, 0.3);
  color: rgb(255, 255, 255);
  border-radius: 5px;

}

.mid {
  // background-color: red;
  background-color: #f4fcfa;
  overflow: hidden;
  padding: 10px;
}

.pz {

  border-radius: 5px;
  // width: 100vw;
  margin-top: 10px;
  display: flex;

  background-color: #FFFFFF;

  overflow: auto;
  text-align: center;

  text-overflow: ellipsis;

  padding-top: 10px;
}

.pz::-webkit-scrollbar {
  display: none;
}

.icon {
  width: 16.5px;
}

.qt {
  font-size: 12px;
  padding-left: 54px;
  margin-top: 5px;
  color: #808080;
}

.pzdh {
  width: 70px;
  height: 58.51px;
}

.top-title {
  white-space: nowrap;

  font-size: 12px;
  margin-top: 4px;
  margin-bottom: 4px;
}

.bottom-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 11px;
  width: 70px;
  color: gray;
}


.yx {

  // width: 354.35px;
  // height: 200px;
  padding-top: 10px;
  background-color: #FFFFFF;
  border-radius: 5px;
  margin-bottom: 10px;

  padding-bottom: 10px;
  box-sizing: border-box;
}

.mid-2 {
  padding: 0px 10px;
  background-color: #f4fcfa;

}

.one {
  width: 100%;
  display: flex;
  //  background-color: yellow;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;

}

.three {
  display: flex;
  width: 100%;
  color: gray;
  // background-color: tomato;

}

.four {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: grey;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;

}

.ysfl {
  width: 40px;
}

.xzys {
  display: flex;
}

.gou {
  width: 11.5px;
}

.zstp {
  width: 355px;
  height: 120px;
  // background-color: yellow;
  margin: 10px;
  display: flex;
}

.zsimg {
  width: 86.5px;
  height: 86.5px;
  background-color: #EDEDED;
  border-radius: 8px;

  img {
    width: 100%;
  }
}

// .quan{
//   display: inline-block;
//   border-radius: 50%;
//   // background-color: red;
//   // width: 11px;
//   // height: 18px;

//   font-size: 12px;
//   text-align: center;
//   border: 1px solid gray;
// }

.bbhz {
  background-color: #F5F5F5;
  font-size: 12px;
  border-radius: 10px;
  padding: 10px 10px;
  margin-top: 10px;
  margin-right: 23px;
}

.yshz {
  background-color: #F5F5F5;
  font-size: 12px;
  border-radius: 10px;
  padding: 6px 14px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
  white-space: nowrap;
}

.active {
  background-color: #FFF2EB;
}


// 买家秀
.details .buyerShow {
  border-radius: 10px;
  overflow: hidden;
  box-sizing: border-box;
  margin: 0 10px;
  padding: 10px;
  background-color: white;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    span:nth-child(1) {
      font-size: 14px;
    }

    span:nth-child(2) {
      font-size: 12px;
      color: #aaa;
    }
  }

  .labels {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    li {
      font-size: 12px;
      padding: 5px 8px;
      margin-bottom: 8px;
      margin-right: 8px;
      border-radius: 5px;
      background-color: papayawhip;
    }
  }

  .showImg {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding-bottom: 10px;
    box-sizing: border-box;
    overflow: auto;
    border-bottom: 1px solid #F5F5F5;

    li {
      border-radius: 5px;
      margin-right: 5px;
    }

    li img {
      width: 80px;
      height: 80px;
      vertical-align: bottom;
      border-radius: 5px;
    }
  }

}

// 为你推荐样式
.details .recommend {
  margin: 0 10px;
  margin-top: 10px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: white;
}

.details .recommend p {
  font-size: 15px;
}

.details .recommend .recommendList {
  display: flex;
  // margin: 5px 0;
  overflow: auto;
}

.details .recommend li {
  margin-top: 5px;
  margin-right: 10px;
  padding: 8px 5px;
  box-sizing: border-box;
  background-color: rgb(250, 250, 250);
  border-radius: 5px;
}

.details .recommend li img {
  width: 95px;
  height: 95px;
  border-radius: 5px;
  vertical-align: bottom;
  margin-bottom: 5px;
}

.details .recommend li .msg {
  .title {
    width: 95px;
    font-size: 13px;
    margin-bottom: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .price {
    font-size: 15px;
    font-weight: bold;

    del {
      font-weight: lighter;
      font-size: 12px;
      color: #ccc;
      text-decoration: line-through;
    }
  }
}

.details .products {
  margin-top: 10px;
}
</style>