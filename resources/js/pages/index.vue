<script setup>
import Footer from '@/views/front/front-page-footer.vue'
import Navbar from '@/views/front/front-page-navbar.vue'
import HeroSection from '@/views/front/sections/hero-section.vue'
import HomeCard from '@/views/front/sections/HomeCard.vue'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCachedApi } from '@/composables/useCachedApi'

const route = useRoute()
const router = useRouter()
const searchQuery = ref(route.query.search || '')
const hasQuery = computed(() => Object.keys(route.query).length > 0)
const activeSectionId = ref(null)

const { data: rawTasks, loading } = useCachedApi('/public/tasks/best', {
  ttl: 10 * 60 * 1000,
  persist: true,
  swr: true,
})

const tasks = computed(() => {
  if (Array.isArray(rawTasks.value)) {
    return rawTasks.value.slice(0, 6)
  }
  if (Array.isArray(rawTasks.value?.data)) {
    return rawTasks.value.data.slice(0, 6)
  }
  return []
})

const applySearch = () => {
  router.push({ query: { ...route.query, search: searchQuery.value } })
}

watch(() => route.query.search, val => {
  searchQuery.value = val || ''
})
</script>

<template>
  <div class="landing-page-wrapper">
    <Navbar :active-id="activeSectionId" />

    <!-- 👉 Hero Section  -->
    <HeroSection
      ref="refHome"
      class="mb-8 mb-md-12"
    />

    <div
      v-if="loading"
      class="text-center py-10 w-100"
    >
      <VProgressCircular
        indeterminate
        color="primary"
      />
    </div>
    <div
      v-else-if="tasks.length === 0"
      class="text-center py-10 w-100"
    >
      No tasks available.
    </div>
    <div
      id="content-post"
      class="masonry-container homecard"
    >
      <div
        v-for="task in tasks"
        :key="task._id"
        class="masonry-item"
      >
        <HomeCard
          class="card-post"
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

    <!-- 👉 Footer -->
    <Footer />
  </div>
</template>

<style lang="scss">
.masonry-container {
  column-count: 1;
  column-gap: 1.5rem;
  margin-block: 0;
  margin-inline: auto;
  max-inline-size: 1440px;
  padding-block: 0;
  padding-inline: 0 !important;
  
  @media (min-width: 600px) {
    column-count: 2;
  }
  
  @media (min-width: 1280px) {
    column-count: 3;
  }
}

.masonry-item {
  break-inside: avoid;
  margin-block-end: 1.5rem;
}

.card-post {
  overflow: hidden;
  border-radius: 0.75rem;
  margin: 0;
  inline-size: 100%;
}

.landing-page-wrapper {
  background-color: rgb(var(--v-theme-background));
  min-block-size: 100vh;
}

@media (min-width: 600px) {
  .landing-page-wrapper {
    .v-container {
      padding-inline: 2rem !important;
    }
  }
}

.sticky-header {
  position: sticky;
  z-index: 9;
  inset-block: 0;
  transition: all 0.3s ease-in-out;
}

.homecard {
  inline-size: 100%;
  margin-inline: auto;

  @media (min-width: 1920px) { max-inline-size: calc(1440px - 32px); }

  @media (min-width: 1280px) and (max-width: 1919px) { max-inline-size: calc(1200px - 32px); }

  @media (min-width: 960px) and (max-width: 1279px) { max-inline-size: calc(900px - 32px); }

  @media (min-width: 600px) and (max-width: 959px) { max-inline-size: calc(100% - 64px); }

  @media (max-width: 600px) {
    inline-size: 100%;
    max-inline-size: calc(100% - 32px);
  }
}
</style>
