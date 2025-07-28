<script setup>
import { paginationMeta } from '@api-utils/paginationMeta'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const searchQuery = ref('')

// 👉 Alert
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

// Data table options
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref('')
const orderBy = ref('')
const usersData = ref([])

const updateOptions = options => {
  page.value = options.page
  itemsPerPage.value = options.itemsPerPage
  searchQuery.value = options.search || ''

  if (options.sortBy?.length) {
    sortBy.value = options.sortBy[0].key
    orderBy.value = options.sortBy[0].order
  } else {
    sortBy.value = null
    orderBy.value = null
  }

  fetchUsers()
}

// Data table Headers
const headers = [
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Member',
    key: 'admin_student_id',
  },
  {
    title: 'Role',
    key: 'role',
  },
  {
    title: 'Access',
    key: 'access',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

const adminAccessOption = [
  'Assessment',
  'Payment',
  'Finance',
  'Project',
  'Reports',
]

const deleteUser = async id => {
  try {
    if (confirm('Apakah kamu yakin ingin menghapus data ini?')) {
      console.log('Deleting user with ID:', id)
      await useApi(`/users/${id}`, { method: 'DELETE' })
      showAlert('Data berhasil dihapus', 'success')
      fetchUsers()
    }
  } catch (err) {
    showAlert(err.message || 'Gagal menghapus data', 'error')
    console.error(err)
  }
}

const updateUser = async userData => {
  console.log('Updating user:', userData.id, userData)
  try {
    // Before sending, convert access array back to comma-separated string
    const dataToSend = { ...userData }
    if (Array.isArray(dataToSend.access)) {
      dataToSend.access = dataToSend.access.filter(Boolean).join(',')
    } else if (typeof dataToSend.access === 'string' && dataToSend.access.includes(',')) {
      // If it's already a comma-separated string, leave it as is
      // This handles cases where data might already be in string format if not edited
    } else if (dataToSend.access === null || dataToSend.access === undefined || dataToSend.access === '') {
      dataToSend.access = null // Ensure null for empty access
    }

    const { data, response } = await useApi(`/users/${userData.id}`, {
      method: 'PATCH',
      body: JSON.stringify(dataToSend), // kirim data dalam format JSON
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })

    if (response.value.ok) {
      showAlert('Data berhasil diperbarui', 'success')
      console.log('User updated:', data)

      // Re-fetch users to ensure the displayed data is fresh
      fetchUsers()
    } else {
      showAlert(response.value.statusText || 'Gagal memperbarui data', 'error')
      console.error('Update error response:', response.value)
    }

  } catch (error) {
    console.error('Update user error:', error?.data?.errors || error)
    showAlert(error.message || 'Gagal memperbarui data', 'error')
  }
}

const fetchUsers = async () => {
  const params = {
    q: searchQuery.value || '',
    itemsPerPage: itemsPerPage.value,
    page: page.value,
    sortBy: sortBy.value || '',
    orderBy: orderBy.value || '',
  }

  try {
    const result = await fetchAllUsers(params)

    console.log('📦 FETCHING with:', params, result)

    // PROSES PENTING DI SINI:
    // Pastikan `item.access` adalah array untuk setiap user
    // `item.access` dari API mungkin berupa string "Payment,Project" atau null
    if (result.users && Array.isArray(result.users)) {
      result.users = result.users.map(user => {
        // Jika `user.access` adalah string dan tidak kosong, split menjadi array
        if (typeof user.access === 'string' && user.access.length > 0) {
          user.access = user.access.split(',').map(item => item.trim()).filter(Boolean)
        } else {
          // Jika `user.access` null, undefined, atau string kosong, jadikan array kosong
          user.access = []
        }
        
        return user
      })
    }

    usersData.value = result
  } catch (error) {
    console.error('Error fetching students:', error.message)
  }
}

const users = computed(() => usersData.value?.users || [])
const totalUsers = computed(() => usersData.value?.totalUsers || 0)
</script>

<template>
  <VAlert
    v-model="isAlertVisible"
    closable
    close-label="Close Alert"
    class="mb-6"
    :color="alertColor"
  >
    {{ alertMessage }}
  </VAlert>
  <div>
    <VCard>
      <VCardText>
        <div class="d-flex justify-space-between flex-wrap gap-y-4">
          <AppTextField
            v-model="searchQuery"
            style="max-inline-size: 200px; min-inline-size: 200px;"
            placeholder="Search .."
            density="compact"
            @update:model-value="fetchUsers"
          />
          <div class="d-flex flex-row gap-4 align-center flex-wrap">
            <AppSelect
              v-model="itemsPerPage"
              density="compact"
              :items="[5, 10, 20, 50, 100]"
            />

            <VBtn
              prepend-icon="tabler-screen-share"
              variant="tonal"
              color="secondary"
            >
              Export
            </VBtn>
          </div>
        </div>
      </VCardText>

      <VDivider />
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :items="users"
        :headers="headers"
        :items-length="totalUsers"
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <template #item.name="{ item }">
          <div class="d-flex align-center gap-x-3">
            <VAvatar
              size="34"
              :variant="!item.image ? 'tonal' : undefined"
              class="me-3 overflow-hidden"
            >
              <VImg
                v-if="item?.image"
                cover
                :src="`/storage/${item.image}`"
              />
              <span v-else>{{ avatarText(item.name) }}</span>
            </VAvatar>
            <div class="d-flex flex-column">
              <div class="font-weight-medium">
                {{ item.name }}
              </div>
              <span class="text-sm text-disabled">{{ item.email }}</span>
            </div>
          </div>
        </template>

        <template #item.admin_student_id="{ item }">
          <VChip
            :color="item.admin_student_id > 0 ? 'primary' : 'info'"
            size="small"
            label
            class="text-capitalize"
          >
            {{ item.admin_student_id > 0 ? 'Student' : 'Teacher' }}
          </VChip>
        </template>

        <template #item.role="{ item }">
          <AppSelect
            v-model="item.role"
            :items="[0, 1, 2, 3, 4, 5]"
            @update:model-value="updateUser(item)"
          />
        </template>

        <template #item.access="{ item }">
          <AppSelect
            v-model="item.access"
            placeholder="Select Access"
            multiple
            :items="adminAccessOption"
            @update:model-value="updateUser(item)"
          />
        </template>

        <template #item.actions="{ item }">
          <IconBtn @click="updateUser(item)">
            <VIcon icon="tabler-device-floppy" />
          </IconBtn>
          <IconBtn @click="deleteUser(item.id)">
            <VIcon icon="tabler-trash" />
          </IconBtn>
        </template>

        <template #bottom>
          <VDivider />
          <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-disabled mb-0">
              {{ paginationMeta({ page, itemsPerPage }, totalUsers) }}
            </p>

            <VPagination
              v-model="page"
              :length="Math.ceil(totalUsers / itemsPerPage)"
              :total-visible="$vuetify.display.xs ? 1 : Math.min(Math.ceil(totalUsers / itemsPerPage), 5)"
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
      </VDataTableServer>
    </VCard>
  </div>
</template>

<style lang="scss" scoped>
.customer-title:hover{
  color: rgba(var(--v-theme-primary)) !important;
}
</style>
