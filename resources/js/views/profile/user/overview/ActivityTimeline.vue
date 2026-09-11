<script setup>
import { humanDate } from '@/@core/utils/helpers'
import { activities } from '@/composables/fetchMemberData'
import avatar from '@images/avatars/no-profile.png'

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
      <div
        v-if="!activities || activities.length === 0"
        class="text-center py-8 text-disabled"
      >
        <VIcon
          icon="tabler-clipboard-off"
          size="40"
          class="mb-2"
        />
        <p class="mb-0">Belum ada aktivitas tugas.</p>
      </div>

      <VTimeline
        v-else
        density="compact"
        align="start"
        truncate-line="both"
        class="v-timeline-density-compact"
      >
        <VTimelineItem
          v-for="task in activities"
          :key="task.id"
          :dot-color="(task.rate || task.grade) > 0 ? 'primary' : 'secondary'"
          size="x-small"
        >
          <div class="d-flex justify-space-between align-center flex-wrap">
            <span class="app-timeline-title">
              {{ task.name || task.caption || `Task #${task.id}` }}
            </span>
            <span class="app-timeline-meta">{{ humanDate(task.date || task.created_at) }}</span>
          </div>
          <div class="d-flex justify-space-between align-center flex-wrap">
            <span class="app-timeline-text mb-2">
              {{ task.project_plan?.subject || task.project?.title || 'Project' }} - {{ task?.media || task?.media_type || 'Media' }} - {{ task.project_plan?.theme || task.project?.title || '' }}
            </span>
            <a
              :href="`/?search=${task.id}`"
              class="app-timeline-text"
            >{{ task.id }}</a>
          </div>

          <div
            v-if="(task.rate || task.grade) > 0"
            class="d-flex align-center mt-3"
          >
            <VAvatar
              size="38"
              class="me-3"
              :image="avatar"
            />
            <div>
              <h6 class="text-sm font-weight-medium mb-1">
                {{ task.admin_teacher?.name || task.mentor?.name || 'Mentor' }}
              </h6>
              <p class="app-timeline-meta">
                {{ task?.review || task?.review_comment || '-' }}
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
