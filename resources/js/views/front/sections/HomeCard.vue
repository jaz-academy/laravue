<script setup>
import { abbreviateName } from '@/@core/utils/formatters'
import { takePic } from '@/@core/utils/helpers'
import avatar from '@images/avatars/no-profile.png'
import { computed, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'

const props = defineProps({
  taskId: String,
  taskName: String,
  description: String,
  mediaType: String,
  mediaUrl: String,
  mediaUrls: Array,
  grade: Number,
  students: Array,
  teacher: Object,
  review: String,
  teacherImg: String,
  date: String,
})

const dataStorageParticipant = localStorage.getItem('participant')
const participant = dataStorageParticipant ? JSON.parse(dataStorageParticipant) : null
const showModalRating = ref(false)
const errorMessage = ref('')
const mentor = ref(props.teacher || { name: 'Unknown' })
const accepted = ref('Yes')
const review = ref(props.review)
const rating = ref(props.grade ? props.grade / 20 : 0) // Convert 0-100 grade to 0-5 stars
const ratingCol = ref(true)

const showFullDescription = ref(false)

const pdfPageCount = ref(0)

const onPdfLoaded = pdf => {
  pdfPageCount.value = pdf.numPages
}

const teachers = ref([
  { id: 1, nickname: 'Budi Santoso' },
  { id: 2, nickname: 'Citra Kirana' },
])

const teacherOptions = computed(() =>
  teachers.value.map(item => ({
    title: item.nickname,
    value: {
      id: item.id,
      name: item.nickname,
    },
  })),
)

const handleRatingCollumn = value => {
  if (value === 'Yes') {
    ratingCol.value = true
  } else {
    ratingCol.value = false
  }
}

const handleRating = async () => {
  if (mentor.value === '') {
    errorMessage.value = 'Please select a mentor'
    
    return
  } else if (accepted.value === '') {
    errorMessage.value = 'Please select accepted'
    
    return
  } else if (rating.value === 0) {
    errorMessage.value = 'Please select a rating'
    
    return
  } else if (review.value === '') {
    errorMessage.value = 'Please write a review'
    
    return
  } else {
    // Static handling of rating submission
    console.log('Rating submitted statically:', {
      admin_teacher_id: mentor.value.id,
      accepted: accepted.value === 'Yes' ? 1 : 0,
      rate: rating.value,
      review: review.value,
    })
    showModalRating.value = false
  }
}

const handleScroll = () => {
  const scrollPosition = window.scrollY || document.documentElement.scrollTop
  if (scrollPosition > 100) { 
    showModalRating.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  if (props.mediaType === 'document' && typeof IntersectionObserver !== 'undefined') {
    cardObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        isIntersecting.value = true
        cardObserver?.disconnect()
      }
    }, { rootMargin: '300px' })
    const el = cardElement.value?.$el || cardElement.value
    if (el) {
      cardObserver.observe(el)
    } else {
      isIntersecting.value = true
    }
  } else {
    isIntersecting.value = true
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  cardObserver?.disconnect()
  if (pdfBlobUrl.value) {
    URL.revokeObjectURL(pdfBlobUrl.value)
  }
})

const comments = []
const cardElement = ref(null)
const isIntersecting = ref(false)
let cardObserver = null
const activeCarouselPage = ref(0)

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api'

const getDriveId = url => {
  const match = url?.match(/id=([^&]+)/)
  
  return match ? match[1] : null
}

const getStreamUrl = url => {
  const id = getDriveId(url)
  
  return id ? `${apiBaseUrl}/public/media/stream/${id}` : url
}

const videoStreamUrl = computed(() => {
  return getStreamUrl(props.mediaUrl)
})

const pdfProxyUrl = computed(() => {
  return `${apiBaseUrl}/public/media/proxy-pdf?url=${encodeURIComponent(props.mediaUrl)}`
})

const pdfBlobUrl = ref(null)
const isLoadingPdf = ref(false)

watchEffect(async () => {
  if (props.mediaType === 'document' && props.mediaUrl && isIntersecting.value && !pdfBlobUrl.value) {
    isLoadingPdf.value = true
    try {
      const response = await fetch(pdfProxyUrl.value)
      const blob = await response.blob()

      pdfBlobUrl.value = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }))
    } catch (e) {
      console.error('Failed to load PDF:', e)
    } finally {
      isLoadingPdf.value = false
    }
  }
})
</script>

<template>
  <VCard
    ref="cardElement"
    class="posting-card rounded-xl border d-flex flex-column"
    elevation="0"
  >
    <!-- Media Rendering (Full width, top) -->
    <div
      v-if="props.mediaType === 'image'"
      class="media-section bg-grey-200 w-100"
    >
      <VCarousel
        v-if="props.mediaUrls && props.mediaUrls.length > 1"
        hide-delimiters
        height="100%"
        class="media-carousel"
      >
        <VCarouselItem
          v-for="(url, i) in props.mediaUrls"
          :key="i"
          :src="getStreamUrl(url)"
          cover
          class="h-100"
        />
      </VCarousel>
      <img
        v-else-if="props.mediaUrl"
        :src="getStreamUrl(props.mediaUrl)"
        loading="lazy"
        decoding="async"
        style=" display: block; block-size: 100%;inline-size: 100%; max-block-size: 550px; object-fit: cover;"
        alt="Task Media"
      >
    </div>

    <div
      v-else-if="props.mediaType === 'video'"
      class="media-section bg-black w-100"
    >
      <video
        :src="videoStreamUrl"
        controls
        preload="metadata"
        style=" display: block; block-size: auto;inline-size: 100%; max-block-size: 700px; object-fit: contain;"
      >
        Your browser does not support HTML video.
      </video>
    </div>

    <div
      v-else-if="props.mediaType === 'document'"
      class="media-section w-100 position-relative bg-grey-200"
      style=" block-size: 500px; border-block-end: 1px solid #eee;min-block-size: 400px;"
    >
      <div
        v-if="isLoadingPdf"
        class="d-flex align-center justify-center h-100"
        style="position: absolute; z-index: 2; background: rgba(255,255,255,80%); inset: 0;"
      >
        <VProgressCircular
          indeterminate
          color="primary"
        />
      </div>
      
      <div
        v-if="pdfBlobUrl"
        class="h-100 w-100"
      >
        <!-- Hidden renderer to get numPages -->
        <VuePdfEmbed
          v-if="pdfPageCount === 0"
          v-show="false"
          :source="pdfBlobUrl"
          @loaded="onPdfLoaded"
        />

        <VCarousel 
          v-if="pdfPageCount > 0" 
          v-model="activeCarouselPage"
          hide-delimiters 
          height="100%"
          class="pdf-carousel h-100 w-100"
        >
          <VCarouselItem
            v-for="page in pdfPageCount"
            :key="page"
            class="h-100"
          >
            <div
              class="d-flex justify-center align-center h-100 w-100 bg-white"
              style="overflow-y: auto;"
            >
              <VuePdfEmbed
                v-if="Math.abs(activeCarouselPage + 1 - page) <= 1"
                :source="pdfBlobUrl"
                :page="page"
                style="inline-size: 100%; max-inline-size: 800px;"
              />
              <div
                v-else
                class="d-flex align-center justify-center text-caption text-medium-emphasis h-100"
              >
                Halaman {{ page }}
              </div>
            </div>
          </VCarouselItem>
        </VCarousel>
      </div>
    </div>
    
    <div
      v-else
      class="media-section w-100 bg-grey-200 d-flex align-center justify-center py-10"
    >
      <p class="text-medium-emphasis">
        No media available
      </p>
    </div>

    <!-- DESCRIPTION AND DETAILS -->
    <VCardText class="pa-5">
      <div class="d-flex justify-space-between align-center mb-3">
        <div class="d-flex align-center">
          <div
            v-if="props.students && props.students.length > 0"
            class="v-avatar-group me-3"
          >
            <VAvatar
              v-for="student in props.students.slice(0, 3)"
              :key="student._id || student.id"
              color="primary"
              variant="tonal"
              size="38"
            >
              <VImg
                v-if="student.image"
                :src="takePic(student.image)"
                cover
              />
              <span
                v-else
                class="text-caption font-weight-bold"
              >{{ student.username?.charAt(0).toUpperCase() || student.name?.charAt(0).toUpperCase() || '?' }}</span>
              <VTooltip
                location="top"
                activator="parent"
              >
                {{ student.name }}
              </VTooltip>
            </VAvatar>
            <VAvatar
              v-if="props.students.length > 3"
              color="secondary"
              variant="tonal"
              size="38"
            >
              <span class="text-xs font-weight-bold">+{{ props.students.length - 3 }}</span>
            </VAvatar>
          </div>
          <RouterLink
            v-if="props.students && props.students.length > 0"
            :to="`/?search=${abbreviateName(props.students[0].name, 10, 1).toLowerCase()}`"
            class="d-flex flex-column text-decoration-none"
          >
            <h6 class="text-subtitle-2 font-weight-semibold text-high-emphasis mb-0">
              {{ abbreviateName(props.students[0].name, 30, 3) }}
            </h6>
            <span class="text-caption text-medium-emphasis">
              {{ props.students.length > 1 ? `+${props.students.length - 1} others` : (props.students[0].nickname || props.students[0].email) }}
            </span>
          </RouterLink>
        </div>
        <div class="d-flex flex-column text-end">
          <small
            v-if="props.date"
            class="text-caption text-medium-emphasis"
          >
            {{ new Date(props.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) }}
          </small>
        </div>
      </div>
      
      <VDivider class="my-3" />
      
      <div>
        <h6
          v-if="props.taskName && props.description && props.taskName !== props.description"
          class="text-subtitle-2 font-weight-bold text-primary mb-1"
        >
          {{ props.taskName }}
        </h6>
        <div 
          class="text-body-2 text-high-emphasis" 
          :style="!showFullDescription ? 'display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; white-space: pre-wrap; line-height: 1.6;' : 'white-space: pre-wrap; line-height: 1.6;'"
        >
          {{ props.description || props.taskName }}
        </div>
        <a 
          v-if="(props.description || props.taskName) && (props.description || props.taskName).length > 80" 
          href="#" 
          class="text-primary text-caption font-weight-semibold text-decoration-none mt-1 d-inline-block" 
          @click.prevent="showFullDescription = !showFullDescription"
        >
          {{ showFullDescription ? 'Show less' : 'Read more' }}
        </a>
      </div>

      <div
        v-if="mentor && (mentor.name || mentor.nickname)"
        class="d-flex align-center justify-space-between mt-3 pa-2 rounded-lg bg-light-primary"
      >
        <div class="d-flex align-center">
          <VAvatar
            size="30"
            variant="tonal"
            class="me-2"
            :color="props.grade > 0 ? 'primary' : 'warning'"
          >
            <VImg
              v-if="props.teacherImg"
              :src="takePic(props.teacherImg)"
              cover
            />
            <VImg
              v-else
              :src="avatar"
            />
          </VAvatar>
          <div class="d-flex flex-column">
            <span class="text-caption font-weight-bold text-high-emphasis">
              {{ mentor.value?.name || mentor.name || mentor.nickname }}
            </span>
            <div class="text-xs text-medium-emphasis cursor-pointer">
              <template v-if="participant && participant.role > 1">
                <div
                  class="d-flex flex-column"
                  @click="showModalRating = true"
                >
                  <VRating
                    v-model="rating"
                    readonly
                    half-increments
                    size="x-small"
                    density="compact"
                  />
                </div>
              </template>
              <template v-else>
                <RouterLink 
                  to="/front/bookmark" 
                  class="d-flex flex-column text-decoration-none"
                >
                  <VRating
                    v-model="rating"
                    readonly
                    half-increments
                    size="x-small"
                    density="compact"
                  />
                </RouterLink>
              </template>
            </div>
          </div>
        </div>
        <div
          v-if="props.grade"
          class="ms-2"
        >
          <VChip
            size="x-small"
            color="primary"
            variant="tonal"
            class="font-weight-bold"
          >
            Score: {{ props.grade }}
          </VChip>
        </div>
      </div>
      
      <p
        v-if="review"
        class="text-caption mt-2 mb-0 text-medium-emphasis font-italic"
      >
        "{{ review }}"
      </p>
      
      <VDivider class="my-3" />
      
      <div class="d-flex justify-space-between align-center action-icons">
        <div class="d-flex align-center gap-x-1">
          <VBtn
            icon
            variant="text"
            size="small"
            density="compact"
            color="secondary"
          >
            <VIcon
              icon="tabler-heart"
              size="18"
            />
          </VBtn>
          <VBtn
            icon
            variant="text"
            size="small"
            density="compact"
            color="secondary"
          >
            <VIcon
              icon="tabler-message-2"
              size="18"
            />
          </VBtn>
        </div>
        <VBtn
          icon
          variant="text"
          size="small"
          density="compact"
          color="secondary"
        >
          <VIcon
            icon="tabler-bookmark"
            size="18"
          />
        </VBtn>
      </div>

      <!-- Rating Modal Overlay -->
      <div
        v-if="showModalRating"
        class="modal-overlay"
      >
        <div class="modal-content">
          <VAlert
            v-if="errorMessage"
            type="error"
            class="mb-5"
            dismissible
            @click="errorMessage = ''"
          >
            {{ errorMessage }}
          </VAlert>
          <VForm @submit.prevent="{}">
            <VRow>
              <VCol cols="12">
                <AppSelect
                  v-model="mentor"
                  label="Mentor"
                  placeholder="Select Mentor"
                  :items="teacherOptions"
                  item-title="value.name"
                  item-value="value"
                />
              </VCol>

              <VCol cols="12">
                <AppSelect
                  v-model="accepted"
                  label="Accepted"
                  placeholder="Not Accepted"
                  :items="['Yes', 'No']"
                  @update:model-value="handleRatingCollumn"
                />
              </VCol>
              
              <VCol
                v-if="ratingCol"
                cols="12"
                class="text-center"
              >
                <VRating
                  v-model="rating"
                  half-increments
                  hover
                />
                <AppTextarea
                  v-model="review"
                  placeholder="Write your review..."
                  :rows="3"
                />
              </VCol>

              <VCol
                cols="12"
                class="mt-4"
              >
                <VBtn
                  type="submit"
                  class="me-2"
                  @click="handleRating"
                >
                  Save
                </VBtn>

                <VBtn 
                  color="secondary" 
                  class="me-2"
                  @click="showModalRating = false"
                >
                  Cancel
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.modal-overlay {
  position: fixed;
  z-index: 999999999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 50%);
  inset: 0;
}

.modal-content {
  padding: 2rem;
  border-radius: 8px;
  margin: 1rem;
  background: rgb(var(--v-theme-surface));
  box-shadow: 0 4px 6px rgba(0, 0, 0, 10%);

  @media (min-width: 1280px) {
    inline-size: 30%;
  }

  @media (min-width: 768px) and (max-width: 1279px) {
    inline-size: 50%;
  }

  @media (max-width: 767px) {
    inline-size: 100%;
  }
}

.posting-card {
  overflow: hidden;
  border-radius: 0.75rem !important;
  background-color: rgb(var(--v-theme-surface));
  inline-size: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 18px rgba(0, 0, 0, 6%);
  }
}

.bg-light-primary {
  background-color: rgba(var(--v-theme-primary), 0.05);
}

.action-icons {
  cursor: pointer;

  .v-btn {
    opacity: 0.85;
    transition: opacity 0.2s ease, transform 0.15s ease;

    &:hover {
      opacity: 1;
      transform: scale(1.08);
    }
  }
}

/* Media height 100% */
.media-section {
  position: relative;
  overflow: hidden;

  .media-carousel {
    block-size: 500px !important;

    .v-window__container {
      block-size: 100% !important;
    }

    .v-window-item {
      block-size: 100% !important;
    }

    .v-img {
      block-size: 100% !important;
      inline-size: 100% !important;
    }
  }

  .pdf-carousel {
    block-size: 100% !important;

    .v-window__container {
      block-size: 100% !important;
    }

    .v-window-item {
      block-size: 100% !important;
    }
  }
}

/* Reduced next-prev navigation buttons by 50%. */
.posting-card .v-window__left,
.posting-card .v-window__right {
  margin-inline: 2px !important;

  .v-btn {
    padding: 0 !important;
    backdrop-filter: blur(4px);
    background-color: rgba(255, 255, 255, 90%) !important;
    block-size: 8px !important;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 25%) !important;
    color: #1e2130 !important;
    inline-size: 8px !important;
    min-block-size: 8px !important;
    min-inline-size: 8px !important;

    --v-btn-height: 8px !important;

    &:hover {
      background-color: rgba(255, 255, 255, 100%) !important;
      transform: scale(1.15);
    }

    .v-icon {
      block-size: 5px !important;
      font-size: 5px !important;
      inline-size: 5px !important;
    }
  }
}
</style>
