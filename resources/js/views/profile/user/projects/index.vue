<script setup>
import { useCookie } from '@/@core/composable/useCookie'
import { fetchProjectData, plansTasks } from '@/composables/fetchProjectData'
import avatar1 from '@images/avatars/avatar-1.png'
import socialLabel from '@images/icons/project-icons/social.png'
import { onMounted } from 'vue'

onMounted(() => {
  fetchProjectData()
})

console.log(plansTasks)

function getDistinctTasks(tasks) {
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc.has(task.admin_student_id)) {
      acc.set(task.admin_student_id, task)
    }
    
    return acc
  }, new Map())

  
  return Array.from(groupedTasks.values())
}

function hasTaskForStudent(tasks, studentId) {
  return tasks.some(task => task.admin_student_id === studentId)
}


const moreList = [
  {
    title: 'View Details',
    value: 'View Details',
  },
  {
    title: 'Add to favorites',
    value: 'Add to favorites',
  },
  {
    type: 'divider',
    class: 'my-2',
  },
  {
    title: 'Leave Project',
    value: 'Leave Project',
    class: 'text-error',
  },
]
</script>

<template>
  <VRow>
    <VCol
      v-for="data in plansTasks"
      :key="data.id"
      cols="12"
      sm="6"
      lg="4"
    >
      <VCard>
        <VCardItem>
          <template #prepend>
            <VAvatar :image="socialLabel" />
          </template>

          <VCardTitle>{{ data.theme }}</VCardTitle>
          <p class="mb-0">
            <span class="font-weight-medium me-1">Subject:</span>
            <span>{{ data.subject }}</span>
          </p>

          <template #append>
            <div class="mt-n8 me-n3">
              <MoreBtn
                item-props
                :menu-list="moreList"
              />
            </div>
          </template>
        </VCardItem>

        <VCardText>
          <p class="mt-4 mb-0 clamp-text">
            {{ data.description }}
          </p>
        </VCardText>

        <VDivider />

        <VCardText>
          <div class="d-flex align-center justify-space-between flex-wrap gap-2">
            <h6 class="text-base font-weight-medium">
              Deadline: <span class="text-body-1">{{ data.end_date }}</span>
            </h6>

            <VChip
              label
              :color="hasTaskForStudent(data.project_task, useCookie('userData').value.admin_student_id) ? 'success' : 'error'"
              size="small"
            >
              {{ hasTaskForStudent(data.project_task, useCookie('userData').value.admin_student_id) ? `I'm done` : `Not doing Yet` }}
            </VChip>
          </div>

          <div class="d-flex align-center justify-space-between flex-wrap text-sm mt-4 mb-2">
            <span>All member doing</span>
            <span>{{ Math.round((getDistinctTasks(data.project_task).length / 20) * 100) }}%</span>
          </div>
          <VProgressLinear
            rounded
            rounded-bar
            height="8"
            :model-value="getDistinctTasks(data.project_task).length"
            :max="20"
            color="primary"
          />

          <div class="d-flex align-center justify-space-between flex-wrap gap-2 mt-3">
            <div class="d-flex align-center">
              <div class="v-avatar-group me-2">
                <VAvatar
                  v-for="task in getDistinctTasks(data.project_task)"
                  :key="task.id"
                  :image="avatar1"
                  :size="32"
                />
              </div>
              <span class="text-xs" />
            </div>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
