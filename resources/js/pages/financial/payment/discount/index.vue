<script setup>
import { useUserAccess } from '@/@core/utils/helpers'
import AddDiscount from '@/views/financial/finance/AddDiscount.vue'
import { VDataTable } from 'vuetify/labs/VDataTable'

const { hasRoleAndAccess, currentUser } = useUserAccess()
const discounts = ref([])

const fetchDiscounts = async () => {
  const { data } = await useApi('/discounts')

  discounts.value = data.value.data || []  
}

onMounted(fetchDiscounts)

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

const discountData = computed(() => {
  return discounts.value
    .slice()
    .sort((a, b) => b.id - a.id) // 🔥 sort by id desc
    .map((discount, index) => ({
      no: index + 1,
      id: discount.id || '',
      student: discount.admin_student.name || '',
      admin_student_id: discount.admin_student_id || '',
      year: discount.year || '',
      finance_account_id: discount.finance_account_id || '',
      billing: discount.billing || '',
      amount: discount.amount || '',
      note: discount.note || '',
      admin: discount.admin || '',
    }))
})

const colors = ['primary', 'success', 'warning', 'error', 'info', 'secondary']

const headers = [
  { title: 'No', key: 'no' },
  { title: 'Student', key: 'student' },
  { title: 'Year', key: 'year' },
  { title: 'Billing', key: 'billing' },
  { title: 'Amount', key: 'amount' },
  { title: 'Action', key: 'actions', sortable: false },
]

const addNewData = async ({ action, data }) => {
  console.log('Sending discount data:', data, 'action:', action)
  try {
    let url = '/discounts'
    let method = 'POST'
    if (action === 'update' && data.id) {
      url = `/discounts/${data.id}`
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
      console.log('Response discount data:', resData)
      fetchDiscounts()
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
      console.log('Deleting discount data with ID:', id)
      await useApi(`/discounts/${id}`, { method: 'DELETE' })
      showAlert('Data berhasil dihapus', 'success')
    }
    fetchDiscounts()
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
              prepend-icon="tabler-plus"
              @click="addData"
            >
              Add Data discount
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
          :items="discountData"
          :search="searchQuery"
          item-value="number"
          class="text-no-wrap"
          show-select
        >
          <template #item.student="{ item }">
            <div class="d-flex align-center gap-x-2">
              <VAvatar
                v-if="item.student"
                size="38"
                variant="tonal"
                :color="colors[item.admin_student_id % colors.length]"
                rounded
              >
                <VIcon icon="tabler-file-text" />
              </VAvatar>
              <div class="d-flex flex-column">
                <span class="text-body-1 font-weight-medium">{{ item.student }}</span>
                <span class="text-sm text-disabled">{{ item.year }}</span>
              </div>
            </div>
          </template>
        
          <template #item.year="{ item }">
            <VChip
              :color="colors[item.admin_student_id % colors.length]"
              size="small"
              class="text-capitalize"
              label
            >
              {{ item.year }}
            </VChip>
          </template>

          <template #item.amount="{ item }">
            {{ Number(item.amount).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
          </template>

          <template #item.actions="{ item }">
            <IconBtn
              :disabled="!hasRoleAndAccess(4, 'Payment').value"
              :color="hasRoleAndAccess(4, 'Payment').value ? 'error' : 'secondary'"
              @click="deleteData(item.id)"
            >
              <VIcon icon="tabler-trash" />
            </IconBtn>
            <IconBtn
              color="primary"
              @click="editData(item)"
            >
              <VIcon :icon="hasRoleAndAccess(3, 'Payment').value ? 'tabler-edit' : 'tabler-eye'" />
            </IconBtn>
          </template>

          <template #bottom>
            <VDivider />
            <div class="d-flex align-center justify-space-between flex-wrap gap-3 pa-5 pt-3">
              <p class="text-sm text-medium-emphasis mb-0">
                showing {{ itemsPerPage * (page - 1) + 1 }} to
                {{ Math.min(itemsPerPage * page, discountData.length) }} of {{ discountData.length }} entries
              </p>
              <VPagination
                v-model="page"
                :length="Math.ceil(discountData.length / itemsPerPage)"
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

    <AddDiscount
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
