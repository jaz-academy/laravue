<script setup>
import Footer from '@/views/front/front-page-footer.vue'
import Navbar from '@/views/front/front-page-navbar.vue'
import InstagramCard from '@/views/front/sections/InstagramCard.vue'
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'

definePage({ meta: { layout: 'blank' } })

const activeSectionId = ref()
const refHome = ref()
const refFeatures = ref()
const refTeam = ref()
const refContact = ref()
const refFaq = ref()

const comments = [
  { type: 'subheader', title: 'This Week' },
  {
    prependAvatar: avatar1,
    title: 'Brunch this weekend?',
    subtitle: '<span class="text-primary">Ali Connors</span> &mdash; I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?',
  },
  {
    type: 'divider',
    inset: true,
  },
  {
    prependAvatar: avatar2,
    title: 'Summer BBQ',
    subtitle: '<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I\'m out of town this weekend.',
  },
  {
    type: 'divider',
    inset: true,
  },
]

useIntersectionObserver([
  refHome,
  refFeatures,
  refTeam,
  refContact,
  refFaq,
], ([{ isIntersecting, target }]) => {
  if (isIntersecting)
    activeSectionId.value = target.id
}, { threshold: 0.25 })
</script>

<template>
  <div class="landing-page-wrapper">
    <Navbar :active-id="activeSectionId" />
    
    <!-- CONTENT POSTING -->
    <div class="instagram-card">
      <VRow class="m-0 p-0">
        <VCol
          class="d-none d-lg-block"
          cols="12"
          lg="3"
        >
          <VCard style="position: sticky; inset-block-start: 6rem;">
            <VList
              lines="three"
              :items="comments"
              item-props
            >
              <template #subtitle="{ subtitle }">
                <!-- eslint-disable-next-line vue/no-v-html -->
                <div v-html="subtitle" />
              </template>
            </VList>
          </VCard>
        </VCol>
        <VCol
          cols="12"
          lg="9"
        >
          <div>
            <div
              v-for="i in 5"
              :key="i"
            >
              <InstagramCard />
            </div>
          </div>
        </VCol>
      </VRow>
    </div>
  </div>

  <!-- 👉 Footer -->
  <Footer />
</template>

<style lang="scss">
.instagram-card {
  inline-size: 90%;
  margin-block-start: 1.5rem;
  margin-inline: auto;
  padding-block: 5rem;
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
