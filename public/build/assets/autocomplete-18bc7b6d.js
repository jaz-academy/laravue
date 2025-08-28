import{_,V as b}from"./AppAutocomplete-97c5e0f8.js";import{r as S,o as u,f as d,n as g,aU as A,w,e as s,b as e,d as l,v as i}from"./main-67b8cec6.js";import{a as c,V as v}from"./VRow-0e61bfb6.js";import{_ as T}from"./AppCardCode-aa187edc.js";import"./form-e6998416.js";import"./VSelect-2e4a8d4f.js";import"./VTextField-e3decb3d.js";/* empty css                   */import"./VCounter-6dd2f7e9.js";import"./VImg-3c3e7f31.js";import"./VField-ddf3fe8e.js";import"./easing-9f15041e.js";import"./VInput-1124ae67.js";import"./forwardRefs-8348545e.js";import"./VList-20a5129c.js";import"./ssrBoot-74d8f6b8.js";import"./VAvatar-42bec599.js";import"./VDivider-e0fd92b0.js";import"./dialog-transition-df011ef4.js";import"./VMenu-3a17e05d.js";import"./VOverlay-1200b457.js";import"./lazy-0c0b49da.js";import"./scopeId-dd1b16f6.js";import"./VCheckboxBtn-4186776c.js";import"./VSelectionControl-3490ebc3.js";import"./VChip-177f961c.js";import"./filter-54f87f61.js";import"./VCard-70db4173.js";import"./VCardText-61e3901b.js";const F={__name:"DemoAutocompleteValidation",setup(f){const o=["foo","bar","fizz","buzz"],t=S(["foo"]),n=[a=>!!a.length||"Select at least one option."];return(a,r)=>{const h=_;return u(),d(h,{modelValue:g(t),"onUpdate:modelValue":r[0]||(r[0]=m=>A(t)?t.value=m:null),items:o,rules:n,placeholder:"Select Option",multiple:""},null,8,["modelValue"])}}},N={__name:"DemoAutocompleteAsyncItems",setup(f){const o=S(!1),t=S(),n=S(null),a=["Alabama","Alaska","American Samoa","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Federated States of Micronesia","Florida","Georgia","Guam","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Marshall Islands","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Northern Mariana Islands","Ohio","Oklahoma","Oregon","Palau","Pennsylvania","Puerto Rico","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virgin Island","Virginia","Washington","West Virginia","Wisconsin","Wyoming"],r=S(a),h=m=>{o.value=!0,setTimeout(()=>{r.value=a.filter(p=>(p||"").toLowerCase().includes((m||"").toLowerCase())),o.value=!1},500)};return w(t,m=>{m&&m!==n.value&&h(m)}),(m,p)=>(u(),d(b,{modelValue:g(n),"onUpdate:modelValue":p[0]||(p[0]=C=>A(n)?n.value=C:null),search:g(t),"onUpdate:search":p[1]||(p[1]=C=>A(t)?t.value=C:null),loading:g(o),items:g(r),placeholder:"Search for a state",label:"What state are you from?",variant:"underlined","menu-props":{maxHeight:"200px"}},null,8,["modelValue","search","loading","items"]))}},M={__name:"DemoAutocompleteCustomFilter",setup(f){const o=[{name:"Florida",abbr:"FL",id:1},{name:"Georgia",abbr:"GA",id:2},{name:"Nebraska",abbr:"NE",id:3},{name:"California",abbr:"CA",id:4},{name:"New York",abbr:"NY",id:5}];function t(n,a,r){const h=r.title.toLowerCase(),m=r.value.toLowerCase(),p=a.toLocaleLowerCase();return h.includes(p)||m.includes(p)}return(n,a)=>{const r=_;return u(),d(r,{label:"States",items:o,"custom-filter":t,"item-title":"name","item-value":"abbr",placeholder:"Select State"})}}},k={__name:"DemoAutocompleteChips",setup(f){const o=["California","Colorado","Florida","Georgia","Texas","Wyoming"];return(t,n)=>{const a=_;return u(),d(a,{label:"States",items:o,placeholder:"Select State",chips:"",multiple:"","closable-chips":""})}}},D={__name:"DemoAutocompleteClearable",setup(f){const o=["California","Colorado","Florida","Georgia","Texas","Wyoming"];return(t,n)=>{const a=_;return u(),d(a,{label:"States",items:o,multiple:"",placeholder:"Select State",clearable:""})}}},W={__name:"DemoAutocompleteMultiple",setup(f){const o=["California","Colorado","Florida","Georgia","Texas","Wyoming"];return(t,n)=>{const a=_;return u(),d(a,{label:"States",items:o,placeholder:"Select State",multiple:"",eager:""})}}},G={__name:"DemoAutocompleteVariant",setup(f){const o=["California","Colorado","Florida","Georgia","Texas","Wyoming"];return(t,n)=>(u(),d(v,null,{default:s(()=>[e(c,{cols:"12",md:"6"},{default:s(()=>[e(b,{variant:"solo",label:"solo",items:o,placeholder:"Select State"})]),_:1}),e(c,{cols:"12",md:"6"},{default:s(()=>[e(b,{variant:"outlined",label:"outlined",placeholder:"Select State",items:o})]),_:1}),e(c,{cols:"12",md:"6"},{default:s(()=>[e(b,{variant:"underlined",label:"underlined",placeholder:"Select State",items:o})]),_:1}),e(c,{cols:"12",md:"6"},{default:s(()=>[e(b,{variant:"filled",label:"filled",placeholder:"Select State",items:o})]),_:1}),e(c,{cols:"12",md:"6"},{default:s(()=>[e(b,{variant:"plain",label:"plain",placeholder:"Select State",items:o})]),_:1})]),_:1}))}},I={__name:"DemoAutocompleteDensity",setup(f){const o=S("Florida"),t=["California","Colorado","Florida","Georgia","Texas","Wyoming"];return(n,a)=>{const r=_;return u(),d(r,{modelValue:g(o),"onUpdate:modelValue":a[0]||(a[0]=h=>A(o)?o.value=h:null),label:"States",density:"compact",placeholder:"Select State",items:t},null,8,["modelValue"])}}},L={__name:"DemoAutocompleteBasic",setup(f){const o=["California","Colorado","Florida","Georgia","Texas","Wyoming"];return(t,n)=>{const a=_;return u(),d(a,{label:"States",items:o,placeholder:"Select State"})}}},q={ts:`<script setup lang="ts">
const loading = ref(false)
const search = ref()
const select = ref(null)

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
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Marshall Islands',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Northern Mariana Islands',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Palau',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virgin Island',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
]

const items = ref(states)

const querySelections = (query: string) => {
  loading.value = true

  // Simulated ajax query
  setTimeout(() => {
    items.value = states.filter(state => (state || '').toLowerCase().includes((query || '').toLowerCase()))
    loading.value = false
  }, 500)
}

watch(search, query => {
  query && query !== select.value && querySelections(query)
})
<\/script>

<template>
  <VAutocomplete
    v-model="select"
    v-model:search="search"
    :loading="loading"
    :items="items"
    placeholder="Search for a state"
    label="What state are you from?"
    variant="underlined"
    :menu-props="{ maxHeight: '200px' }"
  />
</template>
`,js:`<script setup>
const loading = ref(false)
const search = ref()
const select = ref(null)

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
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Marshall Islands',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Northern Mariana Islands',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Palau',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virgin Island',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
]

const items = ref(states)

const querySelections = query => {
  loading.value = true

  // Simulated ajax query
  setTimeout(() => {
    items.value = states.filter(state => (state || '').toLowerCase().includes((query || '').toLowerCase()))
    loading.value = false
  }, 500)
}

watch(search, query => {
  query && query !== select.value && querySelections(query)
})
<\/script>

<template>
  <VAutocomplete
    v-model="select"
    v-model:search="search"
    :loading="loading"
    :items="items"
    placeholder="Search for a state"
    label="What state are you from?"
    variant="underlined"
    :menu-props="{ maxHeight: '200px' }"
  />
</template>
`},O={ts:`<script setup lang="ts">
const items = ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']
<\/script>

<template>
  <AppAutocomplete
    label="States"
    :items="items"
    placeholder="Select State"
  />
</template>
`,js:`<script setup>
const items = [
  'California',
  'Colorado',
  'Florida',
  'Georgia',
  'Texas',
  'Wyoming',
]
<\/script>

<template>
  <AppAutocomplete
    label="States"
    :items="items"
    placeholder="Select State"
  />
</template>
`},R={ts:`<script setup lang="ts">
const items = ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']
<\/script>

<template>
  <AppAutocomplete
    label="States"
    :items="items"
    placeholder="Select State"
    chips
    multiple
    closable-chips
  />
</template>
`,js:`<script setup>
const items = [
  'California',
  'Colorado',
  'Florida',
  'Georgia',
  'Texas',
  'Wyoming',
]
<\/script>

<template>
  <AppAutocomplete
    label="States"
    :items="items"
    placeholder="Select State"
    chips
    multiple
    closable-chips
  />
</template>
`},z={ts:`<script setup lang="ts">
const items = ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']
<\/script>

<template>
  <AppAutocomplete
    label="States"
    :items="items"
    multiple
    placeholder="Select State"
    clearable
  />
</template>
`,js:`<script setup>
const items = [
  'California',
  'Colorado',
  'Florida',
  'Georgia',
  'Texas',
  'Wyoming',
]
<\/script>

<template>
  <AppAutocomplete
    label="States"
    :items="items"
    multiple
    placeholder="Select State"
    clearable
  />
</template>
`},U={ts:`<script setup lang="ts">
const states = [
  { name: 'Florida', abbr: 'FL', id: 1 },
  { name: 'Georgia', abbr: 'GA', id: 2 },
  { name: 'Nebraska', abbr: 'NE', id: 3 },
  { name: 'California', abbr: 'CA', id: 4 },
  { name: 'New York', abbr: 'NY', id: 5 },
]

function customFilter(item: string, queryText: string, itemText: { title: string; value: string }) {
  const textOne = itemText.title.toLowerCase()
  const textTwo = itemText.value.toLowerCase()
  const searchText = queryText.toLocaleLowerCase()

  return textOne.includes(searchText) || textTwo.includes(searchText)
}
<\/script>

<template>
  <AppAutocomplete
    label="States"
    :items="states"
    :custom-filter="customFilter"
    item-title="name"
    item-value="abbr"
    placeholder="Select State"
  />
</template>
`,js:`<script setup>
const states = [
  {
    name: 'Florida',
    abbr: 'FL',
    id: 1,
  },
  {
    name: 'Georgia',
    abbr: 'GA',
    id: 2,
  },
  {
    name: 'Nebraska',
    abbr: 'NE',
    id: 3,
  },
  {
    name: 'California',
    abbr: 'CA',
    id: 4,
  },
  {
    name: 'New York',
    abbr: 'NY',
    id: 5,
  },
]

function customFilter(item, queryText, itemText) {
  const textOne = itemText.title.toLowerCase()
  const textTwo = itemText.value.toLowerCase()
  const searchText = queryText.toLocaleLowerCase()
  
  return textOne.includes(searchText) || textTwo.includes(searchText)
}
<\/script>

<template>
  <AppAutocomplete
    label="States"
    :items="states"
    :custom-filter="customFilter"
    item-title="name"
    item-value="abbr"
    placeholder="Select State"
  />
</template>
`},j={ts:`<script setup lang="ts">
const select = ref('Florida')
const items = ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']
<\/script>

<template>
  <AppAutocomplete
    v-model="select"
    label="States"
    density="compact"
    placeholder="Select State"
    :items="items"
  />
</template>
`,js:`<script setup>
const select = ref('Florida')

const items = [
  'California',
  'Colorado',
  'Florida',
  'Georgia',
  'Texas',
  'Wyoming',
]
<\/script>

<template>
  <AppAutocomplete
    v-model="select"
    label="States"
    density="compact"
    placeholder="Select State"
    :items="items"
  />
</template>
`},$={ts:`<script setup lang="ts">
const items = ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']
<\/script>

<template>
  <AppAutocomplete
    label="States"
    :items="items"
    placeholder="Select State"
    multiple
    eager
  />
</template>
`,js:`<script setup>
const items = [
  'California',
  'Colorado',
  'Florida',
  'Georgia',
  'Texas',
  'Wyoming',
]
<\/script>

<template>
  <AppAutocomplete
    label="States"
    :items="items"
    placeholder="Select State"
    multiple
    eager
  />
</template>
`},P={ts:`<script setup lang="ts">
const items = ['foo', 'bar', 'fizz', 'buzz']
const values = ref(['foo'])
const nameRules = [(v: string) => !!v.length || 'Select at least one option.']
<\/script>

<template>
  <AppAutocomplete
    v-model="values"
    :items="items"
    :rules="nameRules"
    placeholder="Select Option"
    multiple
  />
</template>
`,js:`<script setup>
const items = [
  'foo',
  'bar',
  'fizz',
  'buzz',
]

const values = ref(['foo'])
const nameRules = [v => !!v.length || 'Select at least one option.']
<\/script>

<template>
  <AppAutocomplete
    v-model="values"
    :items="items"
    :rules="nameRules"
    placeholder="Select Option"
    multiple
  />
</template>
`},Y={ts:`<script setup lang="ts">
const items = ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']
<\/script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 solo variant  -->
      <VAutocomplete
        variant="solo"
        label="solo"
        :items="items"
        placeholder="Select State"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 outlined variant -->
      <VAutocomplete
        variant="outlined"
        label="outlined"
        placeholder="Select State"
        :items="items"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 underlined variant -->
      <VAutocomplete
        variant="underlined"
        label="underlined"
        placeholder="Select State"
        :items="items"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 filled variant  -->
      <VAutocomplete
        variant="filled"
        label="filled"
        placeholder="Select State"
        :items="items"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!--  👉 plain variant -->
      <VAutocomplete
        variant="plain"
        label="plain"
        placeholder="Select State"
        :items="items"
      />
    </VCol>
  </VRow>
</template>
`,js:`<script setup>
const items = [
  'California',
  'Colorado',
  'Florida',
  'Georgia',
  'Texas',
  'Wyoming',
]
<\/script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 solo variant  -->
      <VAutocomplete
        variant="solo"
        label="solo"
        :items="items"
        placeholder="Select State"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 outlined variant -->
      <VAutocomplete
        variant="outlined"
        label="outlined"
        placeholder="Select State"
        :items="items"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 underlined variant -->
      <VAutocomplete
        variant="underlined"
        label="underlined"
        placeholder="Select State"
        :items="items"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 filled variant  -->
      <VAutocomplete
        variant="filled"
        label="filled"
        placeholder="Select State"
        :items="items"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!--  👉 plain variant -->
      <VAutocomplete
        variant="plain"
        label="plain"
        placeholder="Select State"
        :items="items"
      />
    </VCol>
  </VRow>
</template>
`},Ae={__name:"autocomplete",setup(f){return(o,t)=>{const n=L,a=T,r=I,h=G,m=W,p=D,C=k,y=M,x=N,V=F;return u(),d(v,{class:"match-height"},{default:s(()=>[e(c,{cols:"12",md:"6"},{default:s(()=>[e(a,{title:"Basic",code:O},{default:s(()=>[t[0]||(t[0]=l("p",null,[i(" The "),l("code",null," v-autocomplete "),i(" component offers simple and flexible type-ahead functionality. This is useful when searching large sets of data or even dynamically fetching information from an API. ")],-1)),e(n)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:s(()=>[e(a,{title:"Density",code:j},{default:s(()=>[t[1]||(t[1]=l("p",null,[i(" You can use "),l("code",null," density "),i(" prop to adjusts vertical spacing within the component. Available options are: "),l("code",null,"default"),i(", "),l("code",null,"comfortable"),i(", and "),l("code",null,"compact"),i(". ")],-1)),e(r)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"12"},{default:s(()=>[e(a,{title:"Variant",code:Y},{default:s(()=>[t[2]||(t[2]=l("p",null,[i("Use "),l("code",null,"solo"),i(", "),l("code",null,"outlined"),i(", "),l("code",null,"underlined"),i(", "),l("code",null,"filled"),i(" and "),l("code",null,"plain"),i(" options of "),l("code",null,"variant"),i(" prop to change the look of Autocomplete. ")],-1)),e(h)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:s(()=>[e(a,{title:"Multiple",code:$},{default:s(()=>[t[3]||(t[3]=l("p",null,[i("Use "),l("code",null,"multiple"),i(" prop to select multiple. Accepts array for value")],-1)),e(m)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:s(()=>[e(a,{title:"Clearable",code:z},{default:s(()=>[t[4]||(t[4]=l("p",null,[i("Use "),l("code",null,"clearable"),i(" prop to add input clear functionality.")],-1)),e(p)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:s(()=>[e(a,{title:"Chips",code:R},{default:s(()=>[t[5]||(t[5]=l("p",null,[i("Use "),l("code",null," chips "),i(" prop to use chips in select.")],-1)),e(C)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:s(()=>[e(a,{title:"Custom-Filter",code:U},{default:s(()=>[t[6]||(t[6]=l("p",null,[i("The "),l("code",null," custom-filter "),i(" prop can be used to filter each individual item with custom logic.In example we will filter state based on their name and abbreviations ")],-1)),e(y)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:s(()=>[e(a,{title:"Async items",code:q},{default:s(()=>[t[7]||(t[7]=l("p",null,"Sometimes you need to load data externally based upon a search query. ",-1)),e(x)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:s(()=>[e(a,{title:"validation",code:P},{default:s(()=>[t[8]||(t[8]=l("p",null,[i("Use "),l("code",null,"rules"),i(" prop to validate autocomplete. Accepts a mixed array of types function, boolean and string. Functions pass an input value as an argument and must return either true / false or a string containing an error message.")],-1)),e(V)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{Ae as default};
