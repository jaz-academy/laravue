<script setup>
const { teacher } = defineProps({
  teacher: Object,
})

const emit = defineEmits(['userData'])
const accountDataLocal = ref({})
const refForm = ref()

watch(
  () => teacher,
  newTeacher => {
    if (newTeacher) {
      accountDataLocal.value = JSON.parse(JSON.stringify(newTeacher))
    }
  },
  { immediate: true },
)

const resetForm = () => {
  accountDataLocal.value = JSON.parse(JSON.stringify(teacher))
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
              <!-- 👉 Status -->
              <VCol cols="12">
                <AppSelect
                  v-model="accountDataLocal.status"
                  :items="['Active', 'On Duty', 'Passive', 'Suspend']"
                  placeholder="Select Status"
                  label="Status"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>

      <!-- 👉 Resignation Data -->
      <VCol
        cols="12"
        md="6"
      >
        <VCard title="Resignation Data">
          <VCardText>
            <p class="mt-n4 mb-6 text-sm">
              Can only be changed by the admin
            </p>
            <VRow>
              <!-- 👉 Resign -->
              <VCol cols="12">
                <AppTextField
                  v-model="accountDataLocal.resign"
                  placeholder="2000"
                  label="Resignation"
                />
              </VCol>
              <!-- 👉 Next Job -->
              <VCol cols="12">
                <AppTextField
                  v-model="accountDataLocal.update_job"
                  placeholder="Oxford University"
                  label="Next Job"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- 👉 Actions Button -->
    <VCol
      cols="12"
      class="d-flex flex-wrap gap-4 mt-4 d-none"
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
