<script setup>
import { useUserAccess } from '@/@core/utils/helpers'
import AddCompetenceDrawer from '@/views/academy/assessment/AddCompetenceDrawer.vue'
import { VDataTable } from 'vuetify/labs/VDataTable'

const { hasRoleAndAccess } = useUserAccess()
const competences = ref([])

const fetchCompetences = async () => {
  const { data } = await useApi('/competences')
  
  competences.value = data.value.data || []
}

onMounted(fetchCompetences)

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

const competenceData = computed(() => {
  return competences.value
    .slice()
    .sort((a, b) => b.id - a.id) // 🔥 sort by id desc
    .map(competence => ({
      id: competence.id || '',
      academy_subject_id: competence.academy_subject_id || '',
      semester: competence.semester || '',
      admin_teacher_id: competence.admin_teacher_id || '',
      competence_1: competence.competence_1 || '',
      competence_2: competence.competence_2 || '',
      competence_3: competence.competence_3 || '',
      number: competence.academy_subject.number || '',
      group: competence.academy_subject.group || '',
      subject: competence.academy_subject.name || '',
      teacher: competence.admin_teacher.nickname || '',
    }))
})

const headers = [
  { title: 'Subject', key: 'number' },
  { title: 'Teacher', key: 'teacher' },
  { title: 'SMT', key: 'semester' },
  { title: 'Action', key: 'actions', sortable: false },
]

const addNewData = async ({ action, data }) => {
  console.log('Sending competence data:', data, 'action:', action)
  try {
    let url = '/competences'
    let method = 'POST'
    if (action === 'update' && data.id) {
      url = `/competences/${data.id}`
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
      console.log('Response competence data:', resData)
      fetchCompetences()
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
      console.log('Deleting competence data with ID:', id)
      await useApi(`/competences/${id}`, { method: 'DELETE' })
      showAlert('Data berhasil dihapus', 'success')
    }
    fetchCompetences()
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
              Add Data Competence
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
          :items="competenceData"
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
            <div class="d-flex align-center gap-x-4 py-2">
              <VAvatar
                variant="tonal"
                size="40"
                rounded
                color="primary"
              >
                <VIcon :icon="item.number.substring(0, 1) == '1' ? 'tabler-square-number-1' : item.number.substring(0, 1) == '2' ? 'tabler-square-number-2' : item.number.substring(0, 1) == '3' ? 'tabler-square-number-3' : item.number.substring(0, 1) == '4' ? 'tabler-square-number-4' : 'tabler-square-number-5'" />
              </VAvatar>

              <div>
                <div class="text-base font-weight-medium mb-1">
                  {{ item.group }} - {{ item.subject }}
                </div>
                <div class="d-flex align-center">
                  <span class="text-sm text-disabled">
                    {{ item.competence_1.substring(0, 100) }}
                  </span>
                </div>
              </div>
            </div>
          </template>

          <template #item.teacher="{ item }">
            <VChip
              label
              color="primary"
            >
              {{ item.teacher }}
            </VChip>
          </template>

          <template #item.semester="{ item }">
            <VIcon :icon="item.semester == 1 ? 'tabler-circle-number-1' : item.semester == 2 ? 'tabler-circle-number-2' : item.semester == 3 ? 'tabler-circle-number-3' : item.semester == 4 ? 'tabler-circle-number-4' : item.semester == 5 ? 'tabler-circle-number-5' : 'tabler-circle-number-6'" />
          </template>

          <template #bottom>
            <VDivider />
            <div class="d-flex align-center justify-space-between flex-wrap gap-3 pa-5 pt-3">
              <p class="text-sm text-medium-emphasis mb-0">
                showing {{ itemsPerPage * (page - 1) + 1 }} to
                {{ Math.min(itemsPerPage * page, competenceData.length) }} of {{ competenceData.length }} entries
              </p>
              <VPagination
                v-model="page"
                :length="Math.ceil(competenceData.length / itemsPerPage)"
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

    <AddCompetenceDrawer
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
