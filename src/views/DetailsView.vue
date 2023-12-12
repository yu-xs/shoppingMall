<template>
  <!-- 预加载图 -->
  <div class="loading" v-show="!(lbturl.length > 0)">
    <img src="../assets/navLoading1.gif" />
  </div>

  <div class="details">
    <van-swipe>
      <van-swipe-item v-for="(i, index) in lbturl" :key="index"><img :src="i" class="lbttp"></van-swipe-item>
      <template #indicator="{ active, total }">
        <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
      </template>
    </van-swipe>

    <div class="mid">
      <div><span>{{ '¥' + jiage }}</span><span>{{ '¥' + yqjg }}</span></div>

      <div>{{ name }}</div>

      <div v-for="(i, index) in cptx" :key="i"><span class="quan">{{ index + 1 }}</span>{{ i }}</div>

      <div class="pz">
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
          <div>已选</div>
          <div>{{ qc }}</div><van-icon name="arrow" />
        </div>
        <div class="two" @click="xz">
          <div class="xzys">
            <div v-for="(i, inde) in kxys" :key="i">
              <img class="ysfl" :src="j.img_url" v-for="(j, index) in kxysurl" :key="j" v-show="index == inde">

            </div>
            <div style="width: 61.5px; height: 41.49px; line-height: 22.49px;text-align: center;font-size: 14px;">{{
              `共${num}颜色可选` }}</div>
          </div>

        </div>



        <div class="three">
          <div class="ps" @click="showt = true">
            <div class="psdn">配送 </div>
            <input class="xzdq" type="text" v-model="fieldValue" placeholder="请选择地区">
            <van-icon class="you" name="arrow" />
          </div>


          <van-popup v-model:show="showt" round position="bottom">
            <van-cascader v-model="cascaderValue" title="请选择所在地区" :options="options" @close="showt = false"
              @finish="onFinish" />
          </van-popup>


        </div>

        <div class="four">
          <div class="xmfw">服务</div>
          <div class="xmzy" v-for="(i, index) in fw" :key="index" v-show="index < 2"><img class="gou"
              src="https://cdn.cnbj1.fds.api.mi-img.com/mishop-m/production/trade_center/res/images/mishop/product/service_icon.png">{{
                i.title }}</div><van-icon class="tyou" name="arrow" />
        </div>
        <div class="qt" v-for="(i, index) in fw" :key="index" v-show="index == 2"><img class="gou"
            src="https://cdn.cnbj1.fds.api.mi-img.com/mishop-m/production/trade_center/res/images/mishop/product/service_icon.png">{{
              i.title }}</div>


      </div>
    </div>



    <van-popup v-model:show="show" round position="bottom" :style="{ height: '70%' }">
      <div class="zstp">
        <div class="zsimg"><img :src="zsdtp"></div>
        <div>
          <div>{{ '¥' + jiage }} <span>{{ '¥' + yqjg }}</span></div>
          <div>{{ qc }}</div>
        </div>
      </div>

      <div>
        <div>{{ banben }}</div>
        <div style="display: flex;justify-content: space-around;">
          <div :class="{ active: index === currentIndex }" class="bbhz" v-for="(i, index) in qbbb" :key="i"
            @click="pt(index, i.name)">{{ i.name }}</div>
        </div>

        <div>{{ ys }}</div>
        <div style="display: flex;justify-content: space-around;">
          <div :class="{ active: index === currentIndex2 }" class="yshz" v-for="(i, index) in color" :key="i"
            @click="pt2(index, i.name)">{{ i.name }}</div>
        </div>

      </div>

    </van-popup>

    <!-- 买家秀 -->
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
  </div>
</template>


<script setup >
import { ref, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useCascaderAreaData } from '@vant/area-data';
import { Cascader } from 'vant';

let $route = useRoute();
let $router = useRouter();


let id = ref($route.params.id)
let lbturl = ref([])
let img = ref(null)

let dqjg = ref(null)

let yj = ref(null)

let cptx = ref(null)

let name = ref(null)

let show = ref(false)

let icon = ref(null)

let iconurl = ref([])

let kxys = ref(null)

let kxysurl = ref(null)

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


const showt = ref(false);
const fieldValue = ref('');
const cascaderValue = ref('');
const options = useCascaderAreaData();
const onFinish = ({ selectedOptions }) => {
  showt.value = false;
  fieldValue.value = selectedOptions.map((option) => option.text).join('/');
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

  pd()



}

let pt2 = (index, i) => {
  currentIndex2.value = index
  mrys = i
  qc.value = name.value + ' ' + mrbb + ' ' + mrys


  pd()
}

const data = () => {
  axios.get(`https://apis.netstart.cn/xmsc/miproduct/view?commodity_id=${id.value}`)
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




      mrbb = qbbb.value[0].name
      mrys = color.value[0].name

      qc.value = name.value + ' ' + mrbb + ' ' + mrys

      console.log(qc.value)
      kxys.value = response.data.data.buy_option[1].list

      num.value = kxys.value = response.data.data.buy_option[1].list.length


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

    })
}

// 获取买家秀数据
let buyerShowData = ref([]);
async function getBuyerShowData() {
  console.log('请求数据')
  const data = await axios.post(`/api/mtop/xiaomishop/product/info`, [{}, { productId: id.value }], { headers: { 'Content-Type': 'application/json' } });

  buyerShowData.value = data.data.data.buyerShow;
  console.log(buyerShowData.value);
}
// 跳转买家秀详情页
async function buyerShowPageView() {
  $router.push({ name: 'buyerShow', params: { id: id.value } })
}

onMounted(() => {
  data()
  getBuyerShowData();
})
</script>

<style scoped lang="scss">
.details {
  background-color: #f4fcfa;
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

.tyou {
  margin-left: 120px;
}

.xmfw {
  margin-left: 25px;
}

.xmzy {
  margin-left: 15px;
}

.two {
  margin-bottom: 10px;
}

.ps {
  width: 100vw;
  font-size: 12px;
  display: flex;
  text-align: center;

  margin-bottom: 20px;

  .psdn {
    margin-left: 25px;
  }

  .xzdq {
    border: none;
    text-align: center;
    caret-color: rgba(0, 0, 0, 0);
    padding-left: 40px;
  }

  .you {
    margin-left: 80px;
  }
}

.lbttp {
  width: 100vw;
  vertical-align: bottom;
}

.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background-color: rgba(51, 51, 51, 0.3);
  color: rgb(255, 255, 255);
  border-radius: 5px;

}

.mid {
  // background-color: red;

  overflow: hidden;
  padding: 10px;
}

.pz {
  border-radius: 5px;
  width: 354.35px;
  margin-top: 10px;
  display: flex;

  background-color: #FFFFFF;

  overflow: auto;
  text-align: center;

  text-overflow: ellipsis;


}

.pz::-webkit-scrollbar {
  display: none;
}

.icon {
  width: 16.5px;
}

.qt {
  font-size: 12px;
  padding-left: 64px;
  margin-top: 5px;
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
}


.yx {

  width: 354.35px;
  height: 236.42px;
  background-color: #FFFFFF;
  border-radius: 5px;
  margin-bottom: 30px;
}

.mid-2 {
  padding: 0px 10px;
  background-color: #F5F5F5;
}

.one {
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  margin-bottom: 10px;

}

.three {
  display: flex;
  justify-content: space-around;


}

.four {
  display: flex;
  // justify-content: space-around;
  font-size: 12px;


}

.ysfl {
  width: 50px;
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
  background-color: yellow;
  margin: 10px;
  display: flex;
}

.zsimg {
  width: 86.5px;
  height: 86.5px;
  background-color: red;

  img {
    width: 100%;
  }
}

.quan {
  display: inline-block;
  border-radius: 50%;
  // background-color: red;
  width: 12px;
  font-size: 12px;
  text-align: center;
  border: 1px solid gray;
}

.bbhz {
  background-color: #F5F5F5;
  font-size: 12px;
  border-radius: 10px;
  padding: 10px 10px;
}

.yshz {
  background-color: #F5F5F5;
  font-size: 12px;
  border-radius: 10px;
  padding: 6px 14px;
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
</style>