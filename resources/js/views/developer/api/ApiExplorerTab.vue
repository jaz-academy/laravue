<script setup>
import { computed, ref } from 'vue'
import { $api } from '@/utils/api'

const props = defineProps({
  docData: {
    type: Object,
    default: () => ({}),
  },
  keys: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['showToast'])

const selectedTierFilter = ref('all')
const searchEndpoint = ref('')
const testingEndpointId = ref(null)
const testApiKey = ref('')
const testRequestBody = ref('')
const testResponse = ref(null)
const testLatency = ref(null)
const testStatus = ref(null)

const copyToClipboard = text => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
    emit('showToast', 'Disalin ke clipboard!')
  }
}

const allEndpoints = computed(() => {
  if (!props.docData?.tiers) return []
  const list = []
  Object.keys(props.docData.tiers).forEach(tierKey => {
    const tier = props.docData.tiers[tierKey]
    tier.endpoints.forEach(ep => {
      list.push({
        ...ep,
        tierKey,
        tierBadge: tier.badge,
        tierColor: tier.color,
      })
    })
  })
  return list
})

const filteredEndpoints = computed(() => {
  return allEndpoints.value.filter(ep => {
    const matchesTier = selectedTierFilter.value === 'all' || ep.tierKey === selectedTierFilter.value
    const q = searchEndpoint.value.toLowerCase()
    const matchesSearch = !q || ep.path.toLowerCase().includes(q) || ep.summary.toLowerCase().includes(q) || ep.description.toLowerCase().includes(q)
    return matchesTier && matchesSearch
  })
})

const runApiTest = async ep => {
  testingEndpointId.value = ep.id
  testResponse.value = null
  testStatus.value = null
  testLatency.value = null

  const startTime = performance.now()
  try {
    const headers = {}
    if (ep.tierKey === 'restricted') {
      const activeKey = props.keys && props.keys.length > 0 ? props.keys[0].key_prefix : null
      headers['X-API-Key'] = testApiKey.value || (activeKey ? `jaz_${activeKey}_secret_here` : 'jaz_live_sample_secret')
    }

    const options = {
      method: ep.method,
      headers,
    }

    if (ep.method !== 'GET' && testRequestBody.value) {
      options.body = testRequestBody.value
    }

    const res = await $api(ep.path, options)
    testStatus.value = 200
    testResponse.value = res
  } catch (err) {
    testStatus.value = err.status || err.statusCode || 500
    testResponse.value = err.response?._data || err.data || { error: err.message }
  } finally {
    testLatency.value = Math.round(performance.now() - startTime)
    testingEndpointId.value = null
  }
}

const getMethodColor = method => {
  switch (method) {
    case 'GET': return 'primary'
    case 'POST': return 'success'
    case 'PUT': return 'warning'
    case 'DELETE': return 'error'
    default: return 'secondary'
  }
}
</script>

<template>
  <div class="api-explorer-tab">
    <VRow class="mb-4">
      <VCol
        cols="12"
        md="6"
      >
        <div class="d-flex gap-2 align-center">
          <span class="text-subtitle-2 me-1">Filter Tier:</span>
          <VBtnToggle
            v-model="selectedTierFilter"
            mandatory
            density="compact"
            color="primary"
          >
            <VBtn value="all">
              Semua ({{ allEndpoints.length }})
            </VBtn>
            <VBtn value="public">
              Public
            </VBtn>
            <VBtn value="restricted">
              Restricted
            </VBtn>
            <VBtn value="private">
              Private
            </VBtn>
          </VBtnToggle>
        </div>
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <VTextField
          v-model="searchEndpoint"
          placeholder="Cari rute endpoint atau deskripsi..."
          prepend-inner-icon="tabler-search"
          density="compact"
          hide-details
          clearable
        />
      </VCol>
    </VRow>

    <VCard>
      <VExpansionPanels variant="accordion">
        <VExpansionPanel
          v-for="ep in filteredEndpoints"
          :key="ep.id"
        >
          <VExpansionPanelTitle>
            <div class="d-flex align-center flex-wrap gap-2 w-100 me-4">
              <VChip
                :color="getMethodColor(ep.method)"
                size="small"
                class="font-weight-bold"
              >
                {{ ep.method }}
              </VChip>
              <code class="text-subtitle-2 font-weight-medium">{{ ep.path }}</code>
              <VChip
                :color="ep.tierColor"
                size="x-small"
                variant="tonal"
                class="ms-auto"
              >
                {{ ep.tierBadge }}
              </VChip>
              <span class="text-caption text-medium-emphasis d-none d-sm-inline">
                {{ ep.summary }}
              </span>
            </div>
          </VExpansionPanelTitle>

          <VExpansionPanelText>
            <div class="pt-2">
              <p class="text-body-2 mb-3">
                {{ ep.description }}
              </p>

              <div
                v-if="ep.scope"
                class="mb-3"
              >
                <span class="text-caption font-weight-bold me-2">Scope Dibutuhkan:</span>
                <VChip
                  size="x-small"
                  color="secondary"
                >
                  {{ ep.scope }}
                </VChip>
              </div>

              <!-- Live Test Runner (Try It Out) -->
              <VCard
                variant="tonal"
                color="background"
                class="pa-4 border mb-4"
              >
                <div class="d-flex justify-space-between align-center mb-3">
                  <div class="text-subtitle-2 font-weight-bold d-flex align-center gap-2">
                    <VIcon
                      icon="tabler-player-play"
                      color="primary"
                    />
                    Live Playground (Uji Coba Langsung)
                  </div>

                  <div
                    v-if="ep.tierKey === 'restricted'"
                    class="d-flex align-center gap-2"
                    style="max-width: 320px;"
                  >
                    <VTextField
                      v-model="testApiKey"
                      placeholder="Masukkan X-API-Key..."
                      density="compact"
                      hide-details
                      type="password"
                    />
                  </div>
                </div>

                <div
                  v-if="ep.method !== 'GET'"
                  class="mb-3"
                >
                  <label class="text-caption font-weight-medium mb-1 d-block">JSON Request Payload:</label>
                  <VTextarea
                    v-model="testRequestBody"
                    rows="3"
                    density="compact"
                    :placeholder="JSON.stringify(ep.request_sample || {}, null, 2)"
                  />
                </div>

                <div class="d-flex gap-2 align-center mb-3">
                  <VBtn
                    color="primary"
                    size="small"
                    :loading="testingEndpointId === ep.id"
                    prepend-icon="tabler-send"
                    @click="runApiTest(ep)"
                  >
                    Kirim Request
                  </VBtn>

                  <span
                    v-if="testStatus !== null && testingEndpointId === null"
                    class="text-caption"
                  >
                    Status:
                    <VChip
                      size="x-small"
                      :color="testStatus >= 200 && testStatus < 300 ? 'success' : 'error'"
                    >
                      {{ testStatus }}
                    </VChip>
                    <span class="ms-2 text-medium-emphasis">Latensi: {{ testLatency }}ms</span>
                  </span>
                </div>

                <!-- Test Response Viewer -->
                <div v-if="testResponse">
                  <div class="text-caption font-weight-bold mb-1">
                    Response Body:
                  </div>
                  <pre class="bg-surface pa-3 rounded text-caption border overflow-auto" style="max-height: 240px;"><code>{{ JSON.stringify(testResponse, null, 2) }}</code></pre>
                </div>
              </VCard>

              <!-- cURL Snippet -->
              <div class="d-flex justify-space-between align-center mb-1">
                <span class="text-caption font-weight-bold">Contoh Pemanggilan cURL:</span>
                <VBtn
                  size="x-small"
                  variant="text"
                  prepend-icon="tabler-copy"
                  @click="copyToClipboard(`curl -X ${ep.method} 'https://jazacademy.id${ep.path}' ${ep.tierKey === 'restricted' ? '-H &quot;X-API-Key: YOUR_API_KEY&quot;' : ''}`)"
                >
                  Salin cURL
                </VBtn>
              </div>
              <pre class="bg-surface pa-2 rounded text-caption border"><code>curl -X {{ ep.method }} 'https://jazacademy.id{{ ep.path }}' \
{{ ep.tierKey === 'restricted' ? '  -H "X-API-Key: YOUR_API_KEY" \\\n' : '' }}  -H "Accept: application/json"</code></pre>
            </div>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
    </VCard>
  </div>
</template>

<style scoped>
code {
  font-family: 'Fira Code', 'Courier New', Courier, monospace;
  font-size: 0.85em;
}
</style>
