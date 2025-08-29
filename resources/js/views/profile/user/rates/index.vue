<script setup>
import { abbreviateName } from '@/@core/utils/formatters'
import { member } from '@/composables/fetchMemberData'
import { allTasks, fetchProjectData } from '@/composables/fetchProjectData'
import { fetchStudentData, students } from '@/composables/fetchStudentData'
import avatar from '@images/avatars/no-profile.png'
import { computed, onMounted } from 'vue'

onMounted(() => {
  fetchStudentData()
  fetchProjectData()
})

const getTaskCount = studentId => {
  return (allTasks.value ?? []).filter(t => t.admin_student_id === studentId).length
}

const getStars = studentId => {
  const studentTasks = (allTasks.value ?? []).filter(t => t.admin_student_id === studentId)
  const totalRate = studentTasks.reduce((sum, t) => sum + (parseFloat(t.rate) || 0), 0)
  const avgRate = studentTasks.length ? totalRate / studentTasks.length : 0
  
  return { totalRate, avgRate }
}

// Computed property to sort students by averageRate
const sortedStudents = computed(() => {
  return (students.value ?? [])
    .filter(student => student.graduation === null)
    .slice()
    .sort((a, b) => getStars(b.id).avgRate - getStars(a.id).avgRate)
})

watch(allTasks, val => {
  console.log('All tasks updated:', val)
})
</script>

<template>
  <VRow v-if="students.length">
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
              v-if="student?.image"
              size="100"
              :image="`/storage/${student.image}`"
            />
            <VAvatar
              v-else
              size="100"
              :image="avatar"
            />

            <div class="text-center">
              <h4 class="text-h4">
                {{ abbreviateName(student.name, 15, 2) }}
              </h4>
              <h6 class="text-h6">
                {{ student.role ? abbreviateName(student.role, 20, 2) : 'Content Creator' }}
              </h6>
            </div>
          </VCardTitle>
        </VCardItem>

        <VCardText class="text-center">
          <VRating
            :model-value="getStars(student.id).avgRate"
            half-increments
            readonly
          />
        </VCardText>

        <VCardText>
          <div class="d-flex justify-space-around">
            <div class="text-center">
              <h4 class="text-h4">
                {{ getTaskCount(student.id) }}
              </h4>
              <span class="text-body-1">Tasks</span>
            </div>
            <div class="text-center">
              <h4 class="text-h4">
                {{ getStars(student.id).totalRate }}
              </h4>
              <span class="text-body-1">Stars</span>
            </div>
            <div class="text-center">
              <h4 class="text-h4">
                {{ getStars(student.id).avgRate.toFixed(1) }}
              </h4>
              <span class="text-body-1">Average</span>
            </div>
          </div>

          <div class="d-flex justify-center gap-4 mt-5">
            <VBtn
              prepend-icon="tabler-user-check"
              :variant="(member?.registered ?? false) === (student?.registered ?? false) ? 'elevated' : 'tonal'"
            >
              {{ student?.registered }}
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
