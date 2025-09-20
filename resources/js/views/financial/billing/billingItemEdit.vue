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

// Watch for changes in the selected account to auto-fill the description
watch(() => localData.value.finance_account_id, (newId, oldId) => {
  // Only update if the ID has changed, or if the name is empty.
  // This prevents overwriting a manually edited name.
  if (newId && (newId !== oldId || !localData.value.name)) {
    const selectedAccount = accounts.value?.find(acc => acc.id === newId)
    if (selectedAccount)
      localData.value.name = selectedAccount.description
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
          sm="3"
        >
          <AppSelect 
            v-model="localData.finance_account_id"
            :items="accounts"
            item-title="number"
            item-value="id"
            label="Account"
          />
        </VCol>
        <VCol
          cols="12"
          sm="3"
        >
          <AppTextField
            v-model="localData.name"
            label="Description"
            placeholder="Billing"
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
          />
        </VCol>

        <VCol
          cols="12"
          sm="3"
        >
          <VRow>
            <VCol cols="6">
              <small>Once</small>
              <VSwitch
                v-model="localData.is_once"
                :inset="false"
                :true-value="1"
                :false-value="0"
              />
            </VCol>
            <VCol cols="6">
              <small>Month</small>
              <VSwitch
                v-model="localData.is_monthly"
                :inset="false"
                :true-value="1"
                :false-value="0"
              />
            </VCol>
          </VRow>
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
