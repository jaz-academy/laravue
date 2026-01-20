<script setup>
import noPhoto from '@images/avatars/no-photo.png'

const props = defineProps({
  name: { type: String, required: true },
})

const imgSrc = ref(`/storage/courses/${props.name}.png`)

watch(
  () => props.name,
  newName => {
    imgSrc.value = `/storage/courses/${newName}.png`
  },
  { immediate: true },
)

const onImgError = () => {
  imgSrc.value = noPhoto
}
</script>

<template>
  <VImg
    cover
    aspect-ratio="16/9"
    class="w-full h-40 object-cover rounded cover-image"
    :src="imgSrc"
    :alt="props.name"
    @error="onImgError"
  />
</template>

<style lang="scss">
.cover-image {
  border-radius: 8px;
  block-size: 250px; /* bisa diatur */
  inline-size: 100%;
  object-fit: cover;
}
</style>
