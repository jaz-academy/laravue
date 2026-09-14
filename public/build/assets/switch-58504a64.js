import{q as r,O,D as y,E as S}from"./vendor-vuetify-68686ea1.js";import{r as m,k as w,l as v,E as t,z as n,D as p,a1 as f,a2 as d,X as c,q as o,Z as L,F as b,m as D}from"./vendor-core-cfb14039.js";import{_ as $}from"./AppCardCode-1f900ff7.js";import"./vendor-charts-7115819c.js";import"./main-03bc2ec2.js";import"./vendor-vueuse-34674e05.js";import"./vendor-pdf-d7f39922.js";const U={class:"demo-space-x"},C={__name:"DemoSwitchStates",setup(h){const l=m("on"),e=m("on"),i=m("on");return(s,a)=>(w(),v("div",U,[t(r,{modelValue:n(l),"onUpdate:modelValue":a[0]||(a[0]=u=>p(l)?l.value=u:null),value:"on",label:"On"},null,8,["modelValue"]),t(r,{label:"Off"}),t(r,{modelValue:n(e),"onUpdate:modelValue":a[1]||(a[1]=u=>p(e)?e.value=u:null),value:"on",disabled:"",label:"On disabled"},null,8,["modelValue"]),t(r,{disabled:"",label:"Off disabled"}),t(r,{modelValue:n(i),"onUpdate:modelValue":a[2]||(a[2]=u=>p(i)?i.value=u:null),loading:"warning",value:"on",label:"On loading"},null,8,["modelValue"]),t(r,{loading:"warning",label:"Off loading"})]))}},T={class:"demo-space-x"},J={__name:"DemoSwitchTrueAndFalseValue",setup(h){const l=m(1),e=m("Show");return(i,s)=>(w(),v("div",T,[t(r,{modelValue:n(l),"onUpdate:modelValue":s[0]||(s[0]=a=>p(l)?l.value=a:null),label:n(l).toString(),"true-value":1,"false-value":0},null,8,["modelValue","label"]),t(r,{modelValue:n(e),"onUpdate:modelValue":s[1]||(s[1]=a=>p(e)?e.value=a:null),label:n(e).toString(),"true-value":"Show","false-value":"Hide"},null,8,["modelValue","label"])]))}},A={__name:"DemoSwitchLabelSlot",setup(h){const l=m(!1);return(e,i)=>(w(),f(r,{modelValue:n(l),"onUpdate:modelValue":i[0]||(i[0]=s=>p(l)?l.value=s:null)},{label:d(()=>[i[1]||(i[1]=c(" Turn on the progress: ")),t(O,{indeterminate:n(l),class:"ms-2"},null,8,["indeterminate"])]),_:1},8,["modelValue"]))}},F={class:"demo-space-x"},M={class:"mt-2 mb-0"},E={__name:"DemoSwitchModelAsArray",setup(h){const l=m(["John"]);return(e,i)=>(w(),v(b,null,[o("div",F,[t(r,{modelValue:n(l),"onUpdate:modelValue":i[0]||(i[0]=s=>p(l)?l.value=s:null),label:"John",value:"John"},null,8,["modelValue"]),t(r,{modelValue:n(l),"onUpdate:modelValue":i[1]||(i[1]=s=>p(l)?l.value=s:null),label:"Jacob",value:"Jacob"},null,8,["modelValue"])]),o("p",M,L(n(l)),1)],64))}},I={class:"demo-space-x"},P={__name:"DemoSwitchColors",setup(h){const l=m(["Primary","Secondary","Success","Info","Warning","Error"]),e=m(["Primary","Secondary","Success","Info","Warning","Error"]);return(i,s)=>(w(),v("div",I,[(w(!0),v(b,null,D(n(e),a=>(w(),f(r,{key:a,modelValue:n(l),"onUpdate:modelValue":s[0]||(s[0]=u=>p(l)?l.value=u:null),label:a,value:a,color:a.toLowerCase()},null,8,["modelValue","label","value","color"]))),128))]))}},z={class:"demo-space-x"},j={__name:"DemoSwitchInset",setup(h){const l=m(!0),e=m(!1);return(i,s)=>(w(),v("div",z,[t(r,{modelValue:n(l),"onUpdate:modelValue":s[0]||(s[0]=a=>p(l)?l.value=a:null),inset:!1,label:`Switch 1: ${n(l).toString()}`},null,8,["modelValue","label"]),t(r,{modelValue:n(e),"onUpdate:modelValue":s[1]||(s[1]=a=>p(e)?e.value=a:null),inset:!1,label:`Switch 2: ${n(e).toString()}`},null,8,["modelValue","label"])]))}},k={class:"demo-space-x"},B={__name:"DemoSwitchBasic",setup(h){const l=m(!0),e=m(!1),i=s=>{const a=s.toString();return a.charAt(0).toUpperCase()+a.slice(1)};return(s,a)=>(w(),v("div",k,[t(r,{modelValue:n(l),"onUpdate:modelValue":a[0]||(a[0]=u=>p(l)?l.value=u:null),label:i(n(l))},null,8,["modelValue","label"]),t(r,{modelValue:n(e),"onUpdate:modelValue":a[1]||(a[1]=u=>p(e)?e.value=u:null),label:i(n(e))},null,8,["modelValue","label"])]))}},W={ts:`<script lang="ts" setup>
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
`},q={ts:`<script lang="ts" setup>
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
`},R={ts:`<script lang="ts" setup>
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
`},X={ts:`<script setup lang="ts">
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
`},Z={ts:`<script lang="ts" setup>
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
`},se={__name:"switch",setup(h){return(l,e)=>{const i=B,s=$,a=j,u=P,g=E,V=A,_=J,x=C;return w(),f(y,null,{default:d(()=>[t(S,{cols:"12",md:"6"},{default:d(()=>[t(s,{title:"Basic",code:W},{default:d(()=>[e[0]||(e[0]=o("p",null,[c("A "),o("code",null,"v-switch"),c(" in its simplest form provides a toggle between 2 values.")],-1)),t(i)]),_:1},8,["code"])]),_:1}),t(S,{cols:"12",md:"6"},{default:d(()=>[t(s,{title:"Inset",code:N},{default:d(()=>[e[1]||(e[1]=o("p",null,[c("To change the default "),o("code",null,"inset"),c(" switch, simply modify the inset prop to a "),o("code",null,"false"),c(" value.")],-1)),t(a)]),_:1},8,["code"])]),_:1}),t(S,{cols:"12",md:"6"},{default:d(()=>[t(s,{title:"Colors",code:H},{default:d(()=>[e[2]||(e[2]=o("p",null,[c("Switches can be colored by using any of the builtin colors and contextual names using the "),o("code",null,"color"),c(" prop.")],-1)),t(u)]),_:1},8,["code"])]),_:1}),t(S,{cols:"12",md:"6"},{default:d(()=>[t(s,{title:"Model as array",code:R},{default:d(()=>[e[3]||(e[3]=o("p",null,[c("Multiple "),o("code",null,"v-switch"),c("'s can share the same "),o("code",null,"v-model"),c(" by using an array.")],-1)),t(g)]),_:1},8,["code"])]),_:1}),t(S,{cols:"12",md:"6"},{default:d(()=>[t(s,{title:"Label slot",code:q},{default:d(()=>[e[4]||(e[4]=o("p",null,[c("Switch labels can be defined in "),o("code",null,"label"),c(" slot - that will allow to use HTML content.")],-1)),t(V)]),_:1},8,["code"])]),_:1}),t(S,{cols:"12",md:"6"},{default:d(()=>[t(s,{title:"True and False Value",code:Z},{default:d(()=>[e[5]||(e[5]=o("p",null,[c(" Use "),o("code",null,"false-value"),c(" and "),o("code",null,"true-value"),c(" prop to sets value for truthy and falsy state ")],-1)),t(_)]),_:1},8,["code"])]),_:1}),t(S,{cols:"12",md:"6"},{default:d(()=>[t(s,{title:"States",code:X},{default:d(()=>[e[6]||(e[6]=o("p",null,[o("code",null,"v-switch"),c(" can have different states such as "),o("code",null,"default"),c(", "),o("code",null,"disabled"),c(", and "),o("code",null,"loading"),c(".")],-1)),t(x)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{se as default};
