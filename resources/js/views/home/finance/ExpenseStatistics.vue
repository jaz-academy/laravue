<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['year-selected'])

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const selectedYear = ref('All')

watch(selectedYear, newYear => {
  // Jika 'All' dipilih, kirim string kosong agar tidak ada filter tahun di API
  // Jika tahun spesifik dipilih, kirim tahun tersebut.
  const yearToFilter = newYear === 'All' ? '' : newYear

  emit('yearSelected', yearToFilter)
})

const years = computed(() => {
  const startYear = 2023
  const endYear = new Date().getFullYear()
  const yearList = []
  for (let i = endYear; i >= startYear; i--) {
    yearList.push(i)
  }
  
  return yearList
})

const chartData = computed(() => {
  const bulan = []
  const official = []
  const non_official = []

  props.data.forEach(item => {
    const [year, month] = item.month.split('-')

    bulan.push(`${monthNames[parseInt(month) - 1]}-${year}`)
    bulan.push(`${monthNames[parseInt(month) - 1]}`)
    official.push(Number(item.official))
    non_official.push(Number(item.non_official))
  })

  return { bulan, official, non_official }
})

const chartColors = {
  line: {
    series1: '#FFB400',
    series2: '#9055FD',
    series3: '#7367f029',
  },
}

const headingColor = 'rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity))'
const labelColor = 'rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity))'
const borderColor = 'rgba(var(--v-border-color), var(--v-border-opacity))'

const series = computed(() => ([
  {
    name: 'Kitchen',
    type: 'column',
    data: chartData.value.official,
  },
  {
    name: 'Household',
    type: 'line',
    data: chartData.value.non_official,
  },
]))

const shipmentConfig = computed(() => ({
  chart: {
    type: 'line',
    stacked: false,
    parentHeightOffset: 0,
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  markers: {
    size: 5,
    colors: '#fff',
    strokeColors: chartColors.line.series2,
    hover: { size: 6 },
    borderRadius: 4,
  },
  stroke: {
    curve: 'smooth',
    width: [
      0,
      3,
    ],
    lineCap: 'round',
  },
  legend: {
    show: true,
    position: 'bottom',
    markers: {
      width: 8,
      height: 8,
      offsetX: -3,
    },
    height: 40,
    itemMargin: {
      horizontal: 10,
      vertical: 0,
    },
    fontSize: '15px',
    fontFamily: 'Open Sans',
    fontWeight: 400,
    labels: {
      colors: headingColor,
      useSeriesColors: !1,
    },
    offsetY: 10,
  },
  grid: {
    strokeDashArray: 8,
    borderColor,
  },
  colors: [
    chartColors.line.series1,
    chartColors.line.series2,
  ],
  fill: {
    opacity: [
      1,
      1,
    ],
  },
  plotOptions: {
    bar: {
      columnWidth: '30%',
      startingShape: 'rounded',
      endingShape: 'rounded',
      borderRadius: 4,
    },
  },
  dataLabels: { enabled: false },
  xaxis: {
    tickAmount: 10,
    categories: chartData.value.bulan,
    labels: {
      style: {
        colors: labelColor,
        fontSize: '13px',
        fontWeight: 400,
      },
    },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    tickAmount: 4,
    labels: {
      style: {
        colors: labelColor,
        fontSize: '13px',
        fontWeight: 400,
      },
      formatter(val) {
        if (val >= 1000000) {
          return `${(val / 1000000).toFixed(0)} jt`
        }
        
        return val?.toLocaleString('id-ID') || 0
      },
    },
  },
  responsive: [
    {
      breakpoint: 1400,
      options: {
        chart: { height: 320 },
        xaxis: { labels: { style: { fontSize: '10px' } } },
        legend: {
          itemMargin: {
            vertical: 0,
            horizontal: 10,
          },
          fontSize: '13px',
          offsetY: 12,
        },
      },
    },
    {
      breakpoint: 1025,
      options: {
        chart: { height: 415 },
        plotOptions: { bar: { columnWidth: '50%' } },
      },
    },
    {
      breakpoint: 982,
      options: { plotOptions: { bar: { columnWidth: '30%' } } },
    },
    {
      breakpoint: 480,
      options: {
        chart: { height: 250 },
        legend: { offsetY: 7 },
      },
    },
  ],
}))
</script>

<template>
  <VCard>
    <VCardItem
      title="Expense statistics"
      subtitle="Monthly expenses"
    >
      <template #append>
        <VMenu offset-y>
          <template #activator="{ props: menuProps }">
            <VBtn
              v-bind="menuProps"
              variant="tonal"
              append-icon="tabler-chevron-down"
            >
              {{ selectedYear }}
            </VBtn>
          </template>
          <VList>
            <VListItem @click="selectedYear = 'All'">
              <VListItemTitle>All</VListItemTitle>
            </VListItem>
            <VListItem
              v-for="year in years"
              :key="year"
              @click="selectedYear = year"
            >
              <VListItemTitle>{{ year }}</VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
      </template>
    </VCardItem>

    <VCardText>
      <VueApexCharts
        id="shipment-statistics"
        type="line"
        height="320"
        :options="shipmentConfig"
        :series="series"
      />
    </VCardText>
  </VCard>
</template>

<style lang="scss">
@use "@core-scss/template/libs/apex-chart.scss";

.v-btn-group--divided .v-btn:not(:last-child) {
  border-inline-end-color: rgba(var(--v-theme-primary), 0.5);
}

#shipment-statistics {
  .apexcharts-legend-text {
    font-size: 16px !important;
  }

  .apexcharts-legend-series {
    border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
    border-radius: 0.375rem;
    block-size: 83%;
    padding-block: 4px;
    padding-inline: 16px 12px;
  }
}
</style>
