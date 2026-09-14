<script setup>
import { useApi } from '@/composables/useApi'
import AllocationTable from '@/views/home/finance/AllocationTable.vue'
import ExpenseStatistics from '@/views/home/finance/ExpenseStatistics.vue'
import FinanceHistory from '@/views/home/finance/FinanceHistory.vue'
import NonKitchenOverview from '@/views/home/finance/NonKitchenOverview.vue'
import PaymentDelivery from '@/views/home/finance/PaymentDelivery.vue'
import PaymentPerformance from '@/views/home/finance/PaymentPerformance.vue'
import SaldoCardStatistics from '@/views/home/finance/SaldoCardStatistics.vue'
import { ref } from 'vue'

const currentUser = useCookie('userData')
const nonKitchen = ref([])
const houseHold = ref([])
const students = ref([])
const expenses = ref([])
const outgoings = ref([])
const inputs = ref([])
const payCurrentMonth = ref([])
const payPercentages = ref({ text: [], value: [] })
const allocation = ref([])
const selectedYear = ref('')

async function fetchFinances(year = '') {
  const res = await useApi(`/dashboard-finance?year=${year}`)

  const financeData = res.data.value

  console.log('financeData: ', financeData)
  
  if (!financeData) return

  nonKitchen.value = financeData.nonKitchen || []
  houseHold.value = financeData.houseHold || []
  students.value = financeData.students || []
  expenses.value = financeData.expenses || []
  outgoings.value = financeData.outgoings || []
  inputs.value = financeData.inputs || []
  payCurrentMonth.value = financeData.payCurrentMonth || []

  const deliveryData = financeData.payDelivery || []

  payPercentages.value = {
    // Menggunakan map untuk memisahkan label dan value
    text: deliveryData.map(item => item.billing),
    value: deliveryData.map(item => item.amount > 0 ? Math.round((Number(item.paidAmount) / item.amount) * 100) : 0),
  }

  const finances = financeData.allocation?.finances || []
  const payments = financeData.allocation?.payments || []

  // hitung total dari finance saja
  const totalFinance = finances.reduce((sum, item) => sum + Number(item.amount), 0)

  // bikin set unik dari semua allocation (gabungan dari finances + payments)
  const allKeys = Array.from(new Set([
    ...finances.map(f => f.allocation),
    ...payments.map(p => p.number),
  ]))

  allocation.value = allKeys.map(key => {
    const financeData = finances.find(f => f.allocation === key)
    const paymentData = payments.find(p => p.number === key)

    const financeAmount = Number(financeData?.amount || 0)
    const paymentAmount = Number(paymentData?.amount || 0)

    return {
      ...financeData,
      ...paymentData,
      allocation: paymentData?.description || financeData?.description || '',
      payment: paymentAmount,
      expense: financeAmount,
      balance: paymentAmount - financeAmount,
      percentage: totalFinance > 0 ? (financeAmount / totalFinance) * 100 : 0,
      remain: financeAmount > 0 
        ? 100 - Math.round(((paymentAmount - financeAmount) / financeAmount * 100))
        : 100,
    }
  })
}

const handleYearChange = year => {
  fetchFinances(year)
}

onMounted(() => fetchFinances())
</script>

<template>
  <VRow class="match-height">
    <VCol cols="12">
      <!-- Cards Saldo -->
      <SaldoCardStatistics />
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <!-- Cards Pengeluaran Non Dapur -->
      <NonKitchenOverview :data="nonKitchen" />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- Pembelanjaan -->
      <ExpenseStatistics
        :data="houseHold"
        @year-selected="handleYearChange"
      />
    </VCol>

    <VCol
      v-if="currentUser.admin_teacher_id"
      cols="12"
      md="4"
    >
      <!-- List Pembayaran -->
      <PaymentPerformance
        :payments="payCurrentMonth"
        :students="students"
      />
    </VCol>

    <VCol
      cols="12"
      :md="currentUser.admin_teacher_id ? 4 : 6"
    >
      <!-- Chart Pembayaran -->
      <PaymentDelivery :data="payPercentages" />
    </VCol>

    <VCol
      cols="12"
      :md="currentUser.admin_teacher_id ? 4 : 6"
    >
      <!-- Riwayat Transaksi -->
      <FinanceHistory :data="{ expenses, outgoings, inputs }" />
    </VCol>

    <VCol cols="12">
      <!-- Alokasi -->
      <AllocationTable 
        v-if="currentUser.admin_teacher_id"
        :data="allocation" 
      />
    </VCol>
  </VRow>
</template>
