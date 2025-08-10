<script setup>
import { fetchProjectData, plans } from '@/composables/fetchProjectData'
import AddPlanDrawer from '@/views/academy/AddPlans.vue'
import { VDataTable } from 'vuetify/labs/VDataTable'

const currentUser = useCookie('userData').value

onMounted(async () => {
  await fetchProjectData()
})

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

const plansData = computed(() => {
  return plans.value.map((plan, index) => ({
    id: plan.id,
    subject: plan.subject || `Plan ${index + 1}`,
    theme: plan.theme || '',
    description: plan.description || '',
    is_active: plan.is_active || 0,
    start_date: plan.start_date || '',
    end_date: plan.end_date || '',
  }))
})

const headers = [
  { title: 'Theme', key: 'theme' },
  { title: 'Status', key: 'is_active' },
  { title: 'Started', key: 'start_date' },
  { title: 'Deadline', key: 'end_date' },
  { title: 'Action', key: 'actions', sortable: false },
]

const addNewPlan = async ({ action, data }) => {
  if (currentUser?.role < 4) {
    showAlert('You do not have permission to modify plans', 'error')

    return
  }
  console.log('Sending planData:', data, 'action:', action)
  try {
    let url = '/plans'
    let method = 'POST'
    if (action === 'update' && data.id) {
      url = `/plans/${data.id}`
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
      console.log('Plan response:', resData)
      fetchProjectData()
    } else {
      showAlert(response.value.statusText || 'Gagal menyimpan data', 'error')
    }
  } catch (error) {
    console.error('Plan save error:', error?.data?.errors || error)
    showAlert(error.message || 'Gagal menyimpan data', 'error')
  }
}

const isDrawerOpen = ref(false)
const mode = ref('add')
const selectedPlan = ref({})

const editPlan = plan => {
  selectedPlan.value = { ...plan }
  mode.value = 'edit'
  isDrawerOpen.value = true
}

const deletePlan = async id => {
  try {
    if (confirm('Apakah kamu yakin ingin menghapus data ini?')) {
      console.log('Deleting Project Plan with ID:', id)
      await useApi(`/plans/${id}`, { method: 'DELETE' })
      showAlert('Data berhasil dihapus', 'success')
      fetchProjectData()
    }
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
              v-if="currentUser?.role >= 4"
              prepend-icon="tabler-plus"
              @click="() => { mode = 'add'; selectedPlan = {}; isDrawerOpen = true }"
            >
              Add Project Plan
            </VBtn>
          </div>
        </div>
      </VCardText>

      <VDivider />

      <div class="plans-table">
        <VDataTable
          v-model:items-per-page="itemsPerPage"
          v-model:page="page"
          :headers="headers"
          :items="plansData"
          item-value="theme"
          :search="searchQuery"
          show-select
          class="text-no-wrap"
        >
          <template #item.actions="{ item }">
            <IconBtn v-if="currentUser?.role >= 4">
              <VIcon
                icon="tabler-trash"
                @click="deletePlan(item.id)"
              />
            </IconBtn>
            <IconBtn>
              <VIcon
                icon="tabler-edit"
                @click="editPlan(item)"
              />
            </IconBtn>
          </template>

          <template #item.theme="{ item }">
            <div class="d-flex gap-x-3">
              <VAvatar
                size="38"
                variant="tonal"
                rounded
              >
                <VImg :src="`/images/plans/${item.subject}.png`" />
              </VAvatar>
              <div>
                <h6 class="text-h6">
                  <span class="text-primary">{{ item.subject }}</span>{{ ' - ' + item.theme }}
                </h6>
                <div class="text-sm text-disabled">
                  {{ item.description?.substring(0,50) + '...' }}
                </div>
              </div>
            </div>
          </template>

          <template #item.is_active="{ item }">
            <VChip
              :color="item.is_active ? 'primary' : 'error'"
              size="small"
              class="text-capitalize"
              label
            >
              {{ item.is_active ? 'Activated' : 'Deactivated' }}
            </VChip>
          </template>

          <template #item.end_date="{ item }">
            <h6 class="text-h6 text-end pe-4">
              {{ (item.end_date).toLocaleString() }}
            </h6>
          </template>

          <template #item.start_date="{ item }">
            <div class="text-end pe-4">
              {{ (item.start_date).toLocaleString() }}
            </div>
          </template>

          <template #bottom>
            <VDivider />
            <div class="d-flex align-center justify-space-between flex-wrap gap-3 pa-5 pt-3">
              <p class="text-sm text-medium-emphasis mb-0">
                showing {{ itemsPerPage * (page - 1) + 1 }} to
                {{ Math.min(itemsPerPage * page, plansData.length) }} of {{ plansData.length }} entries
              </p>
              <VPagination
                v-model="page"
                :length="Math.ceil(plansData.length / itemsPerPage)"
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

    <AddPlanDrawer
      v-model:is-drawer-open="isDrawerOpen"
      :mode="mode"
      :plan-data="selectedPlan"
      @plan-data="addNewPlan"
    />
  </div>
</template>

<style lang="scss">
.ProseMirror-focused{ border: none; }

.plans-table{
  .v-table {
    th:nth-child(3), th:nth-child(4) {
      .v-data-table-header__content{ justify-content: end; }
    }
  }
}
</style>
