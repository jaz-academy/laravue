import{o as V,c as v,b as t,e as a,n as r,cU as i,f as w,F as H,i as D,v as s,x as O,r as B,O as I,a0 as f,d as n,ai as _}from"./main-dd895efc.js";import{V as l}from"./VAvatar-c43efe20.js";import{V as m}from"./VImg-0d845f43.js";import{V as o}from"./VBadge-c016d054.js";import{a as k,V as $}from"./VTabs-c2528729.js";import{_ as S}from"./_plugin-vue_export-helper-c27b6911.js";import{_ as W}from"./AppCardCode-cb276543.js";import{V as E}from"./VRow-401a9eed.js";import{V as u}from"./VCol-5badd7d4.js";import"./easing-9f15041e.js";import"./VSlideGroup-7a872b07.js";import"./VCard-521d2f55.js";import"./VCardText-8cb57704.js";import"./VDivider-3f5c8926.js";const C={class:"demo-space-x"},j={__name:"DemoBadgeMaximumValue",setup(p){return(c,e)=>(V(),v("div",C,[t(o,{content:"99",max:"99","offset-x":"5","offset-y":"-1"},{default:a(()=>[t(l,{size:"48"},{default:a(()=>[t(m,{src:r(i)},null,8,["src"])]),_:1})]),_:1}),t(o,{content:"100",max:"99","offset-x":"5","offset-y":"-1"},{default:a(()=>[t(l,{size:"48"},{default:a(()=>[t(m,{src:r(i)},null,8,["src"])]),_:1})]),_:1}),t(o,{content:"1000",max:"999","offset-x":"5","offset-y":"-1"},{default:a(()=>[t(l,{size:"48"},{default:a(()=>[t(m,{src:r(i)},null,8,["src"])]),_:1})]),_:1})]))}},N={__name:"DemoBadgeTabs",setup(p){const c=[{badge:"3",content:"Item One"},{badge:"1",content:"Item Two"},{badge:"2",content:"Item Three"}];return(e,g)=>(V(),w($,{grow:""},{default:a(()=>[(V(),v(H,null,D(c,d=>t(k,{key:d.content,value:d.content},{default:a(()=>[t(o,{content:d.badge,"offset-x":-18,"offset-y":6},{default:a(()=>[s(O(d.content),1)]),_:2},1032,["content"])]),_:2},1032,["value"])),64))]),_:1}))}},M={class:"demo-space-x"},Y={__name:"DemoBadgeShowOnHover",setup(p){const c=B(),e=B(),g=B(),d=I(e),b=I(c),x=I(g);return(z,A)=>(V(),v("div",M,[t(o,{content:"3",transition:"slide-x-transition","model-value":r(d)},{default:a(()=>[t(f,{ref_key:"tRefTwitterBadge",ref:e,size:"25",icon:"tabler-brand-twitter"},null,512)]),_:1},8,["model-value"]),t(o,{content:"5",transition:"scale-transition","model-value":r(b)},{default:a(()=>[t(f,{ref_key:"tRefInstagramBadge",ref:c,size:"25",icon:"tabler-brand-instagram"},null,512)]),_:1},8,["model-value"]),t(o,{content:"1",transition:"slide-x-transition","model-value":r(x)},{default:a(()=>[t(f,{ref_key:"tRefWhatsappBadge",ref:g,size:"25",icon:"tabler-brand-whatsapp"},null,512)]),_:1},8,["model-value"])]))}},P={class:"d-flex align-center"},U={class:"demo-space-x"},F={__name:"DemoBadgeDynamicNotifications",setup(p){const c=B();return(e,g)=>(V(),v("div",P,[t(o,{content:r(c),"model-value":!!r(c),color:"success",class:"me-5"},{default:a(()=>[t(f,{size:"40",icon:"tabler-brand-vue"})]),_:1},8,["content","model-value"]),n("div",U,[t(_,{onClick:g[0]||(g[0]=d=>c.value=(r(c)||0)+1)},{default:a(()=>g[2]||(g[2]=[s(" Send Message ")])),_:1}),t(_,{color:"error",onClick:g[1]||(g[1]=d=>c.value=0)},{default:a(()=>g[3]||(g[3]=[s(" Clear Notifications ")])),_:1})])]))}},L={class:"demo-space-x"},q={__name:"DemoBadgeAvatarStatus",setup(p){return(c,e)=>(V(),v("div",L,[t(o,{dot:"",bordered:"",color:"success",location:"bottom end","offset-x":5,"offset-y":1},{default:a(()=>[t(l,{size:"large"},{default:a(()=>[t(m,{src:r(i)},null,8,["src"])]),_:1})]),_:1}),t(o,{dot:"",bordered:"",color:"warning",location:"bottom end","offset-x":5,"offset-y":1},{default:a(()=>[t(l,{size:"large"},{default:a(()=>[t(m,{src:r(i)},null,8,["src"])]),_:1})]),_:1}),t(o,{dot:"",bordered:"",color:"error",location:"bottom end","offset-x":5,"offset-y":1},{default:a(()=>[t(l,{size:"large"},{default:a(()=>[t(m,{src:r(i)},null,8,["src"])]),_:1})]),_:1})]))}},G={class:"demo-space-x"},J={__name:"DemoBadgeIcon",setup(p){return(c,e)=>(V(),v("div",G,[t(o,null,{badge:a(()=>[t(f,{icon:"tabler-bulb"})]),default:a(()=>[t(l,null,{default:a(()=>[t(m,{src:r(i)},null,8,["src"])]),_:1})]),_:1}),t(o,{icon:"tabler-lock-open"},{default:a(()=>[t(l,null,{default:a(()=>[t(m,{src:r(i)},null,8,["src"])]),_:1})]),_:1})]))}},K={class:"demo-space-x"},Q={__name:"DemoBadgePosition",setup(p){return(c,e)=>(V(),v("div",K,[t(o,{content:"1",location:"end top"},{default:a(()=>[t(l,{size:"48"},{default:a(()=>[t(m,{src:r(i)},null,8,["src"])]),_:1})]),_:1}),t(o,{location:"bottom start",content:"2"},{default:a(()=>[t(l,{size:"48"},{default:a(()=>[t(m,{src:r(i)},null,8,["src"])]),_:1})]),_:1}),t(o,{location:"bottom end",content:"3"},{default:a(()=>[t(l,{size:"48"},{default:a(()=>[t(m,{src:r(i)},null,8,["src"])]),_:1})]),_:1}),t(o,{location:"top start",content:"4"},{default:a(()=>[t(l,{size:"48"},{default:a(()=>[t(m,{src:r(i)},null,8,["src"])]),_:1})]),_:1})]))}},X={},Z={class:"demo-space-x"};function tt(p,c){return V(),v("div",Z,[t(o,{dot:"",color:"primary"},{default:a(()=>[t(f,{size:"25",icon:"tabler-brand-instagram"})]),_:1}),t(o,{dot:"",color:"secondary"},{default:a(()=>[t(f,{size:"25",icon:"tabler-brand-instagram"})]),_:1}),t(o,{dot:"",color:"success"},{default:a(()=>[t(f,{size:"25",icon:"tabler-brand-instagram"})]),_:1}),t(o,{dot:"",color:"info"},{default:a(()=>[t(f,{size:"25",icon:"tabler-brand-instagram"})]),_:1}),t(o,{dot:"",color:"warning"},{default:a(()=>[t(f,{size:"25",icon:"tabler-brand-instagram"})]),_:1}),t(o,{dot:"",color:"error"},{default:a(()=>[t(f,{size:"25",icon:"tabler-brand-instagram"})]),_:1})])}const at=S(X,[["render",tt]]),et={class:"demo-space-x d-flex align-center flex-wrap"},ot={__name:"DemoBadgeStyle",setup(p){return(c,e)=>(V(),v("div",et,[t(o,{content:"1"},{default:a(()=>[t(_,{variant:"tonal"},{default:a(()=>e[0]||(e[0]=[s(" Default ")])),_:1})]),_:1}),t(o,{content:"5",bordered:""},{default:a(()=>[t(_,{variant:"tonal"},{default:a(()=>e[1]||(e[1]=[s(" Border ")])),_:1})]),_:1}),t(o,{dot:"",location:"bottom end","offset-x":"3","offset-y":"3"},{default:a(()=>[t(l,{size:"48"},{default:a(()=>[t(m,{src:r(i)},null,8,["src"])]),_:1})]),_:1}),t(o,{inline:"",content:"5"},{default:a(()=>[t(l,{size:"48"},{default:a(()=>[t(m,{src:r(i)},null,8,["src"])]),_:1})]),_:1}),t(o,{rounded:"sm",content:"5"},{default:a(()=>[t(l,{size:"48"},{default:a(()=>[t(m,{src:r(i)},null,8,["src"])]),_:1})]),_:1})]))}},nt={ts:`<script setup lang="ts">
import avatar1 from '@images/avatars/avatar-1.png'
<\/script>

<template>
  <div class="demo-space-x">
    <VBadge
      dot
      bordered
      color="success"
      location="bottom end"
      :offset-x="5"
      :offset-y="1"
    >
      <VAvatar size="large">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <VBadge
      dot
      bordered
      color="warning"
      location="bottom end"
      :offset-x="5"
      :offset-y="1"
    >
      <VAvatar size="large">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <VBadge
      dot
      bordered
      color="error"
      location="bottom end"
      :offset-x="5"
      :offset-y="1"
    >
      <VAvatar size="large">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>
  </div>
</template>
`,js:`<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
<\/script>

<template>
  <div class="demo-space-x">
    <VBadge
      dot
      bordered
      color="success"
      location="bottom end"
      :offset-x="5"
      :offset-y="1"
    >
      <VAvatar size="large">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <VBadge
      dot
      bordered
      color="warning"
      location="bottom end"
      :offset-x="5"
      :offset-y="1"
    >
      <VAvatar size="large">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <VBadge
      dot
      bordered
      color="error"
      location="bottom end"
      :offset-x="5"
      :offset-y="1"
    >
      <VAvatar size="large">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>
  </div>
</template>
`},st={ts:`<template>
  <div class="demo-space-x">
    <VBadge
      dot
      color="primary"
    >
      <VIcon
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>

    <VBadge
      dot
      color="secondary"
    >
      <VIcon
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>

    <VBadge
      dot
      color="success"
    >
      <VIcon
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>

    <VBadge
      dot
      color="info"
    >
      <VIcon
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>

    <VBadge
      dot
      color="warning"
    >
      <VIcon
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>

    <VBadge
      dot
      color="error"
    >
      <VIcon
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>
  </div>
</template>
`,js:`<template>
  <div class="demo-space-x">
    <VBadge
      dot
      color="primary"
    >
      <VIcon
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>

    <VBadge
      dot
      color="secondary"
    >
      <VIcon
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>

    <VBadge
      dot
      color="success"
    >
      <VIcon
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>

    <VBadge
      dot
      color="info"
    >
      <VIcon
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>

    <VBadge
      dot
      color="warning"
    >
      <VIcon
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>

    <VBadge
      dot
      color="error"
    >
      <VIcon
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>
  </div>
</template>
`},rt={ts:`<script lang="ts" setup>
const notifications = ref<number>()
<\/script>

<template>
  <div class="d-flex align-center">
    <VBadge
      :content="notifications"
      :model-value="!!notifications"
      color="success"
      class="me-5"
    >
      <VIcon
        size="40"
        icon="tabler-brand-vue"
      />
    </VBadge>

    <div class="demo-space-x">
      <VBtn @click="notifications = (notifications || 0) + 1">
        Send Message
      </VBtn>

      <VBtn
        color="error"
        @click="notifications = 0"
      >
        Clear Notifications
      </VBtn>
    </div>
  </div>
</template>
`,js:`<script setup>
const notifications = ref()
<\/script>

<template>
  <div class="d-flex align-center">
    <VBadge
      :content="notifications"
      :model-value="!!notifications"
      color="success"
      class="me-5"
    >
      <VIcon
        size="40"
        icon="tabler-brand-vue"
      />
    </VBadge>

    <div class="demo-space-x">
      <VBtn @click="notifications = (notifications || 0) + 1">
        Send Message
      </VBtn>

      <VBtn
        color="error"
        @click="notifications = 0"
      >
        Clear Notifications
      </VBtn>
    </div>
  </div>
</template>
`},dt={ts:`<script setup lang="ts">
import avatar1 from '@images/avatars/avatar-1.png'
<\/script>

<template>
  <div class="demo-space-x">
    <!-- avatar -->
    <VBadge>
      <template #badge>
        <VIcon icon="tabler-bulb" />
      </template>

      <VAvatar>
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <!-- icon -->
    <VBadge icon="tabler-lock-open">
      <VAvatar>
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>
  </div>
</template>
`,js:`<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
<\/script>

<template>
  <div class="demo-space-x">
    <!-- avatar -->
    <VBadge>
      <template #badge>
        <VIcon icon="tabler-bulb" />
      </template>

      <VAvatar>
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <!-- icon -->
    <VBadge icon="tabler-lock-open">
      <VAvatar>
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>
  </div>
</template>
`},ct={ts:`<script setup lang="ts">
import avatar1 from '@images/avatars/avatar-1.png'
<\/script>

<template>
  <div class="demo-space-x">
    <VBadge
      content="99"
      max="99"
      offset-x="5"
      offset-y="-1"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <VBadge
      content="100"
      max="99"
      offset-x="5"
      offset-y="-1"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <VBadge
      content="1000"
      max="999"
      offset-x="5"
      offset-y="-1"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>
  </div>
</template>
`,js:`<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
<\/script>

<template>
  <div class="demo-space-x">
    <VBadge
      content="99"
      max="99"
      offset-x="5"
      offset-y="-1"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <VBadge
      content="100"
      max="99"
      offset-x="5"
      offset-y="-1"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <VBadge
      content="1000"
      max="999"
      offset-x="5"
      offset-y="-1"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>
  </div>
</template>
`},it={ts:`<script setup lang="ts">
import avatar1 from '@images/avatars/avatar-1.png'
<\/script>

<template>
  <div class="demo-space-x">
    <!-- 👉 Top End -->
    <VBadge
      content="1"
      location="end top"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <!-- 👉 Bottom Start -->
    <VBadge
      location="bottom start"
      content="2"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <!-- 👉 Bottom End -->
    <VBadge
      location="bottom end"
      content="3"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <!-- 👉 top Start -->
    <VBadge
      location="top start"
      content="4"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>
  </div>
</template>
`,js:`<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
<\/script>

<template>
  <div class="demo-space-x">
    <!-- 👉 Top End -->
    <VBadge
      content="1"
      location="end top"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <!-- 👉 Bottom Start -->
    <VBadge
      location="bottom start"
      content="2"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <!-- 👉 Bottom End -->
    <VBadge
      location="bottom end"
      content="3"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <!-- 👉 top Start -->
    <VBadge
      location="top start"
      content="4"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>
  </div>
</template>
`},lt={ts:`<script lang="ts" setup>
const tRefInstagramBadge = ref()
const tRefTwitterBadge = ref()
const tRefWhatsappBadge = ref()

const showTwitterBadgeOnHover = useElementHover(tRefTwitterBadge)
const showInstagramBadgeOnHover = useElementHover(tRefInstagramBadge)
const showWhatsappBadgeOnHover = useElementHover(tRefWhatsappBadge)
<\/script>

<template>
  <div class="demo-space-x">
    <VBadge
      content="3"
      transition="slide-x-transition"
      :model-value="showTwitterBadgeOnHover"
    >
      <VIcon
        ref="tRefTwitterBadge"
        size="25"
        icon="tabler-brand-twitter"
      />
    </VBadge>

    <VBadge
      content="5"
      transition="scale-transition"
      :model-value="showInstagramBadgeOnHover"
    >
      <VIcon
        ref="tRefInstagramBadge"
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>

    <VBadge
      content="1"
      transition="slide-x-transition"
      :model-value="showWhatsappBadgeOnHover"
    >
      <VIcon
        ref="tRefWhatsappBadge"
        size="25"
        icon="tabler-brand-whatsapp"
      />
    </VBadge>
  </div>
</template>
`,js:`<script setup>
const tRefInstagramBadge = ref()
const tRefTwitterBadge = ref()
const tRefWhatsappBadge = ref()
const showTwitterBadgeOnHover = useElementHover(tRefTwitterBadge)
const showInstagramBadgeOnHover = useElementHover(tRefInstagramBadge)
const showWhatsappBadgeOnHover = useElementHover(tRefWhatsappBadge)
<\/script>

<template>
  <div class="demo-space-x">
    <VBadge
      content="3"
      transition="slide-x-transition"
      :model-value="showTwitterBadgeOnHover"
    >
      <VIcon
        ref="tRefTwitterBadge"
        size="25"
        icon="tabler-brand-twitter"
      />
    </VBadge>

    <VBadge
      content="5"
      transition="scale-transition"
      :model-value="showInstagramBadgeOnHover"
    >
      <VIcon
        ref="tRefInstagramBadge"
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>

    <VBadge
      content="1"
      transition="slide-x-transition"
      :model-value="showWhatsappBadgeOnHover"
    >
      <VIcon
        ref="tRefWhatsappBadge"
        size="25"
        icon="tabler-brand-whatsapp"
      />
    </VBadge>
  </div>
</template>
`},mt={ts:`<script setup lang="ts">
import avatar1 from '@images/avatars/avatar-1.png'
<\/script>

<template>
  <div class="demo-space-x d-flex align-center flex-wrap">
    <!-- default -->
    <VBadge content="1">
      <VBtn variant="tonal">
        Default
      </VBtn>
    </VBadge>

    <!-- bordered -->
    <VBadge
      content="5"
      bordered
    >
      <VBtn variant="tonal">
        Border
      </VBtn>
    </VBadge>

    <!-- dot -->
    <VBadge
      dot
      location="bottom end"
      offset-x="3"
      offset-y="3"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <!-- inline -->
    <VBadge
      inline
      content="5"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <!-- Rounded -->
    <VBadge
      rounded="sm"
      content="5"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>
  </div>
</template>
`,js:`<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
<\/script>

<template>
  <div class="demo-space-x d-flex align-center flex-wrap">
    <!-- default -->
    <VBadge content="1">
      <VBtn variant="tonal">
        Default
      </VBtn>
    </VBadge>

    <!-- bordered -->
    <VBadge
      content="5"
      bordered
    >
      <VBtn variant="tonal">
        Border
      </VBtn>
    </VBadge>

    <!-- dot -->
    <VBadge
      dot
      location="bottom end"
      offset-x="3"
      offset-y="3"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <!-- inline -->
    <VBadge
      inline
      content="5"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <!-- Rounded -->
    <VBadge
      rounded="sm"
      content="5"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>
  </div>
</template>
`},gt={ts:`<script setup lang="ts">
const tabs = [
  {
    badge: '3',
    content: 'Item One',
  },
  {
    badge: '1',
    content: 'Item Two',
  },
  {
    badge: '2',
    content: 'Item Three',
  },
]
<\/script>

<template>
  <VTabs grow>
    <VTab
      v-for="tab in tabs"
      :key="tab.content"
      :value="tab.content"
    >
      <VBadge
        :content="tab.badge"
        :offset-x="-18"
        :offset-y="6"
      >
        {{ tab.content }}
      </VBadge>
    </VTab>
  </VTabs>
</template>
`,js:`<script setup>
const tabs = [
  {
    badge: '3',
    content: 'Item One',
  },
  {
    badge: '1',
    content: 'Item Two',
  },
  {
    badge: '2',
    content: 'Item Three',
  },
]
<\/script>

<template>
  <VTabs grow>
    <VTab
      v-for="tab in tabs"
      :key="tab.content"
      :value="tab.content"
    >
      <VBadge
        :content="tab.badge"
        :offset-x="-18"
        :offset-y="6"
      >
        {{ tab.content }}
      </VBadge>
    </VTab>
  </VTabs>
</template>
`},ht={__name:"badge",setup(p){return(c,e)=>{const g=ot,d=W,b=at,x=Q,z=J,A=q,y=F,h=Y,T=N,R=j;return V(),w(E,{class:"match-height"},{default:a(()=>[t(u,{cols:"12",md:"6"},{default:a(()=>[t(d,{title:"Style",code:mt},{default:a(()=>[e[0]||(e[0]=n("p",null,[s("You can use various props like "),n("code",null,"bordered"),s(", "),n("code",null,"dot"),s(", "),n("code",null,"inline"),s(", "),n("code",null,"rounded"),s(" etc. to style the badge.")],-1)),t(g)]),_:1},8,["code"])]),_:1}),t(u,{cols:"12",md:"6"},{default:a(()=>[t(d,{title:"Color",code:st},{default:a(()=>[e[1]||(e[1]=n("p",null,[s("Use "),n("code",null,"color"),s(" prop to create various background badges.")],-1)),t(b)]),_:1},8,["code"])]),_:1}),t(u,{cols:"12",md:"6"},{default:a(()=>[t(d,{title:"Position",code:it},{default:a(()=>[e[2]||(e[2]=n("p",null,[s("You can use "),n("code",null,"location"),s(" prop to change the position of the badge. Possible values are "),n("code",null,"top-end"),s(", "),n("code",null,"bottom-end"),s(", "),n("code",null,"bottom-start"),s(", "),n("code",null,"top-start"),s(".")],-1)),t(x)]),_:1},8,["code"])]),_:1}),t(u,{cols:"12",md:"6"},{default:a(()=>[t(d,{title:"Icon",code:dt},{default:a(()=>[e[3]||(e[3]=n("p",null,[s("You can use "),n("code",null,"icon"),s(" prop or use "),n("code",null,"slot"),s(" to render the icon")],-1)),t(z)]),_:1},8,["code"])]),_:1}),t(u,{cols:"12",md:"6"},{default:a(()=>[t(d,{title:"Avatar Status",code:nt},{default:a(()=>[e[4]||(e[4]=n("p",null,"You can use badge with avatar as status.",-1)),t(A)]),_:1},8,["code"])]),_:1}),t(u,{cols:"12",md:"6"},{default:a(()=>[t(d,{title:"Dynamic notifications",code:rt},{default:a(()=>[e[5]||(e[5]=n("p",null,"You can incorporate badges with dynamic content to make things such as a notification system.",-1)),t(y)]),_:1},8,["code"])]),_:1}),t(u,{cols:"12",md:"6"},{default:a(()=>[t(d,{title:"Show on hover",code:lt},{default:a(()=>[e[6]||(e[6]=n("p",null,"You can do many things with visibility control, for example, show badge on hover.",-1)),t(h)]),_:1},8,["code"])]),_:1}),t(u,{cols:"12",md:"6"},{default:a(()=>[t(d,{title:"Tabs",code:gt},{default:a(()=>[e[7]||(e[7]=n("p",null,"Badges help convey information to the user in a variety of ways.",-1)),t(T)]),_:1},8,["code"])]),_:1}),t(u,{cols:"12",md:"6"},{default:a(()=>[t(d,{title:"Maximum Value",code:ct},{default:a(()=>[e[8]||(e[8]=n("p",null,[s("Use "),n("code",null,"max"),s(" prop to cap the value of the badge content")],-1)),t(R)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{ht as default};
