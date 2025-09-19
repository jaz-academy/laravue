<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import { useUserAccess } from '@/@core/utils/helpers'
import { fetchStudentData, students } from '@/composables/fetchStudentData'
import { ref } from 'vue'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { VBtn } from 'vuetify/components/VBtn' // pastikan path benar
import { VForm } from 'vuetify/components/VForm'

const props = defineProps({
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
  admin_student_id: '',
  payment_category: '',
  year: '',
  finance_account_id: '',
  billing: '',
  amount: '',
  note: '',
  admin: currentUser.value?.name || '',
})

const yearOptions = ref([])
const billingOptions = ref([])
const studentRegistered = ref(0)
const isEditSetupComplete = ref(false)

watch(
  () => [props.selectedData, props.mode],
  () => {
    if (props.mode === 'edit' && props.selectedData) {
      isEditSetupComplete.value = false // Mulai proses setup mode edit
      Object.assign(form, {
        admin_student_id: props.selectedData.admin_student_id || 0,
        payment_category: '', // Akan diisi oleh watcher
        year: props.selectedData.year || '',
        finance_account_id: props.selectedData.finance_account_id || 0,
        billing: props.selectedData.billing || '',
        amount: props.selectedData.amount || 0,
        note: props.selectedData.note || '',
        admin: props.selectedData.admin || '',
      })
    } else {
      isEditSetupComplete.value = true // Mode 'add' tidak memerlukan setup khusus
      Object.assign(form, {
        admin_student_id: '',
        payment_category: '',
        year: '',
        finance_account_id: '',
        billing: '',
        amount: '',
        note: '',
        admin: currentUser.value?.name || '',
      })
      yearOptions.value = []
      billingOptions.value = []
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
      yearOptions.value = []
      billingOptions.value = []
    }
  },
)

watch(
  () => form.admin_student_id,
  studentId => {
    if (studentId) {
      const student = students.value.find(s => s.id === studentId)
      if (student) {
        form.payment_category = student.payment_category || 'Not Set'

        const registeredYear = parseInt(student.registered)
        if (!isNaN(registeredYear)) {
          studentRegistered.value = registeredYear
          yearOptions.value = Array.from({ length: 6 }, (_, i) => registeredYear + i)
          if (props.mode !== 'edit' || !form.year) {
            form.year = registeredYear
          }
        }
      }
    } else {
      form.payment_category = ''
      form.year = ''
      form.billing = ''
      yearOptions.value = []
      billingOptions.value = []
    }
  },
)

const fetchBillings = async (year, category) => {
  if (!year || !category || category === 'Not Set') {
    billingOptions.value = []
    
    return
  }
  try {
    const { data } = await useApi(`/billings-by-year/${studentRegistered.value}/${category}`)

    if (data.value?.data) {
      const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"]

      billingOptions.value = data.value.data.flatMap(item => {
        if (item.is_monthly) {
          return months.map((m, i) => {
            const monthYear = i < 6 ? year : Number(year) + 1
            
            return `${item.name} ${m}-${monthYear}`
          })
        }
        if (item.is_once) {
          return `${item.name} ${studentRegistered.value}`
        }
        
        return `${item.name} ${year}`
      })
    } else {
      billingOptions.value = []
    }
  } catch (error) {
    console.error('Failed to fetch billings:', error)
    billingOptions.value = []
  }
}

watch([() => form.year, () => form.payment_category], ([newYear, newCategory]) => {
  // Hanya kosongkan billing jika setup mode edit sudah selesai
  // atau jika ini bukan bagian dari setup awal.
  if (isEditSetupComplete.value) {
    form.billing = ''
  }
  fetchBillings(newYear, newCategory)

  // Tandai bahwa setup awal untuk mode edit telah selesai.
  isEditSetupComplete.value = true
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

const accounts = ref()

const fetchAccounts = async () => {
  const { data, error } = await useApi('/accounts')
  if (error.value)
    console.log(error.value)
  else

    // Filter out accounts where the unit is 'Pembayaran'
    accounts.value = data.value.data.filter(account => account.unit === 'Pembayaran')
}

onMounted(fetchAccounts)
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
      :title="props.mode === 'edit' ? 'Edit Discount' : 'Add New Discount'"
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
                  v-model="form.payment_category"
                  label="Payment Category"
                  placeholder="Auto-filled"
                  readonly
                  disabled
                />
              </VCol>

              <VCol cols="12">
                <AppSelect
                  v-model="form.year"
                  label="Year"
                  placeholder="Tahun Diskon"
                  :items="yearOptions"
                />
              </VCol>

              <VCol cols="12">
                <AppSelect 
                  v-model="form.finance_account_id"
                  :items="accounts"
                  :item-title="item => (item?.number && item?.description) 
                    ? `${item.number} - ${item.description}` 
                    : ''"
                  item-value="id"
                  label="Account"
                />
              </VCol>
              
              <VCol cols="12">
                <AppSelect
                  v-model="form.billing"
                  label="Billing"
                  placeholder="Pilih Tagihan"
                  :items="billingOptions"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="form.amount"
                  label="Amount"
                  placeholder="Jumlah Potongan"
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
