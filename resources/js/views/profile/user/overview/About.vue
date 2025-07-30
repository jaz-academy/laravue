<script setup>
const props = defineProps({
  data: {
    type: null,
    required: true,
  },
})
</script>

<template>
  <VCard class="mb-4">
    <VCardText>
      <p class="text-xs">
        ABOUT
      </p>

      <VList class="card-list text-medium-emphasis">
        <VListItem>
          <div class="d-flex align-items-center mt-4">
            <VIcon
              size="20"
              class="me-2"
              icon="tabler-user"
            />
            <VListItemTitle>
              <span class="font-weight-medium me-1">Full Name:</span>
              <span>{{ props.data.name }}</span>
            </VListItemTitle>
          </div>
          <div class="d-flex align-items-center mt-4">
            <VIcon
              size="20"
              class="me-2"
              icon="tabler-check"
            />
            <VListItemTitle>
              <span class="font-weight-medium me-1">Status:</span>
              <span>{{ props.data.registered ? 'Active' : 'Suspend' }}</span>
            </VListItemTitle>
          </div>
          <div class="d-flex align-items-center mt-4">
            <VIcon
              size="20"
              class="me-2"
              icon="tabler-crown"
            />
            <VListItemTitle>
              <span class="font-weight-medium me-1">Gender:</span>
              <span>{{ props.data.gender }}</span>
            </VListItemTitle>
          </div>
          <div class="d-flex align-items-center mt-4">
            <VIcon
              size="20"
              class="me-2"
              icon="tabler-calendar"
            />
            <VListItemTitle>
              <span class="font-weight-medium me-1">Birth:</span>
              <span>{{ props.data.birth_date }}</span>
            </VListItemTitle>
          </div>
          <div class="d-flex align-items-center mt-4">
            <VIcon
              size="20"
              class="me-2"
              icon="tabler-location"
            />
            <VListItemTitle>
              <span class="font-weight-medium me-1">Place:</span>
              <span>{{ props.data.birth_place }}</span>
            </VListItemTitle>
          </div>
          <div class="d-flex align-items-center mt-4">
            <VIcon
              size="20"
              class="me-2"
              icon="tabler-flag"
            />
            <VListItemTitle>
              <span class="font-weight-medium me-1">Language:</span>
              <span>Indonesia</span>
            </VListItemTitle>
          </div>
        </VListItem>
      </VList>

      <p class="text-xs mt-8">
        CONTACTS
      </p>

      <VList class="card-list text-medium-emphasis">
        <VListItem>
          <div class="d-flex align-items-center mt-4">
            <VIcon
              size="20"
              class="me-2"
              icon="tabler-phone"
            />
            <VListItemTitle>
              <span class="font-weight-medium me-1">Phone:</span>
              <span>{{ props.data.own_phone || props.data.phone }}</span>
            </VListItemTitle>
          </div>
          <div class="d-flex align-items-center mt-4">
            <VIcon
              size="20"
              class="me-2"
              icon="tabler-mail"
            />
            <VListItemTitle>
              <span class="font-weight-medium me-1">Email:</span>
              <span>{{ props.data.email }}</span>
            </VListItemTitle>
          </div>
          <div class="d-flex align-items-center mt-4">
            <VIcon
              size="20"
              class="me-2"
              icon="tabler-brand-instagram"
            />
            <VListItemTitle>
              <span class="font-weight-medium me-1">Instagram:</span>
              <span>{{ props.data.instagram }}</span>
            </VListItemTitle>
          </div>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>

  <VCard>
    <VCardText>
      <p class="text-xs">
        OVERVIEW
      </p>

      <VList class="card-list text-medium-emphasis">
        <div class="d-flex align-items-center mt-4">
          <VIcon
            size="20"
            class="me-2"
            icon="tabler-device-gamepad-2"
          />
          <VListItemTitle>
            <span class="font-weight-medium me-1">Hobby:</span>
            <span>{{ props.data.hobby }}</span>
          </VListItemTitle>
        </div>
        <div class="d-flex align-items-center mt-4">
          <VIcon
            size="20"
            class="me-2"
            icon="tabler-swimming"
          />
          <VListItemTitle>
            <span class="font-weight-medium me-1">Sport:</span>
            <span>{{ props.data.sport }}</span>
          </VListItemTitle>
        </div>
        <div class="d-flex align-items-center mt-4">
          <VIcon
            size="20"
            class="me-2"
            icon="tabler-target-arrow"
          />
          <VListItemTitle>
            <span class="font-weight-medium me-1">Goal:</span>
            <span>{{ props.data.ambition }}</span>
          </VListItemTitle>
        </div>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 16px;
}
</style>
