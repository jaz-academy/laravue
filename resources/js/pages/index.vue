<script setup>
import { fetchProjectData, homeTasks } from '@/composables/fetchProjectData'
import Footer from '@/views/front/front-page-footer.vue'
import Navbar from '@/views/front/front-page-navbar.vue'
import HeroSection from '@/views/front/sections/hero-section.vue'
import HomeCard from '@/views/front/sections/HomeCard.vue'

const taskData = ref(null) // Data reaktif

onMounted(() => {
  fetchProjectData()
})

taskData.value = homeTasks.value.data

console.log(homeTasks)

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

    <!-- 👉 Hero Section  -->
    <HeroSection ref="refHome" />

    <h1 class="my-16 text-center">
      .
    </h1>

    <div
      id="content-post"
      class="my-16"
    >
      <div
        v-for="task in taskData"
        :key="task.id"
      >
        <HomeCard
          class="card-post"
          :task-name="task.name"
          :description="task.description"
          :subject="task.project_plan.subject"
          :theme="task.project_plan.theme"
          :stars="task.rate"
          :media="task.media"
          :post-id="task.media == 'Instagram' ? task.link?.match(/\/(?:p|reel)\/([\w-]+)/)?.[1] : task.link?.match(/\/d\/(.*?)\//)?.[1] || 'N/A'"
          :student-name="task.admin_student.name"
          :nickname="task.admin_student.nickname"
          :email="task.admin_student.email"
          :mentor="task.admin_teacher?.nickname || 'Not Accepted'"
          :review="task?.review || null"
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

@media (min-width: 600px) {
  .landing-page-wrapper {
    .v-container {
      padding-inline: 2rem !important;
    }
  }
}
</style>
