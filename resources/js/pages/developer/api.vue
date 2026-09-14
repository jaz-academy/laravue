<script setup>
import { $api } from '@/utils/api'
import ApiAnalyticsTab from '@/views/developer/api/ApiAnalyticsTab.vue'
import ApiExplorerTab from '@/views/developer/api/ApiExplorerTab.vue'
import ApiKeysTab from '@/views/developer/api/ApiKeysTab.vue'
import ApiStandardsTab from '@/views/developer/api/ApiStandardsTab.vue'
import { onMounted, ref } from 'vue'

// Active Tab
const activeTab = ref('standards')

// Snackbar / Toast
const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('success')

const showToast = (text, color = 'success') => {
  snackbarText.value = text
  snackbarColor.value = color
  snackbar.value = true
}

// Docs data shared across tabs
const docData = ref(null)
const apiKeysTabRef = ref(null)

const fetchDocs = async () => {
  try {
    const res = await $api('/developer/docs')

    docData.value = res
  } catch (err) {
    try {
      const pub = await $api('/developer/public-docs')

      docData.value = pub
    } catch (e) {
      console.error('Failed to load docs:', e)
    }
  }
}

onMounted(() => {
  fetchDocs()
})
</script>

<template>
  <div class="developer-api-page">
    <!-- Header Section -->
    <div class="d-flex flex-wrap justify-space-between align-center mb-6 gap-3">
      <div>
        <div class="d-flex align-center gap-2 mb-1">
          <VIcon
            icon="tabler-code"
            size="28"
            color="primary"
          />
          <h2 class="text-h4 font-weight-bold">
            Developer API Platform & Gateway
          </h2>
        </div>
        <p class="text-subtitle-1 text-medium-emphasis mb-0">
          Standar arsitektur platform 3-tier, manajemen API Key & Access Control, Versioning, Observability, dan Live API Explorer.
        </p>
      </div>
    </div>

    <!-- Navigation Tabs (Vuetify Pill Style) -->
    <VTabs
      v-model="activeTab"
      class="v-tabs-pill mb-2"
    >
      <VTab
        value="standards"
        prepend-icon="tabler-building-bank"
      >
        Standar & Arsitektur
      </VTab>
      <VTab
        value="keys"
        prepend-icon="tabler-key"
      >
        API Keys (Access Control)
      </VTab>
      <VTab
        value="explorer"
        prepend-icon="tabler-terminal-2"
      >
        Interactive API Explorer
      </VTab>
      <VTab
        value="analytics"
        prepend-icon="tabler-activity-heartbeat"
      >
        Monitoring & Observability
      </VTab>
    </VTabs>

    <!-- Tab Windows -->
    <VWindow
      v-model="activeTab"
      class="disable-tab-transition"
    >
      <!-- TAB 1: Standards -->
      <VWindowItem value="standards">
        <ApiStandardsTab :doc-data="docData" />
      </VWindowItem>

      <!-- TAB 2: Keys -->
      <VWindowItem value="keys">
        <ApiKeysTab
          ref="apiKeysTabRef"
          @show-toast="showToast"
        />
      </VWindowItem>

      <!-- TAB 3: Explorer -->
      <VWindowItem value="explorer">
        <ApiExplorerTab
          :doc-data="docData"
          :keys="apiKeysTabRef?.keys || []"
          @show-toast="showToast"
        />
      </VWindowItem>

      <!-- TAB 4: Analytics -->
      <VWindowItem value="analytics">
        <ApiAnalyticsTab @show-toast="showToast" />
      </VWindowItem>
    </VWindow>

    <!-- Global Snackbar Notification -->
    <VSnackbar
      v-model="snackbar"
      :color="snackbarColor"
      timeout="3000"
    >
      {{ snackbarText }}
    </VSnackbar>
  </div>
</template>
