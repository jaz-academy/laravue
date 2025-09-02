<script setup>
import { humanDate, properCase } from '@/@core/utils/helpers'
import avatar from '@images/avatars/no-profile.png'
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
    students: task.students,
    date: humanDate(task.date),
    icon: 'tabler-stars',
    color: colors[task.students[0].id % colors.length],
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
                <a
                  :href="value.link"
                  :class="`text-${value.color}`"
                  :target="value.link.startsWith('http') ? '_blank' : null"
                  rel="noopener noreferrer"
                >
                  {{ properCase(value.title) }}
                </a>
              </div>
              <div class="v-avatar-group">
                <VAvatar
                  v-for="student in value.students.slice(0, 5)"
                  :key="student.id"
                  color="info"
                  size="23"
                >
                  <VImg
                    v-if="student.image"
                    cover
                    :src="`/storage/${student.image}`"
                  />
                  <VImg
                    v-else
                    :src="avatar"
                  />
                  <VTooltip
                    location="top"
                    activator="parent"
                  >
                    {{ student.nickname }}
                  </VTooltip>
                </VAvatar>
                <VAvatar
                  v-if="value.students.length > 5"
                  color="secondary"
                  size="23"
                >
                  <span class="text-xs">+{{ value.students.length - 5 }}</span>
                </VAvatar>
                <small class="ms-2">{{ value.students.length > 1 ? 'Collab' : 'Individual' }}, {{ value.date }}</small>
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
