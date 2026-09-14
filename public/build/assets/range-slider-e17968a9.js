import{aA as p,a as R,D as h,E as c}from"./vendor-vuetify-68686ea1.js";import{r as m,k as i,a1 as d,z as V,D as _,a2 as r,E as s,q as o,X as n}from"./vendor-core-cfb14039.js";import{_ as k}from"./AppCardCode-1f900ff7.js";import"./vendor-charts-7115819c.js";import"./main-03bc2ec2.js";import"./vendor-vueuse-34674e05.js";import"./vendor-pdf-d7f39922.js";const D={__name:"DemoRangeSliderVertical",setup(u){const e=m([20,40]);return(t,l)=>(i(),d(p,{modelValue:V(e),"onUpdate:modelValue":l[0]||(l[0]=a=>_(e)?e.value=a:null),direction:"vertical"},null,8,["modelValue"]))}},w={__name:"DemoRangeSliderThumbLabel",setup(u){const e=["Winter","Spring","Summer","Fall"],t=["tabler-snowflake","tabler-leaf","tabler-flame","tabler-droplet"],l=m([1,2]);return(a,b)=>(i(),d(p,{modelValue:V(l),"onUpdate:modelValue":b[0]||(b[0]=f=>_(l)?l.value=f:null),tick:e,min:"0",max:"3",step:1,"show-ticks":"always","thumb-label":"","tick-size":"4"},{"thumb-label":r(({modelValue:f})=>[s(R,{icon:t[f]},null,8,["icon"])]),_:1},8,["modelValue"]))}},x={__name:"DemoRangeSliderStep",setup(u){const e=m([20,40]);return(t,l)=>(i(),d(p,{modelValue:V(e),"onUpdate:modelValue":l[0]||(l[0]=a=>_(e)?e.value=a:null),step:"10"},null,8,["modelValue"]))}},y={__name:"DemoRangeSliderColor",setup(u){const e=m([10,60]);return(t,l)=>(i(),d(p,{modelValue:V(e),"onUpdate:modelValue":l[0]||(l[0]=a=>_(e)?e.value=a:null),color:"success","track-color":"warning"},null,8,["modelValue"]))}},U={__name:"DemoRangeSliderDisabled",setup(u){const e=m([30,60]);return(t,l)=>(i(),d(p,{modelValue:V(e),"onUpdate:modelValue":l[0]||(l[0]=a=>_(e)?e.value=a:null),disabled:"",label:"Disabled"},null,8,["modelValue"]))}},j={__name:"DemoRangeSliderBasic",setup(u){const e=m([10,60]);return(t,l)=>(i(),d(p,{modelValue:V(e),"onUpdate:modelValue":l[0]||(l[0]=a=>_(e)?e.value=a:null)},null,8,["modelValue"]))}},C={ts:`<script setup lang="ts">
const sliderValues = ref([10, 60])
<\/script>

<template>
  <VRangeSlider v-model="sliderValues" />
</template>
`,js:`<script setup>
const sliderValues = ref([
  10,
  60,
])
<\/script>

<template>
  <VRangeSlider v-model="sliderValues" />
</template>
`},$={ts:`<script lang="ts" setup>
const sliderValues = ref([10, 60])
<\/script>

<template>
  <VRangeSlider
    v-model="sliderValues"
    color="success"
    track-color="warning"
  />
</template>
`,js:`<script setup>
const sliderValues = ref([
  10,
  60,
])
<\/script>

<template>
  <VRangeSlider
    v-model="sliderValues"
    color="success"
    track-color="warning"
  />
</template>
`},z={ts:`<script lang="ts" setup>
const slidersValues = ref([30, 60])
<\/script>

<template>
  <VRangeSlider
    v-model="slidersValues"
    disabled
    label="Disabled"
  />
</template>
`,js:`<script setup>
const slidersValues = ref([
  30,
  60,
])
<\/script>

<template>
  <VRangeSlider
    v-model="slidersValues"
    disabled
    label="Disabled"
  />
</template>
`},B={ts:`<script lang="ts" setup>
const sliderValues = ref([20, 40])
<\/script>

<template>
  <VRangeSlider
    v-model="sliderValues"
    step="10"
  />
</template>
`,js:`<script setup>
const sliderValues = ref([
  20,
  40,
])
<\/script>

<template>
  <VRangeSlider
    v-model="sliderValues"
    step="10"
  />
</template>
`},T={ts:`<script lang="ts" setup>
const seasons = ['Winter', 'Spring', 'Summer', 'Fall']
const icons = ['tabler-snowflake', 'tabler-leaf', 'tabler-flame', 'tabler-droplet']
const sliderValues = ref([1, 2])
<\/script>

<template>
  <VRangeSlider
    v-model="sliderValues"
    :tick="seasons"
    min="0"
    max="3"
    :step="1"
    show-ticks="always"
    thumb-label
    tick-size="4"
  >
    <template #thumb-label="{ modelValue }">
      <VIcon :icon="icons[modelValue]" />
    </template>
  </VRangeSlider>
</template>
`,js:`<script setup>
const seasons = [
  'Winter',
  'Spring',
  'Summer',
  'Fall',
]

const icons = [
  'tabler-snowflake',
  'tabler-leaf',
  'tabler-flame',
  'tabler-droplet',
]

const sliderValues = ref([
  1,
  2,
])
<\/script>

<template>
  <VRangeSlider
    v-model="sliderValues"
    :tick="seasons"
    min="0"
    max="3"
    :step="1"
    show-ticks="always"
    thumb-label
    tick-size="4"
  >
    <template #thumb-label="{ modelValue }">
      <VIcon :icon="icons[modelValue]" />
    </template>
  </VRangeSlider>
</template>
`},I={ts:`<script lang="ts" setup>
const sliderValues = ref([20, 40])
<\/script>

<template>
  <VRangeSlider
    v-model="sliderValues"
    direction="vertical"
  />
</template>
`,js:`<script setup>
const sliderValues = ref([
  20,
  40,
])
<\/script>

<template>
  <VRangeSlider
    v-model="sliderValues"
    direction="vertical"
  />
</template>
`},q={__name:"range-slider",setup(u){return(e,t)=>{const l=j,a=k,b=U,f=y,g=x,S=w,v=D;return i(),d(h,null,{default:r(()=>[s(c,{cols:"12",md:"6"},{default:r(()=>[s(a,{title:"Basic",code:C},{default:r(()=>[t[0]||(t[0]=o("p",null,[n("The "),o("code",null,"v-slider"),n(" component is a better visualization of the number input.")],-1)),s(l)]),_:1},8,["code"])]),_:1}),s(c,{cols:"12",md:"6"},{default:r(()=>[s(a,{title:"Disabled",code:z},{default:r(()=>[t[1]||(t[1]=o("p",null,[n("You cannot interact with "),o("code",null,"disabled"),n(" sliders.")],-1)),s(b)]),_:1},8,["code"])]),_:1}),s(c,{cols:"12",md:"6"},{default:r(()=>[s(a,{title:"Color",code:$},{default:r(()=>[t[2]||(t[2]=o("p",null,[n("Use "),o("code",null,"color"),n(" prop to the sets the slider color. "),o("code",null,"track-color"),n(" prop to sets the color of slider's unfilled track.")],-1)),s(f)]),_:1},8,["code"])]),_:1}),s(c,{cols:"12",md:"6"},{default:r(()=>[s(a,{title:"Step",code:B},{default:r(()=>[t[3]||(t[3]=o("p",null,[o("code",null,"v-range-slider"),n(" can have steps other than 1. This can be helpful for some applications where you need to adjust values with more or less accuracy.")],-1)),s(g)]),_:1},8,["code"])]),_:1}),s(c,{cols:"12",md:"6"},{default:r(()=>[s(a,{title:"Thumb label",code:T},{default:r(()=>[t[4]||(t[4]=o("p",null,[n(" Using the "),o("code",null,"tick-labels"),n(" prop along with the "),o("code",null,"thumb-label"),n(" slot, you can create a very customized solution. ")],-1)),s(S)]),_:1},8,["code"])]),_:1}),s(c,{cols:"12",md:"6"},{default:r(()=>[s(a,{title:"Vertical",code:I},{default:r(()=>[t[5]||(t[5]=o("p",null,[n("You can use the "),o("code",null,"vertical"),n(" prop to switch sliders to a vertical orientation. If you need to change the height of the slider, use css.")],-1)),s(v)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{q as default};
