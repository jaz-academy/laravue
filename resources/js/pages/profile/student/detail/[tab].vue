<script setup>
import AccountSettingsAccount from '@/views/profile/student/account/AccountSettingsAccount.vue'
import AccountSettingsOthers from '@/views/profile/student/account/AccountSettingsOthers.vue'
import AccountSettingsParents from '@/views/profile/student/account/AccountSettingsParents.vue'
import AccountSettingsRoles from '@/views/profile/student/account/AccountSettingsRoles.vue'
import AccountSettingsSecurity from '@/views/profile/student/account/AccountSettingsSecurity.vue'

const route = useRoute('profile-student-detail-tab')

const activeTab = computed({
  get: () => route.params.tab,
  set: () => route.params.tab,
})

// tabs
const tabs = [
  {
    title: 'Account',
    icon: 'tabler-users',
    tab: 'account',
  },
  {
    title: 'Parents',
    icon: 'tabler-file-text',
    tab: 'parents',
  },
  {
    title: 'Others data',
    icon: 'tabler-link',
    tab: 'others',
  },
  {
    title: 'Security',
    icon: 'tabler-lock',
    tab: 'security',
  },
  {
    title: 'Roles',
    icon: 'tabler-bell',
    tab: 'roles',
  },
]

definePage({ meta: { navActiveLink: 'profile-student-detail-tab' } })
</script>

<template>
  <div>
    <VTabs
      v-model="activeTab"
      class="v-tabs-pill"
    >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
        :to="{ name: 'profile-student-detail-tab', params: { tab: item.tab } }"
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
      class="mt-6 disable-tab-transition"
      :touch="false"
    >
      <!-- Account -->
      <VWindowItem value="account">
        <AccountSettingsAccount />
      </VWindowItem>

      <!-- Security -->
      <VWindowItem value="security">
        <AccountSettingsSecurity />
      </VWindowItem>

      <!-- parents -->
      <VWindowItem value="parents">
        <AccountSettingsParents />
      </VWindowItem>

      <!-- roles -->
      <VWindowItem value="roles">
        <AccountSettingsRoles />
      </VWindowItem>

      <!-- others -->
      <VWindowItem value="others">
        <AccountSettingsOthers />
      </VWindowItem>
    </VWindow>
  </div>
</template>
