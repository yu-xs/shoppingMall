import{_ as j,u as D,a as P,r as c,i as F,a1 as E,o as M,b as a,c as o,w as T,v as q,d as m,e,f as _,F as v,j as f,af as A,t as y,h as S,I as G,p as H,n as J}from"./index-c14d0632.js";import{N as K}from"./index-03909772.js";const O="/assets/loading01-79c929b1.gif";const Q=r=>(H("data-v-58c992ae"),r=r(),J(),r),U={class:"loading"},W=Q(()=>e("img",{src:O},null,-1)),X=[W],Y={class:"buyerShow"},Z={class:"reviews"},ee=["onClick"],se={class:"reviewsList"},te={class:"top"},ae={class:"left"},oe=["src"],ne={class:"name"},ce={class:"right"},ie={class:"content"},le={key:0,class:"imgBox"},_e=["src","onClick"],re=["src"],ue={class:"bottom"},de={__name:"buyerShowPageView",setup(r){let C=D(),x=P(),k=c(C.params.id);const b=F("$axios"),h=c(!1),p=c(""),$=s=>{h.value=!0,p.value=s},B=()=>{h.value=!1,p.value=""};function L(){x.back()}let g=c([]),i=c([]);async function V(){var n,u;const s=await b.post(`/api/v1/communicate/mizone_buyer_show_list?commodity_id=${k.value}&page_size=10&need_detail=true`);g.value=(n=s.data.data)==null?void 0:n.detail.comment_tags,i.value=(u=s.data.data)==null?void 0:u.comments,console.log(g.value)}let w=c("");async function z(){var n;const s=await b.post(`/api/v1/communicate/mizone_buyer_show_list?commodity_id=${k.value}&page_size=10&profile_id=${w.value}`);i.value=(n=s.data.data)==null?void 0:n.comments,console.log(i.value)}let I=c(0);function N(s,n){w.value=s,I.value=n}return E(w,s=>{console.log(s),z()}),M(()=>{V()}),(s,n)=>{const u=K,d=G;return a(),o(v,null,[T(e("div",U,X,512),[[q,!(m(i).length>0)]]),e("div",Y,[_(u,{fixed:"true",title:"评论","left-arrow":"",onClickLeft:L}),e("ul",Z,[(a(!0),o(v,null,f(m(g),(t,l)=>(a(),o("li",{key:t.profile_id,onClick:R=>N(t.profile_id,l),class:A({active:m(I)===l})},y(t.tag_name),11,ee))),128))]),e("ul",se,[(a(!0),o(v,null,f(m(i),t=>(a(),o("li",null,[e("div",te,[e("div",ae,[e("img",{src:`${t.user_avatar}`},null,8,oe),e("span",ne,y(t.user_name),1)]),e("div",ce,[_(d,{name:"ellipsis"})])]),e("p",ie,y(t.comment_content),1),t.comment_images?(a(),o("ul",le,[(a(!0),o(v,null,f(t.comment_images,l=>(a(),o("li",null,[e("img",{src:l,onClick:R=>$(l)},null,8,_e)]))),256)),h.value?(a(),o("div",{key:0,class:"mask",onClick:B},[e("img",{src:p.value},null,8,re)])):S("",!0)])):S("",!0),e("div",ue,[_(d,{name:"share-o"}),_(d,{name:"chat-o"}),_(d,{name:"good-job-o"})])]))),256))])])],64)}}},he=j(de,[["__scopeId","data-v-58c992ae"]]);export{he as default};