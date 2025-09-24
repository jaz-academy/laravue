<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})

const headers = [
  {
    title: 'ACCOUNT',
    key: 'description',
  },
  {
    title: 'PAYMENT',
    key: 'payment',
  },
  {
    title: 'EXPENSES',
    key: 'amount',
  },
  {
    title: 'BALANCE',
    key: 'balance',
  },
  {
    title: 'REMAIN',
    key: 'percentage',
  },
]

const formatCurrency = value => {
  if (typeof value !== 'number')
    return value

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

const resolveChipColor = balance => {
  if (balance > 0)
    return 'success'
  if (balance < 0)
    return 'error'
  
  return 'warning'
}

const resolvePercentageColor = percentage => {
  if (percentage > 100)
    return 'error'
  if (percentage > 90)
    return 'warning'
  
  return 'primary'
}

const totalBalance = computed(() => props.data.reduce((sum, item) => sum + item.balance, 0))
</script>

<template>
  <VCard v-if="props.data.length">
    <VCardItem title="Allocation">
      <template #append>
        <MoreBtn />
      </template>
    </VCardItem>

    <VDivider />

    <VTable class="text-no-wrap">
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header.key"
            scope="col"
            class="text-uppercase"
          >
            {{ header.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in props.data"
          :key="item.allocation"
        >
          <!-- ACCOUNT -->
          <td>
            <div class="d-flex align-center">
              <VAvatar
                :color="item.allocation === '' ? 'error' : 'primary'"
                variant="tonal"
                class="me-2"
                size="34"
              >
                <VIcon
                  :icon="item.allocation === '' ? 'tabler-wallet' : 'tabler-building-bank'"
                  size="22"
                />
              </VAvatar>
              <span class="text-body-2 text-high-emphasis font-weight-medium">
                {{ item.allocation || 'No Allocated' }}
              </span>
            </div>
          </td>

          <!-- PAYMENT -->
          <td>
            {{ formatCurrency(Number(item.payment)) }}
          </td>

          <!-- EXPENSES -->
          <td>
            {{ formatCurrency(Number(item.amount)) }}
          </td>

          <!-- BALANCE -->
          <td>
            <VChip
              :color="resolveChipColor(item.balance)"
              label
            >
              {{ formatCurrency(item.balance) }}
            </VChip>
          </td>

          <!-- REMAIN -->
          <td>
            <div
              class="d-flex align-center gap-x-4"
              style="min-inline-size: 200px;"
            >
              <div class="w-100">
                <VProgressLinear
                  :model-value="item.remain"
                  :color="resolvePercentageColor(item.remain)"
                  :height="10"
                  rounded
                />
              </div>
              <div class="text-body-2" />
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="text-body-1 bg-var-theme-background">
          <th
            colspan="2"
            scope="row"
          />
          <th class="font-weight-medium text-high-emphasis">
            Total Balance
          </th>
          <td class="font-weight-medium">
            <VChip
              :color="resolveChipColor(totalBalance)"
              label
            >
              {{ formatCurrency(totalBalance) }}
            </VChip>
          </td>
          <td />
        </tr>
      </tfoot>
    </VTable>
  </VCard>
</template>
