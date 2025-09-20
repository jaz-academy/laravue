<script setup>
import { fetchStudentData, students } from '@/composables/fetchStudentData'
import { fetchTeacherData, teachers } from '@/composables/fetchTeacherData'
import { useAbility } from '@/plugins/casl/composables/useAbility'
import authV2RegisterIllustrationBorderedDark from '@images/pages/auth-v2-register-illustration-bordered-dark.png'
import authV2RegisterIllustrationBorderedLight from '@images/pages/auth-v2-register-illustration-bordered-light.png'
import authV2RegisterIllustrationDark from '@images/pages/auth-v2-register-illustration-dark.png'
import authV2RegisterIllustrationLight from '@images/pages/auth-v2-register-illustration-light.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { VForm } from 'vuetify/components/VForm'

const imageVariant = useGenerateImageVariant(authV2RegisterIllustrationLight, authV2RegisterIllustrationDark, authV2RegisterIllustrationBorderedLight, authV2RegisterIllustrationBorderedDark, true)
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

definePage({
  meta: {
    layout: 'blank',
    unauthenticatedOnly: true,
  },
})

const refVForm = ref()
const isStudent = ref(true)

const form = ref({
  adminStudentId: 'Select',
  adminTeacherId: 'Select',
  email: 'lubna@jazacademy.id',
  password: '',
  passwordConfirmation: '',
  privacyPolicies: false,
})

const route = useRoute()
const router = useRouter()
const ability = useAbility()
const isPasswordVisible = ref(false)
const errors = ref({})
const errorMessage = ref('')

const requiredValidator = v => !!v || 'This field is required'
const emailValidator = v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
const passwordMatchValidator = password => v => v === password || 'Password does not match'

onMounted(async () => {
  await fetchStudentData()
  await fetchTeacherData()
})

const register = async () => {
  const formValues = { 
    ...form.value, 
    adminStudentId: form.value.adminStudentId?.id || null, 
    adminTeacherId: form.value.adminTeacherId?.id || null, 
    name: form.value.adminStudentId?.name || form.value.adminTeacherId?.name, 
  }

  try {
    const res = await $api('/auth/register', {
      method: 'POST',
      body: JSON.stringify(formValues),
      headers: { 'Content-Type': 'application/json' },
      onResponseError({ response }) {
        errors.value = response._data.errors
        errorMessage.value = response._data.message || 'Register failed'
      },
    })

    const { accessToken, userData, userAbilityRules, participant } = res

    useCookie('userAbilityRules').value = userAbilityRules
    ability.update(userAbilityRules)
    useCookie('userData').value = userData
    useCookie('accessToken').value = accessToken

    if (participant) {
      const { password, ...safeData } = participant

      localStorage.setItem('participant', JSON.stringify(safeData))
    }
    await nextTick(() => {
      router.replace(route.query.to ? String(route.query.to) : '/login')
    })
  } catch (err) {
    console.error(err)
  }
}

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) {
      register()
    }
  })
}
</script>

<template>
  <VRow
    no-gutters
    class="auth-wrapper bg-surface"
  >
    <VCol
      md="8"
      class="d-none d-md-flex"
    >
      <div class="position-relative bg-background rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="441"
            :src="imageVariant"
            class="auth-illustration mt-16 mb-2"
          />
        </div>

        <VImg
          class="auth-footer-mask"
          :src="authThemeMask"
        />
      </div>
    </VCol>

    <VCol
      cols="12"
      md="4"
      class="auth-card-v2 d-flex align-center justify-center"
      style="background-color: rgb(var(--v-theme-surface));"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-4"
      >
        <VCardText>
          <VNodeRenderer
            :nodes="themeConfig.app.logo"
            class="mb-6"
          />
          <h5 class="text-h5 mb-1">
            Adventure starts here 🚀
          </h5>
          <p class="mb-0">
            Make your app management easy and fun!
          </p>
        </VCardText>

        <VCardText>
          <VForm
            ref="refVForm"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <VCol cols="12">
                <div class="demo-space-x">
                  <VSwitch
                    v-model="isStudent"
                    :label="isStudent ? 'I\'m Student' : 'I\'m Teacher'"
                  />
                </div>
              </VCol>

              <!-- Student ID -->
              <VCol
                v-if="isStudent"
                cols="12"
              >
                <AppSelect
                  v-model="form.adminStudentId"
                  hint="Select Student Name"
                  :items="students"
                  item-title="name"
                  item-value="id"
                  persistent-hint
                  return-object
                  single-line
                  placeholder="Select Student"
                />
              </VCol>


              <!-- Teacher ID -->
              <VCol
                v-else
                cols="12"
              >
                <AppSelect
                  v-model="form.adminTeacherId"
                  hint="Select Teacher Name"
                  :items="teachers"
                  item-title="name"
                  item-value="id"
                  persistent-hint
                  return-object
                  single-line
                  placeholder="Select Teacher"
                />
              </VCol>

              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="form.email"
                  :rules="[requiredValidator, emailValidator]"
                  label="Email"
                  type="email"
                  placeholder="lubna@jazacademy.id"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField
                  v-model="form.password"
                  :rules="[requiredValidator]"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="form.passwordConfirmation"
                  :rules="[requiredValidator, passwordMatchValidator(form.password)]"
                  label="Re-Type Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <VCol cols="12">
                <div class="d-flex align-center mt-2 mb-4">
                  <VCheckbox
                    id="privacy-policy"
                    v-model="form.privacyPolicies"
                    inline
                  />
                  <VLabel
                    for="privacy-policy"
                    style="opacity: 1;"
                  >
                    <span class="me-1">I agree to</span>
                    <a
                      href="javascript:void(0)"
                      class="text-primary"
                    >privacy policy & terms</a>
                  </VLabel>
                </div>

                <VBtn
                  block
                  type="submit"
                >
                  Sign up
                </VBtn>
              </VCol>

              <!-- create account -->
              <VCol
                cols="12"
                class="text-center text-base"
              >
                <span>Already have an account?</span>
                <RouterLink
                  class="text-primary ms-2"
                  :to="{ name: 'login' }"
                >
                  Sign in instead
                </RouterLink>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core-scss/template/pages/page-auth.scss";
</style>
