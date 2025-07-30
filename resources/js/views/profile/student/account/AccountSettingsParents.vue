<script setup>
import BillingHistoryTable from './BillingHistoryTable.vue'

const { student } = defineProps({
  student: Object,
})

const emit = defineEmits(['userData'])
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

const refInputEl = ref()
const isConfirmDialogOpen = ref(false)

const resetForm = () => {
  accountDataLocal.value = JSON.parse(JSON.stringify(student))
}

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      console.log('SUBMIT PAYLOAD', accountDataLocal.value)
      emit('userData', { ...accountDataLocal.value })
    }
  })
}
</script>

<template>
  <VRow>
    <!-- 👉 Parents -->
    <VCol cols="12">
      <VCard title="Parents Data">
        <VCardText>
          <VForm 
            ref="refForm"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- 👉 Father Name -->
              <VCol
                md="4"
                cols="12"
              >
                <AppTextField
                  v-model="accountDataLocal.father"
                  placeholder="John Doe"
                  label="Father Name"
                />
              </VCol>

              <!-- 👉 Father Birth -->
              <VCol
                md="4"
                cols="12"
              >
                <AppDateTimePicker
                  v-model="accountDataLocal.father_birth"
                  placeholder="1980-01-01"
                  label="Birth Date"
                />
              </VCol>

              <!-- 👉 father_note -->
              <VCol
                cols="12"
                md="4"
              >
                <AppSelect
                  v-model="accountDataLocal.father_note"
                  label="Note"
                  :items="['Masih ada', 'Meninggal', 'Cerai', 'Lainnya']"
                  placeholder="Select Note"
                />
              </VCol>
              
              <!-- 👉 Mother Name -->
              <VCol
                md="4"
                cols="12"
              >
                <AppTextField
                  v-model="accountDataLocal.mother"
                  placeholder="Maemunah"
                  label="Mother Name"
                />
              </VCol>

              <!-- 👉 mother Birth -->
              <VCol
                md="4"
                cols="12"
              >
                <AppDateTimePicker
                  v-model="accountDataLocal.mother_birth"
                  placeholder="1980-01-01"
                  label="Birth Date"
                />
              </VCol>

              <!-- 👉 mother_note -->
              <VCol
                cols="12"
                md="4"
              >
                <AppSelect
                  v-model="accountDataLocal.mother_note"
                  label="Note"
                  :items="['Masih ada', 'Meninggal', 'Cerai', 'Lainnya']"
                  placeholder="Select Note"
                />
              </VCol>

              <!-- 👉 Phone -->
              <VCol
                md="4"
                cols="12"
              >
                <AppTextField
                  v-model="accountDataLocal.phone"
                  placeholder="+62 888 1234 5678"
                  label="Phone Number"
                />
              </VCol>

              <!-- 👉 Job -->
              <VCol
                md="4"
                cols="12"
              >
                <AppTextField
                  v-model="accountDataLocal.job"
                  placeholder="Software Engineer"
                  label="Job Title"
                />
              </VCol>

              <!-- 👉 income -->
              <VCol
                cols="12"
                md="4"
              >
                <AppSelect
                  v-model="accountDataLocal.income"
                  label="Income"
                  :items="['< 5 juta', '5 - 10 juta', '10 - 20 juta', '20 juta >']"
                  placeholder="Select Income"
                />
              </VCol>

              <!-- 👉 Actions Button -->
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4 mt-4"
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
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Billing History -->
    <VCol cols="12">
      <BillingHistoryTable />
    </VCol>
  </VRow>
</template>

<style lang="scss">
.pricing-dialog {
  .pricing-title {
    font-size: 1.5rem !important;
  }

  .v-card {
    border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    box-shadow: none;
  }
}
</style>
