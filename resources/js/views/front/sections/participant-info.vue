<script setup>
import { useGenerateImageVariant } from '@/@core/composable/useGenerateImageVariant'
import heroDashboardImgDark from '@images/front-pages/landing-page/hero-dashboard-dark.png'
import heroDashboardImgLight from '@images/front-pages/landing-page/hero-dashboard-light.png'
import heroElementsImgDark from '@images/front-pages/landing-page/hero-elements-dark.png'
import heroElementsImgLight from '@images/front-pages/landing-page/hero-elements-light.png'
import { useMouse } from '@vueuse/core'
import 'video.js/dist/video-js.css'
import { onMounted, ref } from 'vue'
import { useTheme } from 'vuetify'

const emit = defineEmits(['loginStatus'])
const participant = ref(null)
const theme = useTheme()
const heroElementsImg = useGenerateImageVariant(heroElementsImgLight, heroElementsImgDark)
const heroDashboardImg = useGenerateImageVariant(heroDashboardImgLight, heroDashboardImgDark)
const { x, y } = useMouse({ touch: false })
const showModalSignin = ref(false)
const showModalSignup = ref(false)
const avatar1 = ref(null)
const username = ref('')
const name = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const errorMessage = ref('')
const errors = ref([])

const resetFormFields = () => {
  username.value = ''
  name.value = ''
  password.value = ''
  passwordConfirmation.value = ''
  errorMessage.value = ''
  errors.value = []
}

onMounted(() => {
  const data = localStorage.getItem('participant')

  participant.value = data ? JSON.parse(data) : null
})

const handleAuthParticipant = () => {
  if (participant.value) {
    localStorage.removeItem('participant')
    participant.value = null
    emit('loginStatus', false)
  } else {
    showModalSignin.value = true
    resetFormFields()
  }
}

const handleSigninParticipant = async () => {
  if (username.value && password.value) {
    const data = { username: username.value, password: password.value }
    try {
      const { data: responseData, error } = await $api('/public/sign-in-participant', {
        method: 'POST',
        body: {
          username: data.username,
          password: data.password,
        },
        onResponseError({ response }) {
          errors.value = response._data.errors
          errorMessage.value = response._data.message || 'SignIn failed'
        },
      })

      console.log(responseData)
          
      localStorage.setItem('participant', JSON.stringify(responseData))
      participant.value = responseData
      showModalSignin.value = false
      emit('loginStatus', true)

    } catch (err) {
      console.error(err)
    }
  }
}

const handleSignupParticipant = async () => {
  if (name.value && username.value && password.value && passwordConfirmation.value) {
    try {
      if (password.value === passwordConfirmation.value) {
        const { data: responseData } = await $api('/public/participants', {
          method: 'POST',
          body: {
            name: name.value,
            username: username.value,
            password: password.value,
            passwordConfirmation: passwordConfirmation.value,
            role: 1,
            image: null,
          },
          onResponseError({ response }) {
            errors.value = response._data.errors
            errorMessage.value = response._data.message || 'SignUp failed'
          },
        })

        console.log(responseData)
          
        localStorage.setItem('participant', JSON.stringify(responseData))
        participant.value = responseData
        showModalSignup.value = false
      } else {
        alert('Password and Confirm Password do not match')
      }
    } catch (error) {
      console.error('Error during signup:', error)
    }
  }
}

// const translateMouse = computed(() => {
//   if (typeof window !== 'undefined') {
//     const rotateX = ref((window.innerHeight - 2 * y.value) / 100)
    
//     return { transform: `perspective(1200px) rotateX(${ rotateX.value < -40 ? -20 : rotateX.value }deg) rotateY(${ (window.innerWidth - 2 * x.value) / 100 }deg) scale3d(1,1,1)` }
//   }
// })

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
            <VAvatar
              v-if="participant"
              size="200"
              variant="tonal"
              color="primary"
              class="mb-4"
            >
              <VImg
                v-if="avatar1"
                :src="avatar1"
              />
              <span v-else>{{ participant.name ? avatarText(participant.name) : 'AB' }}</span>
            </VAvatar>
            <p
              v-if="participant"
              class="text-h2 text-sm-h1 text-primary hero-title  font-weight-bold text-wrap mb-0"
            >
              {{ participant.name }}
            </p>
            <h5 class="mb-4 text-h5">
              <template v-if="participant">
                Thank you for your participation!
              </template>
              <template v-else>
                <p class="text-h2 text-sm-h1 text-primary hero-title  font-weight-bold text-wrap mb-4">
                  Marhaban !
                </p>
                Welcome to our platform
                <div class="mb-4">
                  Click here to <a
                    style="display: inline; cursor: pointer;"
                    @click="showModalSignup = true"
                  >Signup as New Participant!</a>
                </div>
              </template>
            </h5>
            <div class="position-relative">
              <VBtn
                height="36"
                @click="handleAuthParticipant"
              >
                {{ participant ? 'Sign Out' : 'Sign In' }}
              </VBtn>
            </div>
          </div>
        </VContainer>
        <div
          v-if="showModalSignin"
          class="modal-overlay"
        >
          <div class="modal-content">
            <VAlert
              v-if="errorMessage"
              type="error"
              class="mb-5"
              dismissible
              @click="errorMessage = ''"
            >
              {{ errorMessage }}
            </VAlert>
            <VForm @submit.prevent="{}">
              <VRow>
                <VCol cols="12">
                  <AppTextField
                    v-model="username"
                    prepend-inner-icon="tabler-user"
                    label="Username / Email"
                    placeholder="Mehmed"
                  />
                </VCol>

                <VCol cols="12">
                  <AppTextField
                    v-model="password"
                    prepend-inner-icon="tabler-lock"
                    label="Password"
                    autocomplete="on"
                    type="password"
                    placeholder="············"
                  />
                </VCol>

                <VCol cols="12">
                  Not a Participant yet? <a
                    style="display: inline; cursor: pointer;"
                    @click="showModalSignin = false, showModalSignup = true"
                  >Signup first!</a>
                </VCol>

                <VCol cols="12">
                  <VBtn
                    type="submit"
                    class="me-2"
                    @click="handleSigninParticipant"
                  >
                    Sign In
                  </VBtn>

                  <VBtn 
                    color="warning" 
                    class="me-2"
                    @click="showModalSignin = false"
                  >
                    Cancel
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>
          </div>
        </div>
        <div
          v-if="showModalSignup"
          class="modal-overlay"
        >
          <div class="modal-content">
            <VAlert
              v-if="errorMessage"
              type="error"
              class="mb-5"
              dismissible
              @click="errorMessage = ''"
            >
              {{ errorMessage }}
            </VAlert>
            <VForm @submit.prevent="{}">
              <VRow>
                <VCol cols="12">
                  <AppTextField
                    v-model="name"
                    prepend-inner-icon="tabler-user"
                    label="Full Name"
                    placeholder="Muhammad"
                  />
                </VCol>

                <VCol cols="12">
                  <AppTextField
                    v-model="username"
                    prepend-inner-icon="tabler-checkbox"
                    label="Username"
                    placeholder="Mehmed"
                  />
                </VCol>

                <VCol cols="12">
                  <AppTextField
                    v-model="password"
                    prepend-inner-icon="tabler-lock"
                    label="Password"
                    autocomplete="on"
                    type="password"
                    placeholder="············"
                  />
                </VCol>

                <VCol cols="12">
                  <AppTextField
                    v-model="passwordConfirmation"
                    prepend-inner-icon="tabler-lock"
                    label="Retype Password"
                    autocomplete="on"
                    type="password"
                    placeholder="············"
                  />
                </VCol>

                <VCol cols="12">
                  Already joined Participant? <a
                    style="display: inline; cursor: pointer;"
                    @click="showModalSignin = true, showModalSignup = false"
                  >Signin instead!</a>
                </VCol>

                <VCol cols="12">
                  <VBtn
                    type="submit"
                    class="me-2"
                    @click="handleSignupParticipant"
                  >
                    Sign Up
                  </VBtn>

                  <VBtn 
                    color="warning" 
                    class="me-2"
                    @click="showModalSignup = false"
                  >
                    Cancel
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 50%);
  inset: 0;
}

.modal-content {
  padding: 2rem;
  border-radius: 8px;
  margin: 1rem;
  background: rgb(var(--v-theme-surface));
  box-shadow: 0 4px 6px rgba(0, 0, 0, 10%);

  @media (min-width: 1280px) {
    inline-size: 30%;
  }

  @media (min-width: 768px) and (max-width: 1279px) {
    inline-size: 50%;
  }

  @media (max-width: 767px) {
    inline-size: 100%;
  }
}

.landing-hero {
  padding-block: 7rem 1rem;
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

@media (min-width: 1920px) {
  .hero-animation-img {
    max-inline-size: calc(1440px - 32px);
  }
}

@media (min-width: 1280px) and (max-width: 1919px) {
  .hero-animation-img {
    max-inline-size: calc(1200px - 32px);
  }
}

@media (min-width: 960px) and (max-width: 1279px) {
  .hero-animation-img {
    max-inline-size: calc(900px - 32px);
  }
}

@media (min-width: 600px) and (max-width: 959px) {
  .hero-animation-img {
    max-inline-size: calc(100% - 64px);
  }
}

@media (max-width: 600px) {
  .hero-animation-img {
    max-inline-size: calc(100% - 32px);
  }
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
