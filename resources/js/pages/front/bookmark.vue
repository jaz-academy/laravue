<script setup>
import Footer from '@/views/front/front-page-footer.vue'
import Navbar from '@/views/front/front-page-navbar.vue'
import ParticipantInfo from '@/views/front/sections/participant-info.vue'
import PostingCard from '@/views/front/sections/PostingCard.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

definePage({ meta: { layout: 'blank' } })

const hasQuery = computed(() => Object.keys(route.query).length > 0);
const participant = ref(null)
const activeSectionId = ref()
const refHome = ref()
const refFeatures = ref()
const refTeam = ref()
const refContact = ref()
const refFaq = ref()
const bookmarks = ref([])
const route = useRoute()
const tasks = ref([])

async function fetchTasks() {
  const params = {}
  if (route.query.id) { params.id = route.query.id }
  if (route.query.name) { params.name = route.query.name }
  if (route.query.theme) { params.theme = route.query.theme }
  if (route.query.mentor) { params.mentor = route.query.mentor }
  if (route.query.stars) { params.stars = route.query.stars }
  const response = await useApi('/public/tasks', { params })
  tasks.value = response.data.value.data
}

onMounted( async () => {
  fetchTasks()
  loadTasksIfLoggedIn()
})


const loadTasksIfLoggedIn = async () => {
  const data = localStorage.getItem('participant')
  participant.value = data ? JSON.parse(data) : null
  if (participant.value) {
    const participantId = participant.value.id
    const { data } = await useApi(`/public/bookmarks-by-participant/${participantId}`)
    bookmarks.value = data.value.data
  } else {
    bookmarks.value = []
  }
}
console.log('participant :', participant);
console.log('bookmarks :', bookmarks.value);
console.log('tasks :', tasks.value);

const handleLoginStatus = async (isLoggedIn) => {
    await loadTasksIfLoggedIn()
}
</script>

<template>
  <div class="landing-page-wrapper">
    <Navbar :active-id="activeSectionId" />

    <ParticipantInfo ref="refHome" @loginStatus="handleLoginStatus" />

    <div class="bookmark-card" v-if="!hasQuery && bookmarks.length">
      <div
        v-for="mark in bookmarks"
        :key="mark.id"
      >
        <PostingCard 
          class="card-post"
          :task-name="mark.project_task?.name"
          :description="mark.project_task?.description"
          :subject="mark.project_task?.project_plan?.subject"
          :theme="mark.project_task?.project_plan?.theme"
          :stars="mark.project_task?.rate"
          :media="mark.project_task?.media"
          :post-id="mark.project_task?.media == 'Instagram' ? mark.project_task?.link?.match(/\/(?:p|reel)\/([\w-]+)/)?.[1] : mark.project_task?.link?.match(/\/d\/(.*?)\//)?.[1] || 'N/A'"
          :student-name="mark.project_task?.admin_student?.name"
          :nickname="mark.project_task?.admin_student?.nickname"
          :email="mark.project_task?.admin_student?.email"
          :mentor="mark.project_task?.admin_teacher?.nickname || 'Not Accepted'"
          :review="mark.project_task?.review || null"
        />
      </div>
    </div>
    <div class="task-card" v-else>
      <div
        v-for="task in tasks"
        :key="task.id"
      >
        <PostingCard 
          class="card-post"
          :task-name="task.project_task?.name"
          :description="task.project_task?.description"
          :subject="task.project_task?.project_plan?.subject"
          :theme="task.project_task?.project_plan?.theme"
          :stars="task.project_task?.rate"
          :media="task.project_task?.media"
          :post-id="task.project_task?.media == 'Instagram' ? task.project_task?.link?.match(/\/(?:p|reel)\/([\w-]+)/)?.[1] : task.project_task?.link?.match(/\/d\/(.*?)\//)?.[1] || 'N/A'"
          :student-name="task.project_task?.admin_student?.name"
          :nickname="task.project_task?.admin_student?.nickname"
          :email="task.project_task?.admin_student?.email"
          :mentor="task.project_task?.admin_teacher?.nickname || 'Not Accepted'"
          :review="task.project_task?.review || null"
        />
      </div>
    </div>

    <!-- 👉 Footer -->
    <Footer />
  </div>
</template>

<style lang="scss">
.card-post {
  inline-size: 90%;
  margin-block-start: 1.5rem;
  margin-inline: auto;
}

.bookmark-card {
  padding-block: 0 5rem;
}

@media (min-width: 600px) {
  .landing-page-wrapper {
    .v-container {
      padding-inline: 2rem !important;
    }
  }
}
</style>
