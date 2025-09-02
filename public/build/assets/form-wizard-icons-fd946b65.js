import{_ as W}from"./AppSelect-c31ef19a.js";import{_ as j}from"./AppTextField-5723627d.js";import{_ as $}from"./AppStepper-8199e768.js";import{a as i,V as C}from"./VRow-fac58b63.js";import{V as q}from"./VCard-c1035577.js";import{V as B}from"./VCardText-87a2555b.js";import{V as N}from"./VForm-8be29ffd.js";import{V as E,a as g}from"./VWindowItem-760050a9.js";import{r as b,o as F,f as D,e as a,b as e,d as r,n as l,aU as T,ai as h,a0 as y,v,x as p,c as K,F as J,a$ as z,y as X}from"./main-37de545e.js";import{_ as Z}from"./AppCardCode-ba0e5529.js";import{V as P}from"./VDivider-bd657aeb.js";import{r as k,e as ee,p as le,d as oe,u as _}from"./validators-b7220445.js";import"./form-2eea43bf.js";import"./VSelect-89c1ecf3.js";import"./VTextField-e524b538.js";/* empty css                   */import"./VCounter-2e970494.js";import"./VImg-ab0ba356.js";import"./VField-5bdf7c6e.js";import"./easing-9f15041e.js";import"./VInput-9309032d.js";import"./forwardRefs-8348545e.js";import"./VList-002b35c7.js";import"./ssrBoot-a125e40e.js";import"./VAvatar-93aa4262.js";import"./dialog-transition-4715d8ab.js";import"./VMenu-77bc6832.js";import"./VOverlay-f715a3c8.js";import"./lazy-f1e50cea.js";import"./scopeId-3f0b9f79.js";import"./VCheckboxBtn-ecef6dcc.js";import"./VSelectionControl-8d59c827.js";import"./VChip-eda1d933.js";import"./VSlideGroupItem-7502f752.js";import"./VSlideGroup-e09e6e39.js";import"./helpers-0ad46068.js";import"./no-profile-4221a4a6.js";const ae={class:"pa-6"},te={class:"d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8"},se={__name:"DemoFormWizardIconsModernVertical",setup(R){const S=[{title:"Account Details",icon:"tabler-file-description",subtitle:"Setup account details"},{title:"Personal Info",icon:"tabler-user",subtitle:"Add personal info"},{title:"Social Links",icon:"tabler-link",subtitle:"Add social links"}],m=b(0),V=b(!1),f=b(!1),t=b({username:"",email:"",password:"",cPassword:"",firstName:"",lastName:"",country:void 0,language:void 0,twitter:"",facebook:"",googlePlus:"",linkedIn:""}),I=()=>{console.log(t.value)};return(U,o)=>{const L=$,n=j,w=W;return F(),D(C,null,{default:a(()=>[e(i,{cols:"12",md:"4"},{default:a(()=>[r("div",ae,[e(L,{"current-step":l(m),"onUpdate:currentStep":o[0]||(o[0]=s=>T(m)?m.value=s:null),direction:"vertical",items:S,"icon-size":"24",class:"stepper-icon-step-bg"},null,8,["current-step"])])]),_:1}),e(i,{cols:"12",md:"8"},{default:a(()=>[e(q,null,{default:a(()=>[e(B,null,{default:a(()=>[e(N,null,{default:a(()=>[e(E,{modelValue:l(m),"onUpdate:modelValue":o[15]||(o[15]=s=>T(m)?m.value=s:null),class:"disable-tab-transition"},{default:a(()=>[e(g,null,{default:a(()=>[e(C,null,{default:a(()=>[e(i,{cols:"12"},{default:a(()=>o[18]||(o[18]=[r("h6",{class:"text-h6 font-weight-medium"}," Account Details ",-1),r("p",{class:"mb-0"}," Enter your Account Details ",-1)])),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).username,"onUpdate:modelValue":o[1]||(o[1]=s=>l(t).username=s),placeholder:"CarterLeonardo",label:"Username"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).email,"onUpdate:modelValue":o[2]||(o[2]=s=>l(t).email=s),placeholder:"carterleonardo@gmail.com",label:"Email"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).password,"onUpdate:modelValue":o[3]||(o[3]=s=>l(t).password=s),label:"Password",placeholder:"············",type:l(V)?"text":"password","append-inner-icon":l(V)?"tabler-eye-off":"tabler-eye","onClick:appendInner":o[4]||(o[4]=s=>V.value=!l(V))},null,8,["modelValue","type","append-inner-icon"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).cPassword,"onUpdate:modelValue":o[5]||(o[5]=s=>l(t).cPassword=s),label:"Confirm Password",placeholder:"············",type:l(f)?"text":"password","append-inner-icon":l(f)?"tabler-eye-off":"tabler-eye","onClick:appendInner":o[6]||(o[6]=s=>f.value=!l(f))},null,8,["modelValue","type","append-inner-icon"])]),_:1})]),_:1})]),_:1}),e(g,null,{default:a(()=>[e(C,null,{default:a(()=>[e(i,{cols:"12"},{default:a(()=>o[19]||(o[19]=[r("h6",{class:"text-h6 font-weight-medium"}," Personal Info ",-1),r("p",{class:"mb-0"}," Setup Information ",-1)])),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).firstName,"onUpdate:modelValue":o[7]||(o[7]=s=>l(t).firstName=s),label:"First Name",placeholder:"Leonard"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).lastName,"onUpdate:modelValue":o[8]||(o[8]=s=>l(t).lastName=s),label:"Last Name",placeholder:"Carter"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(w,{modelValue:l(t).country,"onUpdate:modelValue":o[9]||(o[9]=s=>l(t).country=s),label:"Country",placeholder:"Select Country",items:["UK","USA","Canada","Australia","Germany"]},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(w,{modelValue:l(t).language,"onUpdate:modelValue":o[10]||(o[10]=s=>l(t).language=s),label:"Language",placeholder:"Select Language",items:["English","Spanish","French","Russian","German"]},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(g,null,{default:a(()=>[e(C,null,{default:a(()=>[e(i,{cols:"12"},{default:a(()=>o[20]||(o[20]=[r("h6",{class:"text-h6 font-weight-medium"}," Social Links ",-1),r("p",{class:"mb-0"}," Add Social Links ",-1)])),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).twitter,"onUpdate:modelValue":o[11]||(o[11]=s=>l(t).twitter=s),placeholder:"https://twitter.com/abc",label:"Twitter"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).facebook,"onUpdate:modelValue":o[12]||(o[12]=s=>l(t).facebook=s),placeholder:"https://facebook.com/abc",label:"Facebook"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).googlePlus,"onUpdate:modelValue":o[13]||(o[13]=s=>l(t).googlePlus=s),placeholder:"https://plus.google.com/abc",label:"Google+"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).linkedIn,"onUpdate:modelValue":o[14]||(o[14]=s=>l(t).linkedIn=s),placeholder:"https://linkedin.com/abc",label:"LinkedIn"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),r("div",te,[e(h,{color:"secondary",variant:"tonal",disabled:l(m)===0,onClick:o[16]||(o[16]=s=>m.value--)},{default:a(()=>[e(y,{icon:"tabler-arrow-left",start:"",class:"flip-in-rtl"}),o[21]||(o[21]=v(" Previous "))]),_:1},8,["disabled"]),S.length-1===l(m)?(F(),D(h,{key:0,color:"success","append-icon":"tabler-check",onClick:I},{default:a(()=>o[22]||(o[22]=[v(" submit ")])),_:1})):(F(),D(h,{key:1,onClick:o[17]||(o[17]=s=>m.value++)},{default:a(()=>[o[23]||(o[23]=v(" Next ")),e(y,{icon:"tabler-arrow-right",end:"",class:"flip-in-rtl"})]),_:1}))])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}}},re={ts:`<script setup lang="ts">
const iconsSteps = [
  {
    title: 'Account Details',
    icon: 'custom-address',
  },
  {
    title: 'Personal Info',
    icon: 'custom-wizard-personal',
  },
  {
    title: 'Address',
    icon: 'custom-wizard-address',
  },
  {
    title: 'Social Links',
    icon: 'custom-wizard-social-link',
  },
  {
    title: 'Review & Submit',
    icon: 'custom-wizard-submit',
  },
]

const currentStep = ref(0)
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)

const formData = ref({
  username: 'johndoe',
  email: 'john.doe@email.com',
  password: 'johndoe@J2',
  cPassword: 'johndoe@J2',
  firstName: 'John',
  lastName: 'Doe',
  country: 'UK',
  language: 'English',
  address: '98 Borough bridge Road, Birmingham',
  landmark: 'Borough bridge',
  pincode: '658921',
  city: 'Birmingham',
  twitter: 'https://twitter.com/abc',
  facebook: 'https://facebook.com/abc',
  googlePlus: 'https://plus.google.com/abc',
  LinkedIn: 'https://linkedin.com/abc',
})

const onSubmit = () => {
  console.log(formData.value)
}
<\/script>

<template>
  <VCard>
    <VCardText>
      <!-- 👉 Stepper -->
      <AppStepper
        v-model:current-step="currentStep"
        :items="iconsSteps"
      />
    </VCardText>

    <VDivider />

    <VCardText>
      <!-- 👉 stepper content -->
      <VForm>
        <VWindow
          v-model="currentStep"
          class="disable-tab-transition"
        >
          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Account Details
                </h6>
                <p class="mb-0">
                  Enter your Account Details
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.username"
                  placeholder="CarterLeonardo"
                  label="Username"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.email"
                  placeholder="carterleonardo@gmail.com"
                  label="Email"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.password"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.cPassword"
                  label="Confirm Password"
                  placeholder="············"
                  :type="isCPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isCPasswordVisible = !isCPasswordVisible"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Personal Info
                </h6>
                <p class="mb-0">
                  Setup Information
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.firstName"
                  label="First Name"
                  placeholder="Leonard"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.lastName"
                  label="Last Name"
                  placeholder="Carter"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="formData.country"
                  label="Country"
                  placeholder="Select Country"
                  :items="['UK', 'USA', 'Canada', 'Australia', 'Germany']"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="formData.language"
                  label="Language"
                  placeholder="Select Language"
                  :items="['English', 'Spanish', 'French', 'Russian', 'German']"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Address
                </h6>
                <p class="mb-0">
                  Enter Your Address.
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.address"
                  placeholder="98 Borough bridge Road, Birmingham"
                  label="Address"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.landmark"
                  placeholder="Borough bridge"
                  label="Landmark"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.pincode"
                  placeholder="658921"
                  label="Pincode"
                  type="number"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.city"
                  placeholder="New York"
                  label="City"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Social Links
                </h6>
                <p class="mb-0">
                  Add Social Links
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.twitter"
                  placeholder="https://twitter.com/abc"
                  label="Twitter"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.facebook"
                  placeholder="https://facebook.com/abc"
                  label="Facebook"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.googlePlus"
                  placeholder="https://plus.google.com/abc"
                  label="Google+"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.LinkedIn"
                  placeholder="https://linkedin.com/abc"
                  label="LinkedIn"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <div class="text-base">
              <h6 class="text-base font-weight-medium mb-2">
                Account
              </h6>

              <p class="mb-1">
                {{ formData.username }}
              </p>
              <p class="mb-1">
                {{ formData.email }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Personal Info
              </h6>

              <p class="mb-1">
                {{ formData.firstName }}
              </p>
              <p class="mb-1">
                {{ formData.lastName }}
              </p>
              <p class="mb-1">
                {{ formData.country }}
              </p>
              <p class="mb-1">
                {{ formData.language }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Address
              </h6>

              <p class="mb-1">
                {{ formData.address }}
              </p>
              <p class="mb-1">
                {{ formData.landmark }}
              </p>
              <p class="mb-1">
                {{ formData.pincode }}
              </p>
              <p class="mb-1">
                {{ formData.city }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Social Links
              </h6>

              <p class="mb-1">
                {{ formData.twitter }}
              </p>
              <p class="mb-1">
                {{ formData.facebook }}
              </p>
              <p class="mb-1">
                {{ formData.googlePlus }}
              </p>
              <p class="mb-1">
                {{ formData.LinkedIn }}
              </p>
            </div>
          </VWindowItem>
        </VWindow>

        <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
          <VBtn
            color="secondary"
            variant="tonal"
            :disabled="currentStep === 0"
            @click="currentStep--"
          >
            <VIcon
              icon="tabler-arrow-left"
              start
              class="flip-in-rtl"
            />
            Previous
          </VBtn>

          <VBtn
            v-if="iconsSteps.length - 1 === currentStep"
            color="success"
            append-icon="tabler-check"
            @click="onSubmit"
          >
            submit
          </VBtn>

          <VBtn
            v-else
            @click="currentStep++"
          >
            Next

            <VIcon
              icon="tabler-arrow-right"
              end
              class="flip-in-rtl"
            />
          </VBtn>
        </div>
      </VForm>
    </VCardText>
  </VCard>
</template>
`,js:`<script setup>
const iconsSteps = [
  {
    title: 'Account Details',
    icon: 'custom-address',
  },
  {
    title: 'Personal Info',
    icon: 'custom-wizard-personal',
  },
  {
    title: 'Address',
    icon: 'custom-wizard-address',
  },
  {
    title: 'Social Links',
    icon: 'custom-wizard-social-link',
  },
  {
    title: 'Review & Submit',
    icon: 'custom-wizard-submit',
  },
]

const currentStep = ref(0)
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)

const formData = ref({
  username: 'johndoe',
  email: 'john.doe@email.com',
  password: 'johndoe@J2',
  cPassword: 'johndoe@J2',
  firstName: 'John',
  lastName: 'Doe',
  country: 'UK',
  language: 'English',
  address: '98 Borough bridge Road, Birmingham',
  landmark: 'Borough bridge',
  pincode: '658921',
  city: 'Birmingham',
  twitter: 'https://twitter.com/abc',
  facebook: 'https://facebook.com/abc',
  googlePlus: 'https://plus.google.com/abc',
  LinkedIn: 'https://linkedin.com/abc',
})

const onSubmit = () => {
  console.log(formData.value)
}
<\/script>

<template>
  <VCard>
    <VCardText>
      <!-- 👉 Stepper -->
      <AppStepper
        v-model:current-step="currentStep"
        :items="iconsSteps"
      />
    </VCardText>

    <VDivider />

    <VCardText>
      <!-- 👉 stepper content -->
      <VForm>
        <VWindow
          v-model="currentStep"
          class="disable-tab-transition"
        >
          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Account Details
                </h6>
                <p class="mb-0">
                  Enter your Account Details
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.username"
                  placeholder="CarterLeonardo"
                  label="Username"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.email"
                  placeholder="carterleonardo@gmail.com"
                  label="Email"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.password"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.cPassword"
                  label="Confirm Password"
                  placeholder="············"
                  :type="isCPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isCPasswordVisible = !isCPasswordVisible"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Personal Info
                </h6>
                <p class="mb-0">
                  Setup Information
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.firstName"
                  label="First Name"
                  placeholder="Leonard"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.lastName"
                  label="Last Name"
                  placeholder="Carter"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="formData.country"
                  label="Country"
                  placeholder="Select Country"
                  :items="['UK', 'USA', 'Canada', 'Australia', 'Germany']"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="formData.language"
                  label="Language"
                  placeholder="Select Language"
                  :items="['English', 'Spanish', 'French', 'Russian', 'German']"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Address
                </h6>
                <p class="mb-0">
                  Enter Your Address.
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.address"
                  placeholder="98 Borough bridge Road, Birmingham"
                  label="Address"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.landmark"
                  placeholder="Borough bridge"
                  label="Landmark"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.pincode"
                  placeholder="658921"
                  label="Pincode"
                  type="number"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.city"
                  placeholder="New York"
                  label="City"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Social Links
                </h6>
                <p class="mb-0">
                  Add Social Links
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.twitter"
                  placeholder="https://twitter.com/abc"
                  label="Twitter"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.facebook"
                  placeholder="https://facebook.com/abc"
                  label="Facebook"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.googlePlus"
                  placeholder="https://plus.google.com/abc"
                  label="Google+"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.LinkedIn"
                  placeholder="https://linkedin.com/abc"
                  label="LinkedIn"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <div class="text-base">
              <h6 class="text-base font-weight-medium mb-2">
                Account
              </h6>

              <p class="mb-1">
                {{ formData.username }}
              </p>
              <p class="mb-1">
                {{ formData.email }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Personal Info
              </h6>

              <p class="mb-1">
                {{ formData.firstName }}
              </p>
              <p class="mb-1">
                {{ formData.lastName }}
              </p>
              <p class="mb-1">
                {{ formData.country }}
              </p>
              <p class="mb-1">
                {{ formData.language }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Address
              </h6>

              <p class="mb-1">
                {{ formData.address }}
              </p>
              <p class="mb-1">
                {{ formData.landmark }}
              </p>
              <p class="mb-1">
                {{ formData.pincode }}
              </p>
              <p class="mb-1">
                {{ formData.city }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Social Links
              </h6>

              <p class="mb-1">
                {{ formData.twitter }}
              </p>
              <p class="mb-1">
                {{ formData.facebook }}
              </p>
              <p class="mb-1">
                {{ formData.googlePlus }}
              </p>
              <p class="mb-1">
                {{ formData.LinkedIn }}
              </p>
            </div>
          </VWindowItem>
        </VWindow>

        <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
          <VBtn
            color="secondary"
            variant="tonal"
            :disabled="currentStep === 0"
            @click="currentStep--"
          >
            <VIcon
              icon="tabler-arrow-left"
              start
              class="flip-in-rtl"
            />
            Previous
          </VBtn>

          <VBtn
            v-if="iconsSteps.length - 1 === currentStep"
            color="success"
            append-icon="tabler-check"
            @click="onSubmit"
          >
            submit
          </VBtn>

          <VBtn
            v-else
            @click="currentStep++"
          >
            Next

            <VIcon
              icon="tabler-arrow-right"
              end
              class="flip-in-rtl"
            />
          </VBtn>
        </div>
      </VForm>
    </VCardText>
  </VCard>
</template>
`},ie={ts:`<script setup lang="ts">
const iconsSteps = [
  {
    title: 'Account Details',
    icon: 'custom-address',
  },
  {
    title: 'Personal Info',
    icon: 'custom-wizard-personal',
  },
  {
    title: 'Address',
    icon: 'custom-wizard-address',
  },
  {
    title: 'Social Links',
    icon: 'custom-wizard-social-link',
  },
  {
    title: 'Review & Submit',
    icon: 'custom-wizard-submit',
  },
]

const currentStep = ref(0)
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)

const formData = ref({
  username: 'johndoe',
  email: 'john.doe@email.com',
  password: 'johndoe@J2',
  cPassword: 'johndoe@J2',
  firstName: 'John',
  lastName: 'Doe',
  country: 'UK',
  language: 'English',
  address: '98 Borough bridge Road, Birmingham',
  landmark: 'Borough bridge',
  pincode: '658921',
  city: 'Birmingham',
  twitter: 'https://twitter.com/abc',
  facebook: 'https://facebook.com/abc',
  googlePlus: 'https://plus.google.com/abc',
  LinkedIn: 'https://linkedin.com/abc',
})

const onSubmit = () => {
  console.log(formData.value)
}
<\/script>

<template>
  <!-- 👉 Stepper -->
  <div class="mb-6">
    <AppStepper
      v-model:current-step="currentStep"
      :items="iconsSteps"
    />
  </div>

  <VCard>
    <VCardText>
      <!-- 👉 stepper content -->
      <VForm>
        <VWindow
          v-model="currentStep"
          class="disable-tab-transition"
        >
          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Account Details
                </h6>
                <p class="mb-0">
                  Enter your Account Details
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.username"
                  placeholder="CarterLeonardo"
                  label="Username"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.email"
                  placeholder="carterleonardo@gmail.com"
                  label="Email"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.password"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.cPassword"
                  label="Confirm Password"
                  placeholder="············"
                  :type="isCPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isCPasswordVisible = !isCPasswordVisible"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Personal Info
                </h6>
                <p class="mb-0">
                  Setup Information
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.firstName"
                  label="First Name"
                  placeholder="Leonard"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.lastName"
                  label="Last Name"
                  placeholder="Carter"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="formData.country"
                  label="Country"
                  placeholder="Select Country"
                  :items="['UK', 'USA', 'Canada', 'Australia', 'Germany']"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="formData.language"
                  label="Language"
                  placeholder="Select Language"
                  :items="['English', 'Spanish', 'French', 'Russian', 'German']"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Address
                </h6>
                <p class="mb-0">
                  Enter Your Address.
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.address"
                  placeholder="98 Borough bridge Road, Birmingham"
                  label="Address"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.landmark"
                  placeholder="Borough bridge"
                  label="Landmark"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.pincode"
                  placeholder="658921"
                  label="Pincode"
                  type="number"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.city"
                  placeholder="New York"
                  label="City"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Social Links
                </h6>
                <p class="mb-0">
                  Add Social Links
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.twitter"
                  placeholder="https://twitter.com/abc"
                  label="Twitter"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.facebook"
                  placeholder="https://facebook.com/abc"
                  label="Facebook"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.googlePlus"
                  placeholder="https://plus.google.com/abc"
                  label="Google+"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.LinkedIn"
                  placeholder="https://linkedin.com/abc"
                  label="LinkedIn"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <div class="text-base">
              <h6 class="text-base font-weight-medium mb-2">
                Account
              </h6>

              <p class="mb-1">
                {{ formData.username }}
              </p>
              <p class="mb-1">
                {{ formData.email }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Personal Info
              </h6>

              <p class="mb-1">
                {{ formData.firstName }}
              </p>
              <p class="mb-1">
                {{ formData.lastName }}
              </p>
              <p class="mb-1">
                {{ formData.country }}
              </p>
              <p class="mb-1">
                {{ formData.language }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Address
              </h6>

              <p class="mb-1">
                {{ formData.address }}
              </p>
              <p class="mb-1">
                {{ formData.landmark }}
              </p>
              <p class="mb-1">
                {{ formData.pincode }}
              </p>
              <p class="mb-1">
                {{ formData.city }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Social Links
              </h6>

              <p class="mb-1">
                {{ formData.twitter }}
              </p>
              <p class="mb-1">
                {{ formData.facebook }}
              </p>
              <p class="mb-1">
                {{ formData.googlePlus }}
              </p>
              <p class="mb-1">
                {{ formData.LinkedIn }}
              </p>
            </div>
          </VWindowItem>
        </VWindow>

        <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
          <VBtn
            color="secondary"
            variant="tonal"
            :disabled="currentStep === 0"
            @click="currentStep--"
          >
            <VIcon
              icon="tabler-arrow-left"
              start
              class="flip-in-rtl"
            />
            Previous
          </VBtn>

          <VBtn
            v-if="iconsSteps.length - 1 === currentStep"
            color="success"
            append-icon="tabler-check"
            @click="onSubmit"
          >
            submit
          </VBtn>

          <VBtn
            v-else
            @click="currentStep++"
          >
            Next

            <VIcon
              icon="tabler-arrow-right"
              end
              class="flip-in-rtl"
            />
          </VBtn>
        </div>
      </VForm>
    </VCardText>
  </VCard>
</template>
`,js:`<script setup>
const iconsSteps = [
  {
    title: 'Account Details',
    icon: 'custom-address',
  },
  {
    title: 'Personal Info',
    icon: 'custom-wizard-personal',
  },
  {
    title: 'Address',
    icon: 'custom-wizard-address',
  },
  {
    title: 'Social Links',
    icon: 'custom-wizard-social-link',
  },
  {
    title: 'Review & Submit',
    icon: 'custom-wizard-submit',
  },
]

const currentStep = ref(0)
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)

const formData = ref({
  username: 'johndoe',
  email: 'john.doe@email.com',
  password: 'johndoe@J2',
  cPassword: 'johndoe@J2',
  firstName: 'John',
  lastName: 'Doe',
  country: 'UK',
  language: 'English',
  address: '98 Borough bridge Road, Birmingham',
  landmark: 'Borough bridge',
  pincode: '658921',
  city: 'Birmingham',
  twitter: 'https://twitter.com/abc',
  facebook: 'https://facebook.com/abc',
  googlePlus: 'https://plus.google.com/abc',
  LinkedIn: 'https://linkedin.com/abc',
})

const onSubmit = () => {
  console.log(formData.value)
}
<\/script>

<template>
  <!-- 👉 Stepper -->
  <div class="mb-6">
    <AppStepper
      v-model:current-step="currentStep"
      :items="iconsSteps"
    />
  </div>

  <VCard>
    <VCardText>
      <!-- 👉 stepper content -->
      <VForm>
        <VWindow
          v-model="currentStep"
          class="disable-tab-transition"
        >
          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Account Details
                </h6>
                <p class="mb-0">
                  Enter your Account Details
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.username"
                  placeholder="CarterLeonardo"
                  label="Username"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.email"
                  placeholder="carterleonardo@gmail.com"
                  label="Email"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.password"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.cPassword"
                  label="Confirm Password"
                  placeholder="············"
                  :type="isCPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isCPasswordVisible = !isCPasswordVisible"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Personal Info
                </h6>
                <p class="mb-0">
                  Setup Information
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.firstName"
                  label="First Name"
                  placeholder="Leonard"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.lastName"
                  label="Last Name"
                  placeholder="Carter"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="formData.country"
                  label="Country"
                  placeholder="Select Country"
                  :items="['UK', 'USA', 'Canada', 'Australia', 'Germany']"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="formData.language"
                  label="Language"
                  placeholder="Select Language"
                  :items="['English', 'Spanish', 'French', 'Russian', 'German']"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Address
                </h6>
                <p class="mb-0">
                  Enter Your Address.
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.address"
                  placeholder="98 Borough bridge Road, Birmingham"
                  label="Address"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.landmark"
                  placeholder="Borough bridge"
                  label="Landmark"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.pincode"
                  placeholder="658921"
                  label="Pincode"
                  type="number"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.city"
                  placeholder="New York"
                  label="City"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Social Links
                </h6>
                <p class="mb-0">
                  Add Social Links
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.twitter"
                  placeholder="https://twitter.com/abc"
                  label="Twitter"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.facebook"
                  placeholder="https://facebook.com/abc"
                  label="Facebook"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.googlePlus"
                  placeholder="https://plus.google.com/abc"
                  label="Google+"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.LinkedIn"
                  placeholder="https://linkedin.com/abc"
                  label="LinkedIn"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <div class="text-base">
              <h6 class="text-base font-weight-medium mb-2">
                Account
              </h6>

              <p class="mb-1">
                {{ formData.username }}
              </p>
              <p class="mb-1">
                {{ formData.email }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Personal Info
              </h6>

              <p class="mb-1">
                {{ formData.firstName }}
              </p>
              <p class="mb-1">
                {{ formData.lastName }}
              </p>
              <p class="mb-1">
                {{ formData.country }}
              </p>
              <p class="mb-1">
                {{ formData.language }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Address
              </h6>

              <p class="mb-1">
                {{ formData.address }}
              </p>
              <p class="mb-1">
                {{ formData.landmark }}
              </p>
              <p class="mb-1">
                {{ formData.pincode }}
              </p>
              <p class="mb-1">
                {{ formData.city }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Social Links
              </h6>

              <p class="mb-1">
                {{ formData.twitter }}
              </p>
              <p class="mb-1">
                {{ formData.facebook }}
              </p>
              <p class="mb-1">
                {{ formData.googlePlus }}
              </p>
              <p class="mb-1">
                {{ formData.LinkedIn }}
              </p>
            </div>
          </VWindowItem>
        </VWindow>

        <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
          <VBtn
            color="secondary"
            variant="tonal"
            :disabled="currentStep === 0"
            @click="currentStep--"
          >
            <VIcon
              icon="tabler-arrow-left"
              start
              class="flip-in-rtl"
            />
            Previous
          </VBtn>

          <VBtn
            v-if="iconsSteps.length - 1 === currentStep"
            color="success"
            append-icon="tabler-check"
            @click="onSubmit"
          >
            submit
          </VBtn>

          <VBtn
            v-else
            @click="currentStep++"
          >
            Next

            <VIcon
              icon="tabler-arrow-right"
              end
              class="flip-in-rtl"
            />
          </VBtn>
        </div>
      </VForm>
    </VCardText>
  </VCard>
</template>
`},de={ts:`<script setup lang="ts">
const numberedSteps = [
  {
    title: 'Account Details',
    icon: 'tabler-file-description',
    subtitle: 'Setup account details',
  },
  {
    title: 'Personal Info',
    icon: 'tabler-user',
    subtitle: 'Add personal info',
  },
  {
    title: 'Social Links',
    icon: 'tabler-link',
    subtitle: 'Add social links',
  },
]

const currentStep = ref(0)
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)

const formData = ref({
  username: '',
  email: '',
  password: '',
  cPassword: '',
  firstName: '',
  lastName: '',
  country: undefined,
  language: undefined,
  twitter: '',
  facebook: '',
  googlePlus: '',
  LinkedIn: '',

})

const onSubmit = () => {
  console.log(formData.value)
}
<\/script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="4"
    >
      <!-- 👉 Stepper -->
      <div class="pa-6">
        <AppStepper
          v-model:current-step="currentStep"
          direction="vertical"
          :items="numberedSteps"
          icon-size="24"
          class="stepper-icon-step-bg"
        />
      </div>
    </VCol>

    <!-- 👉 stepper content -->
    <VCol
      cols="12"
      md="8"
    >
      <VCard>
        <VCardText>
          <VForm>
            <VWindow
              v-model="currentStep"
              class="disable-tab-transition"
            >
              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h6 class="text-h6 font-weight-medium">
                      Account Details
                    </h6>
                    <p class="mb-0">
                      Enter your Account Details
                    </p>
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.username"
                      placeholder="CarterLeonardo"
                      label="Username"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.email"
                      placeholder="carterleonardo@gmail.com"
                      label="Email"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.password"
                      label="Password"
                      placeholder="············"
                      :type="isPasswordVisible ? 'text' : 'password'"
                      :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                      @click:append-inner="isPasswordVisible = !isPasswordVisible"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.cPassword"
                      label="Confirm Password"
                      placeholder="············"
                      :type="isCPasswordVisible ? 'text' : 'password'"
                      :append-inner-icon="isCPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                      @click:append-inner="isCPasswordVisible = !isCPasswordVisible"
                    />
                  </VCol>
                </VRow>
              </VWindowItem>
              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h6 class="text-h6 font-weight-medium">
                      Personal Info
                    </h6>
                    <p class="mb-0">
                      Setup Information
                    </p>
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.firstName"
                      label="First Name"
                      placeholder="Leonard"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.lastName"
                      label="Last Name"
                      placeholder="Carter"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppSelect
                      v-model="formData.country"
                      label="Country"
                      placeholder="Select Country"
                      :items="['UK', 'USA', 'Canada', 'Australia', 'Germany']"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppSelect
                      v-model="formData.language"
                      label="Language"
                      placeholder="Select Language"
                      :items="['English', 'Spanish', 'French', 'Russian', 'German']"
                    />
                  </VCol>
                </VRow>
              </VWindowItem>
              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h6 class="text-h6 font-weight-medium">
                      Social Links
                    </h6>
                    <p class="mb-0">
                      Add Social Links
                    </p>
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.twitter"
                      placeholder="https://twitter.com/abc"
                      label="Twitter"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.facebook"
                      placeholder="https://facebook.com/abc"
                      label="Facebook"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.googlePlus"
                      placeholder="https://plus.google.com/abc"
                      label="Google+"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.LinkedIn"
                      placeholder="https://linkedin.com/abc"
                      label="LinkedIn"
                    />
                  </VCol>
                </VRow>
              </VWindowItem>
            </VWindow>
            <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
              <VBtn
                color="secondary"
                variant="tonal"
                :disabled="currentStep === 0"
                @click="currentStep--"
              >
                <VIcon
                  icon="tabler-arrow-left"
                  start
                  class="flip-in-rtl"
                />
                Previous
              </VBtn>
              <VBtn
                v-if="numberedSteps.length - 1 === currentStep"
                color="success"
                append-icon="tabler-check"
                @click="onSubmit"
              >
                submit
              </VBtn>
              <VBtn
                v-else
                @click="currentStep++"
              >
                Next
                <VIcon
                  icon="tabler-arrow-right"
                  end
                  class="flip-in-rtl"
                />
              </VBtn>
            </div>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
`,js:`<script setup>
const numberedSteps = [
  {
    title: 'Account Details',
    icon: 'tabler-file-description',
    subtitle: 'Setup account details',
  },
  {
    title: 'Personal Info',
    icon: 'tabler-user',
    subtitle: 'Add personal info',
  },
  {
    title: 'Social Links',
    icon: 'tabler-link',
    subtitle: 'Add social links',
  },
]

const currentStep = ref(0)
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)

const formData = ref({
  username: '',
  email: '',
  password: '',
  cPassword: '',
  firstName: '',
  lastName: '',
  country: undefined,
  language: undefined,
  twitter: '',
  facebook: '',
  googlePlus: '',
  LinkedIn: '',
})

const onSubmit = () => {
  console.log(formData.value)
}
<\/script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="4"
    >
      <!-- 👉 Stepper -->
      <div class="pa-6">
        <AppStepper
          v-model:current-step="currentStep"
          direction="vertical"
          :items="numberedSteps"
          icon-size="24"
          class="stepper-icon-step-bg"
        />
      </div>
    </VCol>

    <!-- 👉 stepper content -->
    <VCol
      cols="12"
      md="8"
    >
      <VCard>
        <VCardText>
          <VForm>
            <VWindow
              v-model="currentStep"
              class="disable-tab-transition"
            >
              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h6 class="text-h6 font-weight-medium">
                      Account Details
                    </h6>
                    <p class="mb-0">
                      Enter your Account Details
                    </p>
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.username"
                      placeholder="CarterLeonardo"
                      label="Username"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.email"
                      placeholder="carterleonardo@gmail.com"
                      label="Email"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.password"
                      label="Password"
                      placeholder="············"
                      :type="isPasswordVisible ? 'text' : 'password'"
                      :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                      @click:append-inner="isPasswordVisible = !isPasswordVisible"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.cPassword"
                      label="Confirm Password"
                      placeholder="············"
                      :type="isCPasswordVisible ? 'text' : 'password'"
                      :append-inner-icon="isCPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                      @click:append-inner="isCPasswordVisible = !isCPasswordVisible"
                    />
                  </VCol>
                </VRow>
              </VWindowItem>
              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h6 class="text-h6 font-weight-medium">
                      Personal Info
                    </h6>
                    <p class="mb-0">
                      Setup Information
                    </p>
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.firstName"
                      label="First Name"
                      placeholder="Leonard"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.lastName"
                      label="Last Name"
                      placeholder="Carter"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppSelect
                      v-model="formData.country"
                      label="Country"
                      placeholder="Select Country"
                      :items="['UK', 'USA', 'Canada', 'Australia', 'Germany']"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppSelect
                      v-model="formData.language"
                      label="Language"
                      placeholder="Select Language"
                      :items="['English', 'Spanish', 'French', 'Russian', 'German']"
                    />
                  </VCol>
                </VRow>
              </VWindowItem>
              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h6 class="text-h6 font-weight-medium">
                      Social Links
                    </h6>
                    <p class="mb-0">
                      Add Social Links
                    </p>
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.twitter"
                      placeholder="https://twitter.com/abc"
                      label="Twitter"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.facebook"
                      placeholder="https://facebook.com/abc"
                      label="Facebook"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.googlePlus"
                      placeholder="https://plus.google.com/abc"
                      label="Google+"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.LinkedIn"
                      placeholder="https://linkedin.com/abc"
                      label="LinkedIn"
                    />
                  </VCol>
                </VRow>
              </VWindowItem>
            </VWindow>
            <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
              <VBtn
                color="secondary"
                variant="tonal"
                :disabled="currentStep === 0"
                @click="currentStep--"
              >
                <VIcon
                  icon="tabler-arrow-left"
                  start
                  class="flip-in-rtl"
                />
                Previous
              </VBtn>
              <VBtn
                v-if="numberedSteps.length - 1 === currentStep"
                color="success"
                append-icon="tabler-check"
                @click="onSubmit"
              >
                submit
              </VBtn>
              <VBtn
                v-else
                @click="currentStep++"
              >
                Next
                <VIcon
                  icon="tabler-arrow-right"
                  end
                  class="flip-in-rtl"
                />
              </VBtn>
            </div>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
`},ne={ts:`<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'

const iconsSteps = [
  {
    title: 'Account Details',
    icon: 'custom-wizard-account',
  },
  {
    title: 'Personal Info',
    icon: 'custom-wizard-personal',
  },
  {
    title: 'Address',
    icon: 'custom-wizard-address',
  },
  {
    title: 'Social Links',
    icon: 'custom-wizard-social-link',
  },
  {
    title: 'Review & Submit',
    icon: 'custom-wizard-submit',
  },
]

const currentStep = ref(0)
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)
const isCurrentStepValid = ref(true)
const refAccountForm = ref<VForm>()
const refPersonalForm = ref<VForm>()
const refSocialLinkForm = ref<VForm>()
const refAddressForm = ref<VForm>()

const accountForm = ref({
  username: '',
  email: '',
  password: '',
  cPassword: '',
})

const personalForm = ref({
  firstName: '',
  lastName: '',
  country: undefined,
  language: undefined,
})

const socialForm = ref({
  twitter: '',
  facebook: '',
  googlePlus: '',
  LinkedIn: '',
})

const addressForm = ref({
  address: '',
  landmark: '',
  city: '',
  pincode: '',
})

const validateAccountForm = () => {
  refAccountForm.value?.validate().then(valid => {
    if (valid.valid) {
      currentStep.value++
      isCurrentStepValid.value = true
    }
    else { isCurrentStepValid.value = false }
  })
}

const validatePersonalForm = () => {
  refPersonalForm.value?.validate().then(valid => {
    if (valid.valid) {
      currentStep.value++
      isCurrentStepValid.value = true
    }
    else { isCurrentStepValid.value = false }
  })
}

const validateAddressForm = () => {
  refAddressForm.value?.validate().then(valid => {
    if (valid.valid) {
      currentStep.value++
      isCurrentStepValid.value = true
    }
    else { isCurrentStepValid.value = false }
  })
}

const validateSocialLinkForm = () => {
  refSocialLinkForm.value?.validate().then(valid => {
    if (valid.valid) {
      currentStep.value++
      isCurrentStepValid.value = true
    }
    else { isCurrentStepValid.value = false }
  })
}
<\/script>

<template>
  <VCard>
    <VCardText>
      <!-- 👉 Stepper -->
      <AppStepper
        v-model:current-step="currentStep"
        :items="iconsSteps"
        :is-active-step-valid="isCurrentStepValid"
      />
    </VCardText>

    <VDivider />

    <VCardText>
      <!-- 👉 stepper content -->

      <VWindow
        v-model="currentStep"
        class="disable-tab-transition"
      >
        <VWindowItem>
          <VForm
            ref="refAccountForm"
            @submit.prevent="validateAccountForm"
          >
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Account Details
                </h6>
                <p class="mb-0">
                  Enter your Account Details
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountForm.username"
                  placeholder="CarterLeonardo"
                  :rules="[requiredValidator]"
                  label="Username"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountForm.email"
                  placeholder="carterleonardo@gmail.com"
                  :rules="[requiredValidator, emailValidator]"
                  label="Email"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountForm.password"
                  placeholder="············"
                  label="Password"
                  :rules="[requiredValidator, passwordValidator]"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountForm.cPassword"
                  placeholder="············"
                  label="Confirm Password"
                  :rules="[requiredValidator, confirmedValidator(accountForm.cPassword, accountForm.password)]"
                  :type="isCPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isCPasswordVisible = !isCPasswordVisible"
                />
              </VCol>

              <VCol cols="12">
                <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
                  <VBtn
                    color="secondary"
                    variant="tonal"
                    disabled
                  >
                    <VIcon
                      icon="tabler-arrow-left"
                      start
                      class="flip-in-rtl"
                    />
                    Previous
                  </VBtn>

                  <VBtn type="submit">
                    Next
                    <VIcon
                      icon="tabler-arrow-right"
                      end
                      class="flip-in-rtl"
                    />
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem>
          <VForm
            ref="refPersonalForm"
            @submit.prevent="validatePersonalForm"
          >
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Personal Info
                </h6>
                <p class="mb-0">
                  Setup Information
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="personalForm.firstName"
                  label="First Name"
                  :rules="[requiredValidator]"
                  placeholder="Leonard"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="personalForm.lastName"
                  label="Last Name"
                  :rules="[requiredValidator]"
                  placeholder="Carter"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="personalForm.country"
                  label="Country"
                  :rules="[requiredValidator]"
                  placeholder="Select Country"
                  :items="['UK', 'USA', 'Canada', 'Australia', 'Germany']"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="personalForm.language"
                  label="Language"
                  :rules="[requiredValidator]"
                  placeholder="Select Language"
                  :items="['English', 'Spanish', 'French', 'Russian', 'German']"
                />
              </VCol>

              <VCol cols="12">
                <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
                  <VBtn
                    color="secondary"
                    variant="tonal"
                    @click="currentStep--"
                  >
                    <VIcon
                      icon="tabler-arrow-left"
                      start
                      class="flip-in-rtl"
                    />
                    Previous
                  </VBtn>

                  <VBtn type="submit">
                    Next
                    <VIcon
                      icon="tabler-arrow-right"
                      end
                      class="flip-in-rtl"
                    />
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem>
          <VForm
            ref="refAddressForm"
            @submit.prevent="validateAddressForm"
          >
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Address
                </h6>
                <p class="mb-0">
                  Enter Your Address.
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="addressForm.address"
                  :rules="[requiredValidator]"
                  placeholder="98 Borough bridge Road, Birmingham"
                  label="Address"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="addressForm.landmark"
                  :rules="[requiredValidator]"
                  placeholder="Borough bridge"
                  label="Landmark"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="addressForm.pincode"
                  :rules="[requiredValidator]"
                  placeholder="658921"
                  label="Pincode"
                  type="number"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="addressForm.city"
                  :rules="[requiredValidator]"
                  placeholder="New York"
                  label="City"
                />
              </VCol>

              <VCol cols="12">
                <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
                  <VBtn
                    color="secondary"
                    variant="tonal"
                    @click="currentStep--"
                  >
                    <VIcon
                      icon="tabler-arrow-left"
                      start
                      class="flip-in-rtl"
                    />
                    Previous
                  </VBtn>

                  <VBtn type="submit">
                    Next
                    <VIcon
                      icon="tabler-arrow-right"
                      end
                      class="flip-in-rtl"
                    />
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem>
          <VForm
            ref="refSocialLinkForm"
            @submit.prevent="validateSocialLinkForm"
          >
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Social Links
                </h6>
                <p class="mb-0">
                  Add Social Links
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="socialForm.twitter"
                  placeholder="https://twitter.com/abc"
                  :rules="[requiredValidator, urlValidator]"
                  label="Twitter"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="socialForm.facebook"
                  placeholder="https://facebook.com/abc"
                  :rules="[requiredValidator, urlValidator]"
                  label="Facebook"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="socialForm.googlePlus"
                  placeholder="https://plus.google.com/abc"
                  :rules="[requiredValidator, urlValidator]"
                  label="Google+"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="socialForm.LinkedIn"
                  placeholder="https://linkedin.com/abc"
                  :rules="[requiredValidator, urlValidator]"
                  label="LinkedIn"
                />
              </VCol>

              <VCol cols="12">
                <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
                  <VBtn
                    color="secondary"
                    variant="tonal"
                    @click="currentStep--"
                  >
                    <VIcon
                      icon="tabler-arrow-left"
                      start
                      class="flip-in-rtl"
                    />
                    Previous
                  </VBtn>

                  <VBtn type="submit">
                    Next
                    <VIcon
                      icon="tabler-arrow-right"
                      end
                      class="flip-in-rtl"
                    />
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem>
          <div class="text-base">
            <h6 class="text-base font-weight-medium mb-2">
              Account
            </h6>

            <p class="mb-1">
              {{ accountForm.username }}
            </p>
            <p class="mb-1">
              {{ accountForm.email }}
            </p>

            <VDivider class="my-4" />

            <h6 class="text-base font-weight-medium mb-2">
              Personal Info
            </h6>

            <p class="mb-1">
              {{ personalForm.firstName }}
            </p>
            <p class="mb-1">
              {{ personalForm.lastName }}
            </p>
            <p class="mb-1">
              {{ personalForm.country }}
            </p>
            <p class="mb-1">
              {{ personalForm.language }}
            </p>

            <VDivider class="my-4" />

            <h6 class="text-base font-weight-medium mb-2">
              Address
            </h6>

            <p class="mb-1">
              {{ addressForm.address }}
            </p>
            <p class="mb-1">
              {{ addressForm.landmark }}
            </p>
            <p class="mb-1">
              {{ addressForm.pincode }}
            </p>
            <p class="mb-1">
              {{ addressForm.city }}
            </p>

            <VDivider class="my-4" />

            <h6 class="text-base font-weight-medium mb-2">
              Social Links
            </h6>

            <p class="mb-1">
              {{ socialForm.twitter }}
            </p>
            <p class="mb-1">
              {{ socialForm.facebook }}
            </p>
            <p class="mb-1">
              {{ socialForm.googlePlus }}
            </p>
            <p class="mb-1">
              {{ socialForm.LinkedIn }}
            </p>
          </div>
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
`,js:`<script setup>
import { VForm } from 'vuetify/components/VForm'

const iconsSteps = [
  {
    title: 'Account Details',
    icon: 'custom-wizard-account',
  },
  {
    title: 'Personal Info',
    icon: 'custom-wizard-personal',
  },
  {
    title: 'Address',
    icon: 'custom-wizard-address',
  },
  {
    title: 'Social Links',
    icon: 'custom-wizard-social-link',
  },
  {
    title: 'Review & Submit',
    icon: 'custom-wizard-submit',
  },
]

const currentStep = ref(0)
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)
const isCurrentStepValid = ref(true)
const refAccountForm = ref()
const refPersonalForm = ref()
const refSocialLinkForm = ref()
const refAddressForm = ref()

const accountForm = ref({
  username: '',
  email: '',
  password: '',
  cPassword: '',
})

const personalForm = ref({
  firstName: '',
  lastName: '',
  country: undefined,
  language: undefined,
})

const socialForm = ref({
  twitter: '',
  facebook: '',
  googlePlus: '',
  LinkedIn: '',
})

const addressForm = ref({
  address: '',
  landmark: '',
  city: '',
  pincode: '',
})

const validateAccountForm = () => {
  refAccountForm.value?.validate().then(valid => {
    if (valid.valid) {
      currentStep.value++
      isCurrentStepValid.value = true
    } else {
      isCurrentStepValid.value = false
    }
  })
}

const validatePersonalForm = () => {
  refPersonalForm.value?.validate().then(valid => {
    if (valid.valid) {
      currentStep.value++
      isCurrentStepValid.value = true
    } else {
      isCurrentStepValid.value = false
    }
  })
}

const validateAddressForm = () => {
  refAddressForm.value?.validate().then(valid => {
    if (valid.valid) {
      currentStep.value++
      isCurrentStepValid.value = true
    } else {
      isCurrentStepValid.value = false
    }
  })
}

const validateSocialLinkForm = () => {
  refSocialLinkForm.value?.validate().then(valid => {
    if (valid.valid) {
      currentStep.value++
      isCurrentStepValid.value = true
    } else {
      isCurrentStepValid.value = false
    }
  })
}
<\/script>

<template>
  <VCard>
    <VCardText>
      <!-- 👉 Stepper -->
      <AppStepper
        v-model:current-step="currentStep"
        :items="iconsSteps"
        :is-active-step-valid="isCurrentStepValid"
      />
    </VCardText>

    <VDivider />

    <VCardText>
      <!-- 👉 stepper content -->

      <VWindow
        v-model="currentStep"
        class="disable-tab-transition"
      >
        <VWindowItem>
          <VForm
            ref="refAccountForm"
            @submit.prevent="validateAccountForm"
          >
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Account Details
                </h6>
                <p class="mb-0">
                  Enter your Account Details
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountForm.username"
                  placeholder="CarterLeonardo"
                  :rules="[requiredValidator]"
                  label="Username"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountForm.email"
                  placeholder="carterleonardo@gmail.com"
                  :rules="[requiredValidator, emailValidator]"
                  label="Email"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountForm.password"
                  placeholder="············"
                  label="Password"
                  :rules="[requiredValidator, passwordValidator]"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountForm.cPassword"
                  placeholder="············"
                  label="Confirm Password"
                  :rules="[requiredValidator, confirmedValidator(accountForm.cPassword, accountForm.password)]"
                  :type="isCPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isCPasswordVisible = !isCPasswordVisible"
                />
              </VCol>

              <VCol cols="12">
                <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
                  <VBtn
                    color="secondary"
                    variant="tonal"
                    disabled
                  >
                    <VIcon
                      icon="tabler-arrow-left"
                      start
                      class="flip-in-rtl"
                    />
                    Previous
                  </VBtn>

                  <VBtn type="submit">
                    Next
                    <VIcon
                      icon="tabler-arrow-right"
                      end
                      class="flip-in-rtl"
                    />
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem>
          <VForm
            ref="refPersonalForm"
            @submit.prevent="validatePersonalForm"
          >
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Personal Info
                </h6>
                <p class="mb-0">
                  Setup Information
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="personalForm.firstName"
                  label="First Name"
                  :rules="[requiredValidator]"
                  placeholder="Leonard"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="personalForm.lastName"
                  label="Last Name"
                  :rules="[requiredValidator]"
                  placeholder="Carter"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="personalForm.country"
                  label="Country"
                  :rules="[requiredValidator]"
                  placeholder="Select Country"
                  :items="['UK', 'USA', 'Canada', 'Australia', 'Germany']"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="personalForm.language"
                  label="Language"
                  :rules="[requiredValidator]"
                  placeholder="Select Language"
                  :items="['English', 'Spanish', 'French', 'Russian', 'German']"
                />
              </VCol>

              <VCol cols="12">
                <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
                  <VBtn
                    color="secondary"
                    variant="tonal"
                    @click="currentStep--"
                  >
                    <VIcon
                      icon="tabler-arrow-left"
                      start
                      class="flip-in-rtl"
                    />
                    Previous
                  </VBtn>

                  <VBtn type="submit">
                    Next
                    <VIcon
                      icon="tabler-arrow-right"
                      end
                      class="flip-in-rtl"
                    />
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem>
          <VForm
            ref="refAddressForm"
            @submit.prevent="validateAddressForm"
          >
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Address
                </h6>
                <p class="mb-0">
                  Enter Your Address.
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="addressForm.address"
                  :rules="[requiredValidator]"
                  placeholder="98 Borough bridge Road, Birmingham"
                  label="Address"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="addressForm.landmark"
                  :rules="[requiredValidator]"
                  placeholder="Borough bridge"
                  label="Landmark"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="addressForm.pincode"
                  :rules="[requiredValidator]"
                  placeholder="658921"
                  label="Pincode"
                  type="number"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="addressForm.city"
                  :rules="[requiredValidator]"
                  placeholder="New York"
                  label="City"
                />
              </VCol>

              <VCol cols="12">
                <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
                  <VBtn
                    color="secondary"
                    variant="tonal"
                    @click="currentStep--"
                  >
                    <VIcon
                      icon="tabler-arrow-left"
                      start
                      class="flip-in-rtl"
                    />
                    Previous
                  </VBtn>

                  <VBtn type="submit">
                    Next
                    <VIcon
                      icon="tabler-arrow-right"
                      end
                      class="flip-in-rtl"
                    />
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem>
          <VForm
            ref="refSocialLinkForm"
            @submit.prevent="validateSocialLinkForm"
          >
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Social Links
                </h6>
                <p class="mb-0">
                  Add Social Links
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="socialForm.twitter"
                  placeholder="https://twitter.com/abc"
                  :rules="[requiredValidator, urlValidator]"
                  label="Twitter"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="socialForm.facebook"
                  placeholder="https://facebook.com/abc"
                  :rules="[requiredValidator, urlValidator]"
                  label="Facebook"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="socialForm.googlePlus"
                  placeholder="https://plus.google.com/abc"
                  :rules="[requiredValidator, urlValidator]"
                  label="Google+"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="socialForm.LinkedIn"
                  placeholder="https://linkedin.com/abc"
                  :rules="[requiredValidator, urlValidator]"
                  label="LinkedIn"
                />
              </VCol>

              <VCol cols="12">
                <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
                  <VBtn
                    color="secondary"
                    variant="tonal"
                    @click="currentStep--"
                  >
                    <VIcon
                      icon="tabler-arrow-left"
                      start
                      class="flip-in-rtl"
                    />
                    Previous
                  </VBtn>

                  <VBtn type="submit">
                    Next
                    <VIcon
                      icon="tabler-arrow-right"
                      end
                      class="flip-in-rtl"
                    />
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem>
          <div class="text-base">
            <h6 class="text-base font-weight-medium mb-2">
              Account
            </h6>

            <p class="mb-1">
              {{ accountForm.username }}
            </p>
            <p class="mb-1">
              {{ accountForm.email }}
            </p>

            <VDivider class="my-4" />

            <h6 class="text-base font-weight-medium mb-2">
              Personal Info
            </h6>

            <p class="mb-1">
              {{ personalForm.firstName }}
            </p>
            <p class="mb-1">
              {{ personalForm.lastName }}
            </p>
            <p class="mb-1">
              {{ personalForm.country }}
            </p>
            <p class="mb-1">
              {{ personalForm.language }}
            </p>

            <VDivider class="my-4" />

            <h6 class="text-base font-weight-medium mb-2">
              Address
            </h6>

            <p class="mb-1">
              {{ addressForm.address }}
            </p>
            <p class="mb-1">
              {{ addressForm.landmark }}
            </p>
            <p class="mb-1">
              {{ addressForm.pincode }}
            </p>
            <p class="mb-1">
              {{ addressForm.city }}
            </p>

            <VDivider class="my-4" />

            <h6 class="text-base font-weight-medium mb-2">
              Social Links
            </h6>

            <p class="mb-1">
              {{ socialForm.twitter }}
            </p>
            <p class="mb-1">
              {{ socialForm.facebook }}
            </p>
            <p class="mb-1">
              {{ socialForm.googlePlus }}
            </p>
            <p class="mb-1">
              {{ socialForm.LinkedIn }}
            </p>
          </div>
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
`},me={ts:`<script setup lang="ts">
const numberedSteps = [
  {
    title: 'Account Details',
    icon: 'tabler-file-description',
    subtitle: 'Setup account details',
  },
  {
    title: 'Personal Info',
    icon: 'tabler-user',
    subtitle: 'Add personal info',
  },
  {
    title: 'Social Links',
    icon: 'tabler-link',
    subtitle: 'Add social links',
  },

]

const currentStep = ref(0)
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)

const formData = ref({
  username: '',
  email: '',
  password: '',
  cPassword: '',
  firstName: '',
  lastName: '',
  country: undefined,
  language: undefined,
  twitter: '',
  facebook: '',
  googlePlus: '',
  LinkedIn: '',

})

const onSubmit = () => {
  console.log(formData.value)
}
<\/script>

<template>
  <VCard>
    <VRow>
      <VCol
        cols="12"
        md="4"
        :class="$vuetify.display.smAndDown ? 'border-b' : 'border-e'"
      >
        <VCardText>
          <!-- 👉 Stepper -->
          <AppStepper
            v-model:current-step="currentStep"
            direction="vertical"
            :items="numberedSteps"
            icon-size="24"
            class="stepper-icon-step-bg"
          />
        </VCardText>
      </VCol>
      <!-- 👉 stepper content -->
      <VCol
        cols="12"
        md="8"
      >
        <VCardText>
          <VForm>
            <VWindow
              v-model="currentStep"
              class="disable-tab-transition"
            >
              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h6 class="text-h6 font-weight-medium">
                      Account Details
                    </h6>
                    <p class="mb-0">
                      Enter your Account Details
                    </p>
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.username"
                      placeholder="CarterLeonardo"
                      label="Username"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.email"
                      placeholder="carterleonardo@gmail.com"
                      label="Email"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.password"
                      label="Password"
                      placeholder="············"
                      :type="isPasswordVisible ? 'text' : 'password'"
                      :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                      @click:append-inner="isPasswordVisible = !isPasswordVisible"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.cPassword"
                      label="Confirm Password"
                      placeholder="············"
                      :type="isCPasswordVisible ? 'text' : 'password'"
                      :append-inner-icon="isCPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                      @click:append-inner="isCPasswordVisible = !isCPasswordVisible"
                    />
                  </VCol>
                </VRow>
              </VWindowItem>

              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h6 class="text-h6 font-weight-medium">
                      Personal Info
                    </h6>
                    <p class="mb-0">
                      Setup Information
                    </p>
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.firstName"
                      label="First Name"
                      placeholder="Leonard"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.lastName"
                      label="Last Name"
                      placeholder="Carter"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppSelect
                      v-model="formData.country"
                      label="Country"
                      placeholder="Select Country"
                      :items="['UK', 'USA', 'Canada', 'Australia', 'Germany']"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppSelect
                      v-model="formData.language"
                      label="Language"
                      placeholder="Select Language"
                      :items="['English', 'Spanish', 'French', 'Russian', 'German']"
                    />
                  </VCol>
                </VRow>
              </VWindowItem>

              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h6 class="text-h6 font-weight-medium">
                      Social Links
                    </h6>
                    <p class="mb-0">
                      Add Social Links
                    </p>
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.twitter"
                      placeholder="https://twitter.com/abc"
                      label="Twitter"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.facebook"
                      placeholder="https://facebook.com/abc"
                      label="Facebook"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.googlePlus"
                      placeholder="https://plus.google.com/abc"
                      label="Google+"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.LinkedIn"
                      placeholder="https://linkedin.com/abc"
                      label="LinkedIn"
                    />
                  </VCol>
                </VRow>
              </VWindowItem>
            </VWindow>

            <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
              <VBtn
                color="secondary"
                variant="tonal"
                :disabled="currentStep === 0"
                @click="currentStep--"
              >
                <VIcon
                  icon="tabler-arrow-left"
                  start
                  class="flip-in-rtl"
                />
                Previous
              </VBtn>

              <VBtn
                v-if="numberedSteps.length - 1 === currentStep"
                color="success"
                append-icon="tabler-check"
                @click="onSubmit"
              >
                submit
              </VBtn>

              <VBtn
                v-else
                @click="currentStep++"
              >
                Next

                <VIcon
                  icon="tabler-arrow-right"
                  end
                  class="flip-in-rtl"
                />
              </VBtn>
            </div>
          </VForm>
        </VCardText>
      </VCol>
    </VRow>
  </VCard>
</template>
`,js:`<script setup>
const numberedSteps = [
  {
    title: 'Account Details',
    icon: 'tabler-file-description',
    subtitle: 'Setup account details',
  },
  {
    title: 'Personal Info',
    icon: 'tabler-user',
    subtitle: 'Add personal info',
  },
  {
    title: 'Social Links',
    icon: 'tabler-link',
    subtitle: 'Add social links',
  },
]

const currentStep = ref(0)
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)

const formData = ref({
  username: '',
  email: '',
  password: '',
  cPassword: '',
  firstName: '',
  lastName: '',
  country: undefined,
  language: undefined,
  twitter: '',
  facebook: '',
  googlePlus: '',
  LinkedIn: '',
})

const onSubmit = () => {
  console.log(formData.value)
}
<\/script>

<template>
  <VCard>
    <VRow>
      <VCol
        cols="12"
        md="4"
        :class="$vuetify.display.smAndDown ? 'border-b' : 'border-e'"
      >
        <VCardText>
          <!-- 👉 Stepper -->
          <AppStepper
            v-model:current-step="currentStep"
            direction="vertical"
            :items="numberedSteps"
            icon-size="24"
            class="stepper-icon-step-bg"
          />
        </VCardText>
      </VCol>
      <!-- 👉 stepper content -->
      <VCol
        cols="12"
        md="8"
      >
        <VCardText>
          <VForm>
            <VWindow
              v-model="currentStep"
              class="disable-tab-transition"
            >
              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h6 class="text-h6 font-weight-medium">
                      Account Details
                    </h6>
                    <p class="mb-0">
                      Enter your Account Details
                    </p>
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.username"
                      placeholder="CarterLeonardo"
                      label="Username"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.email"
                      placeholder="carterleonardo@gmail.com"
                      label="Email"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.password"
                      label="Password"
                      placeholder="············"
                      :type="isPasswordVisible ? 'text' : 'password'"
                      :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                      @click:append-inner="isPasswordVisible = !isPasswordVisible"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.cPassword"
                      label="Confirm Password"
                      placeholder="············"
                      :type="isCPasswordVisible ? 'text' : 'password'"
                      :append-inner-icon="isCPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                      @click:append-inner="isCPasswordVisible = !isCPasswordVisible"
                    />
                  </VCol>
                </VRow>
              </VWindowItem>

              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h6 class="text-h6 font-weight-medium">
                      Personal Info
                    </h6>
                    <p class="mb-0">
                      Setup Information
                    </p>
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.firstName"
                      label="First Name"
                      placeholder="Leonard"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.lastName"
                      label="Last Name"
                      placeholder="Carter"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppSelect
                      v-model="formData.country"
                      label="Country"
                      placeholder="Select Country"
                      :items="['UK', 'USA', 'Canada', 'Australia', 'Germany']"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppSelect
                      v-model="formData.language"
                      label="Language"
                      placeholder="Select Language"
                      :items="['English', 'Spanish', 'French', 'Russian', 'German']"
                    />
                  </VCol>
                </VRow>
              </VWindowItem>

              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h6 class="text-h6 font-weight-medium">
                      Social Links
                    </h6>
                    <p class="mb-0">
                      Add Social Links
                    </p>
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.twitter"
                      placeholder="https://twitter.com/abc"
                      label="Twitter"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.facebook"
                      placeholder="https://facebook.com/abc"
                      label="Facebook"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.googlePlus"
                      placeholder="https://plus.google.com/abc"
                      label="Google+"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.LinkedIn"
                      placeholder="https://linkedin.com/abc"
                      label="LinkedIn"
                    />
                  </VCol>
                </VRow>
              </VWindowItem>
            </VWindow>

            <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
              <VBtn
                color="secondary"
                variant="tonal"
                :disabled="currentStep === 0"
                @click="currentStep--"
              >
                <VIcon
                  icon="tabler-arrow-left"
                  start
                  class="flip-in-rtl"
                />
                Previous
              </VBtn>

              <VBtn
                v-if="numberedSteps.length - 1 === currentStep"
                color="success"
                append-icon="tabler-check"
                @click="onSubmit"
              >
                submit
              </VBtn>

              <VBtn
                v-else
                @click="currentStep++"
              >
                Next

                <VIcon
                  icon="tabler-arrow-right"
                  end
                  class="flip-in-rtl"
                />
              </VBtn>
            </div>
          </VForm>
        </VCardText>
      </VCol>
    </VRow>
  </VCard>
</template>
`},ce={class:"text-base"},pe={class:"mb-1"},ue={class:"mb-1"},Ve={class:"mb-1"},be={class:"mb-1"},fe={class:"mb-1"},we={class:"mb-1"},Ce={class:"mb-1"},ge={class:"mb-1"},he={class:"mb-1"},ve={class:"mb-1"},ke={class:"mb-1"},ye={class:"mb-1"},Se={class:"mb-1"},Ae={class:"mb-1"},Fe={class:"d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8"},xe={__name:"DemoFormWizardIconsBasic",setup(R){const S=[{title:"Account Details",icon:"custom-address"},{title:"Personal Info",icon:"custom-wizard-personal"},{title:"Address",icon:"custom-wizard-address"},{title:"Social Links",icon:"custom-wizard-social-link"},{title:"Review & Submit",icon:"custom-wizard-submit"}],m=b(0),V=b(!1),f=b(!1),t=b({username:"johndoe",email:"john.doe@email.com",password:"johndoe@J2",cPassword:"johndoe@J2",firstName:"John",lastName:"Doe",country:"UK",language:"English",address:"98 Borough bridge Road, Birmingham",landmark:"Borough bridge",pincode:"658921",city:"Birmingham",twitter:"https://twitter.com/abc",facebook:"https://facebook.com/abc",googlePlus:"https://plus.google.com/abc",linkedIn:"https://linkedin.com/abc"}),I=()=>{console.log(t.value)};return(U,o)=>{const L=$,n=j,w=W;return F(),D(q,null,{default:a(()=>[e(B,null,{default:a(()=>[e(L,{"current-step":l(m),"onUpdate:currentStep":o[0]||(o[0]=s=>T(m)?m.value=s:null),items:S},null,8,["current-step"])]),_:1}),e(P),e(B,null,{default:a(()=>[e(N,null,{default:a(()=>[e(E,{modelValue:l(m),"onUpdate:modelValue":o[19]||(o[19]=s=>T(m)?m.value=s:null),class:"disable-tab-transition"},{default:a(()=>[e(g,null,{default:a(()=>[e(C,null,{default:a(()=>[e(i,{cols:"12"},{default:a(()=>o[22]||(o[22]=[r("h6",{class:"text-h6 font-weight-medium"}," Account Details ",-1),r("p",{class:"mb-0"}," Enter your Account Details ",-1)])),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).username,"onUpdate:modelValue":o[1]||(o[1]=s=>l(t).username=s),placeholder:"CarterLeonardo",label:"Username"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).email,"onUpdate:modelValue":o[2]||(o[2]=s=>l(t).email=s),placeholder:"carterleonardo@gmail.com",label:"Email"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).password,"onUpdate:modelValue":o[3]||(o[3]=s=>l(t).password=s),label:"Password",placeholder:"············",type:l(V)?"text":"password","append-inner-icon":l(V)?"tabler-eye-off":"tabler-eye","onClick:appendInner":o[4]||(o[4]=s=>V.value=!l(V))},null,8,["modelValue","type","append-inner-icon"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).cPassword,"onUpdate:modelValue":o[5]||(o[5]=s=>l(t).cPassword=s),label:"Confirm Password",placeholder:"············",type:l(f)?"text":"password","append-inner-icon":l(f)?"tabler-eye-off":"tabler-eye","onClick:appendInner":o[6]||(o[6]=s=>f.value=!l(f))},null,8,["modelValue","type","append-inner-icon"])]),_:1})]),_:1})]),_:1}),e(g,null,{default:a(()=>[e(C,null,{default:a(()=>[e(i,{cols:"12"},{default:a(()=>o[23]||(o[23]=[r("h6",{class:"text-h6 font-weight-medium"}," Personal Info ",-1),r("p",{class:"mb-0"}," Setup Information ",-1)])),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).firstName,"onUpdate:modelValue":o[7]||(o[7]=s=>l(t).firstName=s),label:"First Name",placeholder:"Leonard"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).lastName,"onUpdate:modelValue":o[8]||(o[8]=s=>l(t).lastName=s),label:"Last Name",placeholder:"Carter"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(w,{modelValue:l(t).country,"onUpdate:modelValue":o[9]||(o[9]=s=>l(t).country=s),label:"Country",placeholder:"Select Country",items:["UK","USA","Canada","Australia","Germany"]},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(w,{modelValue:l(t).language,"onUpdate:modelValue":o[10]||(o[10]=s=>l(t).language=s),label:"Language",placeholder:"Select Language",items:["English","Spanish","French","Russian","German"]},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(g,null,{default:a(()=>[e(C,null,{default:a(()=>[e(i,{cols:"12"},{default:a(()=>o[24]||(o[24]=[r("h6",{class:"text-h6 font-weight-medium"}," Address ",-1),r("p",{class:"mb-0"}," Enter Your Address. ",-1)])),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).address,"onUpdate:modelValue":o[11]||(o[11]=s=>l(t).address=s),placeholder:"98 Borough bridge Road, Birmingham",label:"Address"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).landmark,"onUpdate:modelValue":o[12]||(o[12]=s=>l(t).landmark=s),placeholder:"Borough bridge",label:"Landmark"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).pincode,"onUpdate:modelValue":o[13]||(o[13]=s=>l(t).pincode=s),placeholder:"658921",label:"Pincode",type:"number"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).city,"onUpdate:modelValue":o[14]||(o[14]=s=>l(t).city=s),placeholder:"New York",label:"City"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(g,null,{default:a(()=>[e(C,null,{default:a(()=>[e(i,{cols:"12"},{default:a(()=>o[25]||(o[25]=[r("h6",{class:"text-h6 font-weight-medium"}," Social Links ",-1),r("p",{class:"mb-0"}," Add Social Links ",-1)])),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).twitter,"onUpdate:modelValue":o[15]||(o[15]=s=>l(t).twitter=s),placeholder:"https://twitter.com/abc",label:"Twitter"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).facebook,"onUpdate:modelValue":o[16]||(o[16]=s=>l(t).facebook=s),placeholder:"https://facebook.com/abc",label:"Facebook"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).googlePlus,"onUpdate:modelValue":o[17]||(o[17]=s=>l(t).googlePlus=s),placeholder:"https://plus.google.com/abc",label:"Google+"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).linkedIn,"onUpdate:modelValue":o[18]||(o[18]=s=>l(t).linkedIn=s),placeholder:"https://linkedin.com/abc",label:"LinkedIn"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(g,null,{default:a(()=>[r("div",ce,[o[26]||(o[26]=r("h6",{class:"text-base font-weight-medium mb-2"}," Account ",-1)),r("p",pe,p(l(t).username),1),r("p",ue,p(l(t).email),1),e(P,{class:"my-4"}),o[27]||(o[27]=r("h6",{class:"text-base font-weight-medium mb-2"}," Personal Info ",-1)),r("p",Ve,p(l(t).firstName),1),r("p",be,p(l(t).lastName),1),r("p",fe,p(l(t).country),1),r("p",we,p(l(t).language),1),e(P,{class:"my-4"}),o[28]||(o[28]=r("h6",{class:"text-base font-weight-medium mb-2"}," Address ",-1)),r("p",Ce,p(l(t).address),1),r("p",ge,p(l(t).landmark),1),r("p",he,p(l(t).pincode),1),r("p",ve,p(l(t).city),1),e(P,{class:"my-4"}),o[29]||(o[29]=r("h6",{class:"text-base font-weight-medium mb-2"}," Social Links ",-1)),r("p",ke,p(l(t).twitter),1),r("p",ye,p(l(t).facebook),1),r("p",Se,p(l(t).googlePlus),1),r("p",Ae,p(l(t).linkedIn),1)])]),_:1})]),_:1},8,["modelValue"]),r("div",Fe,[e(h,{color:"secondary",variant:"tonal",disabled:l(m)===0,onClick:o[20]||(o[20]=s=>m.value--)},{default:a(()=>[e(y,{icon:"tabler-arrow-left",start:"",class:"flip-in-rtl"}),o[30]||(o[30]=v(" Previous "))]),_:1},8,["disabled"]),S.length-1===l(m)?(F(),D(h,{key:0,color:"success","append-icon":"tabler-check",onClick:I},{default:a(()=>o[31]||(o[31]=[v(" submit ")])),_:1})):(F(),D(h,{key:1,onClick:o[21]||(o[21]=s=>m.value++)},{default:a(()=>[o[32]||(o[32]=v(" Next ")),e(y,{icon:"tabler-arrow-right",end:"",class:"flip-in-rtl"})]),_:1}))])]),_:1})]),_:1})]),_:1})}}},Pe={class:"mb-6"},De={class:"text-base"},Ie={class:"mb-1"},Le={class:"mb-1"},Te={class:"mb-1"},Ne={class:"mb-1"},Be={class:"mb-1"},Ue={class:"mb-1"},Re={class:"mb-1"},We={class:"mb-1"},je={class:"mb-1"},$e={class:"mb-1"},qe={class:"mb-1"},Ee={class:"mb-1"},ze={class:"mb-1"},_e={class:"mb-1"},Ge={class:"d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8"},Ke={__name:"DemoFormWizardIconsModernBasic",setup(R){const S=[{title:"Account Details",icon:"custom-address"},{title:"Personal Info",icon:"custom-wizard-personal"},{title:"Address",icon:"custom-wizard-address"},{title:"Social Links",icon:"custom-wizard-social-link"},{title:"Review & Submit",icon:"custom-wizard-submit"}],m=b(0),V=b(!1),f=b(!1),t=b({username:"johndoe",email:"john.doe@email.com",password:"johndoe@J2",cPassword:"johndoe@J2",firstName:"John",lastName:"Doe",country:"UK",language:"English",address:"98 Borough bridge Road, Birmingham",landmark:"Borough bridge",pincode:"658921",city:"Birmingham",twitter:"https://twitter.com/abc",facebook:"https://facebook.com/abc",googlePlus:"https://plus.google.com/abc",linkedIn:"https://linkedin.com/abc"}),I=()=>{console.log(t.value)};return(U,o)=>{const L=$,n=j,w=W;return F(),K(J,null,[r("div",Pe,[e(L,{"current-step":l(m),"onUpdate:currentStep":o[0]||(o[0]=s=>T(m)?m.value=s:null),items:S},null,8,["current-step"])]),e(q,null,{default:a(()=>[e(B,null,{default:a(()=>[e(N,null,{default:a(()=>[e(E,{modelValue:l(m),"onUpdate:modelValue":o[19]||(o[19]=s=>T(m)?m.value=s:null),class:"disable-tab-transition"},{default:a(()=>[e(g,null,{default:a(()=>[e(C,null,{default:a(()=>[e(i,{cols:"12"},{default:a(()=>o[22]||(o[22]=[r("h6",{class:"text-h6 font-weight-medium"}," Account Details ",-1),r("p",{class:"mb-0"}," Enter your Account Details ",-1)])),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).username,"onUpdate:modelValue":o[1]||(o[1]=s=>l(t).username=s),placeholder:"CarterLeonardo",label:"Username"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).email,"onUpdate:modelValue":o[2]||(o[2]=s=>l(t).email=s),placeholder:"carterleonardo@gmail.com",label:"Email"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).password,"onUpdate:modelValue":o[3]||(o[3]=s=>l(t).password=s),label:"Password",placeholder:"············",type:l(V)?"text":"password","append-inner-icon":l(V)?"tabler-eye-off":"tabler-eye","onClick:appendInner":o[4]||(o[4]=s=>V.value=!l(V))},null,8,["modelValue","type","append-inner-icon"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).cPassword,"onUpdate:modelValue":o[5]||(o[5]=s=>l(t).cPassword=s),label:"Confirm Password",placeholder:"············",type:l(f)?"text":"password","append-inner-icon":l(f)?"tabler-eye-off":"tabler-eye","onClick:appendInner":o[6]||(o[6]=s=>f.value=!l(f))},null,8,["modelValue","type","append-inner-icon"])]),_:1})]),_:1})]),_:1}),e(g,null,{default:a(()=>[e(C,null,{default:a(()=>[e(i,{cols:"12"},{default:a(()=>o[23]||(o[23]=[r("h6",{class:"text-h6 font-weight-medium"}," Personal Info ",-1),r("p",{class:"mb-0"}," Setup Information ",-1)])),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).firstName,"onUpdate:modelValue":o[7]||(o[7]=s=>l(t).firstName=s),label:"First Name",placeholder:"Leonard"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).lastName,"onUpdate:modelValue":o[8]||(o[8]=s=>l(t).lastName=s),label:"Last Name",placeholder:"Carter"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(w,{modelValue:l(t).country,"onUpdate:modelValue":o[9]||(o[9]=s=>l(t).country=s),label:"Country",placeholder:"Select Country",items:["UK","USA","Canada","Australia","Germany"]},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(w,{modelValue:l(t).language,"onUpdate:modelValue":o[10]||(o[10]=s=>l(t).language=s),label:"Language",placeholder:"Select Language",items:["English","Spanish","French","Russian","German"]},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(g,null,{default:a(()=>[e(C,null,{default:a(()=>[e(i,{cols:"12"},{default:a(()=>o[24]||(o[24]=[r("h6",{class:"text-h6 font-weight-medium"}," Address ",-1),r("p",{class:"mb-0"}," Enter Your Address. ",-1)])),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).address,"onUpdate:modelValue":o[11]||(o[11]=s=>l(t).address=s),placeholder:"98 Borough bridge Road, Birmingham",label:"Address"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).landmark,"onUpdate:modelValue":o[12]||(o[12]=s=>l(t).landmark=s),placeholder:"Borough bridge",label:"Landmark"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).pincode,"onUpdate:modelValue":o[13]||(o[13]=s=>l(t).pincode=s),placeholder:"658921",label:"Pincode",type:"number"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).city,"onUpdate:modelValue":o[14]||(o[14]=s=>l(t).city=s),placeholder:"New York",label:"City"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(g,null,{default:a(()=>[e(C,null,{default:a(()=>[e(i,{cols:"12"},{default:a(()=>o[25]||(o[25]=[r("h6",{class:"text-h6 font-weight-medium"}," Social Links ",-1),r("p",{class:"mb-0"}," Add Social Links ",-1)])),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).twitter,"onUpdate:modelValue":o[15]||(o[15]=s=>l(t).twitter=s),placeholder:"https://twitter.com/abc",label:"Twitter"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).facebook,"onUpdate:modelValue":o[16]||(o[16]=s=>l(t).facebook=s),placeholder:"https://facebook.com/abc",label:"Facebook"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).googlePlus,"onUpdate:modelValue":o[17]||(o[17]=s=>l(t).googlePlus=s),placeholder:"https://plus.google.com/abc",label:"Google+"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).linkedIn,"onUpdate:modelValue":o[18]||(o[18]=s=>l(t).linkedIn=s),placeholder:"https://linkedin.com/abc",label:"LinkedIn"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(g,null,{default:a(()=>[r("div",De,[o[26]||(o[26]=r("h6",{class:"text-base font-weight-medium mb-2"}," Account ",-1)),r("p",Ie,p(l(t).username),1),r("p",Le,p(l(t).email),1),e(P,{class:"my-4"}),o[27]||(o[27]=r("h6",{class:"text-base font-weight-medium mb-2"}," Personal Info ",-1)),r("p",Te,p(l(t).firstName),1),r("p",Ne,p(l(t).lastName),1),r("p",Be,p(l(t).country),1),r("p",Ue,p(l(t).language),1),e(P,{class:"my-4"}),o[28]||(o[28]=r("h6",{class:"text-base font-weight-medium mb-2"}," Address ",-1)),r("p",Re,p(l(t).address),1),r("p",We,p(l(t).landmark),1),r("p",je,p(l(t).pincode),1),r("p",$e,p(l(t).city),1),e(P,{class:"my-4"}),o[29]||(o[29]=r("h6",{class:"text-base font-weight-medium mb-2"}," Social Links ",-1)),r("p",qe,p(l(t).twitter),1),r("p",Ee,p(l(t).facebook),1),r("p",ze,p(l(t).googlePlus),1),r("p",_e,p(l(t).linkedIn),1)])]),_:1})]),_:1},8,["modelValue"]),r("div",Ge,[e(h,{color:"secondary",variant:"tonal",disabled:l(m)===0,onClick:o[20]||(o[20]=s=>m.value--)},{default:a(()=>[e(y,{icon:"tabler-arrow-left",start:"",class:"flip-in-rtl"}),o[30]||(o[30]=v(" Previous "))]),_:1},8,["disabled"]),S.length-1===l(m)?(F(),D(h,{key:0,color:"success","append-icon":"tabler-check",onClick:I},{default:a(()=>o[31]||(o[31]=[v(" submit ")])),_:1})):(F(),D(h,{key:1,onClick:o[21]||(o[21]=s=>m.value++)},{default:a(()=>[o[32]||(o[32]=v(" Next ")),e(y,{icon:"tabler-arrow-right",end:"",class:"flip-in-rtl"})]),_:1}))])]),_:1})]),_:1})]),_:1})],64)}}},Je={class:"d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8"},Ye={class:"d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8"},Me={class:"d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8"},He={class:"d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8"},Oe={class:"text-base"},Qe={class:"mb-1"},Xe={class:"mb-1"},Ze={class:"mb-1"},el={class:"mb-1"},ll={class:"mb-1"},ol={class:"mb-1"},al={class:"mb-1"},tl={class:"mb-1"},sl={class:"mb-1"},rl={class:"mb-1"},il={class:"mb-1"},dl={class:"mb-1"},nl={class:"mb-1"},ml={class:"mb-1"},cl={__name:"DemoFormWizardIconsValidation",setup(R){const S=[{title:"Account Details",icon:"custom-wizard-account"},{title:"Personal Info",icon:"custom-wizard-personal"},{title:"Address",icon:"custom-wizard-address"},{title:"Social Links",icon:"custom-wizard-social-link"},{title:"Review & Submit",icon:"custom-wizard-submit"}],m=b(0),V=b(!1),f=b(!1),t=b(!0),I=b(),U=b(),o=b(),L=b(),n=b({username:"",email:"",password:"",cPassword:""}),w=b({firstName:"",lastName:"",country:void 0,language:void 0}),s=b({twitter:"",facebook:"",googlePlus:"",linkedIn:""}),x=b({address:"",landmark:"",city:"",pincode:""}),Y=()=>{var c;(c=I.value)==null||c.validate().then(d=>{d.valid?(m.value++,t.value=!0):t.value=!1})},M=()=>{var c;(c=U.value)==null||c.validate().then(d=>{d.valid?(m.value++,t.value=!0):t.value=!1})},H=()=>{var c;(c=L.value)==null||c.validate().then(d=>{d.valid?(m.value++,t.value=!0):t.value=!1})},O=()=>{var c;(c=o.value)==null||c.validate().then(d=>{d.valid?(m.value++,t.value=!0):t.value=!1})};return(c,d)=>{const Q=$,A=j,G=W;return F(),D(q,null,{default:a(()=>[e(B,null,{default:a(()=>[e(Q,{"current-step":l(m),"onUpdate:currentStep":d[0]||(d[0]=u=>T(m)?m.value=u:null),items:S,"is-active-step-valid":l(t)},null,8,["current-step","is-active-step-valid"])]),_:1}),e(P),e(B,null,{default:a(()=>[e(E,{modelValue:l(m),"onUpdate:modelValue":d[22]||(d[22]=u=>T(m)?m.value=u:null),class:"disable-tab-transition"},{default:a(()=>[e(g,null,{default:a(()=>[e(l(N),{ref_key:"refAccountForm",ref:I,onSubmit:z(Y,["prevent"])},{default:a(()=>[e(C,null,{default:a(()=>[e(i,{cols:"12"},{default:a(()=>d[23]||(d[23]=[r("h6",{class:"text-h6 font-weight-medium"}," Account Details ",-1),r("p",{class:"mb-0"}," Enter your Account Details ",-1)])),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(A,{modelValue:l(n).username,"onUpdate:modelValue":d[1]||(d[1]=u=>l(n).username=u),placeholder:"CarterLeonardo",rules:["requiredValidator"in c?c.requiredValidator:l(k)],label:"Username"},null,8,["modelValue","rules"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(A,{modelValue:l(n).email,"onUpdate:modelValue":d[2]||(d[2]=u=>l(n).email=u),placeholder:"carterleonardo@gmail.com",rules:["requiredValidator"in c?c.requiredValidator:l(k),"emailValidator"in c?c.emailValidator:l(ee)],label:"Email"},null,8,["modelValue","rules"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(A,{modelValue:l(n).password,"onUpdate:modelValue":d[3]||(d[3]=u=>l(n).password=u),placeholder:"············",label:"Password",rules:["requiredValidator"in c?c.requiredValidator:l(k),"passwordValidator"in c?c.passwordValidator:l(le)],type:l(V)?"text":"password","append-inner-icon":l(V)?"tabler-eye-off":"tabler-eye","onClick:appendInner":d[4]||(d[4]=u=>V.value=!l(V))},null,8,["modelValue","rules","type","append-inner-icon"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(A,{modelValue:l(n).cPassword,"onUpdate:modelValue":d[5]||(d[5]=u=>l(n).cPassword=u),placeholder:"············",label:"Confirm Password",rules:["requiredValidator"in c?c.requiredValidator:l(k),("confirmedValidator"in c?c.confirmedValidator:l(oe))(l(n).cPassword,l(n).password)],type:l(f)?"text":"password","append-inner-icon":l(f)?"tabler-eye-off":"tabler-eye","onClick:appendInner":d[6]||(d[6]=u=>f.value=!l(f))},null,8,["modelValue","rules","type","append-inner-icon"])]),_:1}),e(i,{cols:"12"},{default:a(()=>[r("div",Je,[e(h,{color:"secondary",variant:"tonal",disabled:""},{default:a(()=>[e(y,{icon:"tabler-arrow-left",start:"",class:"flip-in-rtl"}),d[24]||(d[24]=v(" Previous "))]),_:1}),e(h,{type:"submit"},{default:a(()=>[d[25]||(d[25]=v(" Next ")),e(y,{icon:"tabler-arrow-right",end:"",class:"flip-in-rtl"})]),_:1})])]),_:1})]),_:1})]),_:1},512)]),_:1}),e(g,null,{default:a(()=>[e(l(N),{ref_key:"refPersonalForm",ref:U,onSubmit:z(M,["prevent"])},{default:a(()=>[e(C,null,{default:a(()=>[e(i,{cols:"12"},{default:a(()=>d[26]||(d[26]=[r("h6",{class:"text-h6 font-weight-medium"}," Personal Info ",-1),r("p",{class:"mb-0"}," Setup Information ",-1)])),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(A,{modelValue:l(w).firstName,"onUpdate:modelValue":d[7]||(d[7]=u=>l(w).firstName=u),label:"First Name",rules:["requiredValidator"in c?c.requiredValidator:l(k)],placeholder:"Leonard"},null,8,["modelValue","rules"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(A,{modelValue:l(w).lastName,"onUpdate:modelValue":d[8]||(d[8]=u=>l(w).lastName=u),label:"Last Name",rules:["requiredValidator"in c?c.requiredValidator:l(k)],placeholder:"Carter"},null,8,["modelValue","rules"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(G,{modelValue:l(w).country,"onUpdate:modelValue":d[9]||(d[9]=u=>l(w).country=u),label:"Country",rules:["requiredValidator"in c?c.requiredValidator:l(k)],placeholder:"Select Country",items:["UK","USA","Canada","Australia","Germany"]},null,8,["modelValue","rules"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(G,{modelValue:l(w).language,"onUpdate:modelValue":d[10]||(d[10]=u=>l(w).language=u),label:"Language",rules:["requiredValidator"in c?c.requiredValidator:l(k)],placeholder:"Select Language",items:["English","Spanish","French","Russian","German"]},null,8,["modelValue","rules"])]),_:1}),e(i,{cols:"12"},{default:a(()=>[r("div",Ye,[e(h,{color:"secondary",variant:"tonal",onClick:d[11]||(d[11]=u=>m.value--)},{default:a(()=>[e(y,{icon:"tabler-arrow-left",start:"",class:"flip-in-rtl"}),d[27]||(d[27]=v(" Previous "))]),_:1}),e(h,{type:"submit"},{default:a(()=>[d[28]||(d[28]=v(" Next ")),e(y,{icon:"tabler-arrow-right",end:"",class:"flip-in-rtl"})]),_:1})])]),_:1})]),_:1})]),_:1},512)]),_:1}),e(g,null,{default:a(()=>[e(l(N),{ref_key:"refAddressForm",ref:L,onSubmit:z(H,["prevent"])},{default:a(()=>[e(C,null,{default:a(()=>[e(i,{cols:"12"},{default:a(()=>d[29]||(d[29]=[r("h6",{class:"text-h6 font-weight-medium"}," Address ",-1),r("p",{class:"mb-0"}," Enter Your Address. ",-1)])),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(A,{modelValue:l(x).address,"onUpdate:modelValue":d[12]||(d[12]=u=>l(x).address=u),rules:["requiredValidator"in c?c.requiredValidator:l(k)],placeholder:"98 Borough bridge Road, Birmingham",label:"Address"},null,8,["modelValue","rules"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(A,{modelValue:l(x).landmark,"onUpdate:modelValue":d[13]||(d[13]=u=>l(x).landmark=u),rules:["requiredValidator"in c?c.requiredValidator:l(k)],placeholder:"Borough bridge",label:"Landmark"},null,8,["modelValue","rules"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(A,{modelValue:l(x).pincode,"onUpdate:modelValue":d[14]||(d[14]=u=>l(x).pincode=u),rules:["requiredValidator"in c?c.requiredValidator:l(k)],placeholder:"658921",label:"Pincode",type:"number"},null,8,["modelValue","rules"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(A,{modelValue:l(x).city,"onUpdate:modelValue":d[15]||(d[15]=u=>l(x).city=u),rules:["requiredValidator"in c?c.requiredValidator:l(k)],placeholder:"New York",label:"City"},null,8,["modelValue","rules"])]),_:1}),e(i,{cols:"12"},{default:a(()=>[r("div",Me,[e(h,{color:"secondary",variant:"tonal",onClick:d[16]||(d[16]=u=>m.value--)},{default:a(()=>[e(y,{icon:"tabler-arrow-left",start:"",class:"flip-in-rtl"}),d[30]||(d[30]=v(" Previous "))]),_:1}),e(h,{type:"submit"},{default:a(()=>[d[31]||(d[31]=v(" Next ")),e(y,{icon:"tabler-arrow-right",end:"",class:"flip-in-rtl"})]),_:1})])]),_:1})]),_:1})]),_:1},512)]),_:1}),e(g,null,{default:a(()=>[e(l(N),{ref_key:"refSocialLinkForm",ref:o,onSubmit:z(O,["prevent"])},{default:a(()=>[e(C,null,{default:a(()=>[e(i,{cols:"12"},{default:a(()=>d[32]||(d[32]=[r("h6",{class:"text-h6 font-weight-medium"}," Social Links ",-1),r("p",{class:"mb-0"}," Add Social Links ",-1)])),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(A,{modelValue:l(s).twitter,"onUpdate:modelValue":d[17]||(d[17]=u=>l(s).twitter=u),placeholder:"https://twitter.com/abc",rules:["requiredValidator"in c?c.requiredValidator:l(k),"urlValidator"in c?c.urlValidator:l(_)],label:"Twitter"},null,8,["modelValue","rules"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(A,{modelValue:l(s).facebook,"onUpdate:modelValue":d[18]||(d[18]=u=>l(s).facebook=u),placeholder:"https://facebook.com/abc",rules:["requiredValidator"in c?c.requiredValidator:l(k),"urlValidator"in c?c.urlValidator:l(_)],label:"Facebook"},null,8,["modelValue","rules"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(A,{modelValue:l(s).googlePlus,"onUpdate:modelValue":d[19]||(d[19]=u=>l(s).googlePlus=u),placeholder:"https://plus.google.com/abc",rules:["requiredValidator"in c?c.requiredValidator:l(k),"urlValidator"in c?c.urlValidator:l(_)],label:"Google+"},null,8,["modelValue","rules"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(A,{modelValue:l(s).linkedIn,"onUpdate:modelValue":d[20]||(d[20]=u=>l(s).linkedIn=u),placeholder:"https://linkedin.com/abc",rules:["requiredValidator"in c?c.requiredValidator:l(k),"urlValidator"in c?c.urlValidator:l(_)],label:"LinkedIn"},null,8,["modelValue","rules"])]),_:1}),e(i,{cols:"12"},{default:a(()=>[r("div",He,[e(h,{color:"secondary",variant:"tonal",onClick:d[21]||(d[21]=u=>m.value--)},{default:a(()=>[e(y,{icon:"tabler-arrow-left",start:"",class:"flip-in-rtl"}),d[33]||(d[33]=v(" Previous "))]),_:1}),e(h,{type:"submit"},{default:a(()=>[d[34]||(d[34]=v(" Next ")),e(y,{icon:"tabler-arrow-right",end:"",class:"flip-in-rtl"})]),_:1})])]),_:1})]),_:1})]),_:1},512)]),_:1}),e(g,null,{default:a(()=>[r("div",Oe,[d[35]||(d[35]=r("h6",{class:"text-base font-weight-medium mb-2"}," Account ",-1)),r("p",Qe,p(l(n).username),1),r("p",Xe,p(l(n).email),1),e(P,{class:"my-4"}),d[36]||(d[36]=r("h6",{class:"text-base font-weight-medium mb-2"}," Personal Info ",-1)),r("p",Ze,p(l(w).firstName),1),r("p",el,p(l(w).lastName),1),r("p",ll,p(l(w).country),1),r("p",ol,p(l(w).language),1),e(P,{class:"my-4"}),d[37]||(d[37]=r("h6",{class:"text-base font-weight-medium mb-2"}," Address ",-1)),r("p",al,p(l(x).address),1),r("p",tl,p(l(x).landmark),1),r("p",sl,p(l(x).pincode),1),r("p",rl,p(l(x).city),1),e(P,{class:"my-4"}),d[38]||(d[38]=r("h6",{class:"text-base font-weight-medium mb-2"}," Social Links ",-1)),r("p",il,p(l(s).twitter),1),r("p",dl,p(l(s).facebook),1),r("p",nl,p(l(s).googlePlus),1),r("p",ml,p(l(s).linkedIn),1)])]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})}}},pl={class:"d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8"},ul={__name:"DemoFormWizardIconsVertical",setup(R){const S=[{title:"Account Details",icon:"tabler-file-description",subtitle:"Setup account details"},{title:"Personal Info",icon:"tabler-user",subtitle:"Add personal info"},{title:"Social Links",icon:"tabler-link",subtitle:"Add social links"}],m=b(0),V=b(!1),f=b(!1),t=b({username:"",email:"",password:"",cPassword:"",firstName:"",lastName:"",country:void 0,language:void 0,twitter:"",facebook:"",googlePlus:"",linkedIn:""}),I=()=>{console.log(t.value)};return(U,o)=>{const L=$,n=j,w=W;return F(),D(q,null,{default:a(()=>[e(C,null,{default:a(()=>[e(i,{cols:"12",md:"4",class:X(U.$vuetify.display.smAndDown?"border-b":"border-e")},{default:a(()=>[e(B,null,{default:a(()=>[e(L,{"current-step":l(m),"onUpdate:currentStep":o[0]||(o[0]=s=>T(m)?m.value=s:null),direction:"vertical",items:S,"icon-size":"24",class:"stepper-icon-step-bg"},null,8,["current-step"])]),_:1})]),_:1},8,["class"]),e(i,{cols:"12",md:"8"},{default:a(()=>[e(B,null,{default:a(()=>[e(N,null,{default:a(()=>[e(E,{modelValue:l(m),"onUpdate:modelValue":o[15]||(o[15]=s=>T(m)?m.value=s:null),class:"disable-tab-transition"},{default:a(()=>[e(g,null,{default:a(()=>[e(C,null,{default:a(()=>[e(i,{cols:"12"},{default:a(()=>o[18]||(o[18]=[r("h6",{class:"text-h6 font-weight-medium"}," Account Details ",-1),r("p",{class:"mb-0"}," Enter your Account Details ",-1)])),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).username,"onUpdate:modelValue":o[1]||(o[1]=s=>l(t).username=s),placeholder:"CarterLeonardo",label:"Username"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).email,"onUpdate:modelValue":o[2]||(o[2]=s=>l(t).email=s),placeholder:"carterleonardo@gmail.com",label:"Email"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).password,"onUpdate:modelValue":o[3]||(o[3]=s=>l(t).password=s),label:"Password",placeholder:"············",type:l(V)?"text":"password","append-inner-icon":l(V)?"tabler-eye-off":"tabler-eye","onClick:appendInner":o[4]||(o[4]=s=>V.value=!l(V))},null,8,["modelValue","type","append-inner-icon"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).cPassword,"onUpdate:modelValue":o[5]||(o[5]=s=>l(t).cPassword=s),label:"Confirm Password",placeholder:"············",type:l(f)?"text":"password","append-inner-icon":l(f)?"tabler-eye-off":"tabler-eye","onClick:appendInner":o[6]||(o[6]=s=>f.value=!l(f))},null,8,["modelValue","type","append-inner-icon"])]),_:1})]),_:1})]),_:1}),e(g,null,{default:a(()=>[e(C,null,{default:a(()=>[e(i,{cols:"12"},{default:a(()=>o[19]||(o[19]=[r("h6",{class:"text-h6 font-weight-medium"}," Personal Info ",-1),r("p",{class:"mb-0"}," Setup Information ",-1)])),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).firstName,"onUpdate:modelValue":o[7]||(o[7]=s=>l(t).firstName=s),label:"First Name",placeholder:"Leonard"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).lastName,"onUpdate:modelValue":o[8]||(o[8]=s=>l(t).lastName=s),label:"Last Name",placeholder:"Carter"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(w,{modelValue:l(t).country,"onUpdate:modelValue":o[9]||(o[9]=s=>l(t).country=s),label:"Country",placeholder:"Select Country",items:["UK","USA","Canada","Australia","Germany"]},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(w,{modelValue:l(t).language,"onUpdate:modelValue":o[10]||(o[10]=s=>l(t).language=s),label:"Language",placeholder:"Select Language",items:["English","Spanish","French","Russian","German"]},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(g,null,{default:a(()=>[e(C,null,{default:a(()=>[e(i,{cols:"12"},{default:a(()=>o[20]||(o[20]=[r("h6",{class:"text-h6 font-weight-medium"}," Social Links ",-1),r("p",{class:"mb-0"}," Add Social Links ",-1)])),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).twitter,"onUpdate:modelValue":o[11]||(o[11]=s=>l(t).twitter=s),placeholder:"https://twitter.com/abc",label:"Twitter"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).facebook,"onUpdate:modelValue":o[12]||(o[12]=s=>l(t).facebook=s),placeholder:"https://facebook.com/abc",label:"Facebook"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).googlePlus,"onUpdate:modelValue":o[13]||(o[13]=s=>l(t).googlePlus=s),placeholder:"https://plus.google.com/abc",label:"Google+"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:a(()=>[e(n,{modelValue:l(t).linkedIn,"onUpdate:modelValue":o[14]||(o[14]=s=>l(t).linkedIn=s),placeholder:"https://linkedin.com/abc",label:"LinkedIn"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),r("div",pl,[e(h,{color:"secondary",variant:"tonal",disabled:l(m)===0,onClick:o[16]||(o[16]=s=>m.value--)},{default:a(()=>[e(y,{icon:"tabler-arrow-left",start:"",class:"flip-in-rtl"}),o[21]||(o[21]=v(" Previous "))]),_:1},8,["disabled"]),S.length-1===l(m)?(F(),D(h,{key:0,color:"success","append-icon":"tabler-check",onClick:I},{default:a(()=>o[22]||(o[22]=[v(" submit ")])),_:1})):(F(),D(h,{key:1,onClick:o[17]||(o[17]=s=>m.value++)},{default:a(()=>[o[23]||(o[23]=v(" Next ")),e(y,{icon:"tabler-arrow-right",end:"",class:"flip-in-rtl"})]),_:1}))])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}}},Ql={__name:"form-wizard-icons",setup(R){return(S,m)=>{const V=Z,f=se;return F(),K(J,null,[e(C,null,{default:a(()=>[e(i,{cols:"12"},{default:a(()=>[e(V,{variant:"outlined",title:"Basic",code:re},{default:a(()=>[e(xe)]),_:1},8,["code"])]),_:1}),e(i,{cols:"12"},{default:a(()=>[e(V,{variant:"outlined",title:"Validation",code:ne},{default:a(()=>[e(cl)]),_:1},8,["code"])]),_:1}),e(i,{cols:"12"},{default:a(()=>[e(V,{variant:"outlined",title:"Vertical",code:me},{default:a(()=>[e(ul)]),_:1},8,["code"])]),_:1})]),_:1}),e(P,{class:"my-10 mx-n6"}),m[0]||(m[0]=r("h3",{class:"text-h3 my-4"}," Modern ",-1)),e(C,null,{default:a(()=>[e(i,{cols:"12"},{default:a(()=>[e(V,{variant:"outlined",title:"Modern basic",code:ie},{default:a(()=>[e(Ke)]),_:1},8,["code"])]),_:1}),e(i,{cols:"12"},{default:a(()=>[e(V,{variant:"outlined",title:"Modern Vertical",code:de},{default:a(()=>[e(f)]),_:1},8,["code"])]),_:1})]),_:1})],64)}}};export{Ql as default};
