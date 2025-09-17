<script setup>
import BillingEditable from '@/views/financial/billing/billingEditable.vue'
import { computed, ref, toRaw } from 'vue'

const route = useRoute('financial-payment-biling-year-category')
const router = useRouter()
const year = computed(() => route.params.year)
const category = computed(() => route.params.category)

// billingData akan menampung semua data untuk halaman ini
const billingData = ref({
  header: {
    year: '',
    category: '',
  },
  billingItem: [], // Array untuk menampung data billing per item
})

// Cek apakah ini halaman untuk edit (serial sudah ada) atau buat baru
if (year.value !== 'new' && category.value !== 'new') {
  // Panggil API yang benar untuk mengambil data finance berdasarkan serial
  const { data: billingResponse } = await useApi(`/billings-by-year/${year.value}/${category.value}`)

  console.log('billingResponse', billingResponse.value)
  
  if (billingResponse.value && billingResponse.value.data.length > 0) {
    const billings = billingResponse.value.data
    
    // Asumsikan data header (kompetensi, semester, dll) sama untuk semua data dalam satu serial
    const firstBilling = billings[0]
    
    billingData.value.header = {
      year: firstBilling.year,
      category: firstBilling.category,
    }
    billingData.value.billingItem = billings
  }
}

// Fungsi untuk menambah item/siswa baru ke dalam form
const addItem = () => {
  billingData.value?.billingItem.push({
    finance_account_id: '',
    name: '',
    amount: 0,
    is_once: 0,
    is_monthly: 0,
  })
}

const removeItem = id => {
  billingData.value?.billingItem.splice(id, 1)
}

const isAlertVisible = ref(false)
const alertMessage = ref('')
const alertColor = ref('primary')

const showAlert = (message, color = 'primary') => {
  alertMessage.value = message
  alertColor.value = color
  isAlertVisible.value = true
  setTimeout(() => {
    isAlertVisible.value = false
  }, 10000)
}

const isFormValid = computed(() => {
  const { header, billingItem } = billingData.value

  // Periksa apakah field di header sudah terisi
  if (!header.year || !header.category) {
    return false
  }

  // Periksa setiap item dalam billingItem
  // Daftar item yang kosong dianggap valid (akan menghapus tagihan yang ada untuk tahun/kategori tsb)
  for (const item of billingItem) {
    if (!item.finance_account_id || !item.name || item.amount === '') {
      return false
    }
  }

  return true
})

const isLoading = ref(false)

const saveItem = async () => {
  isLoading.value = true

  // 1. Siapkan payload dari data lokal.
  const payload = toRaw(billingData.value)

  // Tambahkan invoice number jika ini adalah data yang sudah ada.
  // Jika 'new', biarkan backend yang membuat invoice number baru.
  if (year.value !== 'new' || category.value !== 'new') {
    payload.header.year = year.value
    payload.header.category = category.value
  }

  try {
    // 2. Panggil API backend untuk menyimpan/memperbarui data.
    console.log('payload', payload)
    
    const { data: response, error } = await useApi('/billings/bulk-store', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })

    if (error.value) {
      // Tangani error validasi 422 dari Laravel
      if (error.value.data?.errors) {
        const validationErrors = error.value.data.errors
        const firstErrorKey = Object.keys(validationErrors)[0]
        const firstErrorMessage = validationErrors[firstErrorKey][0]

        showAlert(`Save failed: ${firstErrorMessage}`, 'error')
      } else if (error.value.data?.message) {
        showAlert(`An error occurred: ${error.value.data.message}`, 'error')
      } else {
        // Fallback untuk error lainnya
        showAlert('An unknown error occurred while saving. Please check the console.', 'error')
      }
      console.error('Error saving finance:', error.value)
    } else {
      // 3. Jika berhasil, arahkan ke halaman edit dengan invoice number yang baru/diperbarui.
      router.push(`/financial/payment/billing/${response.value.data.year}/${response.value.data.category}`)
      showAlert('Data berhasil disimpan!', 'success')
    }
  } finally {
    isLoading.value = false
  }
}

const totalAmount = computed(() => {
  return billingData.value.billingItem.reduce((total, item) => {
    return total + (Number(item.amount) || 0)
  }, 0)
})
</script>

<template>
  <VRow>
    <!-- 👉 InvoiceEditable -->
    <VCol
      cols="12"
      md="12"
    >
      <VAlert
        v-model="isAlertVisible"
        closable
        class="mb-6"
        :color="alertColor"
      >
        {{ alertMessage }}
      </VAlert>
      <VRow>
        <VCol
          cols="12"
          md="9"
        >
          <BillingEditable
            v-if="billingData"
            v-model:data="billingData"
            @push="addItem"
            @remove="removeItem"
          />
        </VCol>
        <VCol
          cols="12"
          md="3"
        >
          <VCard class="mb-8">
            <VCardText>
              <VBtn
                :loading="isLoading"
                :disabled="!isFormValid"
                block
                class="mb-2"
                color="success"
                @click="saveItem"
              >
                Save Billing
              </VBtn>
              <VBtn
                block
                color="secondary"
                variant="tonal"
                :to="{ name: 'financial-payment-billing' }"
              >
                Exit
              </VBtn>
            </VCardText>
          </VCard>
          <VCard>
            <VCardText>
              <div class="text-high-emphasis">
                Total
              </div>
              <div class="text-center text-h4 font-weight-medium my-2">
                {{ Number(totalAmount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
              </div>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
