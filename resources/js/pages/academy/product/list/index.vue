<script setup>
import { useUserAccess } from '@/@core/utils/helpers'
import { useApi } from '@/composables/useApi'
import AddCoursesDrawer from '@/views/academy/AddCourses.vue'
import { paginationMeta } from '@api-utils/paginationMeta'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const { hasRole, hasRoleAndAccess } = useUserAccess()

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

const allCourses = useApi('/courses')

const subject = ref('')
const name = ref('')
const section = ref('')

const subjectOptions = computed(() => {
  return [...new Set(allCourses.data.value.data.map(c => c.subject))].sort()
})

const nameOptions = computed(() => {
  return [...new Set(
    allCourses.data.value.data
      .filter(c => !subject.value || c.subject === subject.value)
      .map(c => c.name),
  )].sort()
})

const sectionOptions = computed(() => {
  return [...new Set(
    allCourses.data.value.data
      .filter(c => !name.value || c.name === name.value)
      .map(c => c.section),
  )].sort()
})

const searchQuery = ref('')
const page = ref(1)
const itemsPerPage = ref(10)

// Data table options
const sortBy = ref()
const orderBy = ref()

const updateOptions = options => {
  page.value = options.page
  sortBy.value = options.sortBy[0]?.key
  orderBy.value = options.sortBy[0]?.order
}

// Courses API filterable & sortable
const {
  data: coursesData,
  execute: fetchCourses,
} = await useApi(createUrl('/courses-custom', {
  query: {
    q: () => searchQuery.value,
    page: () => page.value,
    itemsPerPage: () => itemsPerPage.value,
    subject: () => subject.value,
    name: () => name.value,
    section: () => section.value,
    sortBy: sortBy.value || '',
    orderBy: orderBy.value || '',
  },
}))

console.log("coursesData:", coursesData)

// courses data table
const courses = computed(() => coursesData.value.data)
const totalCourses = computed(() => coursesData.value.count)

// switchable drawer modal input & edit
const isDrawerOpen = ref(false)
const mode = ref('add')
const selectedCourse = ref({})

const editCourse = Course => {
  selectedCourse.value = { ...Course }
  mode.value = 'edit'
  isDrawerOpen.value = true
}

const duplicateCourse = Course => {
  selectedCourse.value = { ...Course }
  mode.value = 'duplicate'
  isDrawerOpen.value = true
}

// Courses data table header
const headers = [
  {
    title: 'Course',
    key: 'title',
  },
  {
    title: 'Subject',
    key: 'subject',
  },
  {
    title: 'Author',
    key: 'author',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

const resolveSubject = subject => {
  if (subject === 'Tahfidzh')
    return {
      color: 'success',
      icon: 'tabler-book-2',
    }
  if (subject === 'Graphic Design')
    return {
      color: 'primary',
      icon: 'tabler-brand-adobe-illustrator',
    }
  if (subject === 'Video Editing')
    return {
      color: 'primary',
      icon: 'tabler-brand-adobe-premier',
    }
  if (subject === 'Python Programming')
    return {
      color: 'info',
      icon: 'tabler-brand-python',
    }
  if (subject === 'JavaScript Programming')
    return {
      color: 'info',
      icon: 'tabler-brand-react',
    }
  if (subject === 'Web Development')
    return {
      color: 'info',
      icon: 'tabler-device-imac',
    }
  if (subject === 'Mobile Development')
    return {
      color: 'info',
      icon: 'tabler-device-mobile',
    }
  if (subject === 'Google Workspace')
    return {
      color: 'warning',
      icon: 'tabler-brand-google',
    }
  if (subject === 'Game Development')
    return {
      color: 'info',
      icon: 'tabler-device-gamepad-2',
    }
  else
    return {
      color: 'secondary',
      icon: 'tabler-world',
    }
}

const addNewCourse = async ({ action, data }) => {
  if (!hasRoleAndAccess(2, 'Courses').value) {
    showAlert('You do not have permission to modify plans', 'error')
    
    return
  }

  const formData = new FormData()

  Object.keys(data).forEach(key => {
    if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key])
    }
  })

  let url = '/courses'
  let method = 'POST'

  if (action === 'update' && data.id) {
    url = `/courses/${data.id}`

    // Laravel tidak bisa handle PUT multipart langsung
    // jadi tetap pakai POST + spoof _method
    formData.append('_method', 'PUT')
  }

  try {
    const { data: resData, response } = await useApi(url, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    })

    if (response.value.ok) {
      const msg = action === 'create'
        ? 'Data berhasil ditambahkan'
        : 'Data berhasil diperbarui'

      showAlert(msg, 'success')
      fetchCourses()
    } else {
      showAlert(response.value.statusText || 'Gagal menyimpan data', 'error')
    }
  } catch (error) {
    console.error('Course save error:', error?.data?.errors || error)
    showAlert(error.message || 'Gagal menyimpan data', 'error')
  }
}


const deleteCourse = async id => {
  try {
    if (confirm('Apakah kamu yakin ingin menghapus data ini?')) {
      console.log('Deleting Course with ID:', id)
      await useApi(`/courses/${id}`, { method: 'DELETE' })
      showAlert('Data berhasil dihapus', 'success')
      fetchCourses()
    }
  } catch (err) {
    showAlert(err.message || 'Gagal menghapus data', 'error')
    console.error(err)
  }
}
</script>

<template>
  <div>
    <!-- 👉 alert -->
    <VAlert
      v-model="isAlertVisible"
      closable
      close-label="Close Alert"
      class="mb-6"
      :color="alertColor"
    >
      {{ alertMessage }}
    </VAlert>

    <!-- 👉 Courses -->
    <VCard
      title="Filters"
      class="mb-6"
    >
      <VCardText>
        <VRow>
          <!-- 👉 Select Subject -->
          <VCol
            cols="12"
            sm="4"
          >
            <AppSelect
              v-model="subject"
              placeholder="Subject"
              :items="subjectOptions"
              clearable
              clear-icon="tabler-x"
            />
          </VCol>

          <!-- 👉 Select Course Name -->
          <VCol
            cols="12"
            sm="4"
          >
            <AppSelect
              v-model="name"
              placeholder="Name"
              :items="nameOptions"
              clearable
              clear-icon="tabler-x"
            />
          </VCol>

          <!-- 👉 Select Section -->
          <VCol
            cols="12"
            sm="4"
          >
            <AppSelect
              v-model="section"
              placeholder="Section"
              :items="sectionOptions"
              clearable
              clear-icon="tabler-x"
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
            placeholder="Search Course"
            density="compact"
            style="inline-size: 200px;"
            class="me-3"
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
            v-if="hasRoleAndAccess(2, 'Courses').value"
            color="primary"
            prepend-icon="tabler-plus"
            @click="() => { mode = 'add'; selectedCourse = {}; isDrawerOpen = true }"
          >
            Add Course
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
        :items="courses"
        :items-length="totalCourses"
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <!-- title  -->
        <template #item.title="{ item }">
          <div class="d-flex align-center gap-x-2">
            <div class="d-flex flex-column">
              <span class="text-body-1 font-weight-medium">{{ item.title }}</span>
              <span class="text-sm text-disabled"><span class="text-primary">{{ item.name }} : </span> {{ item.section }}</span>
            </div>
          </div>
        </template>

        <!-- Subject -->
        <template #item.subject="{ item }">
          <VAvatar
            size="30"
            variant="tonal"
            :color="resolveSubject(item.subject).color"
            class="me-2"
          >
            <VIcon
              :icon="resolveSubject(item.subject).icon"
              size="18"
            />
          </VAvatar>
          <span class="text-body-1 font-weight-medium">{{ item.subject }}</span>
        </template>

        <!-- author -->
        <template #item.author="{ item }">
          {{ item.author }}
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <IconBtn 
            :disabled="!hasRoleAndAccess(3, 'Courses').value"
            :color="hasRoleAndAccess(3, 'Courses').value ? 'primary' : 'secondary'"
            @click="editCourse(item)"
          >
            <VIcon icon="tabler-edit" />
          </IconBtn>

          <IconBtn :disabled="!hasRoleAndAccess(2, 'Courses').value">
            <VIcon icon="tabler-dots-vertical" />
            <VMenu activator="parent">
              <VList>
                <VListItem
                  v-if="hasRole(4).value"
                  value="delete"
                  prepend-icon="tabler-trash"
                  @click="deleteCourse(item.id)"
                >
                  Delete
                </VListItem>

                <VListItem
                  v-if="hasRoleAndAccess(2, 'Courses').value"
                  value="duplicate"
                  prepend-icon="tabler-copy"
                  @click="duplicateCourse(item)"
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
              {{ paginationMeta({ page, itemsPerPage }, totalCourses) }}
            </p>

            <VPagination
              v-model="page"
              :length="Math.min(Math.ceil(totalCourses / itemsPerPage), 5)"
              :total-visible="$vuetify.display.xs ? 1 : Math.min(Math.ceil(totalCourses / itemsPerPage), 5)"
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
    
    <AddCoursesDrawer
      v-model:is-drawer-open="isDrawerOpen"
      :mode="mode"
      :course-data="selectedCourse"
      @course-data="addNewCourse"
    />
  </div>
</template>

<style lang="scss" scoped>
.product-widget{
  border-block-end: 1px solid rgba(var(--v-theme-on-surface), var(--v-border-opacity));
  padding-block-end: 1rem;
}
</style>
