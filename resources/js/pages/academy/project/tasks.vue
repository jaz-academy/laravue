<script setup>
import { useUserAccess } from '@/@core/utils/helpers'
import { allTasks, fetchProjectData, fetchTasksList } from '@/composables/fetchProjectData'
import AddNewTaskDrawer from '@/views/academy/AddTasks.vue'
import { paginationMeta } from '@api-utils/paginationMeta'
import avatar from '@images/avatars/no-profile.png'
import { onMounted } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const { hasRole, currentUser, hasRoleOrTeacher } = useUserAccess()

onMounted(async () => {
  await fetchProjectData()
})

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

// switchable drawer modal input & edit
const isDrawerOpen = ref(false)
const mode = ref('add')
const selectedTask = ref({})

const editTask = task => {
  selectedTask.value = { ...task }
  mode.value = 'edit'
  isDrawerOpen.value = true
}

const reviewTask = task => {
  selectedTask.value = { ...task }
  mode.value = 'review'
  isDrawerOpen.value = true
}

const duplicateTask = task => {
  selectedTask.value = task
  mode.value = 'duplicate'
  isDrawerOpen.value = true
}

// data untuk widgets
const widgetData = computed(() => {
  const Tasks = computed(() => allTasks.value || [])
  
  return [
    {
      title: 'Instagram',
      value: Tasks.value.filter(task => task.media === 'Instagram').length,
      icon: 'tabler-brand-instagram',
      desc: `${Tasks.value.filter(task => task.media === 'Instagram' && task.accepted == '0').length} unchecked`,
      change: (() => {
        const total = Tasks.value.filter(task => task.media === 'Instagram').length
        const completed = Tasks.value.filter(task => task.media === 'Instagram' && task.accepted == '1').length
        
        return total ? ((completed / total) * 100).toFixed(1) : 0
      })(),
    },
    {
      title: 'TikTok',
      value: Tasks.value.filter(task => task.media == 'TikTok').length,
      icon: 'tabler-brand-tiktok',
      desc: `${Tasks.value.filter(task => task.media == 'TikTok' && task.accepted == '0').length} unchecked`,
      change: (() => {
        const total = Tasks.value.filter(task => task.media == 'TikTok').length
        const completed = Tasks.value.filter(task => task.media == 'TikTok' && task.accepted == '1').length
        
        return total ? ((completed / total) * 100).toFixed(1) : 0
      })(),
    },
    {
      title: 'YouTube',
      value: Tasks.value.filter(task => task.media === 'YouTube').length,
      icon: 'tabler-brand-youtube',
      desc: `${Tasks.value.filter(task => task.media === 'YouTube' && task.accepted == '0').length} unchecked`,
      change: (() => {
        const total = Tasks.value.filter(task => task.media === 'YouTube').length
        const completed = Tasks.value.filter(task => task.media === 'YouTube' && task.accepted == '1').length
        
        return total ? ((completed / total) * 100).toFixed(1) : 0
      })(),
    },
    {
      title: 'Others',
      value: Tasks.value.filter(task => task.media !== 'Instagram' && task.media !== 'TikTok' && task.media !== 'YouTube').length,
      icon: 'tabler-world',
      desc: `${Tasks.value.filter(task => task.media !== 'Instagram' && task.media !== 'TikTok' && task.media !== 'YouTube' && task.accepted == '0').length} unchecked`,
      change: (() => {
        const total = Tasks.value.filter(task => task.media !== 'Instagram' && task.media !== 'TikTok' && task.media !== 'YouTube').length
        const completed = Tasks.value.filter(task => task.media !== 'Instagram' && task.media !== 'TikTok' && task.media !== 'YouTube' && task.accepted == '1').length

        return total ? ((completed / total) * 100).toFixed(1) : 0
      })(),
    },
  ]
})

// memanggil dan filtering data tasks
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()
const tasksData = ref([])
const selectedStatus = ref()
const selectedMedia = ref()
const selectedChecked = ref()
const searchQuery = ref('')

const updateOptions = options => {
  page.value = options.page
  itemsPerPage.value = options.itemsPerPage

  if (options.sortBy?.length) {
    sortBy.value = options.sortBy[0].key
    orderBy.value = options.sortBy[0].order
  } else {
    sortBy.value = null
    orderBy.value = null
  }
  
  fetchTasks()
}

const fetchTasks = async () => {
  const params = {
    admin_student_id: currentUser.value?.admin_student_id || '',
    search: searchQuery.value || '',
    status: selectedStatus.value || '',
    media: selectedMedia.value || '',
    accepted: selectedChecked.value || '',
    perPage: itemsPerPage.value,
    page: page.value,
    sortBy: sortBy.value || '',
    orderBy: orderBy.value || '',
  }
  
  try {
    const result = await fetchTasksList(params)

    console.log('📦 FETCHING with:', params, result)

    tasksData.value = result
  } catch (error) {
    console.error('Error fetching tasks:', error.message)
  }
}

// data untuk tabel
const dataTasks = computed(() => tasksData.value?.tasks || [] )
const totalTasks = computed(() => tasksData.value?.totalTasks || 0)

// data untuk option select
const mediaOptions = computed(() => {
  const medias = tasksData.value?.tasks?.map(task => task.media) || []
  const uniqueMedias = [...new Set(medias.filter(Boolean))]

  return uniqueMedias.map(media => ({ title: media, value: media }))
})

const statusOptions = ref([
  {
    title: 'Completed',
    value: 'Completed',
  },
  {
    title: 'In Progress',
    value: 'In Progress',
  },
  {
    title: 'On Hold',
    value: 'On Hold',
  },
])

const checkedOptions = ref([
  {
    title: 'Accepted',
    value: '1',
  },
  {
    title: 'Unchecked',
    value: '0',
  },
])

// header tabel dan keys sort data
const headers = [
  {
    title: 'Task',
    key: 'name',
  },
  {
    title: 'Creators',
    key: 'students',
    sortable: false,
  },
  {
    title: 'Stars',
    key: 'rate',
  },
  {
    title: 'SMT',
    key: 'semester',
  },
  {
    title: 'ID',
    key: 'id',
  },
  {
    title: 'Status',
    key: 'status',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

// icon media tasks
const resolveMedia = media => {
  if (media == 'Instagram')
    return {
      color: 'primary',
      icon: 'tabler-brand-instagram',
    }
  if (media == 'TikTok')
    return {
      color: 'info',
      icon: 'tabler-brand-tiktok',
    }
  if (media == 'YouTube')
    return {
      color: 'error',
      icon: 'tabler-brand-youtube',
    }
  if (media == 'Google Drive')
    return {
      color: 'warning',
      icon: 'tabler-brand-google',
    }
  else
    return {
      color: 'primary',
      icon: 'tabler-world',
    }
}

// warna teks status
const resolveStatus = statusMsg => {
  if (statusMsg === 'Completed')
    return {
      text: 'Completed',
      color: 'primary',
    }
  if (statusMsg === 'In Progress')
    return {
      text: 'In Progress',
      color: 'warning',
    }
  if (statusMsg === 'On Hold')
    return {
      text: 'On Hold',
      color: 'error',
    }
}

// menambah task baru
const addNewTask = async ({ action, data }) => {
  const sanitizedData = {
    ...data,
    accepted: data.accepted === '' ? '0' : Boolean(Number(data.accepted)),
    rate: data.rate === '' ? 0 : Number(data.rate),
    admin_teacher_id: data.admin_teacher_id === '' ? null : Number(data.admin_teacher_id),
  }

  console.log('Sending taskData:', sanitizedData, 'action:', action)
  try {
    let url = '/tasks'
    let method = 'POST'
    if (action === 'update' && data.id) {
      url = `/tasks/${data.id}`
      method = 'PUT'
    }

    const { data: resData, response } = await useApi(url, {
      method,
      body: JSON.stringify(sanitizedData),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })

    if (response.value.ok) {
      const msg = action === 'create' ? 'Data berhasil ditambahkan' : 'Data berhasil diperbarui'

      showAlert(msg, 'success')
      console.log('Task response:', resData)
      fetchTasks()
    } else {
      showAlert(response.value.statusText || 'Gagal menyimpan data', 'error')
    }
  } catch (error) {
    console.error('Task save error:', error?.data?.errors || error)
    showAlert(error.message || 'Gagal menyimpan data', 'error')
  }
}

// Hapus task
const deleteTask = async id => {
  try {
    if (confirm('Apakah kamu yakin ingin menghapus data ini?')) {
      console.log('Deleting task with ID:', id)
      await useApi(`/tasks/${id}`, { method: 'DELETE' })
      showAlert('Data berhasil dihapus', 'success')
      fetchTasks() 
    }
  } catch (err) {
    showAlert(err.message || 'Gagal menghapus data', 'error')
    console.error(err)
  }
}

function getDistinctStudent(students) {
  const groupedStud = students.reduce((acc, stud) => {
    if (!acc.has(stud.id)) {
      acc.set(stud.id, stud)
    }
    
    return acc
  }, new Map())

  return Array.from(groupedStud.values())
}
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
              sm="6"
              md="3"
              class="px-6"
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

                  <h4 class="text-h4 my-1">
                    {{ data.value }}
                  </h4>

                  <div class="d-flex">
                    <div class="me-2 text-disabled text-no-wrap">
                      {{ data.desc }}
                    </div>

                    <VChip
                      v-if="data.change"
                      label
                      :color="data.change == 100 ? 'success' : 'error'"
                    >
                      {{ prefixWithPlus(data.change) }}%
                    </VChip>
                  </div>
                </div>

                <VAvatar
                  variant="tonal"
                  rounded
                  size="38"
                >
                  <VIcon
                    :icon="data.icon"
                    size="28"
                  />
                </VAvatar>
              </div>
            </VCol>
            <VDivider
              v-if="$vuetify.display.mdAndUp ? id !== widgetData.length - 1
                : $vuetify.display.smAndUp ? id % 2 === 0
                  : false"
              vertical
              inset
              length="95"
            />
          </template>
        </VRow>
      </VCardText>
    </VCard>

    <VAlert
      v-model="isAlertVisible"
      closable
      close-label="Close Alert"
      class="mb-6"
      :color="alertColor"
    >
      {{ alertMessage }}
    </VAlert>

    <!-- 👉 products -->
    <VCard
      title="Filters"
      class="mb-6"
    >
      <VCardText>
        <VRow>
          <!-- 👉 Select Status -->
          <VCol
            cols="12"
            sm="4"
          >
            <AppSelect
              v-model="selectedStatus"
              placeholder="Status"
              :items="statusOptions"
              clearable
              clear-icon="tabler-x"
              @update:model-value="fetchTasks"
            />
          </VCol>

          <!-- 👉 Select Media -->
          <VCol
            cols="12"
            sm="4"
          >
            <AppSelect
              v-model="selectedMedia"
              placeholder="Media"
              :items="mediaOptions"
              clearable
              clear-icon="tabler-x"
              @update:model-value="fetchTasks"
            />
          </VCol>

          <!-- 👉 Select Stock Status -->
          <VCol
            cols="12"
            sm="4"
          >
            <AppSelect
              v-model="selectedChecked"
              placeholder="Checked"
              :items="checkedOptions"
              clearable
              clear-icon="tabler-x"
              @update:model-value="fetchTasks"
            />
          </VCol>
        </VRow>
      </VCardText>

      <VDivider class="my-4" />

      <div class="d-flex flex-wrap gap-4 mx-5">
        <div class="d-flex align-center">
          <!-- 👉 Search  -->
          <AppTextField
            v-model="searchQuery"
            placeholder="Search Tasks"
            density="compact"
            style="inline-size: 200px;"
            class="me-3"
            @input="fetchTasks"
          />
        </div>

        <VSpacer />
        <div class="d-flex gap-4 flex-wrap align-center">
          <AppSelect
            v-model="itemsPerPage"
            :items="[5, 10, 20, 25, 50]"
          />
          <!-- 👉 Export button -->
          <VBtn
            variant="tonal"
            color="secondary"
            prepend-icon="tabler-upload"
          >
            Export
          </VBtn>

          <VBtn
            v-if="hasRole(2).value"
            color="primary"
            prepend-icon="tabler-plus"
            @click="() => { mode = 'add'; selectedTask = {}; isDrawerOpen = true }"
          >
            Add New Task
          </VBtn>
        </div>
      </div>

      <VDivider class="mt-4" />

      <!-- 👉 Datatable  -->
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :headers="headers"
        show-select
        :items="dataTasks"
        :items-length="totalTasks"
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <!-- TASK  -->
        <template #item.name="{ item }">
          <div class="d-flex align-center gap-x-2">
            <VAvatar
              size="30"
              variant="tonal"
              :color="resolveMedia(item.media)?.color"
              class="me-2"
              rounded
            >
              <VIcon
                :icon="resolveMedia(item.media)?.icon"
                size="18"
              />
            </VAvatar> 
           
            <div class="d-flex flex-column">
              <span class="text-body-1 font-weight-medium">{{ item.name.substring(0, 30) }}</span>
              <span class="text-sm text-disabled">{{ item.project_plan.theme }} @ {{ item.media }}</span>
            </div>
          </div>
        </template>

        <!-- CREATORS -->
        <template #item.students="{ item }">
          <div class="v-avatar-group me-2">
            <VAvatar
              v-for="student in getDistinctStudent(item.students).slice(0, 3)"
              :key="student.id"
              color="info"
              size="32"
            >
              <VImg
                v-if="student.image"
                cover
                :src="`/storage/${student.image}`"
              />
              <VImg
                v-else
                :src="avatar"
              />
              <VTooltip
                location="top"
                activator="parent"
              >
                {{ student.nickname }}
              </VTooltip>
            </VAvatar>
            <VAvatar
              v-if="getDistinctStudent(item.students).length > 3"
              color="secondary"
              size="32"
            >
              <span class="text-xs">+{{ getDistinctStudent(item.students).length - 3 }}</span>
            </VAvatar>
          </div>
        </template>

        <!-- STARS -->
        <template #item.rate="{ item }">
          <VRating
            v-model="item.rate"
            size="x-small"
            density="compact"
            half-increments
            :color="item.rate == 0 ? 'secondary' : 'warning'"
            readonly
          />
        </template>

        <!-- SEMESTER -->
        <template #item.semester="{ item }">
          {{ item.semester }}
        </template>

        <!-- ID -->
        <template #item.id="{ item }">
          <RouterLink
            :to="'/?search=' + item.id"
            target="_blank"
          >
            {{ item.id }}
          </RouterLink>
        </template>

        <!-- STATUS -->
        <template #item.status="{ item }">
          <VChip
            v-bind="resolveStatus(item.status)"
            density="default"
            label
          />
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <IconBtn
            :disabled="!hasRole(2).value"
            :color="hasRole(2).value ? 'primary' : 'secondary'"
            @click="editTask(item)"
          >
            <VIcon icon="tabler-edit" />
          </IconBtn>

          <IconBtn>
            <VIcon icon="tabler-dots-vertical" />
            <VMenu activator="parent">
              <VList>
                <VListItem
                  v-if="hasRoleOrTeacher(4, currentUser.value?.admin_teacher_id ?? 'X').value"
                  value="review"
                  prepend-icon="tabler-circle-check"
                  @click="reviewTask(item)"
                >
                  Review
                </VListItem>

                <VListItem
                  v-if="hasRole(4).value"
                  value="delete"
                  prepend-icon="tabler-trash"
                  @click="deleteTask(item.id)"
                >
                  Delete
                </VListItem>

                <VListItem
                  v-if="hasRole(2).value"
                  value="duplicate"
                  prepend-icon="tabler-copy"
                  @click="duplicateTask(item)"
                >
                  Duplicate
                </VListItem>
              </VList>
            </VMenu>
          </IconBtn>
        </template>

        <template #bottom>
          <VDivider />

          <div class="d-flex align-center justify-space-between flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-medium-emphasis mb-0">
              {{ paginationMeta({ page, itemsPerPage }, totalTasks) }}
            </p>

            <VPagination
              v-model="page"
              :length="Math.min(Math.ceil(totalTasks / itemsPerPage), 5)"
              :total-visible="$vuetify.display.xs ? 1 : Math.min(Math.ceil(totalTasks / itemsPerPage), 5)"
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
    
    <AddNewTaskDrawer
      v-model:is-drawer-open="isDrawerOpen"
      :mode="mode"
      :task-data="selectedTask"
      @task-data="addNewTask"
    />
  </div>
</template>

<style lang="scss" scoped>
.product-widget{
  border-block-end: 1px solid rgba(var(--v-theme-on-surface), var(--v-border-opacity));
  padding-block-end: 1rem;
}
</style>
