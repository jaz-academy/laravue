<script setup>
import { humanDate, properCase } from '@/@core/utils/helpers'
import { computed } from 'vue'

const props = defineProps({
  literasiTasks: Array,
  students: Array,
})

const literasiData = computed(() => {
  const taskMap = {}

  props.literasiTasks.forEach(task => {
    taskMap[task.admin_student_id] = task
  })

  return Object.values(props.students).map(student => {
    const task = taskMap[student.id]

    console.log("task", task)

    return {
      title: task?.name || 'No Task',
      link: task?.link || '#',
      date: task?.date || '',
      name: student.nickname,
      progress: task?.rate ? task.rate * 20 : 0,
      color: rateColor(task?.rate),
    }
  })
})
</script>

<template>
  <VCard>
    <VCardItem
      :title="literasiTasks[0].project_plan?.theme || 'Literasi Tasks'"
      :subtitle="`Last Project: ${literasiTasks[0].project_plan?.subject}` || 'Literasi Project'"
    >
      <template #append>
        <MoreBtn />
      </template>
    </VCardItem>
    <VCardText>
      <VList class="card-list scrollable-card">
        <VListItem
          v-for="data in literasiData"
          :key="data.title"
        >
          <template #prepend>
            <VProgressCircular
              v-model="data.progress"
              :size="54"
              class="me-4"
              :color="data.color"
            >
              <span class="text-body-1 text-high-emphasis font-weight-medium">
                {{ data.progress }}
              </span>
            </VProgressCircular>
          </template>
          <VListItemTitle class="font-weight-medium mb-2">
            {{ properCase(data.title) }}
          </VListItemTitle>

          <VListItemSubtitle>{{ humanDate(data.date) }} - {{ data.name }}</VListItemSubtitle>
          <template #append>
            <VBtn
              :href="data.link"
              target="_blank"
              rel="noopener noreferrer"
              variant="tonal"
              color="default"
              class="rounded-sm"
              size="30"
            >
              <VIcon
                icon="tabler-chevron-right"
                class="flip-in-rtl"
              />
            </VBtn>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list{
  --v-card-list-gap: 1.875rem;
}

.scrollable-card {
  block-size: 320px;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  overflow-y: auto;
}

.scrollable-card::-webkit-scrollbar { 
  display: none;  /* Safari and Chrome */
}
</style>
