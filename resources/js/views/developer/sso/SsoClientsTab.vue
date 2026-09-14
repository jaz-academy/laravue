<script setup>
import { onMounted, ref } from 'vue'
import { $api } from '@/utils/api'

const props = defineProps({
  clients: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['refresh', 'showToast'])

const dialogCreate = ref(false)
const dialogSecret = ref(false)
const isSubmitting = ref(false)

const newClient = ref({
  name: '',
  redirect: '',
  confidential: true,
})

const currentSecretData = ref({
  name: '',
  id: '',
  secret: '',
})

const copyToClipboard = text => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
    emit('showToast', 'Disalin ke clipboard!')
  }
}

const createClient = async () => {
  if (!newClient.value.name || !newClient.value.redirect) return

  isSubmitting.value = true
  try {
    const token = useCookie('accessToken').value

    const res = await $api('/oauth/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newClient.value),
    })

    dialogCreate.value = false
    currentSecretData.value = {
      name: res.client.name,
      id: res.client.id,
      secret: res.plainSecret || res.client.secret,
    }
    dialogSecret.value = true

    newClient.value = { name: '', redirect: '', confidential: true }
    emit('refresh')
    emit('showToast', 'Aplikasi berhasil didaftarkan!')
  } catch (err) {
    console.error('Failed to create client:', err)
    const msg = err.response?._data?.message || err.data?.message || err.message || 'Terjadi kesalahan saat mendaftarkan aplikasi'
    emit('showToast', `Gagal: ${msg}`, 'error')
  } finally {
    isSubmitting.value = false
  }
}

const regenerateSecret = async client => {
  if (!confirm(`Regenerate client secret untuk "${client.name}"? Secret lama tidak akan bisa digunakan lagi.`)) return

  try {
    const token = useCookie('accessToken').value

    const res = await $api(`/oauth/clients/${client.id}/regenerate-secret`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    currentSecretData.value = {
      name: client.name,
      id: client.id,
      secret: res.plainSecret || res.client.secret,
    }
    dialogSecret.value = true
    emit('refresh')
  } catch (err) {
    console.error('Failed to regenerate secret:', err)
    emit('showToast', 'Gagal regenerasi secret', 'error')
  }
}

const deleteClient = async client => {
  if (!confirm(`Hapus / Cabut izin client "${client.name}"?`)) return

  try {
    const token = useCookie('accessToken').value

    await $api(`/oauth/clients/${client.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    emit('refresh')
    emit('showToast', 'Aplikasi klien dihapus')
  } catch (err) {
    console.error('Failed to delete client:', err)
    emit('showToast', 'Gagal menghapus client', 'error')
  }
}
</script>

<template>
  <div class="sso-clients-tab">
    <VCard>
      <VCardItem>
        <div class="d-flex justify-space-between align-center">
          <div>
            <VCardTitle>Daftar Aplikasi Eksternal (OAuth Clients)</VCardTitle>
            <VCardSubtitle>
              Aplikasi pihak ketiga yang diizinkan meminta otorisasi akun pengguna Jaz Academy.
            </VCardSubtitle>
          </div>
          <VBtn
            color="primary"
            prepend-icon="tabler-plus"
            @click="dialogCreate = true"
          >
            Daftarkan Aplikasi Baru
          </VBtn>
        </div>
      </VCardItem>

      <VDivider />

      <VTable class="text-no-wrap">
        <thead>
          <tr>
            <th class="text-uppercase">
              Nama Aplikasi
            </th>
            <th class="text-uppercase">
              Client ID
            </th>
            <th class="text-uppercase">
              Callback / Redirect URI
            </th>
            <th class="text-uppercase">
              Tipe
            </th>
            <th class="text-uppercase text-center">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td
              colspan="5"
              class="text-center py-6"
            >
              <VProgressCircular
                indeterminate
                color="primary"
              />
            </td>
          </tr>
          <tr v-else-if="clients.length === 0">
            <td
              colspan="5"
              class="text-center py-6 text-medium-emphasis"
            >
              Belum ada aplikasi OAuth terdaftar. Klik tombol <strong>Daftarkan Aplikasi Baru</strong> di atas.
            </td>
          </tr>
          <tr
            v-for="client in clients"
            :key="client.id"
          >
            <td class="font-weight-medium">
              <div class="d-flex align-center gap-2">
                <VAvatar
                  size="32"
                  color="primary"
                  variant="tonal"
                >
                  {{ client.name.substring(0, 2).toUpperCase() }}
                </VAvatar>
                <span>{{ client.name }}</span>
              </div>
            </td>
            <td>
              <VChip
                size="small"
                variant="tonal"
                color="info"
              >
                {{ client.id }}
              </VChip>
            </td>
            <td>
              <code class="text-caption text-primary">{{ client.redirect }}</code>
            </td>
            <td>
              <VChip
                size="x-small"
                :color="client.password_client ? 'warning' : 'success'"
              >
                {{ client.password_client ? 'Password' : 'Standard OAuth' }}
              </VChip>
            </td>
            <td class="text-center">
              <div class="d-inline-flex gap-1">
                <VBtn
                  size="small"
                  variant="text"
                  color="warning"
                  icon="tabler-key"
                  title="Regenerate Secret"
                  @click="regenerateSecret(client)"
                />
                <VBtn
                  size="small"
                  variant="text"
                  color="error"
                  icon="tabler-trash"
                  title="Hapus Klien"
                  @click="deleteClient(client)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCard>

    <!-- Modal Pendaftaran Client Baru -->
    <VDialog
      v-model="dialogCreate"
      max-width="560"
    >
      <VCard>
        <VCardTitle class="pa-4">
          Daftarkan Aplikasi Klien Baru
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="newClient.name"
                label="Nama Aplikasi"
                placeholder="misal: JazMedia Stream, LMS Sekolah"
                required
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="newClient.redirect"
                label="Redirect / Callback URI"
                placeholder="https://aplikasi-anda.com/auth/callback"
                hint="URL tujuan setelah otorisasi SSO berhasil. Pisahkan dengan spasi jika lebih dari satu."
                persistent-hint
                required
              />
            </VCol>
            <VCol cols="12">
              <VSwitch
                v-model="newClient.confidential"
                label="Confidential Client (Memerlukan Client Secret pada backend Anda)"
                color="primary"
              />
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions class="pa-4">
          <VSpacer />
          <VBtn
            variant="tonal"
            color="secondary"
            @click="dialogCreate = false"
          >
            Batal
          </VBtn>
          <VBtn
            color="primary"
            :loading="isSubmitting"
            @click="createClient"
          >
            Simpan & Dapatkan Secret
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Modal Tampilkan Secret Sekali Tampil -->
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
              Simpan Client Secret Anda
            </VCardTitle>
          </div>
        </VCardItem>
        <VCardText class="pa-6">
          <VAlert
            type="warning"
            variant="tonal"
            class="mb-4"
          >
            <strong>Penting:</strong> Client Secret ini hanya ditampilkan <strong>satu kali ini saja</strong>. Salin dan simpan di file <code>.env</code> aplikasi backend Anda.
          </VAlert>

          <div class="mb-4">
            <div class="text-caption text-medium-emphasis">
              Nama Aplikasi:
            </div>
            <div class="text-h6 font-weight-bold">
              {{ currentSecretData.name }}
            </div>
          </div>

          <div class="mb-4">
            <div class="text-caption text-medium-emphasis">
              Client ID:
            </div>
            <div class="d-flex align-center gap-2 mt-1">
              <code class="bg-surface pa-2 rounded border flex-grow-1">{{ currentSecretData.id }}</code>
              <VBtn
                size="small"
                variant="tonal"
                color="primary"
                icon="tabler-copy"
                @click="copyToClipboard(currentSecretData.id)"
              />
            </div>
          </div>

          <div>
            <div class="text-caption text-medium-emphasis">
              Client Secret:
            </div>
            <div class="d-flex align-center gap-2 mt-1">
              <code class="bg-surface pa-2 rounded border flex-grow-1 text-break">{{ currentSecretData.secret }}</code>
              <VBtn
                size="small"
                variant="tonal"
                color="primary"
                icon="tabler-copy"
                @click="copyToClipboard(currentSecretData.secret)"
              />
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
