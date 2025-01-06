<script setup>
import { activities } from '@/composables/fetchMemberData'
import avatar2 from '@images/avatars/avatar-2.png'

console.log(activities)
</script>

<template>
  <VCard>
    <VCardItem>
      <template #prepend>
        <VIcon icon="tabler-timeline" />
      </template>

      <VCardTitle>Activity Timeline</VCardTitle>

      <template #append>
        <div>
          <MoreBtn
            :menu-list="[
              { title: 'Share timeline', value: 'Share timeline' },
              { title: 'Suggest edits', value: 'Suggest edits' },
              { title: 'Report bug', value: 'Report bug' },
            ]"
          />
        </div>
      </template>
    </VCardItem>

    <VCardText class="scrollable-card">
      <VTimeline
        density="compact"
        align="start"
        truncate-line="both"
        class="v-timeline-density-compact"
      >
        <VTimelineItem
          v-for="task in activities"
          :key="task.id"
          :dot-color="task.rate > 1 ? 'primary' : 'secondary'"
          size="x-small"
        >
          <div class="d-flex justify-space-between align-center flex-wrap">
            <span class="app-timeline-title">
              {{ task.name }}
            </span>
            <span class="app-timeline-meta">{{ task.date }}</span>
          </div>
          <p class="app-timeline-text mb-2">
            {{ task.project_plan?.theme }}
          </p>

          <div
            v-if="task.rate > 0"
            class="d-flex align-center mt-3"
          >
            <VAvatar
              size="38"
              class="me-3"
              :image="avatar2"
            />
            <div>
              <h6 class="text-sm font-weight-medium mb-1">
                {{ task.admin_teacher?.name }}
              </h6>
              <p class="app-timeline-meta">
                {{ task?.review }}
              </p>
            </div>
          </div>
        </VTimelineItem>
      </VTimeline>
    </VCardText>
  </VCard>
</template>

<style scoped>
.scrollable-card {
  block-size: 616px;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  overflow-y: auto;
}

.scrollable-card::-webkit-scrollbar { 
  display: none;  /* Safari and Chrome */
}
</style>
