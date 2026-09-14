import{_ as y}from"./AppCombobox-23ede889.js";import{r as c,k as b,a1 as V,z as i,D as p,c as _,n as h,a2 as s,E as m,X as n,q as a,Z as P}from"./vendor-core-cfb14039.js";import{n as D,s as I,E as r,aq as C,D as x}from"./vendor-vuetify-68686ea1.js";import{_ as A}from"./AppCardCode-1f900ff7.js";import"./vendor-charts-7115819c.js";import"./main-03bc2ec2.js";import"./vendor-vueuse-34674e05.js";import"./vendor-pdf-d7f39922.js";const L={__name:"DemoComboboxClearable",setup(g){const e=c(["Vuetify","Programming"]),l=["Programming","Design","Vue","Vuetify"];return(d,o)=>{const t=y;return b(),V(t,{modelValue:i(e),"onUpdate:modelValue":o[0]||(o[0]=u=>p(e)?e.value=u:null),items:l,label:"Combobox",multiple:"",placeholder:"deployment",clearable:""},null,8,["modelValue"])}}},w={__name:"DemoComboboxNoDataWithChips",setup(g){const e=["Gaming","Programming","Vue","Vuetify"],l=c(["Vuetify"]),d=c(null);return _(l,o=>{o.length>5&&h(()=>l.value.pop())}),(o,t)=>{const u=y;return b(),V(u,{modelValue:i(l),"onUpdate:modelValue":t[0]||(t[0]=f=>p(l)?l.value=f:null),"search-input":i(d),"onUpdate:searchInput":t[1]||(t[1]=f=>p(d)?d.value=f:null),items:e,"hide-selected":"","hide-no-data":!1,placeholder:"deployment",hint:"Maximum of 5 tags",label:"Add some tags",multiple:"","persistent-hint":""},{"no-data":s(()=>[m(D,null,{default:s(()=>[m(I,null,{default:s(()=>[t[2]||(t[2]=n(' No results matching "')),a("strong",null,P(i(d)),1),t[3]||(t[3]=n('". Press ')),t[4]||(t[4]=a("kbd",null,"enter",-1)),t[5]||(t[5]=n(" to create a new one "))]),_:1})]),_:1})]),_:1},8,["modelValue","search-input"])}}},U={__name:"DemoComboboxVariant",setup(g){const e=c(["Programming"]),l=["Programming","Design","Vue","Vuetify"];return(d,o)=>(b(),V(x,null,{default:s(()=>[m(r,{cols:"12"},{default:s(()=>[m(C,{modelValue:i(e),"onUpdate:modelValue":o[0]||(o[0]=t=>p(e)?e.value=t:null),items:l,multiple:"",placeholder:"deployment",variant:"solo",label:"solo"},null,8,["modelValue"])]),_:1}),m(r,{cols:"12"},{default:s(()=>[m(C,{modelValue:i(e),"onUpdate:modelValue":o[1]||(o[1]=t=>p(e)?e.value=t:null),multiple:"",items:l,placeholder:"deployment",variant:"outlined",label:"Outlined"},null,8,["modelValue"])]),_:1}),m(r,{cols:"12"},{default:s(()=>[m(C,{modelValue:i(e),"onUpdate:modelValue":o[2]||(o[2]=t=>p(e)?e.value=t:null),multiple:"",items:l,placeholder:"deployment",variant:"underlined",label:"Underlined"},null,8,["modelValue"])]),_:1}),m(r,{cols:"12"},{default:s(()=>[m(C,{modelValue:i(e),"onUpdate:modelValue":o[3]||(o[3]=t=>p(e)?e.value=t:null),multiple:"",items:l,placeholder:"deployment",variant:"filled",label:"Filled"},null,8,["modelValue"])]),_:1}),m(r,{cols:"12"},{default:s(()=>[m(C,{modelValue:i(e),"onUpdate:modelValue":o[4]||(o[4]=t=>p(e)?e.value=t:null),multiple:"",items:l,variant:"plain",placeholder:"deployment",label:"Plain"},null,8,["modelValue"])]),_:1})]),_:1}))}},k={__name:"DemoComboboxDensity",setup(g){const e=c(["Vuetify","Programming"]),l=["Programming","Design","Vue","Vuetify"];return(d,o)=>{const t=y;return b(),V(t,{modelValue:i(e),"onUpdate:modelValue":o[0]||(o[0]=u=>p(e)?e.value=u:null),items:l,label:"Combobox",density:"compact",placeholder:"deployment",multiple:""},null,8,["modelValue"])}}},N={__name:"DemoComboboxBasic",setup(g){const e=c("Programming"),l=["Programming","Design","Vue","Vuetify"];return(d,o)=>{const t=y;return b(),V(t,{modelValue:i(e),"onUpdate:modelValue":o[0]||(o[0]=u=>p(e)?e.value=u:null),items:l,placeholder:"deployment"},null,8,["modelValue"])}}},T={ts:`<script lang="ts" setup>
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
`},S={__name:"combobox",setup(g){return(e,l)=>{const d=N,o=A,t=k,u=U,f=w,v=L;return b(),V(x,{class:"match-height"},{default:s(()=>[m(r,{cols:"12",md:"6"},{default:s(()=>[m(o,{title:"Basic",code:T},{default:s(()=>[l[0]||(l[0]=a("p",null,"With Combobox, you can allow a user to create new values that may not be present in a provided items list.",-1)),m(d)]),_:1},8,["code"])]),_:1}),m(r,{cols:"12",md:"6"},{default:s(()=>[m(o,{title:"Density",code:B},{default:s(()=>[l[1]||(l[1]=a("p",null,[n(" You can use "),a("code",null,"Density"),n(" prop to reduce combobox height and lower max height of list items. Available options are: "),a("code",null,"default"),n(", "),a("code",null,"comfortable"),n(", and "),a("code",null,"compact"),n(". ")],-1)),m(t)]),_:1},8,["code"])]),_:1}),m(r,{cols:"12",md:"6"},{default:s(()=>[m(o,{title:"Variant",code:j},{default:s(()=>[l[2]||(l[2]=a("p",null,[n("Use "),a("code",null,"solo"),n(", "),a("code",null,"outlined"),n(", "),a("code",null,"underlined"),n(", "),a("code",null,"filled"),n(" and "),a("code",null,"plain"),n(" options of "),a("code",null,"variant"),n(" prop to change the look of combobox. ")],-1)),m(u)]),_:1},8,["code"])]),_:1}),m(r,{cols:"12",md:"6"},{default:s(()=>[m(o,{title:"No data with chips",code:R},{default:s(()=>[l[3]||(l[3]=a("p",null,"Previously known as tags - user is allowed to enter more than 1 value",-1)),m(f)]),_:1},8,["code"])]),_:1}),m(r,{cols:"12",md:"6"},{default:s(()=>[m(o,{title:"Clearable",code:$},{default:s(()=>[l[4]||(l[4]=a("p",null,[n("Use "),a("code",null,"clearable"),n(" prop to clear combobox.")],-1)),m(v)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{S as default};
