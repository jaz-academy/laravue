import{_ as b}from"./AppTextField-07b9446e.js";import{V as n}from"./VCol-3541d7c7.js";import{V as C}from"./VRow-9ddfb65a.js";import{r as f,o as x,f as h,e as t,b as e,n as p,aU as T,d as o,v as a}from"./main-7a04a4cc.js";import{r as $,e as I}from"./validators-3848b933.js";import{V as M}from"./VForm-eac8e6b7.js";import{_ as g}from"./_plugin-vue_export-helper-c27b6911.js";import{V as w}from"./VTextField-8b5d0ff7.js";import{_ as D}from"./AppCardCode-46f18f59.js";import"./form-41eb478e.js";import"./helpers-929cea30.js";import"./no-profile-4221a4a6.js";import"./forwardRefs-8348545e.js";/* empty css                   */import"./VCounter-9d080591.js";import"./VImg-785fe2da.js";import"./VField-eef30866.js";import"./easing-9f15041e.js";import"./VInput-5d1e9d15.js";import"./VCard-c1d86edf.js";import"./VAvatar-a8f8d7de.js";import"./VCardText-89ccd074.js";import"./VDivider-cd55d271.js";const U={__name:"DemoTextfieldPasswordInput",setup(_){const r=f(!1),l=f(!0),c=f("Password"),s=f("wqfasds"),u={required:d=>!!d||"Required.",min:d=>d.length>=8||"Min 8 characters"};return(d,i)=>{const m=b;return x(),h(C,null,{default:t(()=>[e(n,{cols:"12",sm:"6"},{default:t(()=>[e(m,{modelValue:p(c),"onUpdate:modelValue":i[0]||(i[0]=V=>T(c)?c.value=V:null),"append-inner-icon":p(r)?"tabler-eye-off":"tabler-eye",rules:[u.required,u.min],type:p(r)?"text":"password",name:"input-10-1",label:"Normal with hint text",hint:"At least 8 characters",placeholder:"············",counter:"","onClick:appendInner":i[1]||(i[1]=V=>r.value=!p(r))},null,8,["modelValue","append-inner-icon","rules","type"])]),_:1}),e(n,{cols:"12",sm:"6"},{default:t(()=>[e(m,{modelValue:p(s),"onUpdate:modelValue":i[2]||(i[2]=V=>T(s)?s.value=V:null),rules:[u.required,u.min],"append-inner-icon":p(l)?"tabler-eye-off":"tabler-eye",type:p(l)?"text":"password",name:"input-10-2",placeholder:"············",label:"Visible",hint:"At least 8 characters","onClick:appendInner":i[3]||(i[3]=V=>l.value=!p(l))},null,8,["modelValue","rules","append-inner-icon","type"])]),_:1})]),_:1})}}},q={__name:"DemoTextfieldIconEvents",setup(_){const r=f("Hey!"),l=f(!0),c=f(0),s=()=>{l.value=!l.value},u=()=>{r.value=""},d=()=>{c.value=0},i=()=>{d(),u()};return(m,V)=>{const v=b;return x(),h(v,{modelValue:p(r),"onUpdate:modelValue":V[0]||(V[0]=F=>T(r)?r.value=F:null),clearable:"",type:"text",label:"Message",color:"primary",placeholder:"Hey!!","clear-icon":"tabler-circle-x","append-icon":p(r)?m.$vuetify.locale.isRtl?"tabler-arrow-big-left-lines":"tabler-arrow-big-right-lines":"tabler-microphone","append-inner-icon":p(l)?"tabler-map-pin":"tabler-map-pin-off","onClick:appendInner":s,"onClick:append":i,"onClick:clear":u},null,8,["modelValue","append-icon","append-inner-icon"])}}},j={__name:"DemoTextfieldValidation",setup(_){const r=f("");return(l,c)=>{const s=b;return x(),h(M,null,{default:t(()=>[e(s,{modelValue:p(r),"onUpdate:modelValue":c[0]||(c[0]=u=>T(r)?r.value=u:null),rules:["requiredValidator"in l?l.requiredValidator:p($),"emailValidator"in l?l.emailValidator:p(I)],placeholder:"johnedoe@email.com",label:"E-mail"},null,8,["modelValue","rules"])]),_:1})}}},S={};function E(_,r){const l=b;return x(),h(l,{label:"Regular",placeholder:"Placeholder Text","single-line":""})}const L=g(S,[["render",E]]),H={__name:"DemoTextfieldPrefixesAndSuffixes",setup(_){const r=f(10.05),l=f(28.02),c=f("example"),s=f("04:56");return(u,d)=>{const i=b;return x(),h(C,null,{default:t(()=>[e(n,{cols:"12"},{default:t(()=>[e(i,{modelValue:p(r),"onUpdate:modelValue":d[0]||(d[0]=m=>T(r)?r.value=m:null),label:"Amount",prefix:"$",type:"number",placeholder:"10.05"},null,8,["modelValue"])]),_:1}),e(n,{cols:"12"},{default:t(()=>[e(i,{modelValue:p(l),"onUpdate:modelValue":d[1]||(d[1]=m=>T(l)?l.value=m:null),label:"Weight",suffix:"lbs",type:"number",placeholder:"28.02"},null,8,["modelValue"])]),_:1}),e(n,{cols:"12"},{default:t(()=>[e(i,{modelValue:p(c),"onUpdate:modelValue":d[2]||(d[2]=m=>T(c)?c.value=m:null),label:"Email address",suffix:"@gmail.com",placeholder:"example"},null,8,["modelValue"])]),_:1}),e(n,{cols:"12"},{default:t(()=>[e(i,{modelValue:p(s),"onUpdate:modelValue":d[3]||(d[3]=m=>T(s)?s.value=m:null),label:"Label Text",type:"time",suffix:"PST",placeholder:"04:56"},null,8,["modelValue"])]),_:1})]),_:1})}}},N={};function B(_,r){const l=b;return x(),h(C,null,{default:t(()=>[e(n,{cols:"12"},{default:t(()=>[e(l,{label:"Prepend","prepend-icon":"tabler-map-pin",placeholder:"Placeholder Text"})]),_:1}),e(n,{cols:"12"},{default:t(()=>[e(l,{label:"Prepend Inner","prepend-inner-icon":"tabler-map-pin",placeholder:"Placeholder Text"})]),_:1}),e(n,{cols:"12"},{default:t(()=>[e(l,{label:"Append","append-icon":"tabler-map-pin",placeholder:"Placeholder Text"})]),_:1}),e(n,{cols:"12"},{default:t(()=>[e(l,{label:"Append Inner","append-inner-icon":"tabler-map-pin",placeholder:"Placeholder Text"})]),_:1})]),_:1})}const W=g(N,[["render",B]]),O={};function z(_,r){const l=b;return x(),h(l,{color:"success",label:"First name",placeholder:"Placeholder Text"})}const Y=g(O,[["render",z]]),G={};function J(_,r){const l=b;return x(),h(l,{placeholder:"Placeholder Text",label:"Regular",clearable:""})}const K=g(G,[["render",J]]),Q={__name:"DemoTextfieldCounter",setup(_){const r=f("Preliminary report"),l=f("California is a state in the western United States"),c=[s=>s.length<=25||"Max 25 characters"];return(s,u)=>{const d=b;return x(),h(C,null,{default:t(()=>[e(n,{cols:"12"},{default:t(()=>[e(d,{modelValue:p(r),"onUpdate:modelValue":u[0]||(u[0]=i=>T(r)?r.value=i:null),rules:c,counter:"25",placeholder:"Placeholder Text",hint:"This field uses counter prop",label:"Regular"},null,8,["modelValue"])]),_:1}),e(n,{cols:"12"},{default:t(()=>[e(d,{modelValue:p(l),"onUpdate:modelValue":u[1]||(u[1]=i=>T(l)?l.value=i:null),rules:c,counter:"",maxlength:"25",placeholder:"Placeholder Text",hint:"This field uses maxlength attribute",label:"Limit exceeded"},null,8,["modelValue"])]),_:1})]),_:1})}}},X={};function Z(_,r){const l=b;return x(),h(C,null,{default:t(()=>[e(n,null,{default:t(()=>[e(l,{label:"Disabled",placeholder:"Placeholder Text",disabled:""})]),_:1}),e(n,{cols:"12"},{default:t(()=>[e(l,{placeholder:"Placeholder Text",label:"Readonly",readonly:""})]),_:1})]),_:1})}const ee=g(X,[["render",Z]]),le={};function te(_,r){return x(),h(C,null,{default:t(()=>[e(n,{cols:"12",md:"6"},{default:t(()=>[e(w,{label:"Outlined",variant:"outlined"})]),_:1}),e(n,{cols:"12",md:"6"},{default:t(()=>[e(w,{label:"Filled",variant:"filled"})]),_:1}),e(n,{cols:"12",md:"6"},{default:t(()=>[e(w,{label:"Solo",variant:"solo"})]),_:1}),e(n,{cols:"12",md:"6"},{default:t(()=>[e(w,{label:"Plain",variant:"plain"})]),_:1}),e(n,{cols:"12",md:"6"},{default:t(()=>[e(w,{label:"Underlined",variant:"underlined"})]),_:1})]),_:1})}const oe=g(le,[["render",te]]),ae={};function ne(_,r){const l=b;return x(),h(l,{label:"Compact",density:"compact",placeholder:"Placeholder Text"})}const re=g(ae,[["render",ne]]),se={};function ie(_,r){const l=b;return x(),h(l,{label:"Regular",placeholder:"Placeholder Text"})}const de=g(se,[["render",ie]]),pe={ts:`<template>
  <AppTextField
    label="Regular"
    placeholder="Placeholder Text"
  />
</template>
`,js:`<template>
  <AppTextField
    label="Regular"
    placeholder="Placeholder Text"
  />
</template>
`},ce={ts:`<template>
  <AppTextField
    placeholder="Placeholder Text"
    label="Regular"
    clearable
  />
</template>
`,js:`<template>
  <AppTextField
    placeholder="Placeholder Text"
    label="Regular"
    clearable
  />
</template>
`},ue={ts:`<script lang="ts" setup>
const title = ref('Preliminary report')
const description = ref('California is a state in the western United States')
const rules = [(v: string) => v.length <= 25 || 'Max 25 characters']
<\/script>

<template>
  <VRow>
    <VCol cols="12">
      <AppTextField
        v-model="title"
        :rules="rules"
        counter="25"
        placeholder="Placeholder Text"
        hint="This field uses counter prop"
        label="Regular"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        v-model="description"
        :rules="rules"
        counter
        maxlength="25"
        placeholder="Placeholder Text"
        hint="This field uses maxlength attribute"
        label="Limit exceeded"
      />
    </VCol>
  </VRow>
</template>
`,js:`<script setup>
const title = ref('Preliminary report')
const description = ref('California is a state in the western United States')
const rules = [v => v.length <= 25 || 'Max 25 characters']
<\/script>

<template>
  <VRow>
    <VCol cols="12">
      <AppTextField
        v-model="title"
        :rules="rules"
        counter="25"
        placeholder="Placeholder Text"
        hint="This field uses counter prop"
        label="Regular"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        v-model="description"
        :rules="rules"
        counter
        maxlength="25"
        placeholder="Placeholder Text"
        hint="This field uses maxlength attribute"
        label="Limit exceeded"
      />
    </VCol>
  </VRow>
</template>
`},me={ts:`<template>
  <AppTextField
    color="success"
    label="First name"
    placeholder="Placeholder Text"
  />
</template>
`,js:`<template>
  <AppTextField
    color="success"
    label="First name"
    placeholder="Placeholder Text"
  />
</template>
`},fe={ts:`<template>
  <AppTextField
    label="Compact"
    density="compact"
    placeholder="Placeholder Text"
  />
</template>
`,js:`<template>
  <AppTextField
    label="Compact"
    density="compact"
    placeholder="Placeholder Text"
  />
</template>
`},xe={ts:`<script lang="ts" setup>
const message = ref('Hey!')
const marker = ref(true)
const iconIndex = ref(0)

const toggleMarker = () => {
  marker.value = !marker.value
}

const clearMessage = () => {
  message.value = ''
}

const resetIcon = () => {
  iconIndex.value = 0
}

const sendMessage = () => {
  resetIcon()
  clearMessage()
}
<\/script>

<template>
  <AppTextField
    v-model="message"
    clearable
    type="text"
    label="Message"
    color="primary"
    placeholder="Hey!!"
    clear-icon="tabler-circle-x"
    :append-icon="message ? $vuetify.locale.isRtl ? 'tabler-arrow-big-left-lines' : 'tabler-arrow-big-right-lines' : 'tabler-microphone'"
    :append-inner-icon="marker ? 'tabler-map-pin' : 'tabler-map-pin-off'"
    @click:append-inner="toggleMarker"
    @click:append="sendMessage"
    @click:clear="clearMessage"
  />
</template>
`,js:`<script setup>
const message = ref('Hey!')
const marker = ref(true)
const iconIndex = ref(0)

const toggleMarker = () => {
  marker.value = !marker.value
}

const clearMessage = () => {
  message.value = ''
}

const resetIcon = () => {
  iconIndex.value = 0
}

const sendMessage = () => {
  resetIcon()
  clearMessage()
}
<\/script>

<template>
  <AppTextField
    v-model="message"
    clearable
    type="text"
    label="Message"
    color="primary"
    placeholder="Hey!!"
    clear-icon="tabler-circle-x"
    :append-icon="message ? $vuetify.locale.isRtl ? 'tabler-arrow-big-left-lines' : 'tabler-arrow-big-right-lines' : 'tabler-microphone'"
    :append-inner-icon="marker ? 'tabler-map-pin' : 'tabler-map-pin-off'"
    @click:append-inner="toggleMarker"
    @click:append="sendMessage"
    @click:clear="clearMessage"
  />
</template>
`},he={ts:`<template>
  <VRow>
    <VCol cols="12">
      <AppTextField
        label="Prepend"
        prepend-icon="tabler-map-pin"
        placeholder="Placeholder Text"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        label="Prepend Inner"
        prepend-inner-icon="tabler-map-pin"
        placeholder="Placeholder Text"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        label="Append"
        append-icon="tabler-map-pin"
        placeholder="Placeholder Text"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        label="Append Inner"
        append-inner-icon="tabler-map-pin"
        placeholder="Placeholder Text"
      />
    </VCol>
  </VRow>
</template>
`,js:`<template>
  <VRow>
    <VCol cols="12">
      <AppTextField
        label="Prepend"
        prepend-icon="tabler-map-pin"
        placeholder="Placeholder Text"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        label="Prepend Inner"
        prepend-inner-icon="tabler-map-pin"
        placeholder="Placeholder Text"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        label="Append"
        append-icon="tabler-map-pin"
        placeholder="Placeholder Text"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        label="Append Inner"
        append-inner-icon="tabler-map-pin"
        placeholder="Placeholder Text"
      />
    </VCol>
  </VRow>
</template>
`},_e={ts:`<script lang="ts" setup>
const show1 = ref(false)
const show2 = ref(true)
const password = ref('Password')
const confirmPassword = ref('wqfasds')

const rules = {
  required: (value: string) => !!value || 'Required.',
  min: (v: string) => v.length >= 8 || 'Min 8 characters',
}
<\/script>

<template>
  <VRow>
    <VCol
      cols="12"
      sm="6"
    >
      <AppTextField
        v-model="password"
        :append-inner-icon="show1 ? 'tabler-eye-off' : 'tabler-eye' "
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Normal with hint text"
        hint="At least 8 characters"
        placeholder="············"
        counter
        @click:append-inner="show1 = !show1"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <AppTextField
        v-model="confirmPassword"
        :rules="[rules.required, rules.min]"
        :append-inner-icon="show2 ? 'tabler-eye-off' : 'tabler-eye' "
        :type="show2 ? 'text' : 'password'"
        name="input-10-2"
        placeholder="············"
        label="Visible"
        hint="At least 8 characters"
        @click:append-inner="show2 = !show2"
      />
    </VCol>
  </VRow>
</template>
`,js:`<script setup>
const show1 = ref(false)
const show2 = ref(true)
const password = ref('Password')
const confirmPassword = ref('wqfasds')

const rules = {
  required: value => !!value || 'Required.',
  min: v => v.length >= 8 || 'Min 8 characters',
}
<\/script>

<template>
  <VRow>
    <VCol
      cols="12"
      sm="6"
    >
      <AppTextField
        v-model="password"
        :append-inner-icon="show1 ? 'tabler-eye-off' : 'tabler-eye' "
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Normal with hint text"
        hint="At least 8 characters"
        placeholder="············"
        counter
        @click:append-inner="show1 = !show1"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <AppTextField
        v-model="confirmPassword"
        :rules="[rules.required, rules.min]"
        :append-inner-icon="show2 ? 'tabler-eye-off' : 'tabler-eye' "
        :type="show2 ? 'text' : 'password'"
        name="input-10-2"
        placeholder="············"
        label="Visible"
        hint="At least 8 characters"
        @click:append-inner="show2 = !show2"
      />
    </VCol>
  </VRow>
</template>
`},be={ts:`<script setup lang="ts">
const amount = ref(10.05)
const weight = ref(28.02)
const email = ref('example')
const time = ref('04:56')
<\/script>

<template>
  <VRow>
    <VCol cols="12">
      <AppTextField
        v-model="amount"
        label="Amount"
        prefix="$"
        type="number"
        placeholder="10.05"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        v-model="weight"
        label="Weight"
        suffix="lbs"
        type="number"
        placeholder="28.02"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        v-model="email"
        label="Email address"
        suffix="@gmail.com"
        placeholder="example"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        v-model="time"
        label="Label Text"
        type="time"
        suffix="PST"
        placeholder="04:56"
      />
    </VCol>
  </VRow>
</template>
`,js:`<script setup>
const amount = ref(10.05)
const weight = ref(28.02)
const email = ref('example')
const time = ref('04:56')
<\/script>

<template>
  <VRow>
    <VCol cols="12">
      <AppTextField
        v-model="amount"
        label="Amount"
        prefix="$"
        type="number"
        placeholder="10.05"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        v-model="weight"
        label="Weight"
        suffix="lbs"
        type="number"
        placeholder="28.02"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        v-model="email"
        label="Email address"
        suffix="@gmail.com"
        placeholder="example"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        v-model="time"
        label="Label Text"
        type="time"
        suffix="PST"
        placeholder="04:56"
      />
    </VCol>
  </VRow>
</template>
`},Ve={ts:`<template>
  <AppTextField
    label="Regular"
    placeholder="Placeholder Text"
    single-line
  />
</template>
`,js:`<template>
  <AppTextField
    label="Regular"
    placeholder="Placeholder Text"
    single-line
  />
</template>
`},Te={ts:`<template>
  <VRow>
    <VCol>
      <AppTextField
        label="Disabled"
        placeholder="Placeholder Text"
        disabled
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        placeholder="Placeholder Text"
        label="Readonly"
        readonly
      />
    </VCol>
  </VRow>
</template>
`,js:`<template>
  <VRow>
    <VCol>
      <AppTextField
        label="Disabled"
        placeholder="Placeholder Text"
        disabled
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        placeholder="Placeholder Text"
        label="Readonly"
        readonly
      />
    </VCol>
  </VRow>
</template>
`},ge={ts:`<script lang="ts" setup>
const email = ref('')
<\/script>

<template>
  <VForm>
    <AppTextField
      v-model="email"
      :rules="[requiredValidator, emailValidator]"
      placeholder="johnedoe@email.com"
      label="E-mail"
    />
  </VForm>
</template>
`,js:`<script setup>
const email = ref('')
<\/script>

<template>
  <VForm>
    <AppTextField
      v-model="email"
      :rules="[requiredValidator, emailValidator]"
      placeholder="johnedoe@email.com"
      label="E-mail"
    />
  </VForm>
</template>
`},Ce={ts:`<template>
  <VRow>
    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        label="Outlined"
        variant="outlined"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        label="Filled"
        variant="filled"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        label="Solo"
        variant="solo"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        label="Plain"
        variant="plain"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        label="Underlined"
        variant="underlined"
      />
    </VCol>
  </VRow>
</template>
`,js:`<template>
  <VRow>
    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        label="Outlined"
        variant="outlined"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        label="Filled"
        variant="filled"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        label="Solo"
        variant="solo"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        label="Plain"
        variant="plain"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        label="Underlined"
        variant="underlined"
      />
    </VCol>
  </VRow>
</template>
`},ze={__name:"textfield",setup(_){return(r,l)=>{const c=de,s=D,u=re,d=oe,i=ee,m=Q,V=K,v=Y,F=W,A=H,y=L,P=j,R=q,k=U;return x(),h(C,{class:"match-height"},{default:t(()=>[e(n,{cols:"12",md:"6"},{default:t(()=>[e(s,{title:"Basic",code:pe},{default:t(()=>[l[0]||(l[0]=o("p",null,"Text fields components are used for collecting user provided information.",-1)),e(c)]),_:1},8,["code"])]),_:1}),e(n,{cols:"12",md:"6"},{default:t(()=>[e(s,{title:"Density",code:fe},{default:t(()=>[l[1]||(l[1]=o("p",null,[a("The "),o("code",null,"density"),a(" prop decreases the height of the text field based upon 1 of 3 levels of density; "),o("code",null,"default"),a(", "),o("code",null,"comfortable"),a(", and "),o("code",null,"compact"),a(".")],-1)),e(u)]),_:1},8,["code"])]),_:1}),e(n,{cols:"12"},{default:t(()=>[e(s,{title:"Variant",code:Ce},{default:t(()=>[l[2]||(l[2]=o("p",null,[a("Use "),o("code",null,"solo"),a(", "),o("code",null,"filled"),a(", "),o("code",null,"outlined"),a(", "),o("code",null,"plain"),a(" and "),o("code",null,"underlined"),a(" option of "),o("code",null,"variant"),a(" prop to change the look of the textfield. ")],-1)),e(d)]),_:1},8,["code"])]),_:1}),e(n,{cols:"12",md:"6"},{default:t(()=>[e(s,{title:"State",code:Te},{default:t(()=>[l[3]||(l[3]=o("p",null,"Text fields can be disabled or readonly.",-1)),e(i)]),_:1},8,["code"])]),_:1}),e(n,{cols:"12",md:"6"},{default:t(()=>[e(s,{title:"Counter",code:ue},{default:t(()=>[l[4]||(l[4]=o("p",null,[a("Use a "),o("code",null,"counter"),a(" prop to inform a user of the character limit.")],-1)),e(m)]),_:1},8,["code"])]),_:1}),e(n,{cols:"12",md:"6"},{default:t(()=>[e(s,{title:"Clearable",code:ce},{default:t(()=>[l[5]||(l[5]=o("p",null,"When clearable, you can customize the clear icon with clear-icon.",-1)),e(V)]),_:1},8,["code"])]),_:1}),e(n,{cols:"12",md:"6"},{default:t(()=>[e(s,{title:"Custom Colors",code:me},{default:t(()=>[l[6]||(l[6]=o("p",null,[a("Use "),o("code",null,"color"),a(" prop to change the input border color.")],-1)),e(v)]),_:1},8,["code"])]),_:1}),e(n,{cols:"12",md:"6"},{default:t(()=>[e(s,{title:"Icons",code:he},{default:t(()=>[l[7]||(l[7]=o("p",null,[a("You can add icons to the text field with "),o("code",null,"prepend-icon"),a(", "),o("code",null,"append-icon"),a(" and "),o("code",null,"append-inner-icon"),a(" and "),o("code",null,"prepend-inner-icon"),a(" props.")],-1)),e(F)]),_:1},8,["code"])]),_:1}),e(n,{cols:"12",md:"6"},{default:t(()=>[e(s,{title:"Prefixes and suffixes",code:be},{default:t(()=>[l[8]||(l[8]=o("p",null,[a("The "),o("code",null,"prefix"),a(" and "),o("code",null,"suffix"),a(" properties allows you to prepend and append inline non-modifiable text next to the text field.")],-1)),e(A)]),_:1},8,["code"])]),_:1}),e(n,{cols:"12",md:"6"},{default:t(()=>[e(s,{title:"Single line",code:Ve},{default:t(()=>[l[9]||(l[9]=o("p",null,[o("code",null,"single-line"),a(" text fields do not float their label on focus or with data.")],-1)),e(y)]),_:1},8,["code"])]),_:1}),e(n,{cols:"12",md:"6"},{default:t(()=>[e(s,{title:"Validation",code:ge},{default:t(()=>[l[10]||(l[10]=o("p",null,[a("Vuetify includes simple validation through the "),o("code",null,"rules"),a(" prop.")],-1)),e(P)]),_:1},8,["code"])]),_:1}),e(n,{cols:"12",md:"6"},{default:t(()=>[e(s,{title:"Icon events",code:xe},{default:t(()=>[l[11]||(l[11]=o("p",null,[o("code",null,"click:prepend"),a(", "),o("code",null,"click:append"),a(", "),o("code",null,"click:append-inner"),a(", and "),o("code",null,"click:clear"),a(" will be emitted when you click on the respective icon")],-1)),e(R)]),_:1},8,["code"])]),_:1}),e(n,{cols:"12",md:"6"},{default:t(()=>[e(s,{title:"Password input",code:_e},{default:t(()=>[l[12]||(l[12]=o("p",null,[a("Using the HTML input "),o("code",null,"type"),a(" password can be used with an appended icon and callback to control the visibility.")],-1)),e(k)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{ze as default};
