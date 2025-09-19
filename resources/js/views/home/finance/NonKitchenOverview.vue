<script setup>
import { computed } from 'vue'
import { VProgressLinear } from 'vuetify/components/VProgressLinear'

const props = defineProps({
  data: { type: Array, required: true },
})

const nonKitchenExpenses = computed(() => {
  const data = Array.isArray(props.data) ? props.data : []
  const total = data.reduce((sum, item) => sum + Number(item.amount || 0), 0)

  return data.map(item => ({
    icon: getIconForItem(item.finance_account?.description),
    title: item.finance_account?.description || 'Unknown',
    amount: Number(item.amount || 0),
    time: Number(item.amount || 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }),
    percentage: total > 0 ? (Number(item.amount || 0) / total) * 100 : 0,
  }))
})

const progressBarData = computed(() => {
  const sortedExpenses = nonKitchenExpenses.value
    .slice()
    .sort((a, b) => b.amount - a.amount)

  if (sortedExpenses.length === 0)
    return []

  if (sortedExpenses.length <= 4) {
    // Jika item 4 atau kurang, tampilkan semua dan pastikan total 100%
    const totalPercentage = sortedExpenses.reduce((sum, item) => sum + item.percentage, 0)
    const scale = 100 / totalPercentage

    return sortedExpenses.map(item => ({
      ...item,
      percentage: parseFloat((item.percentage * scale).toFixed(1)),
    }))
  }

  // Jika lebih dari 4, ambil 3 teratas + "Lain-lain"
  const topThree = sortedExpenses.slice(0, 3)
  const others = sortedExpenses.slice(3)
  const othersPercentage = others.reduce((sum, item) => sum + item.percentage, 0)

  const othersData = {
    title: 'Lain-lain',
    percentage: parseFloat(othersPercentage.toFixed(1)),
    icon: 'tabler-dots',
  }

  return [...topThree.map(item => ({ ...item, percentage: parseFloat(item.percentage.toFixed(1)) })), othersData]
})

const progressColors = [
  'rgba(var(--v-theme-on-surface), var(--v-hover-opacity))',
  'rgb(var(--v-theme-primary))',
  'rgb(var(--v-theme-info))',
  '#212121',
]

const getProgressColor = index => progressColors[index % progressColors.length]

const getIconForItem = title => {
  const iconMap = {
    'Sewa Gedung': 'tabler-building',
    'Internet & Tools': 'tabler-wifi',
    'Gaji Karyawan': 'tabler-users',
    'Gaji Guru': 'tabler-school',
  }

  return iconMap[title] || 'tabler-receipt-2'
}
</script>

<template>
  <VCard>
    <VCardItem title="Non Kitchen overview">
      <template #append>
        <MoreBtn />
      </template>
    </VCardItem>
    <VCardText>
      <div
        v-if="progressBarData.length"
        class="d-flex mb-8"
      >
        <div
          v-for="(item, index) in progressBarData"
          :key="item.title"
          :style="{ 'inline-size': `${item.percentage}%` }"
        >
          <div class="vehicle-progress-label position-relative mb-4 text-body-1 d-none d-sm-block text-truncate">
            {{ item.title }}
          </div>
          <VProgressLinear
            :color="getProgressColor(index)"
            model-value="100"
            height="46"
            :class="{
              'rounded-s-0': index > 0 && progressBarData.length > 1,
              'rounded-e-0': index < progressBarData.length - 1,
              'rounded-sm': progressBarData.length === 1,
            }"
          >
            <strong
              class="vehicle-progress-text"
              :class="index > 0 ? 'text-white' : ''"
            >{{ item.percentage }}%</strong>
          </VProgressLinear>
        </div>
      </div>
      <div class="table-container">
        <VTable class="text-no-wrap">
          <tbody>
            <tr
              v-for="(vehicle, index) in nonKitchenExpenses"
              :key="index"
            >
              <td width="70%">
                <VIcon
                  :icon="vehicle.icon"
                  size="24"
                  class="me-2"
                />
                <span class="text-body-1 text-high-emphasis">{{ vehicle.title }}</span>
              </td>
              <td class="text-end">
                <div class="font-weight-medium text-body-1 text-high-emphasis">
                  {{ vehicle.time }}
                </div>
              </td>
              <td class="text-end">
                <span class="text-body-1">{{ vehicle.percentage.toFixed(1) }}%</span>
              </td>
            </tr>
          </tbody>
        </VTable>
      </div>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.vehicle-progress-label {
  padding-block-end: 1rem;

  &::after {
    position: absolute;
    display: inline-block;
    background-color: #DBDADE;
    block-size: 10px;
    content: "";
    inline-size: 2px;
    inset-block-end: 0;
    inset-inline-start: 0;

    [dir="rtl"] & {
      inset-inline: unset 0;
    }
  }
}

.table-container {
  max-block-size: 215px;

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>

<style lang="scss">
.v-progress-linear__content {
  justify-content: start;
  padding-inline-start: 1rem;

  .vehicle-progress-text {
    font-size: 1rem;
  }
}

@media (max-width: 1080px) {
  .v-progress-linear__content {
    padding-inline-start: 0.75rem !important;

    .vehicle-progress-text {
      font-size: 0.75rem !important;
    }
  }
}

@media (max-width: 576px) {
  .v-progress-linear__content {
    padding-inline-start: 0.3rem !important;

    .vehicle-progress-text {
      font-size: 0.75rem !important;
    }
  }
}
</style>
