<script setup>
import { useApi } from '@/composables/useApi'
import Footer from '@/views/front/front-page-footer.vue'
import Navbar from '@/views/front/front-page-navbar.vue'
import TaskCard from '@/views/front/sections/TaskCard.vue'
import { onMounted, ref } from 'vue'

definePage({ meta: { layout: 'blank' } })

const activeSectionId = ref(null)
const tasks = ref([])
const loading = ref(true)

const history = ref([
  { type: 'subheader', title: 'Best of the Week' },
])

const fetchTasks = async () => {
  const generateHistory = (taskData) => {
    const dynamicHistory = [
      { type: 'subheader', title: 'Best of the Week' }
    ]
    taskData.forEach((task, index) => {
      dynamicHistory.push({
        prependAvatar: task.authorId?.image || null,
        students: [task.authorId || { name: 'Unknown User', nickname: 'User' }],
        subtitle: task.caption || 'No description',
      })
      if (index < taskData.length - 1) {
        dynamicHistory.push({ type: 'divider', inset: true })
      }
    })
    history.value = dynamicHistory
  }

  const cachedTasks = localStorage.getItem('jaz_best_tasks')
  if (cachedTasks) {
    try {
      const parsedTasks = JSON.parse(cachedTasks)
      tasks.value = parsedTasks
      generateHistory(parsedTasks)
      loading.value = false
    } catch(e) {}
  } else {
    loading.value = true
  }

  try {
    const { data } = await useApi('/public/tasks/best')
    if (data.value && data.value.data) {
      localStorage.setItem('jaz_best_tasks', JSON.stringify(data.value.data))
      tasks.value = data.value.data
      generateHistory(data.value.data)
    }
  } catch (error) {
    console.error('Failed to fetch tasks:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTasks()
})
</script>

<template>
  <div class="landing-page-wrapper">
    <Navbar :active-id="activeSectionId" />
    
    <!-- CONTENT POSTING -->
    <div class="instagram-card">
      <VRow class="m-0 p-0">
        <!-- HISTORY LIST -->
        <VCol
          class="d-none d-lg-block"
          cols="12"
          lg="4"
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
                      class="me-1 mt-2"
                    >
                      <VImg
                        v-if="item.students[0].image"
                        :src="item.students[0].image"
                      />
                      <span v-else>{{ item.students[0].nickname.charAt(0) }}</span>
                    </VAvatar>
                  </template>
                  <VListItemTitle>{{ item.students.length > 1 ? item.students[0].nickname + ' And ' + (item.students.length - 1) + ' others' : item.students[0].name }}</VListItemTitle>
                  <VListItemSubtitle>{{ item.subtitle }}</VListItemSubtitle>
                </VListItem>

                <VDivider
                  v-else-if="item.type === 'divider'"
                  :key="`divider-${index}`"
                  inset
                />

                <VListSubheader
                  v-else-if="item.type === 'subheader'"
                  class="ps-3 mb-2 font-weight-medium text-primary"
                >
                  {{ item.title }}
                </VListSubheader>
              </template>
            </VList>
          </VCard>
        </VCol>

        <!-- PROJECT CARD -->
        <VCol
          cols="12"
          lg="8"
        >
          <div class="project-list-container">
            <div
              v-if="loading"
              class="text-center py-16"
            >
              <VProgressCircular
                indeterminate
                color="primary"
                size="40"
              />
            </div>
            <div
              v-else-if="tasks.length === 0"
              class="text-center py-16"
            >
              <p class="text-h6 text-medium-emphasis">
                No tasks found.
              </p>
            </div>
            <div
              v-for="task in tasks"
              :key="task._id"
            >
              <TaskCard
                :task-id="task._id"
                :task-name="task.caption || 'Project Task'"
                :description="task.caption"
                :media-type="task.mediaType"
                :media-url="task.mediaUrl"
                :media-urls="task.mediaUrls"
                :grade="task.review?.grade"
                :students="[task.authorId]"
                :review="task.review?.comment || ''"
                :date="task.createdAt"
              />
            </div>
          </div>
        </VCol>
      </VRow>
    </div>

    <!-- 👉 Footer -->
    <Footer />
  </div>
</template>

<style lang="scss">
.instagram-card {
  inline-size: 90%;
  margin-block-start: 1.5rem;
  margin-inline: auto;
  padding-block: 5rem;
}

.project-list-container {
  margin-block: 0;
  width: 100%;
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
