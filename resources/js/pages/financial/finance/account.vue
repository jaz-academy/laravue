<script setup>
import { useUserAccess } from '@/@core/utils/helpers'
import AddAccount from '@/views/financial/finance/AddAccount.vue'
import { VDataTable } from 'vuetify/labs/VDataTable'

const { hasRoleAndAccess } = useUserAccess()
const accounts = ref([])

const fetchAccounts = async () => {
  const { data } = await useApi('/accounts')

  accounts.value = data.value.data || []
}

onMounted(fetchAccounts)

const isAlertVisible = ref(false)
const alertMessage = ref('')
const alertColor = ref('primary')

const showAlert = (message, color = 'primary') => {
  alertMessage.value = message
  alertColor.value = color
  isAlertVisible.value = true
  setTimeout(() => {
    isAlertVisible.value = false
  }, 10000)
}

const accountData = computed(() => {
  return accounts.value
    .slice()
    .sort((a, b) => b.id - a.id) // 🔥 sort by id desc
    .map((account, index) => ({
      no: index + 1,
      id: account.id || '',
      number: account.number || '',
      unit: account.unit || '',
      description: account.description || '',
      detail: account.detail || '',
      allocation: account.allocation || '-',
    }))
})

const headers = [
  { title: 'No', key: 'no' },
  { title: 'Number', key: 'number' },
  { title: 'Unit', key: 'unit' },
  { title: 'Description', key: 'description' },
  { title: 'Allocation', key: 'allocation' },
  { title: 'Action', key: 'actions', sortable: false },
]

const addNewData = async ({ action, data }) => {
  console.log('Sending account data:', data, 'action:', action)
  try {
    let url = '/accounts'
    let method = 'POST'
    if (action === 'update' && data.id) {
      url = `/accounts/${data.id}`
      method = 'PUT'
    }

    const { data: resData, response } = await useApi(url, {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })

    if (response.value.ok) {
      const msg = action === 'create' ? 'Data berhasil ditambahkan' : 'Data berhasil diperbarui'

      showAlert(msg, 'success')
      console.log('Response account data:', resData)
      fetchAccounts()
    } else {
      showAlert(response.value.statusText || 'Gagal menyimpan data', 'error')
    }
  } catch (error) {
    console.error('Save error:', error?.data?.errors || error)
    showAlert(error.message || 'Gagal menyimpan data', 'error')
  }
}

const isDrawerOpen = ref(false)
const mode = ref('add')
const selectedData = ref({})

const editData = data => {
  selectedData.value = { ...data }
  mode.value = 'edit'
  isDrawerOpen.value = true
}

const addData = () => {
  selectedData.value = {}
  mode.value = 'add'
  isDrawerOpen.value = true
}

const deleteData = async id => {
  try {
    if (confirm('Apakah kamu yakin ingin menghapus data ini?')) {
      console.log('Deleting account data with ID:', id)
      await useApi(`/accounts/${id}`, { method: 'DELETE' })
      showAlert('Data berhasil dihapus', 'success')
    }
    fetchAccounts()
  } catch (err) {
    showAlert(err.message || 'Gagal menghapus data', 'error')
    console.error(err)
  }
}

const itemsPerPage = ref(10)
const page = ref(1)
const searchQuery = ref('')
</script>

<template>
  <div>
    <VAlert
      v-model="isAlertVisible"
      closable
      class="mb-6"
      :color="alertColor"
    >
      {{ alertMessage }}
    </VAlert>

    <VCard>
      <VCardText>
        <div class="d-flex justify-sm-space-between flex-wrap gap-y-4 gap-x-6 justify-start">
          <VTextField
            v-model="searchQuery"
            placeholder="Search"
            density="compact"
            style="max-inline-size: 200px; min-inline-size: 200px;"
          />
          <div class="d-flex align-center flex-wrap gap-4">
            <AppSelect
              v-model="itemsPerPage"
              :items="[5,10,15]"
            />
            <VBtn
              v-if="hasRoleAndAccess(2, 'Finance').value"
              prepend-icon="tabler-plus"
              @click="addData"
            >
              Add Data Account
            </VBtn>
          </div>
        </div>
      </VCardText>

      <VDivider />

      <div class="data-table">
        <VDataTable
          v-model:items-per-page="itemsPerPage"
          v-model:page="page"
          :headers="headers"
          :items="accountData"
          :search="searchQuery"
          item-value="number"
          class="text-no-wrap"
          show-select
        >
          <template #item.unit="{ item }">
            <VChip
              :color="item.unit == 'Pemasukan' ? 'info' : item.unit == 'Pengeluaran' ? 'warning' : 'success'"
              size="small"
              class="text-capitalize"
              label
            >
              {{ item.unit }}
            </VChip>
          </template>

          <template #item.actions="{ item }">
            <IconBtn
              :disabled="!hasRoleAndAccess(4, 'Finance').value"
              :color="hasRoleAndAccess(4, 'Finance').value ? 'error' : 'secondary'"
              @click="deleteData(item.id)"
            >
              <VIcon icon="tabler-trash" />
            </IconBtn>
            <IconBtn
              color="primary"
              @click="editData(item)"
            >
              <VIcon :icon="hasRoleAndAccess(3, 'Finance').value ? 'tabler-edit' : 'tabler-eye'" />
            </IconBtn>
          </template>

          <template #bottom>
            <VDivider />
            <div class="d-flex align-center justify-space-between flex-wrap gap-3 pa-5 pt-3">
              <p class="text-sm text-medium-emphasis mb-0">
                showing {{ itemsPerPage * (page - 1) + 1 }} to
                {{ Math.min(itemsPerPage * page, accountData.length) }} of {{ accountData.length }} entries
              </p>
              <VPagination
                v-model="page"
                :length="Math.ceil(accountData.length / itemsPerPage)"
                :total-visible="5"
              >
                <template #prev="slotProps">
                  <VBtn
                    variant="tonal"
                    color="default"
                    v-bind="slotProps"
                    :icon="false"
                  >
                    Previous
                  </VBtn>
                </template>
                <template #next="slotProps">
                  <VBtn
                    variant="tonal"
                    color="default"
                    v-bind="slotProps"
                    :icon="false"
                  >
                    Next
                  </VBtn>
                </template>
              </VPagination>
            </div>
          </template>
        </VDataTable>
      </div>
    </VCard>

    <AddAccount
      v-model:is-drawer-open="isDrawerOpen"
      :mode="mode"
      :selected-data="selectedData"
      @selected-data="addNewData"
    />
  </div>
</template>

<style lang="scss">
.ProseMirror-focused{ border: none; }
</style>
