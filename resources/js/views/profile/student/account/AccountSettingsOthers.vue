<script setup>
import { useUserAccess } from '@/@core/utils/helpers'

const { student } = defineProps({
  student: Object,
})

const emit = defineEmits(['userData'])
const { hasRoleAndAccess } = useUserAccess()
const accountDataLocal = ref({})
const refForm = ref()

watch(
  () => student,
  newStudent => {
    if (newStudent) {
      accountDataLocal.value = JSON.parse(JSON.stringify(newStudent))
    }
  },
  { immediate: true },
)

const resetForm = () => {
  accountDataLocal.value = JSON.parse(JSON.stringify(student))
}

const onSubmit = () => {
  if (hasRoleAndAccess(3, 'Profile')) {
    refForm.value?.validate().then(({ valid }) => {
      if (valid) {
        emit('userData', { ...accountDataLocal.value })
      }
    })
  }
}
</script>

<template>
  <VForm 
    ref="refForm"
    @submit.prevent="onSubmit"
  >
    <VRow>
      <!-- 👉 Registration Data -->
      <VCol
        cols="12"
        md="6"
      >
        <VCard title="Registration Data">
          <VCardText>
            <p class="mt-n4 mb-6 text-sm">
              Can only be changed by the admin
            </p>
            <VRow>
              <!-- 👉 Registered -->
              <VCol cols="12">
                <AppTextField
                  v-model="accountDataLocal.registered"
                  placeholder="2000"
                  label="Registered"
                />
              </VCol>
              <!-- 👉 Email -->
              <VCol cols="12">
                <AppTextField
                  v-model="accountDataLocal.email"
                  placeholder="john.doe@example.com"
                  label="Email"
                />
              </VCol>
              <!-- 👉 Instagram -->
              <VCol cols="12">
                <AppTextField
                  v-model="accountDataLocal.instagram"
                  placeholder="@john.doe"
                  label="Instagram"
                />
              </VCol>
              <!-- 👉 Payment -->
              <VCol cols="12">
                <AppTextField
                  v-model="accountDataLocal.payment_category"
                  placeholder="@john.doe"
                  label="Payment"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>

      <!-- 👉 Graduation Data -->
      <VCol
        cols="12"
        md="6"
      >
        <VCard title="Graduation Data">
          <VCardText>
            <p class="mt-n4 mb-6 text-sm">
              Can only be changed by the admin
            </p>
            <VRow>
              <!-- 👉 Graduation -->
              <VCol cols="12">
                <AppTextField
                  v-model="accountDataLocal.graduation"
                  placeholder="2000"
                  label="Graduated"
                />
              </VCol>
              <!-- 👉 Next Place -->
              <VCol cols="12">
                <AppTextField
                  v-model="accountDataLocal.next_school"
                  placeholder="Oxford University"
                  label="Next Place"
                />
              </VCol>
              <!-- 👉 Next Place Address -->
              <VCol cols="12">
                <AppTextField
                  v-model="accountDataLocal.next_school_address"
                  placeholder="United Kingdom"
                  label="Next Place Address"
                />
              </VCol>
              <!-- 👉 Note -->
              <VCol cols="12">
                <AppTextField
                  v-model="accountDataLocal.note"
                  placeholder="-"
                  label="Note"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- 👉 Actions Button -->
    <VCol
      v-if="hasRoleAndAccess(3, 'Profile').value"
      class="d-flex flex-wrap gap-4 mt-4"
      cols="12"
    >
      <VBtn type="submit">
        Save changes
      </VBtn>
      <VBtn
        type="reset"
        color="secondary"
        variant="tonal"
        @click="resetForm"
      >
        Reset
      </VBtn>
    </VCol>
  </Vform>
</template>
