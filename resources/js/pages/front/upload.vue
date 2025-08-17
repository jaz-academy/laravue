<script setup>
import { fetchProjectData, uploadTasks } from '@/composables/fetchProjectData'
import Footer from '@/views/front/front-page-footer.vue'
import Navbar from '@/views/front/front-page-navbar.vue'
import PostingCard from '@/views/front/sections/PostingCard.vue'
import avatar1 from '@images/avatars/avatar-1.png'
import { onMounted, ref } from 'vue'

const taskData = ref(null) // Data reaktif
const history = ref([])
const isLoading = ref(false) // Prevent multiple fetches
const page = ref(2)

console.log('uploadTask:', uploadTasks.value)

onMounted(async () => {
  await fetchProjectData()
  taskData.value = uploadTasks.value?.data

  // Perbarui history setelah data task tersedia
  if (taskData.value) {
    updateHistory()
  }
  window.addEventListener('scroll', handleScroll)
})

const handleScroll = async () => {
  const scrollPosition = window.scrollY + window.innerHeight
  const threshold = document.documentElement.scrollHeight - 10

  if (scrollPosition >= threshold && !isLoading.value) {
    isLoading.value = true

    const moreTasks = await fetchMoreUploadTasks(page.value++)
    
    if (moreTasks.data?.length) {
      taskData.value.push(...moreTasks.data)
      updateHistory() // Perbarui history setelah menambahkan lebih banyak tugas
    }
    isLoading.value = false
  }
}

// Fungsi untuk memperbarui history
function updateHistory() {
  history.value = [
    { type: 'subheader', title: 'Best of the Week' },
    ...taskData.value
      .filter(task => task.rate >= 4) // Filter tugas dengan rate >= 4
      .flatMap(task => [
        {
          prependAvatar: avatar1, // Misalnya, gunakan avatar default
          title: task.admin_student?.name || 'Unknown Student',
          subtitle: task.name || 'No Task Name',
        },
        { type: 'divider', inset: true },
      ]),
  ]
}

definePage({ meta: { layout: 'blank' } })

const activeSectionId = ref()
const refHome = ref()
const refFeatures = ref()
const refTeam = ref()
const refContact = ref()
const refFaq = ref()

useIntersectionObserver([
  refHome,
  refFeatures,
  refTeam,
  refContact,
  refFaq,
], ([{ isIntersecting, target }]) => {
  if (isIntersecting)
    activeSectionId.value = target.id
}, { threshold: 0.25 })
</script>

<template>
  <div class="landing-page-wrapper">
    <Navbar :active-id="activeSectionId" />

    <div class="upload-card">
      <VRow class="m-0 p-0">
        <VCol
          class="d-none d-lg-block"
          cols="12"
          lg="3"
        >
          <VCard style="position: sticky; inset-block-start: 6rem;">
            <VList lines="three">
              <template
                v-for="(item, index) in history"
                :key="index"
              >
                <VListItem
                  v-if="item.prependAvatar"
                  class="custom-list-item"
                >
                  <template #prepend>
                    <VAvatar
                      size="34"
                      variant="tonal"
                      color="primary"
                      class="me-3"
                    >
                      <VImg
                        v-if="avatar"
                        :src="avatar"
                      />
                      <span v-else>{{ avatarText(item.title) }}</span>
                    </VAvatar>
                  </template>
                  <VListItemTitle>{{ item.title }}</VListItemTitle>
                  <VListItemSubtitle>{{ item.subtitle }}</VListItemSubtitle>
                </VListItem>

                <VDivider
                  v-else-if="item.type === 'divider'"
                  :key="`divider-${index}`"
                  inset
                />

                <VSubheader
                  v-else-if="item.type === 'subheader'"
                  class="ps-3 mb-2 font-weight-medium text-primary"
                >
                  {{ item.title }}
                </VSubheader>
              </template>
            </VList>
          </VCard>
        </VCol>
        <VCol
          cols="12"
          lg="9"
        >
          <div
            v-for="task in taskData"
            :key="task.id"
          >
            <PostingCard
              :task-id="task.id"
              :task-name="task.name"
              :description="task.description"
              :subject="task.project_plan.subject"
              :theme="task.project_plan.theme"
              :stars="task.rate"
              :media="task.media"
              :post-id="task.link?.match(/\/d\/(.*?)\//)?.[1] || 'N/A'"
              :student-name="task.admin_student.name"
              :nickname="task.admin_student.nickname"
              :email="task.admin_student.email"
              :teacher="task.admin_teacher ? { id: task.admin_teacher.id, name: task.admin_teacher.nickname } : 'Not Accepted'"
              :student-img="task.admin_student?.image"
              :teacher-img="task.admin_teacher?.image"
              :accepted="task.accepted"
              :review="task?.review || null"
            />
          </div>
        </VCol>
      </VRow>
    </div>

    <!-- 👉 Footer -->
    <Footer />
  </div>
</template>

<style lang="scss">
.upload-card {
  inline-size: 90%;
  margin-block-start: 1.5rem;
  margin-inline: auto;
  padding-block: 5rem;
}

@media (min-width: 600px) {
  .landing-page-wrapper {
    .v-container {
      padding-inline: 2rem !important;
    }
  }
}

@media (min-width: 1920px) {
  .upload-card {
    max-inline-size: calc(1440px - 32px);
  }
}

@media (min-width: 1280px) and (max-width: 1919px) {
  .upload-card {
    max-inline-size: calc(1200px - 32px);
  }
}

@media (min-width: 960px) and (max-width: 1279px) {
  .upload-card {
    max-inline-size: calc(900px - 32px);
  }
}

@media (min-width: 600px) and (max-width: 959px) {
  .upload-card {
    max-inline-size: calc(100% - 64px);
  }
}

@media (max-width: 600px) {
  .upload-card {
    max-inline-size: calc(100% - 32px);
  }
}
</style>
