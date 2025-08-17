<script setup>
import avatar from '@images/avatars/no-profile.png'

const props = defineProps({
  teachers: Array,
})
</script>

<template>
  <VCard>
    <VCardItem title="Popular Mentor">
      <template #append>
        <MoreBtn />
      </template>
    </VCardItem>
    <VDivider />
    <div class="text-overline d-flex justify-space-between px-5">
      <span>Mentor</span>
      <span>Reviews</span>
    </div>
    <VDivider />
    <VCardText>
      <VList class="card-list scrollable-card">
        <VListItem
          v-for="item in props.teachers"
          :key="item.admin_teacher_id"
        >
          <template #prepend>
            <VAvatar
              v-if="item.admin_teacher.image"
              size="34"
              :image="`/storage/${item.admin_teacher.image}`"
            />
            <VAvatar
              v-else
              rounded
              size="34"
              :image="avatar"
            />
          </template>
          <VListItemTitle class="font-weight-medium">
            {{ item.admin_teacher.nickname }}
          </VListItemTitle>
          <VListItemSubtitle class="text-disabled">
            {{ item.admin_teacher.note || item.admin_teacher.name }}
          </VListItemSubtitle>

          <template #append>
            <span class="text-body-1 text-high-emphasis">
              {{ item.count }}
            </span>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.scrollable-card {
  block-size: 230px;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  overflow-y: auto;
}

.scrollable-card::-webkit-scrollbar { 
  display: none;  /* Safari and Chrome */
}
</style>
