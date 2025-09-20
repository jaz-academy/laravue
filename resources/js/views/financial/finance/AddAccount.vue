<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import { useUserAccess } from '@/@core/utils/helpers'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { VBtn } from 'vuetify/components/VBtn' // pastikan path benar
import { VForm } from 'vuetify/components/VForm'

const props = defineProps({
  isDrawerOpen: { type: Boolean, required: true },
  mode: { type: String, default: 'add' },
  selectedData: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['update:isDrawerOpen', 'selectedData'])

const accounts = ref()
const refVForm = ref()
const isFormValid = ref(false)
const { hasRole } = useUserAccess()

const form = reactive({
  number: '',
  unit: '',
  description: '',
  detail: '',
  allocation: '',
})

const fetchAccounts = async () => {
  const { data } = await useApi('/accounts')

  accounts.value = data.value.data.map(a => ({
    number: a.number || '-',
    description: a.description || '-',
    allocation: a.allocation,
  }))
}

onMounted(fetchAccounts)

watch(
  () => [props.selectedData, props.mode],
  () => {
    if (props.mode === 'edit' && props.selectedData) {
      Object.assign(form, {
        number: props.selectedData.number || '',
        unit: props.selectedData.unit || '',
        description: props.selectedData.description || '',
        detail: props.selectedData.detail || '',
        allocation: props.selectedData.allocation || '',
      })
    } else {
      Object.assign(form, {
        number: '',
        unit: '',
        description: '',
        detail: '',
        allocation: '',
      })
    }
  },
  { immediate: true },
)

watch(
  () => props.isDrawerOpen,
  open => {
    if (!open) {
      refVForm.value?.reset()
      refVForm.value?.resetValidation()
    }
  },
)

const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}

const resetForm = () => {
  refVForm.value?.reset()
  refVForm.value?.resetValidation()
}

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (!valid) return

    const payload = { ...form }
    if (props.mode === 'edit') {
      payload.id = props.selectedData.id
      emit('selectedData', { action: 'update', data: payload })
    } else {
      emit('selectedData', { action: 'create', data: payload })
    }

    emit('update:isDrawerOpen', false)
    nextTick(resetForm)
  })
}
</script>

<template>
  <VNavigationDrawer
    :model-value="props.isDrawerOpen"
    temporary
    location="end"
    width="370"
    class="category-navigation-drawer scrollable-content"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <AppDrawerHeaderSection
      :title="props.mode === 'edit' ? 'Edit Account' : 'Add New Account'"
      @cancel="$emit('update:isDrawerOpen', false)"
    />

    <VDivider />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <VForm
            ref="refVForm"
            v-model="isFormValid"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <VCol cols="12">
                <AppTextField
                  v-model="form.number"
                  label="Number"
                  :rules="[requiredValidator]"
                  placeholder="Account Number"
                />
              </VCol>
              
              <VCol cols="12">
                <AppSelect
                  v-model="form.unit"
                  label="Account Unit"
                  :rules="[requiredValidator]"
                  :items="['Pemasukan', 'Pengeluaran', 'Pembayaran', 'Lain-lain']"
                  placeholder="Choose Account Unit"
                />
              </VCol>
              
              <VCol cols="12">
                <AppTextField
                  v-model="form.description"
                  label="Description"
                  :rules="[requiredValidator]"
                  placeholder="Description"
                />
              </VCol>
              
              <VCol cols="12">
                <AppTextField
                  v-model="form.detail"
                  label="Detail"
                  placeholder="Detail"
                />
              </VCol>
              
              <VCol cols="12">
                <AppSelect
                  v-model="form.allocation"
                  label="Allocation"
                  placeholder="Allocation"
                  :items="accounts"
                  :item-title="item => (item?.number && item?.description) 
                    ? `${item.number} - ${item.description}` 
                    : ''"
                  :item-value="item => item.number"
                />
              </VCol>

              <VCol
                v-if="hasRole(4).value"
                cols="12"
              >
                <div class="d-flex justify-start">
                  <VBtn
                    type="submit"
                    color="primary"
                    class="me-4"
                  >
                    {{ props.mode === 'edit' ? 'Update' : 'Add' }}
                  </VBtn>
                  <VBtn
                    color="error"
                    variant="tonal"
                    @click="resetForm"
                  >
                    Discard
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
