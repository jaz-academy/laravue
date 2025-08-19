<script setup>
import { getAreaChartSplineConfig } from '@core/libs/apex-chart/apexCharConfig'
import { useTheme } from 'vuetify'

const props = defineProps({
  bulan: Array,
  academic: Array,
  character: Array,
})

const vuetifyTheme = useTheme()
const chartConfig = computed(() => getAreaChartSplineConfig(vuetifyTheme.current.value, props.bulan))

const series = [
  {
    name: 'Academic',
    data: props.academic,
  },
  {
    name: 'Character',
    data: props.character,
  },
]
</script>

<template>
  <VueApexCharts
    type="area"
    height="400"
    :options="chartConfig"
    :series="series"
  />
</template>
