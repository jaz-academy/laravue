<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  clients: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['showToast'])

const selectedClientId = ref('')
const sdkTheme = ref('filled')
const sdkSize = ref('md')
const sdkShape = ref('rounded')
const sdkUxMode = ref('popup')
const sdkButtonText = ref('Login via Jaz Academy')

watch(
  () => props.clients,
  val => {
    if (val.length > 0 && !selectedClientId.value) {
      selectedClientId.value = val[0].id
    }
  },
  { immediate: true },
)

const originUrl = typeof window !== 'undefined' ? window.location.origin : 'https://jazacademy.id'

const copyToClipboard = text => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
    emit('showToast', 'Disalin ke clipboard!')
  }
}

const generatedSdkSnippet = computed(() => {
  const cid = selectedClientId.value || 'YOUR_CLIENT_ID'

  return `<!-- 1. Pasang tag SDK di halaman login aplikasi Anda -->
<script src="${originUrl}/sdk/jaz-sso.js"><\/script>

<!-- 2. Tombol Login SSO Jaz Academy -->
<div id="jaz-sso-btn"
     data-jaz-sso
     data-client_id="${cid}"
     data-theme="${sdkTheme.value}"
     data-size="${sdkSize.value}"
     data-shape="${sdkShape.value}"
     data-text="${sdkButtonText.value}"
     data-ux_mode="${sdkUxMode.value}"
     data-callback="onJazAuthSuccess">
</div>

<!-- 3. Callback Handler -->
<script>
  function onJazAuthSuccess(data) {
    // Kirim data.code ke backend Anda untuk ditukar Access Token di:
    // POST ${originUrl}/oauth/token
  }
<\/script>`
})
</script>

<template>
  <div class="sso-sdk-tab">
    <VRow>
      <!-- Left: SDK Configurator & Preview -->
      <VCol
        cols="12"
        md="6"
      >
        <VCard class="mb-6">
          <VCardItem>
            <VCardTitle>Generator Widget Tombol SDK</VCardTitle>
            <VCardSubtitle>Kustomisasi tombol login untuk aplikasi Anda</VCardSubtitle>
          </VCardItem>
          <VCardText>
            <VRow>
              <VCol cols="12">
                <VSelect
                  v-model="selectedClientId"
                  :items="clients.map(c => ({ title: `${c.name} (ID: ${c.id})`, value: c.id }))"
                  label="Pilih Aplikasi Klien"
                />
              </VCol>
              <VCol cols="6">
                <VSelect
                  v-model="sdkTheme"
                  :items="[
                    { title: 'Filled (#7367F0)', value: 'filled' },
                    { title: 'Outline', value: 'outline' },
                    { title: 'Dark Mode', value: 'dark' },
                  ]"
                  label="Tema Tombol"
                />
              </VCol>
              <VCol cols="6">
                <VSelect
                  v-model="sdkSize"
                  :items="[
                    { title: 'Small (32px)', value: 'sm' },
                    { title: 'Medium (42px)', value: 'md' },
                    { title: 'Large (48px)', value: 'lg' },
                  ]"
                  label="Ukuran"
                />
              </VCol>
              <VCol cols="6">
                <VSelect
                  v-model="sdkShape"
                  :items="[
                    { title: 'Rounded (8-12px)', value: 'rounded' },
                    { title: 'Pill (Bulat Penuh)', value: 'pill' },
                    { title: 'Square (Kotak)', value: 'square' },
                  ]"
                  label="Bentuk Sudut"
                />
              </VCol>
              <VCol cols="6">
                <VSelect
                  v-model="sdkUxMode"
                  :items="[
                    { title: 'Popup Window', value: 'popup' },
                    { title: 'Full Browser Redirect', value: 'redirect' },
                  ]"
                  label="Mode UX"
                />
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="sdkButtonText"
                  label="Teks Tombol"
                />
              </VCol>
            </VRow>

            <div
              class="preview-box d-flex align-center justify-center pa-6 rounded-lg mt-6"
              :class="{ 'preview-box-dark': sdkTheme === 'dark' }"
            >
              <button
                type="button"
                class="jaz-btn-base"
                :class="[
                  `jaz-btn-${sdkSize}`,
                  `jaz-theme-${sdkTheme}`,
                  `jaz-shape-${sdkShape}`,
                ]"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="m 16.972301,-0.09806267 0.0064,10.99222467 11.838068,4.110085 c 0.06078,0.0211 0.100507,0.07867 0.100142,0.142756 l -0.0085,1.627841 c 0,0.02824 0.0229,0.05114 0.05114,0.05114 l 4.951705,-0.0043 c 0.04099,0 0.06179,-0.0208 0.06179,-0.06179 L 33.934656,4.0546354 c -0.04625,-1.922745 -1.044575,-3.60467307 -3.402699,-4.08877807 0,0 -10.365717,-0.04848 -13.559659,-0.06392 z M 20.835227,16.7301 c -0.0091,0 -0.01704,0.0058 -0.01704,0.01491 v 4.442472 c 0,0.0091 0.0079,0.01705 0.01704,0.01705 h 3.042614 c 0.0091,0 0.01704,-0.0079 0.01704,-0.01705 V 16.74501 c 0,-0.0091 -0.0079,-0.01491 -0.01704,-0.01491 z m 8.03054,5.18821 c -0.03775,-8.1e-4 -0.05582,0.01806 -0.0554,0.0554 l 0.0064,1.791903 c 4.1e-4,0.02029 -0.0086,0.03398 -0.0277,0.04048 -3.87393,1.36937 -7.74762,2.740816 -11.620739,4.112216 l -0.234375,0.03196 -0.02131,0.02131 0.02131,0.03622 0.02344,0.01279 0.01705,0.02983 -0.0085,4.964489 -0.02131,0.666903 0.0021,0.276989 12.758523,0.0277 c 3.678752,4.8e-4 4.360907,-3.036361 4.335937,-4.747159 l 0.0277,-7.178268 -0.03622,-0.03835 z"
                    fill="currentColor"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M 16.972301,-0.08740967 4.2265625,0.04256233 C 1.3248445,0.07216233 0.0107163,2.0628874 0.00994314,3.9821914 L 0.00142041,29.002827 C -0.00734128,32.869936 1.4389811,34.048395 4.9509943,34.01419 L 16.96804,33.96092 16.97869,33.7095 16.96591,33.014898 c 0.03101,-1.652863 -0.0024,-3.310408 0.0085,-4.964489 -2e-5,-0.01242 -0.0062,-0.02383 -0.01705,-0.02983 l -0.02344,-0.01279 c -0.0146,-0.0077 -0.01998,-0.01958 -0.01918,-0.03622 8.1e-4,-0.01621 0.007,-0.02331 0.01918,-0.02131 L 5.2045454,23.810355 c -0.019892,-0.0073 -0.028125,-0.01978 -0.027699,-0.04048 0.012171,-0.443605 0.018366,-0.888477 0.019176,-1.331676 0.00487,-2.40553 0.00862,-4.815452 0.010653,-7.231534 0,-0.07143 0.032769,-0.118816 0.1001421,-0.142756 L 16.978693,10.894162 Z m -6.779829,16.83029367 -0.01918,0.01918 -0.0064,4.427557 3.09375,-0.01065 c 0.01006,0 0.01918,-0.007 0.01918,-0.01705 l 0.01918,-4.399858 c 0,-0.01006 -0.0091,-0.01918 -0.01918,-0.01918 z"
                    fill="currentColor"
                  />
                </svg>
                <span>{{ sdkButtonText }}</span>
              </button>
            </div>
          </VCardText>
        </VCard>

        <!-- Discovery Endpoint Card -->
        <VCard>
          <VCardItem>
            <VCardTitle>OpenID Connect Discovery</VCardTitle>
          </VCardItem>
          <VCardText>
            <p class="text-caption mb-2">
              Endpoint discovery standard untuk library OAuth (NextAuth, Socialite, Passport):
            </p>
            <div class="d-flex align-center gap-2">
              <VTextField
                readonly
                :model-value="`${originUrl}/.well-known/openid-configuration`"
                density="compact"
              />
              <VBtn
                variant="tonal"
                color="primary"
                @click="copyToClipboard(`${originUrl}/.well-known/openid-configuration`)"
              >
                Salin
              </VBtn>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Right: Code Snippet & Manual Flow -->
      <VCol
        cols="12"
        md="6"
      >
        <VCard class="mb-6">
          <VCardItem>
            <div class="d-flex justify-space-between align-center">
              <VCardTitle>Kode Integrasi (Siap Pakai)</VCardTitle>
              <VBtn
                size="small"
                variant="tonal"
                color="primary"
                prepend-icon="tabler-copy"
                @click="copyToClipboard(generatedSdkSnippet)"
              >
                Salin Kode
              </VBtn>
            </div>
          </VCardItem>
          <VCardText>
            <pre style="padding: 16px; border-radius: 10px; background: #2F2B3D; color: #CFCCE4; font-size: 12.5px; overflow-x: auto;"><code>{{ generatedSdkSnippet }}</code></pre>

            <VAlert
              color="info"
              variant="tonal"
              class="mt-4"
            >
              <div class="font-weight-bold mb-1">
                Langkah Pertukaran Token di Backend:
              </div>
              <div class="text-caption">
                <div class="mb-1">
                  1. Kirim <code>code</code> via POST ke <code>{{ originUrl }}/oauth/token</code> bersama <code>client_id</code> & <code>client_secret</code>.
                </div>
                <div>
                  2. Ambil profil user via <code>GET {{ originUrl }}/api/oauth/user</code> menggunakan header <code>Authorization: Bearer &lt;access_token&gt;</code>.
                </div>
              </div>
            </VAlert>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped>
.preview-box {
  border: 2px dashed #dbdade;
  background: #f4f5fa;
  min-block-size: 110px;
  transition: all 0.3s ease;
}

.preview-box-dark {
  border-color: #433d60 !important;
  background: #252037 !important;
}

.jaz-btn-base {
  display: inline-flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: inherit;
  font-weight: 600;
  gap: 10px;
  line-height: 1.2;
  outline: none;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
}

.jaz-btn-base svg {
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.jaz-btn-base:hover svg {
  transform: scale(1.08);
}

.jaz-btn-sm {
  border-radius: 8px;
  font-size: 13px;
  min-block-size: 32px;
  padding-block: 6px;
  padding-inline: 14px;
}

.jaz-btn-md {
  border-radius: 10px;
  font-size: 14px;
  min-block-size: 42px;
  padding-block: 10px;
  padding-inline: 20px;
}

.jaz-btn-lg {
  border-radius: 12px;
  font-size: 15px;
  min-block-size: 48px;
  padding-block: 14px;
  padding-inline: 28px;
}

.jaz-shape-pill {
  border-radius: 9999px !important;
}

.jaz-shape-square {
  border-radius: 4px !important;
}

.jaz-theme-filled {
  border: 1px solid #7367F0;
  background-color: #7367F0;
  box-shadow: 0 3px 12px rgba(115, 103, 240, 35%);
  color: #fff !important;
}

.jaz-theme-filled:hover {
  border-color: #6355ee;
  background-color: #6355ee;
  box-shadow: 0 5px 16px rgba(115, 103, 240, 45%);
  transform: translateY(-1px);
}

.jaz-theme-outline {
  border: 1.5px solid #7367F0;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 4%);
  color: #7367F0 !important;
}

.jaz-theme-outline:hover {
  background-color: rgba(115, 103, 240, 6%);
  transform: translateY(-1px);
}

.jaz-theme-dark {
  border: 1px solid rgba(255, 255, 255, 12%);
  background-color: #2F2B3D;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 30%);
  color: #FFF !important;
}

.jaz-theme-dark:hover {
  border-color: #7367F0;
  background-color: #3b364c;
  transform: translateY(-1px);
}
</style>
