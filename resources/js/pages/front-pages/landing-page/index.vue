<script setup>
import Footer from '@/views/front-pages/front-page-footer.vue'
import Navbar from '@/views/front-pages/front-page-navbar.vue'
import HeroSection from '@/views/front-pages/landing-page/hero-section.vue'
import PostingCard from '@/views/front-pages/landing-page/PostingCard.vue'

definePage({ meta: { layout: 'blank' } })

const activeSectionId = ref()
const refHome = ref()
const refFeatures = ref()
const refTeam = ref()
const refContact = ref()
const refFaq = ref()

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

    <!-- 👉 Hero Section  -->
    <HeroSection ref="refHome" />

    <h1 class="my-16 text-center">
      .
    </h1>

    <div
      id="content-post"
      class="my-16"
    >
      <div
        v-for="i in 5"
        :key="i"
      >
        <PostingCard class="card-post" />
      </div>
    </div>

    <!-- 👉 Footer -->
    <Footer />
  </div>
</template>

<style lang="scss">
.card-post {
  inline-size: 90%;
  margin-block-start: 1.5rem;
  margin-inline: auto;
}

@media (min-width: 600px) {
  .landing-page-wrapper {
    .v-container {
      padding-inline: 2rem !important;
    }
  }
}
</style>
