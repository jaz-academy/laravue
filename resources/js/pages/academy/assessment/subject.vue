<script setup>
import { useUserAccess } from '@/@core/utils/helpers'
import AddSubjectDrawer from '@/views/academy/assessment/AddSubjectDrawer.vue'
import { VDataTable } from 'vuetify/labs/VDataTable'

const { hasRoleAndAccess } = useUserAccess()
const subjects = ref([])

const fetchSubjects = async () => {
  const { data } = await useApi('/subjects')

  subjects.value = data.value.data || []
}

onMounted(fetchSubjects)

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

const subjectData = computed(() => {
  return subjects.value
    .slice()
    .sort((a, b) => b.id - a.id) // 🔥 sort by id desc
    .map((subject, index) => ({
      no: index + 1,
      id: subject.id || '',
      number: subject.number || '',
      group: subject.group || '',
      name: subject.name || '',
    }))
})

const headers = [
  { title: 'No', key: 'no' },
  { title: 'Number', key: 'number' },
  { title: 'Group', key: 'group' },
  { title: 'Name', key: 'name' },
  { title: 'ID', key: 'id' },
  { title: 'Action', key: 'actions', sortable: false },
]

const addNewData = async ({ action, data }) => {
  console.log('Sending subject data:', data, 'action:', action)
  try {
    let url = '/subjects'
    let method = 'POST'
    if (action === 'update' && data.id) {
      url = `/subjects/${data.id}`
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
      console.log('Response subject data:', resData)
      fetchSubjects()
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
      console.log('Deleting subject data with ID:', id)
      await useApi(`/subjects/${id}`, { method: 'DELETE' })
      showAlert('Data berhasil dihapus', 'success')
    }
    fetchSubjects()
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
              v-if="hasRoleAndAccess(2, 'Assessment').value"
              prepend-icon="tabler-plus"
              @click="addData"
            >
              Add Data Subject
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
          :items="subjectData"
          :search="searchQuery"
          item-value="number"
          class="text-no-wrap"
          show-select
        >
          <template #item.actions="{ item }">
            <IconBtn
              :disabled="!hasRoleAndAccess(4, 'Assessment').value"
              :color="hasRoleAndAccess(4, 'Assessment').value ? 'error' : 'secondary'"
              @click="deleteData(item.id)"
            >
              <VIcon icon="tabler-trash" />
            </IconBtn>
            <IconBtn
              color="primary"
              @click="editData(item)"
            >
              <VIcon :icon="hasRoleAndAccess(3, 'Assessment').value ? 'tabler-edit' : 'tabler-eye'" />
            </IconBtn>
          </template>

          <template #item.number="{ item }">
            <VChip
              :color="item.group == 'Alquran' ? 'success' : item.group == 'Multimedia' || item.group == 'Informatika' ? 'primary' : 'info'"
              size="small"
              class="text-capitalize"
              label
            >
              {{ item.number }}
            </VChip>
          </template>

          <template #item.group="{ item }">
            <VChip
              :color="item.group == 'Alquran' ? 'success' : item.group == 'Multimedia' || item.group == 'Informatika' ? 'primary' : 'info'"
              size="small"
              class="text-capitalize"
              label
            >
              {{ item.group }}
            </VChip>
          </template>

          <template #item.name="{ item }">
            <VChip
              :color="item.group == 'Alquran' ? 'success' : item.group == 'Multimedia' || item.group == 'Informatika' ? 'primary' : 'info'"
              size="small"
              class="text-capitalize"
              label
            >
              {{ item.name }}
            </VChip>
          </template>

          <template #bottom>
            <VDivider />
            <div class="d-flex align-center justify-space-between flex-wrap gap-3 pa-5 pt-3">
              <p class="text-sm text-medium-emphasis mb-0">
                showing {{ itemsPerPage * (page - 1) + 1 }} to
                {{ Math.min(itemsPerPage * page, subjectData.length) }} of {{ subjectData.length }} entries
              </p>
              <VPagination
                v-model="page"
                :length="Math.ceil(subjectData.length / itemsPerPage)"
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

    <AddSubjectDrawer
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
