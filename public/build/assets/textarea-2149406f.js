import{_ as m,V as h}from"./AppTextarea-17f4cf4f.js";import{r as _,o as p,f as d,n as T,aU as w,e as o,b as e,d as a,v as t}from"./main-2161dd16.js";import{_ as x}from"./_plugin-vue_export-helper-c27b6911.js";import{V as r}from"./VCol-b6fcabf3.js";import{V}from"./VRow-cdbc520d.js";import{_ as y}from"./AppCardCode-1612e0cc.js";import"./form-2a954a63.js";/* empty css                   */import"./VCounter-3b8f1b94.js";import"./VImg-4ff19814.js";import"./VField-1461cc01.js";import"./easing-9f15041e.js";import"./VInput-1e0d7c59.js";import"./forwardRefs-8348545e.js";import"./VCard-79d2de72.js";import"./VAvatar-b27cc665.js";import"./VCardText-285783bc.js";import"./VDivider-d54b4fba.js";const k={__name:"DemoTextareaValidation",setup(i){const n=_("Hello!"),l=[c=>c.length<=25||"Max 25 characters"];return(c,s)=>{const u=m;return p(),d(u,{modelValue:T(n),"onUpdate:modelValue":s[0]||(s[0]=b=>w(n)?n.value=b:null),label:"Validation",rules:l,rows:"2",placeholder:"Placeholder Text"},null,8,["modelValue"])}}},$={__name:"DemoTextareaNoResize",setup(i){const n=_("Marshmallow tiramisu pie dessert gingerbread tart caramels marzipan oat cake. Muffin sesame snaps cupcake bonbon cookie tiramisu. Pudding biscuit gingerbread halvah lollipop jelly-o cookie.");return(l,c)=>{const s=m;return p(),d(s,{modelValue:T(n),"onUpdate:modelValue":c[0]||(c[0]=u=>w(n)?n.value=u:null),label:"Text","no-resize":"",rows:"2",placeholder:"Placeholder Text"},null,8,["modelValue"])}}},j={};function z(i,n){const l=m;return p(),d(V,null,{default:o(()=>[e(r,{cols:"12",sm:"6"},{default:o(()=>[e(l,{label:"One row","auto-grow":"",rows:"1","row-height":"15",placeholder:"Placeholder Text"})]),_:1}),e(r,{cols:"12",sm:"6"},{default:o(()=>[e(l,{"auto-grow":"",label:"Two rows",rows:"2",placeholder:"Placeholder Text","row-height":"20"})]),_:1}),e(r,{cols:"12",sm:"6"},{default:o(()=>[e(l,{label:"Three rows","auto-grow":"",rows:"3",placeholder:"Placeholder Text","row-height":"25"})]),_:1}),e(r,{cols:"12",sm:"6"},{default:o(()=>[e(l,{"auto-grow":"",label:"Four rows",placeholder:"Placeholder Text",rows:"4","row-height":"30"})]),_:1})]),_:1})}const H=x(j,[["render",z]]),U={};function M(i,n){const l=m;return p(),d(V,null,{default:o(()=>[e(r,{cols:"12"},{default:o(()=>[e(l,{label:"prepend-icon",rows:"1",placeholder:"Placeholder Text","prepend-icon":"tabler-message-2"})]),_:1}),e(r,{cols:"12"},{default:o(()=>[e(l,{"append-icon":"tabler-message-2",placeholder:"Placeholder Text",label:"append-icon",rows:"1"})]),_:1}),e(r,{cols:"12"},{default:o(()=>[e(l,{"prepend-inner-icon":"tabler-message-2",label:"prepend-inner-icon",placeholder:"Placeholder Text",rows:"1"})]),_:1}),e(r,{cols:"12"},{default:o(()=>[e(l,{"append-inner-icon":"tabler-message-2",label:"append-inner-icon",placeholder:"Placeholder Text",rows:"1"})]),_:1})]),_:1})}const B=x(U,[["render",M]]),G={__name:"DemoTextareaCounter",setup(i){const n=_("Hello!");return(l,c)=>{const s=m;return p(),d(s,{modelValue:T(n),"onUpdate:modelValue":c[0]||(c[0]=u=>w(n)?n.value=u:null),counter:"",label:"Text",placeholder:"Placeholder Text"},null,8,["modelValue"])}}},F={__name:"DemoTextareaClearable",setup(i){const n=_("This is clearable text.");return(l,c)=>{const s=m;return p(),d(s,{modelValue:T(n),"onUpdate:modelValue":c[0]||(c[0]=u=>w(n)?n.value=u:null),clearable:"","clear-icon":"tabler-circle-x",label:"Text",placeholder:"Placeholder Text"},null,8,["modelValue"])}}},N={};function O(i,n){const l=m;return p(),d(l,{autocomplete:"email",label:"Email",placeholder:"johndoe@email.com"})}const S=x(N,[["render",O]]),W={};function E(i,n){const l=m;return p(),d(V,null,{default:o(()=>[e(r,{cols:"12"},{default:o(()=>[e(l,{disabled:"",label:"Disabled",hint:"Hint text",placeholder:"Placeholder Text",rows:"2"})]),_:1}),e(r,{cols:"12"},{default:o(()=>[e(l,{readonly:"",rows:"2",label:"Readonly",placeholder:"Placeholder Text",hint:"Hint text"})]),_:1})]),_:1})}const I=x(W,[["render",E]]),Y={};function q(i,n){return p(),d(V,null,{default:o(()=>[e(r,{cols:"12",sm:"6"},{default:o(()=>[e(h,{label:"Default",rows:"2",placeholder:"Placeholder Text"})]),_:1}),e(r,{cols:"12",sm:"6"},{default:o(()=>[e(h,{label:"Solo",placeholder:"Placeholder Text",rows:"2",variant:"solo"})]),_:1}),e(r,{cols:"12",sm:"6"},{default:o(()=>[e(h,{label:"Filled",rows:"2",placeholder:"Placeholder Text",variant:"filled"})]),_:1}),e(r,{cols:"12",sm:"6"},{default:o(()=>[e(h,{label:"Outlined",rows:"2",placeholder:"Placeholder Text",variant:"outlined"})]),_:1}),e(r,{cols:"12",sm:"6"},{default:o(()=>[e(h,{label:"Underlined",rows:"2",placeholder:"Placeholder Text",variant:"underlined"})]),_:1}),e(r,{cols:"12",sm:"6"},{default:o(()=>[e(h,{label:"Plain",rows:"2",placeholder:"Placeholder Text",variant:"plain"})]),_:1})]),_:1})}const J=x(Y,[["render",q]]),K={__name:"DemoTextareaAutoGrow",setup(i){const n=_("The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.");return(l,c)=>{const s=m;return p(),d(s,{modelValue:T(n),"onUpdate:modelValue":c[0]||(c[0]=u=>w(n)?n.value=u:null),label:"Auto Grow",placeholder:"Placeholder Text","auto-grow":""},null,8,["modelValue"])}}},L={};function Q(i,n){const l=m;return p(),d(l,{label:"Default",placeholder:"Placeholder Text"})}const X=x(L,[["render",Q]]),Z={ts:`<script setup lang="ts">
const textareaValue = ref('The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.')
<\/script>

<template>
  <AppTextarea
    v-model="textareaValue"
    label="Auto Grow"
    placeholder="Placeholder Text"
    auto-grow
  />
</template>
`,js:`<script setup>
const textareaValue = ref('The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.')
<\/script>

<template>
  <AppTextarea
    v-model="textareaValue"
    label="Auto Grow"
    placeholder="Placeholder Text"
    auto-grow
  />
</template>
`},ee={ts:`<template>
  <AppTextarea
    label="Default"
    placeholder="Placeholder Text"
  />
</template>
`,js:`<template>
  <AppTextarea
    label="Default"
    placeholder="Placeholder Text"
  />
</template>
`},le={ts:`<template>
  <AppTextarea
    autocomplete="email"
    label="Email"
    placeholder="johndoe@email.com"
  />
</template>
`,js:`<template>
  <AppTextarea
    autocomplete="email"
    label="Email"
    placeholder="johndoe@email.com"
  />
</template>
`},oe={ts:`<script setup lang="ts">
const textareaValue = ref('This is clearable text.')
<\/script>

<template>
  <AppTextarea
    v-model="textareaValue"
    clearable
    clear-icon="tabler-circle-x"
    label="Text"
    placeholder="Placeholder Text"
  />
</template>
`,js:`<script setup>
const textareaValue = ref('This is clearable text.')
<\/script>

<template>
  <AppTextarea
    v-model="textareaValue"
    clearable
    clear-icon="tabler-circle-x"
    label="Text"
    placeholder="Placeholder Text"
  />
</template>
`},ae={ts:`<script lang="ts" setup>
const textareaValue = ref('Hello!')
<\/script>

<template>
  <AppTextarea
    v-model="textareaValue"
    counter
    label="Text"
    placeholder="Placeholder Text"
  />
</template>
`,js:`<script setup>
const textareaValue = ref('Hello!')
<\/script>

<template>
  <AppTextarea
    v-model="textareaValue"
    counter
    label="Text"
    placeholder="Placeholder Text"
  />
</template>
`},te={ts:`<template>
  <VRow>
    <VCol cols="12">
      <AppTextarea
        label="prepend-icon"
        rows="1"
        placeholder="Placeholder Text"
        prepend-icon="tabler-message-2"
      />
    </VCol>

    <VCol cols="12">
      <AppTextarea
        append-icon="tabler-message-2"
        placeholder="Placeholder Text"
        label="append-icon"
        rows="1"
      />
    </VCol>

    <VCol cols="12">
      <AppTextarea
        prepend-inner-icon="tabler-message-2"
        label="prepend-inner-icon"
        placeholder="Placeholder Text"
        rows="1"
      />
    </VCol>

    <VCol cols="12">
      <AppTextarea
        append-inner-icon="tabler-message-2"
        label="append-inner-icon"
        placeholder="Placeholder Text"
        rows="1"
      />
    </VCol>
  </VRow>
</template>
`,js:`<template>
  <VRow>
    <VCol cols="12">
      <AppTextarea
        label="prepend-icon"
        rows="1"
        placeholder="Placeholder Text"
        prepend-icon="tabler-message-2"
      />
    </VCol>

    <VCol cols="12">
      <AppTextarea
        append-icon="tabler-message-2"
        placeholder="Placeholder Text"
        label="append-icon"
        rows="1"
      />
    </VCol>

    <VCol cols="12">
      <AppTextarea
        prepend-inner-icon="tabler-message-2"
        label="prepend-inner-icon"
        placeholder="Placeholder Text"
        rows="1"
      />
    </VCol>

    <VCol cols="12">
      <AppTextarea
        append-inner-icon="tabler-message-2"
        label="append-inner-icon"
        placeholder="Placeholder Text"
        rows="1"
      />
    </VCol>
  </VRow>
</template>
`},re={ts:`<script lang="ts" setup>
const value = ref('Marshmallow tiramisu pie dessert gingerbread tart caramels marzipan oat cake. Muffin sesame snaps cupcake bonbon cookie tiramisu. Pudding biscuit gingerbread halvah lollipop jelly-o cookie.')
<\/script>

<template>
  <AppTextarea
    v-model="value"
    label="Text"
    no-resize
    rows="2"
    placeholder="Placeholder Text"
  />
</template>
`,js:`<script setup>
const value = ref('Marshmallow tiramisu pie dessert gingerbread tart caramels marzipan oat cake. Muffin sesame snaps cupcake bonbon cookie tiramisu. Pudding biscuit gingerbread halvah lollipop jelly-o cookie.')
<\/script>

<template>
  <AppTextarea
    v-model="value"
    label="Text"
    no-resize
    rows="2"
    placeholder="Placeholder Text"
  />
</template>
`},ne={ts:`<template>
  <VRow>
    <VCol
      cols="12"
      sm="6"
    >
      <AppTextarea
        label="One row"
        auto-grow
        rows="1"
        row-height="15"
        placeholder="Placeholder Text"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <AppTextarea
        auto-grow
        label="Two rows"
        rows="2"
        placeholder="Placeholder Text"
        row-height="20"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <AppTextarea
        label="Three rows"
        auto-grow
        rows="3"
        placeholder="Placeholder Text"
        row-height="25"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <AppTextarea
        auto-grow
        label="Four rows"
        placeholder="Placeholder Text"
        rows="4"
        row-height="30"
      />
    </VCol>
  </VRow>
</template>
`,js:`<template>
  <VRow>
    <VCol
      cols="12"
      sm="6"
    >
      <AppTextarea
        label="One row"
        auto-grow
        rows="1"
        row-height="15"
        placeholder="Placeholder Text"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <AppTextarea
        auto-grow
        label="Two rows"
        rows="2"
        placeholder="Placeholder Text"
        row-height="20"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <AppTextarea
        label="Three rows"
        auto-grow
        rows="3"
        placeholder="Placeholder Text"
        row-height="25"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <AppTextarea
        auto-grow
        label="Four rows"
        placeholder="Placeholder Text"
        rows="4"
        row-height="30"
      />
    </VCol>
  </VRow>
</template>
`},se={ts:`<template>
  <VRow>
    <VCol cols="12">
      <AppTextarea
        disabled
        label="Disabled"
        hint="Hint text"
        placeholder="Placeholder Text"
        rows="2"
      />
    </VCol>

    <VCol cols="12">
      <AppTextarea
        readonly
        rows="2"
        label="Readonly"
        placeholder="Placeholder Text"
        hint="Hint text"
      />
    </VCol>
  </VRow>
</template>
`,js:`<template>
  <VRow>
    <VCol cols="12">
      <AppTextarea
        disabled
        label="Disabled"
        hint="Hint text"
        placeholder="Placeholder Text"
        rows="2"
      />
    </VCol>

    <VCol cols="12">
      <AppTextarea
        readonly
        rows="2"
        label="Readonly"
        placeholder="Placeholder Text"
        hint="Hint text"
      />
    </VCol>
  </VRow>
</template>
`},ce={ts:`<script lang="ts" setup>
const textareaValue = ref('Hello!')
const rules = [(v: string) => v.length <= 25 || 'Max 25 characters']
<\/script>

<template>
  <AppTextarea
    v-model="textareaValue"
    label="Validation"
    :rules="rules"
    rows="2"
    placeholder="Placeholder Text"
  />
</template>
`,js:`<script setup>
const textareaValue = ref('Hello!')
const rules = [v => v.length <= 25 || 'Max 25 characters']
<\/script>

<template>
  <AppTextarea
    v-model="textareaValue"
    label="Validation"
    :rules="rules"
    rows="2"
    placeholder="Placeholder Text"
  />
</template>
`},pe={ts:`<template>
  <VRow>
    <VCol
      cols="12"
      sm="6"
    >
      <VTextarea
        label="Default"
        rows="2"
        placeholder="Placeholder Text"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VTextarea
        label="Solo"
        placeholder="Placeholder Text"
        rows="2"
        variant="solo"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VTextarea
        label="Filled"
        rows="2"
        placeholder="Placeholder Text"
        variant="filled"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VTextarea
        label="Outlined"
        rows="2"
        placeholder="Placeholder Text"
        variant="outlined"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VTextarea
        label="Underlined"
        rows="2"
        placeholder="Placeholder Text"
        variant="underlined"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VTextarea
        label="Plain"
        rows="2"
        placeholder="Placeholder Text"
        variant="plain"
      />
    </VCol>
  </VRow>
</template>
`,js:`<template>
  <VRow>
    <VCol
      cols="12"
      sm="6"
    >
      <VTextarea
        label="Default"
        rows="2"
        placeholder="Placeholder Text"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VTextarea
        label="Solo"
        placeholder="Placeholder Text"
        rows="2"
        variant="solo"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VTextarea
        label="Filled"
        rows="2"
        placeholder="Placeholder Text"
        variant="filled"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VTextarea
        label="Outlined"
        rows="2"
        placeholder="Placeholder Text"
        variant="outlined"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VTextarea
        label="Underlined"
        rows="2"
        placeholder="Placeholder Text"
        variant="underlined"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VTextarea
        label="Plain"
        rows="2"
        placeholder="Placeholder Text"
        variant="plain"
      />
    </VCol>
  </VRow>
</template>
`},De={__name:"textarea",setup(i){return(n,l)=>{const c=X,s=y,u=K,b=J,f=I,g=S,C=F,P=G,v=B,A=H,R=$,D=k;return p(),d(V,{class:"match-height"},{default:o(()=>[e(r,{cols:"12",md:"6"},{default:o(()=>[e(s,{title:"Basic",code:ee},{default:o(()=>[l[0]||(l[0]=a("p",null," v-textarea in its simplest form is a multi-line text-field, useful for larger amounts of text. ",-1)),e(c)]),_:1},8,["code"])]),_:1}),e(r,{cols:"12",md:"6"},{default:o(()=>[e(s,{title:"Auto Grow",code:Z},{default:o(()=>[l[1]||(l[1]=a("p",null,[t("When using the "),a("code",null,"auto-grow"),t(" prop, textarea's will automatically increase in size when the contained text exceeds its size.")],-1)),e(u)]),_:1},8,["code"])]),_:1}),e(r,{cols:"12"},{default:o(()=>[e(s,{title:"Variant",code:pe},{default:o(()=>[l[2]||(l[2]=a("p",null,[t("Use "),a("code",null,"filled"),t(", "),a("code",null,"plain"),t(", "),a("code",null,"outlined"),t(", "),a("code",null,"solo"),t(" and "),a("code",null,"underlined"),t(" option of "),a("code",null,"variant"),t(" prop to change the look of file input.")],-1)),e(b)]),_:1},8,["code"])]),_:1}),e(r,{cols:"12",md:"6"},{default:o(()=>[e(s,{title:"States",code:se},{default:o(()=>[l[3]||(l[3]=a("p",null,[t("Use "),a("code",null,"disabled"),t(" and "),a("code",null,"readonly"),t(" prop to change the state of textarea.")],-1)),e(f)]),_:1},8,["code"])]),_:1}),e(r,{cols:"12",md:"6"},{default:o(()=>[e(s,{title:"Browser autocomplete",code:le},{default:o(()=>[l[4]||(l[4]=a("p",null,[t(" The "),a("code",null,"autocomplete"),t(" prop gives you the option to enable the browser to predict user input. ")],-1)),e(g)]),_:1},8,["code"])]),_:1}),e(r,{cols:"12",md:"6"},{default:o(()=>[e(s,{title:"Clearable",code:oe},{default:o(()=>[l[5]||(l[5]=a("p",null,[t("You can clear the text from a "),a("code",null,"v-textarea"),t(" by using the "),a("code",null,"clearable"),t(" prop, and customize the icon used with the "),a("code",null,"clearable-icon"),t(" prop.")],-1)),e(C)]),_:1},8,["code"])]),_:1}),e(r,{cols:"12",md:"6"},{default:o(()=>[e(s,{title:"Counter",code:ae},{default:o(()=>[l[6]||(l[6]=a("p",null,[t(" The "),a("code",null,"counter"),t(" prop informs the user of a character limit for the "),a("code",null,"v-textarea"),t(". ")],-1)),e(P)]),_:1},8,["code"])]),_:1}),e(r,{cols:"12",md:"6"},{default:o(()=>[e(s,{title:"Icons",code:te},{default:o(()=>[l[7]||(l[7]=a("p",null,[t("The "),a("code",null,"append-icon"),t(", "),a("code",null,"prepend-icon"),t(", "),a("code",null,"append-inner-icon"),t(" and "),a("code",null,"prepend-inner-icon"),t(" props help add context to v-textarea.")],-1)),e(v)]),_:1},8,["code"])]),_:1}),e(r,{cols:"12",md:"6"},{default:o(()=>[e(s,{title:"Rows",code:ne},{default:o(()=>[l[8]||(l[8]=a("p",null,[t("The "),a("code",null,"rows"),t(" prop allows you to define how many rows the textarea has, when combined with the "),a("code",null,"row-height"),t(" prop you can further customize your rows by defining their height.")],-1)),e(A)]),_:1},8,["code"])]),_:1}),e(r,{cols:"12",md:"6"},{default:o(()=>[e(s,{title:"No resize",code:re},{default:o(()=>[l[9]||(l[9]=a("p",null,[a("code",null,"v-textarea"),t("'s have the option to remain the same size regardless of their content's size, using the "),a("code",null,"no-resize"),t(" prop.")],-1)),e(R)]),_:1},8,["code"])]),_:1}),e(r,{cols:"12",md:"6"},{default:o(()=>[e(s,{title:"Validation",code:ce},{default:o(()=>[l[10]||(l[10]=a("p",null,[t("Use "),a("code",null,"rules"),t(" prop to validate the textarea.")],-1)),e(D)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{De as default};
