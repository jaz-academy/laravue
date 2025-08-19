import{r as f,o as c,f as _,e as o,b as e,a1 as $,s as U,n as m,aV as u,_ as v,c as V,d as a,x as S,F as x,i as j,v as i}from"./main-b871c247.js";import{V as r}from"./VRating-f48d1eb6.js";import{V as k}from"./VSlider-cddc61b6.js";import{_ as F}from"./AppCardCode-32f36ed7.js";import{V as I,a as p}from"./VRow-6fcd1b0a.js";import"./VSliderTrack-1f76299e.js";import"./VInput-8e497f2d.js";import"./form-7cc48b0d.js";import"./VImg-8fc3d1b5.js";import"./VCard-b2c7daaa.js";import"./VAvatar-8e3ed6ed.js";import"./VCardText-de098736.js";import"./VDivider-adb1395f.js";const B={__name:"DemoRatingItemSlot",setup(d){const t=f(4.5);return(n,s)=>(c(),_(r,{modelValue:m(t),"onUpdate:modelValue":s[0]||(s[0]=l=>u(t)?t.value=l:null)},{item:o(l=>[e($,U(l,{size:25,color:l.isFilled?"success":"secondary",class:"me-3",icon:l.isFilled?"tabler-mood-smile-beam":"tabler-mood-sad"}),null,16,["color","icon"])]),_:1},8,["modelValue"]))}},T={__name:"DemoRatingIncremented",setup(d){const t=f(4.5);return(n,s)=>(c(),_(r,{modelValue:m(t),"onUpdate:modelValue":s[0]||(s[0]=l=>u(t)?t.value=l:null),"half-increments":"",hover:""},null,8,["modelValue"]))}},L={};function M(d,t){return c(),_(r,{hover:""})}const N=v(L,[["render",M]]),H={};function P(d,t){return c(),_(r,{readonly:"","model-value":4})}const A=v(H,[["render",P]]),E={};function q(d,t){return c(),_(r,{clearable:""})}const G=v(E,[["render",q]]),J={class:"font-weight-medium mb-0"},K={__name:"DemoRatingLength",setup(d){const t=f(5),n=f(2);return(s,l)=>(c(),V(x,null,[l[2]||(l[2]=a("div",{class:"text-caption"}," Custom length ",-1)),e(k,{modelValue:m(t),"onUpdate:modelValue":l[0]||(l[0]=g=>u(t)?t.value=g:null),min:1,max:7},null,8,["modelValue"]),e(r,{modelValue:m(n),"onUpdate:modelValue":l[1]||(l[1]=g=>u(n)?n.value=g:null),length:m(t)},null,8,["modelValue","length"]),a("p",J," Model: "+S(m(n)),1)],64))}},O={class:"d-flex flex-column"},Q={__name:"DemoRatingSize",setup(d){const t=f(4);return(n,s)=>(c(),V("div",O,[e(r,{modelValue:m(t),"onUpdate:modelValue":s[0]||(s[0]=l=>u(t)?t.value=l:null),size:"x-small"},null,8,["modelValue"]),e(r,{modelValue:m(t),"onUpdate:modelValue":s[1]||(s[1]=l=>u(t)?t.value=l:null),size:"small"},null,8,["modelValue"]),e(r,{modelValue:m(t),"onUpdate:modelValue":s[2]||(s[2]=l=>u(t)?t.value=l:null)},null,8,["modelValue"]),e(r,{modelValue:m(t),"onUpdate:modelValue":s[3]||(s[3]=l=>u(t)?t.value=l:null),size:"large"},null,8,["modelValue"]),e(r,{modelValue:m(t),"onUpdate:modelValue":s[4]||(s[4]=l=>u(t)?t.value=l:null),size:"x-large"},null,8,["modelValue"])]))}},W={class:"d-flex flex-column"},X={__name:"DemoRatingColors",setup(d){const t=f(4),n=["primary","secondary","success","info","warning","error"];return(s,l)=>(c(),V("div",W,[(c(),V(x,null,j(n,g=>e(r,{key:g,modelValue:m(t),"onUpdate:modelValue":l[0]||(l[0]=R=>u(t)?t.value=R:null),color:g},null,8,["modelValue","color"])),64))]))}},Y={};function Z(d,t){return c(),_(r,{density:"compact"})}const ee=v(Y,[["render",Z]]),te={};function le(d,t){return c(),_(r)}const ne=v(te,[["render",le]]),oe={ts:`<template>
  <VRating />
</template>
`,js:`<template>
  <VRating />
</template>
`},ae={ts:`<template>
  <VRating clearable />
</template>
`,js:`<template>
  <VRating clearable />
</template>
`},se={ts:`<script lang="ts" setup>
const rating = ref(4)
const ratingColors = ['primary', 'secondary', 'success', 'info', 'warning', 'error']
<\/script>

<template>
  <div class="d-flex flex-column">
    <VRating
      v-for="color in ratingColors"
      :key="color"
      v-model="rating"
      :color="color"
    />
  </div>
</template>
`,js:`<script setup>
const rating = ref(4)

const ratingColors = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'error',
]
<\/script>

<template>
  <div class="d-flex flex-column">
    <VRating
      v-for="color in ratingColors"
      :key="color"
      v-model="rating"
      :color="color"
    />
  </div>
</template>
`},ie={ts:`<template>
  <VRating density="compact" />
</template>
`,js:`<template>
  <VRating density="compact" />
</template>
`},re={ts:`<template>
  <VRating hover />
</template>
`,js:`<template>
  <VRating hover />
</template>
`},me={ts:`<script lang="ts" setup>
const rating = ref(4.5)
<\/script>

<template>
  <VRating
    v-model="rating"
    half-increments
    hover
  />
</template>
`,js:`<script setup>
const rating = ref(4.5)
<\/script>

<template>
  <VRating
    v-model="rating"
    half-increments
    hover
  />
</template>
`},ce={ts:`<script lang="ts" setup>
const rating = ref(4.5)
<\/script>

<template>
  <VRating v-model="rating">
    <template #item="props">
      <VIcon
        v-bind="props"
        :size="25"
        :color="props.isFilled ? 'success' : 'secondary'"
        class="me-3"
        :icon="props.isFilled ? 'tabler-mood-smile-beam' : 'tabler-mood-sad'"
      />
    </template>
  </VRating>
</template>
`,js:`<script setup>
const rating = ref(4.5)
<\/script>

<template>
  <VRating v-model="rating">
    <template #item="props">
      <VIcon
        v-bind="props"
        :size="25"
        :color="props.isFilled ? 'success' : 'secondary'"
        class="me-3"
        :icon="props.isFilled ? 'tabler-mood-smile-beam' : 'tabler-mood-sad'"
      />
    </template>
  </VRating>
</template>
`},de={ts:`<script lang="ts" setup>
const length = ref(5)
const rating = ref(2)
<\/script>

<template>
  <div class="text-caption">
    Custom length
  </div>

  <VSlider
    v-model="length"
    :min="1"
    :max="7"
  />

  <VRating
    v-model="rating"
    :length="length"
  />
  <p class="font-weight-medium mb-0">
    Model: {{ rating }}
  </p>
</template>
`,js:`<script setup>
const length = ref(5)
const rating = ref(2)
<\/script>

<template>
  <div class="text-caption">
    Custom length
  </div>

  <VSlider
    v-model="length"
    :min="1"
    :max="7"
  />

  <VRating
    v-model="rating"
    :length="length"
  />
  <p class="font-weight-medium mb-0">
    Model: {{ rating }}
  </p>
</template>
`},pe={ts:`<template>
  <VRating
    readonly
    :model-value="4"
  />
</template>
`,js:`<template>
  <VRating
    readonly
    :model-value="4"
  />
</template>
`},ue={ts:`<script lang="ts" setup>
const rating = ref(4)
<\/script>

<template>
  <div class="d-flex flex-column">
    <VRating
      v-model="rating"
      size="x-small"
    />

    <VRating
      v-model="rating"
      size="small"
    />

    <VRating v-model="rating" />

    <VRating
      v-model="rating"
      size="large"
    />

    <VRating
      v-model="rating"
      size="x-large"
    />
  </div>
</template>
`,js:`<script setup>
const rating = ref(4)
<\/script>

<template>
  <div class="d-flex flex-column">
    <VRating
      v-model="rating"
      size="x-small"
    />

    <VRating
      v-model="rating"
      size="small"
    />

    <VRating v-model="rating" />

    <VRating
      v-model="rating"
      size="large"
    />

    <VRating
      v-model="rating"
      size="x-large"
    />
  </div>
</template>
`},De={__name:"rating",setup(d){return(t,n)=>{const s=ne,l=F,g=ee,R=X,y=Q,b=K,h=G,z=A,C=N,w=T,D=B;return c(),_(I,{class:"match-height"},{default:o(()=>[e(p,{cols:"12",md:"6"},{default:o(()=>[e(l,{title:"Basic",code:oe},{default:o(()=>[n[0]||(n[0]=a("p",null,[i("The "),a("code",null,"v-rating"),i(" component provides a simple interface for gathering user feedback.")],-1)),e(s)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:o(()=>[e(l,{title:"Density",code:ie},{default:o(()=>[n[1]||(n[1]=a("p",null,[i("Control the space occupied by "),a("code",null,"v-rating"),i(" items using the "),a("code",null,"density"),i(" prop.")],-1)),e(g)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:o(()=>[e(l,{title:"Colors",code:se},{default:o(()=>[n[2]||(n[2]=a("p",null,[i("The "),a("code",null,"v-rating"),i(" component can be colored as you want, you can set both selected and not selected colors.")],-1)),e(R)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:o(()=>[e(l,{title:"Size",code:ue},{default:o(()=>[n[3]||(n[3]=a("p",null,[i("Utilize the same sizing classes available in "),a("code",null,"v-icon"),i(" or provide your own with the "),a("code",null,"size"),i(" prop.")],-1)),e(y)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:o(()=>[e(l,{title:"Length",code:de},{default:o(()=>[n[4]||(n[4]=a("p",null,[i("Change the number of items by modifying the the "),a("code",null,"length"),i(" prop.")],-1)),e(b)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:o(()=>[e(l,{title:"Clearable",code:ae},{default:o(()=>[n[5]||(n[5]=a("p",null,[i("Use "),a("code",null,"clearable"),i(" prop to allows for the component to be cleared. Triggers when the icon containing the current value is clicked.")],-1)),e(h)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:o(()=>[e(l,{title:"Readonly",code:pe},{default:o(()=>[n[6]||(n[6]=a("p",null,[i("For ratings that are not meant to be changed you can use "),a("code",null,"readonly"),i(" prop.")],-1)),e(z)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:o(()=>[e(l,{title:"Hover",code:re},{default:o(()=>[n[7]||(n[7]=a("p",null,"Provides visual feedback when hovering over icons",-1)),e(C)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:o(()=>[e(l,{title:"Incremented",code:me},{default:o(()=>[n[8]||(n[8]=a("p",null,[i("The "),a("code",null,"half-increments"),i(" prop increases the granularity of the ratings, allow for .5 values as well.")],-1)),e(w)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:o(()=>[e(l,{title:"Item slot",code:ce},{default:o(()=>[n[9]||(n[9]=a("p",null,"Slots enable advanced customization possibilities and provide you with more freedom in how you display the rating.",-1)),e(D)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{De as default};
