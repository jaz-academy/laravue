<script setup>
import tutorImg1 from '@images/pages/app-academy-tutor-1.png'
import tutorImg2 from '@images/pages/app-academy-tutor-2.png'
import tutorImg3 from '@images/pages/app-academy-tutor-3.png'
import tutorImg4 from '@images/pages/app-academy-tutor-4.png'
import tutorImg5 from '@images/pages/app-academy-tutor-5.png'
import tutorImg6 from '@images/pages/app-academy-tutor-6.png'
import { rand } from '@vueuse/core'

const props = defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
})

const tutorImgs = [tutorImg1, tutorImg2, tutorImg3, tutorImg4, tutorImg5, tutorImg6]

const subject = ref('')
const page = ref(1)
const itemsPerPage = ref(6)

// Courses API filterable & sortable
const {
  data: coursesData,
  execute: fetchCourses,
} = await useApi(createUrl('/courses-distinct', {
  query: {
    q: () => props.searchQuery,
    subject: () => subject.value,
    page: () => page.value,
    itemsPerPage: () => itemsPerPage.value,
  },
}))

console.log("coursesData:", coursesData)

// courses data table
const courses = computed(() => coursesData.value?.data ?? [])
const totalCourses = computed(() => coursesData.value?.count ?? 0)

const subjectSelected = computed(() => {
  if (!coursesData.value?.data) return []
  
  return [...new Set(coursesData.value.data.map(course => course.subject))].sort()
})


const resolveChipColor = tags => {
  if (tags === 'Informatika')
    return 'primary'
  if (tags === 'Multimedia')
    return 'success'
  if (tags === 'Productivity')
    return 'error'
  if (tags === 'Entrepreneur')
    return 'warning'
  else
    return 'info'
}
</script>

<template>
  <VCard class="mb-6">
    <VCardText>
      <!-- 👉 Header -->
      <div class="d-flex justify-space-between align-center flex-wrap gap-4 mb-6">
        <div>
          <h5 class="text-h5">
            My Courses
          </h5>
          <div class="text-body-1">
            Total {{ totalCourses }} course you have purchased
          </div>
        </div>

        <div class="d-flex flex-wrap align-center gap-4">
          <VSelect
            v-model="subject"
            :items="subjectSelected"
            density="compact"
            clearable
            clear-icon="tabler-x"
            style="min-inline-size: 250px;"
          />
        </div>
      </div>

      <!-- 👉 Course List -->
      <div class="mb-6">
        <VRow>
          <template
            v-for="(course, index) in courses"
            :key="course.id"
          >
            <VCol
              cols="12"
              md="4"
              sm="6"
            >
              <VCard
                flat
                border
              >
                <div class="pa-2">
                  <VImg
                    :src="tutorImgs[index % tutorImgs.length]"
                    class="cursor-pointer"
                    @click="() => $router.push({ name: 'academy-course-list' })"
                  />
                </div>
                <VCardText>
                  <div class="d-flex justify-space-between align-center mb-4">
                    <VChip
                      variant="tonal"
                      :color="resolveChipColor(course.subject)"
                      label
                    >
                      {{ course.subject }}
                    </VChip>
                    <div class="d-flex">
                      <VRating
                        :model-value="rand(2.5, 5.0)"
                        half-increments
                        density="compact"
                        size="x-small"
                        readonly=""
                      />
                    </div>
                  </div>
                  <h5 class="text-h5 mb-1">
                    <RouterLink
                      :to="{ name: 'academy-course-list' }"
                      class="course-title"
                    >
                      {{ course.name }}
                    </RouterLink>
                  </h5>
                  <p>
                    {{ course.note }}
                  </p>
                  <div class="d-flex align-center mb-4">
                    <VIcon
                      icon="tabler-video"
                      size="20"
                      class="me-1"
                    />
                    <span class="text-body-1 my-auto"> {{ course.course_count }} Videos</span>
                  </div>
                  <div class="d-flex flex-wrap gap-4">
                    <VBtn
                      variant="tonal"
                      class="flex-grow-1"
                      :to="`/academy/course/details?name=${course.name}&id=${course.first_id}`"
                    >
                      <template #prepend>
                        <VIcon
                          icon="tabler-arrow-right"
                          class="flip-in-rtl"
                        />
                      </template>
                      Continue
                    </VBtn>
                  </div>
                </VCardText>
              </VCard>
            </VCol>
          </template>
        </VRow>
      </div>
      <VPagination
        v-model="page"
        :length="Math.ceil(totalCourses / itemsPerPage)"
      >
        <template #prev="slotProps">
          <VBtn
            variant="tonal"
            color="default"
            v-bind="slotProps"
            :icon="false"
          >
            Previous
          </VBtn>
        </template>
        <template #next="slotProps">
          <VBtn
            variant="tonal"
            color="default"
            v-bind="slotProps"
            :icon="false"
          >
            Next
          </VBtn>
        </template>
      </VPagination>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.course-title{
  &:not(:hover){
    color: rgba(var(--v-theme-on-surface), var(--v-text-high-emphasis))
  }
}
</style>
