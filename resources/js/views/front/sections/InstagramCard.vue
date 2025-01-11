<script setup>
import InstagramEmbed from '@/views/front/sections/InstagramEmbed.vue'
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'

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
          <InstagramEmbed post-id="DEScjB8y3vN" />
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
                <span v-else>AB</span>
              </VAvatar>
              <div class="d-flex flex-column">
                <h6 class="text-base">
                  <RouterLink
                    class="font-weight-medium text-link"
                    to="/"
                  >
                    Hijaz Abdullah
                  </RouterLink>
                </h6>
                <span class="text-sm text-medium-emphasis">hijazabdullah@gmail.com</span>
              </div>
            </div>
            <hr class="my-custom-line">
            <p class="text-body-1">
              Next Generation Frontend Architecture Using Layout Engine And Vue.
            </p>
            <p class="text-body-2">
              Next Generation Frontend Architecture Using Layout Engine And Vue.
            </p>
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
                <span v-else>KF</span>
              </VAvatar>
              <div class="d-flex flex-column">
                <h6 class="text-base">
                  <RouterLink
                    class="font-weight-medium text-link"
                    to="/"
                  >
                    Abu Kafa
                  </RouterLink>
                </h6>
                <span class="text-sm text-medium-emphasis">
                  <VRating
                    readonly
                    half-increments
                    size="x-small"
                    density="compact" 
                    :model-value="4"
                  />
                </span>
              </div>
            </div>
            <p class="text-body-2">
              Next Generation Frontend Architecture Using Layout Engine And Vue.
            </p>
            <hr class="my-custom-line">
            <div class="d-flex justify-space-between my-4 flex-wrap action-icons">
              <div class="">
                <VIcon icon="tabler-heart" />
                <VIcon
                  icon="tabler-message-2"
                  class="ms-2"
                />
              </div>
              <VIcon icon="tabler-bookmark" />
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
</style>
