<script setup>
import { $api } from '@/utils/api'
import SsoClientsTab from '@/views/developer/sso/SsoClientsTab.vue'
import SsoSdkIntegrationTab from '@/views/developer/sso/SsoSdkIntegrationTab.vue'
import { onMounted, ref } from 'vue'

const activeTab = ref('clients')
const clients = ref([])
const loading = ref(false)

const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('success')

const showToast = (text, color = 'success') => {
  snackbarText.value = text
  snackbarColor.value = color
  snackbar.value = true
}

const fetchClients = async () => {
  loading.value = true
  try {
    const token = useCookie('accessToken').value

    const res = await $api('/oauth/clients', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    clients.value = res || []
  } catch (err) {
    console.error('Failed to fetch clients:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchClients()
})
</script>

<template>
  <div class="developer-sso-page">
    <!-- Header Section -->
    <div class="d-flex flex-wrap justify-space-between align-center mb-6 gap-3">
      <div>
        <div class="d-flex align-center gap-2 mb-1">
          <VIcon
            icon="tabler-shield-lock"
            size="28"
            color="primary"
          />
          <h2 class="text-h4 font-weight-bold">
            OAuth2 & SSO Identity Provider
          </h2>
        </div>
        <p class="text-subtitle-1 text-medium-emphasis mb-0">
          Kelola aplikasi klien eksternal untuk Login via Jaz Academy & integrasi JavaScript SDK.
        </p>
      </div>

      <div class="d-flex gap-3">
        <VBtn
          variant="tonal"
          color="primary"
          href="/demo-sso.html"
          target="_blank"
          prepend-icon="tabler-player-play"
        >
          Buka SDK Playground
        </VBtn>
      </div>
    </div>

    <!-- Navigation Tabs (Vuetify Pill Style) -->
    <VTabs
      v-model="activeTab"
      class="v-tabs-pill mb-2"
    >
      <VTab
        value="clients"
        prepend-icon="tabler-apps"
      >
        Aplikasi Terdaftar (Clients)
      </VTab>
      <VTab
        value="sdk"
        prepend-icon="tabler-code"
      >
        Panduan SDK & Integrasi
      </VTab>
    </VTabs>

    <!-- Tab Windows -->
    <VWindow
      v-model="activeTab"
      class="disable-tab-transition"
    >
      <!-- TAB 1: Clients List -->
      <VWindowItem value="clients">
        <SsoClientsTab
          :clients="clients"
          :loading="loading"
          @refresh="fetchClients"
          @show-toast="showToast"
        />
      </VWindowItem>

      <!-- TAB 2: SDK & Integration Guide -->
      <VWindowItem value="sdk">
        <SsoSdkIntegrationTab
          :clients="clients"
          @show-toast="showToast"
        />
      </VWindowItem>
    </VWindow>

    <!-- Global Toast -->
    <VSnackbar
      v-model="snackbar"
      :color="snackbarColor"
      timeout="3000"
    >
      {{ snackbarText }}
    </VSnackbar>
  </div>
</template>
