import{_ as E,r as d,i as M,o as q,b as a,c as o,w as z,v as G,d as c,e as s,f as H,g as w,h as l,F as i,j as r,S as J,l as K,t as n,m as O,p as P,n as Q}from"./index-c14d0632.js";import{_ as R}from"./navLoading-b6a5de7e.js";const T=_=>(P("data-v-6bca71d3"),_=_(),Q(),_),U={class:"loading"},W=T(()=>s("img",{src:R},null,-1)),X=[W],Y={class:"smart"},Z={key:0,class:"banner"},tt=["src"],st={key:1,class:"category"},et=["src"],at={class:"streamer"},ot=["src"],ct={key:2,class:"travel"},dt=["src"],it={class:"msg"},rt={class:"title"},nt={class:"description"},lt={class:"price"},_t={class:"streamer"},mt=["src"],ut={key:3,class:"travel"},pt=["src"],yt={class:"msg"},ht={class:"title"},gt={class:"description"},vt={class:"price"},bt={key:4,class:"playBill"},St=["src"],kt={__name:"SmartView",setup(_){let m=d([]),p=d([]),b=d([]),y=d([]),S=d([]),h=d([]),u=d([]);const f=M("$axios");async function L(){console.log("请求数据");const e=await f.post("/api/v1/home/page?page_id=10288&page_type=activity");m.value=e.data.data.data.sections[0].body.items;const k=e.data.data.data.sections[2].body.items,g=e.data.data.data.sections[3].body.items;p.value=k.concat(g);const v=e.data.data.data.sections[5].body.items,t=e.data.data.data.sections[7].body.items,x=e.data.data.data.sections[9].body.items,$=e.data.data.data.sections[11].body.items,V=e.data.data.data.sections[13].body.items,B=e.data.data.data.sections[15].body.items,I=e.data.data.data.sections[17].body.items,D=e.data.data.data.sections[19].body.items;b.value=[...v,...t,...x,...$,...V,...B,...I,...D];const F=e.data.data.data.sections[21].body.items,N=e.data.data.data.sections[23].body.items;y.value=[...F,...N];const j=e.data.data.data.sections[25].body.items,C=e.data.data.data.sections[27].body.items,A=e.data.data.data.sections[29].body.items;S.value=[...j,...C,...A],h.value=e.data.data.data.sections[31].body.items,u.value=e.data.data.data.sections[33].body.items,console.log(u)}return q(()=>{L()}),(e,k)=>{const g=O,v=J;return a(),o(i,null,[z(s("div",U,X,512),[[G,c(m).length<0]]),s("div",Y,[c(m).length>0?(a(),o("div",Z,[H(v,{class:"my-swipe",autoplay:3e3,"indicator-color":"#82A99F"},{default:w(()=>[(a(!0),o(i,null,r(c(m),t=>(a(),K(g,{key:t.material_id},{default:w(()=>[s("img",{src:`${t.img_url}`},null,8,tt)]),_:2},1024))),128))]),_:1})])):l("",!0),c(p).length>0?(a(),o("ul",st,[(a(!0),o(i,null,r(c(p),t=>(a(),o("li",{key:t.material_id},[s("img",{src:`${t.img_url}`},null,8,et)]))),128))])):l("",!0),s("ul",at,[(a(!0),o(i,null,r(c(b),t=>(a(),o("li",{key:t.activity_code},[s("img",{src:`${t.img_url}`},null,8,ot)]))),128))]),c(y).length>0?(a(),o("ul",ct,[(a(!0),o(i,null,r(c(y),t=>(a(),o("li",{key:t.product_id},[s("img",{src:`${t.img_url}`},null,8,dt),s("div",it,[s("p",rt,n(t.product_name),1),s("p",nt,n(t.product_brief),1),s("p",lt,"￥"+n(t.product_price),1)])]))),128))])):l("",!0),s("ul",_t,[(a(!0),o(i,null,r(c(S),t=>(a(),o("li",{key:t.activity_code},[s("img",{src:`${t.img_url}`},null,8,mt)]))),128))]),c(h).length>0?(a(),o("ul",ut,[(a(!0),o(i,null,r(c(h),t=>(a(),o("li",{key:t.product_id},[s("img",{src:`${t.img_url}`},null,8,pt),s("div",yt,[s("p",ht,n(t.product_name),1),s("p",gt,n(t.product_brief),1),s("p",vt,"￥"+n(t.product_price),1)])]))),128))])):l("",!0),c(u).length>0?(a(),o("div",bt,[s("img",{src:c(u)[0].img_url},null,8,St)])):l("",!0)])],64)}}},Lt=E(kt,[["__scopeId","data-v-6bca71d3"]]);export{Lt as default};
