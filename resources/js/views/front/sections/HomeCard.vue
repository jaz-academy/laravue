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
const onPdfLoaded = (pdf) => {
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
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const comments = []

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api'

const getDriveId = (url) => {
  const match = url?.match(/id=([^&]+)/)
  return match ? match[1] : null
}

const getStreamUrl = (url) => {
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
  if (props.mediaType === 'document' && props.mediaUrl) {
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
  <VCard class="posting-card d-flex flex-column" elevation="2">
    <!-- Media Rendering (Full width, top) -->
    <div v-if="props.mediaType === 'image'" class="media-section bg-grey-200 w-100 ">
      <VCarousel v-if="props.mediaUrls && props.mediaUrls.length > 1" hide-delimiters height="500">
        <VCarouselItem
          v-for="(url, i) in props.mediaUrls"
          :key="i"
          :src="getStreamUrl(url)"
          cover
        />
      </VCarousel>
      <img
        v-else-if="props.mediaUrl"
        :src="getStreamUrl(props.mediaUrl)"
        style="width: 100%; height: auto; display: block;"
        alt="Task Media"
      />
    </div>

    <div v-else-if="props.mediaType === 'video'" class="media-section bg-black w-100">
      <video
        :src="videoStreamUrl"
        controls
        style="width: 100%; height: auto; display: block; max-height: 700px; object-fit: contain;"
      >
        Your browser does not support HTML video.
      </video>
    </div>

    <div v-else-if="props.mediaType === 'document'" class="media-section w-100 position-relative bg-grey-200" style="min-height: 400px; border-bottom: 1px solid #eee;">
      <div v-if="isLoadingPdf" class="d-flex align-center justify-center h-100" style="position: absolute; inset: 0; background: rgba(255,255,255,0.8); z-index: 2;">
        <VProgressCircular indeterminate color="primary" />
      </div>
      
      <div v-if="pdfBlobUrl">
        <!-- Hidden renderer to get numPages -->
        <VuePdfEmbed
          v-if="pdfPageCount === 0"
          v-show="false"
          :source="pdfBlobUrl"
          @loaded="onPdfLoaded"
        />

        <VCarousel 
          v-if="pdfPageCount > 0" 
          hide-delimiters 
          height="500"
          class="pdf-carousel"
        >
          <VCarouselItem
            v-for="page in pdfPageCount"
            :key="page"
          >
            <div class="d-flex justify-center h-100 w-100 bg-white" style="overflow-y: auto;">
              <VuePdfEmbed
                :source="pdfBlobUrl"
                :page="page"
                style="width: 100%; max-width: 800px;"
              />
            </div>
          </VCarouselItem>
        </VCarousel>
      </div>
    </div>
    
    <div v-else class="media-section w-100 bg-grey-200 d-flex align-center justify-center py-10">
      <p class="text-medium-emphasis">No media available</p>
    </div>

    <!-- DESCRIPTION AND DETAILS -->
    <VCardText class="pt-4">
      <div class="d-flex justify-space-between align-center mb-2">
        <div class="d-flex align-center">
          <div class="v-avatar-group me-2" v-if="props.students && props.students.length > 0">
            <VAvatar
              v-for="student in props.students.slice(0, 3)"
              :key="student._id || student.id"
              color="info"
              size="34"
            >
              <VImg
                v-if="student.image"
                :src="takePic(student.image)"
                cover
              />
              <span v-else>{{ student.username?.charAt(0).toUpperCase() || student.name?.charAt(0).toUpperCase() || '?' }}</span>
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
              size="34"
            >
              <span class="text-xs">+{{ props.students.length - 3 }}</span>
            </VAvatar>
          </div>
          <RouterLink
            v-if="props.students && props.students.length > 0"
            :to="`/?search=${abbreviateName(props.students[0].name, 10, 1).toLowerCase()}`"
            class="d-flex flex-column"
          >
            <h6 class="text-base text-primary">
              {{ abbreviateName(props.students[0].name, 30, 3) }}
            </h6>
            <span class="text-sm text-medium-emphasis">
              {{ props.students.length > 1 ? `And ${props.students.length - 1} others` : props.students[0].email }}
            </span>
          </RouterLink>
        </div>
        <div class="d-flex flex-column text-end">
          <small class="text-sm text-primary" v-if="props.date">
            {{ new Date(props.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) }}
          </small>
        </div>
      </div>
      
      <hr class="my-custom-line">
      
      <div>
        <div 
          class="text-body-2 mt-3 text-secondary" 
          :style="!showFullDescription ? 'display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; white-space: pre-wrap;' : 'white-space: pre-wrap;'"
        >
          <span class="text-primary font-weight-bold mr-1">{{ props.taskName }}</span>
          {{ props.description !== props.taskName ? props.description : '' }}
        </div>
        <a 
          v-if="props.description && props.description !== props.taskName" 
          href="#" 
          @click.prevent="showFullDescription = !showFullDescription" 
          class="text-primary text-sm font-weight-medium text-decoration-none mt-1 d-inline-block"
        >
          {{ showFullDescription ? 'Show less' : 'Read more' }}
        </a>
      </div>

      <div class="d-flex align-center mt-4">
        <VAvatar
          size="34"
          variant="tonal"
          class="me-3"
          :color="props.grade > 0 ? 'primary' : 'warning'"
        >
          <VImg
            v-if="props.teacherImg"
            :src="`/storage/${props.teacherImg}`"
            cover
          />
          <VImg
            v-else
            :src="avatar"
          />
        </VAvatar>
        <div class="d-flex flex-column">
          <div class="font-weight-medium text-link ps-1">
            <h6 class="text-base text-primary ms-1">
              {{ mentor.value?.name || mentor.name }}
            </h6>
          </div>
          <div class="text-sm text-medium-emphasis cursor-pointer">
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
      
      <p class="text-body-2 mt-3 mb-0 text-medium-emphasis">
        {{ review }}
      </p>
      
      <hr class="my-custom-line">
      
      <div class="d-flex justify-space-between my-2 flex-wrap action-icons">
        <div class="d-flex align-center">
          <VIcon icon="tabler-heart" class="text-medium-emphasis" />
          <VIcon icon="tabler-message-2" class="ms-3 text-medium-emphasis" />
        </div>
        <VIcon icon="tabler-bookmark" class="text-medium-emphasis" />
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

<style>
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

.my-custom-line {
  border: 0;
  background: linear-gradient(to right, #4c4eaf, #af4c4c);
  block-size: 1px;
  margin-block: 20px;
  margin-inline: 0;
}

.action-icons {
  cursor: pointer;
}

@media (min-width: 1920px) {
  .posting-card {
    max-inline-size: calc(1440px - 32px);
  }
}

@media (min-width: 1280px) and (max-width: 1919px) {
  .posting-card {
    max-inline-size: calc(1200px - 32px);
  }
}

@media (min-width: 960px) and (max-width: 1279px) {
  .posting-card {
    max-inline-size: calc(900px - 32px);
  }
}

@media (min-width: 600px) and (max-width: 959px) {
  .posting-card {
    max-inline-size: calc(100% - 64px);
  }
}

@media (max-width: 600px) {
  .posting-card {
    max-inline-size: calc(100% - 32px);
  }
}
</style>
