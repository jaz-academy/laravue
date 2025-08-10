<script setup>
import { fetchMemberData, member } from '@/composables/fetchMemberData'
import avatar from '@images/avatars/no-profile.png'
import UserProfileHeaderBg from '@images/pages/user-profile-header-bg.png'

onMounted(() => {
  fetchMemberData()
})
</script>

<template>
  <VCard v-if="member">
    <VImg
      :src="UserProfileHeaderBg"
      min-height="125"
      max-height="250"
      cover
    />

    <VCardText class="d-flex align-bottom flex-sm-row flex-column justify-center gap-x-5">
      <div class="d-flex h-0">
        <VAvatar
          rounded
          size="120"
          :image="avatar"
          class="user-profile-avatar mx-auto"
        />
      </div>

      <div class="user-profile-info w-100 mt-16 pt-6 pt-sm-0 mt-sm-0">
        <h5 class="text-h5 text-center text-sm-start font-weight-medium mb-3">
          {{ member?.name }}
        </h5>

        <div class="d-flex align-center justify-center justify-sm-space-between flex-wrap gap-4">
          <div class="d-flex flex-wrap justify-center justify-sm-start flex-grow-1 gap-4">
            <span class="d-flex">
              <VIcon
                size="20"
                icon="tabler-color-swatch"
                class="me-1"
              />
              <span class="text-body-1">
                {{ member?.role || member?.note }}
              </span>
            </span>

            <span class="d-flex">
              <VIcon
                size="20"
                icon="tabler-map-pin"
                class="me-1"
              />
              <span class="text-body-1">
                {{ member?.city }}
              </span>
            </span>

            <span class="d-flex">
              <VIcon
                size="20"
                icon="tabler-calendar"
                class="me-1"
              />
              <span class="text-body-1">
                {{ member?.birth_date }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.user-profile-avatar {
  border: 5px solid rgb(var(--v-theme-surface));
  background-color: rgb(var(--v-theme-surface)) !important;
  inset-block-start: -3rem;

  .v-img__img {
    border-radius: 0.125rem;
  }
}
</style>
