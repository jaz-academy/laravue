<script setup>
import ScrollToTop from '@core/components/ScrollToTop.vue'
import initCore from '@core/initCore'
import {
  initConfigStore,
  useConfigStore,
} from '@core/stores/config'
import { hexToRgb } from '@layouts/utils'
import { useTheme } from 'vuetify'

import { onMounted, ref } from 'vue'

const { global } = useTheme()


// ℹ️ Sync current theme with initial loader theme
initCore()
initConfigStore()

const configStore = useConfigStore()

const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
})
</script>

<template>
  <VLocaleProvider :rtl="configStore.isAppRTL">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <div
        v-if="isLoading"
        style="position:fixed; z-index:9999; display:grid; background:rgba(255,255,255,70%); inset:0; place-items:center;"
      >
        <img
          width="86"
          height="86"
          src="/images/loading.gif"
          alt="Loading..."
        >
      </div>

      <div v-else>
        <RouterView />
      </div>
      <ScrollToTop />
    </VApp>
  </VLocaleProvider>
</template>
