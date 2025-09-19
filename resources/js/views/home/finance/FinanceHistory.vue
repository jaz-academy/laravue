<script setup>
import { humanDate } from '@/@core/utils/helpers'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({ expenses: [], outgoings: [], inputs: [] }),
  },
})


const currentTab = ref('Input')

const tabsData = [
  'Input',
  'Outgoing',
  'Expenses',
]
</script>

<template>
  <VCard class="country-order-card">
    <VCardItem
      title="Payment History"
      subtitle="Transactions"
    >
      <template #append>
        <MoreBtn />
      </template>
    </VCardItem>

    <VTabs
      v-model="currentTab"
      grow
      class="disable-tab-transition"
    >
      <VTab
        v-for="(tab, index) in tabsData"
        :key="index"
      >
        {{ tab }}
      </VTab>
    </VTabs>

    <VCardText>
      <VWindow v-model="currentTab">
        <VWindowItem>
          <div>
            <VTimeline
              v-if="props.data.inputs.length"
              align="start"
              truncate-line="both"
              side="end"
              density="compact"
              line-thickness="1"
              class="table-container"
            >
              <VTimelineItem
                v-for="(item, index) in props.data.inputs"
                :key="index"
                icon="tabler-circle-check"
                dot-color="rgba(var(--v-theme-surface))"
                icon-color="success"
                fill-dot
                size="22"
                :elevation="0"
                class="text-no-wrap"
              >
                <div class="text-caption text-uppercase text-success">
                  {{ item.remark }}
                </div>
                <div class="app-timeline-title">
                  {{ new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.amount) }}
                </div>
                <div class="app-timeline-text">
                  {{ humanDate(item.date) }}
                </div>
              </VTimelineItem>
            </VTimeline>
          </div>
        </VWindowItem>

        <VWindowItem>
          <div>
            <VTimeline
              v-if="props.data.outgoings.length"
              align="start"
              truncate-line="both"
              side="end"
              density="compact"
              line-thickness="1"
              class="table-container"
            >
              <VTimelineItem
                v-for="(item, index) in props.data.outgoings"
                :key="index"
                icon="tabler-arrow-up-right"
                dot-color="rgba(var(--v-theme-surface))"
                icon-color="warning"
                fill-dot
                size="22"
                :elevation="0"
                class="text-no-wrap"
              >
                <div class="text-caption text-uppercase text-warning">
                  {{ item.remark }}
                </div>
                <div class="app-timeline-title">
                  {{ new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.amount) }}
                </div>
                <div class="app-timeline-text">
                  {{ humanDate(item.date) }}
                </div>
              </VTimelineItem>
            </VTimeline>
          </div>
        </VWindowItem>

        <VWindowItem>
          <div>
            <VTimeline
              v-if="props.data.expenses.length"
              align="start"
              truncate-line="both"
              side="end"
              density="compact"
              line-thickness="1"
              class="table-container"
            >
              <VTimelineItem
                v-for="(item, index) in props.data.expenses"
                :key="index"
                icon="tabler-arrow-up-right-circle"
                dot-color="rgba(var(--v-theme-surface))"
                icon-color="error"
                fill-dot
                size="22"
                :elevation="0"
                class="text-no-wrap"
              >
                <div class="text-caption text-uppercase text-error">
                  {{ item.remark }}
                </div>
                <div class="app-timeline-title">
                  {{ new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.amount) }}
                </div>
                <div class="app-timeline-text">
                  {{ humanDate(item.date) }}
                </div>
              </VTimelineItem>
            </VTimeline>
          </div>
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.country-order-card{
  .v-timeline .v-timeline-divider__dot .v-timeline-divider__inner-dot{
    box-shadow: none !important;
  }
}

.table-container {
  max-block-size: 290px;

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
