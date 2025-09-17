<script setup>
import AppDateTimePicker from '@/@core/components/app-form-elements/AppDateTimePicker.vue'
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import { useUserAccess } from '@/@core/utils/helpers'
import { fetchStudentData, students } from '@/composables/fetchStudentData'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { VBtn } from 'vuetify/components/VBtn' // pastikan path benar
import { VForm } from 'vuetify/components/VForm'

const props = defineProps({
  getSaldo: { type: Function, required: true },
  isDrawerOpen: { type: Boolean, required: true },
  mode: { type: String, default: 'add' },
  selectedData: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['update:isDrawerOpen', 'selectedData'])
const currentUser = useCookie('userData')

const refVForm = ref()
const isFormValid = ref(false)
const { hasRole } = useUserAccess()

const form = reactive({
  invoice: '',
  date: '',
  admin_student_id: '',
  credit: '',
  debit: '',
  note: '',
  admin: '',
})

watch(
  () => [props.selectedData, props.mode],
  () => {
    if (props.mode === 'edit' && props.selectedData) {
      Object.assign(form, {
        invoice: props.selectedData.invoice || '',
        date: props.selectedData.date || '',
        admin_student_id: props.selectedData.admin_student_id || '',
        credit: props.selectedData.credit || 0,
        debit: props.selectedData.debit || 0,
        note: props.selectedData.note || '',
        admin: props.selectedData.admin || '',
      })
    } else {
      Object.assign(form, {
        invoice: 'SV-0000',
        date: '',
        admin_student_id: '',
        credit: '',
        debit: '',
        note: '',
        admin: currentUser.value?.name || '',
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

    const payload = { 
      ...form,
      credit: Number(form.credit) || 0,
      debit: Number(form.debit) || 0,
    }

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

onMounted(fetchStudentData)
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
      :title="props.mode === 'edit' ? 'Edit Saving' : 'Add New Saving'"
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
                <AppDateTimePicker
                  v-model="form.date"
                  label="Date"
                  :rules="[requiredValidator]"
                />
              </VCol>
              
              <VCol cols="12">
                <AppSelect
                  v-model="form.admin_student_id"
                  label="Student"
                  :rules="[requiredValidator]"
                  :items="students"
                  item-title="nickname"
                  item-value="id"
                  placeholder="Choose Student"
                />
              </VCol>
              
              <VCol cols="12">
                <AppTextField
                  v-model="getSaldo(form.admin_student_id).saldo"
                  placeholder="Saldo"
                  readonly
                  disabled
                />
              </VCol>
              
              <VCol cols="12">
                <AppTextField
                  v-model="form.credit"
                  label="Deposit"
                  placeholder="Menabung"
                  type="number"
                />
              </VCol>
              
              <VCol cols="12">
                <AppTextField
                  v-model="form.debit"
                  label="Withdraw"
                  placeholder="Mengambil"
                  type="number"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="form.note"
                  label="Note"
                  placeholder="Catatan"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="form.admin"
                  label="Admin"
                  placeholder="Admin"
                  readonly
                  disabled
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
