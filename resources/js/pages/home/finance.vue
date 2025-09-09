<script setup>
import AllocationTable from '@/views/home/finance/AllocationTable.vue'
import ExpenseStatistics from '@/views/home/finance/ExpenseStatistics.vue'
import FinanceHistory from '@/views/home/finance/FinanceHistory.vue'
import NonKitchenOverview from '@/views/home/finance/NonKitchenOverview.vue'
import PaymentDelivery from '@/views/home/finance/PaymentDelivery.vue'
import PaymentPerformance from '@/views/home/finance/PaymentPerformance.vue'
import SaldoCardStatistics from '@/views/home/finance/SaldoCardStatistics.vue'
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
      <NonKitchenOverview />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- Pembelanjaan -->
      <ExpenseStatistics />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <!-- List Pembayaran -->
      <PaymentPerformance />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <!-- Chart Pembayaran -->
      <PaymentDelivery />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <!-- Riwayat Transaksi -->
      <FinanceHistory />
    </VCol>

    <VCol cols="12">
      <!-- Alokasi -->
      <AllocationTable />
    </VCol>
  </VRow>
</template>
