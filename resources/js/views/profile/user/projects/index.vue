<script setup>
import { useCookie } from '@/@core/composable/useCookie'
import { humanDate } from '@/@core/utils/helpers'
import { fetchProjectData, plansTasks } from '@/composables/fetchProjectData'
import avatar from '@images/avatars/no-profile.png'
import socialLabel from '@images/icons/project-icons/social.png'
import { computed, onMounted } from 'vue'

const currentUser = useCookie('userData')

onMounted(() => {
  fetchProjectData()
})

function getDistinctStudents(tasks = []) {
  const map = new Map()
  if (!Array.isArray(tasks)) return []

  tasks.forEach(task => {
    if (Array.isArray(task?.students)) {
      task.students.forEach(student => {
        if (student && student.id && !map.has(student.id)) {
          map.set(student.id, student)
        }
      })
    }
  })
  
  return Array.from(map.values())
}

function hasTaskForStudent(tasks = [], studentId) {
  if (!Array.isArray(tasks) || !studentId) return false
  return tasks.some(task =>
    Array.isArray(task?.students) && task.students.some(student => student && student.id === studentId),
  )
}

const activeProjects = computed(() => {
  return (plansTasks.value || []).filter(p => {
    if (!p) return false
    if (p.status === 'archived') return false
    if (!p.end_date) return true
    return new Date(p.end_date) >= new Date()
  })
})

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
  <VRow v-if="activeProjects.length">
    <VCol
      v-for="data in activeProjects"
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
              Deadline: <span class="text-body-1">{{ humanDate(data.end_date, 'ddd d MMM yyyy') }}</span>
            </h6>

            <VChip
              label
              :color="hasTaskForStudent(data.project_task, (currentUser.admin_student_id ?? 0)) ? 'success' : 'error'"
              size="small"
            >
              {{ hasTaskForStudent(data.project_task, (currentUser.admin_student_id ?? 0)) ? `I'm done` : `Not doing Yet` }}
            </VChip>
          </div>

          <div class="d-flex align-center justify-space-between flex-wrap text-sm mt-4 mb-2">
            <span>All member doing</span>
            <span>{{ Math.round((getDistinctStudents(data.project_task).length / 20) * 100) }}%</span>
          </div>
          <VProgressLinear
            rounded
            rounded-bar
            height="8"
            :model-value="getDistinctStudents(data.project_task).length"
            :max="20"
            color="primary"
          />

          <div class="d-flex align-center justify-space-between flex-wrap gap-2 mt-3">
            <div class="d-flex align-center">
              <div class="v-avatar-group me-2">
                <VAvatar
                  v-for="student in getDistinctStudents(data.project_task).slice(0, 10)"
                  :key="student.id"
                  color="info"
                  :size="32"
                >
                  <VImg
                    v-if="student.image"
                    :src="`/storage/${student.image}`"
                    cover
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
                  v-if="getDistinctStudents(data.project_task).length > 10"
                  color="secondary"
                  size="32"
                >
                  <span class="text-xs">+{{ getDistinctStudents(data.project_task).length - 10 }}</span>
                </VAvatar>
              </div>
              <span class="text-xs" />
            </div>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VRow v-else>
    <VCol cols="12">
      <VCard class="text-center py-12">
        <VIcon
          icon="tabler-folder-off"
          size="48"
          class="text-disabled mb-3"
        />
        <h6 class="text-h6 text-disabled">Belum ada project aktif</h6>
      </VCard>
    </VCol>
  </VRow>
</template>
