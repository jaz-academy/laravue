<script setup>
const deliveryData = [
  {
    title: 'Muhammad Ali',
    value: 'OK',
    change: '28 Mei 2022',
    icon: 'tabler-circle-check',
    color: 'success',
  },
  {
    title: 'Raden Mas Prabu',
    value: 'OK',
    change: '28 Mei 2022',
    icon: 'tabler-circle-check',
    color: 'success',
  },
  {
    title: 'Budak Indung',
    value: 'OK',
    change: '28 Mei 2022',
    icon: 'tabler-circle-check',
    color: 'success',
  },
  {
    title: 'Munding Leutik',
    value: '-',
    change: 'Waiting',
    icon: 'tabler-clock',
    color: 'secondary',
  },
  {
    title: 'Ngadu wangsa',
    value: '-',
    change: 'Waiting',
    icon: 'tabler-clock',
    color: 'secondary',
  },
  {
    title: 'Jarkasih',
    value: '-',
    change: 'Waiting',
    icon: 'tabler-clock',
    color: 'secondary',
  },
]
</script>

<template>
  <VCard>
    <VCardItem
      title="Payment overview"
      subtitle="By Categories"
    >
      <template #append>
        <MoreBtn />
      </template>
    </VCardItem>

    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="(data, index) in deliveryData"
          :key="index"
        >
          <template #prepend>
            <VAvatar
              :color="data.color"
              variant="tonal"
              rounded
              size="38"
            >
              <VIcon
                :icon="data.icon"
                size="26"
              />
            </VAvatar>
          </template>
          <VListItemTitle>{{ data.title }}</VListItemTitle>
          <VListItemSubtitle>
            <div
              :class="data.change !== 'Waiting' ? 'text-success' : 'text-secondary'"
              class="d-flex align-center"
            >
              <VIcon
                :icon="data.change !== 'Waiting' ? 'tabler-chevron-up' : 'tabler-chevron-down'"
                class="me-1"
              />
              <span>{{ data.change }}</span>
            </div>
          </VListItemSubtitle>
          <template #append>
            <span class="text-high-emphasis text-body-1 font-weight-medium">
              {{ data.value }}
            </span>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 23px;
}
</style>
