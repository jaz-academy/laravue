import{_ as X}from"./AppCardCode-46f18f59.js";import{_ as N}from"./AppSelect-c5fa0cad.js";import{_ as B}from"./AppTextField-07b9446e.js";import{_ as W}from"./AppStepper-b44b8850.js";import{V as L}from"./VCardText-89ccd074.js";import{V as U}from"./VForm-eac8e6b7.js";import{V as R,a as S}from"./VWindowItem-f230b5b0.js";import{V as C}from"./VRow-9ddfb65a.js";import{V as r}from"./VCol-3541d7c7.js";import{r as V,o as y,c as M,d as m,b as e,n as o,aU as h,e as a,ai as v,a0 as F,v as g,f as P,F as H,a$ as j,y as Y}from"./main-7a04a4cc.js";import{V as q}from"./VCard-c1d86edf.js";import{V as E}from"./VDivider-cd55d271.js";import{r as A,e as Z,p as _,d as ee,u as $}from"./validators-3848b933.js";import"./form-41eb478e.js";import"./VSelect-5fc0c42c.js";import"./VTextField-8b5d0ff7.js";/* empty css                   */import"./VCounter-9d080591.js";import"./VImg-785fe2da.js";import"./VField-eef30866.js";import"./easing-9f15041e.js";import"./VInput-5d1e9d15.js";import"./forwardRefs-8348545e.js";import"./VList-b9dbaad8.js";import"./ssrBoot-30a14e97.js";import"./VAvatar-a8f8d7de.js";import"./dialog-transition-839434e1.js";import"./VMenu-78d9b91a.js";import"./VOverlay-7dfacdbb.js";import"./lazy-916f73d1.js";import"./scopeId-e82d8d9c.js";import"./VCheckboxBtn-e67cbaff.js";import"./VSelectionControl-ff913cdc.js";import"./VChip-6b0b1728.js";import"./VSlideGroupItem-ffc667f2.js";import"./VSlideGroup-67695140.js";import"./helpers-929cea30.js";import"./no-profile-4221a4a6.js";const K={ts:`<script setup lang="ts">
const numberedSteps = [
  {
    title: 'Account Details',
    subtitle: 'Setup Account Details',
  },
  {
    title: 'Personal Info',
    subtitle: 'Add personal info',
  },
  {
    title: 'Social Links',
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
    <VCardText>
      <!-- 👉 Stepper -->
      <AppStepper
        v-model:current-step="currentStep"
        align="start"
        :items="numberedSteps"
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
</template>
`,js:`<script setup>
const numberedSteps = [
  {
    title: 'Account Details',
    subtitle: 'Setup Account Details',
  },
  {
    title: 'Personal Info',
    subtitle: 'Add personal info',
  },
  {
    title: 'Social Links',
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
    <VCardText>
      <!-- 👉 Stepper -->
      <AppStepper
        v-model:current-step="currentStep"
        align="start"
        :items="numberedSteps"
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
</template>
`},le={ts:`<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'

const numberedSteps = [
  {
    title: 'Account Details',
    subtitle: 'Setup Account Details',
  },
  {
    title: 'Personal Info',
    subtitle: 'Add personal info',
  },
  {
    title: 'Social Links',
    subtitle: 'Add social links',
  },
]

const currentStep = ref(0)
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)
const isCurrentStepValid = ref(true)
const refAccountForm = ref<VForm>()
const refPersonalForm = ref<VForm>()
const refSocialLinkForm = ref<VForm>()

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

const validateSocialLinkForm = () => {
  refSocialLinkForm.value?.validate().then(valid => {
    if (valid.valid) {
      isCurrentStepValid.value = true

      console.log({
        ...accountForm.value,
        ...personalForm.value,
        ...socialForm.value,
      })
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
        :items="numberedSteps"
        align="start"
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
                  label="Password"
                  placeholder="············"
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
                  label="Confirm Password"
                  placeholder="············"
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
                  placeholder="https://likedin.com/abc"
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

                  <VBtn
                    color="success"
                    type="submit"
                  >
                    submit
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
`,js:`<script setup>
import { VForm } from 'vuetify/components/VForm'

const numberedSteps = [
  {
    title: 'Account Details',
    subtitle: 'Setup Account Details',
  },
  {
    title: 'Personal Info',
    subtitle: 'Add personal info',
  },
  {
    title: 'Social Links',
    subtitle: 'Add social links',
  },
]

const currentStep = ref(0)
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)
const isCurrentStepValid = ref(true)
const refAccountForm = ref()
const refPersonalForm = ref()
const refSocialLinkForm = ref()

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

const validateSocialLinkForm = () => {
  refSocialLinkForm.value?.validate().then(valid => {
    if (valid.valid) {
      isCurrentStepValid.value = true
      console.log({
        ...accountForm.value,
        ...personalForm.value,
        ...socialForm.value,
      })
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
        :items="numberedSteps"
        align="start"
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
                  label="Password"
                  placeholder="············"
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
                  label="Confirm Password"
                  placeholder="············"
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
                  placeholder="https://likedin.com/abc"
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

                  <VBtn
                    color="success"
                    type="submit"
                  >
                    submit
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
`},z={ts:`<script setup lang="ts">
const numberedSteps = [
  {
    title: 'Account Details',
    subtitle: 'Setup Account Details',
  },
  {
    title: 'Personal Info',
    subtitle: 'Add personal info',
  },
  {
    title: 'Social Links',
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
                      placeholder="············"
                      label="Password"
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
                      placeholder="············"
                      label="Confirm Password"
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
    subtitle: 'Setup Account Details',
  },
  {
    title: 'Personal Info',
    subtitle: 'Add personal info',
  },
  {
    title: 'Social Links',
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
                      placeholder="············"
                      label="Password"
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
                      placeholder="············"
                      label="Confirm Password"
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
`},oe={class:"mb-6"},ae={class:"d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8"},te={__name:"DemoFormWizardNumberdModernBasic",setup(T){const k=[{title:"Account Details",subtitle:"Setup Account Details"},{title:"Personal Info",subtitle:"Add personal info"},{title:"Social Links",subtitle:"Add social links"}],d=V(0),c=V(!1),f=V(!1),s=V({username:"",email:"",password:"",cPassword:"",firstName:"",lastName:"",country:void 0,language:void 0,twitter:"",facebook:"",googlePlus:"",linkedIn:""}),x=()=>{console.log(s.value)};return(D,l)=>{const w=W,i=B,b=N;return y(),M(H,null,[m("div",oe,[e(w,{"current-step":o(d),"onUpdate:currentStep":l[0]||(l[0]=t=>h(d)?d.value=t:null),align:"start",items:k},null,8,["current-step"])]),e(q,null,{default:a(()=>[e(L,null,{default:a(()=>[e(U,null,{default:a(()=>[e(R,{modelValue:o(d),"onUpdate:modelValue":l[15]||(l[15]=t=>h(d)?d.value=t:null),class:"disable-tab-transition"},{default:a(()=>[e(S,null,{default:a(()=>[e(C,null,{default:a(()=>[e(r,{cols:"12"},{default:a(()=>l[18]||(l[18]=[m("h6",{class:"text-h6 font-weight-medium"}," Account Details ",-1),m("p",{class:"mb-0"}," Enter your Account Details ",-1)])),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).username,"onUpdate:modelValue":l[1]||(l[1]=t=>o(s).username=t),placeholder:"CarterLeonardo",label:"Username"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).email,"onUpdate:modelValue":l[2]||(l[2]=t=>o(s).email=t),placeholder:"carterleonardo@gmail.com",label:"Email"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).password,"onUpdate:modelValue":l[3]||(l[3]=t=>o(s).password=t),label:"Password",placeholder:"············",type:o(c)?"text":"password","append-inner-icon":o(c)?"tabler-eye-off":"tabler-eye","onClick:appendInner":l[4]||(l[4]=t=>c.value=!o(c))},null,8,["modelValue","type","append-inner-icon"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).cPassword,"onUpdate:modelValue":l[5]||(l[5]=t=>o(s).cPassword=t),label:"Confirm Password",placeholder:"············",type:o(f)?"text":"password","append-inner-icon":o(f)?"tabler-eye-off":"tabler-eye","onClick:appendInner":l[6]||(l[6]=t=>f.value=!o(f))},null,8,["modelValue","type","append-inner-icon"])]),_:1})]),_:1})]),_:1}),e(S,null,{default:a(()=>[e(C,null,{default:a(()=>[e(r,{cols:"12"},{default:a(()=>l[19]||(l[19]=[m("h6",{class:"text-h6 font-weight-medium"}," Personal Info ",-1),m("p",{class:"mb-0"}," Setup Information ",-1)])),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).firstName,"onUpdate:modelValue":l[7]||(l[7]=t=>o(s).firstName=t),label:"First Name",placeholder:"Leonard"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).lastName,"onUpdate:modelValue":l[8]||(l[8]=t=>o(s).lastName=t),label:"Last Name",placeholder:"Carter"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(b,{modelValue:o(s).country,"onUpdate:modelValue":l[9]||(l[9]=t=>o(s).country=t),label:"Country",placeholder:"Select Country",items:["UK","USA","Canada","Australia","Germany"]},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(b,{modelValue:o(s).language,"onUpdate:modelValue":l[10]||(l[10]=t=>o(s).language=t),label:"Language",placeholder:"Select Language",items:["English","Spanish","French","Russian","German"]},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(S,null,{default:a(()=>[e(C,null,{default:a(()=>[e(r,{cols:"12"},{default:a(()=>l[20]||(l[20]=[m("h6",{class:"text-h6 font-weight-medium"}," Social Links ",-1),m("p",{class:"mb-0"}," Add Social Links ",-1)])),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).twitter,"onUpdate:modelValue":l[11]||(l[11]=t=>o(s).twitter=t),placeholder:"https://twitter.com/abc",label:"Twitter"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).facebook,"onUpdate:modelValue":l[12]||(l[12]=t=>o(s).facebook=t),placeholder:"https://facebook.com/abc",label:"Facebook"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).googlePlus,"onUpdate:modelValue":l[13]||(l[13]=t=>o(s).googlePlus=t),placeholder:"https://plus.google.com/abc",label:"Google+"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).linkedIn,"onUpdate:modelValue":l[14]||(l[14]=t=>o(s).linkedIn=t),placeholder:"https://linkedin.com/abc",label:"LinkedIn"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),m("div",ae,[e(v,{color:"secondary",variant:"tonal",disabled:o(d)===0,onClick:l[16]||(l[16]=t=>d.value--)},{default:a(()=>[e(F,{icon:"tabler-arrow-left",start:"",class:"flip-in-rtl"}),l[21]||(l[21]=g(" Previous "))]),_:1},8,["disabled"]),k.length-1===o(d)?(y(),P(v,{key:0,color:"success","append-icon":"tabler-check",onClick:x},{default:a(()=>l[22]||(l[22]=[g(" submit ")])),_:1})):(y(),P(v,{key:1,onClick:l[17]||(l[17]=t=>d.value++)},{default:a(()=>[l[23]||(l[23]=g(" Next ")),e(F,{icon:"tabler-arrow-right",end:"",class:"flip-in-rtl"})]),_:1}))])]),_:1})]),_:1})]),_:1})],64)}}},se={class:"d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8"},re={__name:"DemoFormWizardNumberedBasic",setup(T){const k=[{title:"Account Details",subtitle:"Setup Account Details"},{title:"Personal Info",subtitle:"Add personal info"},{title:"Social Links",subtitle:"Add social links"}],d=V(0),c=V(!1),f=V(!1),s=V({username:"",email:"",password:"",cPassword:"",firstName:"",lastName:"",country:void 0,language:void 0,twitter:"",facebook:"",googlePlus:"",linkedIn:""}),x=()=>{console.log(s.value)};return(D,l)=>{const w=W,i=B,b=N;return y(),P(q,null,{default:a(()=>[e(L,null,{default:a(()=>[e(w,{"current-step":o(d),"onUpdate:currentStep":l[0]||(l[0]=t=>h(d)?d.value=t:null),align:"start",items:k},null,8,["current-step"])]),_:1}),e(E),e(L,null,{default:a(()=>[e(U,null,{default:a(()=>[e(R,{modelValue:o(d),"onUpdate:modelValue":l[15]||(l[15]=t=>h(d)?d.value=t:null),class:"disable-tab-transition"},{default:a(()=>[e(S,null,{default:a(()=>[e(C,null,{default:a(()=>[e(r,{cols:"12"},{default:a(()=>l[18]||(l[18]=[m("h6",{class:"text-h6 font-weight-medium"}," Account Details ",-1),m("p",{class:"mb-0"}," Enter your Account Details ",-1)])),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).username,"onUpdate:modelValue":l[1]||(l[1]=t=>o(s).username=t),placeholder:"CarterLeonardo",label:"Username"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).email,"onUpdate:modelValue":l[2]||(l[2]=t=>o(s).email=t),placeholder:"carterleonardo@gmail.com",label:"Email"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).password,"onUpdate:modelValue":l[3]||(l[3]=t=>o(s).password=t),label:"Password",placeholder:"············",type:o(c)?"text":"password","append-inner-icon":o(c)?"tabler-eye-off":"tabler-eye","onClick:appendInner":l[4]||(l[4]=t=>c.value=!o(c))},null,8,["modelValue","type","append-inner-icon"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).cPassword,"onUpdate:modelValue":l[5]||(l[5]=t=>o(s).cPassword=t),label:"Confirm Password",placeholder:"············",type:o(f)?"text":"password","append-inner-icon":o(f)?"tabler-eye-off":"tabler-eye","onClick:appendInner":l[6]||(l[6]=t=>f.value=!o(f))},null,8,["modelValue","type","append-inner-icon"])]),_:1})]),_:1})]),_:1}),e(S,null,{default:a(()=>[e(C,null,{default:a(()=>[e(r,{cols:"12"},{default:a(()=>l[19]||(l[19]=[m("h6",{class:"text-h6 font-weight-medium"}," Personal Info ",-1),m("p",{class:"mb-0"}," Setup Information ",-1)])),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).firstName,"onUpdate:modelValue":l[7]||(l[7]=t=>o(s).firstName=t),label:"First Name",placeholder:"Leonard"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).lastName,"onUpdate:modelValue":l[8]||(l[8]=t=>o(s).lastName=t),label:"Last Name",placeholder:"Carter"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(b,{modelValue:o(s).country,"onUpdate:modelValue":l[9]||(l[9]=t=>o(s).country=t),label:"Country",placeholder:"Select Country",items:["UK","USA","Canada","Australia","Germany"]},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(b,{modelValue:o(s).language,"onUpdate:modelValue":l[10]||(l[10]=t=>o(s).language=t),label:"Language",placeholder:"Select Language",items:["English","Spanish","French","Russian","German"]},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(S,null,{default:a(()=>[e(C,null,{default:a(()=>[e(r,{cols:"12"},{default:a(()=>l[20]||(l[20]=[m("h6",{class:"text-h6 font-weight-medium"}," Social Links ",-1),m("p",{class:"mb-0"}," Add Social Links ",-1)])),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).twitter,"onUpdate:modelValue":l[11]||(l[11]=t=>o(s).twitter=t),placeholder:"https://twitter.com/abc",label:"Twitter"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).facebook,"onUpdate:modelValue":l[12]||(l[12]=t=>o(s).facebook=t),placeholder:"https://facebook.com/abc",label:"Facebook"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).googlePlus,"onUpdate:modelValue":l[13]||(l[13]=t=>o(s).googlePlus=t),placeholder:"https://plus.google.com/abc",label:"Google+"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).linkedIn,"onUpdate:modelValue":l[14]||(l[14]=t=>o(s).linkedIn=t),placeholder:"https://linkedin.com/abc",label:"LinkedIn"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),m("div",se,[e(v,{color:"secondary",variant:"tonal",disabled:o(d)===0,onClick:l[16]||(l[16]=t=>d.value--)},{default:a(()=>[e(F,{icon:"tabler-arrow-left",start:"",class:"flip-in-rtl"}),l[21]||(l[21]=g(" Previous "))]),_:1},8,["disabled"]),k.length-1===o(d)?(y(),P(v,{key:0,color:"success","append-icon":"tabler-check",onClick:x},{default:a(()=>l[22]||(l[22]=[g(" submit ")])),_:1})):(y(),P(v,{key:1,onClick:l[17]||(l[17]=t=>d.value++)},{default:a(()=>[l[23]||(l[23]=g(" Next ")),e(F,{icon:"tabler-arrow-right",end:"",class:"flip-in-rtl"})]),_:1}))])]),_:1})]),_:1})]),_:1})}}},ne={class:"d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8"},de={__name:"DemoFormWizardNumberedModernVertical",setup(T){const k=[{title:"Account Details",subtitle:"Setup Account Details"},{title:"Personal Info",subtitle:"Add personal info"},{title:"Social Links",subtitle:"Add social links"}],d=V(0),c=V(!1),f=V(!1),s=V({username:"",email:"",password:"",cPassword:"",firstName:"",lastName:"",country:void 0,language:void 0,twitter:"",facebook:"",googlePlus:"",linkedIn:""}),x=()=>{console.log(s.value)};return(D,l)=>{const w=W,i=B,b=N;return y(),P(C,null,{default:a(()=>[e(r,{cols:"12",md:"4"},{default:a(()=>[e(L,null,{default:a(()=>[e(w,{"current-step":o(d),"onUpdate:currentStep":l[0]||(l[0]=t=>h(d)?d.value=t:null),direction:"vertical",items:k},null,8,["current-step"])]),_:1})]),_:1}),e(r,{cols:"12",md:"8"},{default:a(()=>[e(q,null,{default:a(()=>[e(L,null,{default:a(()=>[e(U,null,{default:a(()=>[e(R,{modelValue:o(d),"onUpdate:modelValue":l[15]||(l[15]=t=>h(d)?d.value=t:null),class:"disable-tab-transition"},{default:a(()=>[e(S,null,{default:a(()=>[e(C,null,{default:a(()=>[e(r,{cols:"12"},{default:a(()=>l[18]||(l[18]=[m("h6",{class:"text-h6 font-weight-medium"}," Account Details ",-1),m("p",{class:"mb-0"}," Enter your Account Details ",-1)])),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).username,"onUpdate:modelValue":l[1]||(l[1]=t=>o(s).username=t),placeholder:"CarterLeonardo",label:"Username"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).email,"onUpdate:modelValue":l[2]||(l[2]=t=>o(s).email=t),placeholder:"carterleonardo@gmail.com",label:"Email"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).password,"onUpdate:modelValue":l[3]||(l[3]=t=>o(s).password=t),placeholder:"············",label:"Password",type:o(c)?"text":"password","append-inner-icon":o(c)?"tabler-eye-off":"tabler-eye","onClick:appendInner":l[4]||(l[4]=t=>c.value=!o(c))},null,8,["modelValue","type","append-inner-icon"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).cPassword,"onUpdate:modelValue":l[5]||(l[5]=t=>o(s).cPassword=t),placeholder:"············",label:"Confirm Password",type:o(f)?"text":"password","append-inner-icon":o(f)?"tabler-eye-off":"tabler-eye","onClick:appendInner":l[6]||(l[6]=t=>f.value=!o(f))},null,8,["modelValue","type","append-inner-icon"])]),_:1})]),_:1})]),_:1}),e(S,null,{default:a(()=>[e(C,null,{default:a(()=>[e(r,{cols:"12"},{default:a(()=>l[19]||(l[19]=[m("h6",{class:"text-h6 font-weight-medium"}," Personal Info ",-1),m("p",{class:"mb-0"}," Setup Information ",-1)])),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).firstName,"onUpdate:modelValue":l[7]||(l[7]=t=>o(s).firstName=t),label:"First Name",placeholder:"Leonard"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).lastName,"onUpdate:modelValue":l[8]||(l[8]=t=>o(s).lastName=t),label:"Last Name",placeholder:"Carter"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(b,{modelValue:o(s).country,"onUpdate:modelValue":l[9]||(l[9]=t=>o(s).country=t),label:"Country",placeholder:"Select Country",items:["UK","USA","Canada","Australia","Germany"]},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(b,{modelValue:o(s).language,"onUpdate:modelValue":l[10]||(l[10]=t=>o(s).language=t),label:"Language",placeholder:"Select Language",items:["English","Spanish","French","Russian","German"]},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(S,null,{default:a(()=>[e(C,null,{default:a(()=>[e(r,{cols:"12"},{default:a(()=>l[20]||(l[20]=[m("h6",{class:"text-h6 font-weight-medium"}," Social Links ",-1),m("p",{class:"mb-0"}," Add Social Links ",-1)])),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).twitter,"onUpdate:modelValue":l[11]||(l[11]=t=>o(s).twitter=t),placeholder:"https://twitter.com/abc",label:"Twitter"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).facebook,"onUpdate:modelValue":l[12]||(l[12]=t=>o(s).facebook=t),placeholder:"https://facebook.com/abc",label:"Facebook"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).googlePlus,"onUpdate:modelValue":l[13]||(l[13]=t=>o(s).googlePlus=t),placeholder:"https://plus.google.com/abc",label:"Google+"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).linkedIn,"onUpdate:modelValue":l[14]||(l[14]=t=>o(s).linkedIn=t),placeholder:"https://linkedin.com/abc",label:"LinkedIn"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),m("div",ne,[e(v,{color:"secondary",variant:"tonal",disabled:o(d)===0,onClick:l[16]||(l[16]=t=>d.value--)},{default:a(()=>[e(F,{icon:"tabler-arrow-left",start:"",class:"flip-in-rtl"}),l[21]||(l[21]=g(" Previous "))]),_:1},8,["disabled"]),k.length-1===o(d)?(y(),P(v,{key:0,color:"success","append-icon":"tabler-check",onClick:x},{default:a(()=>l[22]||(l[22]=[g(" submit ")])),_:1})):(y(),P(v,{key:1,onClick:l[17]||(l[17]=t=>d.value++)},{default:a(()=>[l[23]||(l[23]=g(" Next ")),e(F,{icon:"tabler-arrow-right",end:"",class:"flip-in-rtl"})]),_:1}))])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}}},ie={class:"d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8"},ue={class:"d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8"},me={class:"d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8"},pe={__name:"DemoFormWizardNumberedValidation",setup(T){const k=[{title:"Account Details",subtitle:"Setup Account Details"},{title:"Personal Info",subtitle:"Add personal info"},{title:"Social Links",subtitle:"Add social links"}],d=V(0),c=V(!1),f=V(!1),s=V(!0),x=V(),D=V(),l=V(),w=V({username:"",email:"",password:"",cPassword:""}),i=V({firstName:"",lastName:"",country:void 0,language:void 0}),b=V({twitter:"",facebook:"",googlePlus:"",linkedIn:""}),t=()=>{var u;(u=x.value)==null||u.validate().then(n=>{n.valid?(d.value++,s.value=!0):s.value=!1})},J=()=>{var u;(u=D.value)==null||u.validate().then(n=>{n.valid?(d.value++,s.value=!0):s.value=!1})},O=()=>{var u;(u=l.value)==null||u.validate().then(n=>{n.valid?(s.value=!0,console.log({...w.value,...i.value,...b.value})):s.value=!1})};return(u,n)=>{const Q=W,I=B,G=N;return y(),P(q,null,{default:a(()=>[e(L,null,{default:a(()=>[e(Q,{"current-step":o(d),"onUpdate:currentStep":n[0]||(n[0]=p=>h(d)?d.value=p:null),items:k,align:"start","is-active-step-valid":o(s)},null,8,["current-step","is-active-step-valid"])]),_:1}),e(E),e(L,null,{default:a(()=>[e(R,{modelValue:o(d),"onUpdate:modelValue":n[17]||(n[17]=p=>h(d)?d.value=p:null),class:"disable-tab-transition"},{default:a(()=>[e(S,null,{default:a(()=>[e(o(U),{ref_key:"refAccountForm",ref:x,onSubmit:j(t,["prevent"])},{default:a(()=>[e(C,null,{default:a(()=>[e(r,{cols:"12"},{default:a(()=>n[18]||(n[18]=[m("h6",{class:"text-h6 font-weight-medium"}," Account Details ",-1),m("p",{class:"mb-0"}," Enter your Account Details ",-1)])),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(I,{modelValue:o(w).username,"onUpdate:modelValue":n[1]||(n[1]=p=>o(w).username=p),placeholder:"CarterLeonardo",rules:["requiredValidator"in u?u.requiredValidator:o(A)],label:"Username"},null,8,["modelValue","rules"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(I,{modelValue:o(w).email,"onUpdate:modelValue":n[2]||(n[2]=p=>o(w).email=p),placeholder:"carterleonardo@gmail.com",rules:["requiredValidator"in u?u.requiredValidator:o(A),"emailValidator"in u?u.emailValidator:o(Z)],label:"Email"},null,8,["modelValue","rules"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(I,{modelValue:o(w).password,"onUpdate:modelValue":n[3]||(n[3]=p=>o(w).password=p),label:"Password",placeholder:"············",rules:["requiredValidator"in u?u.requiredValidator:o(A),"passwordValidator"in u?u.passwordValidator:o(_)],type:o(c)?"text":"password","append-inner-icon":o(c)?"tabler-eye-off":"tabler-eye","onClick:appendInner":n[4]||(n[4]=p=>c.value=!o(c))},null,8,["modelValue","rules","type","append-inner-icon"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(I,{modelValue:o(w).cPassword,"onUpdate:modelValue":n[5]||(n[5]=p=>o(w).cPassword=p),label:"Confirm Password",placeholder:"············",rules:["requiredValidator"in u?u.requiredValidator:o(A),("confirmedValidator"in u?u.confirmedValidator:o(ee))(o(w).cPassword,o(w).password)],type:o(f)?"text":"password","append-inner-icon":o(f)?"tabler-eye-off":"tabler-eye","onClick:appendInner":n[6]||(n[6]=p=>f.value=!o(f))},null,8,["modelValue","rules","type","append-inner-icon"])]),_:1}),e(r,{cols:"12"},{default:a(()=>[m("div",ie,[e(v,{color:"secondary",variant:"tonal",disabled:""},{default:a(()=>[e(F,{icon:"tabler-arrow-left",start:"",class:"flip-in-rtl"}),n[19]||(n[19]=g(" Previous "))]),_:1}),e(v,{type:"submit"},{default:a(()=>[n[20]||(n[20]=g(" Next ")),e(F,{icon:"tabler-arrow-right",end:"",class:"flip-in-rtl"})]),_:1})])]),_:1})]),_:1})]),_:1},512)]),_:1}),e(S,null,{default:a(()=>[e(o(U),{ref_key:"refPersonalForm",ref:D,onSubmit:j(J,["prevent"])},{default:a(()=>[e(C,null,{default:a(()=>[e(r,{cols:"12"},{default:a(()=>n[21]||(n[21]=[m("h6",{class:"text-h6 font-weight-medium"}," Personal Info ",-1),m("p",{class:"mb-0"}," Setup Information ",-1)])),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(I,{modelValue:o(i).firstName,"onUpdate:modelValue":n[7]||(n[7]=p=>o(i).firstName=p),label:"First Name",rules:["requiredValidator"in u?u.requiredValidator:o(A)],placeholder:"Leonard"},null,8,["modelValue","rules"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(I,{modelValue:o(i).lastName,"onUpdate:modelValue":n[8]||(n[8]=p=>o(i).lastName=p),label:"Last Name",rules:["requiredValidator"in u?u.requiredValidator:o(A)],placeholder:"Carter"},null,8,["modelValue","rules"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(G,{modelValue:o(i).country,"onUpdate:modelValue":n[9]||(n[9]=p=>o(i).country=p),label:"Country",rules:["requiredValidator"in u?u.requiredValidator:o(A)],placeholder:"Select Country",items:["UK","USA","Canada","Australia","Germany"]},null,8,["modelValue","rules"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(G,{modelValue:o(i).language,"onUpdate:modelValue":n[10]||(n[10]=p=>o(i).language=p),label:"Language",rules:["requiredValidator"in u?u.requiredValidator:o(A)],placeholder:"Select Language",items:["English","Spanish","French","Russian","German"]},null,8,["modelValue","rules"])]),_:1}),e(r,{cols:"12"},{default:a(()=>[m("div",ue,[e(v,{color:"secondary",variant:"tonal",onClick:n[11]||(n[11]=p=>d.value--)},{default:a(()=>[e(F,{icon:"tabler-arrow-left",start:"",class:"flip-in-rtl"}),n[22]||(n[22]=g(" Previous "))]),_:1}),e(v,{type:"submit"},{default:a(()=>[n[23]||(n[23]=g(" Next ")),e(F,{icon:"tabler-arrow-right",end:"",class:"flip-in-rtl"})]),_:1})])]),_:1})]),_:1})]),_:1},512)]),_:1}),e(S,null,{default:a(()=>[e(o(U),{ref_key:"refSocialLinkForm",ref:l,onSubmit:j(O,["prevent"])},{default:a(()=>[e(C,null,{default:a(()=>[e(r,{cols:"12"},{default:a(()=>n[24]||(n[24]=[m("h6",{class:"text-h6 font-weight-medium"}," Social Links ",-1),m("p",{class:"mb-0"}," Add Social Links ",-1)])),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(I,{modelValue:o(b).twitter,"onUpdate:modelValue":n[12]||(n[12]=p=>o(b).twitter=p),placeholder:"https://twitter.com/abc",rules:["requiredValidator"in u?u.requiredValidator:o(A),"urlValidator"in u?u.urlValidator:o($)],label:"Twitter"},null,8,["modelValue","rules"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(I,{modelValue:o(b).facebook,"onUpdate:modelValue":n[13]||(n[13]=p=>o(b).facebook=p),placeholder:"https://facebook.com/abc",rules:["requiredValidator"in u?u.requiredValidator:o(A),"urlValidator"in u?u.urlValidator:o($)],label:"Facebook"},null,8,["modelValue","rules"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(I,{modelValue:o(b).googlePlus,"onUpdate:modelValue":n[14]||(n[14]=p=>o(b).googlePlus=p),placeholder:"https://plus.google.com/abc",rules:["requiredValidator"in u?u.requiredValidator:o(A),"urlValidator"in u?u.urlValidator:o($)],label:"Google+"},null,8,["modelValue","rules"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(I,{modelValue:o(b).linkedIn,"onUpdate:modelValue":n[15]||(n[15]=p=>o(b).linkedIn=p),placeholder:"https://likedin.com/abc",rules:["requiredValidator"in u?u.requiredValidator:o(A),"urlValidator"in u?u.urlValidator:o($)],label:"LinkedIn"},null,8,["modelValue","rules"])]),_:1}),e(r,{cols:"12"},{default:a(()=>[m("div",me,[e(v,{color:"secondary",variant:"tonal",onClick:n[16]||(n[16]=p=>d.value--)},{default:a(()=>[e(F,{icon:"tabler-arrow-left",start:"",class:"flip-in-rtl"}),n[25]||(n[25]=g(" Previous "))]),_:1}),e(v,{color:"success",type:"submit"},{default:a(()=>n[26]||(n[26]=[g(" submit ")])),_:1})])]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})}}},ce={class:"d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8"},Ve={__name:"DemoFormWizardNumberedVertical",setup(T){const k=[{title:"Account Details",subtitle:"Setup Account Details"},{title:"Personal Info",subtitle:"Add personal info"},{title:"Social Links",subtitle:"Add social links"}],d=V(0),c=V(!1),f=V(!1),s=V({username:"",email:"",password:"",cPassword:"",firstName:"",lastName:"",country:void 0,language:void 0,twitter:"",facebook:"",googlePlus:"",linkedIn:""}),x=()=>{console.log(s.value)};return(D,l)=>{const w=W,i=B,b=N;return y(),P(q,null,{default:a(()=>[e(C,null,{default:a(()=>[e(r,{cols:"12",md:"4",class:Y(D.$vuetify.display.smAndDown?"border-b":"border-e")},{default:a(()=>[e(L,null,{default:a(()=>[e(w,{"current-step":o(d),"onUpdate:currentStep":l[0]||(l[0]=t=>h(d)?d.value=t:null),direction:"vertical",items:k},null,8,["current-step"])]),_:1})]),_:1},8,["class"]),e(r,{cols:"12",md:"8"},{default:a(()=>[e(L,null,{default:a(()=>[e(U,null,{default:a(()=>[e(R,{modelValue:o(d),"onUpdate:modelValue":l[15]||(l[15]=t=>h(d)?d.value=t:null),class:"disable-tab-transition"},{default:a(()=>[e(S,null,{default:a(()=>[e(C,null,{default:a(()=>[e(r,{cols:"12"},{default:a(()=>l[18]||(l[18]=[m("h6",{class:"text-h6 font-weight-medium"}," Account Details ",-1),m("p",{class:"mb-0"}," Enter your Account Details ",-1)])),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).username,"onUpdate:modelValue":l[1]||(l[1]=t=>o(s).username=t),placeholder:"CarterLeonardo",label:"Username"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).email,"onUpdate:modelValue":l[2]||(l[2]=t=>o(s).email=t),placeholder:"carterleonardo@gmail.com",label:"Email"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).password,"onUpdate:modelValue":l[3]||(l[3]=t=>o(s).password=t),placeholder:"············",label:"Password",type:o(c)?"text":"password","append-inner-icon":o(c)?"tabler-eye-off":"tabler-eye","onClick:appendInner":l[4]||(l[4]=t=>c.value=!o(c))},null,8,["modelValue","type","append-inner-icon"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).cPassword,"onUpdate:modelValue":l[5]||(l[5]=t=>o(s).cPassword=t),placeholder:"············",label:"Confirm Password",type:o(f)?"text":"password","append-inner-icon":o(f)?"tabler-eye-off":"tabler-eye","onClick:appendInner":l[6]||(l[6]=t=>f.value=!o(f))},null,8,["modelValue","type","append-inner-icon"])]),_:1})]),_:1})]),_:1}),e(S,null,{default:a(()=>[e(C,null,{default:a(()=>[e(r,{cols:"12"},{default:a(()=>l[19]||(l[19]=[m("h6",{class:"text-h6 font-weight-medium"}," Personal Info ",-1),m("p",{class:"mb-0"}," Setup Information ",-1)])),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).firstName,"onUpdate:modelValue":l[7]||(l[7]=t=>o(s).firstName=t),label:"First Name",placeholder:"Leonard"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).lastName,"onUpdate:modelValue":l[8]||(l[8]=t=>o(s).lastName=t),label:"Last Name",placeholder:"Carter"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(b,{modelValue:o(s).country,"onUpdate:modelValue":l[9]||(l[9]=t=>o(s).country=t),label:"Country",placeholder:"Select Country",items:["UK","USA","Canada","Australia","Germany"]},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(b,{modelValue:o(s).language,"onUpdate:modelValue":l[10]||(l[10]=t=>o(s).language=t),label:"Language",placeholder:"Select Language",items:["English","Spanish","French","Russian","German"]},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(S,null,{default:a(()=>[e(C,null,{default:a(()=>[e(r,{cols:"12"},{default:a(()=>l[20]||(l[20]=[m("h6",{class:"text-h6 font-weight-medium"}," Social Links ",-1),m("p",{class:"mb-0"}," Add Social Links ",-1)])),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).twitter,"onUpdate:modelValue":l[11]||(l[11]=t=>o(s).twitter=t),placeholder:"https://twitter.com/abc",label:"Twitter"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).facebook,"onUpdate:modelValue":l[12]||(l[12]=t=>o(s).facebook=t),placeholder:"https://facebook.com/abc",label:"Facebook"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).googlePlus,"onUpdate:modelValue":l[13]||(l[13]=t=>o(s).googlePlus=t),placeholder:"https://plus.google.com/abc",label:"Google+"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:a(()=>[e(i,{modelValue:o(s).linkedIn,"onUpdate:modelValue":l[14]||(l[14]=t=>o(s).linkedIn=t),placeholder:"https://linkedin.com/abc",label:"LinkedIn"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),m("div",ce,[e(v,{color:"secondary",variant:"tonal",disabled:o(d)===0,onClick:l[16]||(l[16]=t=>d.value--)},{default:a(()=>[e(F,{icon:"tabler-arrow-left",start:"",class:"flip-in-rtl"}),l[21]||(l[21]=g(" Previous "))]),_:1},8,["disabled"]),k.length-1===o(d)?(y(),P(v,{key:0,color:"success","append-icon":"tabler-check",onClick:x},{default:a(()=>l[22]||(l[22]=[g(" submit ")])),_:1})):(y(),P(v,{key:1,onClick:l[17]||(l[17]=t=>d.value++)},{default:a(()=>[l[23]||(l[23]=g(" Next ")),e(F,{icon:"tabler-arrow-right",end:"",class:"flip-in-rtl"})]),_:1}))])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}}},_e={__name:"form-wizard-numbered",setup(T){return(k,d)=>{const c=X;return y(),M(H,null,[e(C,null,{default:a(()=>[e(r,{cols:"12"},{default:a(()=>[e(c,{variant:"outlined",title:"Basic",code:K},{default:a(()=>[e(re)]),_:1},8,["code"])]),_:1}),e(r,{cols:"12"},{default:a(()=>[e(c,{variant:"outlined",title:"Validation",code:le},{default:a(()=>[e(pe)]),_:1},8,["code"])]),_:1}),e(r,{cols:"12"},{default:a(()=>[e(c,{variant:"outlined",title:"Vertical",code:z},{default:a(()=>[e(Ve)]),_:1},8,["code"])]),_:1})]),_:1}),e(E,{class:"my-10 mx-n6"}),d[0]||(d[0]=m("h3",{class:"text-h3 my-4"}," Modern ",-1)),e(C,null,{default:a(()=>[e(r,{cols:"12"},{default:a(()=>[e(c,{variant:"outlined",title:"Vertical",code:z},{default:a(()=>[e(de)]),_:1},8,["code"])]),_:1}),e(r,{cols:"12"},{default:a(()=>[e(c,{variant:"outlined",title:"Basic",code:K},{default:a(()=>[e(te)]),_:1},8,["code"])]),_:1})]),_:1})],64)}}};export{_e as default};
