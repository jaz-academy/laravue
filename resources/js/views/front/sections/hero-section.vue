<script setup>
import { useGenerateImageVariant } from '@/@core/composable/useGenerateImageVariant'
import heroDashboardImgDark from '@images/front-pages/landing-page/hero-dashboard-dark.png'
import heroDashboardImgLight from '@images/front-pages/landing-page/hero-dashboard-light.png'
import heroElementsImgDark from '@images/front-pages/landing-page/hero-elements-dark.png'
import heroElementsImgLight from '@images/front-pages/landing-page/hero-elements-light.png'
import { useMouse } from '@vueuse/core'
import 'video.js/dist/video-js.css'
import { ref } from 'vue'
import { useTheme } from 'vuetify'

const videos = [
  {
    src: "https://www.youtube.com/embed/7dng663ogik",
    title: "Welcome To Jaz Academy! 🌟 Komunitas Belajar yang mengintegrasikan pembelajaran Al-Qur'an, IT, dan entrepreneurship.",
  },
  {
    src: "https://www.youtube.com/embed/WkS-n5enYqg",
    title: "Mabar di Jaz Academy : Main Game Itu Boleh, Asal Gak Toxic dan Tau Waktu!",
  },
  {
    src: "https://www.youtube.com/embed/Hp8bYnD7-No",
    title: "Swimming : Renang adalah Skill Basic Survive Seorang Muslim",
  },
]

const randomVideo = ref(videos[Math.floor(Math.random() * videos.length)])

const theme = useTheme()
const heroElementsImg = useGenerateImageVariant(heroElementsImgLight, heroElementsImgDark)
const heroDashboardImg = useGenerateImageVariant(heroDashboardImgLight, heroDashboardImgDark)
const { x, y } = useMouse({ touch: false })

const translateMouse = computed(() => {
  if (typeof window !== 'undefined') {
    const rotateX = ref((window.innerHeight - 2 * y.value) / 100)
    
    return { transform: `perspective(1200px) rotateX(${ rotateX.value < -40 ? -20 : rotateX.value }deg) rotateY(${ (window.innerWidth - 2 * x.value) / 100 }deg) scale3d(1,1,1)` }
  }
})

const featuresData = [
  {
    title: 'Quality Code',
    desc: 'Code structure that all developers will easily understand and fall in love with.',
    icon: 'custom-laptop',
  },
  {
    title: 'Continuous Updates',
    desc: 'Free updates for the next 12 months, including new demos and features.',
    icon: 'custom-rocket',
  },
  {
    title: 'Starter Kit',
    desc: 'Start your project quickly without having to remove unnecessary features.',
    icon: 'custom-paper',
  },
  {
    title: 'API Ready',
    desc: 'Just change the endpoint and see your own data loaded within seconds.',
    icon: 'custom-check',
  },
  {
    title: 'Excellent Support',
    desc: 'An easy-to-follow doc with lots of references and code examples.',
    icon: 'custom-user',
  },
  {
    title: 'Well Documented',
    desc: 'An easy-to-follow doc with lots of references and code examples.',
    icon: 'custom-keyboard',
  },
]
</script>

<template>
  <div id="home">
    <div id="landingHero">
      <div
        class="landing-hero"
        :class="theme.current.value.dark ? 'landing-hero-dark-bg' : 'landing-hero-light-bg'"
      >
        <VContainer>
          <div class="hero-text-box text-center px-6">
            <p class="text-h2 text-sm-h1 text-primary hero-title  font-weight-bold text-wrap mb-4">
              Jaz Academy <br> Project Dashboard
            </p>
            <h5 class="mb-2 text-h5">
              We aren't just learning Professionality
            </h5>
            <h5 class="mb-6 text-h5">
              but also building a Productivity
            </h5>
            <div class="position-relative">
              <VBtn 
                height="36"
                href="https://jazmedia.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore Projects
              </VBtn>
            </div>
          </div>
        </VContainer>
      </div>
    </div>

    <div
      class="hero-video-section"
      :class="theme.current.value.dark ? 'video-bg-transition-dark' : 'video-bg-transition-light'"
    >
      <div class="hero-video-wrapper">
        <!-- FEATURE POST -->
        <VCard class="feature-post" elevation="0">
          <div class="video-container">
            <iframe
              :src="randomVideo.src"
              :title="randomVideo.title"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
              class="hero-video"
            />
          </div>
        </VCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.landing-hero {
  padding-block-start: 7rem;
  padding-block-end: 2.5rem;

  @media (max-width: 600px) {
    padding-block-start: 5.5rem;
    padding-block-end: 2rem;
  }
}

.hero-video-section {
  position: relative;
  z-index: 2;
  inline-size: 100%;
  margin-block-start: 0;
  padding-block: 0;

  &.video-bg-transition-light {
    background: linear-gradient(
      180deg,
      #fce5e6 0%,
      #fce5e6 30%,
      rgba(252, 229, 230, 0.75) 42%,
      rgba(var(--v-theme-background), 0.75) 58%,
      rgb(var(--v-theme-background)) 70%,
      rgb(var(--v-theme-background)) 100%
    );
  }

  &.video-bg-transition-dark {
    background: linear-gradient(
      180deg,
      #1e2130 0%,
      #1e2130 30%,
      rgba(30, 33, 48, 0.8) 42%,
      rgba(var(--v-theme-background), 0.8) 58%,
      rgb(var(--v-theme-background)) 70%,
      rgb(var(--v-theme-background)) 100%
    );
  }
}

.hero-video-wrapper {
  inline-size: 100%;
  margin-inline: auto;

  @media (min-width: 1920px) {
    max-inline-size: calc(1440px - 32px);
  }

  @media (min-width: 1280px) and (max-width: 1919px) {
    max-inline-size: calc(1200px - 32px);
  }

  @media (min-width: 960px) and (max-width: 1279px) {
    max-inline-size: calc(900px - 32px);
  }

  @media (min-width: 600px) and (max-width: 959px) {
    max-inline-size: calc(100% - 64px);
  }

  @media (max-width: 600px) {
    max-inline-size: calc(100% - 32px);
  }
}

section {
  display: block;
}

.blank-section{
  background-color: rgba(var(--v-theme-surface));
  min-block-size: 25rem;
}

.landing-hero::before{
  position: absolute;
  background-repeat: no-repeat;
  inset-block: 0;
  opacity: 0.5;
}

.landing-hero-dark-bg{
  background-color: #1e2130;
  background-image: url("@images/front-pages/backgrounds/hero-bg-dark.png");
  background-position: center;
  background-repeat: no-repeat;
}

.landing-hero-light-bg{
  background-image: linear-gradient(138.18deg, #eae8fd 0%, #fce5e6 94.44%);
}


@media (min-width: 600px)
{
  .hero-text-box {
    inline-size: 35rem;
    margin-block-end: 1rem;
    margin-inline: auto;
  }
}

.hero-title {
  animation: shine 2s ease-in-out infinite alternate;
  background: linear-gradient(to right, #28c76f 0%, #5a4aff 47.92%, #ff3739 100%);
  //  stylelint-disable-next-line property-no-vendor-prefix
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: rgba(0,0,0,0%);
}

@keyframes shine {
  0% {
    background-position: 0% 50%
  }

  80% {
    background-position: 50% 90%
  }

  100% {
    background-position: 91% 100%
  }
}

.hero-dashboard-img {
  margin-block: 0;
  margin-inline: auto;
  transform-style: preserve-3d;
  transition: all 0.35s;

  img{
    inline-size: 100%;
  }
}

.hero-elements-img {
  position: absolute;
  inset-block: 0;
  inset-inline-start: 0;
}

.feature-cards {
  margin-block-start: 6.25rem;
}

.hero-btn-item{
  inset-block-start: 80%;
  inset-inline-start: 0;
}

.feature-post {
  padding: 0.5rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  background-color: rgb(var(--v-theme-surface));
  box-shadow: 0 4px 18px rgba(0, 0, 0, 6%);
  overflow: hidden;

  @media (min-width: 600px) {
    padding: 0.75rem;
  }
}

.video-container {
  position: relative;
  inline-size: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: #000;
}

.hero-video {
  position: absolute;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
  border: 0;
  border-radius: 0.5rem;
  display: block;
}
</style>
