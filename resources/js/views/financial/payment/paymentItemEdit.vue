<script setup>
import AppTextField from '@/@core/components/app-form-elements/AppTextField.vue'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  year: {
    type: [String, Number],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  registered: {
    type: [String, Number],
    required: true,
  },
})

const emit = defineEmits([
  'remove',
  'update:data',
])

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

// Buat salinan lokal dari prop agar tidak mengubahnya secara langsung (menghindari anti-pattern)
const localData = ref(structuredClone(toRaw(props.data)))
let isUpdatingFromProp = false

// Ketika data lokal berubah, emit event ke parent
watch(localData, newValues => {
  if (!isUpdatingFromProp) {
    emit('update:data', newValues)
  }
}, { deep: true })

// Jika prop dari parent berubah (misalnya saat data dari API selesai dimuat), update data lokal
watch(() => props.data, newValues => {
  isUpdatingFromProp = true
  localData.value = structuredClone(toRaw(newValues))
  nextTick(() => {
    isUpdatingFromProp = false
  })
}, { deep: true })

const billingOptions = ref([])

const fetchBillings = async (year, category, registeredYear) => {
  if (!year || !category || category === 'Not Set') {
    billingOptions.value = []
    
    return
  }
  try {
    const { data } = await useApi(`/billings-by-year/${registeredYear}/${category}`)

    if (data.value?.data) {
      const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"]

      billingOptions.value = data.value.data.flatMap(item => {
        if (item.is_monthly) {
          return months.map((m, i) => {
            const monthYear = i < 6 ? year : Number(year) + 1
            const title = `${item.name} ${m}-${monthYear}`
            
            return { title, value: title, amount: item.amount }
          })
        }
        if (item.is_once) {
          const title = `${item.name} ${registeredYear}`
          
          return { title, value: title, amount: item.amount }
        }
        
        const title = `${item.name} ${year}`
        
        return { title, value: title, amount: item.amount }
      })
    } else {
      billingOptions.value = []
    }
  } catch (error) {
    console.error('Failed to fetch billings:', error)
    billingOptions.value = []
  }
}

watch([() => props.year, () => props.category], ([newYear, newCategory]) => {
  localData.value.billing = ''
  localData.value.amount = 0
  fetchBillings(newYear, newCategory, props.registered)
}, { immediate: true })

watch(() => localData.value.billing, selectedBillingName => {
  if (selectedBillingName) {
    const selectedBillingObject = billingOptions.value.find(b => b.value === selectedBillingName)
    if (selectedBillingObject) {
      localData.value.amount = selectedBillingObject.amount
    }
  }
})

const removeItem = () => {
  emit('remove', props.id)
}
</script>

<template>
  <VCard
    flat
    border
    class="d-flex flex-row"
  >
    <!-- 👉 Left Form -->
    <div class="pa-5 flex-grow-1">
      <VRow>
        <VCol
          cols="12"
          sm="5"
        >
          <AppSelect 
            v-model="localData.finance_account_id"
            :items="accounts"
            :item-title="item => `${item?.number || ''} - ${item?.description || ''}`"
            item-value="id"
            label="Account"
          />
        </VCol>
        <VCol
          cols="12"
          sm="4"
        >
          <AppSelect
            v-model="localData.billing"
            label="Description"
            placeholder="Billing Description"
            :items="billingOptions"
            item-title="title"
            item-value="value"
          />
        </VCol>
        <VCol
          cols="12"
          sm="3"
        >
          <AppTextField
            v-model="localData.amount"
            label="Amount"
            placeholder="Amount"
            type="number"
          />
        </VCol>
      </VRow>
    </div>

    <!-- 👉 Item Actions -->
    <div class="d-flex flex-column justify-space-between border-s pa-1">
      <IconBtn @click="removeItem">
        <VIcon
          size="20"
          icon="tabler-x"
        />
      </IconBtn>

      <IconBtn>
        <VIcon
          size="20"
          icon="tabler-settings"
        />
      </IconBtn>
    </div>
  </VCard>
</template>
