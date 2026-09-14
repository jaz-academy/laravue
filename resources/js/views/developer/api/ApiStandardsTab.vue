<script setup>
defineProps({
  docData: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<template>
  <div class="api-standards-tab">
    <!-- 3-Tier Classification Banner -->
    <VCard class="mb-6">
      <VCardItem>
        <VCardTitle class="text-h5 font-weight-bold">
          Klasifikasi API 3-Tier JazAcademy
        </VCardTitle>
        <VCardSubtitle>
          Arsitektur keamanan dan segmentasi hak akses platform terbagi dalam 3 tingkatan ketat:
        </VCardSubtitle>
      </VCardItem>
      <VCardText>
        <VRow>
          <!-- Tier 1: Public -->
          <VCol
            cols="12"
            md="4"
          >
            <VCard
              variant="outlined"
              class="h-100 border-success"
            >
              <VCardItem>
                <div class="d-flex justify-space-between align-center mb-2">
                  <VChip
                    color="success"
                    size="small"
                    prepend-icon="tabler-world"
                  >
                    Tier 1: Public
                  </VChip>
                  <span class="text-caption text-medium-emphasis">Tanpa Key</span>
                </div>
                <div class="text-h6 font-weight-bold mb-1">
                  Public (Without Key)
                </div>
                <p class="text-caption text-medium-emphasis mb-3">
                  Akses publik terbuka untuk data umum non-sensitif (katalog, karya terbaik, artikel edukasi).
                </p>
                <VDivider class="mb-3" />
                <div class="text-caption mb-1">
                  <strong>Prefix:</strong> <code>/api/v1/public/*</code>
                </div>
                <div class="text-caption mb-1">
                  <strong>Proteksi:</strong> Rate Limit IP (60 rpm) + Edge Cache
                </div>
                <div class="text-caption">
                  <strong>Target:</strong> Pengunjung, SEO crawler, viewer umum
                </div>
              </VCardItem>
            </VCard>
          </VCol>

          <!-- Tier 2: Restricted -->
          <VCol
            cols="12"
            md="4"
          >
            <VCard
              variant="outlined"
              class="h-100 border-primary"
            >
              <VCardItem>
                <div class="d-flex justify-space-between align-center mb-2">
                  <VChip
                    color="primary"
                    size="small"
                    prepend-icon="tabler-key"
                  >
                    Tier 2: Restricted
                  </VChip>
                  <span class="text-caption text-medium-emphasis">Dengan Key</span>
                </div>
                <div class="text-h6 font-weight-bold mb-1">
                  Restricted (With Key)
                </div>
                <p class="text-caption text-medium-emphasis mb-3">
                  Akses terotentikasi untuk aplikasi partner, mobile app, microservice (JazMedia, JazFlix, SDK).
                </p>
                <VDivider class="mb-3" />
                <div class="text-caption mb-1">
                  <strong>Prefix:</strong> <code>/api/v1/restricted/*</code>
                </div>
                <div class="text-caption mb-1">
                  <strong>Proteksi:</strong> Header <code>X-API-Key</code> + Granular Scopes
                </div>
                <div class="text-caption">
                  <strong>Target:</strong> External Developers & Ekosistem Aplikasi
                </div>
              </VCardItem>
            </VCard>
          </VCol>

          <!-- Tier 3: Private -->
          <VCol
            cols="12"
            md="4"
          >
            <VCard
              variant="outlined"
              class="h-100 border-warning"
            >
              <VCardItem>
                <div class="d-flex justify-space-between align-center mb-2">
                  <VChip
                    color="warning"
                    size="small"
                    prepend-icon="tabler-lock"
                  >
                    Tier 3: Private
                  </VChip>
                  <span class="text-caption text-medium-emphasis">Internal Only</span>
                </div>
                <div class="text-h6 font-weight-bold mb-1">
                  Private (Only For This App)
                </div>
                <p class="text-caption text-medium-emphasis mb-3">
                  Eksklusif untuk antarmuka web JazAcademy core. Menolak API Key murni dari luar.
                </p>
                <VDivider class="mb-3" />
                <div class="text-caption mb-1">
                  <strong>Prefix:</strong> <code>/api/v1/private/*</code>
                </div>
                <div class="text-caption mb-1">
                  <strong>Proteksi:</strong> Sanctum Session + CSRF + Origin Guard
                </div>
                <div class="text-caption">
                  <strong>Target:</strong> SPA Admin, Guru, Penilaian, Ledger Keuangan
                </div>
              </VCardItem>
            </VCard>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <!-- Standards Details: Gateway, Versioning, Observability -->
    <VRow>
      <!-- API Gateway & Headers -->
      <VCol
        cols="12"
        md="6"
      >
        <VCard class="h-100">
          <VCardItem>
            <div class="d-flex align-center gap-2 mb-1">
              <VIcon
                icon="tabler-cpu"
                color="primary"
              />
              <VCardTitle>API Gateway & Access Control</VCardTitle>
            </div>
            <VCardSubtitle>
              Setiap request melalui gerbang terpusat dengan penanganan header standar industri:
            </VCardSubtitle>
          </VCardItem>
          <VCardText>
            <VTable
              density="compact"
              class="text-no-wrap mb-4"
            >
              <thead>
                <tr>
                  <th>Header</th>
                  <th>Arah</th>
                  <th>Kegunaan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>X-Request-Id</code></td>
                  <td><VChip size="x-small">In/Out</VChip></td>
                  <td>UUID unik untuk request tracing & korelasi log</td>
                </tr>
                <tr>
                  <td><code>X-API-Key</code></td>
                  <td><VChip size="x-small">Request</VChip></td>
                  <td>Kredensial developer pada tier Restricted</td>
                </tr>
                <tr>
                  <td><code>X-Api-Version</code></td>
                  <td><VChip size="x-small">Response</VChip></td>
                  <td>Versi platform API yang melayani (e.g. 1.0.0)</td>
                </tr>
                <tr>
                  <td><code>X-RateLimit-Limit</code></td>
                  <td><VChip size="x-small">Response</VChip></td>
                  <td>Kapasitas kuota request per menit (rpm)</td>
                </tr>
                <tr>
                  <td><code>X-RateLimit-Remaining</code></td>
                  <td><VChip size="x-small">Response</VChip></td>
                  <td>Sisa kuota request di window 60 detik aktif</td>
                </tr>
              </tbody>
            </VTable>

            <div class="text-subtitle-2 font-weight-bold mb-1">
              Format Kesalahan Standar (RFC 7807 Problem Details):
            </div>
            <pre class="bg-surface pa-3 rounded text-caption border"><code>{
  "type": "https://jazacademy.id/errors/unauthorized",
  "title": "Missing API Key",
  "status": 401,
  "detail": "Header X-API-Key is required for restricted platform endpoints.",
  "request_id": "9d1c9258-292b-4e4b-91f0-a7d0e417a80b"
}</code></pre>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Versioning & Observability -->
      <VCol
        cols="12"
        md="6"
      >
        <VCard class="h-100">
          <VCardItem>
            <div class="d-flex align-center gap-2 mb-1">
              <VIcon
                icon="tabler-git-branch"
                color="primary"
              />
              <VCardTitle>Versioning & Backward Compatibility</VCardTitle>
            </div>
            <VCardSubtitle>
              Kebijakan evolusi API dan deprecation berstandar RFC 8594:
            </VCardSubtitle>
          </VCardItem>
          <VCardText>
            <div class="mb-4">
              <div class="d-flex align-center gap-2 mb-1">
                <VIcon
                  icon="tabler-check"
                  color="success"
                  size="18"
                />
                <strong>URI Path Versioning:</strong>
              </div>
              <p class="text-caption text-medium-emphasis ps-6 mb-2">
                Versi utama dicantumkan pada path: <code>/api/v1/...</code>. Versi rute lama dipertahankan tanpa perubahan mendadak (Zero Breaking Changes).
              </p>

              <div class="d-flex align-center gap-2 mb-1">
                <VIcon
                  icon="tabler-check"
                  color="success"
                  size="18"
                />
                <strong>Header Deprecation & Sunset (RFC 8594):</strong>
              </div>
              <p class="text-caption text-medium-emphasis ps-6 mb-2">
                Endpoint usang mengirimkan header: <code>Deprecation: @timestamp</code> dan <code>Sunset: HTTP-Date</code> untuk memberi waktu migrasi bagi partner.
              </p>

              <div class="d-flex align-center gap-2 mb-1">
                <VIcon
                  icon="tabler-check"
                  color="success"
                  size="18"
                />
                <strong>Monitoring & Observability Telemetry:</strong>
              </div>
              <p class="text-caption text-medium-emphasis ps-6 mb-0">
                Setiap request dicatat latensinya (ms), status code, IP, dan Request ID dalam lifecycle asynchronous tanpa membebani respon klien (SLO P95 &lt; 250ms).
              </p>
            </div>

            <VAlert
              density="compact"
              variant="tonal"
              color="info"
              icon="tabler-info-circle"
              class="text-caption"
            >
              Developer dianjurkan menggunakan SDK resmi atau menambahkan header <code>X-API-Key</code> untuk integrasi sistem otomatis.
            </VAlert>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped>
code {
  font-family: 'Fira Code', 'Courier New', Courier, monospace;
  font-size: 0.85em;
}
</style>
