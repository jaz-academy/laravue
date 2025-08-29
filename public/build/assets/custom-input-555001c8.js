import{_ as I}from"./_plugin-vue_export-helper-c27b6911.js";import{a as p,V as v}from"./VRow-e41a8b34.js";import{V as k}from"./form-333814a1.js";import{V as y}from"./VCheckbox-bdea55d5.js";import{o as l,f as u,e as n,c as x,F as R,i as w,s as f,b as c,y as W,d,A as $,v as V,x as b,z as C,r as g,n as _,aU as h,a0 as D}from"./main-2ca02b3b.js";import{_ as j}from"./CustomRadiosWithImage-cec00255.js";import{_ as S}from"./CustomRadiosWithIcon-b3e09d46.js";import{V as B}from"./VSpacer-a2f5af06.js";import{_ as G}from"./AppCardCode-2a76082b.js";import{_ as F}from"./CustomRadios-74faa009.js";import"./VCheckboxBtn-f6f4a00f.js";import"./VSelectionControl-c0f025b5.js";import"./VInput-9aa25b78.js";import"./VImg-250183fa.js";import"./VRadioGroup-b720a8f0.js";import"./VAvatar-a7deecfc.js";import"./VCard-211b1d9e.js";import"./VCardText-e7df9280.js";import"./VDivider-cc04d089.js";const L=["src"],q={__name:"CustomCheckboxesWithImage",props:{selectedCheckbox:{type:Array,required:!0},checkboxContent:{type:Array,required:!0},gridColumn:{type:null,required:!1}},emits:["update:selectedCheckbox"],setup(i,{emit:a}){const e=i,m=a,t=o=>{typeof o!="boolean"&&m("update:selectedCheckbox",o)};return(o,r)=>e.checkboxContent&&e.selectedCheckbox?(l(),u(v,{key:0},{default:n(()=>[(l(!0),x(R,null,w(e.checkboxContent,s=>(l(),u(p,f({key:s.value,ref_for:!0},i.gridColumn),{default:n(()=>[c(k,{class:W(["custom-input custom-checkbox rounded cursor-pointer w-100",e.selectedCheckbox.includes(s.value)?"active":""])},{default:n(()=>[d("div",null,[c(y,{id:`custom-checkbox-with-img-${s.value}`,"model-value":e.selectedCheckbox,value:s.value,"onUpdate:modelValue":t},null,8,["id","model-value","value"])]),d("img",{src:s.bgImage,alt:"bg-img",class:"custom-checkbox-image"},null,8,L)]),_:2},1032,["class"]),s.label||o.$slots.label?(l(),u(k,{key:0,for:`custom-checkbox-with-img-${s.value}`,class:"cursor-pointer"},{default:n(()=>[$(o.$slots,"label",{label:s.label},()=>[V(b(s.label),1)],!0)]),_:2},1032,["for"])):C("",!0)]),_:2},1040))),128))]),_:3})):C("",!0)}},A=I(q,[["__scopeId","data-v-b71f50b2"]]),E=""+new URL("custom-checkbox-img-1-ad01355a.png",import.meta.url).href,P=""+new URL("custom-checkbox-img-2-2d35a86b.png",import.meta.url).href,T=""+new URL("custom-checkbox-img-3-1a4526bb.png",import.meta.url).href,N={__name:"DemoCustomInputCustomCheckboxesWithImage",setup(i){const a=[{bgImage:E,value:"basic"},{bgImage:P,value:"premium"},{bgImage:T,value:"enterprise"}],e=g(["basic"]);return(m,t)=>{const o=A;return l(),u(o,{"selected-checkbox":_(e),"onUpdate:selectedCheckbox":t[0]||(t[0]=r=>h(e)?e.value=r:null),"checkbox-content":a,"grid-column":{sm:"4",cols:"12"}},null,8,["selected-checkbox"])}}},J=""+new URL("custom-radio-img-1-9fd6addb.png",import.meta.url).href,O=""+new URL("custom-radio-img-2-81c76549.png",import.meta.url).href,H=""+new URL("custom-radio-img-3-9150de6f.png",import.meta.url).href,K={__name:"DemoCustomInputCustomRadiosWithImage",setup(i){const a=[{bgImage:J,value:"basic"},{bgImage:O,value:"premium"},{bgImage:H,value:"enterprise"}],e=g("basic");return(m,t)=>{const o=j;return l(),u(o,{"selected-radio":_(e),"onUpdate:selectedRadio":t[0]||(t[0]=r=>h(e)?e.value=r:null),"radio-content":a,"grid-column":{sm:"4",cols:"12"}},null,8,["selected-radio"])}}};const M={class:"d-flex flex-column align-center text-center gap-2"},Q={class:"cr-title text-base"},X={class:"text-sm clamp-text mb-0"},Y={__name:"CustomCheckboxesWithIcon",props:{selectedCheckbox:{type:Array,required:!0},checkboxContent:{type:Array,required:!0},gridColumn:{type:null,required:!1}},emits:["update:selectedCheckbox"],setup(i,{emit:a}){const e=i,m=a,t=o=>{typeof o!="boolean"&&m("update:selectedCheckbox",o)};return(o,r)=>e.checkboxContent&&e.selectedCheckbox?(l(),u(v,{key:0},{default:n(()=>[(l(!0),x(R,null,w(e.checkboxContent,s=>(l(),u(p,f({key:s.title,ref_for:!0},i.gridColumn),{default:n(()=>[c(k,{class:W(["custom-input custom-checkbox-icon rounded cursor-pointer",e.selectedCheckbox.includes(s.value)?"active":""])},{default:n(()=>[$(o.$slots,"default",{item:s},()=>[d("div",M,[c(D,f({ref_for:!0},s.icon,{class:"text-high-emphasis"}),null,16),d("h6",Q,b(s.title),1),d("p",X,b(s.desc),1)])],!0),d("div",null,[c(y,{"model-value":e.selectedCheckbox,value:s.value,"onUpdate:modelValue":t},null,8,["model-value","value"])])]),_:2},1032,["class"])]),_:2},1040))),128))]),_:3})):C("",!0)}},Z=I(Y,[["__scopeId","data-v-1d35f5c9"]]),ee={__name:"DemoCustomInputCustomCheckboxesWithIcon",setup(i){const a=[{title:"Backup",desc:"Backup every file from your project.",value:"backup",icon:{icon:"tabler-server-2",size:"28"}},{title:"Encrypt",desc:"Translate your data to encrypted text.",value:"encrypt",icon:{icon:"tabler-ban",size:"28"}},{title:"Site Lock",desc:"Security tool to protect your website.",value:"site-lock",icon:{icon:"tabler-lock",size:"28"}}],e=g(["backup"]);return(m,t)=>{const o=Z;return l(),u(o,{"selected-checkbox":_(e),"onUpdate:selectedCheckbox":t[0]||(t[0]=r=>h(e)?e.value=r:null),"checkbox-content":a,"grid-column":{sm:"4",cols:"12"}},null,8,["selected-checkbox"])}}},te={__name:"DemoCustomInputCustomRadiosWithIcon",setup(i){const a=[{title:"Starter",desc:"For freelancers who work with multiple clients",value:"starter",icon:{icon:"tabler-rocket",size:"28"}},{title:"Personal",desc:"Join our talented community of talented digital agencies",value:"personal",icon:{icon:"tabler-star",size:"28"}},{title:"Enterprise",desc:"Team plan for free upto 15 seats",value:"enterprise",icon:{icon:"tabler-crown",size:"28"}}],e=g("starter");return(m,t)=>{const o=S;return l(),u(o,{"selected-radio":_(e),"onUpdate:selectedRadio":t[0]||(t[0]=r=>h(e)?e.value=r:null),"radio-content":a,"grid-column":{sm:"4",cols:"12"}},null,8,["selected-radio"])}}};const oe={class:"flex-grow-1"},se={class:"d-flex align-center mb-1"},ce={class:"cr-title text-base"},ne={key:0,class:"text-disabled text-base"},ae={class:"text-sm mb-0"},le={__name:"CustomCheckboxes",props:{selectedCheckbox:{type:Array,required:!0},checkboxContent:{type:Array,required:!0},gridColumn:{type:null,required:!1}},emits:["update:selectedCheckbox"],setup(i,{emit:a}){const e=i,m=a,t=o=>{typeof o!="boolean"&&m("update:selectedCheckbox",o)};return(o,r)=>e.checkboxContent&&e.selectedCheckbox?(l(),u(v,{key:0},{default:n(()=>[(l(!0),x(R,null,w(e.checkboxContent,s=>(l(),u(p,f({key:s.title,ref_for:!0},i.gridColumn),{default:n(()=>[c(k,{class:W(["custom-input custom-checkbox rounded cursor-pointer",e.selectedCheckbox.includes(s.value)?"active":""])},{default:n(()=>[d("div",null,[c(y,{"model-value":e.selectedCheckbox,value:s.value,"onUpdate:modelValue":t},null,8,["model-value","value"])]),$(o.$slots,"default",{item:s},()=>[d("div",oe,[d("div",se,[d("h6",ce,b(s.title),1),c(B),s.subtitle?(l(),x("span",ne,b(s.subtitle),1)):C("",!0)]),d("p",ae,b(s.desc),1)])],!0)]),_:2},1032,["class"])]),_:2},1040))),128))]),_:3})):C("",!0)}},re=I(le,[["__scopeId","data-v-16abc1f1"]]),ie={__name:"DemoCustomInputCustomCheckboxes",setup(i){const a=[{title:"Discount",subtitle:"20%",desc:"Wow! Get 20% off on your next purchase!",value:"discount"},{title:"Updates",subtitle:"Free",desc:"Get Updates regarding related products.",value:"updates"}],e=g(["discount"]);return(m,t)=>{const o=re;return l(),u(o,{"selected-checkbox":_(e),"onUpdate:selectedCheckbox":t[0]||(t[0]=r=>h(e)?e.value=r:null),"checkbox-content":a,"grid-column":{sm:"6",cols:"12"}},null,8,["selected-checkbox"])}}},ue={__name:"DemoCustomInputCustomRadios",setup(i){const a=[{title:"Basic",subtitle:"Free",desc:"Get 1 project with 1 team member.",value:"basic"},{title:"Premium",subtitle:"$45.80",value:"premium",desc:"Get 5 projects with 5 team members."}],e=g("basic");return(m,t)=>{const o=F;return l(),u(o,{"selected-radio":_(e),"onUpdate:selectedRadio":t[0]||(t[0]=r=>h(e)?e.value=r:null),"radio-content":a,"grid-column":{sm:"6",cols:"12"}},null,8,["selected-radio"])}}},me={ts:`<script setup lang="ts">
import type { CustomInputContent } from '@core/types'

const checkboxContent: CustomInputContent[] = [
  {
    title: 'Discount',
    subtitle: '20%',
    desc: 'Wow! Get 20% off on your next purchase!',
    value: 'discount',
  },
  {
    title: 'Updates',
    subtitle: 'Free',
    desc: 'Get Updates regarding related products.',
    value: 'updates',
  },
]

const selectedCheckbox = ref(['discount'])
<\/script>

<template>
  <CustomCheckboxes
    v-model:selected-checkbox="selectedCheckbox"
    :checkbox-content="checkboxContent"
    :grid-column="{ sm: '6', cols: '12' }"
  />
</template>
`,js:`<script setup>
const checkboxContent = [
  {
    title: 'Discount',
    subtitle: '20%',
    desc: 'Wow! Get 20% off on your next purchase!',
    value: 'discount',
  },
  {
    title: 'Updates',
    subtitle: 'Free',
    desc: 'Get Updates regarding related products.',
    value: 'updates',
  },
]

const selectedCheckbox = ref(['discount'])
<\/script>

<template>
  <CustomCheckboxes
    v-model:selected-checkbox="selectedCheckbox"
    :checkbox-content="checkboxContent"
    :grid-column="{ sm: '6', cols: '12' }"
  />
</template>
`},de={ts:`<script setup lang="ts">
import type { CustomInputContent } from '@core/types'

const checkboxContent: CustomInputContent[] = [
  {
    title: 'Backup',
    desc: 'Backup every file from your project.',
    value: 'backup',
    icon: { icon: 'tabler-server-2', size: '28' },
  },
  {
    title: 'Encrypt',
    desc: 'Translate your data to encrypted text.',
    value: 'encrypt',
    icon: { icon: 'tabler-ban', size: '28' },
  },
  {
    title: 'Site Lock',
    desc: 'Security tool to protect your website.',
    value: 'site-lock',
    icon: { icon: 'tabler-lock', size: '28' },
  },
]

const selectedCheckbox = ref(['backup'])
<\/script>

<template>
  <CustomCheckboxesWithIcon
    v-model:selected-checkbox="selectedCheckbox"
    :checkbox-content="checkboxContent"
    :grid-column="{ sm: '4', cols: '12' }"
  />
</template>
`,js:`<script setup>
const checkboxContent = [
  {
    title: 'Backup',
    desc: 'Backup every file from your project.',
    value: 'backup',
    icon: {
      icon: 'tabler-server-2',
      size: '28',
    },
  },
  {
    title: 'Encrypt',
    desc: 'Translate your data to encrypted text.',
    value: 'encrypt',
    icon: {
      icon: 'tabler-ban',
      size: '28',
    },
  },
  {
    title: 'Site Lock',
    desc: 'Security tool to protect your website.',
    value: 'site-lock',
    icon: {
      icon: 'tabler-lock',
      size: '28',
    },
  },
]

const selectedCheckbox = ref(['backup'])
<\/script>

<template>
  <CustomCheckboxesWithIcon
    v-model:selected-checkbox="selectedCheckbox"
    :checkbox-content="checkboxContent"
    :grid-column="{ sm: '4', cols: '12' }"
  />
</template>
`},pe={ts:`<script setup lang="ts">
import bg1 from '@images/pages/custom-checkbox-img-1.png'
import bg2 from '@images/pages/custom-checkbox-img-2.png'
import bg3 from '@images/pages/custom-checkbox-img-3.png'

const checkboxContent: { bgImage: string; value: string }[] = [
  {
    bgImage: bg1,
    value: 'basic',
  },
  {
    bgImage: bg2,
    value: 'premium',
  },
  {
    bgImage: bg3,
    value: 'enterprise',
  },
]

const selectedCheckbox = ref(['basic'])
<\/script>

<template>
  <CustomCheckboxesWithImage
    v-model:selected-checkbox="selectedCheckbox"
    :checkbox-content="checkboxContent"
    :grid-column="{ sm: '4', cols: '12' }"
  />
</template>
`,js:`<script setup>
import bg1 from '@images/pages/custom-checkbox-img-1.png'
import bg2 from '@images/pages/custom-checkbox-img-2.png'
import bg3 from '@images/pages/custom-checkbox-img-3.png'

const checkboxContent = [
  {
    bgImage: bg1,
    value: 'basic',
  },
  {
    bgImage: bg2,
    value: 'premium',
  },
  {
    bgImage: bg3,
    value: 'enterprise',
  },
]

const selectedCheckbox = ref(['basic'])
<\/script>

<template>
  <CustomCheckboxesWithImage
    v-model:selected-checkbox="selectedCheckbox"
    :checkbox-content="checkboxContent"
    :grid-column="{ sm: '4', cols: '12' }"
  />
</template>
`},be={ts:`<script setup lang="ts">
import type { CustomInputContent } from '@core/types'

const radioContent: CustomInputContent[] = [
  {
    title: 'Basic',
    subtitle: 'Free',
    desc: 'Get 1 project with 1 team member.',
    value: 'basic',
  },
  {
    title: 'Premium',
    subtitle: '$45.80',
    value: 'premium',
    desc: 'Get 5 projects with 5 team members.',
  },
]

const selectedRadio = ref('basic')
<\/script>

<template>
  <CustomRadios
    v-model:selected-radio="selectedRadio"
    :radio-content="radioContent"
    :grid-column="{ sm: '6', cols: '12' }"
  />
</template>
`,js:`<script setup>
const radioContent = [
  {
    title: 'Basic',
    subtitle: 'Free',
    desc: 'Get 1 project with 1 team member.',
    value: 'basic',
  },
  {
    title: 'Premium',
    subtitle: '$45.80',
    value: 'premium',
    desc: 'Get 5 projects with 5 team members.',
  },
]

const selectedRadio = ref('basic')
<\/script>

<template>
  <CustomRadios
    v-model:selected-radio="selectedRadio"
    :radio-content="radioContent"
    :grid-column="{ sm: '6', cols: '12' }"
  />
</template>
`},ge={ts:`<script setup lang="ts">
import type { CustomInputContent } from '@core/types'

const radioContent: CustomInputContent[] = [
  {
    title: 'Starter',
    desc: 'For freelancers who work with multiple clients',
    value: 'starter',
    icon: { icon: 'tabler-rocket', size: '28' },
  },
  {
    title: 'Personal',
    desc: 'Join our talented community of talented digital agencies',
    value: 'personal',
    icon: { icon: 'tabler-star', size: '28' },
  },
  {
    title: 'Enterprise',
    desc: 'Team plan for free upto 15 seats',
    value: 'enterprise',
    icon: { icon: 'tabler-crown', size: '28' },
  },
]

const selectedRadio = ref('starter')
<\/script>

<template>
  <CustomRadiosWithIcon
    v-model:selected-radio="selectedRadio"
    :radio-content="radioContent"
    :grid-column="{ sm: '4', cols: '12' }"
  />
</template>
`,js:`<script setup>
const radioContent = [
  {
    title: 'Starter',
    desc: 'For freelancers who work with multiple clients',
    value: 'starter',
    icon: {
      icon: 'tabler-rocket',
      size: '28',
    },
  },
  {
    title: 'Personal',
    desc: 'Join our talented community of talented digital agencies',
    value: 'personal',
    icon: {
      icon: 'tabler-star',
      size: '28',
    },
  },
  {
    title: 'Enterprise',
    desc: 'Team plan for free upto 15 seats',
    value: 'enterprise',
    icon: {
      icon: 'tabler-crown',
      size: '28',
    },
  },
]

const selectedRadio = ref('starter')
<\/script>

<template>
  <CustomRadiosWithIcon
    v-model:selected-radio="selectedRadio"
    :radio-content="radioContent"
    :grid-column="{ sm: '4', cols: '12' }"
  />
</template>
`},_e={ts:`<script setup lang="ts">
import bg1 from '@images/pages/custom-radio-img-1.png'
import bg2 from '@images/pages/custom-radio-img-2.png'
import bg3 from '@images/pages/custom-radio-img-3.png'

const radioContent: { bgImage: string; value: string }[] = [
  {
    bgImage: bg1,
    value: 'basic',
  },
  {
    bgImage: bg2,
    value: 'premium',
  },
  {
    bgImage: bg3,
    value: 'enterprise',
  },
]

const selectedRadio = ref('basic')
<\/script>

<template>
  <CustomRadiosWithImage
    v-model:selected-radio="selectedRadio"
    :radio-content="radioContent"
    :grid-column="{ sm: '4', cols: '12' }"
  />
</template>
`,js:`<script setup>
import bg1 from '@images/pages/custom-radio-img-1.png'
import bg2 from '@images/pages/custom-radio-img-2.png'
import bg3 from '@images/pages/custom-radio-img-3.png'

const radioContent = [
  {
    bgImage: bg1,
    value: 'basic',
  },
  {
    bgImage: bg2,
    value: 'premium',
  },
  {
    bgImage: bg3,
    value: 'enterprise',
  },
]

const selectedRadio = ref('basic')
<\/script>

<template>
  <CustomRadiosWithImage
    v-model:selected-radio="selectedRadio"
    :radio-content="radioContent"
    :grid-column="{ sm: '4', cols: '12' }"
  />
</template>
`},Ge={__name:"custom-input",setup(i){return(a,e)=>{const m=ue,t=G,o=ie,r=te,s=ee,U=K,z=N;return l(),u(v,null,{default:n(()=>[c(p,{cols:"12",md:"6"},{default:n(()=>[c(t,{title:"Custom Radios",code:be},{default:n(()=>[c(m)]),_:1},8,["code"])]),_:1}),c(p,{cols:"12",md:"6"},{default:n(()=>[c(t,{title:"Custom Checkboxes",code:me},{default:n(()=>[c(o)]),_:1},8,["code"])]),_:1}),c(p,{cols:"12",md:"6"},{default:n(()=>[c(t,{title:"Custom Radios With Icon",code:ge},{default:n(()=>[c(r)]),_:1},8,["code"])]),_:1}),c(p,{cols:"12",md:"6"},{default:n(()=>[c(t,{title:"Custom Checkboxes With Icon",code:de},{default:n(()=>[c(s)]),_:1},8,["code"])]),_:1}),c(p,{cols:"12",md:"6"},{default:n(()=>[c(t,{title:"Custom Radios With Image",code:_e},{default:n(()=>[c(U)]),_:1},8,["code"])]),_:1}),c(p,{cols:"12",md:"6"},{default:n(()=>[c(t,{title:"Custom Checkboxes With Image",code:pe},{default:n(()=>[c(z)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{Ge as default};
