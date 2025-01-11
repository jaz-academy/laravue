<script setup>
import { computed } from "vue"

// Deklarasi props menggunakan defineProps
const props = defineProps({
  postId: {
    type: String,
    required: true,
  },
})

// Hitung URL embed Instagram berdasarkan props.postId
const embedUrl = computed(() => {
  if (!props.postId) {
    console.error("postId is required but not provided.")
    
    return ""
  }
  
  return `https://www.instagram.com/p/${props.postId}/embed`
})
</script>

<template>
  <div>
    <iframe
      :src="embedUrl"
      width="100%"
      height="595"
      frameborder="0"
      scrolling="no"
      allowtransparency="true"
      allow="encrypted-media"
    />
  </div>
</template>
