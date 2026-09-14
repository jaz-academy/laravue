<script setup>
import { onMounted, ref } from 'vue'
import { $api } from '@/utils/api'

const emit = defineEmits(['showToast'])

const keys = ref([])
const loadingKeys = ref(false)
const dialogCreateKey = ref(false)
const dialogSecret = ref(false)
const isSubmittingKey = ref(false)

const newKey = ref({
  name: '',
  tier: 'standard',
  rate_limit_per_minute: 120,
  scopes: ['*'],
  expires_days: 90,
})

const currentSecretData = ref({
  name: '',
  key_prefix: '',
  plain_secret: '',
})

const availableScopes = [
  { value: '*', label: 'Semua Akses (Full Access)' },
  { value: 'media:read', label: 'Baca Media & Tugas (media:read)' },
  { value: 'media:write', label: 'Kirim / Update Tugas (media:write)' },
  { value: 'academy:read', label: 'Baca Data Kurikulum & Siswa (academy:read)' },
  { value: 'finance:read', label: 'Baca Data Finansial Terbatas (finance:read)' },
]

const copyToClipboard = text => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
    emit('showToast', 'Disalin ke clipboard!')
  }
}

const fetchKeys = async () => {
  loadingKeys.value = true
  try {
    const res = await $api('/developer/keys')
    keys.value = res || []
  } catch (err) {
    console.error('Failed to fetch API keys:', err)
  } finally {
    loadingKeys.value = false
  }
}

const createKey = async () => {
  if (!newKey.value.name) return
  isSubmittingKey.value = true
  try {
    const res = await $api('/developer/keys', {
      method: 'POST',
      body: newKey.value,
    })

    dialogCreateKey.value = false
    currentSecretData.value = {
      name: res.key.name,
      key_prefix: res.key.key_prefix,
      plain_secret: res.plain_secret,
    }
    dialogSecret.value = true
    newKey.value = { name: '', tier: 'standard', rate_limit_per_minute: 120, scopes: ['*'], expires_days: 90 }
    await fetchKeys()
    emit('showToast', 'API Key berhasil dibuat!')
  } catch (err) {
    const msg = err.response?._data?.message || err.message || 'Gagal membuat API key'
    emit('showToast', `Error: ${msg}`, 'error')
  } finally {
    isSubmittingKey.value = false
  }
}

const toggleKeyStatus = async key => {
  try {
    await $api(`/developer/keys/${key.id}`, {
      method: 'PUT',
      body: { is_active: !key.is_active },
    })
    key.is_active = !key.is_active
    emit('showToast', `API Key ${key.is_active ? 'diaktifkan' : 'dinonaktifkan'}`)
  } catch (err) {
    emit('showToast', 'Gagal mengubah status key', 'error')
  }
}

const regenerateKey = async key => {
  if (!confirm(`Regenerasi secret token untuk key "${key.name}"? Secret token lama akan langsung hangus.`)) return
  try {
    const res = await $api(`/developer/keys/${key.id}/regenerate`, {
      method: 'POST',
    })
    currentSecretData.value = {
      name: key.name,
      key_prefix: res.key.key_prefix,
      plain_secret: res.plain_secret,
    }
    dialogSecret.value = true
    await fetchKeys()
  } catch (err) {
    emit('showToast', 'Gagal meregenerasi secret key', 'error')
  }
}

const deleteKey = async key => {
  if (!confirm(`Cabut / Hapus permanen API key "${key.name}"? Aksi ini tidak dapat dibatalkan.`)) return
  try {
    await $api(`/developer/keys/${key.id}`, { method: 'DELETE' })
    await fetchKeys()
    emit('showToast', 'API Key berhasil dihapus')
  } catch (err) {
    emit('showToast', 'Gagal menghapus API key', 'error')
  }
}

defineExpose({
  fetchKeys,
  keys,
})

onMounted(() => {
  fetchKeys()
})
</script>

<template>
  <div class="api-keys-tab">
    <VCard>
      <VCardItem>
        <div class="d-flex justify-space-between align-center">
          <div>
            <VCardTitle>Manajemen API Keys</VCardTitle>
            <VCardSubtitle>
              Kredensial developer untuk mengakses endpoint pada Tier 2 (Restricted).
            </VCardSubtitle>
          </div>
          <VBtn
            color="primary"
            prepend-icon="tabler-plus"
            @click="dialogCreateKey = true"
          >
            Buat API Key
          </VBtn>
        </div>
      </VCardItem>

      <VDivider />

      <VTable class="text-no-wrap">
        <thead>
          <tr>
            <th>Nama Key</th>
            <th>Prefix Key</th>
            <th>Tier</th>
            <th>Rate Limit</th>
            <th>Scopes</th>
            <th>Terakhir Digunakan</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-if="loadingKeys"
            class="text-center"
          >
            <td
              colspan="8"
              class="py-6"
            >
              <VProgressCircular
                indeterminate
                color="primary"
              />
            </td>
          </tr>
          <tr
            v-else-if="keys.length === 0"
            class="text-center"
          >
            <td
              colspan="8"
              class="py-6 text-medium-emphasis"
            >
              Belum ada API Key yang terdaftar. Klik tombol "Buat API Key" untuk memulai.
            </td>
          </tr>
          <tr
            v-for="k in keys"
            :key="k.id"
          >
            <td>
              <div class="font-weight-bold">
                {{ k.name }}
              </div>
              <div class="text-caption text-medium-emphasis">
                Dibuat: {{ new Date(k.created_at).toLocaleDateString() }}
              </div>
            </td>
            <td>
              <code>{{ k.key_prefix }}****</code>
            </td>
            <td>
              <VChip
                size="small"
                :color="k.tier === 'partner' ? 'primary' : (k.tier === 'unlimited' ? 'error' : 'secondary')"
              >
                {{ k.tier }}
              </VChip>
            </td>
            <td>
              {{ k.rate_limit_per_minute }} rpm
            </td>
            <td>
              <div class="d-flex flex-wrap gap-1">
                <VChip
                  v-for="s in (k.scopes || ['*'])"
                  :key="s"
                  size="x-small"
                  variant="outlined"
                >
                  {{ s }}
                </VChip>
              </div>
            </td>
            <td>
              <span
                v-if="k.last_used_at"
                class="text-caption"
              >
                {{ new Date(k.last_used_at).toLocaleString() }}
              </span>
              <span
                v-else
                class="text-caption text-medium-emphasis"
              >- Belum pernah -</span>
            </td>
            <td>
              <VSwitch
                :model-value="k.is_active"
                color="success"
                density="compact"
                hide-details
                @change="toggleKeyStatus(k)"
              />
            </td>
            <td>
              <div class="d-flex gap-1">
                <VBtn
                  icon="tabler-refresh"
                  size="x-small"
                  variant="text"
                  color="warning"
                  title="Regenerasi Secret"
                  @click="regenerateKey(k)"
                />
                <VBtn
                  icon="tabler-trash"
                  size="x-small"
                  variant="text"
                  color="error"
                  title="Hapus Key"
                  @click="deleteKey(k)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCard>

    <!-- Dialog: Buat API Key Baru -->
    <VDialog
      v-model="dialogCreateKey"
      max-width="520"
    >
      <VCard>
        <VCardTitle class="pt-4 px-6">
          Buat API Key Baru
        </VCardTitle>
        <VCardSubtitle class="px-6">
          Kredensial untuk integrasi aplikasi pihak ketiga atau microservice.
        </VCardSubtitle>
        <VCardText class="px-6 py-4">
          <div class="d-flex flex-column gap-4">
            <VTextField
              v-model="newKey.name"
              label="Nama Klien / Deskripsi Key"
              placeholder="Contoh: JazMedia Sync Worker, Mobile Production"
              required
            />

            <VSelect
              v-model="newKey.tier"
              label="Tier Kuota Rate Limit"
              :items="[
                { title: 'Standard (120 requests / min)', value: 'standard' },
                { title: 'Partner (600 requests / min)', value: 'partner' },
                { title: 'Unlimited (2000 requests / min)', value: 'unlimited' },
              ]"
            />

            <div>
              <label class="text-caption font-weight-bold d-block mb-2">Pilih Hak Akses (Scopes):</label>
              <div class="d-flex flex-column gap-1">
                <VCheckbox
                  v-for="sc in availableScopes"
                  :key="sc.value"
                  v-model="newKey.scopes"
                  :value="sc.value"
                  :label="sc.label"
                  density="compact"
                  hide-details
                />
              </div>
            </div>
          </div>
        </VCardText>
        <VDivider />
        <VCardActions class="px-6 py-3">
          <VSpacer />
          <VBtn
            variant="tonal"
            color="secondary"
            @click="dialogCreateKey = false"
          >
            Batal
          </VBtn>
          <VBtn
            color="primary"
            :loading="isSubmittingKey"
            @click="createKey"
          >
            Buat Key Sekarang
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Dialog: Tampilkan Secret Token Baru (Once Only) -->
    <VDialog
      v-model="dialogSecret"
      persistent
      max-width="560"
    >
      <VCard>
        <VCardItem class="bg-primary text-white">
          <div class="d-flex align-center gap-2">
            <VIcon
              icon="tabler-key"
              size="24"
            />
            <VCardTitle class="text-white">
              Simpan API Key & Secret Token Anda
            </VCardTitle>
          </div>
        </VCardItem>
        <VCardText class="pa-6">
          <VAlert
            type="warning"
            variant="tonal"
            class="mb-4 text-caption"
          >
            <strong>Penting:</strong> Token ini hanya ditampilkan <strong>satu kali ini saja</strong>. Salin dan simpan di file <code>.env</code> aplikasi Anda dengan aman.
          </VAlert>

          <div class="mb-3">
            <span class="text-caption text-medium-emphasis">Nama Key:</span>
            <div class="font-weight-bold">
              {{ currentSecretData.name }}
            </div>
          </div>

          <div class="mb-2">
            <span class="text-caption text-medium-emphasis">Secret Token Lengkap:</span>
            <div class="d-flex gap-2 align-center mt-1">
              <code class="bg-surface pa-2 rounded border flex-grow-1 text-break">{{ currentSecretData.plain_secret }}</code>
              <VBtn
                color="primary"
                variant="tonal"
                prepend-icon="tabler-copy"
                @click="copyToClipboard(currentSecretData.plain_secret)"
              >
                Salin
              </VBtn>
            </div>
          </div>
        </VCardText>
        <VDivider />
        <VCardActions class="pa-4">
          <VSpacer />
          <VBtn
            color="primary"
            @click="dialogSecret = false"
          >
            Saya Sudah Menyimpannya
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>
code {
  font-family: 'Fira Code', 'Courier New', Courier, monospace;
  font-size: 0.85em;
}
</style>
