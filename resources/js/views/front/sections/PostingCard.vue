<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import GDriveEmbed from './GDriveEmbed.vue'
import InstagramEmbed from './InstagramEmbed.vue'

const props = defineProps({
  taskName: String,
  description: String,
  subject: String,
  theme: String,
  stars: String,
  media: String,
  postId: String,
  studentName: String,
  nickname: String,
  email: String,
  mentor: String,
  review: String,
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
  <VCard class="posting-card mb-4">
    <VCardText>
      <VRow>
        <!-- CONTENT POST -->
        <VCol
          cols="12"
          md="8"
        >
          <GDriveEmbed
            v-if="props.media == 'Google Drive'"
            :post-id="props.postId"
          />
          <InstagramEmbed
            v-if="props.media == 'Instagram'"
            :post-id="props.postId"
          />
        </VCol>

        <!-- DESCRIPTION -->
        <VCol
          cols="12"
          md="4"
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
                  v-if="avatar"
                  :src="avatar"
                />
                <span v-else>{{ avatarText(props.studentName) }}</span>
              </VAvatar>
              <div class="d-flex flex-column">
                <h6 class="text-base">
                  <RouterLink
                    class="font-weight-medium text-link"
                    to="/"
                  >
                    {{ props.studentName }}
                  </RouterLink>
                </h6>
                <span class="text-sm text-medium-emphasis">{{ props.email || props.nickname }}</span>
              </div>
            </div>
            <hr class="my-custom-line">
            <p class="text-body-1">
              {{ props.subject +': '+ props.theme }}
            </p>
            <p class="text-body-2">
              <span class="text-primary">{{ props.taskName }}</span>
              {{ props.description }}
            </p>
            <div class="d-flex align-center">
              <VAvatar
                size="34"
                variant="tonal"
                color="primary"
                class="me-3"
              >
                <VImg
                  v-if="avatar"
                  :src="avatar"
                />
                <span v-else>{{ avatarText(props.studentName) }}</span>
              </VAvatar>
              <div class="d-flex flex-column">
                <h6 class="text-base">
                  <RouterLink
                    class="font-weight-medium text-link"
                    to="/"
                  >
                    {{ props.mentor }}
                  </RouterLink>
                </h6>
                <span class="text-sm text-medium-emphasis">
                  <VRating
                    readonly
                    half-increments
                    size="x-small"
                    density="compact" 
                    :model-value="props.stars"
                  />
                </span>
              </div>
            </div>
            <p class="text-body-2">
              {{ props.review }}
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
              <VIcon icon="tabler-bookmark-filled" class="text-primary" />
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

.custom-rating {
  justify-content: center; /* Posisi horizontal, misalnya di tengah */
  gap: 8px; /* Jarak antar bintang */
}

/* @media (min-width: 1920px) {
  .posting-card {
    max-inline-size: calc(1440px - 32px);
  }
}

@media (min-width: 1280px) and (max-width: 1919px) {
  .posting-card {
    max-inline-size: calc(1200px - 32px);
  }
}

@media (min-width: 960px) and (max-width: 1279px) {
  .posting-card {
    max-inline-size: calc(900px - 32px);
  }
}

@media (min-width: 600px) and (max-width: 959px) {
  .posting-card {
    max-inline-size: calc(100% - 64px);
  }
}

@media (max-width: 600px) {
  .posting-card {
    max-inline-size: calc(100% - 32px);
  }
} */
</style>
