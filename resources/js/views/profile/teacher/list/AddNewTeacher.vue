<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import AppTextField from '@/@core/components/app-form-elements/AppTextField.vue'
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
const nig = ref('')
const name = ref('')
const nickname = ref('')
const gender = ref('')
const registered = ref(currentYear)
const grade = ref('7')
const phone = ref('')
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
        nig: nig.value,
        name: name.value,
        nickname: nickname.value,
        gender: gender.value,
        grade: grade.value,
        registered: registered.value,
        phone: phone.value,
        birth_date: birthDate.value,
        birth_place: birthPlace.value,
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
      title="Add New Teacher"
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
              <!-- 👉 nig -->
              <VCol cols="12">
                <AppTextField
                  v-model="nig"
                  :rules="[requiredValidator]"
                  label="NIG"
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

              <!-- 👉 grade -->
              <VCol cols="12">
                <AppSelect
                  v-model="grade"
                  :rules="[requiredValidator]"
                  label="Grade"
                  placeholder="1"
                  :items="['1', '2', '3', '4', '5', '6', '7']"
                />
              </VCol>

              <!-- 👉 Phone Number -->
              <VCol cols="12">
                <AppTextField
                  v-model="phone"
                  :rules="[requiredValidator]"
                  label="Phone Number"
                  placeholder="+62 888 1234 5678"
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
