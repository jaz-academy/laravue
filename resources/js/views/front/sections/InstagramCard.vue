<script setup>
import { fetchTeacherData, teachers } from '@/composables/fetchTeacherData'
import InstagramEmbed from '@/views/front/sections/InstagramEmbed.vue'
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'

const props = defineProps({
  taskId: Number,
  taskName: String,
  description: String,
  subject: String,
  theme: String,
  stars: Number,
  media: String,
  postId: String,
  studentName: String,
  nickname: String,
  email: String,
  teacher: Object,
  accepted: Number,
  review: String,
})

const dataStorageParticipant = localStorage.getItem('participant')
const participant = dataStorageParticipant ? JSON.parse(dataStorageParticipant) : null
const showModalRating = ref(false)
const errorMessage = ref('')
const mentor = ref(props.teacher)
const accepted = ref(props.accepted ? 'Yes' : 'No')
const review = ref(props.review)
const rating = ref(props.stars)
const ratingCol = ref(props.accepted ? true : false)

const teacherOptions = computed(() =>
  teachers.value.map(item => ({
    title: item.nickname,
    value: {
      id: item.id,
      name: item.nickname,
    },
  })),
)


// console.log('user : ', participant.role);

const handleRatingCollumn = value => {
  if (value === 'Yes') {
    ratingCol.value = true
  } else {
    ratingCol.value = false
  }
}

const handleRating = async () => {
  if (mentor.value === '') {
    errorMessage.value = 'Please select a mentor'
    
    return
  } else if (accepted.value === '') {
    errorMessage.value = 'Please select accepted'
    
    return
  } else if (rating.value === 0) {
    errorMessage.value = 'Please select a rating'
    
    return
  } else if (review.value === '') {
    errorMessage.value = 'Please write a review'
    
    return
  } else {
    // Handle the rating submission logic here
    const ratingData = {
      admin_teacher_id: mentor.value.id,
      accepted: accepted.value == 'Yes' ? 1 : 0,
      rate: rating.value,
      review: review.value,
    }

    console.log('Rating submitted:', ratingData)
    try {
      const response = await $api(`/public/update-task-accepted/${props.taskId}`, {
        method: 'POST',
        body: ratingData,
        onResponseError({ err }) {
          errorMessage.value = err
        },
      })

      console.log('Rating response:', response)
      rating.value = response.data.rate
      review.value = response.data.review
    } catch (error) {
      console.error('Error submitting rating:', error)
    }
    showModalRating.value = false
  }
}

const handleScroll = () => {
  const scrollPosition = window.scrollY || document.documentElement.scrollTop
  if (scrollPosition > 100) { 
    showModalRating.value = false
  }
}

onMounted(() => {
  fetchTeacherData()
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const comments = [
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
</script>

<template>
  <VCard class="mb-4">
    <VCardText>
      <VRow>
        <!-- CONTENT POST -->
        <VCol
          cols="12"
          md="6"
          class="border border-red"
        >
          <InstagramEmbed
            v-if="props.media == 'Instagram'"
            :post-id="props.postId"
          />
        </VCol>

        <!-- DESCRIPTION -->
        <VCol
          cols="12"
          md="6"
        >
          <div>
            <div class="d-flex align-center">
              <VAvatar
                size="34"
                variant="tonal"
                color="primary"
                class="me-3"
              >
                <VImg
                  v-if="avatar1"
                  :src="avatar1"
                />
                <span v-else>{{ avatarText(props.studentName) }}</span>
              </VAvatar>
              <RouterLink
                :to="`/?search=${abbreviateName(props.studentName, 10, 1).toLowerCase()}`"
                class="d-flex flex-column"
              >
                <h6 class="text-base text-primary">
                  {{ abbreviateName(props.studentName, 30, 3) }}
                </h6>
                <span class="text-sm text-medium-emphasis">{{ props.email || props.nickname }}</span>
              </RouterLink>
            </div>
            <hr class="my-custom-line">
            <RouterLink
              :to="`/?search=${abbreviateName(props.theme, 30, 4).toLowerCase()}`"
              class="d-flex flex-column"
            >
              <p class="text-body-1 text-primary">
                {{ props.subject +': '+ props.theme }}
              </p>
            </RouterLink>
            <p class="text-body-2 d-inline">
              <RouterLink
                :to="`/?search=${taskId}`"
                class="text-primary"
              >
                {{ props.taskName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }}
              </RouterLink>
              {{ props.description }}
            </p>
            <div class="d-flex align-center mt-4">
              <VAvatar
                size="34"
                variant="tonal"
                class="me-3"
                :color="props.accepted ? 'primary' : 'warning'"
              >
                <span>{{ props.accepted ? avatarText(mentor.name) : '' }}</span>
              </VAvatar>
              <div class="d-flex flex-column">
                <div class="d-flex flex-column">
                  <h6 class="text-base text-primary ms-1">
                    {{ mentor.name }}
                  </h6>
                </div>
                <div class="text-sm text-medium-emphasis cursor-pointer">
                  <template v-if="participant && participant.role > 1">
                    <div
                      class="d-flex flex-column"
                      @click="showModalRating = true"
                    >
                      <VRating
                        v-model="rating"
                        readonly
                        half-increments
                        size="x-small"
                        density="compact"
                      />
                    </div>
                  </template>
                  <template v-else>
                    <RouterLink 
                      to="/front/bookmark" 
                      class="d-flex flex-column"
                    >
                      <VRating
                        v-model="rating"
                        readonly
                        half-increments
                        size="x-small"
                        density="compact"
                      />
                    </RouterLink>
                  </template>
                </div>
              </div>
            </div>
            <p class="text-body-2 mt-2">
              {{ review }}
            </p>
            <hr class="my-custom-line">
            <div class="d-flex justify-space-between my-4 flex-wrap action-icons">
              <div class="">
                <VIcon icon="tabler-message-2" />
                <VIcon
                  icon="tabler-heart"
                  class="ms-2"
                />
              </div>
              <VIcon icon="tabler-bookmark" />
            </div>
            <div
              v-if="showModalRating"
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
                      <AppSelect
                        v-model="mentor"
                        label="Mentor"
                        placeholder="Select Mentor"
                        :items="teacherOptions"
                        item-title="value.name"
                        item-value="value"
                      />
                    </VCol>

                    <VCol cols="12">
                      <AppSelect
                        v-model="accepted"
                        label="Accepted"
                        placeholder="Not Accepted"
                        :items="['Yes', 'No']"
                        @update:model-value="handleRatingCollumn"
                      />
                    </VCol>
                    
                    <VCol
                      v-if="ratingCol"
                      cols="12"
                      class="text-center"
                    >
                      <VRating
                        v-model="rating"
                        half-increments
                        hover
                      />
                      <AppTextarea
                        v-model="review"
                        placeholder="Write your review..."
                        :rows="3"
                      />
                    </VCol>

                    <VCol
                      cols="12"
                      class="mt-4"
                    >
                      <VBtn
                        type="submit"
                        class="me-2"
                        @click="handleRating"
                      >
                        Save
                      </VBtn>

                      <VBtn 
                        color="secondary" 
                        class="me-2"
                        @click="showModalRating = false"
                      >
                        Cancel
                      </VBtn>
                    </VCol>
                  </VRow>
                </VForm>
              </div>
            </div>

            <!-- COMMENT -->
            <div 
              class="flex-grow-1 overflow-auto"
              style="max-block-size: 100%;"
            >
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
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<style>
.modal-overlay {
  position: fixed;
  z-index: 999999999;
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

.my-custom-line {
  border: 0;
  background: linear-gradient(to right, #4c4eaf, #af4c4c);
  block-size: 1px;
  margin-block: 20px;
  margin-inline: 0;
}

.action-icons {
  cursor: pointer;
}
</style>
