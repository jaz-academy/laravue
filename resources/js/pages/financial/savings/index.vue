<script setup>
import { humanDate, useUserAccess } from '@/@core/utils/helpers'
import AddSavings from '@/views/financial/savings/AddSavings.vue'
import { VDataTable } from 'vuetify/labs/VDataTable'

const { hasRoleAndAccess, currentUser } = useUserAccess()
const savings = ref([])

const fetchSavings = async () => {
  const { data } = await useApi('/savings')

  savings.value = data.value.data || []  
}

onMounted(fetchSavings)

const saldos = computed(() => {
  const map = {}

  for (const s of savings.value) {
    const st = s.admin_student
    if (st && st.id) {
      if (!map[st.id]) {
        map[st.id] = {
          id: st.id,
          name: st.nickname || st.name || '',
          debit: 0,
          credit: 0,
          saldo: 0,
        }
      }
      map[st.id].debit += Number(s.debit) || 0
      map[st.id].credit += Number(s.credit) || 0
      map[st.id].saldo = map[st.id].credit - map[st.id].debit
    }
  }

  return Object.values(map)
})

const getSaldoById = id => {
  return saldos.value.find(s => s.id === id) || { debit: 0, credit: 0, saldo: 0 }
}

const isAlertVisible = ref(false)
const alertMessage = ref('')
const alertColor = ref('primary')

const widgetData = computed(() => {
  let summary = { credit: 0, debit: 0, saldo: 0 }

  if (currentUser.value && currentUser.value.admin_student_id) {
    summary = getSaldoById(currentUser.value.admin_student_id) || summary
  } else {
    const totalDeposit = savings.value.reduce((acc, s) => acc + Number(s.credit), 0)
    const totalWithdraw = savings.value.reduce((acc, s) => acc + Number(s.debit), 0)

    summary = {
      credit: totalDeposit,
      debit: totalWithdraw,
      saldo: totalDeposit - totalWithdraw,
    }
  }

  const items = [
    { key: 'credit', title: 'Total Deposit', icon: 'tabler-credit-card-refund', desc: 'Penyimpanan', color: 'warning' },
    { key: 'debit', title: 'Total Withdraw', icon: 'tabler-credit-card-pay', desc: 'Penarikan', color: 'info' },
    { key: 'saldo', title: 'Total Balance', icon: 'tabler-wallet', desc: 'Saldo', color: 'success' },
  ]

  return items.map(item => ({
    ...item,
    value: summary[item.key].toLocaleString('id-ID'),
  }))
})

const showAlert = (message, color = 'primary') => {
  alertMessage.value = message
  alertColor.value = color
  isAlertVisible.value = true
  setTimeout(() => {
    isAlertVisible.value = false
  }, 10000)
}

const savingData = computed(() => {
  return savings.value
    .slice()
    .sort((a, b) => b.id - a.id) // 🔥 sort by id desc
    .map((saving, index) => ({
      no: index + 1,
      id: saving.id || '',
      invoice: saving.invoice || '',
      date: saving.date || '',
      admin_student_id: saving.admin_student?.id || '',
      student: saving.admin_student?.nickname || '',
      credit: saving.credit || '',
      debit: saving.debit || '',
      balance: saving.balance || '',
      note: saving.note || '',
      admin: saving.admin || '',
    }))
})

const filteredSavingData = computed(() => {
  // If the current user is a student, filter the savings data to show only their transactions.
  if (currentUser.value && currentUser.value.admin_student_id) {
    return savingData.value.filter(
      s => s.admin_student_id === currentUser.value.admin_student_id,
    )
  }
  
  // Otherwise (if admin or other roles), show all savings data.
  return savingData.value
})


const colors = ['primary', 'success', 'warning', 'error', 'info', 'secondary']

const headers = [
  { title: 'No', key: 'no' },
  { title: 'Date', key: 'date' },
  { title: 'Invoice', key: 'invoice' },
  { title: 'Student', key: 'student' },
  { title: 'Amount', key: 'balance' },
  { title: 'Action', key: 'actions', sortable: false },
]

const addNewData = async ({ action, data }) => {
  console.log('Sending saving data:', data, 'action:', action)
  try {
    let url = '/savings'
    let method = 'POST'
    if (action === 'update' && data.id) {
      url = `/savings/${data.id}`
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
      console.log('Response saving data:', resData)
      fetchSavings()
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
      console.log('Deleting saving data with ID:', id)
      await useApi(`/savings/${id}`, { method: 'DELETE' })
      showAlert('Data berhasil dihapus', 'success')
    }
    fetchSavings()
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
    <!-- 👉 widgets -->
    <VCard class="mb-6">
      <VCardText>
        <VRow>
          <template
            v-for="(data, id) in widgetData"
            :key="id"
          >
            <VCol
              cols="12"
              md="4"
              class="px-8 position-relative"
            >
              <div
                class="d-flex justify-space-between"
                :class="$vuetify.display.xs
                  ? 'product-widget'
                  : $vuetify.display.sm
                    ? id < 2 ? 'product-widget' : ''
                    : ''"
              >
                <div class="d-flex flex-column gap-y-1">
                  <div class="text-body-1 font-weight-medium text-capitalize">
                    {{ data.title }}
                  </div>

                  <h4 :class="id == 2 ? `text-h2` : `text-h4`">
                    Rp. {{ data.value }}
                  </h4>

                  <div class="d-flex">
                    <div :class="`me-2 text-disabled text-no-wrap text-${data.color}`">
                      {{ data.desc }}
                    </div>
                  </div>
                </div>

                <VAvatar
                  variant="tonal"
                  :color="data.color"
                  rounded
                  size="38"
                >
                  <VIcon
                    :icon="data.icon"
                    size="28"
                  />
                </VAvatar>
              </div>
              <VDivider
                v-if="($vuetify.display.mdAndUp && id < widgetData.length - 1) || ($vuetify.display.smOnly && id % 2 === 0)"
                vertical
                inset
                class="position-absolute"
                style=" block-size: 70%;inset-block-start: 50%; inset-inline-end: 0; transform: translateY(-50%);"
              />
            </VCol>
          </template>
        </VRow>
      </VCardText>
    </VCard>

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
              v-if="hasRoleAndAccess(2, 'Saving').value"
              prepend-icon="tabler-plus"
              @click="addData"
            >
              Add Data Saving
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
          :items="filteredSavingData"
          :search="searchQuery"
          item-value="number"
          class="text-no-wrap"
          show-select
        >
          <template #item.date="{ item }">
            {{ humanDate(item.date) }}
          </template>

          <template #item.student="{ item }">
            <VChip
              :color="colors[item.admin_student_id % colors.length]"
              size="small"
              class="text-capitalize"
              label
            >
              {{ item.student }}
            </VChip>
          </template>

          <template #item.balance="{ item }">
            <VAvatar
              variant="tonal"
              class="me-4"
              size="38"
              circle
            >
              <VIcon
                :color="item.balance < 0 ? 'error' : 'primary'"
                :icon="item.balance < 0 ? 'tabler-credit-card-pay' : 'tabler-credit-card-refund'"
                size="18"
              />
            </VAvatar>
            <span :class="item.balance < 0 ? 'text-error' : 'text-primary'">
              {{ item.balance.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
            </span>
          </template>

          <template #item.actions="{ item }">
            <IconBtn
              :disabled="!hasRoleAndAccess(4, 'Saving').value"
              :color="hasRoleAndAccess(4, 'Saving').value ? 'error' : 'secondary'"
              @click="deleteData(item.id)"
            >
              <VIcon icon="tabler-trash" />
            </IconBtn>
            <IconBtn
              color="primary"
              @click="editData(item)"
            >
              <VIcon :icon="hasRoleAndAccess(3, 'Saving').value ? 'tabler-edit' : 'tabler-eye'" />
            </IconBtn>
          </template>

          <template #bottom>
            <VDivider />
            <div class="d-flex align-center justify-space-between flex-wrap gap-3 pa-5 pt-3">
              <p class="text-sm text-medium-emphasis mb-0">
                showing {{ itemsPerPage * (page - 1) + 1 }} to
                {{ Math.min(itemsPerPage * page, filteredSavingData.length) }} of {{ filteredSavingData.length }} entries
              </p>
              <VPagination
                v-model="page"
                :length="Math.ceil(filteredSavingData.length / itemsPerPage)"
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

    <AddSavings
      v-model:is-drawer-open="isDrawerOpen"
      :mode="mode"
      :selected-data="selectedData"
      :get-saldo="getSaldoById"
      @selected-data="addNewData"
    />
  </div>
</template>

<style lang="scss">
.ProseMirror-focused{ border: none; }
</style>
