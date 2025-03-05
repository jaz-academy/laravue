<script setup>
import { fetchProjectData, instagramTasks } from '@/composables/fetchProjectData'
import Footer from '@/views/front/front-page-footer.vue'
import Navbar from '@/views/front/front-page-navbar.vue'
import InstagramCard from '@/views/front/sections/InstagramCard.vue'
import avatar1 from '@images/avatars/avatar-1.png'
import { onMounted, ref, watch } from 'vue'

const taskData = ref(null) // Data reaktif
const history = ref([])

onMounted(async () => {
  await fetchProjectData()
  taskData.value = instagramTasks.value?.data

  // Perbarui history setelah data task tersedia
  if (taskData.value) {
    updateHistory()
  }
})

taskData.value = instagramTasks.value.data

// console.log(instagramTasks)

definePage({ meta: { layout: 'blank' } })

const activeSectionId = ref()
const refHome = ref()
const refFeatures = ref()
const refTeam = ref()
const refContact = ref()
const refFaq = ref()

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




// Debugging
watch(taskData, newValue => {
  console.log('Task data updated:', newValue)
})

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
    
    <!-- CONTENT POSTING -->
    <div class="instagram-card">
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
          <div>
            <div
              v-for="task in taskData"
              :key="task.id"
            >
              <InstagramCard
                :task-name="task.name"
                :description="task.description"
                :subject="task.project_plan.subject"
                :theme="task.project_plan.theme"
                :stars="task.rate"
                :media="task.media"
                :post-id="task.link?.match(/\/(?:p|reel)\/([\w-]+)/)?.[1] || 'N/A'"
                :student-name="task.admin_student.name"
                :nickname="task.admin_student.nickname"
                :email="task.admin_student.email"
                :mentor="task.admin_teacher?.nickname || 'Not Accepted'"
                :review="task?.review || null"
              />
            </div>
          </div>
        </VCol>
      </VRow>
    </div>
  </div>

  <!-- 👉 Footer -->
  <Footer />
</template>

<style lang="scss">
.instagram-card {
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
  .instagram-card {
    max-inline-size: calc(1440px - 32px);
  }
}

@media (min-width: 1280px) and (max-width: 1919px) {
  .instagram-card {
    max-inline-size: calc(1200px - 32px);
  }
}

@media (min-width: 960px) and (max-width: 1279px) {
  .instagram-card {
    max-inline-size: calc(900px - 32px);
  }
}

@media (min-width: 600px) and (max-width: 959px) {
  .instagram-card {
    max-inline-size: calc(100% - 64px);
  }
}

@media (max-width: 600px) {
  .instagram-card {
    max-inline-size: calc(100% - 32px);
  }
}
</style>
