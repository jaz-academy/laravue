<script setup>
import ApexChartAreaChart from '@/views/home/academy/ApexChartAreaChart.vue'
import CrmActiveProject from '@/views/home/academy/CrmActiveProject.vue'
import CrmActivityTimeline from '@/views/home/academy/CrmActivityTimeline.vue'
import CrmAnalyticsSales from '@/views/home/academy/CrmAnalyticsSales.vue'
import CrmBrowserStates from '@/views/home/academy/CrmBrowserStates.vue'
import CrmEarningReportsYearlyOverview from '@/views/home/academy/CrmEarningReportsYearlyOverview.vue'
import CrmRecentTransactions from '@/views/home/academy/CrmRecentTransactions.vue'
import CrmSalesAreaCharts from '@/views/home/academy/CrmSalesAreaCharts.vue'
import CrmSessionsBarWithGapCharts from '@/views/home/academy/CrmSessionsBarWithGapCharts.vue'

const simpleStatisticsDemoCards = [
  {
    icon: 'tabler-currency-dollar',
    color: 'error',
    title: 'Total Profit',
    subTitle: 'Last week',
    stat: '1.28k',
    change: '-12.2%',
  },
  {
    icon: 'tabler-chart-bar',
    color: 'info',
    title: 'Total Sales',
    subTitle: 'Last week',
    stat: '$4,673',
    change: '+25.2%',
  },
]
</script>

<template>
  <VRow class="match-height">
    <!-- Area Chart (Kiri) -->
    <VCol
      cols="12"
      md="8"
    >
      <VCard>
        <VCardText>
          <ApexChartAreaChart />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Kartu-Kartu Samping (Kanan, md=4) -->
    <VCol
      cols="12"
      md="4"
    >
      <VRow>
        <!-- Sales & Sessions (2 Card) -->
        <VCol
          cols="12"
          md="6"
        >
          <CrmSalesAreaCharts />
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <CrmSessionsBarWithGapCharts />
        </VCol>

        <!-- Simple Statistics Cards (Loop) -->
        <VCol
          v-for="demo in simpleStatisticsDemoCards"
          :key="demo.title"
          cols="12"
          md="6"
        >
          <VCard>
            <VCardText>
              <VAvatar
                :color="demo.color"
                variant="tonal"
                rounded
                size="42"
              >
                <VIcon :icon="demo.icon" />
              </VAvatar>

              <h5 class="text-h5 mt-4">
                {{ demo.title }}
              </h5>
              <p class="text-sm text-disabled my-1 mb-0">
                {{ demo.subTitle }}
              </p>
              <p class="mb-3">
                {{ demo.stat }}
              </p>
              <VChip
                color="disabled"
                label
              >
                {{ demo.change }}
              </VChip>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VCol>

    <!-- 👉 Earning Reports -->
    <VCol
      cols="12"
      md="8"
    >
      <CrmEarningReportsYearlyOverview />
    </VCol>

    <!-- 👉 Sales -->
    <VCol
      cols="12"
      md="4"
    >
      <CrmAnalyticsSales />
    </VCol>

    <!-- 👉 Browser States -->
    <VCol
      cols="12"
      md="6"
    >
      <CrmBrowserStates />
    </VCol>

    <!-- 👉 Active Project -->
    <VCol
      cols="12"
      md="6"
    >
      <CrmActiveProject />
    </VCol>

    <!-- 👉 Recent Transactions -->
    <VCol
      cols="12"
      md="6"
    >
      <CrmRecentTransactions />
    </VCol>

    <!-- 👉 Active timeline -->
    <VCol
      cols="12"
      md="6"
    >
      <CrmActivityTimeline />
    </VCol>
  </VRow>
</template>
