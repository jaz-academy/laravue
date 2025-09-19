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

const nonKitchen = ref([])
const houseHold = ref([])
const students = ref([])
const expenses = ref([])
const outgoings = ref([])
const inputs = ref([])
const payCurrentMonth = ref([])
const payPercentages = ref({ text: [], value: [] })
const allocation = ref([])

async function fetchFinances() {
  const res = await useApi('/dashboard-finance')

  const financeData = res.data.value
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

  const totalFinance = finances.reduce((sum, item) => sum + Number(item.amount), 0)

  allocation.value = finances.map(item => {
    const paymentData = payments.find(p => p.number === item.allocation)
    const paymentAmount = Number(paymentData?.amount || 0)
    const itemAmount = Number(item.amount)

    return {
      ...item,
      payment: paymentAmount,
      allocation: paymentData?.description || '',
      balance: paymentAmount - itemAmount,
      percentage: totalFinance > 0 ? (itemAmount / totalFinance) * 100 : 0,
      remain: 100 - Math.round(((paymentAmount - itemAmount) / itemAmount * 100)),
    }
  })
}

onMounted(fetchFinances)
console.log('allocation: ', allocation.value)
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
      <ExpenseStatistics :data="houseHold" />
    </VCol>

    <VCol
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
      md="4"
    >
      <!-- Chart Pembayaran -->
      <PaymentDelivery :data="payPercentages" />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <!-- Riwayat Transaksi -->
      <FinanceHistory :data="{ expenses, outgoings, inputs }" />
    </VCol>

    <VCol cols="12">
      <!-- Alokasi -->
      <AllocationTable :data="allocation" />
    </VCol>
  </VRow>
</template>
