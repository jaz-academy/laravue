<script setup>
import Footer from '@/views/front/front-page-footer.vue'
import Navbar from '@/views/front/front-page-navbar.vue'
import ParticipantInfo from '@/views/front/sections/participant-info.vue'
import PostingCard from '@/views/front/sections/PostingCard.vue'
import { onMounted, ref } from 'vue'

definePage({ meta: { layout: 'blank' } })

const participant = ref(null)
const activeSectionId = ref()
const refHome = ref()
const bookmarks = ref([])

onMounted( async () => {
  loadTasksIfLoggedIn()
})

const loadTasksIfLoggedIn = async () => {
  const data = localStorage.getItem('participant')

  participant.value = data ? JSON.parse(data) : null
  if (participant.value) {
    const participantId = participant.value.id
    const { data } = await useApi(`/public/bookmarks-by-participant/${participantId}`)
    if (data.value.data) {
      bookmarks.value = data.value.data

      // console.log('bookmarks :', bookmarks.value)
    }
  } else {
    bookmarks.value = []
  }

  // console.log('participant :', participant.value)
}

const handleLoginStatus = async () => {
  await loadTasksIfLoggedIn()
}
</script>

<template>
  <div class="landing-page-wrapper">
    <Navbar :active-id="activeSectionId" />

    <ParticipantInfo
      ref="refHome"
      @login-status="handleLoginStatus"
    />

    <div 
      v-if="bookmarks.length" 
      class="bookmark-card"
    >
      <div
        v-for="mark in bookmarks.filter(Boolean)"
        :key="mark.id || mark._id || mark"
      >
        <PostingCard 
          class="card-post"
          :task-id="mark.project_task?.id"
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
          :teacher="mark.project_task?.admin_teacher ? { id: mark.project_task?.admin_teacher.id, name: mark.project_task?.admin_teacher.nickname } : 'Not Accepted'"
          :student-img="mark.project_task?.admin_student?.image"
          :teacher-img="mark.project_task?.admin_teacher?.image"
          :accepted="mark.project_task?.accepted"
          :review="mark.project_task?.review || null"
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
