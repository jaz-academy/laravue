<script setup>
import { computed } from "vue"

// Deklarasi props menggunakan defineProps
const props = defineProps({
  postId: {
    type: String,
    required: true,
  },
})

// Hitung URL embed Google Drive berdasarkan props.postId
const embedUrl = computed(() => {
  if (!props.postId) {
    console.error("postId is required but not provided.")
    
    return ""
  }
  
  return `https://drive.google.com/file/d/${props.postId}/preview`
})
</script>

<template>
  <div>
    <iframe
      class="d-flex justify-center rounded"
      :src="embedUrl"
      width="100%"
      height="600"
      allow="autoplay"
    />
  </div>
</template>
