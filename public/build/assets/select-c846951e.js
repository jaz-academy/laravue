import{_ as S}from"./AppSelect-f110362d.js";import{r as z,o as m,f as d,n as b,aV as V,e as o,b as e,d as s,v as i}from"./main-4585feec.js";import{a as c,V as C}from"./VRow-53fd1544.js";import{V as _}from"./VSelect-e95c30a5.js";import{_ as g}from"./AppCardCode-74786771.js";import"./form-075a7c7b.js";import"./VTextField-d2aea9dd.js";/* empty css                   */import"./VCounter-2f9e53e6.js";import"./VImg-02cfc59c.js";import"./VField-3decac3d.js";import"./easing-9f15041e.js";import"./VInput-3fb3d6fe.js";import"./forwardRefs-8348545e.js";import"./VList-4b4f9347.js";import"./ssrBoot-7fdf6b89.js";import"./VAvatar-fa9fec94.js";import"./VDivider-e2924383.js";import"./dialog-transition-a9ebe0dc.js";import"./VMenu-dc1c4301.js";import"./VOverlay-27dbbcf8.js";import"./lazy-3e6a3ff5.js";import"./scopeId-326ce56f.js";import"./VCheckboxBtn-42d04193.js";import"./VSelectionControl-272cc15c.js";import"./VChip-aabda9ce.js";import"./VCard-a267c840.js";import"./VCardText-dd0c7bc9.js";const D={__name:"DemoSelectMultiple",setup(u){const l=z(["Alabama"]),t=["Alabama","Alaska","American Samoa","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Federated States of Micronesia","Florida","Georgia","Guam"];return(r,a)=>{const n=S;return m(),d(n,{modelValue:b(l),"onUpdate:modelValue":a[0]||(a[0]=p=>V(l)?l.value=p:null),items:t,"menu-props":{maxHeight:"400"},label:"Select",multiple:"","persistent-hint":"",placeholder:"Select State"},null,8,["modelValue"])}}},I={__name:"DemoSelectMenuProps",setup(u){const l=["Foo","Bar","Fizz","Buzz"];return(t,r)=>{const a=S;return m(),d(a,{items:l,"menu-props":{transition:"scroll-y-transition"},label:"Label",placeholder:"Select Item"})}}},B={__name:"DemoSelectChips",setup(u){const l=["foo","bar","fizz","buzz"],t=z(["foo","bar","fizz","buzz"]);return(r,a)=>{const n=S;return m(),d(n,{modelValue:b(t),"onUpdate:modelValue":a[0]||(a[0]=p=>V(t)?t.value=p:null),items:l,placeholder:"Select Item",label:"Chips",chips:"",multiple:"","closable-chips":""},null,8,["modelValue"])}}},O={__name:"DemoSelectIcons",setup(u){const l=z("Florida"),t=z("Texas"),r=["Alabama","Alaska","American Samoa","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Federated States of Micronesia","Florida","Georgia","Guam"];return(a,n)=>{const p=S;return m(),d(C,null,{default:o(()=>[e(c,{cols:"12"},{default:o(()=>[e(p,{modelValue:b(l),"onUpdate:modelValue":n[0]||(n[0]=f=>V(l)?l.value=f:null),items:r,label:"Select","prepend-icon":"tabler-map","single-line":"",variant:"filled",placeholder:"Select State"},null,8,["modelValue"])]),_:1}),e(c,{cols:"12"},{default:o(()=>[e(p,{modelValue:b(t),"onUpdate:modelValue":n[1]||(n[1]=f=>V(t)?t.value=f:null),items:r,"append-icon":"tabler-map",label:"Select","single-line":"",variant:"filled",placeholder:"Select State"},null,8,["modelValue"])]),_:1})]),_:1})}}},w={__name:"DemoSelectCustomTextAndValue",setup(u){const l=z({state:"Florida",abbr:"FL"}),t=[{state:"Florida",abbr:"FL"},{state:"Georgia",abbr:"GA"},{state:"Nebraska",abbr:"NE"},{state:"California",abbr:"CA"},{state:"New York",abbr:"NY"}];return(r,a)=>{const n=S;return m(),d(n,{modelValue:b(l),"onUpdate:modelValue":a[0]||(a[0]=p=>V(l)?l.value=p:null),hint:`${b(l).state}, ${b(l).abbr}`,items:t,"item-title":"state","item-value":"abbr",label:"Select","persistent-hint":"","return-object":"","single-line":"",placeholder:"Select State"},null,8,["modelValue","hint"])}}},x={__name:"DemoSelectVariant",setup(u){const l=["Foo","Bar","Fizz","Buzz"];return(t,r)=>(m(),d(C,null,{default:o(()=>[e(c,{cols:"12",sm:"6"},{default:o(()=>[e(_,{items:l,label:"Outlined",placeholder:"Select Item"})]),_:1}),e(c,{cols:"12",sm:"6"},{default:o(()=>[e(_,{items:l,label:"Filled",placeholder:"Select Item",variant:"filled"})]),_:1}),e(c,{cols:"12",sm:"6"},{default:o(()=>[e(_,{items:l,label:"Solo",placeholder:"Select Item",variant:"solo"})]),_:1}),e(c,{cols:"12",sm:"6"},{default:o(()=>[e(_,{items:l,label:"Plain",placeholder:"Select Item",variant:"plain"})]),_:1}),e(c,{cols:"12",sm:"6"},{default:o(()=>[e(_,{items:l,label:"Underlined",variant:"underlined",placeholder:"Select Item"})]),_:1})]),_:1}))}},k={__name:"DemoSelectDensity",setup(u){const l=["Foo","Bar","Fizz","Buzz"];return(t,r)=>{const a=S;return m(),d(a,{items:l,label:"Density",density:"compact",placeholder:"Select Item"})}}},y={__name:"DemoSelectBasic",setup(u){const l=["Foo","Bar","Fizz","Buzz"];return(t,r)=>{const a=S;return m(),d(a,{items:l,label:"Standard",placeholder:"Select Item"})}}},G={ts:`<script lang="ts" setup>
const items = ['Foo', 'Bar', 'Fizz', 'Buzz']
<\/script>

<template>
  <AppSelect
    :items="items"
    label="Standard"
    placeholder="Select Item"
  />
</template>
`,js:`<script setup>
const items = [
  'Foo',
  'Bar',
  'Fizz',
  'Buzz',
]
<\/script>

<template>
  <AppSelect
    :items="items"
    label="Standard"
    placeholder="Select Item"
  />
</template>
`},$={ts:`<script lang="ts" setup>
const items = ['foo', 'bar', 'fizz', 'buzz']
const selected = ref(['foo', 'bar', 'fizz', 'buzz'])
<\/script>

<template>
  <AppSelect
    v-model="selected"
    :items="items"
    placeholder="Select Item"
    label="Chips"
    chips
    multiple
    closable-chips
  />
</template>
`,js:`<script setup>
const items = [
  'foo',
  'bar',
  'fizz',
  'buzz',
]

const selected = ref([
  'foo',
  'bar',
  'fizz',
  'buzz',
])
<\/script>

<template>
  <AppSelect
    v-model="selected"
    :items="items"
    placeholder="Select Item"
    label="Chips"
    chips
    multiple
    closable-chips
  />
</template>
`},N={ts:`<script lang="ts" setup>
const selectedOption = ref({ state: 'Florida', abbr: 'FL' })

const items = [
  { state: 'Florida', abbr: 'FL' },
  { state: 'Georgia', abbr: 'GA' },
  { state: 'Nebraska', abbr: 'NE' },
  { state: 'California', abbr: 'CA' },
  { state: 'New York', abbr: 'NY' },
]
<\/script>

<template>
  <AppSelect
    v-model="selectedOption"
    :hint="\`\${selectedOption.state}, \${selectedOption.abbr}\`"
    :items="items"
    item-title="state"
    item-value="abbr"
    label="Select"
    persistent-hint
    return-object
    single-line
    placeholder="Select State"
  />
</template>
`,js:`<script setup>
const selectedOption = ref({
  state: 'Florida',
  abbr: 'FL',
})

const items = [
  {
    state: 'Florida',
    abbr: 'FL',
  },
  {
    state: 'Georgia',
    abbr: 'GA',
  },
  {
    state: 'Nebraska',
    abbr: 'NE',
  },
  {
    state: 'California',
    abbr: 'CA',
  },
  {
    state: 'New York',
    abbr: 'NY',
  },
]
<\/script>

<template>
  <AppSelect
    v-model="selectedOption"
    :hint="\`\${selectedOption.state}, \${selectedOption.abbr}\`"
    :items="items"
    item-title="state"
    item-value="abbr"
    label="Select"
    persistent-hint
    return-object
    single-line
    placeholder="Select State"
  />
</template>
`},j={ts:`<script lang="ts" setup>
const items = ['Foo', 'Bar', 'Fizz', 'Buzz']
<\/script>

<template>
  <AppSelect
    :items="items"
    label="Density"
    density="compact"
    placeholder="Select Item"
  />
</template>
`,js:`<script setup>
const items = [
  'Foo',
  'Bar',
  'Fizz',
  'Buzz',
]
<\/script>

<template>
  <AppSelect
    :items="items"
    label="Density"
    density="compact"
    placeholder="Select Item"
  />
</template>
`},M={ts:`<script lang="ts" setup>
const selectedOption1 = ref('Florida')
const selectedOption2 = ref('Texas')

const states = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District of Columbia',
  'Federated States of Micronesia',
  'Florida',
  'Georgia',
  'Guam',
]
<\/script>

<template>
  <VRow>
    <VCol cols="12">
      <AppSelect
        v-model="selectedOption1"
        :items="states"
        label="Select"
        prepend-icon="tabler-map"
        single-line
        variant="filled"
        placeholder="Select State"
      />
    </VCol>

    <VCol cols="12">
      <AppSelect
        v-model="selectedOption2"
        :items="states"
        append-icon="tabler-map"
        label="Select"
        single-line
        variant="filled"
        placeholder="Select State"
      />
    </VCol>
  </VRow>
</template>
`,js:`<script setup>
const selectedOption1 = ref('Florida')
const selectedOption2 = ref('Texas')

const states = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District of Columbia',
  'Federated States of Micronesia',
  'Florida',
  'Georgia',
  'Guam',
]
<\/script>

<template>
  <VRow>
    <VCol cols="12">
      <AppSelect
        v-model="selectedOption1"
        :items="states"
        label="Select"
        prepend-icon="tabler-map"
        single-line
        variant="filled"
        placeholder="Select State"
      />
    </VCol>

    <VCol cols="12">
      <AppSelect
        v-model="selectedOption2"
        :items="states"
        append-icon="tabler-map"
        label="Select"
        single-line
        variant="filled"
        placeholder="Select State"
      />
    </VCol>
  </VRow>
</template>
`},U={ts:`<script lang="ts" setup>
const items = ['Foo', 'Bar', 'Fizz', 'Buzz']
<\/script>

<template>
  <AppSelect
    :items="items"
    :menu-props="{ transition: 'scroll-y-transition' }"
    label="Label"
    placeholder="Select Item"
  />
</template>
`,js:`<script setup>
const items = [
  'Foo',
  'Bar',
  'Fizz',
  'Buzz',
]
<\/script>

<template>
  <AppSelect
    :items="items"
    :menu-props="{ transition: 'scroll-y-transition' }"
    label="Label"
    placeholder="Select Item"
  />
</template>
`},R={ts:`<script lang="ts" setup>
const selectedOptions = ref(['Alabama'])

const states = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District of Columbia',
  'Federated States of Micronesia',
  'Florida',
  'Georgia',
  'Guam',
]
<\/script>

<template>
  <AppSelect
    v-model="selectedOptions"
    :items="states"
    :menu-props="{ maxHeight: '400' }"
    label="Select"
    multiple
    persistent-hint
    placeholder="Select State"
  />
</template>
`,js:`<script setup>
const selectedOptions = ref(['Alabama'])

const states = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District of Columbia',
  'Federated States of Micronesia',
  'Florida',
  'Georgia',
  'Guam',
]
<\/script>

<template>
  <AppSelect
    v-model="selectedOptions"
    :items="states"
    :menu-props="{ maxHeight: '400' }"
    label="Select"
    multiple
    persistent-hint
    placeholder="Select State"
  />
</template>
`},L={ts:`<script lang="ts" setup>
const items = ['Foo', 'Bar', 'Fizz', 'Buzz']
<\/script>

<template>
  <VRow>
    <VCol
      cols="12"
      sm="6"
    >
      <VSelect
        :items="items"
        label="Outlined"
        placeholder="Select Item"
      />
    </VCol>
    <VCol
      cols="12"
      sm="6"
    >
      <VSelect
        :items="items"
        label="Filled"
        placeholder="Select Item"
        variant="filled"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VSelect
        :items="items"
        label="Solo"
        placeholder="Select Item"
        variant="solo"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VSelect
        :items="items"
        label="Plain"
        placeholder="Select Item"
        variant="plain"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VSelect
        :items="items"
        label="Underlined"
        variant="underlined"
        placeholder="Select Item"
      />
    </VCol>
  </VRow>
</template>
`,js:`<script setup>
const items = [
  'Foo',
  'Bar',
  'Fizz',
  'Buzz',
]
<\/script>

<template>
  <VRow>
    <VCol
      cols="12"
      sm="6"
    >
      <VSelect
        :items="items"
        label="Outlined"
        placeholder="Select Item"
      />
    </VCol>
    <VCol
      cols="12"
      sm="6"
    >
      <VSelect
        :items="items"
        label="Filled"
        placeholder="Select Item"
        variant="filled"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VSelect
        :items="items"
        label="Solo"
        placeholder="Select Item"
        variant="solo"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VSelect
        :items="items"
        label="Plain"
        placeholder="Select Item"
        variant="plain"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VSelect
        :items="items"
        label="Underlined"
        variant="underlined"
        placeholder="Select Item"
      />
    </VCol>
  </VRow>
</template>
`},fe={__name:"select",setup(u){return(l,t)=>{const r=y,a=g,n=k,p=x,f=w,h=O,A=B,F=I,v=D;return m(),d(C,null,{default:o(()=>[e(c,{cols:"12",md:"6"},{default:o(()=>[e(a,{title:"Basic",code:G},{default:o(()=>[t[0]||(t[0]=s("p",null,"Select fields components are used for collecting user provided information from a list of options.",-1)),e(r)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:o(()=>[e(a,{title:"Density",code:j},{default:o(()=>[t[1]||(t[1]=s("p",null,[i("You can use "),s("code",null,"density"),i(" prop to reduce the field height and lower max height of list items.")],-1)),e(n)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12"},{default:o(()=>[e(a,{title:"Variant",code:L},{default:o(()=>[t[2]||(t[2]=s("p",null,[i(" Use "),s("code",null,"filled"),i(", "),s("code",null,"outlined"),i(", "),s("code",null,"solo"),i(", "),s("code",null,"underlined"),i(" and "),s("code",null,"plain"),i(" options of "),s("code",null,"variant"),i(" prop to change appearance of select. ")],-1)),e(p)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:o(()=>[e(a,{title:"Custom text and value",code:N},{default:o(()=>[t[3]||(t[3]=s("p",null,"You can specify the specific properties within your items array that correspond to the title and value fields. In this example we also use the return-object prop which will return the entire object of the selected item on selection.",-1)),e(f)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:o(()=>[e(a,{title:"Icons",code:M},{default:o(()=>[t[4]||(t[4]=s("p",null,[i("Use a custom "),s("code",null,"prepend"),i(" or "),s("code",null,"appended"),i(" icon.")],-1)),e(h)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:o(()=>[e(a,{title:"Chips",code:$},{default:o(()=>[t[5]||(t[5]=s("p",null,[i("Use "),s("code",null,"chips"),i(" prop to make selected option as chip.")],-1)),e(A)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:o(()=>[e(a,{title:"Menu Props",code:U},{default:o(()=>[t[6]||(t[6]=s("p",null,[i("Custom props can be passed directly to "),s("code",null,"v-menu"),i(" using "),s("code",null,"menuProps"),i(" prop.")],-1)),e(F)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:o(()=>[e(a,{title:"Multiple",code:R},{default:o(()=>[t[7]||(t[7]=s("p",null,[i("Use "),s("code",null,"multiple"),i(" prop to select multiple option.")],-1)),e(v)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{fe as default};
