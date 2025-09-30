import{V as d}from"./VSwitch-87132e29.js";import{r as m,o as w,c as v,b as t,n,aU as p,f,e as r,v as c,bO as O,d as a,x as y,F as b,i as L}from"./main-ee7c17de.js";import{_ as D}from"./AppCardCode-a5069f70.js";import{V as $}from"./VRow-271260dd.js";import{V as S}from"./VCol-cfb71e73.js";import"./VInput-29651115.js";import"./form-baa91886.js";import"./VImg-d487f910.js";import"./VSelectionControl-fc422a63.js";import"./VCard-cba44afa.js";import"./VAvatar-4667946e.js";import"./VCardText-6be2f581.js";import"./VDivider-5a8f189b.js";const U={class:"demo-space-x"},C={__name:"DemoSwitchStates",setup(h){const l=m("on"),e=m("on"),i=m("on");return(s,o)=>(w(),v("div",U,[t(d,{modelValue:n(l),"onUpdate:modelValue":o[0]||(o[0]=u=>p(l)?l.value=u:null),value:"on",label:"On"},null,8,["modelValue"]),t(d,{label:"Off"}),t(d,{modelValue:n(e),"onUpdate:modelValue":o[1]||(o[1]=u=>p(e)?e.value=u:null),value:"on",disabled:"",label:"On disabled"},null,8,["modelValue"]),t(d,{disabled:"",label:"Off disabled"}),t(d,{modelValue:n(i),"onUpdate:modelValue":o[2]||(o[2]=u=>p(i)?i.value=u:null),loading:"warning",value:"on",label:"On loading"},null,8,["modelValue"]),t(d,{loading:"warning",label:"Off loading"})]))}},T={class:"demo-space-x"},J={__name:"DemoSwitchTrueAndFalseValue",setup(h){const l=m(1),e=m("Show");return(i,s)=>(w(),v("div",T,[t(d,{modelValue:n(l),"onUpdate:modelValue":s[0]||(s[0]=o=>p(l)?l.value=o:null),label:n(l).toString(),"true-value":1,"false-value":0},null,8,["modelValue","label"]),t(d,{modelValue:n(e),"onUpdate:modelValue":s[1]||(s[1]=o=>p(e)?e.value=o:null),label:n(e).toString(),"true-value":"Show","false-value":"Hide"},null,8,["modelValue","label"])]))}},A={__name:"DemoSwitchLabelSlot",setup(h){const l=m(!1);return(e,i)=>(w(),f(d,{modelValue:n(l),"onUpdate:modelValue":i[0]||(i[0]=s=>p(l)?l.value=s:null)},{label:r(()=>[i[1]||(i[1]=c(" Turn on the progress: ")),t(O,{indeterminate:n(l),class:"ms-2"},null,8,["indeterminate"])]),_:1},8,["modelValue"]))}},F={class:"demo-space-x"},M={class:"mt-2 mb-0"},I={__name:"DemoSwitchModelAsArray",setup(h){const l=m(["John"]);return(e,i)=>(w(),v(b,null,[a("div",F,[t(d,{modelValue:n(l),"onUpdate:modelValue":i[0]||(i[0]=s=>p(l)?l.value=s:null),label:"John",value:"John"},null,8,["modelValue"]),t(d,{modelValue:n(l),"onUpdate:modelValue":i[1]||(i[1]=s=>p(l)?l.value=s:null),label:"Jacob",value:"Jacob"},null,8,["modelValue"])]),a("p",M,y(n(l)),1)],64))}},P={class:"demo-space-x"},j={__name:"DemoSwitchColors",setup(h){const l=m(["Primary","Secondary","Success","Info","Warning","Error"]),e=m(["Primary","Secondary","Success","Info","Warning","Error"]);return(i,s)=>(w(),v("div",P,[(w(!0),v(b,null,L(n(e),o=>(w(),f(d,{key:o,modelValue:n(l),"onUpdate:modelValue":s[0]||(s[0]=u=>p(l)?l.value=u:null),label:o,value:o,color:o.toLowerCase()},null,8,["modelValue","label","value","color"]))),128))]))}},z={class:"demo-space-x"},B={__name:"DemoSwitchInset",setup(h){const l=m(!0),e=m(!1);return(i,s)=>(w(),v("div",z,[t(d,{modelValue:n(l),"onUpdate:modelValue":s[0]||(s[0]=o=>p(l)?l.value=o:null),inset:!1,label:`Switch 1: ${n(l).toString()}`},null,8,["modelValue","label"]),t(d,{modelValue:n(e),"onUpdate:modelValue":s[1]||(s[1]=o=>p(e)?e.value=o:null),inset:!1,label:`Switch 2: ${n(e).toString()}`},null,8,["modelValue","label"])]))}},E={class:"demo-space-x"},k={__name:"DemoSwitchBasic",setup(h){const l=m(!0),e=m(!1),i=s=>{const o=s.toString();return o.charAt(0).toUpperCase()+o.slice(1)};return(s,o)=>(w(),v("div",E,[t(d,{modelValue:n(l),"onUpdate:modelValue":o[0]||(o[0]=u=>p(l)?l.value=u:null),label:i(n(l))},null,8,["modelValue","label"]),t(d,{modelValue:n(e),"onUpdate:modelValue":o[1]||(o[1]=u=>p(e)?e.value=u:null),label:i(n(e))},null,8,["modelValue","label"])]))}},W={ts:`<script lang="ts" setup>
const toggleSwitch = ref(true)
const toggleFalseSwitch = ref(false)

const capitalizedLabel = (label: boolean) => {
  const convertLabelText = label.toString()

  return convertLabelText.charAt(0).toUpperCase() + convertLabelText.slice(1)
}
<\/script>

<template>
  <div class="demo-space-x">
    <VSwitch
      v-model="toggleSwitch"
      :label="capitalizedLabel(toggleSwitch)"
    />

    <VSwitch
      v-model="toggleFalseSwitch"
      :label="capitalizedLabel(toggleFalseSwitch)"
    />
  </div>
</template>
`,js:`<script setup>
const toggleSwitch = ref(true)
const toggleFalseSwitch = ref(false)

const capitalizedLabel = label => {
  const convertLabelText = label.toString()
  
  return convertLabelText.charAt(0).toUpperCase() + convertLabelText.slice(1)
}
<\/script>

<template>
  <div class="demo-space-x">
    <VSwitch
      v-model="toggleSwitch"
      :label="capitalizedLabel(toggleSwitch)"
    />

    <VSwitch
      v-model="toggleFalseSwitch"
      :label="capitalizedLabel(toggleFalseSwitch)"
    />
  </div>
</template>
`},H={ts:`<script lang="ts" setup>
const selectedSwitch = ref(['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Error'])
const switches = ref(['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Error'])
<\/script>

<template>
  <div class="demo-space-x">
    <VSwitch
      v-for="item in switches"
      :key="item"
      v-model="selectedSwitch"
      :label="item"
      :value="item"
      :color="item.toLowerCase()"
    />
  </div>
</template>
`,js:`<script setup>
const selectedSwitch = ref([
  'Primary',
  'Secondary',
  'Success',
  'Info',
  'Warning',
  'Error',
])

const switches = ref([
  'Primary',
  'Secondary',
  'Success',
  'Info',
  'Warning',
  'Error',
])
<\/script>

<template>
  <div class="demo-space-x">
    <VSwitch
      v-for="item in switches"
      :key="item"
      v-model="selectedSwitch"
      :label="item"
      :value="item"
      :color="item.toLowerCase()"
    />
  </div>
</template>
`},N={ts:`<script lang="ts" setup>
const insetSwitch1 = ref(true)
const insetSwitch2 = ref(false)
<\/script>

<template>
  <div class="demo-space-x">
    <VSwitch
      v-model="insetSwitch1"
      :inset="false"
      :label="\`Switch 1: \${insetSwitch1.toString()}\`"
    />
    <VSwitch
      v-model="insetSwitch2"
      :inset="false"
      :label="\`Switch 2: \${insetSwitch2.toString()}\`"
    />
  </div>
</template>
`,js:`<script setup>
const insetSwitch1 = ref(true)
const insetSwitch2 = ref(false)
<\/script>

<template>
  <div class="demo-space-x">
    <VSwitch
      v-model="insetSwitch1"
      :inset="false"
      :label="\`Switch 1: \${insetSwitch1.toString()}\`"
    />
    <VSwitch
      v-model="insetSwitch2"
      :inset="false"
      :label="\`Switch 2: \${insetSwitch2.toString()}\`"
    />
  </div>
</template>
`},R={ts:`<script lang="ts" setup>
const switchMe = ref(false)
<\/script>

<template>
  <VSwitch v-model="switchMe">
    <template #label>
      Turn on the progress: <VProgressCircular
        :indeterminate="switchMe"
        class="ms-2"
      />
    </template>
  </VSwitch>
</template>
`,js:`<script setup>
const switchMe = ref(false)
<\/script>

<template>
  <VSwitch v-model="switchMe">
    <template #label>
      Turn on the progress: <VProgressCircular
        :indeterminate="switchMe"
        class="ms-2"
      />
    </template>
  </VSwitch>
</template>
`},q={ts:`<script lang="ts" setup>
const people = ref(['John'])
<\/script>

<template>
  <div class="demo-space-x">
    <VSwitch
      v-model="people"
      label="John"
      value="John"
    />

    <VSwitch
      v-model="people"
      label="Jacob"
      value="Jacob"
    />
  </div>

  <p class="mt-2 mb-0">
    {{ people }}
  </p>
</template>
`,js:`<script setup>
const people = ref(['John'])
<\/script>

<template>
  <div class="demo-space-x">
    <VSwitch
      v-model="people"
      label="John"
      value="John"
    />

    <VSwitch
      v-model="people"
      label="Jacob"
      value="Jacob"
    />
  </div>

  <p class="mt-2 mb-0">
    {{ people }}
  </p>
</template>
`},G={ts:`<script setup lang="ts">
const switchOn = ref('on')
const switchOnDisabled = ref('on')
const switchOnLoading = ref('on')
<\/script>

<template>
  <div class="demo-space-x">
    <VSwitch
      v-model="switchOn"
      value="on"
      label="On"
    />

    <VSwitch label="Off" />

    <VSwitch
      v-model="switchOnDisabled"
      value="on"
      disabled
      label="On disabled"
    />

    <VSwitch
      disabled
      label="Off disabled"
    />

    <VSwitch
      v-model="switchOnLoading"
      loading="warning"
      value="on"
      label="On loading"
    />

    <VSwitch
      loading="warning"
      label="Off loading"
    />
  </div>
</template>
`,js:`<script setup>
const switchOn = ref('on')
const switchOnDisabled = ref('on')
const switchOnLoading = ref('on')
<\/script>

<template>
  <div class="demo-space-x">
    <VSwitch
      v-model="switchOn"
      value="on"
      label="On"
    />

    <VSwitch label="Off" />

    <VSwitch
      v-model="switchOnDisabled"
      value="on"
      disabled
      label="On disabled"
    />

    <VSwitch
      disabled
      label="Off disabled"
    />

    <VSwitch
      v-model="switchOnLoading"
      loading="warning"
      value="on"
      label="On loading"
    />

    <VSwitch
      loading="warning"
      label="Off loading"
    />
  </div>
</template>
`},K={ts:`<script lang="ts" setup>
const switch1 = ref(1)
const switch2 = ref('Show')
<\/script>

<template>
  <div class="demo-space-x">
    <VSwitch
      v-model="switch1"
      :label="switch1.toString()"
      :true-value="1"
      :false-value="0"
    />

    <VSwitch
      v-model="switch2"
      :label="switch2.toString()"
      true-value="Show"
      false-value="Hide"
    />
  </div>
</template>
`,js:`<script setup>
const switch1 = ref(1)
const switch2 = ref('Show')
<\/script>

<template>
  <div class="demo-space-x">
    <VSwitch
      v-model="switch1"
      :label="switch1.toString()"
      :true-value="1"
      :false-value="0"
    />

    <VSwitch
      v-model="switch2"
      :label="switch2.toString()"
      true-value="Show"
      false-value="Hide"
    />
  </div>
</template>
`},re={__name:"switch",setup(h){return(l,e)=>{const i=k,s=D,o=B,u=j,g=I,V=A,_=J,x=C;return w(),f($,null,{default:r(()=>[t(S,{cols:"12",md:"6"},{default:r(()=>[t(s,{title:"Basic",code:W},{default:r(()=>[e[0]||(e[0]=a("p",null,[c("A "),a("code",null,"v-switch"),c(" in its simplest form provides a toggle between 2 values.")],-1)),t(i)]),_:1},8,["code"])]),_:1}),t(S,{cols:"12",md:"6"},{default:r(()=>[t(s,{title:"Inset",code:N},{default:r(()=>[e[1]||(e[1]=a("p",null,[c("To change the default "),a("code",null,"inset"),c(" switch, simply modify the inset prop to a "),a("code",null,"false"),c(" value.")],-1)),t(o)]),_:1},8,["code"])]),_:1}),t(S,{cols:"12",md:"6"},{default:r(()=>[t(s,{title:"Colors",code:H},{default:r(()=>[e[2]||(e[2]=a("p",null,[c("Switches can be colored by using any of the builtin colors and contextual names using the "),a("code",null,"color"),c(" prop.")],-1)),t(u)]),_:1},8,["code"])]),_:1}),t(S,{cols:"12",md:"6"},{default:r(()=>[t(s,{title:"Model as array",code:q},{default:r(()=>[e[3]||(e[3]=a("p",null,[c("Multiple "),a("code",null,"v-switch"),c("'s can share the same "),a("code",null,"v-model"),c(" by using an array.")],-1)),t(g)]),_:1},8,["code"])]),_:1}),t(S,{cols:"12",md:"6"},{default:r(()=>[t(s,{title:"Label slot",code:R},{default:r(()=>[e[4]||(e[4]=a("p",null,[c("Switch labels can be defined in "),a("code",null,"label"),c(" slot - that will allow to use HTML content.")],-1)),t(V)]),_:1},8,["code"])]),_:1}),t(S,{cols:"12",md:"6"},{default:r(()=>[t(s,{title:"True and False Value",code:K},{default:r(()=>[e[5]||(e[5]=a("p",null,[c(" Use "),a("code",null,"false-value"),c(" and "),a("code",null,"true-value"),c(" prop to sets value for truthy and falsy state ")],-1)),t(_)]),_:1},8,["code"])]),_:1}),t(S,{cols:"12",md:"6"},{default:r(()=>[t(s,{title:"States",code:G},{default:r(()=>[e[6]||(e[6]=a("p",null,[a("code",null,"v-switch"),c(" can have different states such as "),a("code",null,"default"),c(", "),a("code",null,"disabled"),c(", and "),a("code",null,"loading"),c(".")],-1)),t(x)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{re as default};
