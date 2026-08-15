<script setup>
import { abbreviateName } from '@/@core/utils/formatters'
import { takePic } from '@/@core/utils/helpers'
import avatar from '@images/avatars/no-profile.png'
import { computed, ref, watchEffect } from 'vue'
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

const pdfPageCount = ref(0)
const onPdfLoaded = (pdf) => {
  pdfPageCount.value = pdf.numPages
}

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
  <VCard class="mb-6 task-card" elevation="2">
    <!-- Header -->
    <VCardItem class="pa-4">
      <template #prepend>
        <VAvatar color="primary" variant="tonal" size="40">
          <VImg v-if="props.students?.[0]?.image" :src="props.students[0].image" cover />
          <span v-else>{{ props.students?.[0]?.username?.charAt(0).toUpperCase() || '?' }}</span>
        </VAvatar>
      </template>

      <VCardTitle class="text-base font-weight-bold">
        {{ props.students?.[0]?.name || 'Unknown User' }}
      </VCardTitle>
      <VCardSubtitle>
        {{ props.date ? new Date(props.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '' }}
      </VCardSubtitle>
    </VCardItem>

    <!-- Media Content -->
    <div class="media-container bg-grey-100">
      <div v-if="props.mediaType === 'image'" class="h-100 w-100 d-flex align-center justify-center bg-grey-200">
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
          style="width: 100%; max-height: 600px; object-fit: contain; display: block;"
          alt="Task Media"
        />
      </div>

      <div v-else-if="props.mediaType === 'video'" class="h-100 d-flex align-center justify-center bg-black w-100">
        <video
          :src="videoStreamUrl"
          controls
          style="width: 100%; max-height: 600px;"
        >
          Your browser does not support HTML video.
        </video>
      </div>

      <div v-else-if="props.mediaType === 'document'" class="h-100 document-container position-relative bg-grey-200" style="min-height: 400px; border-bottom: 1px solid #eee;">
        <div v-if="isLoadingPdf" class="d-flex align-center justify-center h-100 w-100" style="position: absolute; inset: 0; background: rgba(255,255,255,0.8); z-index: 2;">
          <VProgressCircular indeterminate color="primary" />
        </div>
        
        <div v-if="pdfBlobUrl">
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
      
      <div v-else class="h-100 d-flex align-center justify-center pa-10 w-100">
        <p class="text-medium-emphasis">No media available</p>
      </div>
    </div>

    <!-- Description & Footer -->
    <VCardText class="pa-4">
      <div class="d-flex align-center mb-4">
        <VIcon icon="tabler-heart" class="cursor-pointer me-4" />
        <VIcon icon="tabler-message-circle" class="cursor-pointer me-4" />
        <VSpacer />
        <VIcon icon="tabler-bookmark" class="cursor-pointer" />
      </div>

      <p class="mb-1 text-body-1">
        <span class="font-weight-bold me-2">{{ props.students?.[0]?.username || 'user' }}</span>
        <span>{{ props.description || props.taskName }}</span>
      </p>

      <div v-if="props.grade" class="mt-4 pa-3 bg-light-primary rounded-lg border">
        <div class="d-flex align-center">
          <VAvatar size="24" color="primary" class="me-2">
            <span class="text-xs">{{ props.teacher?.name?.charAt(0) || 'M' }}</span>
          </VAvatar>
          <span class="font-weight-bold text-sm">{{ props.teacher?.name || 'Mentor' }}</span>
          <VSpacer />
          <VChip size="small" color="primary" variant="flat">Score: {{ props.grade }}</VChip>
        </div>
        <p class="text-body-2 mt-2 mb-0 font-italic">"{{ props.review }}"</p>
      </div>
    </VCardText>
  </VCard>
</template>

<style scoped>
.task-card {
  border-radius: 12px;
  overflow: hidden;
}

.media-container {
  min-height: 300px;
  max-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.document-container {
  width: 100%;
}

.bg-light-primary {
  background-color: rgba(var(--v-theme-primary), 0.05);
}
</style>
