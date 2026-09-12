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
import { computed, onMounted, ref } from 'vue'
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
const errorDetails = ref([])
const isLoading = ref(false)

// Pengecekan Kriteria Password
const passwordLengthValid = computed(() => {
  const len = form.value.password ? form.value.password.length : 0
  return len >= 8 && len <= 12
})

const passwordUpperLowerValid = computed(() => {
  const p = form.value.password || ''
  return /[a-z]/.test(p) && /[A-Z]/.test(p)
})

const passwordNumberValid = computed(() => {
  return /[0-9]/.test(form.value.password || '')
})

const passwordSymbolValid = computed(() => {
  return /[@#$%!&*^~_+\-=?]/.test(form.value.password || '')
})

// Perhitungan Nilai Strength (0 - 100)
const passwordStrengthScore = computed(() => {
  const p = form.value.password || ''
  if (!p) return 0

  let score = 0
  // Panjang 8-12 karakter (bobot: 25)
  if (p.length >= 8 && p.length <= 12) {
    score += 25
  } else if (p.length > 12) {
    score += 20
  } else if (p.length >= 6) {
    score += 10
  }

  // Campuran huruf besar dan kecil (bobot: 25)
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) {
    score += 25
  } else if (/[a-zA-Z]/.test(p)) {
    score += 10
  }

  // Mengandung angka (bobot: 25)
  if (/[0-9]/.test(p)) {
    score += 25
  }

  // Mengandung simbol khusus (@, #, $, %, !, dll) (bobot: 25)
  if (/[@#$%!&*^~_+\-=?]/.test(p)) {
    score += 25
  }

  return score
})

const passwordStrengthColor = computed(() => {
  if (passwordStrengthScore.value >= 65) return 'success'
  if (passwordStrengthScore.value >= 40) return 'warning'
  return 'error'
})

const passwordStrengthLabel = computed(() => {
  if (passwordStrengthScore.value >= 80) return 'Sangat Kuat'
  if (passwordStrengthScore.value >= 65) return 'Kuat'
  if (passwordStrengthScore.value >= 40) return 'Sedang'
  if (passwordStrengthScore.value > 0) return 'Lemah'
  return ''
})

const requiredValidator = v => !!v || 'This field is required'
const emailValidator = v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
const passwordMatchValidator = password => v => v === password || 'Password does not match'
const passwordStrengthValidator = v => {
  if (!v) return 'This field is required'
  if (passwordStrengthScore.value < 65) {
    return 'Kekuatan password minimal rating 65 (8–12 karakter, huruf besar & kecil, angka, dan simbol khusus).'
  }
  return true
}

onMounted(async () => {
  await fetchStudentData()
  await fetchTeacherData()
})

const register = async () => {
  errorMessage.value = ''
  errorDetails.value = []
  errors.value = {}

  // Validasi pemilihan Student atau Teacher
  if (isStudent.value && (!form.value.adminStudentId || form.value.adminStudentId === 'Select' || !form.value.adminStudentId.id)) {
    errorMessage.value = 'Silakan pilih nama Siswa terlebih dahulu.'
    return
  }

  if (!isStudent.value && (!form.value.adminTeacherId || form.value.adminTeacherId === 'Select' || !form.value.adminTeacherId.id)) {
    errorMessage.value = 'Silakan pilih nama Guru terlebih dahulu.'
    return
  }

  // Validasi Privacy Policy
  if (!form.value.privacyPolicies) {
    errorMessage.value = 'Anda harus menyetujui Privacy Policy & Terms untuk melanjutkan.'
    return
  }

  const formValues = { 
    ...form.value, 
    adminStudentId: form.value.adminStudentId?.id || null, 
    adminTeacherId: form.value.adminTeacherId?.id || null, 
    name: form.value.adminStudentId?.name || form.value.adminTeacherId?.name, 
  }

  isLoading.value = true

  try {
    const res = await $api('/auth/register', {
      method: 'POST',
      body: JSON.stringify(formValues),
      headers: { 'Content-Type': 'application/json' },
      onResponseError({ response }) {
        const data = response._data || {}
        errors.value = data.errors || {}
        errorMessage.value = data.message || data.error || 'Pendaftaran gagal. Silakan periksa kembali data Anda.'

        // Kumpulkan detail pesan error jika ada (validasi email, cpanel, db duplikat, dll)
        if (data.errors && typeof data.errors === 'object') {
          const detailList = []
          Object.entries(data.errors).forEach(([field, msgs]) => {
            if (Array.isArray(msgs)) {
              detailList.push(...msgs)
            } else if (typeof msgs === 'string') {
              detailList.push(msgs)
            }
          })
          errorDetails.value = detailList
        }
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
    if (!errorMessage.value) {
      errorMessage.value = 'Terjadi kesalahan pada sistem. Silakan coba beberapa saat lagi.'
    }
  } finally {
    isLoading.value = false
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
          <!-- Error Alert Banner -->
          <VAlert
            v-if="errorMessage"
            type="error"
            variant="tonal"
            closable
            class="mb-4"
            @click:close="errorMessage = ''; errorDetails = []"
          >
            <div class="font-weight-semibold">
              {{ errorMessage }}
            </div>
            <ul
              v-if="errorDetails.length > 0"
              class="ps-4 mt-2 mb-0 text-caption"
            >
              <li
                v-for="(detail, i) in errorDetails"
                :key="i"
              >
                {{ detail }}
              </li>
            </ul>
          </VAlert>

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
                  :rules="[requiredValidator, passwordStrengthValidator]"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <!-- Password Strength Rating Indicator -->
                <div
                  v-if="form.password"
                  class="mt-2"
                >
                  <div class="d-flex justify-space-between align-center mb-1">
                    <span class="text-caption font-weight-medium text-medium-emphasis">
                      Kekuatan Password:
                      <strong :class="`text-${passwordStrengthColor}`">
                        {{ passwordStrengthScore }}/100 ({{ passwordStrengthLabel }})
                      </strong>
                    </span>
                    <span
                      class="text-xs font-weight-bold"
                      :class="passwordStrengthScore >= 65 ? 'text-success' : 'text-error'"
                    >
                      {{ passwordStrengthScore >= 65 ? 'Memenuhi Syarat' : 'Min. Rating 65' }}
                    </span>
                  </div>

                  <VProgressLinear
                    :model-value="passwordStrengthScore"
                    :color="passwordStrengthColor"
                    height="6"
                    rounded
                    class="mb-3"
                  />

                  <!-- Checklist Kriteria Password -->
                  <div class="d-flex flex-column gap-1 pa-2 rounded bg-surface-variant-subtle">
                    <div class="d-flex align-center gap-2 text-caption">
                      <VIcon
                        :icon="passwordLengthValid ? 'tabler-circle-check' : 'tabler-circle-x'"
                        :color="passwordLengthValid ? 'success' : 'medium-emphasis'"
                        size="16"
                      />
                      <span :class="passwordLengthValid ? 'text-success font-weight-medium' : 'text-medium-emphasis'">
                        Minimal 8–12 karakter
                      </span>
                    </div>

                    <div class="d-flex align-center gap-2 text-caption">
                      <VIcon
                        :icon="passwordUpperLowerValid ? 'tabler-circle-check' : 'tabler-circle-x'"
                        :color="passwordUpperLowerValid ? 'success' : 'medium-emphasis'"
                        size="16"
                      />
                      <span :class="passwordUpperLowerValid ? 'text-success font-weight-medium' : 'text-medium-emphasis'">
                        Campuran huruf besar (A-Z) & kecil (a-z)
                      </span>
                    </div>

                    <div class="d-flex align-center gap-2 text-caption">
                      <VIcon
                        :icon="passwordNumberValid ? 'tabler-circle-check' : 'tabler-circle-x'"
                        :color="passwordNumberValid ? 'success' : 'medium-emphasis'"
                        size="16"
                      />
                      <span :class="passwordNumberValid ? 'text-success font-weight-medium' : 'text-medium-emphasis'">
                        Mengandung minimal satu angka (0-9)
                      </span>
                    </div>

                    <div class="d-flex align-center gap-2 text-caption">
                      <VIcon
                        :icon="passwordSymbolValid ? 'tabler-circle-check' : 'tabler-circle-x'"
                        :color="passwordSymbolValid ? 'success' : 'medium-emphasis'"
                        size="16"
                      />
                      <span :class="passwordSymbolValid ? 'text-success font-weight-medium' : 'text-medium-emphasis'">
                        Simbol khusus (seperti @, #, $, %, !)
                      </span>
                    </div>
                  </div>
                </div>
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
                  :loading="isLoading"
                  :disabled="isLoading"
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

.bg-surface-variant-subtle {
  background-color: rgba(var(--v-theme-on-surface), 0.04);
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08);
}
</style>
