<script setup>
import { onMounted, ref } from 'vue'
import { $api } from '@/utils/api'

const emit = defineEmits(['showToast'])

const analyticsOverview = ref(null)
const analyticsLogs = ref([])
const analyticsPagination = ref({ current_page: 1, last_page: 1, total: 0 })
const filterLogTier = ref('')
const filterLogStatus = ref('')
const searchLog = ref('')
const loadingAnalytics = ref(false)

const copyToClipboard = text => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
    emit('showToast', 'Disalin ke clipboard!')
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

const fetchAnalytics = async () => {
  loadingAnalytics.value = true
  try {
    const [overview, logs] = await Promise.all([
      $api('/developer/analytics/overview'),
      $api('/developer/analytics/logs', {
        params: {
          tier: filterLogTier.value || undefined,
          status: filterLogStatus.value || undefined,
          search: searchLog.value || undefined,
          page: analyticsPagination.value.current_page,
        },
      }),
    ])
    analyticsOverview.value = overview
    analyticsLogs.value = logs.data || []
    analyticsPagination.value = {
      current_page: logs.current_page || 1,
      last_page: logs.last_page || 1,
      total: logs.total || 0,
    }
  } catch (err) {
    console.error('Failed to load analytics:', err)
  } finally {
    loadingAnalytics.value = false
  }
}

defineExpose({
  fetchAnalytics,
})

onMounted(() => {
  fetchAnalytics()
})
</script>

<template>
  <div class="api-analytics-tab">
    <!-- KPI Cards -->
    <VRow
      v-if="analyticsOverview"
      class="mb-6"
    >
      <VCol
        cols="12"
        sm="6"
        md="3"
      >
        <VCard>
          <VCardItem>
            <div class="d-flex justify-space-between align-center">
              <div>
                <div class="text-caption text-medium-emphasis">
                  Total Panggilan (24 Jam)
                </div>
                <div class="text-h4 font-weight-bold">
                  {{ analyticsOverview.total_requests_24h.toLocaleString() }}
                </div>
              </div>
              <VIcon
                icon="tabler-chart-arrows-vertical"
                size="36"
                color="primary"
              />
            </div>
          </VCardItem>
        </VCard>
      </VCol>

      <VCol
        cols="12"
        sm="6"
        md="3"
      >
        <VCard>
          <VCardItem>
            <div class="d-flex justify-space-between align-center">
              <div>
                <div class="text-caption text-medium-emphasis">
                  Tingkat Keberhasilan (SLO)
                </div>
                <div class="text-h4 font-weight-bold text-success">
                  {{ analyticsOverview.success_rate }}%
                </div>
              </div>
              <VIcon
                icon="tabler-shield-check"
                size="36"
                color="success"
              />
            </div>
          </VCardItem>
        </VCard>
      </VCol>

      <VCol
        cols="12"
        sm="6"
        md="3"
      >
        <VCard>
          <VCardItem>
            <div class="d-flex justify-space-between align-center">
              <div>
                <div class="text-caption text-medium-emphasis">
                  Rata-rata Latensi (ms)
                </div>
                <div class="text-h4 font-weight-bold text-info">
                  {{ analyticsOverview.avg_latency_ms }} ms
                </div>
              </div>
              <VIcon
                icon="tabler-gauge"
                size="36"
                color="info"
              />
            </div>
          </VCardItem>
        </VCard>
      </VCol>

      <VCol
        cols="12"
        sm="6"
        md="3"
      >
        <VCard>
          <VCardItem>
            <div class="d-flex justify-space-between align-center">
              <div>
                <div class="text-caption text-medium-emphasis">
                  API Keys Aktif
                </div>
                <div class="text-h4 font-weight-bold">
                  {{ analyticsOverview.active_keys_count }}
                </div>
              </div>
              <VIcon
                icon="tabler-key"
                size="36"
                color="warning"
              />
            </div>
          </VCardItem>
        </VCard>
      </VCol>
    </VRow>

    <!-- Top Endpoints & Tier Breakdown -->
    <VRow
      v-if="analyticsOverview"
      class="mb-6"
    >
      <VCol
        cols="12"
        md="7"
      >
        <VCard class="h-100">
          <VCardItem>
            <VCardTitle>Top Endpoints (Frekuensi Tertinggi)</VCardTitle>
          </VCardItem>
          <VCardText>
            <VTable density="compact">
              <thead>
                <tr>
                  <th>Endpoint</th>
                  <th>Method</th>
                  <th>Total Panggilan</th>
                  <th>Avg Latensi</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-if="!analyticsOverview.top_endpoints || analyticsOverview.top_endpoints.length === 0"
                  class="text-center"
                >
                  <td
                    colspan="4"
                    class="py-4 text-medium-emphasis"
                  >
                    Belum ada data request 24 jam terakhir.
                  </td>
                </tr>
                <tr
                  v-for="te in analyticsOverview.top_endpoints"
                  :key="te.endpoint"
                >
                  <td><code>{{ te.endpoint }}</code></td>
                  <td>
                    <VChip
                      size="x-small"
                      :color="getMethodColor(te.method)"
                    >
                      {{ te.method }}
                    </VChip>
                  </td>
                  <td><strong>{{ te.hits }}</strong></td>
                  <td>{{ te.avg_latency }} ms</td>
                </tr>
              </tbody>
            </VTable>
          </VCardText>
        </VCard>
      </VCol>

      <VCol
        cols="12"
        md="5"
      >
        <VCard class="h-100">
          <VCardItem>
            <VCardTitle>Distribusi Panggilan Berdasarkan Tier</VCardTitle>
          </VCardItem>
          <VCardText>
            <div class="d-flex flex-column gap-3 pt-2">
              <div>
                <div class="d-flex justify-space-between text-caption mb-1">
                  <span>Tier 1: Public</span>
                  <strong>{{ analyticsOverview.tier_breakdown.public }} req</strong>
                </div>
                <VProgressLinear
                  :model-value="analyticsOverview.total_requests_24h > 0 ? (analyticsOverview.tier_breakdown.public / analyticsOverview.total_requests_24h) * 100 : 0"
                  color="success"
                  height="8"
                  rounded
                />
              </div>

              <div>
                <div class="d-flex justify-space-between text-caption mb-1">
                  <span>Tier 2: Restricted</span>
                  <strong>{{ analyticsOverview.tier_breakdown.restricted }} req</strong>
                </div>
                <VProgressLinear
                  :model-value="analyticsOverview.total_requests_24h > 0 ? (analyticsOverview.tier_breakdown.restricted / analyticsOverview.total_requests_24h) * 100 : 0"
                  color="primary"
                  height="8"
                  rounded
                />
              </div>

              <div>
                <div class="d-flex justify-space-between text-caption mb-1">
                  <span>Tier 3: Private</span>
                  <strong>{{ analyticsOverview.tier_breakdown.private }} req</strong>
                </div>
                <VProgressLinear
                  :model-value="analyticsOverview.total_requests_24h > 0 ? (analyticsOverview.tier_breakdown.private / analyticsOverview.total_requests_24h) * 100 : 0"
                  color="warning"
                  height="8"
                  rounded
                />
              </div>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Live Telemetry Audit Logs Table -->
    <VCard>
      <VCardItem>
        <div class="d-flex flex-wrap justify-space-between align-center gap-3">
          <div>
            <VCardTitle>Live Request Telemetry & Audit Logs</VCardTitle>
            <VCardSubtitle>Log panggilan real-time untuk audit dan korelasi tracing (X-Request-Id).</VCardSubtitle>
          </div>

          <div class="d-flex gap-2">
            <VSelect
              v-model="filterLogTier"
              :items="[{ title: 'Semua Tier', value: '' }, { title: 'Public', value: 'public' }, { title: 'Restricted', value: 'restricted' }, { title: 'Private', value: 'private' }]"
              density="compact"
              hide-details
              style="width: 140px;"
              @update:model-value="fetchAnalytics"
            />
            <VBtn
              icon="tabler-refresh"
              variant="tonal"
              size="small"
              :loading="loadingAnalytics"
              @click="fetchAnalytics"
            />
          </div>
        </div>
      </VCardItem>

      <VDivider />

      <VTable
        density="compact"
        class="text-no-wrap"
      >
        <thead>
          <tr>
            <th>Waktu</th>
            <th>Method</th>
            <th>Endpoint</th>
            <th>Status</th>
            <th>Latensi</th>
            <th>Tier</th>
            <th>IP</th>
            <th>Request ID</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-if="analyticsLogs.length === 0"
            class="text-center"
          >
            <td
              colspan="8"
              class="py-6 text-medium-emphasis"
            >
              Tidak ada data log yang sesuai.
            </td>
          </tr>
          <tr
            v-for="log in analyticsLogs"
            :key="log.id"
          >
            <td class="text-caption">
              {{ new Date(log.created_at).toLocaleTimeString() }}
            </td>
            <td>
              <VChip
                size="x-small"
                :color="getMethodColor(log.method)"
              >
                {{ log.method }}
              </VChip>
            </td>
            <td><code>{{ log.endpoint }}</code></td>
            <td>
              <VChip
                size="x-small"
                :color="log.status_code >= 200 && log.status_code < 400 ? 'success' : (log.status_code < 500 ? 'warning' : 'error')"
              >
                {{ log.status_code }}
              </VChip>
            </td>
            <td>{{ log.duration_ms }} ms</td>
            <td>
              <VChip
                size="x-small"
                variant="tonal"
                :color="log.tier === 'public' ? 'success' : (log.tier === 'restricted' ? 'primary' : 'warning')"
              >
                {{ log.tier }}
              </VChip>
            </td>
            <td class="text-caption">
              {{ log.ip_address }}
            </td>
            <td>
              <VBtn
                v-if="log.request_id"
                size="x-small"
                variant="text"
                prepend-icon="tabler-copy"
                @click="copyToClipboard(log.request_id)"
              >
                {{ log.request_id.slice(0, 8) }}...
              </VBtn>
              <span
                v-else
                class="text-caption text-medium-emphasis"
              >-</span>
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCard>
  </div>
</template>

<style scoped>
code {
  font-family: 'Fira Code', 'Courier New', Courier, monospace;
  font-size: 0.85em;
}
</style>
