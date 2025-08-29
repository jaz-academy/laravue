<script setup>
import { useApi } from '@/composables/useApi'
import avatar from '@images/avatars/no-profile.png'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import 'videojs-youtube'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const itemData = ref(null)
const courseDetails = ref([])
const panelStatus = ref(0)

const loadCourseById = async id => {
  const { data: CourseData } = await useApi(`/courses/${id}`)

  itemData.value = CourseData.value.data
}


const loadCourseByName = async name => {
  const cleanName = name.trim()
  const { data } = await useApi(`/courses-by-name/${encodeURIComponent(cleanName)}`)
  if (data.value) courseDetails.value = data.value.data
  console.log("clean: ", cleanName)
  
}


console.log("itemData: ", itemData)

const refreshData = () => {
  if (route.query.id) loadCourseById(route.query.id)
  if (route.query.name) loadCourseByName(route.query.name)
}

// pertama kali
onMounted(refreshData)

// saat query berubah
watch(() => route.query, refreshData, { deep: true })

const distinctSections = computed(() => {
  return [...new Set(courseDetails.value?.map(item => item.section))]
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] ?? 0, 10)
      const numB = parseInt(b.match(/\d+/)?.[0] ?? 0, 10)
      
      return numA - numB
    })
})

const filteredBySection = sectionName => {
  return courseDetails.value
    .filter(item => item.section === sectionName)
    .sort((a, b) => {
      const numA = parseInt(a.title, 10)
      const numB = parseInt(b.title, 10)
      
      return numA - numB
    })
}

// Checkbox langsung cek berdasarkan id route
const isPlayed = topicId => Number(route.query.id) === Number(topicId)

// Deteksi source video (YouTube / MP4)
const videoSource = computed(() => {
  if (!itemData.value?.video_url) return null

  let url = itemData.value.video_url

  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return { src: url, type: 'youtube' }
  }

  // Google Drive
  if (url.includes('drive.google.com')) {
    const match = url.match(/\/d\/([^/]+)/)
    if (match && match[1]) {
      return { 
        src: `https://drive.google.com/file/d/${match[1]}/preview`, 
        type: 'gdrive', 
      }
    }
  }

  // Default MP4
  return { src: url, type: 'mp4' }
})
</script>

<template>
  <VCard class="overflow-visible course-details">
    <VCardText>
      <VRow>
        <!-- 👉 Course Details  -->
        <VCol
          cols="12"
          md="8"
        >
          <VCardItem class="pa-0 mb-2">
            <VCardTitle class="mb-2">
              {{ itemData?.title }}
            </VCardTitle>
            <VCardSubtitle>Vendor<span class="font-weight-medium text-high-emphasis ms-1"> {{ itemData?.author }}</span></VCardSubtitle>
            <template #append>
              <div class="d-flex gap-2 align-center">
                <VChip
                  variant="tonal"
                  color="primary"
                  label
                >
                  {{ itemData?.subject }}
                </VChip>
                <IconBtn>
                  <RouterLink to="/academy/course/list">
                    <VIcon
                      icon="tabler-arrow-back"
                      size="26"
                      class="text-high-emphasis text-primary"
                    />
                  </RouterLink>
                </IconBtn>
              </div>
            </template>
          </VCardItem>

          <VCard
            flat
            border
          >
            <div class="px-2 pt-2">
              <div class="px-2 pt-2">
                <!-- YouTube -->
                <VideoPlayer
                  v-if="videoSource?.type === 'youtube'"
                  :key="videoSource.src"
                  :options="{ techOrder: ['youtube'], sources: [{ src: videoSource.src, type: 'video/youtube' }] }"
                  controls
                  plays-inline
                  :height="$vuetify.display.mdAndUp ? 440 : 250"
                  class="w-100 rounded"
                />

                <!-- Google Drive -->
                <iframe
                  v-else-if="videoSource?.type === 'gdrive'"
                  :src="videoSource.src"
                  width="100%"
                  height="480"
                  allow="autoplay"
                  class="rounded"
                />

                <!-- MP4 -->
                <VideoPlayer
                  v-else-if="videoSource?.type === 'mp4'"
                  :key="videoSource.src"
                  :options="{ techOrder: ['html5'], sources: [{ src: videoSource.src, type: 'video/mp4' }] }"
                  controls
                  plays-inline
                  :height="$vuetify.display.mdAndUp ? 440 : 250"
                  class="w-100 rounded"
                />
              </div>
            </div>
            <VCardText>
              <h5 class="text-h5 mb-3">
                About this course
              </h5>
              <p class="text-body-1">
                {{ itemData?.note }}
              </p>
              <VDivider class="my-6" />
              <h5 class="text-h5 mb-3">
                Description
              </h5>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div v-html="itemData?.description" />
              <VDivider class="my-6" />
              <h5 class="text-h5 mb-2">
                Instructor
              </h5>
              <div class="d-flex align-center">
                <VAvatar
                  :image="avatar"
                  size="38"
                  class="me-3"
                />
                <div>
                  <div class="text-body-1 font-weight-medium">
                    {{ itemData?.author }}
                  </div>
                  <div class="text-sm text-disabled">
                    Online Platform Mentor
                  </div>
                </div>
              </div>
            </VCardText>
          </VCard>
        </VCol>

        <!-- 👉 Course Progress -->
        <VCol
          cols="12"
          md="4"
        >
          <div class="course-content">
            <VExpansionPanels
              v-model="panelStatus"
              variant="accordion"
              class="expansion-panels-width-border"
            >
              <template
                v-for="(item, index) in distinctSections"
                :key="index"
              >
                <VExpansionPanel
                  elevation="0"
                  :value="index"
                >
                  <template #title>
                    <div>
                      <h5 class="text-h5 mb-1">
                        {{ item }}
                      </h5>
                    </div>
                  </template>
                  <template #text>
                    <VList class="card-list px-2">
                      <VListItem
                        v-for="topic in filteredBySection(item)"
                        :key="topic.id"
                        class="py-4"
                      >
                        <template #prepend>
                          <VCheckbox
                            class="me-3"
                            :model-value="isPlayed(topic.id)"
                            readonly="true"
                          />
                        </template>
                        <VListItemTitle class="text-high-emphasis font-weight-medium mb-1">
                          <RouterLink
                            :to="`/academy/course/details?name=${topic.name}&id=${topic.id}`"
                            class="text-secondary"
                          >
                            {{ topic.title }}
                          </RouterLink>
                        </VListItemTitle>
                      </VListItem>
                    </VList>
                  </template>
                </VExpansionPanel>
              </template>
            </VExpansionPanels>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list{
  --v-card-list-gap: 1rem;
}

.course-content{
  position: sticky;
  inset-block-start: 5.25rem;
}
</style>

<style lang="scss">
.v-expansion-panel-text__wrapper{
  padding-block: 0.75rem !important;
  padding-inline: 0.5rem !important;
}

.v-expansion-panel--active{
  .v-expansion-panel-title{
    border-block-end: 1px solid rgba(var(--v-theme-on-surface), 0.12) !important;
  }
}
</style>

<style lang="scss">
body .v-layout .v-application__wrap{
  .course-details{
    .v-expansion-panels {
      .v-expansion-panel-title,
      .v-expansion-panel-title--active,
      .v-expansion-panel-title:hover,
      .v-expansion-panel-title:focus,
      .v-expansion-panel-title:focus-visible,
      .v-expansion-panel-title--active:focus,
      .v-expansion-panel-title--active:hover {
        .v-expansion-panel-title__overlay {
          opacity: 0.04 !important;
        }
      }
    }
  }
}
</style>
