<script setup>
import FinanceEditable from '@/views/financial/finance/financeEditable.vue'
import { toRaw } from 'vue'

const route = useRoute('financial-finance-edit-id')
const router = useRouter()
const invoiceNumber = computed(() => route.params.id)

// financeData akan menampung semua data untuk halaman ini
const financeData = ref({
  header: {
    invoice: '',
    date: '',
    vendor: '',
    finance_account_id: null,
    remark: '',
  },
  financeItem: [], // Array untuk menampung data finance per siswa
})

// Cek apakah ini halaman untuk edit (serial sudah ada) atau buat baru
if (invoiceNumber.value && invoiceNumber.value !== 'new') {
  // Panggil API yang benar untuk mengambil data finance berdasarkan serial
  const { data: financesResponse } = await useApi(`/finances-by-invoice/${invoiceNumber.value}`)

  if (financesResponse.value && financesResponse.value.data.length > 0) {
    const finances = financesResponse.value.data
    
    // Asumsikan data header (kompetensi, semester, dll) sama untuk semua data dalam satu serial
    const firstFinance = finances[0]
    
    financeData.value.header = {
      invoice: firstFinance.invoice,
      date: firstFinance.date,
      vendor: firstFinance.vendor,
      finance_account_id: firstFinance.finance_account_id,
      remark: firstFinance.remark,
    }
    financeData.value.financeItem = finances
  }
}

// Fungsi untuk menambah item/siswa baru ke dalam form
const addItem = () => {
  financeData.value?.financeItem.push({
    description: '',
    amount: 0,
  })
}

const removeItem = id => {
  financeData.value?.financeItem.splice(id, 1)
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
  const header = financeData.value.header
  if (!header.date || !header.vendor || !header.finance_account_id || !header.remark)
    return false

  // Jika ada item, setiap item harus valid.
  if (financeData.value.financeItem.length > 0) {
    for (const finance of financeData.value.financeItem) {
      // Setiap baris harus memiliki jumlah. Deskripsi bisa kosong.
      if (!finance.amount)
        return false
    }
  }

  return true
})

const isLoading = ref(false)

const saveFinance = async () => {
  isLoading.value = true

  // 1. Siapkan payload dari data lokal.
  const payload = toRaw(financeData.value)

  // Tambahkan invoice number jika ini adalah data yang sudah ada.
  // Jika 'new', biarkan backend yang membuat invoice number baru.
  if (invoiceNumber.value !== 'new') {
    payload.header.invoice = invoiceNumber.value
  }

  try {
    // 2. Panggil API backend untuk menyimpan/memperbarui data.
    const { data: response, error } = await useApi('/finances/bulk-store', {
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
      router.push(`/financial/finance/edit/${response.value.data.invoice}`)
      showAlert('Data berhasil disimpan!', 'success')
    }
  } finally {
    isLoading.value = false
  }
}

const totalAmount = computed(() => {
  return financeData.value.financeItem.reduce((total, item) => {
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
          <FinanceEditable
            v-if="financeData"
            v-model:data="financeData"
            :invoice-number="invoiceNumber"
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
                @click="saveFinance"
              >
                Save Finance
              </VBtn>
              <VBtn
                block
                color="secondary"
                variant="tonal"
                class="mb-2"
                :disabled="route.params.id === 'new'"
                :to="{ name: 'financial-finance-preview-id', params: { id: route.params.id } }"
              >
                Preview
              </VBtn>
              <VBtn
                block
                color="secondary"
                variant="tonal"
                :to="{ name: 'financial-finance' }"
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
