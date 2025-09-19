<script setup>
import AppDateTimePicker from '@/@core/components/app-form-elements/AppDateTimePicker.vue'
import AppTextField from '@/@core/components/app-form-elements/AppTextField.vue'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { nextTick, ref, toRaw, watch } from 'vue'
import FinanceItemEdit from './financeItemEdit.vue'

const props = defineProps({
  invoiceNumber: String,
  data: {
    type: null,
    required: true,
  },
})

const emit = defineEmits([
  'push',
  'remove',
  'update:data',
])

// 👉 Create a local ref to avoid mutating props directly
const localData = ref(structuredClone(toRaw(props.data)))
let isUpdatingFromProp = false

// 👉 Watch for changes in localData and emit them to the parent
watch(localData, newValues => {
  if (!isUpdatingFromProp) {
    emit('update:data', newValues)
  }
}, { deep: true })

// 👉 Watch for changes in the prop from the parent and update the local ref
watch(() => props.data, newValues => {
  isUpdatingFromProp = true
  localData.value = structuredClone(toRaw(newValues))
  nextTick(() => {
    isUpdatingFromProp = false
  })
}, { deep: true })

const updateFinance = (index, newFinance) => {
  localData.value.financeItem[index] = newFinance
}

const school = ref([])
const accounts = ref([])

const fetchSchool = async () => {
  const { data, error } = await useApi('/schools')
  if (error.value)
    console.log(error.value)
  else
    school.value = data.value
}

const fetchAccounts = async () => {
  const { data, error } = await useApi('/accounts')
  if (error.value)
    console.log(error.value)
  else

    // Filter out accounts where the unit is 'Pembayaran'
    accounts.value = data.value.data.filter(account => account.unit !== 'Pembayaran')
}

onMounted(() => {
  fetchAccounts()
  fetchSchool()
})

watch(() => localData.value.header.finance_account_id, (accountId, oldAccountId) => {
  // Hanya jalankan jika accountId benar-benar berubah atau jika remark kosong
  if (accountId === oldAccountId && localData.value.header.remark) {
    return
  }

  if (accountId) {
    const account = accounts.value.find(a => a.id === accountId)
    if (account)
      localData.value.header.remark = account.description
  }
})

// 👉 Add item function
const addItem = () => {
  emit('push')
}

const removeItem = id => {
  emit('remove', id)
}
</script>

<template>
  <VCard>
    <!-- SECTION Header -->

    <VCardText class="d-flex flex-wrap justify-space-between gap-y-5 flex-column flex-sm-row">
      <!-- 👉 Left Content -->
      <div
        v-if="school?.data?.length"
        class="ma-sm-4"
      >
        <div class="d-flex align-center mb-6">
          <!-- 👉 Logo -->
          <VNodeRenderer
            :nodes="themeConfig.app.logo"
            class="me-3"
          />

          <!-- 👉 Title -->
          <h6 class="font-weight-bold text-capitalize text-h4">
            {{ themeConfig.app.title }}
          </h6>
        </div>

        <!-- 👉 Address -->
        <p class="mb-0">
          {{ school.data[0].name }} ✪ <strong>{{ school.data[0].organization }}</strong>
        </p>
        <p class="my-2">
          {{ school.data[0].address }}
        </p>
        <p class="mb-0">
          <VIcon
            icon="tabler-phone"
            class="me-2"
          />
          {{ school.data[0].phone }}
          
          <VIcon
            icon="tabler-mail"
            class="mx-2"
          />
          {{ school.data[0].email }}
        </p>
      </div>

      <!-- 👉 Right Content -->
      <div class="mt-4 ma-sm-4">
        <!-- 👉 Invoice Id -->
        <h6 class="d-flex align-center font-weight-medium justify-sm-end text-xl mb-3">
          <span>
            <AppTextField
              :model-value="props.invoiceNumber"
              disabled
              prefix="#"
              density="compact"
              style="inline-size: 9.5rem;"
            />
          </span>
        </h6>
      </div>
    </VCardText>
    <!-- !SECTION -->

    <VDivider />

    <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row">
      <VRow>
        <VCol
          cols="12"
          sm="6"
          md="3"
        >
          <AppDateTimePicker
            v-model="localData.header.date"
            label="Date"
            density="compact"
          />
        </VCol>
        <VCol
          cols="12"
          sm="6"
          md="3"
        >
          <AppTextField
            v-model="localData.header.vendor"
            label="Vendor"
            density="compact"
          />
        </VCol>
        <VCol
          cols="12"
          sm="6"
          md="3"
        >
          <AppSelect
            v-model="localData.header.finance_account_id"
            :items="accounts"
            item-title="number"
            item-value="id"
            label="Account"
          />
        </VCol>
        <VCol
          cols="12"
          sm="6"
          md="3"
        >
          <AppTextField
            v-model="localData.header.remark"
            label="Remark"
            density="compact"
          />
        </VCol>
      </VRow>
    </VCardText>

    <VDivider />

    <!-- 👉 Add finance item -->
    <VCardText class="add-products-form">
      <div
        v-for="(finance, index) in localData.financeItem"
        :key="index"
        class="my-4 ma-sm-4"
      >
        <FinanceItemEdit
          :id="index"
          :data="finance"
          @update:data="newFinance => updateFinance(index, newFinance)"
          @remove="removeItem"
        />
      </div>
      
      <div class="mt-6 ms-sm-4">
        <VBtn @click="addItem">
          Add Item
        </VBtn>
      </div>
    </VCardText>

    <VDivider />
  </VCard>
</template>
