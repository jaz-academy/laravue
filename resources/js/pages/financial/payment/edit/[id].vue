<script setup>
import PaymentEditable from '@/views/financial/payment/paymentEditable.vue'
import { toRaw } from 'vue'

const route = useRoute('financial-payment-edit-id')
const router = useRouter()
const invoiceNumber = computed(() => route.params.id)

// paymentData akan menampung semua data untuk halaman ini
const paymentData = ref({
  header: {
    invoice: '',
    date: '',
    period: '',
    admin_student_id: '',
  },
  paymentItem: [], // Array untuk menampung data finance per siswa
})

// Cek apakah ini halaman untuk edit (serial sudah ada) atau buat baru
if (invoiceNumber.value && invoiceNumber.value !== 'new') {
  // Panggil API yang benar untuk mengambil data finance berdasarkan serial
  const { data: paymentsResponse } = await useApi(`/payments-by-invoice/${invoiceNumber.value}`)

  console.log('Raw invoiceData from API:', paymentsResponse.value)

  if (paymentsResponse.value && paymentsResponse.value.data.length > 0) {
    const payments = paymentsResponse.value.data
    
    // Asumsikan data header (kompetensi, semester, dll) sama untuk semua data dalam satu serial
    const firstPayment = payments[0]
    
    paymentData.value.header = {
      invoice: firstPayment.invoice,
      date: firstPayment.date,
      period: firstPayment.period,
      admin_student_id: firstPayment.admin_student_id,
    }
    paymentData.value.paymentItem = payments
  }
}

// Fungsi untuk menambah item/siswa baru ke dalam form
const addItem = () => {
  paymentData.value?.paymentItem.push({
    finance_account_id: '',
    billing: '',
    amount: 0,
  })
}

const removeItem = id => {
  paymentData.value?.paymentItem.splice(id, 1)
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
  const header = paymentData.value.header
  if (!header.date || !header.period || !header.admin_student_id)
    return false

  // Jika ada item, setiap item harus valid.
  if (paymentData.value?.paymentItem.length > 0) {
    for (const payment of paymentData.value.paymentItem) {
      // Setiap baris harus memiliki jumlah. Deskripsi bisa kosong.
      if (!payment.amount)
        return false
    }
  }

  return true
})

const isLoading = ref(false)

const savePayment = async () => {
  isLoading.value = true

  // 1. Siapkan payload dari data lokal.
  const payload = toRaw(paymentData.value)

  // Tambahkan invoice number jika ini adalah data yang sudah ada.
  // Jika 'new', biarkan backend yang membuat invoice number baru.
  if (invoiceNumber.value !== 'new') {
    payload.header.invoice = invoiceNumber.value
  }

  try {
    // 2. Panggil API backend untuk menyimpan/memperbarui data.
    const { data: response, error } = await useApi('/payments/bulk-store', {
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
      console.error('Error saving payment:', error.value)
    } else {
      // 3. Jika berhasil, arahkan ke halaman edit dengan invoice number yang baru/diperbarui.
      router.push(`/financial/payment/edit/${response.value.data.invoice}`)
      showAlert('Data berhasil disimpan!', 'success')
    }
  } finally {
    isLoading.value = false
  }
}

const totalAmount = computed(() => {
  return paymentData.value.paymentItem.reduce((total, item) => {
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
          <PaymentEditable
            v-if="paymentData"
            v-model:data="paymentData"
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
                @click="savePayment"
              >
                Save payment
              </VBtn>
              <VBtn
                block
                color="secondary"
                variant="tonal"
                class="mb-2"
                :disabled="route.params.id === 'new'"
                :to="{ name: 'financial-payment-preview-id', params: { id: route.params.id } }"
              >
                Preview
              </VBtn>
              <VBtn
                block
                color="secondary"
                variant="tonal"
                :to="{ name: 'financial-payment-list' }"
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
