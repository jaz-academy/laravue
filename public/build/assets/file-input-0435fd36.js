import{m as ce,f as pe,V as re}from"./VField-eef30866.js";import{m as de,V as G}from"./VInput-5d1e9d15.js";import{u as me}from"./form-41eb478e.js";import{f as fe}from"./forwardRefs-8348545e.js";import{a1 as _e,ct as ve,aw as Ve,bu as Fe,aG as be,a5 as g,e_ as W,r as I,w as q,a9 as ge,bR as he,b as e,s as N,F as x,aY as Ie,cD as ye,o as r,f as d,n as U,aU as H,e as a,c as Ce,i as we,v as o,x as ze,d as n}from"./main-7a04a4cc.js";import{V as J}from"./VChip-6b0b1728.js";import{V as ke}from"./VCounter-9d080591.js";import{_ as V}from"./_plugin-vue_export-helper-c27b6911.js";import{V as c}from"./VCol-3541d7c7.js";import{V as K}from"./VRow-9ddfb65a.js";import{_ as Se}from"./AppCardCode-46f18f59.js";import"./easing-9f15041e.js";import"./VImg-785fe2da.js";import"./VAvatar-a8f8d7de.js";import"./VCard-c1d86edf.js";import"./VCardText-89ccd074.js";import"./VDivider-cd55d271.js";const $e=_e({chips:Boolean,counter:Boolean,counterSizeString:{type:String,default:"$vuetify.fileInput.counterSize"},counterString:{type:String,default:"$vuetify.fileInput.counter"},multiple:Boolean,showSize:{type:[Boolean,Number],default:!1,validator:l=>typeof l=="boolean"||[1e3,1024].includes(l)},...de({prependIcon:"$file"}),modelValue:{type:Array,default:()=>[],validator:l=>ve(l).every(s=>s!=null&&typeof s=="object")},...ce({clearable:!0})},"VFileInput"),p=Ve()({name:"VFileInput",inheritAttrs:!1,props:$e(),emits:{"click:control":l=>!0,"mousedown:control":l=>!0,"update:focused":l=>!0,"update:modelValue":l=>!0},setup(l,s){let{attrs:t,emit:_,slots:i}=s;const{t:v}=Fe(),f=be(l,"modelValue"),{isFocused:h,focus:A,blur:j}=me(l),k=g(()=>typeof l.showSize!="boolean"?l.showSize:void 0),S=g(()=>(f.value??[]).reduce((u,m)=>{let{size:C=0}=m;return u+C},0)),$=g(()=>W(S.value,k.value)),y=g(()=>(f.value??[]).map(u=>{const{name:m="",size:C=0}=u;return l.showSize?`${m} (${W(C,k.value)})`:m})),B=g(()=>{var m;const u=((m=f.value)==null?void 0:m.length)??0;return l.showSize?v(l.counterSizeString,u,$.value):v(l.counterString,u)}),D=I(),L=I(),b=I(),Q=g(()=>h.value||l.active),M=g(()=>["plain","underlined"].includes(l.variant));function R(){var u;b.value!==document.activeElement&&((u=b.value)==null||u.focus()),h.value||A()}function X(u){T(u)}function Z(u){_("mousedown:control",u)}function T(u){var m;(m=b.value)==null||m.click(),_("click:control",u)}function ee(u){u.stopPropagation(),R(),Ie(()=>{f.value=[],ye(l["onClick:clear"],u)})}return q(f,u=>{(!Array.isArray(u)||!u.length)&&b.value&&(b.value.value="")}),ge(()=>{const u=!!(i.counter||l.counter),m=!!(u||i.details),[C,le]=he(t),[{modelValue:Fl,...te}]=G.filterProps(l),[ne]=pe(l);return e(G,N({ref:D,modelValue:f.value,"onUpdate:modelValue":w=>f.value=w,class:["v-file-input",{"v-text-field--plain-underlined":M.value},l.class],style:l.style,"onClick:prepend":X},C,te,{centerAffix:!M.value,focused:h.value}),{...i,default:w=>{let{id:P,isDisabled:z,isDirty:O,isReadonly:E,isValid:oe}=w;return e(re,N({ref:L,"prepend-icon":l.prependIcon,onMousedown:Z,onClick:T,"onClick:clear":ee,"onClick:prependInner":l["onClick:prependInner"],"onClick:appendInner":l["onClick:appendInner"]},ne,{id:P.value,active:Q.value||O.value,dirty:O.value,disabled:z.value,focused:h.value,error:oe.value===!1}),{...i,default:ae=>{var Y;let{props:{class:ie,...se}}=ae;return e(x,null,[e("input",N({ref:b,type:"file",readonly:E.value,disabled:z.value,multiple:l.multiple,name:l.name,onClick:F=>{F.stopPropagation(),E.value&&F.preventDefault(),R()},onChange:F=>{if(!F.target)return;const ue=F.target;f.value=[...ue.files??[]]},onFocus:R,onBlur:j},se,le),null),e("div",{class:ie},[!!((Y=f.value)!=null&&Y.length)&&(i.selection?i.selection({fileNames:y.value,totalBytes:S.value,totalBytesReadable:$.value}):l.chips?y.value.map(F=>e(J,{key:F,size:"small",color:l.color},{default:()=>[F]})):y.value.join(", "))])])}})},details:m?w=>{var P,z;return e(x,null,[(P=i.details)==null?void 0:P.call(i,w),u&&e(x,null,[e("span",null,null),e(ke,{active:!!((z=f.value)!=null&&z.length),value:B.value},i.counter)])])}:void 0})}),fe({},D,L,b)}}),De={__name:"DemoFileInputLoading",setup(l){const s=I(),t=I(!0);return q(s,()=>{t.value=!s.value[0]}),(_,i)=>(r(),d(p,{modelValue:U(s),"onUpdate:modelValue":i[0]||(i[0]=v=>H(s)?s.value=v:null),loading:U(t),color:"primary",label:"File input"},null,8,["modelValue","loading"]))}},Pe={__name:"DemoFileInputSelectionSlot",setup(l){const s=I([]);return(t,_)=>(r(),d(p,{modelValue:U(s),"onUpdate:modelValue":_[0]||(_[0]=i=>H(s)?s.value=i:null),multiple:"",placeholder:"Upload your documents",label:"File input","prepend-icon":"tabler-paperclip"},{selection:a(({fileNames:i})=>[(r(!0),Ce(x,null,we(i,v=>(r(),d(J,{key:v,label:"",size:"small",variant:"outlined",color:"primary",class:"me-2"},{default:a(()=>[o(ze(v),1)]),_:2},1024))),128))]),_:1},8,["modelValue"]))}},xe={__name:"DemoFileInputValidation",setup(l){const s=[t=>!t||!t.length||t[0].size<1e6||"Avatar size should be less than 1 MB!"];return(t,_)=>(r(),d(p,{rules:s,label:"Avatar",accept:"image/png, image/jpeg, image/bmp",placeholder:"Pick an avatar","prepend-icon":"tabler-camera"}))}},Ae={};function je(l,s){return r(),d(p,{"show-size":"",label:"File input"})}const Be=V(Ae,[["render",je]]),Re={};function Ne(l,s){return r(),d(p,{label:"File input","prepend-icon":"tabler-camera"})}const Ue=V(Re,[["render",Ne]]),Le={};function Me(l,s){return r(),d(p,{multiple:"",label:"File input"})}const Te=V(Le,[["render",Me]]),Oe={};function Ee(l,s){return r(),d(p,{"show-size":"",counter:"",multiple:"",label:"File input"})}const Ye=V(Oe,[["render",Ee]]),Ge={};function We(l,s){return r(),d(p,{chips:"",label:"File input w/ chips"})}const qe=V(Ge,[["render",We]]),He={};function Je(l,s){return r(),d(p,{accept:"image/*",label:"File input"})}const Ke=V(He,[["render",Je]]),Qe={};function Xe(l,s){return r(),d(K,null,{default:a(()=>[e(c,{cols:"12",sm:"6"},{default:a(()=>[e(p,{label:"Outlined"})]),_:1}),e(c,{cols:"12",sm:"6"},{default:a(()=>[e(p,{label:"Filled",variant:"filled"})]),_:1}),e(c,{cols:"12",sm:"6"},{default:a(()=>[e(p,{label:"Solo",variant:"solo"})]),_:1}),e(c,{cols:"12",sm:"6"},{default:a(()=>[e(p,{label:"Plain",variant:"plain"})]),_:1}),e(c,{cols:"12",sm:"6"},{default:a(()=>[e(p,{label:"Underlined",variant:"underlined",density:"default"})]),_:1})]),_:1})}const Ze=V(Qe,[["render",Xe]]),el={};function ll(l,s){return r(),d(p,{label:"File input",density:"compact"})}const tl=V(el,[["render",ll]]),nl={};function ol(l,s){return r(),d(p,{label:"File input"})}const al=V(nl,[["render",ol]]),il={ts:`<template>
  <VFileInput
    accept="image/*"
    label="File input"
  />
</template>
`,js:`<template>
  <VFileInput
    accept="image/*"
    label="File input"
  />
</template>
`},sl={ts:`<template>
  <VFileInput label="File input" />
</template>
`,js:`<template>
  <VFileInput label="File input" />
</template>
`},ul={ts:`<template>
  <VFileInput
    chips
    label="File input w/ chips"
  />
</template>
`,js:`<template>
  <VFileInput
    chips
    label="File input w/ chips"
  />
</template>
`},cl={ts:`<template>
  <VFileInput
    show-size
    counter
    multiple
    label="File input"
  />
</template>
`,js:`<template>
  <VFileInput
    show-size
    counter
    multiple
    label="File input"
  />
</template>
`},pl={ts:`<template>
  <VFileInput
    label="File input"
    density="compact"
  />
</template>
`,js:`<template>
  <VFileInput
    label="File input"
    density="compact"
  />
</template>
`},rl={ts:`<script setup lang="ts">
const file = ref()
const loading = ref(true)

watch(file, () => {
  loading.value = !file.value[0]
})
<\/script>

<template>
  <VFileInput
    v-model="file"
    :loading="loading"
    color="primary"
    label="File input"
  />
</template>
`,js:`<script setup>
const file = ref()
const loading = ref(true)

watch(file, () => {
  loading.value = !file.value[0]
})
<\/script>

<template>
  <VFileInput
    v-model="file"
    :loading="loading"
    color="primary"
    label="File input"
  />
</template>
`},dl={ts:`<template>
  <VFileInput
    multiple
    label="File input"
  />
</template>
`,js:`<template>
  <VFileInput
    multiple
    label="File input"
  />
</template>
`},ml={ts:`<template>
  <VFileInput
    label="File input"
    prepend-icon="tabler-camera"
  />
</template>
`,js:`<template>
  <VFileInput
    label="File input"
    prepend-icon="tabler-camera"
  />
</template>
`},fl={ts:`<script lang="ts" setup>
const files = ref<File[]>([])
<\/script>

<template>
  <VFileInput
    v-model="files"
    multiple
    placeholder="Upload your documents"
    label="File input"
    prepend-icon="tabler-paperclip"
  >
    <template #selection="{ fileNames }">
      <template
        v-for="fileName in fileNames"
        :key="fileName"
      >
        <VChip
          label
          size="small"
          variant="outlined"
          color="primary"
          class="me-2"
        >
          {{ fileName }}
        </VChip>
      </template>
    </template>
  </VFileInput>
</template>
`,js:`<script setup>
const files = ref([])
<\/script>

<template>
  <VFileInput
    v-model="files"
    multiple
    placeholder="Upload your documents"
    label="File input"
    prepend-icon="tabler-paperclip"
  >
    <template #selection="{ fileNames }">
      <template
        v-for="fileName in fileNames"
        :key="fileName"
      >
        <VChip
          label
          size="small"
          variant="outlined"
          color="primary"
          class="me-2"
        >
          {{ fileName }}
        </VChip>
      </template>
    </template>
  </VFileInput>
</template>
`},_l={ts:`<template>
  <VFileInput
    show-size
    label="File input"
  />
</template>
`,js:`<template>
  <VFileInput
    show-size
    label="File input"
  />
</template>
`},vl={ts:`<script lang="ts" setup>
const rules = [
  (fileList: FileList) => !fileList || !fileList.length || fileList[0].size < 1000000 || 'Avatar size should be less than 1 MB!',
]
<\/script>

<template>
  <VFileInput
    :rules="rules"
    label="Avatar"
    accept="image/png, image/jpeg, image/bmp"
    placeholder="Pick an avatar"
    prepend-icon="tabler-camera"
  />
</template>
`,js:`<script setup>
const rules = [fileList => !fileList || !fileList.length || fileList[0].size < 1000000 || 'Avatar size should be less than 1 MB!']
<\/script>

<template>
  <VFileInput
    :rules="rules"
    label="Avatar"
    accept="image/png, image/jpeg, image/bmp"
    placeholder="Pick an avatar"
    prepend-icon="tabler-camera"
  />
</template>
`},Vl={ts:`<template>
  <VRow>
    <VCol
      cols="12"
      sm="6"
    >
      <VFileInput label="Outlined" />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VFileInput
        label="Filled"
        variant="filled"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VFileInput
        label="Solo"
        variant="solo"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VFileInput
        label="Plain"
        variant="plain"
      />
    </VCol>
    <VCol
      cols="12"
      sm="6"
    >
      <VFileInput
        label="Underlined"
        variant="underlined"
        density="default"
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
      <VFileInput label="Outlined" />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VFileInput
        label="Filled"
        variant="filled"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VFileInput
        label="Solo"
        variant="solo"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VFileInput
        label="Plain"
        variant="plain"
      />
    </VCol>
    <VCol
      cols="12"
      sm="6"
    >
      <VFileInput
        label="Underlined"
        variant="underlined"
        density="default"
      />
    </VCol>
  </VRow>
</template>
`},Rl={__name:"file-input",setup(l){return(s,t)=>{const _=al,i=Se,v=tl,f=Ze,h=Ke,A=qe,j=Ye,k=Te,S=Ue,$=Be,y=xe,B=Pe,D=De;return r(),d(K,{class:"match-height"},{default:a(()=>[e(c,{cols:"12",md:"6"},{default:a(()=>[e(i,{title:"Basic",code:sl},{default:a(()=>[t[0]||(t[0]=n("p",null,[o("The "),n("code",null,"v-file-input"),o(" component is used to selecting files.")],-1)),e(_)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:a(()=>[e(i,{title:"Density",code:pl},{default:a(()=>[t[1]||(t[1]=n("p",null,[o("You can reduces the file input height with "),n("code",null,"density"),o(" prop. Available options are: "),n("code",null,"default"),o(", "),n("code",null,"comfortable"),o(", and "),n("code",null,"compact"),o(".")],-1)),e(v)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12"},{default:a(()=>[e(i,{title:"Variant",code:Vl},{default:a(()=>[t[2]||(t[2]=n("p",null,[o("use "),n("code",null,"solo"),o(", "),n("code",null,"filled"),o(", "),n("code",null,"outlined"),o(", "),n("code",null,"plain"),o(" and "),n("code",null,"underlined"),o(" option of "),n("code",null,"variant"),o(" prop to change the look of file input.")],-1)),e(f)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:a(()=>[e(i,{title:"Accept",code:il},{default:a(()=>[t[3]||(t[3]=n("p",null,[n("code",null,"v-file-input"),o(" component can accept only specific media formats/file types if you want.")],-1)),e(h)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:a(()=>[e(i,{title:"Chips",code:ul},{default:a(()=>[t[4]||(t[4]=n("p",null,[o("Use "),n("code",null,"chip"),o(" prop to display the selected file as a chip.")],-1)),e(A)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:a(()=>[e(i,{title:"Counter",code:cl},{default:a(()=>[t[5]||(t[5]=n("p",null,[o("When using the "),n("code",null,"show-size"),o(" property along with "),n("code",null,"counter"),o(", the total number of files and size will be displayed under the input.")],-1)),e(j)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:a(()=>[e(i,{title:"Multiple",code:dl},{default:a(()=>[t[6]||(t[6]=n("p",null,[o(" The "),n("code",null,"v-file-input"),o(" can contain multiple files at the same time when using the "),n("code",null,"multiple"),o(" prop. ")],-1)),e(k)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:a(()=>[e(i,{title:"Prepend icon",code:ml},{default:a(()=>[t[7]||(t[7]=n("p",null,[o(" The "),n("code",null,"v-file-input"),o(" has a default "),n("code",null,"prepend-icon"),o(" that can be set on the component or adjusted globally. ")],-1)),e(S)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:a(()=>[e(i,{title:"Show size",code:_l},{default:a(()=>[t[8]||(t[8]=n("p",null,[o("The displayed size of the selected file(s) can be configured with the "),n("code",null,"show-size"),o(" property.")],-1)),e($)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:a(()=>[e(i,{title:"Validation",code:vl},{default:a(()=>[t[9]||(t[9]=n("p",null,[o("You can use the "),n("code",null,"rules"),o(" prop to create your own custom validation parameters.")],-1)),e(y)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:a(()=>[e(i,{title:"Selection slot",code:fl},{default:a(()=>[t[10]||(t[10]=n("p",null,[o("Using the "),n("code",null,"selection"),o(" slot, you can customize the appearance of your input selections.")],-1)),e(B)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:a(()=>[e(i,{title:"Loading",code:rl},{default:a(()=>[t[11]||(t[11]=n("p",null,[o("Use "),n("code",null,"loading"),o(" prop to displays linear progress bar.")],-1)),e(D)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{Rl as default};
