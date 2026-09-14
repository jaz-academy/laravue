<script setup>
import { hexToRgb } from '@layouts/utils'
import { useTheme } from 'vuetify'

const props = defineProps({
  inggris: { type: Number, default: 0 },
  arab: { type: Number, default: 0 },
})

const vuetifyTheme = useTheme()

const delta = computed(() => {
  const total = props.inggris + props.arab
  
  return props.inggris && props.arab ? ((props.inggris - props.arab) / total) * 100 : 0
})

const series = computed(() => [
  props.inggris,
  props.arab,
])

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables
  const labelSuccessColor = `rgba(${ hexToRgb(currentTheme.success) },0.2)`
  const headingColor = `rgba(${ hexToRgb(currentTheme['on-background']) },${ variableTheme['high-emphasis-opacity'] })`

  const chartColors = {
    donut: {
      series1: currentTheme.success,
      series2: labelSuccessColor,
    },
  }
  
  return {
    chart: {
      parentHeightOffset: 0,
      type: 'donut',
    },
    labels: [
      'English',
      'Arabic',
    ],
    colors: [
      chartColors.donut.series1,
      chartColors.donut.series2,
    ],
    stroke: { width: 0 },
    dataLabels: {
      enabled: false,
      formatter(val) {
        return `${ Number.parseInt(val) }%`
      },
    },
    legend: { show: false },
    tooltip: { theme: false },
    grid: {
      padding: {
        top: 15,
        right: -20,
        left: -20,
      },
    },
    states: { hover: { filter: { type: 'none' } } },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            value: {
              fontSize: '1.375rem',
              fontFamily: 'Public Sans',
              color: headingColor,
              fontWeight: 600,
              offsetY: -15,
              formatter(val) {
                return `${ Number.parseInt(val) }%`
              },
            },
            name: {
              offsetY: 20,
              fontFamily: 'Public Sans',
            },
            total: {
              show: true,
              showAlways: true,
              color: currentTheme.success,
              fontSize: '.8125rem',
              label: '%',
              fontFamily: 'Public Sans',
              formatter() {
                return delta.value.toFixed(1)
              },
            },
          },
        },
      },
    },
  }
})
</script>

<template>
  <VCard>
    <VCardText>
      <div>
        <h5 class="text-h5">
          Language
        </h5>
        <p class="mb-0 text-sm text-disabled">
          Bilingual
        </p>
      </div>

      <VueApexCharts
        :options="chartOptions"
        :series="series"
        :height="147 * 0.75"
        :width="130 * 0.75"
      />
    </VCardText>
  </VCard>
</template>
