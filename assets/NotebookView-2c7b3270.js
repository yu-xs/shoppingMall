import{_ as k,r as m,o as y,b as a,c as e,w as i,v as c,d as n,e as t,F as d,j as r,s as w,p as f,n as x,q as b}from"./index-c14d0632.js";import{_ as N}from"./navLoading-b6a5de7e.js";const _=u=>(f("data-v-6aa4e37a"),u=u(),x(),u),S={style:{"margin-top":"5px"}},V={class:"loading"},B=_(()=>t("img",{src:N},null,-1)),I=[B],j=_(()=>t("div",{class:"line"},null,-1)),F=["src"],q=_(()=>t("div",{class:"line"},null,-1)),A=["src"],D=b('<div class="text" data-v-6aa4e37a><div class="name" data-v-6aa4e37a><div class="product" data-v-6aa4e37a>RedmiBook Air 13 </div><div class="price" data-v-6aa4e37a>¥5199起</div></div><div class="description" data-v-6aa4e37a><div class="jj" data-v-6aa4e37a>打开它，就像翻开一本杂志</div><div class="buttom" data-v-6aa4e37a><span data-v-6aa4e37a>立即购买</span></div></div></div><div class="line" data-v-6aa4e37a></div>',2),E=["src"],L=_(()=>t("div",{class:"line"},null,-1)),M=["src"],R=_(()=>t("div",{class:"line"},null,-1)),z=["src"],C=_(()=>t("div",{class:"line"},null,-1)),G=["src"],H={class:"down"},J=["src"],K={__name:"NotebookView",setup(u){let v=m(null),o=m([]);const g=()=>{w.get("https://apis.netstart.cn/xmsc/home/page?page_type=activity&page_id=13176").then(p=>{console.log(p),v.value=p.data.data.data.sections;for(let h in v.value)for(let s in v.value[h].body.items)o.value.push(v.value[h].body.items[0].img_url)}).catch(p=>{console.log("没请到")})};return y(()=>{g(),console.log(o.value)}),(p,h)=>(a(),e("div",S,[i(t("div",V,I,512),[[c,n(o).length<0]]),j,(a(!0),e(d,null,r(n(o),(s,l)=>i((a(),e("div",{class:"waike",key:s},[t("img",{src:s},null,8,F),q])),[[c,l==0]])),128)),(a(!0),e(d,null,r(n(o),(s,l)=>i((a(),e("div",{class:"waike",key:s},[t("img",{src:s},null,8,A),D])),[[c,l==1]])),128)),(a(!0),e(d,null,r(n(o),(s,l)=>i((a(),e("div",{class:"waike",key:s},[t("img",{src:s},null,8,E),L])),[[c,l==2]])),128)),(a(!0),e(d,null,r(n(o),(s,l)=>i((a(),e("div",{class:"waike",key:s},[t("img",{src:s},null,8,M),R])),[[c,l==3]])),128)),(a(!0),e(d,null,r(n(o),(s,l)=>i((a(),e("div",{class:"waike",key:s},[t("img",{src:s},null,8,z),C])),[[c,l==4]])),128)),(a(!0),e(d,null,r(n(o),(s,l)=>i((a(),e("div",{key:s},[t("img",{src:s},null,8,G)])),[[c,l==5]])),128)),t("div",H,[(a(!0),e(d,null,r(n(o),(s,l)=>i((a(),e("div",{key:s},[t("img",{class:"dntp",src:s},null,8,J)])),[[c,l>5]])),128))])]))}},Q=k(K,[["__scopeId","data-v-6aa4e37a"]]);export{Q as default};