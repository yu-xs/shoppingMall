import{_ as D,u as I,a as S,r as i,x as A,o as w,b as x,c as N,f as u,g as L,d as p,B as _,I as C}from"./index-c14d0632.js";import{A as E}from"./index-d3631c41.js";/* empty css              */import{N as k}from"./index-03909772.js";import{a as J}from"./index.esm-6f3b090d.js";const O={class:"editAddress"},B={__name:"EditAddressView",setup(V){const m=I(),c=S(),l=i([]);let d=i(null),s=i(JSON.parse(m.query.item||"{}"));console.log(s);let a=A({id:s.value.id,name:s.value.name,tel:s.value.tel,province:s.value.province,city:s.value.city,county:s.value.county,addressDetail:s.value.addressDetail,isDefault:s.value.isDefault||!1});const f=e=>{_("修改成功!"),console.log(e.isDefault);const o=JSON.parse(localStorage.getItem("user")),t=o.addressList;e.isDefault&&t.forEach(r=>{r.isDefault=!1}),o.addressList=t;const n=t.findIndex(r=>r.id===a.id);t[n]={id:a.id,name:e.name,tel:e.tel,isDefault:e.isDefault||!1,addressDetail:e.addressDetail,province:e.province,city:e.city,county:e.county,areaCode:e.areaCode,address:e.province+e.city+e.county+e.addressDetail},localStorage.setItem("user",JSON.stringify(o)),c.replace({name:"shipAddress"})},v=e=>{_("删除成功!");const o=JSON.parse(localStorage.getItem("user")),t=o.addressList,n=t.findIndex(r=>r.id===e.id);t.splice(n,1),localStorage.setItem("user",JSON.stringify(o)),c.replace({name:"shipAddress"})},g=e=>{e?l.value=[{name:"",address:""}]:l.value=[]};function h(){c.back()}function y(){c.push({name:"map"})}return w(()=>{const e=localStorage.getItem("AddressInfo");e&&(d=JSON.parse(e),console.log(d),a.province=d.province,a.city=d.city,a.county=d.district,a.addressDetail=d.street,localStorage.removeItem("AddressInfo"))}),(e,o)=>{const t=k,n=C,r=E;return x(),N("div",O,[u(t,{title:"修改地址","left-arrow":"",onClickLeft:h}),u(r,{"area-list":p(J),"show-delete":"","show-set-default":"","show-search-result":"","search-result":l.value,"area-columns-placeholder":["请选择","请选择","请选择"],onSave:f,onDelete:v,onChangeDetail:g,"address-info":p(a)},{default:L(()=>[u(n,{name:"location-o",onClick:y})]),_:1},8,["area-list","search-result","address-info"])])}}},T=D(B,[["__scopeId","data-v-5f344527"]]);export{T as default};
