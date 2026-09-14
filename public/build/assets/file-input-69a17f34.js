import{ac as s,j,E as p,D as V}from"./vendor-vuetify-68686ea1.js";import{r as f,c as x,k as c,a1 as u,z as F,D as b,a2 as i,l as S,F as N,m as k,X as t,Z as L,E as e,q as l}from"./vendor-core-cfb14039.js";import{_ as d}from"./_plugin-vue_export-helper-c27b6911.js";import{_ as U}from"./AppCardCode-1f900ff7.js";import"./vendor-charts-7115819c.js";import"./main-03bc2ec2.js";import"./vendor-vueuse-34674e05.js";import"./vendor-pdf-d7f39922.js";const A={__name:"DemoFileInputLoading",setup(r){const o=f(),n=f(!0);return x(o,()=>{n.value=!o.value[0]}),(m,a)=>(c(),u(s,{modelValue:F(o),"onUpdate:modelValue":a[0]||(a[0]=_=>b(o)?o.value=_:null),loading:F(n),color:"primary",label:"File input"},null,8,["modelValue","loading"]))}},B={__name:"DemoFileInputSelectionSlot",setup(r){const o=f([]);return(n,m)=>(c(),u(s,{modelValue:F(o),"onUpdate:modelValue":m[0]||(m[0]=a=>b(o)?o.value=a:null),multiple:"",placeholder:"Upload your documents",label:"File input","prepend-icon":"tabler-paperclip"},{selection:i(({fileNames:a})=>[(c(!0),S(N,null,k(a,_=>(c(),u(j,{key:_,label:"",size:"small",variant:"outlined",color:"primary",class:"me-2"},{default:i(()=>[t(L(_),1)]),_:2},1024))),128))]),_:1},8,["modelValue"]))}},P={__name:"DemoFileInputValidation",setup(r){const o=[n=>!n||!n.length||n[0].size<1e6||"Avatar size should be less than 1 MB!"];return(n,m)=>(c(),u(s,{rules:o,label:"Avatar",accept:"image/png, image/jpeg, image/bmp",placeholder:"Pick an avatar","prepend-icon":"tabler-camera"}))}},R={};function M(r,o){return c(),u(s,{"show-size":"",label:"File input"})}const T=d(R,[["render",M]]),E={};function O(r,o){return c(),u(s,{label:"File input","prepend-icon":"tabler-camera"})}const Y=d(E,[["render",O]]),q={};function W(r,o){return c(),u(s,{multiple:"",label:"File input"})}const X=d(q,[["render",W]]),Z={};function G(r,o){return c(),u(s,{"show-size":"",counter:"",multiple:"",label:"File input"})}const H=d(Z,[["render",G]]),J={};function K(r,o){return c(),u(s,{chips:"",label:"File input w/ chips"})}const Q=d(J,[["render",K]]),ee={};function le(r,o){return c(),u(s,{accept:"image/*",label:"File input"})}const te=d(ee,[["render",le]]),ne={};function ie(r,o){return c(),u(V,null,{default:i(()=>[e(p,{cols:"12",sm:"6"},{default:i(()=>[e(s,{label:"Outlined"})]),_:1}),e(p,{cols:"12",sm:"6"},{default:i(()=>[e(s,{label:"Filled",variant:"filled"})]),_:1}),e(p,{cols:"12",sm:"6"},{default:i(()=>[e(s,{label:"Solo",variant:"solo"})]),_:1}),e(p,{cols:"12",sm:"6"},{default:i(()=>[e(s,{label:"Plain",variant:"plain"})]),_:1}),e(p,{cols:"12",sm:"6"},{default:i(()=>[e(s,{label:"Underlined",variant:"underlined",density:"default"})]),_:1})]),_:1})}const oe=d(ne,[["render",ie]]),ae={};function pe(r,o){return c(),u(s,{label:"File input",density:"compact"})}const se=d(ae,[["render",pe]]),ce={};function ue(r,o){return c(),u(s,{label:"File input"})}const re=d(ce,[["render",ue]]),de={ts:`<template>
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
`},me={ts:`<template>
  <VFileInput label="File input" />
</template>
`,js:`<template>
  <VFileInput label="File input" />
</template>
`},_e={ts:`<template>
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
`},fe={ts:`<template>
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
`},Fe={ts:`<template>
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
`},Ve={ts:`<script setup lang="ts">
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
`},be={ts:`<template>
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
`},ge={ts:`<template>
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
`},he={ts:`<script lang="ts" setup>
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
`},Ie={ts:`<template>
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
`},ve={ts:`<script lang="ts" setup>
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
`},ye={ts:`<template>
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
`},Ne={__name:"file-input",setup(r){return(o,n)=>{const m=re,a=U,_=se,g=oe,h=te,I=Q,v=H,y=X,C=Y,w=T,z=P,$=B,D=A;return c(),u(V,{class:"match-height"},{default:i(()=>[e(p,{cols:"12",md:"6"},{default:i(()=>[e(a,{title:"Basic",code:me},{default:i(()=>[n[0]||(n[0]=l("p",null,[t("The "),l("code",null,"v-file-input"),t(" component is used to selecting files.")],-1)),e(m)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:i(()=>[e(a,{title:"Density",code:Fe},{default:i(()=>[n[1]||(n[1]=l("p",null,[t("You can reduces the file input height with "),l("code",null,"density"),t(" prop. Available options are: "),l("code",null,"default"),t(", "),l("code",null,"comfortable"),t(", and "),l("code",null,"compact"),t(".")],-1)),e(_)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12"},{default:i(()=>[e(a,{title:"Variant",code:ye},{default:i(()=>[n[2]||(n[2]=l("p",null,[t("use "),l("code",null,"solo"),t(", "),l("code",null,"filled"),t(", "),l("code",null,"outlined"),t(", "),l("code",null,"plain"),t(" and "),l("code",null,"underlined"),t(" option of "),l("code",null,"variant"),t(" prop to change the look of file input.")],-1)),e(g)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:i(()=>[e(a,{title:"Accept",code:de},{default:i(()=>[n[3]||(n[3]=l("p",null,[l("code",null,"v-file-input"),t(" component can accept only specific media formats/file types if you want.")],-1)),e(h)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:i(()=>[e(a,{title:"Chips",code:_e},{default:i(()=>[n[4]||(n[4]=l("p",null,[t("Use "),l("code",null,"chip"),t(" prop to display the selected file as a chip.")],-1)),e(I)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:i(()=>[e(a,{title:"Counter",code:fe},{default:i(()=>[n[5]||(n[5]=l("p",null,[t("When using the "),l("code",null,"show-size"),t(" property along with "),l("code",null,"counter"),t(", the total number of files and size will be displayed under the input.")],-1)),e(v)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:i(()=>[e(a,{title:"Multiple",code:be},{default:i(()=>[n[6]||(n[6]=l("p",null,[t(" The "),l("code",null,"v-file-input"),t(" can contain multiple files at the same time when using the "),l("code",null,"multiple"),t(" prop. ")],-1)),e(y)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:i(()=>[e(a,{title:"Prepend icon",code:ge},{default:i(()=>[n[7]||(n[7]=l("p",null,[t(" The "),l("code",null,"v-file-input"),t(" has a default "),l("code",null,"prepend-icon"),t(" that can be set on the component or adjusted globally. ")],-1)),e(C)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:i(()=>[e(a,{title:"Show size",code:Ie},{default:i(()=>[n[8]||(n[8]=l("p",null,[t("The displayed size of the selected file(s) can be configured with the "),l("code",null,"show-size"),t(" property.")],-1)),e(w)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:i(()=>[e(a,{title:"Validation",code:ve},{default:i(()=>[n[9]||(n[9]=l("p",null,[t("You can use the "),l("code",null,"rules"),t(" prop to create your own custom validation parameters.")],-1)),e(z)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:i(()=>[e(a,{title:"Selection slot",code:he},{default:i(()=>[n[10]||(n[10]=l("p",null,[t("Using the "),l("code",null,"selection"),t(" slot, you can customize the appearance of your input selections.")],-1)),e($)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:i(()=>[e(a,{title:"Loading",code:Ve},{default:i(()=>[n[11]||(n[11]=l("p",null,[t("Use "),l("code",null,"loading"),t(" prop to displays linear progress bar.")],-1)),e(D)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{Ne as default};
