import{_ as x,V as C}from"./AppCombobox-9449356c.js";import{r as c,o as b,f as V,n,aU as r,w as _,aY as h,e as s,b as m,v as a,d as i,x as P}from"./main-2161dd16.js";import{a as D,b as I}from"./VList-1c9f4772.js";import{V as d}from"./VCol-b6fcabf3.js";import{V as y}from"./VRow-cdbc520d.js";import{_ as w}from"./AppCardCode-1612e0cc.js";import"./form-2a954a63.js";import"./VSelect-3578ba37.js";import"./VTextField-26cefffb.js";/* empty css                   */import"./VCounter-3b8f1b94.js";import"./VImg-4ff19814.js";import"./VField-1461cc01.js";import"./easing-9f15041e.js";import"./VInput-1e0d7c59.js";import"./forwardRefs-8348545e.js";import"./dialog-transition-d45d256d.js";import"./VMenu-3fd806c1.js";import"./VOverlay-f2354874.js";import"./lazy-ac5cead8.js";import"./scopeId-56a18a60.js";import"./VCheckboxBtn-2e361082.js";import"./VSelectionControl-b935b5f8.js";import"./VChip-e9cc1678.js";import"./VAvatar-b27cc665.js";import"./filter-f609f4be.js";import"./ssrBoot-ee409192.js";import"./VDivider-d54b4fba.js";import"./VCard-79d2de72.js";import"./VCardText-285783bc.js";const A={__name:"DemoComboboxClearable",setup(g){const e=c(["Vuetify","Programming"]),l=["Programming","Design","Vue","Vuetify"];return(p,o)=>{const t=x;return b(),V(t,{modelValue:n(e),"onUpdate:modelValue":o[0]||(o[0]=u=>r(e)?e.value=u:null),items:l,label:"Combobox",multiple:"",placeholder:"deployment",clearable:""},null,8,["modelValue"])}}},L={__name:"DemoComboboxNoDataWithChips",setup(g){const e=["Gaming","Programming","Vue","Vuetify"],l=c(["Vuetify"]),p=c(null);return _(l,o=>{o.length>5&&h(()=>l.value.pop())}),(o,t)=>{const u=x;return b(),V(u,{modelValue:n(l),"onUpdate:modelValue":t[0]||(t[0]=f=>r(l)?l.value=f:null),"search-input":n(p),"onUpdate:searchInput":t[1]||(t[1]=f=>r(p)?p.value=f:null),items:e,"hide-selected":"","hide-no-data":!1,placeholder:"deployment",hint:"Maximum of 5 tags",label:"Add some tags",multiple:"","persistent-hint":""},{"no-data":s(()=>[m(D,null,{default:s(()=>[m(I,null,{default:s(()=>[t[2]||(t[2]=a(' No results matching "')),i("strong",null,P(n(p)),1),t[3]||(t[3]=a('". Press ')),t[4]||(t[4]=i("kbd",null,"enter",-1)),t[5]||(t[5]=a(" to create a new one "))]),_:1})]),_:1})]),_:1},8,["modelValue","search-input"])}}},U={__name:"DemoComboboxVariant",setup(g){const e=c(["Programming"]),l=["Programming","Design","Vue","Vuetify"];return(p,o)=>(b(),V(y,null,{default:s(()=>[m(d,{cols:"12"},{default:s(()=>[m(C,{modelValue:n(e),"onUpdate:modelValue":o[0]||(o[0]=t=>r(e)?e.value=t:null),items:l,multiple:"",placeholder:"deployment",variant:"solo",label:"solo"},null,8,["modelValue"])]),_:1}),m(d,{cols:"12"},{default:s(()=>[m(C,{modelValue:n(e),"onUpdate:modelValue":o[1]||(o[1]=t=>r(e)?e.value=t:null),multiple:"",items:l,placeholder:"deployment",variant:"outlined",label:"Outlined"},null,8,["modelValue"])]),_:1}),m(d,{cols:"12"},{default:s(()=>[m(C,{modelValue:n(e),"onUpdate:modelValue":o[2]||(o[2]=t=>r(e)?e.value=t:null),multiple:"",items:l,placeholder:"deployment",variant:"underlined",label:"Underlined"},null,8,["modelValue"])]),_:1}),m(d,{cols:"12"},{default:s(()=>[m(C,{modelValue:n(e),"onUpdate:modelValue":o[3]||(o[3]=t=>r(e)?e.value=t:null),multiple:"",items:l,placeholder:"deployment",variant:"filled",label:"Filled"},null,8,["modelValue"])]),_:1}),m(d,{cols:"12"},{default:s(()=>[m(C,{modelValue:n(e),"onUpdate:modelValue":o[4]||(o[4]=t=>r(e)?e.value=t:null),multiple:"",items:l,variant:"plain",placeholder:"deployment",label:"Plain"},null,8,["modelValue"])]),_:1})]),_:1}))}},k={__name:"DemoComboboxDensity",setup(g){const e=c(["Vuetify","Programming"]),l=["Programming","Design","Vue","Vuetify"];return(p,o)=>{const t=x;return b(),V(t,{modelValue:n(e),"onUpdate:modelValue":o[0]||(o[0]=u=>r(e)?e.value=u:null),items:l,label:"Combobox",density:"compact",placeholder:"deployment",multiple:""},null,8,["modelValue"])}}},N={__name:"DemoComboboxBasic",setup(g){const e=c("Programming"),l=["Programming","Design","Vue","Vuetify"];return(p,o)=>{const t=x;return b(),V(t,{modelValue:n(e),"onUpdate:modelValue":o[0]||(o[0]=u=>r(e)?e.value=u:null),items:l,placeholder:"deployment"},null,8,["modelValue"])}}},T={ts:`<script lang="ts" setup>
const selectedItem = ref('Programming')
const items = ['Programming', 'Design', 'Vue', 'Vuetify']
<\/script>

<template>
  <AppCombobox
    v-model="selectedItem"
    :items="items"
    placeholder="deployment"
  />
</template>
`,js:`<script setup>
const selectedItem = ref('Programming')

const items = [
  'Programming',
  'Design',
  'Vue',
  'Vuetify',
]
<\/script>

<template>
  <AppCombobox
    v-model="selectedItem"
    :items="items"
    placeholder="deployment"
  />
</template>
`},$={ts:`<script lang="ts" setup>
const select = ref(['Vuetify', 'Programming'])
const items = ['Programming', 'Design', 'Vue', 'Vuetify']
<\/script>

<template>
  <AppCombobox
    v-model="select"
    :items="items"
    label="Combobox"
    multiple
    placeholder="deployment"
    clearable
  />
</template>
`,js:`<script setup>
const select = ref([
  'Vuetify',
  'Programming',
])

const items = [
  'Programming',
  'Design',
  'Vue',
  'Vuetify',
]
<\/script>

<template>
  <AppCombobox
    v-model="select"
    :items="items"
    label="Combobox"
    multiple
    placeholder="deployment"
    clearable
  />
</template>
`},B={ts:`<script lang="ts" setup>
const select = ref(['Vuetify', 'Programming'])
const items = ['Programming', 'Design', 'Vue', 'Vuetify']
<\/script>

<template>
  <AppCombobox
    v-model="select"
    :items="items"
    label="Combobox"
    density="compact"
    placeholder="deployment"
    multiple
  />
</template>
`,js:`<script setup>
const select = ref([
  'Vuetify',
  'Programming',
])

const items = [
  'Programming',
  'Design',
  'Vue',
  'Vuetify',
]
<\/script>

<template>
  <AppCombobox
    v-model="select"
    :items="items"
    label="Combobox"
    density="compact"
    placeholder="deployment"
    multiple
  />
</template>
`},R={ts:`<script lang="ts" setup>
const items = ['Gaming', 'Programming', 'Vue', 'Vuetify']
const selectedList = ref(['Vuetify'])
const search = ref(null)

watch(selectedList, value => {
  if (value.length > 5)
    nextTick(() => selectedList.value.pop())
})
<\/script>

<template>
  <AppCombobox
    v-model="selectedList"
    v-model:search-input="search"
    :items="items"
    hide-selected
    :hide-no-data="false"
    placeholder="deployment"
    hint="Maximum of 5 tags"
    label="Add some tags"
    multiple
    persistent-hint
  >
    <template #no-data>
      <VListItem>
        <VListItemTitle>
          No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
        </VListItemTitle>
      </VListItem>
    </template>
  </AppCombobox>
</template>
`,js:`<script setup>
const items = [
  'Gaming',
  'Programming',
  'Vue',
  'Vuetify',
]

const selectedList = ref(['Vuetify'])
const search = ref(null)

watch(selectedList, value => {
  if (value.length > 5)
    nextTick(() => selectedList.value.pop())
})
<\/script>

<template>
  <AppCombobox
    v-model="selectedList"
    v-model:search-input="search"
    :items="items"
    hide-selected
    :hide-no-data="false"
    placeholder="deployment"
    hint="Maximum of 5 tags"
    label="Add some tags"
    multiple
    persistent-hint
  >
    <template #no-data>
      <VListItem>
        <VListItemTitle>
          No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
        </VListItemTitle>
      </VListItem>
    </template>
  </AppCombobox>
</template>
`},j={ts:`<script lang="ts" setup>
const selectedItem = ref(['Programming'])
const items = ['Programming', 'Design', 'Vue', 'Vuetify']
<\/script>

<template>
  <VRow>
    <VCol cols="12">
      <VCombobox
        v-model="selectedItem"
        :items="items"
        multiple
        placeholder="deployment"
        variant="solo"
        label="solo"
      />
    </VCol>
    <VCol cols="12">
      <VCombobox
        v-model="selectedItem"
        multiple
        :items="items"
        placeholder="deployment"
        variant="outlined"
        label="Outlined"
      />
    </VCol>
    <VCol cols="12">
      <VCombobox
        v-model="selectedItem"
        multiple
        :items="items"
        placeholder="deployment"
        variant="underlined"
        label="Underlined"
      />
    </VCol>
    <VCol cols="12">
      <VCombobox
        v-model="selectedItem"
        multiple
        :items="items"
        placeholder="deployment"
        variant="filled"
        label="Filled"
      />
    </VCol>
    <VCol cols="12">
      <VCombobox
        v-model="selectedItem"
        multiple
        :items="items"
        variant="plain"
        placeholder="deployment"
        label="Plain"
      />
    </VCol>
  </VRow>
</template>
`,js:`<script setup>
const selectedItem = ref(['Programming'])

const items = [
  'Programming',
  'Design',
  'Vue',
  'Vuetify',
]
<\/script>

<template>
  <VRow>
    <VCol cols="12">
      <VCombobox
        v-model="selectedItem"
        :items="items"
        multiple
        placeholder="deployment"
        variant="solo"
        label="solo"
      />
    </VCol>
    <VCol cols="12">
      <VCombobox
        v-model="selectedItem"
        multiple
        :items="items"
        placeholder="deployment"
        variant="outlined"
        label="Outlined"
      />
    </VCol>
    <VCol cols="12">
      <VCombobox
        v-model="selectedItem"
        multiple
        :items="items"
        placeholder="deployment"
        variant="underlined"
        label="Underlined"
      />
    </VCol>
    <VCol cols="12">
      <VCombobox
        v-model="selectedItem"
        multiple
        :items="items"
        placeholder="deployment"
        variant="filled"
        label="Filled"
      />
    </VCol>
    <VCol cols="12">
      <VCombobox
        v-model="selectedItem"
        multiple
        :items="items"
        variant="plain"
        placeholder="deployment"
        label="Plain"
      />
    </VCol>
  </VRow>
</template>
`},be={__name:"combobox",setup(g){return(e,l)=>{const p=N,o=w,t=k,u=U,f=L,v=A;return b(),V(y,{class:"match-height"},{default:s(()=>[m(d,{cols:"12",md:"6"},{default:s(()=>[m(o,{title:"Basic",code:T},{default:s(()=>[l[0]||(l[0]=i("p",null,"With Combobox, you can allow a user to create new values that may not be present in a provided items list.",-1)),m(p)]),_:1},8,["code"])]),_:1}),m(d,{cols:"12",md:"6"},{default:s(()=>[m(o,{title:"Density",code:B},{default:s(()=>[l[1]||(l[1]=i("p",null,[a(" You can use "),i("code",null,"Density"),a(" prop to reduce combobox height and lower max height of list items. Available options are: "),i("code",null,"default"),a(", "),i("code",null,"comfortable"),a(", and "),i("code",null,"compact"),a(". ")],-1)),m(t)]),_:1},8,["code"])]),_:1}),m(d,{cols:"12",md:"6"},{default:s(()=>[m(o,{title:"Variant",code:j},{default:s(()=>[l[2]||(l[2]=i("p",null,[a("Use "),i("code",null,"solo"),a(", "),i("code",null,"outlined"),a(", "),i("code",null,"underlined"),a(", "),i("code",null,"filled"),a(" and "),i("code",null,"plain"),a(" options of "),i("code",null,"variant"),a(" prop to change the look of combobox. ")],-1)),m(u)]),_:1},8,["code"])]),_:1}),m(d,{cols:"12",md:"6"},{default:s(()=>[m(o,{title:"No data with chips",code:R},{default:s(()=>[l[3]||(l[3]=i("p",null,"Previously known as tags - user is allowed to enter more than 1 value",-1)),m(f)]),_:1},8,["code"])]),_:1}),m(d,{cols:"12",md:"6"},{default:s(()=>[m(o,{title:"Clearable",code:$},{default:s(()=>[l[4]||(l[4]=i("p",null,[a("Use "),i("code",null,"clearable"),a(" prop to clear combobox.")],-1)),m(v)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{be as default};
