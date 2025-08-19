import{o as c,c as V,b as o,e as n,v as a,aj as e,n as m,df as b,a1 as T,s as f,d as l,_ as u,r as S,f as B}from"./main-b871c247.js";import{V as p}from"./VTooltip-33e7a5fa.js";import{V as H}from"./VImg-8fc3d1b5.js";import{V as D}from"./VAvatar-8e3ed6ed.js";import{_ as k}from"./AppCardCode-32f36ed7.js";import{V as $,a as v}from"./VRow-6fcd1b0a.js";import"./VOverlay-6dc4db6e.js";import"./easing-9f15041e.js";import"./lazy-b1156225.js";import"./scopeId-bd2d2045.js";import"./forwardRefs-8348545e.js";import"./VCard-b2c7daaa.js";import"./VCardText-de098736.js";import"./VDivider-adb1395f.js";const E={class:"demo-space-x"},I={__name:"DemoTooltipTooltipOnVariousElements",setup(d){return(t,i)=>(c(),V("div",E,[o(e,null,{default:n(()=>[i[1]||(i[1]=a(" Button ")),o(p,{location:"top",activator:"parent"},{default:n(()=>i[0]||(i[0]=[a(" Tooltip ")])),_:1})]),_:1}),o(D,{color:"info"},{default:n(()=>[o(H,{src:m(b)},null,8,["src"]),o(p,{location:"top",activator:"parent"},{default:n(()=>i[2]||(i[2]=[a(" Tooltip on Avatar ")])),_:1})]),_:1}),o(p,{location:"top"},{activator:n(({props:r})=>[o(T,f(r,{size:"30",icon:"tabler-user"}),null,16)]),default:n(()=>[i[3]||(i[3]=l("span",null,"Tooltip on Icon",-1))]),_:1})]))}},A={},j={class:"demo-space-x"};function w(d,t){return c(),V("div",j,[o(e,null,{default:n(()=>[t[1]||(t[1]=a(" scale transition ")),o(p,{location:"top",transition:"scale-transition",activator:"parent"},{default:n(()=>t[0]||(t[0]=[l("span",null,"Scale Transition",-1)])),_:1})]),_:1}),o(e,null,{default:n(()=>[t[3]||(t[3]=a(" scroll X transition ")),o(p,{location:"top",activator:"parent",transition:"scroll-x-transition"},{default:n(()=>t[2]||(t[2]=[l("span",null,"Scroll X Transition",-1)])),_:1})]),_:1}),o(e,null,{default:n(()=>[t[5]||(t[5]=a(" scroll y transition ")),o(p,{location:"top",activator:"parent",transition:"scroll-y-transition"},{default:n(()=>t[4]||(t[4]=[l("span",null,"Scroll Y Transition",-1)])),_:1})]),_:1})])}const F=u(A,[["render",w]]),X={class:"demo-space-x"},C={__name:"DemoTooltipVModelSupport",setup(d){const t=S(!1);return(i,r)=>(c(),V("div",X,[o(e,{onClick:r[0]||(r[0]=s=>t.value=!m(t))},{default:n(()=>r[1]||(r[1]=[a(" toggle tooltip ")])),_:1}),o(p,{"model-value":m(t),location:"top"},{activator:n(({props:s})=>[o(T,f(s,{icon:"tabler-brand-instagram"}),null,16)]),default:n(()=>[r[2]||(r[2]=l("span",null,"Programmatic tooltip",-1))]),_:1},8,["model-value"])]))}},M={};function P(d,t){return c(),B(e,{variant:"outlined"},{default:n(()=>[t[1]||(t[1]=l("span",null,"Open Delay On Hover",-1)),t[2]||(t[2]=a()),o(p,{"open-delay":"500",location:"top",activator:"parent"},{default:n(()=>t[0]||(t[0]=[l("span",null,"Open Delay On Hover",-1)])),_:1})]),_:1})}const z=u(M,[["render",P]]),N={},Y={class:"demo-space-x"};function L(d,t){return c(),V("div",Y,[o(e,{variant:"outlined"},{default:n(()=>[t[1]||(t[1]=l("span",null,"Open On Hover",-1)),o(p,{activator:"parent",location:"top"},{default:n(()=>t[0]||(t[0]=[a(" Open On Hover ")])),_:1})]),_:1}),o(e,{variant:"outlined",color:"primary"},{default:n(()=>[t[3]||(t[3]=l("span",null,"Open On click",-1)),o(p,{"open-on-click":"","open-on-hover":!1,location:"top",activator:"parent"},{default:n(()=>t[2]||(t[2]=[a(" Open On click ")])),_:1})]),_:1}),o(e,{variant:"outlined"},{default:n(()=>[t[5]||(t[5]=l("span",null,"Open On Hover + Focus",-1)),o(p,{"open-on-focus":"",location:"top",activator:"parent"},{default:n(()=>t[4]||(t[4]=[a(" Open On Hover + Focus ")])),_:1})]),_:1})])}const U=u(N,[["render",L]]),R={},q={class:"demo-space-x"};function G(d,t){return c(),V("div",q,[o(e,{variant:"tonal"},{default:n(()=>[t[1]||(t[1]=a(" Tooltip on End ")),o(p,{activator:"parent",location:"end"},{default:n(()=>t[0]||(t[0]=[a(" End Tooltip ")])),_:1})]),_:1}),o(e,{variant:"tonal"},{default:n(()=>[t[3]||(t[3]=a(" Tooltip on Start ")),o(p,{activator:"parent",location:"start"},{default:n(()=>t[2]||(t[2]=[a(" Start Tooltip ")])),_:1})]),_:1}),o(e,{variant:"tonal"},{default:n(()=>[t[5]||(t[5]=a(" Tooltip on Top ")),o(p,{activator:"parent",location:"top"},{default:n(()=>t[4]||(t[4]=[a(" Top Tooltip ")])),_:1})]),_:1}),o(e,{variant:"tonal"},{default:n(()=>[t[7]||(t[7]=a(" Tooltip on Bottom ")),o(p,{activator:"parent",location:"bottom"},{default:n(()=>t[6]||(t[6]=[a(" Bottom Tooltip ")])),_:1})]),_:1})])}const J=u(R,[["render",G]]),K={ts:`<template>
  <!-- Delay on open -->
  <VBtn variant="outlined">
    <span>Open Delay On Hover</span> <VTooltip
      open-delay="500"
      location="top"
      activator="parent"
    >
      <span>Open Delay On Hover</span>
    </VTooltip>
  </VBtn>
</template>
`,js:`<template>
  <!-- Delay on open -->
  <VBtn variant="outlined">
    <span>Open Delay On Hover</span> <VTooltip
      open-delay="500"
      location="top"
      activator="parent"
    >
      <span>Open Delay On Hover</span>
    </VTooltip>
  </VBtn>
</template>
`},Q={ts:`<template>
  <div class="demo-space-x">
    <!-- open on hover -->
    <VBtn variant="outlined">
      <span>Open On Hover</span>
      <VTooltip
        activator="parent"
        location="top"
      >
        Open On Hover
      </VTooltip>
    </VBtn>

    <!-- open on click -->
    <VBtn
      variant="outlined"
      color="primary"
    >
      <span>Open On click</span>

      <VTooltip
        open-on-click
        :open-on-hover="false"
        location="top"
        activator="parent"
      >
        Open On click
      </VTooltip>
    </VBtn>

    <!-- open on focus -->
    <VBtn variant="outlined">
      <span>Open On Hover + Focus</span>
      <VTooltip
        open-on-focus
        location="top"
        activator="parent"
      >
        Open On Hover + Focus
      </VTooltip>
    </VBtn>
  </div>
</template>
`,js:`<template>
  <div class="demo-space-x">
    <!-- open on hover -->
    <VBtn variant="outlined">
      <span>Open On Hover</span>
      <VTooltip
        activator="parent"
        location="top"
      >
        Open On Hover
      </VTooltip>
    </VBtn>

    <!-- open on click -->
    <VBtn
      variant="outlined"
      color="primary"
    >
      <span>Open On click</span>

      <VTooltip
        open-on-click
        :open-on-hover="false"
        location="top"
        activator="parent"
      >
        Open On click
      </VTooltip>
    </VBtn>

    <!-- open on focus -->
    <VBtn variant="outlined">
      <span>Open On Hover + Focus</span>
      <VTooltip
        open-on-focus
        location="top"
        activator="parent"
      >
        Open On Hover + Focus
      </VTooltip>
    </VBtn>
  </div>
</template>
`},W={ts:`<template>
  <div class="demo-space-x">
    <VBtn variant="tonal">
      Tooltip on End
      <VTooltip
        activator="parent"
        location="end"
      >
        End Tooltip
      </VTooltip>
    </VBtn>

    <VBtn variant="tonal">
      Tooltip on Start
      <VTooltip
        activator="parent"
        location="start"
      >
        Start Tooltip
      </VTooltip>
    </VBtn>

    <VBtn variant="tonal">
      Tooltip on Top
      <VTooltip
        activator="parent"
        location="top"
      >
        Top Tooltip
      </VTooltip>
    </VBtn>

    <VBtn variant="tonal">
      Tooltip on Bottom
      <VTooltip
        activator="parent"
        location="bottom"
      >
        Bottom Tooltip
      </VTooltip>
    </VBtn>
  </div>
</template>
`,js:`<template>
  <div class="demo-space-x">
    <VBtn variant="tonal">
      Tooltip on End
      <VTooltip
        activator="parent"
        location="end"
      >
        End Tooltip
      </VTooltip>
    </VBtn>

    <VBtn variant="tonal">
      Tooltip on Start
      <VTooltip
        activator="parent"
        location="start"
      >
        Start Tooltip
      </VTooltip>
    </VBtn>

    <VBtn variant="tonal">
      Tooltip on Top
      <VTooltip
        activator="parent"
        location="top"
      >
        Top Tooltip
      </VTooltip>
    </VBtn>

    <VBtn variant="tonal">
      Tooltip on Bottom
      <VTooltip
        activator="parent"
        location="bottom"
      >
        Bottom Tooltip
      </VTooltip>
    </VBtn>
  </div>
</template>
`},Z={ts:`<script setup lang="ts">
import avatar4 from '@images/avatars/avatar-4.png'
<\/script>

<template>
  <div class="demo-space-x">
    <VBtn>
      Button
      <VTooltip
        location="top"
        activator="parent"
      >
        Tooltip
      </VTooltip>
    </VBtn>

    <VAvatar color="info">
      <VImg :src="avatar4" />
      <VTooltip
        location="top"
        activator="parent"
      >
        Tooltip on Avatar
      </VTooltip>
    </VAvatar>

    <VTooltip location="top">
      <template #activator="{ props }">
        <VIcon
          v-bind="props"
          size="30"
          icon="tabler-user"
        />
      </template>
      <span>Tooltip on Icon</span>
    </VTooltip>
  </div>
</template>
`,js:`<script setup>
import avatar4 from '@images/avatars/avatar-4.png'
<\/script>

<template>
  <div class="demo-space-x">
    <VBtn>
      Button
      <VTooltip
        location="top"
        activator="parent"
      >
        Tooltip
      </VTooltip>
    </VBtn>

    <VAvatar color="info">
      <VImg :src="avatar4" />
      <VTooltip
        location="top"
        activator="parent"
      >
        Tooltip on Avatar
      </VTooltip>
    </VAvatar>

    <VTooltip location="top">
      <template #activator="{ props }">
        <VIcon
          v-bind="props"
          size="30"
          icon="tabler-user"
        />
      </template>
      <span>Tooltip on Icon</span>
    </VTooltip>
  </div>
</template>
`},h={ts:`<template>
  <div class="demo-space-x">
    <!-- Scale transition -->
    <VBtn>
      scale transition
      <VTooltip
        location="top"
        transition="scale-transition"
        activator="parent"
      >
        <span>Scale Transition</span>
      </VTooltip>
    </VBtn>

    <!-- Scroll x transition -->
    <VBtn>
      scroll X transition
      <VTooltip
        location="top"
        activator="parent"
        transition="scroll-x-transition"
      >
        <span>Scroll X Transition</span>
      </VTooltip>
    </VBtn>

    <!-- Scroll y transition -->
    <VBtn>
      scroll y transition
      <VTooltip
        location="top"
        activator="parent"
        transition="scroll-y-transition"
      >
        <span>Scroll Y Transition</span>
      </VTooltip>
    </VBtn>
  </div>
</template>
`,js:`<template>
  <div class="demo-space-x">
    <!-- Scale transition -->
    <VBtn>
      scale transition
      <VTooltip
        location="top"
        transition="scale-transition"
        activator="parent"
      >
        <span>Scale Transition</span>
      </VTooltip>
    </VBtn>

    <!-- Scroll x transition -->
    <VBtn>
      scroll X transition
      <VTooltip
        location="top"
        activator="parent"
        transition="scroll-x-transition"
      >
        <span>Scroll X Transition</span>
      </VTooltip>
    </VBtn>

    <!-- Scroll y transition -->
    <VBtn>
      scroll y transition
      <VTooltip
        location="top"
        activator="parent"
        transition="scroll-y-transition"
      >
        <span>Scroll Y Transition</span>
      </VTooltip>
    </VBtn>
  </div>
</template>
`},tt={ts:`<script lang="ts" setup>
const isTooltipVisible = ref(false)
<\/script>

<template>
  <div class="demo-space-x">
    <VBtn @click="isTooltipVisible = !isTooltipVisible">
      toggle tooltip
    </VBtn>

    <VTooltip
      :model-value="isTooltipVisible"
      location="top"
    >
      <template #activator="{ props }">
        <VIcon
          v-bind="props"
          icon="tabler-brand-instagram"
        />
      </template>
      <span>Programmatic tooltip</span>
    </VTooltip>
  </div>
</template>
`,js:`<script setup>
const isTooltipVisible = ref(false)
<\/script>

<template>
  <div class="demo-space-x">
    <VBtn @click="isTooltipVisible = !isTooltipVisible">
      toggle tooltip
    </VBtn>

    <VTooltip
      :model-value="isTooltipVisible"
      location="top"
    >
      <template #activator="{ props }">
        <VIcon
          v-bind="props"
          icon="tabler-brand-instagram"
        />
      </template>
      <span>Programmatic tooltip</span>
    </VTooltip>
  </div>
</template>
`},mt={__name:"tooltip",setup(d){return(t,i)=>{const r=J,s=k,_=U,O=z,x=C,y=F,g=I;return c(),B($,null,{default:n(()=>[o(v,{cols:"12"},{default:n(()=>[o(s,{title:"Location",code:W},{default:n(()=>[i[0]||(i[0]=l("p",null,[a("Use the "),l("code",null,"location"),a(" prop to specify on which side of the element the tooltip should show")],-1)),o(r)]),_:1},8,["code"])]),_:1}),o(v,{cols:"12"},{default:n(()=>[o(s,{title:"Events",code:Q},{default:n(()=>[o(_)]),_:1},8,["code"])]),_:1}),o(v,{cols:"12"},{default:n(()=>[o(s,{title:"Delay On Hover",code:K},{default:n(()=>[i[1]||(i[1]=l("p",null,[a("Delay (in ms) after which tooltip opens (when "),l("code",null,"open-on-hover"),a(" prop is set to true)")],-1)),o(O)]),_:1},8,["code"])]),_:1}),o(v,{cols:"12"},{default:n(()=>[o(s,{title:"V-Model Support",code:tt},{default:n(()=>[i[2]||(i[2]=l("p",null,[a("Tooltip visibility can be programmatically changed using "),l("code",null,"v-model"),a(".")],-1)),o(x)]),_:1},8,["code"])]),_:1}),o(v,{cols:"12"},{default:n(()=>[o(s,{title:"Transition",code:h},{default:n(()=>[i[3]||(i[3]=l("p",null,[a("Use "),l("code",null,"transition"),a(" prop to sets the component transition.")],-1)),o(y)]),_:1},8,["code"])]),_:1}),o(v,{cols:"12"},{default:n(()=>[o(s,{title:"Tooltip on Various Elements",code:Z},{default:n(()=>[i[4]||(i[4]=l("p",null,"Tooltips can wrap any element.",-1)),o(g)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{mt as default};
