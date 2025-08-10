<script setup>
import { fetchMemberData, member } from '@/composables/fetchMemberData'
import About from './About.vue'
import ActivityTimeline from './ActivityTimeline.vue'

onMounted(() => {
  fetchMemberData()
  console.log('member: ', member)
})
</script>

<template>
  <VRow v-if="member">
    <VCol
      md="4"
      cols="12"
    >
      <About :data="member" />
    </VCol>

    <VCol
      cols="12"
      md="8"
    >
      <VRow>
        <VCol cols="12">
          <ActivityTimeline />
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
