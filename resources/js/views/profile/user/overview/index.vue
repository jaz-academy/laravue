<script setup>
import { member } from '@/composables/fetchMemberData'
import About from './About.vue'
import ActivityTimeline from './ActivityTimeline.vue'

const router = useRoute('profile-user-tab')
const profileTabData = ref()

const fetchAboutData = async () => {
  if (router.params.tab === 'overview') {
    const data = await $fake('/pages/profile', { query: { tab: 'profile' } }).catch(err => console.log(err))

    profileTabData.value = data
  }
}

watch(router, fetchAboutData, { immediate: true })
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
