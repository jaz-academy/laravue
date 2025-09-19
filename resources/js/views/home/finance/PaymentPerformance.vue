<script setup>
import { humanDate, shorterName } from '@/@core/utils/helpers'
import { computed } from 'vue'

const props = defineProps({
  students: { type: Array, required: true },
  payments: { type: Array, required: true },
})

const deliveryData = computed(() => {
  if (!props.students || props.students.length === 0) {
    return []
  }
  
  return props.students.map(student => {
    const studentPayments = props.payments.filter(payment => payment.admin_student_id === student.id)
    const hasPaid = studentPayments.length > 0
    
    return {
      title: student.name,
      length: studentPayments.length,
      date: hasPaid ? humanDate(studentPayments[0].date) || studentPayments[0].date : '-',
      billing: hasPaid ? studentPayments[0].billing : 'Waiting',
      icon: hasPaid ? 'tabler-circle-check' : 'tabler-circle-x',
      color: !hasPaid ? 'warning' : studentPayments.length >= 3 ? 'success' : 'primary',
    }
  })
})
</script>

<template>
  <VCard>
    <VCardItem
      title="Monthly overview"
      subtitle="Payment delivery"
    >
      <template #append>
        <MoreBtn />
      </template>
    </VCardItem>

    <VCardText>
      <div class="table-container">
        <VList class="card-list text-no-wrap">
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
            <VListItemTitle>{{ shorterName(data.title) }}</VListItemTitle>
            <VListItemSubtitle>
              <div
                :class="data.billing == 'Waiting' ? 'text-secondary' : data.length >= 3 ? 'text-success' : 'text-primary'"
                class="d-flex align-center"
              >
                <VIcon
                  :icon="data.billing == 'Waiting' ? 'tabler-chevron-down' : data.length >= 3 ? 'tabler-chevrons-up' : 'tabler-chevron-up'"
                  class="me-1"
                />
                <span>{{ data.billing }}</span>
              </div>
            </VListItemSubtitle>
            <template #append>
              <span class="text-high-emphasis text-body-1 font-weight-medium">
                {{ data.date }}
              </span>
            </template>
          </VListItem>
        </VList>
      </div>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 23px;
}

.table-container {
  max-block-size: 360px;

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
