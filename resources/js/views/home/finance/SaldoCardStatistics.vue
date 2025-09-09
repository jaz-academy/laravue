<script setup>
const depositData = ref([
  {
    icon: 'tabler-building-bank',
    color: 'primary',
    title: 'Main Bank Account',
    value: '42.000.000',
    change: 18.2,
    isHover: false,
  },
  {
    icon: 'tabler-pig-money',
    color: 'warning',
    title: 'Other Bank Account',
    value: '8.000.000',
    change: -8.7,
    isHover: false,
  },
  {
    icon: 'tabler-credit-card',
    color: 'error',
    title: 'Electronic Money',
    value: '500.000',
    change: 4.3,
    isHover: false,
  },
  {
    icon: 'tabler-cash',
    color: 'info',
    title: 'Cash on hand',
    value: '750.000',
    change: -2.5,
    isHover: false,
  },
])
</script>

<template>
  <VRow>
    <VCol
      v-for="(data, index) in depositData"
      :key="index"
      cols="12"
      md="3"
      sm="6"
    >
      <div>
        <VCard
          class="logistics-card-statistics cursor-pointer"
          :style="data.isHover ? { 'border-block-end': `2px solid rgba(var(--v-theme-${data.color}))` } : { 'border-block-end': `2px solid rgba(var(--v-theme-${data.color}), var(--v-disabled-opacity))` }"
          @mouseenter="data.isHover = true"
          @mouseleave="data.isHover = false"
        >
          <VCardText>
            <div class="d-flex align-center gap-x-4 mb-2">
              <VAvatar
                variant="tonal"
                :color="data.color"
                rounded
              >
                <VIcon
                  :icon="data.icon"
                  size="28"
                />
              </VAvatar>
              <h5 class="text-h5 font-weight-medium">
                {{ data.value }}
              </h5>
            </div>
            <div class="text-body-1">
              {{ data.title }}
            </div>
            <div class="d-flex gap-x-2">
              <h6 class="text-h6 font-weight-medium">
                {{ (data.change > 0) ? '+' : '' }} {{ data.change }}%
              </h6>
              <span class="text-disabled">from Total</span>
            </div>
          </VCardText>
        </VCard>
      </div>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
@use "@core-scss/base/mixins" as mixins;

.logistics-card-statistics:hover {
  @include mixins.elevation(12);

  transition: all 0.1s ease-out;
}
</style>
