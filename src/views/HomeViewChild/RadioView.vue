<template>
    <div style="margin-top: 5px;"></div>
    <div class="waike" v-for="(i,index) in tpurl" :key="i" v-show="index<5">
     <img :src="i"/>
     <div class="jiange"></div>
    </div>
    <div class="goods-list">
      <div>
        <img class="goods" src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c4ce42eacf60d0eb29969c2769dc6513.jpg?f=webp&w=505&h=505&thumb=1" >
        <div class="info-box">
          <div class="text">
            <div class="name">小米盒子 4S</div>
            <div class="brief">全新的音影体验,更流畅更逼真</div>
            <div class="down">
              <div class="price">¥299</div>
              <div class="buttom"><span>立即购买</span></div>
            </div>
          
          </div>
        </div>
       
      </div>

      <div class="right">
        <img class="goods" src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/cfebca8b14df2cec064f777a3c741ca4.jpg?f=webp&w=505&h=505&thumb=1" >
        <div class="info-box">
          <div class="text">
            <div class="nameright">米家激光投影电视 1S 4K</div>
            <div class="brief">更自然的色彩,更真实的还原</div>
            <div class="down">
              <div class="price">¥14999</div>
              <div class="buttom"><span>立即购买</span></div>
            </div>
        
          </div>
        </div>
      </div>
    </div>
  
     <img src="http://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0a8ffdca71ec6cb520fb4af45ce00fa7.jpg?f=webp"/>
</template>




<script setup>
import { onMounted,ref} from "vue";
import axios from "axios";

let imgurl=ref(null)
let tpurl=ref([])

const data= ()=>{ axios.get('https://apis.netstart.cn/xmsc/home/page?page_type=activity&page_id=19071')
      .then(response => {


      
 imgurl.value=response.data.data.data.sections


for (let url in imgurl.value) {
                        

for (let tp in imgurl.value[url].body.items) {
   
    
    tpurl.value.push(imgurl.value[url].body.items[0].img_url)
}

}








      })
        
      .catch(error => {
       console.log('没请到');
       
      })}

    onMounted(()=>{
        data()


    })






</script>



<style scoped>
img{
    width: 100vw;
    vertical-align: bottom
}


.jiange{
    width: 100vw;
    height: 8.33px;
    background-color: rgb(255, 174, 153);
   
  
}

.goods-list{
    width: 100vw;
    display: flex;
    justify-content:space-around;
    background-color: rgb(255, 174, 153);
    height: 300px;
   
}

.goods{
    width: 176.2px;
    height: 176.2px;
    border-radius: 5px 5px 0px 0px;

}

.info-box{
  width: 176.2px;
  height: 114.03px;
  background-color: #FFFFFF;
  padding: 15px 5px;
  box-sizing: border-box;

  border-radius: 0px 0px 5px 5px;
}
.right{
  margin-right: 10px;
}

.name{
  font-size: 16px;
  font-weight: bolder;
    color: #3c3c3c;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    margin-bottom: 5px;
}

.nameright{
  font-size: 16px;
  font-weight: bolder;
    color: #3c3c3c;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    margin-bottom: 5px;
    margin-left: 5px;
}
.brief{
 
    color: #3c3c3c;
   
    font-size: 11px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 10px;
    margin-bottom: 5px;
}

.price{
  text-align: center;
  color: rgb(245, 75, 75);
  margin-bottom: 3px;
  /* font-weight: bold; */
}
.buttom{
  text-align: center;
  background-color: rgb(245, 75, 75);
    color: rgb(255, 255, 255);
  width: 91.74px;
  height: 25.24px;
  margin-left: 40px;
  line-height: 25.24px;
  border-radius: 5px;
  font-size: 12px;
}


</style>