<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'userData',
])

const currentYear = new Date().getFullYear()
const isFormValid = ref(false)
const refForm = ref()
const nis = ref('')
const name = ref('')
const nickname = ref('')
const gender = ref('')
const registered = ref(currentYear)
const rumble = ref('7')
const paymentCategory = ref('Regular')
const birthPlace = ref('')
const birthDate = ref('')

const getRecentYears = numYears => {
  return Array.from({ length: numYears }, (_, i) => currentYear - i)
}

// 👉 drawer close
const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      emit('userData', {
        nis: nis.value,
        name: name.value,
        nickname: nickname.value,
        gender: gender.value,
        rumble: rumble.value,
        birth_date: birthDate.value,
        birth_place: birthPlace.value,
        registered: registered.value,
        payment_category: paymentCategory.value,
      })
      emit('update:isDrawerOpen', false)
      nextTick(() => {
        refForm.value?.reset()
        refForm.value?.resetValidation()
      })
    }
  })
}

const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}
</script>

<template>
  <VNavigationDrawer
    temporary
    :width="400"
    location="end"
    class="scrollable-content"
    :model-value="props.isDrawerOpen"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <!-- 👉 Title -->
    <AppDrawerHeaderSection
      title="Add New Student"
      @cancel="closeNavigationDrawer"
    />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <!-- 👉 Form -->
          <VForm
            ref="refForm"
            v-model="isFormValid"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- 👉 NIS -->
              <VCol cols="12">
                <AppTextField
                  v-model="nis"
                  :rules="[requiredValidator]"
                  label="NIS"
                  placeholder="201122"
                />
              </VCol>

              <!-- 👉 Name -->
              <VCol cols="12">
                <AppTextField
                  v-model="name"
                  :rules="[requiredValidator]"
                  label="Name"
                  placeholder="John Doe"
                />
              </VCol>

              <!-- 👉 nickname -->
              <VCol cols="12">
                <AppTextField
                  v-model="nickname"
                  :rules="[requiredValidator]"
                  label="Nickname"
                  placeholder="John"
                />
              </VCol>

              <!-- 👉 gender -->
              <VCol cols="12">
                <AppSelect
                  v-model="gender"
                  label="Select Gender"
                  placeholder="Select Gender"
                  :rules="[requiredValidator]"
                  :items="['Laki-laki', 'Perempuan']"
                />
              </VCol>

              <!-- 👉 registered -->
              <VCol cols="12">
                <AppSelect
                  v-model="registered"
                  :rules="[requiredValidator]"
                  label="Registered"
                  placeholder="2025"
                  :items="getRecentYears(3)"
                />
              </VCol>

              <!-- 👉 rumble -->
              <VCol cols="12">
                <AppTextField
                  v-model="rumble"
                  :rules="[requiredValidator]"
                  label="Class"
                  placeholder="7"
                />
              </VCol>

              <!-- 👉 Payment Category -->
              <VCol cols="12">
                <AppSelect
                  v-model="paymentCategory"
                  :rules="[requiredValidator]"
                  label="Payment Category"
                  placeholder="Select Payment Category"
                  :items="['Regular', 'Yayasan', 'Founder']"
                />
              </VCol>

              <!-- 👉 birthPlace -->
              <VCol cols="12">
                <AppTextField
                  v-model="birthPlace"
                  :rules="[requiredValidator]"
                  label="Birth Place"
                  placeholder="Where your Birth place?"
                />
              </VCol>

              <!-- 👉 birthDate -->
              <VCol cols="12">
                <AppDateTimePicker
                  v-model="birthDate"
                  label="Select Birth Date"
                  placeholder="Select date"
                />
              </VCol>

              <!-- 👉 Submit and Cancel -->
              <VCol cols="12">
                <VBtn
                  type="submit"
                  class="me-3"
                >
                  Submit
                </VBtn>
                <VBtn
                  type="reset"
                  variant="outlined"
                  color="secondary"
                  @click="closeNavigationDrawer"
                >
                  Cancel
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
