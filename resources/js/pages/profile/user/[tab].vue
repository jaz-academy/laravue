<script setup>
import UserProfileHeader from '@/views/profile/user/UserProfileHeader.vue'
import UserOverview from '@/views/profile/user/overview/index.vue'
import UserProjects from '@/views/profile/user/projects/index.vue'
import UserRates from '@/views/profile/user/rates/index.vue'
import UserTasks from '@/views/profile/user/tasks/index.vue'

definePage({
  meta: {
    navActiveLink: 'profile-user-tab',
    key: 'tab',
  },
})

const route = useRoute('profile-user-tab')

const activeTab = computed({
  get: () => route.params.tab,
  set: () => route.params.tab,
})

// tabs
const tabs = [
  {
    title: 'Overview',
    icon: 'tabler-user-check',
    tab: 'overview',
  },
  {
    title: 'Tasks',
    icon: 'tabler-users',
    tab: 'tasks',
  },
  {
    title: 'Projects',
    icon: 'tabler-layout-grid',
    tab: 'projects',
  },
  {
    title: 'Rates',
    icon: 'tabler-link',
    tab: 'rates',
  },
]
</script>

<template>
  <div>
    <UserProfileHeader class="mb-5" />

    <VTabs
      v-model="activeTab"
      class="v-tabs-pill"
    >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
        :to="{ name: 'profile-user-tab', params: { tab: item.tab } }"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        {{ item.title }}
      </VTab>
    </VTabs>

    <VWindow
      v-model="activeTab"
      class="mt-5 disable-tab-transition"
      :touch="false"
    >
      <!-- Profile -->
      <VWindowItem value="overview">
        <UserOverview />
      </VWindowItem>

      <!-- tasks -->
      <VWindowItem value="tasks">
        <UserTasks />
      </VWindowItem>

      <!-- Projects -->
      <VWindowItem value="projects">
        <UserProjects />
      </VWindowItem>

      <!-- rates -->
      <VWindowItem value="rates">
        <UserRates />
      </VWindowItem>
    </VWindow>
  </div>
</template>
