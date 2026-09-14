<script setup>
import { useTheme } from 'vuetify'

const props = defineProps({
  tahsin: Array,
})

const lastValue = props.tahsin[props.tahsin.length - 1] || 0
const lastPerformance = (((props.tahsin[props.tahsin.length - 1] || 0) - (props.tahsin[props.tahsin.length - 2] || 0)) / (props.tahsin[props.tahsin.length - 2] || 1) * 100).toFixed(2) || 0
const vuetifyTheme = useTheme()
const currentTheme = vuetifyTheme.current.value.colors

const series = [{
  name: 'Subscribers',
  data: props.tahsin,
}]

const chartOptions = {
  chart: {
    type: 'area',
    parentHeightOffset: 0,
    toolbar: { show: false },
    sparkline: { enabled: true },
  },
  markers: {
    colors: 'transparent',
    strokeColors: 'transparent',
  },
  grid: { show: false },
  colors: [currentTheme.success],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 0.9,
      opacityFrom: 0.5,
      opacityTo: 0.07,
      stops: [
        0,
        80,
        100,
      ],
    },
  },
  dataLabels: { enabled: false },
  stroke: {
    width: 2,
    curve: 'smooth',
  },
  xaxis: {
    show: true,
    lines: { show: false },
    labels: { show: false },
    stroke: { width: 0 },
    axisBorder: { show: false },
  },
  yaxis: {
    stroke: { width: 0 },
    show: false,
  },
  tooltip: { enabled: false },
}
</script>

<template>
  <VCard>
    <VCardText class="pb-2">
      <h5 class="text-h5">
        Alquran
      </h5>
      <p class="mb-0 text-sm text-disabled">
        Last Semester
      </p>
    </VCardText>

    <VueApexCharts
      :options="chartOptions"
      :series="series"
      :height="72"
    />

    <VCardText class="pt-0">
      <div class="d-flex align-center justify-space-between mt-3">
        <h4 class="text-h4">
          {{ lastValue }}
        </h4>
        <p
          class="mb-0 text-sm"
          :class="lastPerformance < 0 ? 'text-error' : 'text-success'"
        >
          {{ lastPerformance }}%
        </p>
      </div>
    </VCardText>
  </VCard>
</template>
