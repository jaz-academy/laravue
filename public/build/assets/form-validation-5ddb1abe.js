import{r as m,b as O,i as $,a as Y,c as x,l as D,p as S,d as j,f as I,e as R,u as J}from"./validators-335ca61c.js";import{r as s,o as g,f as A,e as o,b as l,n as e,aU as V,ai as U,v as q,a$ as N,d as L}from"./main-dd895efc.js";import{_ as B}from"./AppTextField-3c315d47.js";import{V as T}from"./VRow-401a9eed.js";import{V as i}from"./VCol-5badd7d4.js";import{V as k}from"./VForm-e67d51c7.js";import{_ as z}from"./AppCardCode-cb276543.js";import"./helpers-dc843671.js";import"./no-profile-4221a4a6.js";import"./form-06ce0535.js";import"./VTextField-c7c6ba66.js";/* empty css                   */import"./VCounter-be0294ff.js";import"./VImg-0d845f43.js";import"./VField-6a012775.js";import"./easing-9f15041e.js";import"./VInput-ec440a4f.js";import"./forwardRefs-8348545e.js";import"./VCard-521d2f55.js";import"./VAvatar-c43efe20.js";import"./VCardText-8cb57704.js";import"./VDivider-3f5c8926.js";const G={__name:"DemoFormValidationValidationTypes",setup(P){const C=s(""),c=s(""),F=s(""),p=s(""),u=s(""),f=s(""),b=s(""),d=s(""),n=s(""),v=s(""),h=s(""),y=s(""),E=s();return(r,a)=>{const w=B;return g(),A(k,{ref_key:"refForm",ref:E,onSubmit:a[13]||(a[13]=N(()=>{},["prevent"]))},{default:o(()=>[l(T,null,{default:o(()=>[l(i,{cols:"12",md:"6"},{default:o(()=>[l(w,{modelValue:e(C),"onUpdate:modelValue":a[0]||(a[0]=t=>V(C)?C.value=t:null),"persistent-placeholder":"",placeholder:"This field is required",rules:["requiredValidator"in r?r.requiredValidator:e(m)]},null,8,["modelValue","rules"])]),_:1}),l(i,{cols:"12",md:"6"},{default:o(()=>[l(w,{modelValue:e(c),"onUpdate:modelValue":a[1]||(a[1]=t=>V(c)?c.value=t:null),"persistent-placeholder":"",placeholder:"Enter Number between 10 & 20",rules:["requiredValidator"in r?r.requiredValidator:e(m),("betweenValidator"in r?r.betweenValidator:e(O))(e(c),10,20)]},null,8,["modelValue","rules"])]),_:1}),l(i,{cols:"12",md:"6"},{default:o(()=>[l(w,{modelValue:e(F),"onUpdate:modelValue":a[2]||(a[2]=t=>V(F)?F.value=t:null),"persistent-placeholder":"",placeholder:"Must only consist of numbers",rules:["requiredValidator"in r?r.requiredValidator:e(m),"integerValidator"in r?r.integerValidator:e($)]},null,8,["modelValue","rules"])]),_:1}),l(i,{cols:"12",md:"6"},{default:o(()=>[l(w,{modelValue:e(p),"onUpdate:modelValue":a[3]||(a[3]=t=>V(p)?p.value=t:null),"persistent-placeholder":"",placeholder:"Must match the specified regular expression : ^([0-9]+)$ - numbers only",rules:["requiredValidator"in r?r.requiredValidator:e(m),("regexValidator"in r?r.regexValidator:e(Y))(e(p),"^([0-9]+)$")]},null,8,["modelValue","rules"])]),_:1}),l(i,{cols:"12",md:"6"},{default:o(()=>[l(w,{modelValue:e(u),"onUpdate:modelValue":a[4]||(a[4]=t=>V(u)?u.value=t:null),"persistent-placeholder":"",placeholder:"Only alphabetic characters",rules:["requiredValidator"in r?r.requiredValidator:e(m),"alphaValidator"in r?r.alphaValidator:e(x)]},null,8,["modelValue","rules"])]),_:1}),l(i,{cols:"12",md:"6"},{default:o(()=>[l(w,{modelValue:e(f),"onUpdate:modelValue":a[5]||(a[5]=t=>V(f)?f.value=t:null),"persistent-placeholder":"",placeholder:"Length should not be less than the specified length : 3",rules:["requiredValidator"in r?r.requiredValidator:e(m),("lengthValidator"in r?r.lengthValidator:e(D))(e(f),3)]},null,8,["modelValue","rules"])]),_:1}),l(i,{cols:"12",md:"6"},{default:o(()=>[l(w,{modelValue:e(b),"onUpdate:modelValue":a[6]||(a[6]=t=>V(b)?b.value=t:null),"persistent-placeholder":"",placeholder:"Password Input Field",type:"password",rules:["requiredValidator"in r?r.requiredValidator:e(m),"passwordValidator"in r?r.passwordValidator:e(S)],autocomplete:"on"},null,8,["modelValue","rules"])]),_:1}),l(i,{cols:"12",md:"6"},{default:o(()=>[l(w,{modelValue:e(d),"onUpdate:modelValue":a[7]||(a[7]=t=>V(d)?d.value=t:null),"persistent-placeholder":"",placeholder:"The digits field must be numeric and exactly contain 3 digits",rules:["requiredValidator"in r?r.requiredValidator:e(m),("lengthValidator"in r?r.lengthValidator:e(D))(e(d),3),"integerValidator"in r?r.integerValidator:e($)]},null,8,["modelValue","rules"])]),_:1}),l(i,{cols:"12",md:"6"},{default:o(()=>[l(w,{modelValue:e(n),"onUpdate:modelValue":a[8]||(a[8]=t=>V(n)?n.value=t:null),"persistent-placeholder":"",placeholder:"Repeat password must match",type:"password",rules:["requiredValidator"in r?r.requiredValidator:e(m),("confirmedValidator"in r?r.confirmedValidator:e(j))(e(n),e(b))],autocomplete:"on"},null,8,["modelValue","rules"])]),_:1}),l(i,{cols:"12",md:"6"},{default:o(()=>[l(w,{modelValue:e(v),"onUpdate:modelValue":a[9]||(a[9]=t=>V(v)?v.value=t:null),"persistent-placeholder":"",placeholder:"Only alphabetic characters, numbers, dashes or underscores",rules:["requiredValidator"in r?r.requiredValidator:e(m),"alphaDashValidator"in r?r.alphaDashValidator:e(I)]},null,8,["modelValue","rules"])]),_:1}),l(i,{cols:"12",md:"6"},{default:o(()=>[l(w,{modelValue:e(h),"onUpdate:modelValue":a[10]||(a[10]=t=>V(h)?h.value=t:null),"persistent-placeholder":"",placeholder:"Must be a valid email",rules:["requiredValidator"in r?r.requiredValidator:e(m),"emailValidator"in r?r.emailValidator:e(R)]},null,8,["modelValue","rules"])]),_:1}),l(i,{cols:"12",md:"6"},{default:o(()=>[l(w,{modelValue:e(y),"onUpdate:modelValue":a[11]||(a[11]=t=>V(y)?y.value=t:null),"persistent-placeholder":"",placeholder:"Must be a valid url",rules:["requiredValidator"in r?r.requiredValidator:e(m),"urlValidator"in r?r.urlValidator:e(J)]},null,8,["modelValue","rules"])]),_:1}),l(i,{cols:"12"},{default:o(()=>[l(U,{type:"submit",onClick:a[12]||(a[12]=t=>{var M;return(M=e(E))==null?void 0:M.validate()})},{default:o(()=>a[14]||(a[14]=[q(" Submit ")])),_:1})]),_:1})]),_:1})]),_:1},512)}}},H={__name:"DemoFormValidationValidatingMultipleRules",setup(P){const C=s(""),c=s(""),F=s(),p=s(""),u=s(""),f=s(!1),b=s(!1);return(d,n)=>{const v=B;return g(),A(k,{ref_key:"refForm",ref:F,onSubmit:N(()=>{},["prevent"])},{default:o(()=>[l(T,null,{default:o(()=>[l(i,{cols:"12",md:"6"},{default:o(()=>[l(v,{modelValue:e(C),"onUpdate:modelValue":n[0]||(n[0]=h=>V(C)?C.value=h:null),placeholder:"Your Name","persistent-placeholder":"",rules:["requiredValidator"in d?d.requiredValidator:e(m)]},null,8,["modelValue","rules"])]),_:1}),l(i,{cols:"12",md:"6"},{default:o(()=>[l(v,{modelValue:e(c),"onUpdate:modelValue":n[1]||(n[1]=h=>V(c)?c.value=h:null),placeholder:"Your Email","persistent-placeholder":"",rules:["requiredValidator"in d?d.requiredValidator:e(m),"emailValidator"in d?d.emailValidator:e(R)]},null,8,["modelValue","rules"])]),_:1}),l(i,{cols:"12",md:"6"},{default:o(()=>[l(v,{modelValue:e(p),"onUpdate:modelValue":n[2]||(n[2]=h=>V(p)?p.value=h:null),type:e(f)?"text":"password","append-inner-icon":e(f)?"tabler-eye-off":"tabler-eye",placeholder:"Enter Password",rules:["requiredValidator"in d?d.requiredValidator:e(m),"passwordValidator"in d?d.passwordValidator:e(S)],autocomplete:"on","onClick:appendInner":n[3]||(n[3]=h=>f.value=!e(f))},null,8,["modelValue","type","append-inner-icon","rules"])]),_:1}),l(i,{cols:"12",md:"6"},{default:o(()=>[l(v,{modelValue:e(u),"onUpdate:modelValue":n[4]||(n[4]=h=>V(u)?u.value=h:null),type:e(b)?"text":"password",placeholder:"Confirm Password","persistent-placeholder":"","append-inner-icon":e(u)?"tabler-eye-off":"tabler-eye",rules:["requiredValidator"in d?d.requiredValidator:e(m),("confirmedValidator"in d?d.confirmedValidator:e(j))(e(u),e(p))],autocomplete:"on","onClick:appendInner":n[5]||(n[5]=h=>b.value=!e(b))},null,8,["modelValue","type","append-inner-icon","rules"])]),_:1}),l(i,{cols:"12"},{default:o(()=>[l(U,{type:"submit",onClick:n[6]||(n[6]=h=>{var y;return(y=e(F))==null?void 0:y.validate()})},{default:o(()=>n[7]||(n[7]=[q(" Submit ")])),_:1})]),_:1})]),_:1})]),_:1},512)}}},K={__name:"DemoFormValidationSimpleFormValidation",setup(P){const C=s(""),c=s(""),F=s();return(p,u)=>{const f=B;return g(),A(k,{ref_key:"refForm",ref:F,onSubmit:N(()=>{},["prevent"])},{default:o(()=>[l(T,null,{default:o(()=>[l(i,{cols:"12",md:"6"},{default:o(()=>[l(f,{modelValue:e(C),"onUpdate:modelValue":u[0]||(u[0]=b=>V(C)?C.value=b:null),label:"First Name",placeholder:"John",rules:["requiredValidator"in p?p.requiredValidator:e(m)]},null,8,["modelValue","rules"])]),_:1}),l(i,{cols:"12",md:"6"},{default:o(()=>[l(f,{modelValue:e(c),"onUpdate:modelValue":u[1]||(u[1]=b=>V(c)?c.value=b:null),label:"Email",placeholder:"john@email.com",rules:["requiredValidator"in p?p.requiredValidator:e(m),"emailValidator"in p?p.emailValidator:e(R)]},null,8,["modelValue","rules"])]),_:1}),l(i,{cols:"12"},{default:o(()=>[l(U,{type:"submit",onClick:u[2]||(u[2]=b=>{var d;return(d=e(F))==null?void 0:d.validate()})},{default:o(()=>u[3]||(u[3]=[q(" Submit ")])),_:1})]),_:1})]),_:1})]),_:1},512)}}},Q={ts:`<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { VForm } from 'vuetify/components/VForm'

const firstName = ref('')
const email = ref('')

const refForm = ref<VForm>()
<\/script>

<template>
  <VForm
    ref="refForm"
    @submit.prevent="() => {}"
  >
    <VRow>
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="firstName"
          label="First Name"
          placeholder="John"
          :rules="[requiredValidator]"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="email"
          label="Email"
          placeholder="john@email.com"
          :rules="[requiredValidator, emailValidator]"
        />
      </VCol>

      <VCol cols="12">
        <VBtn
          type="submit"
          @click="refForm?.validate()"
        >
          Submit
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`,js:`<script setup>
const firstName = ref('')
const email = ref('')
const refForm = ref()
<\/script>

<template>
  <VForm
    ref="refForm"
    @submit.prevent="() => {}"
  >
    <VRow>
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="firstName"
          label="First Name"
          placeholder="John"
          :rules="[requiredValidator]"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="email"
          label="Email"
          placeholder="john@email.com"
          :rules="[requiredValidator, emailValidator]"
        />
      </VCol>

      <VCol cols="12">
        <VBtn
          type="submit"
          @click="refForm?.validate()"
        >
          Submit
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`},W={ts:`<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { VForm } from 'vuetify/components/VForm'

const name = ref('')
const email = ref('')
const refForm = ref<VForm>()
const password = ref('')
const confirmPassword = ref('')
const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
<\/script>

<template>
  <VForm
    ref="refForm"
    @submit.prevent="() => {}"
  >
    <VRow>
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="name"
          placeholder="Your Name"
          persistent-placeholder
          :rules="[requiredValidator]"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="email"
          placeholder="Your Email"
          persistent-placeholder
          :rules="[requiredValidator, emailValidator]"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="password"
          :type="isPasswordVisible ? 'text' : 'password'"
          :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
          placeholder="Enter Password"
          :rules="[requiredValidator, passwordValidator]"
          autocomplete="on"
          @click:append-inner="isPasswordVisible = !isPasswordVisible"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="confirmPassword"
          :type="isConfirmPasswordVisible ? 'text' : 'password'"
          placeholder="Confirm Password"
          persistent-placeholder
          :append-inner-icon="confirmPassword ? 'tabler-eye-off' : 'tabler-eye'"
          :rules="[requiredValidator, confirmedValidator(confirmPassword, password)]"
          autocomplete="on"
          @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
        />
      </VCol>

      <VCol cols="12">
        <VBtn
          type="submit"
          @click="refForm?.validate()"
        >
          Submit
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`,js:`<script setup>
const name = ref('')
const email = ref('')
const refForm = ref()
const password = ref('')
const confirmPassword = ref('')
const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
<\/script>

<template>
  <VForm
    ref="refForm"
    @submit.prevent="() => {}"
  >
    <VRow>
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="name"
          placeholder="Your Name"
          persistent-placeholder
          :rules="[requiredValidator]"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="email"
          placeholder="Your Email"
          persistent-placeholder
          :rules="[requiredValidator, emailValidator]"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="password"
          :type="isPasswordVisible ? 'text' : 'password'"
          :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
          placeholder="Enter Password"
          :rules="[requiredValidator, passwordValidator]"
          autocomplete="on"
          @click:append-inner="isPasswordVisible = !isPasswordVisible"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="confirmPassword"
          :type="isConfirmPasswordVisible ? 'text' : 'password'"
          placeholder="Confirm Password"
          persistent-placeholder
          :append-inner-icon="confirmPassword ? 'tabler-eye-off' : 'tabler-eye'"
          :rules="[requiredValidator, confirmedValidator(confirmPassword, password)]"
          autocomplete="on"
          @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
        />
      </VCol>

      <VCol cols="12">
        <VBtn
          type="submit"
          @click="refForm?.validate()"
        >
          Submit
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`},X={ts:`<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { VForm } from 'vuetify/components/VForm'

const requiredField = ref('')
const numberBetween10to20 = ref('')
const onlyConsistNumber = ref('')
const matchRegularEx = ref('')
const onlyAlphabeticCharacters = ref('')
const specifiedLength = ref('')
const password = ref('')
const digits = ref('')
const repeatPassword = ref('')
const onlyAlphabeticNumbersDashesUnderscores = ref('')
const email = ref('')
const validURL = ref('')
const refForm = ref<VForm>()
<\/script>

<template>
  <VForm
    ref="refForm"
    @submit.prevent
  >
    <VRow>
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="requiredField"
          persistent-placeholder
          placeholder="This field is required"
          :rules="[requiredValidator]"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="numberBetween10to20"
          persistent-placeholder
          placeholder="Enter Number between 10 & 20"
          :rules="[requiredValidator, betweenValidator(numberBetween10to20, 10, 20)]"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="onlyConsistNumber"
          persistent-placeholder
          placeholder="Must only consist of numbers"
          :rules="[requiredValidator, integerValidator]"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="matchRegularEx"
          persistent-placeholder
          placeholder="Must match the specified regular expression : ^([0-9]+)$ - numbers only"
          :rules="[requiredValidator, regexValidator(matchRegularEx, '^([0-9]+)$')]"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="onlyAlphabeticCharacters"
          persistent-placeholder
          placeholder="Only alphabetic characters"
          :rules="[requiredValidator, alphaValidator]"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="specifiedLength"
          persistent-placeholder
          placeholder="Length should not be less than the specified length : 3"
          :rules="[requiredValidator, lengthValidator(specifiedLength, 3)]"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="password"
          persistent-placeholder
          placeholder="Password Input Field"
          type="password"
          :rules="[requiredValidator, passwordValidator]"
          autocomplete="on"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="digits"
          persistent-placeholder
          placeholder="The digits field must be numeric and exactly contain 3 digits"
          :rules="[requiredValidator, lengthValidator(digits, 3), integerValidator]"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="repeatPassword"
          persistent-placeholder
          placeholder="Repeat password must match"
          type="password"
          :rules="[requiredValidator, confirmedValidator(repeatPassword, password)]"
          autocomplete="on"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="onlyAlphabeticNumbersDashesUnderscores"
          persistent-placeholder
          placeholder="Only alphabetic characters, numbers, dashes or underscores"
          :rules="[requiredValidator, alphaDashValidator]"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="email"
          persistent-placeholder
          placeholder="Must be a valid email"
          :rules="[requiredValidator, emailValidator]"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="validURL"
          persistent-placeholder
          placeholder="Must be a valid url"
          :rules="[requiredValidator, urlValidator]"
        />
      </VCol>

      <VCol cols="12">
        <VBtn
          type="submit"
          @click="refForm?.validate()"
        >
          Submit
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`,js:`<script setup>
const requiredField = ref('')
const numberBetween10to20 = ref('')
const onlyConsistNumber = ref('')
const matchRegularEx = ref('')
const onlyAlphabeticCharacters = ref('')
const specifiedLength = ref('')
const password = ref('')
const digits = ref('')
const repeatPassword = ref('')
const onlyAlphabeticNumbersDashesUnderscores = ref('')
const email = ref('')
const validURL = ref('')
const refForm = ref()
<\/script>

<template>
  <VForm
    ref="refForm"
    @submit.prevent
  >
    <VRow>
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="requiredField"
          persistent-placeholder
          placeholder="This field is required"
          :rules="[requiredValidator]"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="numberBetween10to20"
          persistent-placeholder
          placeholder="Enter Number between 10 & 20"
          :rules="[requiredValidator, betweenValidator(numberBetween10to20, 10, 20)]"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="onlyConsistNumber"
          persistent-placeholder
          placeholder="Must only consist of numbers"
          :rules="[requiredValidator, integerValidator]"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="matchRegularEx"
          persistent-placeholder
          placeholder="Must match the specified regular expression : ^([0-9]+)$ - numbers only"
          :rules="[requiredValidator, regexValidator(matchRegularEx, '^([0-9]+)$')]"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="onlyAlphabeticCharacters"
          persistent-placeholder
          placeholder="Only alphabetic characters"
          :rules="[requiredValidator, alphaValidator]"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="specifiedLength"
          persistent-placeholder
          placeholder="Length should not be less than the specified length : 3"
          :rules="[requiredValidator, lengthValidator(specifiedLength, 3)]"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="password"
          persistent-placeholder
          placeholder="Password Input Field"
          type="password"
          :rules="[requiredValidator, passwordValidator]"
          autocomplete="on"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="digits"
          persistent-placeholder
          placeholder="The digits field must be numeric and exactly contain 3 digits"
          :rules="[requiredValidator, lengthValidator(digits, 3), integerValidator]"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="repeatPassword"
          persistent-placeholder
          placeholder="Repeat password must match"
          type="password"
          :rules="[requiredValidator, confirmedValidator(repeatPassword, password)]"
          autocomplete="on"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="onlyAlphabeticNumbersDashesUnderscores"
          persistent-placeholder
          placeholder="Only alphabetic characters, numbers, dashes or underscores"
          :rules="[requiredValidator, alphaDashValidator]"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="email"
          persistent-placeholder
          placeholder="Must be a valid email"
          :rules="[requiredValidator, emailValidator]"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="validURL"
          persistent-placeholder
          placeholder="Must be a valid url"
          :rules="[requiredValidator, urlValidator]"
        />
      </VCol>

      <VCol cols="12">
        <VBtn
          type="submit"
          @click="refForm?.validate()"
        >
          Submit
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`},Fe={__name:"form-validation",setup(P){return(C,c)=>{const F=K,p=z,u=H,f=G;return g(),A(T,null,{default:o(()=>[l(i,{cols:"12"},{default:o(()=>[l(p,{title:"Simple Form Validation",code:Q},{default:o(()=>[c[0]||(c[0]=L("p",null,[q("Use "),L("code",null,"Rules"),q(" prop to validate the input.")],-1)),l(F)]),_:1},8,["code"])]),_:1}),l(i,{cols:"12"},{default:o(()=>[l(p,{title:"Validating Multiple Rules",code:W},{default:o(()=>[l(u)]),_:1},8,["code"])]),_:1}),l(i,{cols:"12"},{default:o(()=>[l(p,{title:"Validation Types",code:X},{default:o(()=>[l(f)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{Fe as default};
