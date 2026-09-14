import{j as a,m as E,n as W,z as $,V as w,a as v,s as L,B as A,l as M,A as x,D as J,E as d}from"./vendor-vuetify-68686ea1.js";import{r as m,k as c,a1 as C,a2 as l,E as e,ad as j,ae as T,X as t,z as p,D as z,l as h,q as o,u as y}from"./vendor-core-cfb14039.js";import{_ as B}from"./AppCombobox-23ede889.js";import{_}from"./_plugin-vue_export-helper-c27b6911.js";import{a as N}from"./avatar-1-fc085ea9.js";import{a as U}from"./avatar-2-025779d2.js";import{a as F}from"./avatar-3-ab7fd1e3.js";import{a as R}from"./avatar-4-dfa0d7b4.js";import{_ as Y}from"./AppCardCode-1f900ff7.js";import"./vendor-charts-7115819c.js";import"./main-03bc2ec2.js";import"./vendor-vueuse-34674e05.js";import"./vendor-pdf-d7f39922.js";const O={__name:"DemoChipExpandable",setup(V){const i=m(!1);return(r,u)=>(c(),C(M,{modelValue:p(i),"onUpdate:modelValue":u[1]||(u[1]=n=>z(i)?i.value=n:null),transition:"scale-transition"},{activator:l(({props:n})=>[e(a,j(T(n)),{default:l(()=>u[2]||(u[2]=[t(" VueJS ")])),_:2},1040)]),default:l(()=>[e(E,null,{default:l(()=>[e(W,null,{append:l(()=>[e($,{class:"ms-3"},{default:l(()=>[e(w,{icon:"",variant:"text",size:"x-small",color:"default",onClick:u[0]||(u[0]=n=>i.value=!1)},{default:l(()=>[e(v,{size:"20",icon:"tabler-x"})]),_:1})]),_:1})]),default:l(()=>[e(L,{class:"mb-2"},{default:l(()=>u[3]||(u[3]=[t(" VueJS ")])),_:1}),e(A,null,{default:l(()=>u[4]||(u[4]=[t("The Progressive JavaScript Framework")])),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]))}},q={__name:"DemoChipInSelects",setup(V){const i=m(["Programming","Playing games","Sleeping"]),r=m(["Streaming","Eating","Programming","Playing games","Sleeping"]);return(u,n)=>{const b=B;return c(),C(b,{modelValue:p(i),"onUpdate:modelValue":n[0]||(n[0]=g=>z(i)?i.value=g:null),chips:"",clearable:"",multiple:"","closable-chips":"","clear-icon":"tabler-circle-x",items:p(r),label:"Your favorite hobbies","prepend-icon":"tabler-filter"},null,8,["modelValue","items"])}}},X={},G={class:"demo-space-x"};function H(V,i){return c(),h("div",G,[e(a,{size:"x-small"},{default:l(()=>i[0]||(i[0]=[t(" x-small chip ")])),_:1}),e(a,{size:"small"},{default:l(()=>i[1]||(i[1]=[t(" small chip ")])),_:1}),e(a,{size:"default"},{default:l(()=>i[2]||(i[2]=[t(" Default ")])),_:1}),e(a,{size:"large"},{default:l(()=>i[3]||(i[3]=[t(" large chip ")])),_:1}),e(a,{size:"x-large"},{default:l(()=>i[4]||(i[4]=[t(" x-large chip ")])),_:1})])}const K=_(X,[["render",H]]),Q={class:"demo-space-x"},Z={__name:"DemoChipWithAvatar",setup(V){return(i,r)=>(c(),h("div",Q,[e(a,{pill:""},{default:l(()=>[e(x,{start:"",image:p(N)},null,8,["image"]),r[0]||(r[0]=o("span",null,"John Doe",-1))]),_:1}),e(a,{pill:""},{default:l(()=>[e(x,{start:"",image:p(U)},null,8,["image"]),r[1]||(r[1]=o("span",null,"Darcy Nooser",-1))]),_:1}),e(a,{pill:""},{default:l(()=>[e(x,{start:"",image:p(F)},null,8,["image"]),r[2]||(r[2]=o("span",null,"Felicia Risker",-1))]),_:1}),e(a,{pill:""},{default:l(()=>[e(x,{start:"",image:p(R)},null,8,["image"]),r[3]||(r[3]=o("span",null,"Minnie Mostly",-1))]),_:1})]))}},ii={},ei={class:"demo-space-x"};function li(V,i){return c(),h("div",ei,[e(a,null,{default:l(()=>[e(v,{start:"",size:"16",icon:"tabler-user"}),i[0]||(i[0]=t(" Account "))]),_:1}),e(a,{color:"primary"},{default:l(()=>[e(v,{start:"",size:"16",icon:"tabler-star"}),i[1]||(i[1]=t(" Premium "))]),_:1}),e(a,{color:"secondary"},{default:l(()=>[e(v,{start:"",size:"16",icon:"tabler-cake"}),i[2]||(i[2]=t(" 1 Year "))]),_:1}),e(a,{color:"success"},{default:l(()=>[e(v,{start:"",size:"16",icon:"tabler-bell"}),i[3]||(i[3]=t(" Notification "))]),_:1}),e(a,{color:"info"},{default:l(()=>[e(v,{start:"",size:"16",icon:"tabler-messages"}),i[4]||(i[4]=t(" Message "))]),_:1}),e(a,{color:"warning"},{default:l(()=>[e(v,{start:"",size:"16",icon:"tabler-alert-triangle"}),i[5]||(i[5]=t(" Warning "))]),_:1}),e(a,{color:"error"},{default:l(()=>[e(v,{start:"",size:"16",icon:"tabler-alert-circle"}),i[6]||(i[6]=t(" Error "))]),_:1})])}const ti=_(ii,[["render",li]]),ai={class:"demo-space-x"},ri={__name:"DemoChipClosable",setup(V){const i=m(!0),r=m(!0),u=m(!0),n=m(!0),b=m(!0),g=m(!0),S=m(!0);return(I,s)=>(c(),h("div",ai,[p(i)?(c(),C(a,{key:0,closable:"","onClick:close":s[0]||(s[0]=f=>i.value=!p(i))},{default:l(()=>s[7]||(s[7]=[t(" Default ")])),_:1})):y("",!0),p(r)?(c(),C(a,{key:1,closable:"",color:"primary","onClick:close":s[1]||(s[1]=f=>r.value=!p(r))},{default:l(()=>s[8]||(s[8]=[t(" Primary ")])),_:1})):y("",!0),p(u)?(c(),C(a,{key:2,closable:"",color:"secondary","onClick:close":s[2]||(s[2]=f=>u.value=!p(u))},{default:l(()=>s[9]||(s[9]=[t(" Secondary ")])),_:1})):y("",!0),p(n)?(c(),C(a,{key:3,closable:"",color:"success","onClick:close":s[3]||(s[3]=f=>n.value=!p(n))},{default:l(()=>s[10]||(s[10]=[t(" Success ")])),_:1})):y("",!0),p(b)?(c(),C(a,{key:4,closable:"",color:"info","onClick:close":s[4]||(s[4]=f=>b.value=!p(b))},{default:l(()=>s[11]||(s[11]=[t(" Info ")])),_:1})):y("",!0),p(g)?(c(),C(a,{key:5,closable:"",color:"warning","onClick:close":s[5]||(s[5]=f=>g.value=!p(g))},{default:l(()=>s[12]||(s[12]=[t(" Warning ")])),_:1})):y("",!0),p(S)?(c(),C(a,{key:6,closable:"",color:"error","onClick:close":s[6]||(s[6]=f=>S.value=!p(S))},{default:l(()=>s[13]||(s[13]=[t(" Error ")])),_:1})):y("",!0)]))}},si={},oi={class:"demo-space-x"};function ni(V,i){return c(),h("div",oi,[e(a,{label:""},{default:l(()=>i[0]||(i[0]=[t(" Default ")])),_:1}),e(a,{label:"",color:"primary"},{default:l(()=>i[1]||(i[1]=[t(" Primary ")])),_:1}),e(a,{label:"",color:"secondary"},{default:l(()=>i[2]||(i[2]=[t(" Secondary ")])),_:1}),e(a,{label:"",color:"success"},{default:l(()=>i[3]||(i[3]=[t(" Success ")])),_:1}),e(a,{label:"",color:"info"},{default:l(()=>i[4]||(i[4]=[t(" Info ")])),_:1}),e(a,{label:"",color:"warning"},{default:l(()=>i[5]||(i[5]=[t(" Warning ")])),_:1}),e(a,{label:"",color:"error"},{default:l(()=>i[6]||(i[6]=[t(" Error ")])),_:1})])}const pi=_(si,[["render",ni]]),ci={},ui={class:"demo-space-x"};function Vi(V,i){return c(),h("div",ui,[e(a,{variant:"outlined"},{default:l(()=>i[0]||(i[0]=[t(" Default ")])),_:1}),e(a,{color:"primary",variant:"outlined"},{default:l(()=>i[1]||(i[1]=[t(" Primary ")])),_:1}),e(a,{color:"secondary",variant:"outlined"},{default:l(()=>i[2]||(i[2]=[t(" Secondary ")])),_:1}),e(a,{color:"success",variant:"outlined"},{default:l(()=>i[3]||(i[3]=[t(" Success ")])),_:1}),e(a,{color:"info",variant:"outlined"},{default:l(()=>i[4]||(i[4]=[t(" Info ")])),_:1}),e(a,{color:"warning",variant:"outlined"},{default:l(()=>i[5]||(i[5]=[t(" Warning ")])),_:1}),e(a,{color:"error",variant:"outlined"},{default:l(()=>i[6]||(i[6]=[t(" Error ")])),_:1})])}const di=_(ci,[["render",Vi]]),mi={},Ci={class:"demo-space-x"};function fi(V,i){return c(),h("div",Ci,[e(a,{variant:"elevated"},{default:l(()=>i[0]||(i[0]=[t(" Default ")])),_:1}),e(a,{color:"primary",variant:"elevated"},{default:l(()=>i[1]||(i[1]=[t(" Primary ")])),_:1}),e(a,{color:"secondary",variant:"elevated"},{default:l(()=>i[2]||(i[2]=[t(" Secondary ")])),_:1}),e(a,{color:"success",variant:"elevated"},{default:l(()=>i[3]||(i[3]=[t(" Success ")])),_:1}),e(a,{color:"info",variant:"elevated"},{default:l(()=>i[4]||(i[4]=[t(" Info ")])),_:1}),e(a,{color:"warning",variant:"elevated"},{default:l(()=>i[5]||(i[5]=[t(" Warning ")])),_:1}),e(a,{color:"error",variant:"elevated"},{default:l(()=>i[6]||(i[6]=[t(" Error ")])),_:1})])}const vi=_(mi,[["render",fi]]),hi={},bi={class:"demo-space-x"};function gi(V,i){return c(),h("div",bi,[e(a,null,{default:l(()=>i[0]||(i[0]=[t(" Default ")])),_:1}),e(a,{color:"primary"},{default:l(()=>i[1]||(i[1]=[t(" Primary ")])),_:1}),e(a,{color:"secondary"},{default:l(()=>i[2]||(i[2]=[t(" Secondary ")])),_:1}),e(a,{color:"success"},{default:l(()=>i[3]||(i[3]=[t(" Success ")])),_:1}),e(a,{color:"info"},{default:l(()=>i[4]||(i[4]=[t(" Info ")])),_:1}),e(a,{color:"warning"},{default:l(()=>i[5]||(i[5]=[t(" Warning ")])),_:1}),e(a,{color:"error"},{default:l(()=>i[6]||(i[6]=[t(" Error ")])),_:1})])}const yi=_(hi,[["render",gi]]),_i={ts:`<script lang="ts" setup>
const isDefaultChipVisible = ref(true)
const isPrimaryChipVisible = ref(true)
const isSecondaryChipVisible = ref(true)
const isSuccessChipVisible = ref(true)
const isInfoChipVisible = ref(true)
const isWarningChipVisible = ref(true)
const isErrorChipVisible = ref(true)
<\/script>

<template>
  <div class="demo-space-x">
    <VChip
      v-if="isDefaultChipVisible"
      closable
      @click:close="isDefaultChipVisible = !isDefaultChipVisible"
    >
      Default
    </VChip>

    <VChip
      v-if="isPrimaryChipVisible"
      closable
      color="primary"
      @click:close="isPrimaryChipVisible = !isPrimaryChipVisible"
    >
      Primary
    </VChip>

    <VChip
      v-if="isSecondaryChipVisible"
      closable
      color="secondary"
      @click:close="isSecondaryChipVisible = !isSecondaryChipVisible"
    >
      Secondary
    </VChip>

    <VChip
      v-if="isSuccessChipVisible"
      closable
      color="success"
      @click:close="isSuccessChipVisible = !isSuccessChipVisible"
    >
      Success
    </VChip>

    <VChip
      v-if="isInfoChipVisible"
      closable
      color="info"
      @click:close="isInfoChipVisible = !isInfoChipVisible"
    >
      Info
    </VChip>

    <VChip
      v-if="isWarningChipVisible"
      closable
      color="warning"
      @click:close="isWarningChipVisible = !isWarningChipVisible"
    >
      Warning
    </VChip>

    <VChip
      v-if="isErrorChipVisible"
      closable
      color="error"
      @click:close="isErrorChipVisible = !isErrorChipVisible"
    >
      Error
    </VChip>
  </div>
</template>
`,js:`<script setup>
const isDefaultChipVisible = ref(true)
const isPrimaryChipVisible = ref(true)
const isSecondaryChipVisible = ref(true)
const isSuccessChipVisible = ref(true)
const isInfoChipVisible = ref(true)
const isWarningChipVisible = ref(true)
const isErrorChipVisible = ref(true)
<\/script>

<template>
  <div class="demo-space-x">
    <VChip
      v-if="isDefaultChipVisible"
      closable
      @click:close="isDefaultChipVisible = !isDefaultChipVisible"
    >
      Default
    </VChip>

    <VChip
      v-if="isPrimaryChipVisible"
      closable
      color="primary"
      @click:close="isPrimaryChipVisible = !isPrimaryChipVisible"
    >
      Primary
    </VChip>

    <VChip
      v-if="isSecondaryChipVisible"
      closable
      color="secondary"
      @click:close="isSecondaryChipVisible = !isSecondaryChipVisible"
    >
      Secondary
    </VChip>

    <VChip
      v-if="isSuccessChipVisible"
      closable
      color="success"
      @click:close="isSuccessChipVisible = !isSuccessChipVisible"
    >
      Success
    </VChip>

    <VChip
      v-if="isInfoChipVisible"
      closable
      color="info"
      @click:close="isInfoChipVisible = !isInfoChipVisible"
    >
      Info
    </VChip>

    <VChip
      v-if="isWarningChipVisible"
      closable
      color="warning"
      @click:close="isWarningChipVisible = !isWarningChipVisible"
    >
      Warning
    </VChip>

    <VChip
      v-if="isErrorChipVisible"
      closable
      color="error"
      @click:close="isErrorChipVisible = !isErrorChipVisible"
    >
      Error
    </VChip>
  </div>
</template>
`},Si={ts:`<template>
  <div class="demo-space-x">
    <VChip>
      Default
    </VChip>

    <VChip color="primary">
      Primary
    </VChip>

    <VChip color="secondary">
      Secondary
    </VChip>

    <VChip color="success">
      Success
    </VChip>

    <VChip color="info">
      Info
    </VChip>

    <VChip color="warning">
      Warning
    </VChip>

    <VChip color="error">
      Error
    </VChip>
  </div>
</template>
`,js:`<template>
  <div class="demo-space-x">
    <VChip>
      Default
    </VChip>

    <VChip color="primary">
      Primary
    </VChip>

    <VChip color="secondary">
      Secondary
    </VChip>

    <VChip color="success">
      Success
    </VChip>

    <VChip color="info">
      Info
    </VChip>

    <VChip color="warning">
      Warning
    </VChip>

    <VChip color="error">
      Error
    </VChip>
  </div>
</template>
`},xi={ts:`<template>
  <div class="demo-space-x">
    <VChip variant="elevated">
      Default
    </VChip>

    <VChip
      color="primary"
      variant="elevated"
    >
      Primary
    </VChip>

    <VChip
      color="secondary"
      variant="elevated"
    >
      Secondary
    </VChip>

    <VChip
      color="success"
      variant="elevated"
    >
      Success
    </VChip>

    <VChip
      color="info"
      variant="elevated"
    >
      Info
    </VChip>

    <VChip
      color="warning"
      variant="elevated"
    >
      Warning
    </VChip>

    <VChip
      color="error"
      variant="elevated"
    >
      Error
    </VChip>
  </div>
</template>
`,js:`<template>
  <div class="demo-space-x">
    <VChip variant="elevated">
      Default
    </VChip>

    <VChip
      color="primary"
      variant="elevated"
    >
      Primary
    </VChip>

    <VChip
      color="secondary"
      variant="elevated"
    >
      Secondary
    </VChip>

    <VChip
      color="success"
      variant="elevated"
    >
      Success
    </VChip>

    <VChip
      color="info"
      variant="elevated"
    >
      Info
    </VChip>

    <VChip
      color="warning"
      variant="elevated"
    >
      Warning
    </VChip>

    <VChip
      color="error"
      variant="elevated"
    >
      Error
    </VChip>
  </div>
</template>
`},Ii={ts:`<script lang="ts" setup>
const isMenuVisible = ref(false)
<\/script>

<template>
  <VMenu
    v-model="isMenuVisible"
    transition="scale-transition"
  >
    <!-- v-menu activator -->
    <template #activator="{ props }">
      <VChip v-bind="props">
        VueJS
      </VChip>
    </template>

    <!-- v-menu list -->
    <VList>
      <VListItem>
        <VListItemTitle class="mb-2">
          VueJS
        </VListItemTitle>
        <VListItemSubtitle>The Progressive JavaScript Framework</VListItemSubtitle>

        <template #append>
          <VListItemAction class="ms-3">
            <VBtn
              icon
              variant="text"
              size="x-small"
              color="default"
              @click="isMenuVisible = false"
            >
              <VIcon
                size="20"
                icon="tabler-x"
              />
            </VBtn>
          </VListItemAction>
        </template>
      </VListItem>
    </VList>
  </VMenu>
</template>
`,js:`<script setup>
const isMenuVisible = ref(false)
<\/script>

<template>
  <VMenu
    v-model="isMenuVisible"
    transition="scale-transition"
  >
    <!-- v-menu activator -->
    <template #activator="{ props }">
      <VChip v-bind="props">
        VueJS
      </VChip>
    </template>

    <!-- v-menu list -->
    <VList>
      <VListItem>
        <VListItemTitle class="mb-2">
          VueJS
        </VListItemTitle>
        <VListItemSubtitle>The Progressive JavaScript Framework</VListItemSubtitle>

        <template #append>
          <VListItemAction class="ms-3">
            <VBtn
              icon
              variant="text"
              size="x-small"
              color="default"
              @click="isMenuVisible = false"
            >
              <VIcon
                size="20"
                icon="tabler-x"
              />
            </VBtn>
          </VListItemAction>
        </template>
      </VListItem>
    </VList>
  </VMenu>
</template>
`},zi={ts:`<script lang="ts" setup>
const chips = ref(['Programming', 'Playing games', 'Sleeping'])
const items = ref(['Streaming', 'Eating', 'Programming', 'Playing games', 'Sleeping'])
<\/script>

<template>
  <AppCombobox
    v-model="chips"
    chips
    clearable
    multiple
    closable-chips
    clear-icon="tabler-circle-x"
    :items="items"
    label="Your favorite hobbies"
    prepend-icon="tabler-filter"
  />
</template>
`,js:`<script setup>
const chips = ref([
  'Programming',
  'Playing games',
  'Sleeping',
])

const items = ref([
  'Streaming',
  'Eating',
  'Programming',
  'Playing games',
  'Sleeping',
])
<\/script>

<template>
  <AppCombobox
    v-model="chips"
    chips
    clearable
    multiple
    closable-chips
    clear-icon="tabler-circle-x"
    :items="items"
    label="Your favorite hobbies"
    prepend-icon="tabler-filter"
  />
</template>
`},Di={ts:`<template>
  <div class="demo-space-x">
    <VChip label>
      Default
    </VChip>

    <VChip
      label
      color="primary"
    >
      Primary
    </VChip>

    <VChip
      label
      color="secondary"
    >
      Secondary
    </VChip>

    <VChip
      label
      color="success"
    >
      Success
    </VChip>

    <VChip
      label
      color="info"
    >
      Info
    </VChip>

    <VChip
      label
      color="warning"
    >
      Warning
    </VChip>

    <VChip
      label
      color="error"
    >
      Error
    </VChip>
  </div>
</template>
`,js:`<template>
  <div class="demo-space-x">
    <VChip label>
      Default
    </VChip>

    <VChip
      label
      color="primary"
    >
      Primary
    </VChip>

    <VChip
      label
      color="secondary"
    >
      Secondary
    </VChip>

    <VChip
      label
      color="success"
    >
      Success
    </VChip>

    <VChip
      label
      color="info"
    >
      Info
    </VChip>

    <VChip
      label
      color="warning"
    >
      Warning
    </VChip>

    <VChip
      label
      color="error"
    >
      Error
    </VChip>
  </div>
</template>
`},ki={ts:`<template>
  <div class="demo-space-x">
    <VChip variant="outlined">
      Default
    </VChip>

    <VChip
      color="primary"
      variant="outlined"
    >
      Primary
    </VChip>

    <VChip
      color="secondary"
      variant="outlined"
    >
      Secondary
    </VChip>

    <VChip
      color="success"
      variant="outlined"
    >
      Success
    </VChip>

    <VChip
      color="info"
      variant="outlined"
    >
      Info
    </VChip>

    <VChip
      color="warning"
      variant="outlined"
    >
      Warning
    </VChip>

    <VChip
      color="error"
      variant="outlined"
    >
      Error
    </VChip>
  </div>
</template>
`,js:`<template>
  <div class="demo-space-x">
    <VChip variant="outlined">
      Default
    </VChip>

    <VChip
      color="primary"
      variant="outlined"
    >
      Primary
    </VChip>

    <VChip
      color="secondary"
      variant="outlined"
    >
      Secondary
    </VChip>

    <VChip
      color="success"
      variant="outlined"
    >
      Success
    </VChip>

    <VChip
      color="info"
      variant="outlined"
    >
      Info
    </VChip>

    <VChip
      color="warning"
      variant="outlined"
    >
      Warning
    </VChip>

    <VChip
      color="error"
      variant="outlined"
    >
      Error
    </VChip>
  </div>
</template>
`},Pi={ts:`<template>
  <div class="demo-space-x">
    <VChip size="x-small">
      x-small chip
    </VChip>

    <VChip size="small">
      small chip
    </VChip>

    <VChip size="default">
      Default
    </VChip>

    <VChip size="large">
      large chip
    </VChip>

    <VChip size="x-large">
      x-large chip
    </VChip>
  </div>
</template>
`,js:`<template>
  <div class="demo-space-x">
    <VChip size="x-small">
      x-small chip
    </VChip>

    <VChip size="small">
      small chip
    </VChip>

    <VChip size="default">
      Default
    </VChip>

    <VChip size="large">
      large chip
    </VChip>

    <VChip size="x-large">
      x-large chip
    </VChip>
  </div>
</template>
`},Ei={ts:`<script setup lang="ts">
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
<\/script>

<template>
  <div class="demo-space-x">
    <VChip pill>
      <VAvatar
        start
        :image="avatar1"
      />
      <span>John Doe</span>
    </VChip>

    <VChip pill>
      <VAvatar
        start
        :image="avatar2"
      />
      <span>Darcy Nooser</span>
    </VChip>

    <VChip pill>
      <VAvatar
        start
        :image="avatar3"
      />
      <span>Felicia Risker</span>
    </VChip>

    <VChip pill>
      <VAvatar
        start
        :image="avatar4"
      />
      <span>Minnie Mostly</span>
    </VChip>
  </div>
</template>
`,js:`<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
<\/script>

<template>
  <div class="demo-space-x">
    <VChip pill>
      <VAvatar
        start
        :image="avatar1"
      />
      <span>John Doe</span>
    </VChip>

    <VChip pill>
      <VAvatar
        start
        :image="avatar2"
      />
      <span>Darcy Nooser</span>
    </VChip>

    <VChip pill>
      <VAvatar
        start
        :image="avatar3"
      />
      <span>Felicia Risker</span>
    </VChip>

    <VChip pill>
      <VAvatar
        start
        :image="avatar4"
      />
      <span>Minnie Mostly</span>
    </VChip>
  </div>
</template>
`},Wi={ts:`<template>
  <div class="demo-space-x">
    <VChip>
      <VIcon
        start
        size="16"
        icon="tabler-user"
      />
      Account
    </VChip>

    <VChip color="primary">
      <VIcon
        start
        size="16"
        icon="tabler-star"
      />
      Premium
    </VChip>

    <VChip color="secondary">
      <VIcon
        start
        size="16"
        icon="tabler-cake"
      />
      1 Year
    </VChip>

    <VChip color="success">
      <VIcon
        start
        size="16"
        icon="tabler-bell"
      />
      Notification
    </VChip>

    <VChip color="info">
      <VIcon
        start
        size="16"
        icon="tabler-messages"
      />
      Message
    </VChip>

    <VChip color="warning">
      <VIcon
        start
        size="16"
        icon="tabler-alert-triangle"
      />
      Warning
    </VChip>

    <VChip color="error">
      <VIcon
        start
        size="16"
        icon="tabler-alert-circle"
      />
      Error
    </VChip>
  </div>
</template>
`,js:`<template>
  <div class="demo-space-x">
    <VChip>
      <VIcon
        start
        size="16"
        icon="tabler-user"
      />
      Account
    </VChip>

    <VChip color="primary">
      <VIcon
        start
        size="16"
        icon="tabler-star"
      />
      Premium
    </VChip>

    <VChip color="secondary">
      <VIcon
        start
        size="16"
        icon="tabler-cake"
      />
      1 Year
    </VChip>

    <VChip color="success">
      <VIcon
        start
        size="16"
        icon="tabler-bell"
      />
      Notification
    </VChip>

    <VChip color="info">
      <VIcon
        start
        size="16"
        icon="tabler-messages"
      />
      Message
    </VChip>

    <VChip color="warning">
      <VIcon
        start
        size="16"
        icon="tabler-alert-triangle"
      />
      Warning
    </VChip>

    <VChip color="error">
      <VIcon
        start
        size="16"
        icon="tabler-alert-circle"
      />
      Error
    </VChip>
  </div>
</template>
`},Yi={__name:"chip",setup(V){return(i,r)=>{const u=yi,n=Y,b=vi,g=di,S=pi,I=ri,s=ti,f=Z,D=K,k=q,P=O;return c(),C(J,{class:"match-height"},{default:l(()=>[e(d,{cols:"12",md:"6"},{default:l(()=>[e(n,{title:"Color",code:Si},{default:l(()=>[r[0]||(r[0]=o("p",null,[t("Use "),o("code",null,"color"),t(" prop to change the background color of chips.")],-1)),e(u)]),_:1},8,["code"])]),_:1}),e(d,{cols:"12",md:"6"},{default:l(()=>[e(n,{title:"Elevated",code:xi},{default:l(()=>[r[1]||(r[1]=o("p",null,[t("Use "),o("code",null,"elevated"),t(" variant option to create filled chips.")],-1)),e(b)]),_:1},8,["code"])]),_:1}),e(d,{cols:"12",md:"6"},{default:l(()=>[e(n,{title:"Outlined",code:ki},{default:l(()=>[r[2]||(r[2]=o("p",null,[t("Use "),o("code",null,"outlined"),t(" variant option to create outline border chips.")],-1)),e(g)]),_:1},8,["code"])]),_:1}),e(d,{cols:"12",md:"6"},{default:l(()=>[e(n,{title:"Label",code:Di},{default:l(()=>[r[3]||(r[3]=o("p",null,[t("Label chips use the "),o("code",null,"v-card"),t(" border-radius. Use "),o("code",null,"label"),t(" prop to create label chips.")],-1)),e(S)]),_:1},8,["code"])]),_:1}),e(d,{cols:"12",md:"6"},{default:l(()=>[e(n,{title:"Closable",code:_i},{default:l(()=>[r[4]||(r[4]=o("p",null,[t("Closable chips can be controlled with a "),o("code",null,"v-model"),t(".")],-1)),e(I)]),_:1},8,["code"])]),_:1}),e(d,{cols:"12",md:"6"},{default:l(()=>[e(n,{title:"With Icon",code:Wi},{default:l(()=>[r[5]||(r[5]=o("p",null,"Chips can use text or any icon available in the Material Icons font library.",-1)),e(s)]),_:1},8,["code"])]),_:1}),e(d,{cols:"12",md:"6"},{default:l(()=>[e(n,{title:"With Avatar",code:Ei},{default:l(()=>[r[6]||(r[6]=o("p",null,[t("Use "),o("code",null,"pill"),t(" prop to remove the "),o("code",null,"v-avatar"),t(" padding.")],-1)),e(f)]),_:1},8,["code"])]),_:1}),e(d,{cols:"12",md:"6"},{default:l(()=>[e(n,{title:"Sizes",code:Pi},{default:l(()=>[r[7]||(r[7]=o("p",null,[t("The "),o("code",null,"v-chip"),t(" component can have various sizes from "),o("code",null,"x-small"),t(" to "),o("code",null,"x-large"),t(".")],-1)),e(D)]),_:1},8,["code"])]),_:1}),e(d,{cols:"12",md:"6"},{default:l(()=>[e(n,{title:"In Selects",code:zi},{default:l(()=>[r[8]||(r[8]=o("p",null,[t("Selects can use "),o("code",null,"chips"),t(" to display the selected data. Try adding your own tags below.")],-1)),e(k)]),_:1},8,["code"])]),_:1}),e(d,{cols:"12",md:"6"},{default:l(()=>[e(n,{title:"Expandable",code:Ii},{default:l(()=>[r[9]||(r[9]=o("p",null,[t("Chips can be combined with "),o("code",null,"v-menu"),t(" to enable a specific set of actions for a chip.")],-1)),e(P)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{Yi as default};
