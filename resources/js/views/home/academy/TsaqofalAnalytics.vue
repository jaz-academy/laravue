<script setup>
import { hexToRgb } from '@layouts/utils'
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const props = defineProps({
  bulan: Array,
  pemahaman: Array,
  sikap: Array,
})

const vuetifyTheme = useTheme()

const series = computed(() => [
  {
    name: 'Pemahaman',
    data: props.pemahaman,
  },
  {
    name: 'Sikap',
    data: props.sikap,
  },
])

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables
  const borderColor = `rgba(${ hexToRgb(String(variableTheme['border-color'])) },${ variableTheme['border-opacity'] })`
  const labelColor = `rgba(${ hexToRgb(currentTheme['on-surface']) },${ variableTheme['disabled-opacity'] })`
  const legendColor = `rgba(${ hexToRgb(currentTheme['on-background']) },${ variableTheme['high-emphasis-opacity'] })`
  
  return {
    chart: {
      type: 'radar',
      toolbar: { show: false },
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: borderColor,
          connectorColors: borderColor,
        },
      },
    },
    stroke: {
      show: false,
      width: 0,
    },
    legend: {
      show: true,
      fontSize: '13px',
      position: 'bottom',
      labels: {
        colors: legendColor,
        useSeriesColors: false,
      },
      markers: {
        height: 10,
        width: 10,
        offsetX: -3,
      },
      itemMargin: { horizontal: 10 },
      onItemHover: { highlightDataSeries: false },
    },
    colors: [
      currentTheme.primary,
      currentTheme.info,
    ],
    fill: {
      opacity: [
        1,
        0.85,
      ],
    },
    markers: { size: 0 },
    grid: {
      show: false,
      padding: {
        top: 0,
        bottom: -5,
      },
    },
    xaxis: {
      categories: props.bulan,
      labels: {
        show: true,
        style: {
          colors: [
            labelColor,
            labelColor,
            labelColor,
            labelColor,
            labelColor,
            labelColor,
          ],
          fontSize: '13px',
          fontFamily: 'Public Sans',
        },
      },
    },
    yaxis: {
      show: false,
      min: 0,
      max: 100,
      tickAmount: 4,
    },
    responsive: [{
      breakpoint: 769,
      options: { chart: { height: 372 } },
    }],
  }
})
</script>

<template>
  <VCard>
    <VCardItem class="pb-0">
      <VCardTitle>Tsaqofah</VCardTitle>
      <VCardSubtitle>Syakhsiyah Islamiyah</VCardSubtitle>

      <template #append>
        <div class="mt-n4 me-n2">
          <MoreBtn :menu-list="[{ title: 'View More', value: 'View More' }, { title: 'Delete', value: 'Delete' }]" />
        </div>
      </template>
    </VCardItem>

    <VCardText>
      <VueApexCharts
        :options="chartOptions"
        :series="series"
        height="355"
      />
    </VCardText>
  </VCard>
</template>
