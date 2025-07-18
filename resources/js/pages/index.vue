<script setup>
import { useApi } from '@/composables/useApi'
import Footer from '@/views/front/front-page-footer.vue'
import Navbar from '@/views/front/front-page-navbar.vue'
import HeroSection from '@/views/front/sections/hero-section.vue'
import HomeCard from '@/views/front/sections/HomeCard.vue'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const searchQuery = ref(route.query.search || '')
const hasQuery = computed(() => Object.keys(route.query).length > 0)
const tasks = ref([])
const page = ref(1)
const perPage = ref(3)
const search = ref(route.query.search || '')
const loading = ref(false)
const hasMore = ref(true)
const activeSectionId = ref(null)

const scrollContainer = ref(null)
const loadMoreTrigger = ref(null)

const applySearch = () => {
  router.push({ query: { ...route.query, search: searchQuery.value } })
}

const loadTasks = async () => {
  if (loading.value || !hasMore.value) return

  loading.value = true

  const { data } = await useApi(`/public/tasks?page=${page.value}&perPage=${perPage.value}&search=${search.value}`)
  const newTasks = data.value?.data || []

  if (newTasks.length) {
    tasks.value.push(...newTasks)
    page.value++
  } else {
    hasMore.value = false
  }

  loading.value = false
}

watch(() => route.query.search, async val => {
  searchQuery.value = val || ''
  page.value = 1
  tasks.value = []
  hasMore.value = true
  await loadTasks()
  console.log(tasks.value)
})

// Pakai IntersectionObserver biar lebih smooth
let observer

onMounted(async () => {
  await loadTasks()

  await nextTick()
  if (loadMoreTrigger.value) {
    observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) loadTasks()
    })
    observer.observe(loadMoreTrigger.value)
  }
})

onUnmounted(() => {
  if (observer && loadMoreTrigger.value) {
    observer.unobserve(loadMoreTrigger.value)
  }
})
</script>

<template>
  <div class="landing-page-wrapper">
    <Navbar :active-id="activeSectionId" />

    <!-- 👉 Hero Section  -->
    <HeroSection
      v-if="!hasQuery"
      ref="refHome"
      class="mb-16"
    />

    <div
      v-if="hasQuery"
      class="text-center sticky-header bg-background pb-8"
    >
      <br><br>
      <div
        class="input-group mt-16 justify-center"
        style="display: flex; align-items: center; gap: 0.5rem;"
      >
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by Id, Name, Mentor, Theme..."
          class="border w-50 px-3 py-2 rounded"
          @keyup.enter="applySearch"
        >
        <a
          :href="`?search=${encodeURIComponent(searchQuery)}`"
          class="btn btn-primary"
        ><VBtn>
          <VIcon icon="tabler-search" />
        </VBtn></a>
      </div>
    </div>
    <div
      v-else
      class="text-center my-16 py-2"
    >
      .
    </div>

    <div
      id="content-post"
      ref="scrollContainer"
    >
      <div
        v-for="task in tasks"
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
          :teacher="task.admin_teacher ? { id: task.admin_teacher.id, name: task.admin_teacher.nickname } : 'Not Accepted'"
          :accepted="task.accepted"
          :link="task.link"
        />
      </div>
      <div
        ref="loadMoreTrigger"
        class="py-4 text-center text-gray-400"
      >
        Loading more...
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

.sticky-header {
  position: sticky;
  z-index: 9;
  inset-block: 0;
  transition: all 0.3s ease-in-out;
}
</style>
