<script setup>
import { useGenerateImageVariant } from '@/@core/composable/useGenerateImageVariant'
import avatar1 from '@images/avatars/avatar-1.png'
import heroDashboardImgDark from '@images/front-pages/landing-page/hero-dashboard-dark.png'
import heroDashboardImgLight from '@images/front-pages/landing-page/hero-dashboard-light.png'
import heroElementsImgDark from '@images/front-pages/landing-page/hero-elements-dark.png'
import heroElementsImgLight from '@images/front-pages/landing-page/hero-elements-light.png'
import { useMouse } from '@vueuse/core'
import 'video.js/dist/video-js.css'
import { useTheme } from 'vuetify'

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
  <div
    id="home"
    :style="{ background: 'rgb(var(--v-theme-surface))' }"
  >
    <div
      id="landingHero"
      class="mb-6"
    >
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
              <RouterLink to="#content-post">
                <VBtn height="36">
                  Explore Our World
                </VBtn>
              </RouterLink>
            </div>
          </div>
        </VContainer>
      </div>
    </div>

    <div class="position-relative">
      <div class="hero-animation-img position-absolute">
        <div class="d-none justify-center">
          <div
            v-for="(data, index) in featuresData"
            :key="index"
            cols="4"
            md="2"
            class="mx-md-12 mx-6 my-8"
          >
            <VIcon
              :icon="data.icon"
              size="64"
              color="primary"
            />
          </div>
        </div>
        <div class="d-none justify-center">
          <VAvatar
            v-for="i in 8"
            :key="i"
            size="120"
            class="mx-3"
            :image="avatar1"
          />
        </div>
        <!-- FEATURE POST -->
        <VCard class="mt-8">
          <VCardText>
            <VRow class="align-items-stretch h-100">
              <VCol cols="12">
                <iframe
                  width="100%"
                  height="435"
                  src="https://www.youtube.com/embed/7WejWscG18c"
                  title="Podcast : Pintar Sholeh Tapi Miskin."
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                />
              </VCol>
            </vrow>
          </VCardText>
        </VCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.landing-hero {
  padding-block: 7rem 22rem;
}

.hero-animation-img{
  position: absolute;
  inline-size: 90%;
  inset-block-start: -25rem;
  inset-inline-start: 50%;
  margin-inline: auto;
  transform: translateX(-50%);
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
</style>
