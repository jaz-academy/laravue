<script setup>
import Footer from '@/views/front/front-page-footer.vue'
import Navbar from '@/views/front/front-page-navbar.vue'
import HeroSection from '@/views/front/sections/hero-section.vue'
import HomeCard from '@/views/front/sections/HomeCard.vue'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCachedApi } from '@/composables/useCachedApi'

const route = useRoute()
const router = useRouter()

definePage({ meta: { layout: 'blank', public: true } })

const searchQuery = ref(route.query.search || '')
const hasQuery = computed(() => Object.keys(route.query).length > 0)
const activeSectionId = ref(null)
const displayCount = ref(7)
const sentinelRef = ref(null)
let observer = null
let isLoadingMore = false

const { data: rawTasks, loading } = useCachedApi('/public/tasks/best', {
  ttl: 10 * 60 * 1000,
  persist: true,
  swr: true,
})

const allFilteredTasks = computed(() => {
  let list = []
  if (Array.isArray(rawTasks.value)) {
    list = rawTasks.value
  } else if (Array.isArray(rawTasks.value?.data)) {
    list = rawTasks.value.data
  }

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase().trim()
    list = list.filter(task => {
      const authorName = task.authorId?.name?.toLowerCase() || ''
      const authorNick = task.authorId?.nickname?.toLowerCase() || ''
      const caption = task.caption?.toLowerCase() || ''
      const projTitle = task.projectTitle?.toLowerCase() || ''
      const collabs = (task.collaborators || []).some(c =>
        c.name?.toLowerCase().includes(q) || c.nickname?.toLowerCase().includes(q)
      )
      return authorName.includes(q) || authorNick.includes(q) || caption.includes(q) || projTitle.includes(q) || collabs
    })
  }

  return list
})

const tasks = computed(() => {
  return allFilteredTasks.value.slice(0, displayCount.value)
})

const hasMore = computed(() => {
  return displayCount.value < allFilteredTasks.value.length
})

const loadMore = () => {
  if (hasMore.value && !isLoadingMore) {
    isLoadingMore = true
    displayCount.value += 7
    setTimeout(() => {
      isLoadingMore = false
    }, 250)
  }
}

const setupIntersectionObserver = () => {
  if (observer) observer.disconnect()

  observer = new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting && hasMore.value) {
        loadMore()
      }
    },
    { rootMargin: '250px' }
  )

  if (sentinelRef.value) {
    observer.observe(sentinelRef.value)
  }
}

watch(() => allFilteredTasks.value.length, () => {
  displayCount.value = 7
  nextTick(() => {
    setupIntersectionObserver()
  })
})

onMounted(() => {
  nextTick(() => {
    setupIntersectionObserver()
  })
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
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
      v-if="loading && tasks.length === 0"
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
      v-else
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
          :task-name="task.projectTitle || 'Project Task'"
          :description="task.caption"
          :media-type="task.mediaType"
          :media-url="task.mediaUrl"
          :media-urls="task.mediaUrls"
          :grade="task.review?.grade"
          :students="[task.authorId, ...(task.collaborators || [])].filter(Boolean)"
          :teacher="task.review?.mentorName ? { name: task.review.mentorNickname || task.review.mentorName, nickname: task.review.mentorNickname } : null"
          :teacher-img="task.review?.mentorImage || null"
          :review="task.review?.comment || ''"
          :date="task.createdAt"
        />
      </div>
    </div>

    <!-- Sentinel for Infinite Scroll -->
    <div
      ref="sentinelRef"
      class="sentinel-element d-flex justify-center align-center py-6"
    >
      <VProgressCircular
        v-if="hasMore"
        indeterminate
        color="primary"
        size="32"
      />
      <span
        v-else-if="allFilteredTasks.length > 7"
        class="text-caption text-medium-emphasis"
      >
        Semua karya pilihan telah dimuat
      </span>
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
