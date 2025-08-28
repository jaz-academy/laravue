<script setup>
import { properCase } from '@/@core/utils/helpers'
import { computed } from 'vue'


const props = defineProps({
  topTen: Array,
})  

const colors = ['primary', 'secondary', 'success', 'warning', 'info', 'danger']

const topTasks = computed(() => {
  const tasks = props.topTen || []
  const studentMap = {}

  tasks.forEach(task => {
    const id = task.admin_student_id
    if (!studentMap[id]) studentMap[id] = []
    studentMap[id].push(task)
  })

  const orderedIds = [...new Set(tasks.map(t => t.admin_student_id))]
  const result = []

  orderedIds.forEach(id => {
    const sortedTasks = studentMap[id].sort((a, b) => b.id - a.id)

    result.push(...sortedTasks)
  })

  return result.map(task => ({
    id: task.id,
    title: task.name,
    name: task.admin_student.name,
    icon: 'tabler-stars',
    color: colors[task.admin_student.id % colors.length],
    link: task.link || '#',
  }))
})
</script>

<template>
  <VCard>
    <VCardItem
      title="Top 10 Tasks"
      subtitle="Based on latest submissions"
    >
      <template #append>
        <MoreBtn />
      </template>
    </VCardItem>

    <VCardText>
      <VList class="card-list scrollable-card">
        <VListItem
          v-for="value in topTasks"
          :key="value.id"
        >
          <template #prepend>
            <VAvatar
              rounded
              variant="tonal"
              :color="value.color"
            >
              <VIcon
                :icon="value.icon"
                size="24"
              />
            </VAvatar>
          </template>

          <VListItemTitle class="me-4">
            <div class="d-flex flex-column">
              <div class="font-weight-medium text-truncate">
                <RouterLink
                  :to="value.link"
                  :class="`text-${value.color}`"
                >
                  {{ properCase(value.title) }}
                </RouterLink>
              </div>
              <div>
                <VChip
                  variant="tonal"
                  :color="value.color"
                  label
                >
                  {{ value.name }}
                </VChip>
              </div>
            </div>
          </VListItemTitle>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style scoped>
.scrollable-card {
  block-size: 320px;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  overflow-y: auto;
}

.scrollable-card::-webkit-scrollbar { 
  display: none;  /* Safari and Chrome */
}
</style>
