<script setup>
import { member } from '@/composables/fetchMemberData'
import { fetchProjectData, tasks } from '@/composables/fetchProjectData'
import { fetchStudentData, students } from '@/composables/fetchStudentData'
import avatar1 from '@images/avatars/avatar-1.png'
import { computed, onMounted } from 'vue'

onMounted(() => {
  fetchStudentData()
  fetchProjectData()
})

function countTasksForStudent(tasks, studentId) {
  return tasks.filter(task => task.admin_student_id === studentId).length
}

function calculateStars(tasks, studentId) {
  const studentTasks = tasks.filter(task => task.admin_student_id === studentId)
  const totalRate = studentTasks.reduce((sum, task) => sum + (task.rate || 0), 0)
  const averageRate = studentTasks.length > 0 ? totalRate / studentTasks.length : 0

  return { totalRate, averageRate }
}

// Computed property to sort students by averageRate
const sortedStudents = computed(() => {
  return students.value.slice().sort((a, b) => {
    const aRate = calculateStars(tasks.value, a.id).averageRate
    const bRate = calculateStars(tasks.value, b.id).averageRate
    
    return bRate - aRate
  })
})

function abbreviateName(name) {
  if (name.length <= 20) return name
  const words = name.split(" ")
  
  return words.slice(0, 2).join(" ")
}
</script>

<template>
  <VRow>
    <VCol
      v-for="student in sortedStudents"
      :key="student.id"
      sm="6"
      md="4"
      lg="3"
      cols="12"
    >
      <VCard>
        <div class="vertical-more">
          <MoreBtn
            :menu-list="[
              { title: 'Share connection', value: 'Share connection' },
              { title: 'Block connection', value: 'Block connection' },
              { type: 'divider', class: 'my-2' },
              { title: 'Delete', value: 'Delete', class: 'text-error' },
            ]"
            item-props
          />
        </div>

        <VCardItem>
          <VCardTitle class="d-flex flex-column align-center justify-center gap-y-5">
            <VAvatar
              size="100"
              :image="avatar1"
            />

            <div class="text-center">
              <h4 class="text-h4">
                {{ abbreviateName(student.name) }}
              </h4>
              <h6 class="text-h6">
                {{ student.role || 'Content Creator' }}
              </h6>
            </div>
          </VCardTitle>
        </VCardItem>

        <VCardText class="text-center">
          <VRating
            v-model="calculateStars(tasks, student.id).averageRate"
            half-increments
            hover
          />
        </VCardText>

        <VCardText>
          <div class="d-flex justify-space-around">
            <div class="text-center">
              <h4 class="text-h4">
                {{ countTasksForStudent(tasks, student.id) }}
              </h4>
              <span class="text-body-1">Tasks</span>
            </div>
            <div class="text-center">
              <h4 class="text-h4">
                {{ calculateStars(tasks, student.id).totalRate }}
              </h4>
              <span class="text-body-1">Stars</span>
            </div>
            <div class="text-center">
              <h4 class="text-h4">
                {{ calculateStars(tasks, student.id).averageRate.toFixed(2) }}
              </h4>
              <span class="text-body-1">Average</span>
            </div>
          </div>

          <div class="d-flex justify-center gap-4 mt-5">
            <VBtn
              prepend-icon="tabler-user-check"
              :variant="member.registered == student.registered ? 'elevated' : 'tonal'"
            >
              {{ student.registered }}
            </VBtn>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.vertical-more {
  position: absolute;
  inset-block-start: 1rem;
  inset-inline-end: 0.5rem;
}
</style>
