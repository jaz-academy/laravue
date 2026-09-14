<script setup>
import Footer from '@/views/front/front-page-footer.vue'
import Navbar from '@/views/front/front-page-navbar.vue'
import HomeCard from '@/views/front/sections/HomeCard.vue'
import { useWindowScroll } from '@vueuse/core'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useCachedApi } from '@/composables/useCachedApi'

definePage({ meta: { layout: 'blank', public: true } })

const activeSectionId = ref(null)
const displayCount = ref(6)
const gridColumns = ref(1) // 1 or 2 columns on md-xl
const sentinelRef = ref(null)
let observer = null

const { data: rawTasks, loading } = useCachedApi('/public/tasks/best', {
  ttl: 10 * 60 * 1000,
  persist: true,
  swr: true,
})

const allTasks = computed(() => {
  if (Array.isArray(rawTasks.value)) {
    return rawTasks.value
  }
  if (Array.isArray(rawTasks.value?.data)) {
    return rawTasks.value.data
  }
  return []
})

const { y } = useWindowScroll()
const lastScrollY = ref(0)
const isHeaderVisible = ref(true)

watch(y, (newY) => {
  const diff = newY - lastScrollY.value

  if (newY <= 60) {
    isHeaderVisible.value = true
  } else if (diff > 8) {
    // Scrolling down -> header slides up
    isHeaderVisible.value = false
  } else if (diff < -8) {
    // Scrolling up -> header slides down
    isHeaderVisible.value = true
  }
  lastScrollY.value = newY
})

const displayedTasks = computed(() => {
  return allTasks.value.slice(0, displayCount.value)
})

const hasMore = computed(() => {
  return displayCount.value < allTasks.value.length
})

const loadMore = () => {
  if (hasMore.value) {
    displayCount.value += 6
  }
}

const bestTasks = computed(() => {
  return allTasks.value.slice(0, 5)
})

const setupIntersectionObserver = () => {
  if (observer) observer.disconnect()

  observer = new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting && hasMore.value) {
        loadMore()
      }
    },
    { rootMargin: '200px' }
  )

  if (sentinelRef.value) {
    observer.observe(sentinelRef.value)
  }
}

onMounted(() => {
  setupIntersectionObserver()
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <div class="landing-page-wrapper">
    <Navbar :active-id="activeSectionId" />

    <!-- CONTENT POSTING -->
    <div class="instagram-card">
      <VRow class="m-0 p-0">
        <!-- SIDEBAR: BEST OF THE WEEK -->
        <VCol
          class="d-none d-lg-block"
          cols="12"
          lg="4"
        >
          <VCard
            class="rounded-xl border pa-4 best-sidebar-card"
            :class="isHeaderVisible ? 'header-visible' : 'header-hidden'"
            elevation="0"
          >
            <!-- Header -->
            <div class="d-flex align-center justify-space-between pb-3 mb-3 border-b">
              <div class="d-flex align-center gap-2">
                <VAvatar
                  size="32"
                  color="warning"
                  variant="tonal"
                  class="rounded-lg"
                >
                  <VIcon
                    icon="tabler-trophy"
                    size="18"
                    color="warning"
                  />
                </VAvatar>
                <div>
                  <h6 class="text-subtitle-1 font-weight-bold mb-0">
                    Best of the Week
                  </h6>
                  <span class="text-caption text-medium-emphasis">Karya pilihan teratas</span>
                </div>
              </div>
              <VChip
                size="x-small"
                color="warning"
                variant="flat"
                class="font-weight-bold"
              >
                Top {{ bestTasks.length }}
              </VChip>
            </div>

            <!-- List items -->
            <div
              v-if="loading && bestTasks.length === 0"
              class="text-center py-6"
            >
              <VProgressCircular
                indeterminate
                color="primary"
                size="24"
              />
            </div>

            <div
              v-else-if="bestTasks.length === 0"
              class="text-center py-6 text-caption text-medium-emphasis"
            >
              Belum ada data karya pilihan.
            </div>

            <div
              v-else
              class="d-flex flex-column gap-2"
            >
              <div
                v-for="(task, idx) in bestTasks"
                :key="task._id || idx"
                class="d-flex align-start pa-2 rounded-lg best-item-card transition-swing"
              >
                <!-- Rank Badge -->
                <div class="me-3 mt-1 d-flex flex-column align-center">
                  <VAvatar
                    :color="idx === 0 ? 'warning' : idx === 1 ? 'secondary' : idx === 2 ? 'primary' : 'default'"
                    :variant="idx < 3 ? 'flat' : 'tonal'"
                    size="24"
                    class="font-weight-bold text-caption text-white"
                  >
                    {{ idx + 1 }}
                  </VAvatar>
                </div>

                <!-- User & Task info -->
                <div class="d-flex flex-column flex-grow-1 overflow-hidden">
                  <div class="d-flex align-center gap-2 mb-1">
                    <VAvatar
                      size="24"
                      variant="tonal"
                      color="primary"
                    >
                      <VImg
                        v-if="task.authorId?.image"
                        :src="task.authorId.image"
                      />
                      <span
                        v-else
                        class="text-xs"
                      >{{ (task.authorId?.nickname || task.authorId?.name || 'U').charAt(0).toUpperCase() }}</span>
                    </VAvatar>
                    <span class="text-caption font-weight-semibold text-truncate">
                      {{ task.authorId?.name || task.authorId?.nickname || 'Peserta' }}
                    </span>
                  </div>

                  <p class="text-caption text-medium-emphasis text-truncate mb-0">
                    {{ task.caption || 'Tanpa keterangan' }}
                  </p>
                </div>

                <!-- Grade / Score Badge if any -->
                <div
                  v-if="task.review?.grade"
                  class="ms-2 mt-1"
                >
                  <VChip
                    size="x-small"
                    color="success"
                    variant="tonal"
                    class="font-weight-bold"
                  >
                    {{ task.review.grade }}
                  </VChip>
                </div>
              </div>
            </div>
          </VCard>
        </VCol>

        <!-- PROJECT TASKS FEED -->
        <VCol
          cols="12"
          lg="8"
        >
          <div class="project-list-container">
            <!-- View Mode Switcher for md & larger -->
            <div class="d-flex align-center justify-space-between mb-4">
              <div class="d-flex align-center gap-2">
                <h5 class="text-h6 font-weight-bold mb-0">
                  Semua Projek
                </h5>
                <VChip
                  v-if="allTasks.length > 0"
                  size="small"
                  color="primary"
                  variant="tonal"
                >
                  {{ displayedTasks.length }} / {{ allTasks.length }}
                </VChip>
              </div>

              <!-- Switch 1 or 2 cards layout on md-xl -->
              <div class="d-none d-md-flex align-center border rounded-lg p-1 bg-surface">
                <VBtn
                  icon="tabler-layout-list"
                  size="small"
                  variant="text"
                  :color="gridColumns === 1 ? 'primary' : 'secondary'"
                  :class="{ 'bg-primary-subtle': gridColumns === 1 }"
                  @click="gridColumns = 1"
                >
                  <VIcon
                    icon="tabler-layout-list"
                    size="18"
                  />
                  <VTooltip
                    activator="parent"
                    location="top"
                  >
                    1 Kolom
                  </VTooltip>
                </VBtn>
                <VBtn
                  icon="tabler-layout-grid"
                  size="small"
                  variant="text"
                  :color="gridColumns === 2 ? 'primary' : 'secondary'"
                  :class="{ 'bg-primary-subtle': gridColumns === 2 }"
                  @click="gridColumns = 2"
                >
                  <VIcon
                    icon="tabler-layout-grid"
                    size="18"
                  />
                  <VTooltip
                    activator="parent"
                    location="top"
                  >
                    2 Kolom
                  </VTooltip>
                </VBtn>
              </div>
            </div>

            <!-- Loading State -->
            <div
              v-if="loading && allTasks.length === 0"
              class="text-center py-16"
            >
              <VProgressCircular
                indeterminate
                color="primary"
                size="40"
              />
            </div>

            <!-- Empty State -->
            <div
              v-else-if="allTasks.length === 0"
              class="text-center py-16"
            >
              <p class="text-h6 text-medium-emphasis">
                Belum ada tugas yang dipublikasikan.
              </p>
            </div>

            <!-- Task Grid / Feed (Masonry Style) -->
            <div
              v-else
              class="masonry-container"
              :class="{ 'columns-1': gridColumns === 1, 'columns-2': gridColumns === 2 }"
            >
              <div
                v-for="task in displayedTasks"
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

            <!-- Sentinel for Lazy Loading -->
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
                v-else-if="allTasks.length > 0"
                class="text-caption text-medium-emphasis"
              >
                Semua karya telah dimuat
              </span>
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

  .masonry-container {
    column-count: 1;
    column-gap: 1.5rem;
    margin-block: 0;
    margin-inline: auto;
    width: 100%;
    padding-block: 0;
    padding-inline: 0 !important;

    @media (min-width: 600px) {
      column-count: 2;
    }

    &.columns-1 {
      column-count: 1 !important;
    }

    &.columns-2 {
      @media (min-width: 600px) {
        column-count: 2 !important;
      }
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
}

.best-sidebar-card {
  background-color: rgb(var(--v-theme-surface));
  border-radius: 0.75rem !important;
  position: sticky !important;
  transition: inset-block-start 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;

  &.header-visible {
    inset-block-start: 6rem !important;
  }

  &.header-hidden {
    inset-block-start: 1.5rem !important;
  }
}

.best-item-card {
  transition: background-color 0.2s ease, transform 0.15s ease;

  &:hover {
    background-color: rgba(var(--v-theme-primary), 0.04);
  }
}

.bg-primary-subtle {
  background-color: rgba(var(--v-theme-primary), 0.12) !important;
}

.sentinel-element {
  min-height: 48px;
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
