<script setup>
import { useApi } from '@/composables/useApi'
import AddAwardsDrawer from '@/views/academy/AddAwards.vue'
import { paginationMeta } from '@api-utils/paginationMeta'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const { currentUser, hasRole, hasRoleAndAccess } = useUserAccess()

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
const selectedAward = ref({})

const editAward = award => {
  selectedAward.value = { ...award }
  mode.value = 'edit'
  isDrawerOpen.value = true
}

const duplicateAward = award => {
  selectedAward.value = { ...award }
  mode.value = 'duplicate'
  isDrawerOpen.value = true
}

// Awards data table header
const headers = [
  {
    title: 'Awards',
    key: 'item',
  },
  {
    title: 'Subject',
    key: 'academy_subject.name',
  },
  {
    title: 'Mentor',
    key: 'admin_teacher.nickname',
  },
  {
    title: 'Date',
    key: 'date',
  },
  {
    title: 'SMT',
    key: 'semester',
  },
  {
    title: 'Result',
    key: 'result',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

// Awards API filterable & sortable
const selectedStudentId = ref()
const selectedSubjectId = ref()
const selectedSemester = ref()
const searchQuery = ref('')

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
      icon: 'tabler-award',
    }
}

// Award result resolver
const resolveResult = rate => {
  if (rate == 5.0)
    return {
      text: 'Excellent',
      color: 'success',
    }
  if (rate >= 4.0)
    return {
      text: 'Very Good',
      color: 'primary',
    }
  if (rate >= 3.0)
    return {
      text: 'Good',
      color: 'warning',
    }
  if (rate >= 2.0)
    return {
      text: 'Not Bad',
      color: 'error',
    }
  if (rate >= 1.0)
    return {
      text: 'Not Good',
      color: 'error',
    }
}

// Data table options
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()

const updateOptions = options => {
  page.value = options.page
  sortBy.value = options.sortBy[0]?.key
  orderBy.value = options.sortBy[0]?.order
}

// Fetch all awards data
const allAwards = await useApi('/awards')

// data option select student
const studentOptions = computed(() => {
  const studentsMap = new Map()

  allAwards.data.value.data?.forEach(award => {
    const student = award.admin_student
    if (student && student.id && student.name) {
      studentsMap.set(student.id, student.name)
    }
  })
  
  return Array.from(studentsMap, ([id, name]) => ({ title: name, value: id }))
})

// data option select subject
const subjectOptions = computed(() => {
  const subjectsMap = new Map()

  allAwards.data.value.data?.forEach(award => {
    const subject = award.academy_subject
    if (subject && subject.id && subject.name) {
      subjectsMap.set(subject.id, subject.name)
    }
  })

  return Array.from(subjectsMap, ([id, name]) => ({ title: name, value: id }))
})

// widget data
const countByRate = (minRate, maxRate) => {
  return allAwards.data.value.data?.filter(a => a.rate >= minRate && a.rate <= maxRate).length ?? 0
}

const percentByRate = (minRate, maxRate) => {
  return allAwards.data.value.data && allAwards.data.value.data.length
    ? ((countByRate(minRate, maxRate) / allAwards.data.value.data.length) * 100).toFixed(1)
    : 0
}
 
const widgetData = ref([
  {
    title: 'Excellences',
    value: countByRate(5.0, 5.0),
    icon: 'tabler-award',
    desc: 'Persons',
    change: percentByRate(5.0, 5.0),
  },
  {
    title: 'Very Good',
    value: countByRate(4.0, 4.9),
    icon: 'tabler-heart',
    desc: 'Persons',
    change: percentByRate(4.0, 4.9),
  },
  {
    title: 'Good',
    value: countByRate(3.0, 3.9),
    icon: 'tabler-mood-smile',
    desc: 'Persons',
    change: percentByRate(3.0, 3.9),
  },
  {
    title: 'Need Improvement',
    value: countByRate(0.0, 2.9),
    icon: 'tabler-flame',
    desc: 'Persons',
    change: percentByRate(0.0, 2.9),
  },
])

// Awards API filterable & sortable
const {
  data: awardsData,
  execute: fetchAwards,
} = await useApi(createUrl('/awards-custom', {
  query: {
    q: searchQuery,
    adminStudentId: selectedStudentId,
    academySubjectId: selectedSubjectId,
    semester: selectedSemester,
    page,
    itemsPerPage,
    sortBy,
    orderBy,
  },
}))

// awards data table
const awards = computed(() => awardsData.value.data)
const totalAwards = computed(() => awardsData.value.count)

// menambah award baru
const addNewAward = async ({ action, data }) => {
  const sanitizedData = {
    ...data,
    rate: data.rate === '' ? 0 : Number(data.rate),
    admin_student_id: data.admin_student_id === '' ? null : Number(data.admin_student_id),
    academy_subject_id: data.academy_subject_id === '' ? null : Number(data.academy_subject_id),
    admin_teacher_id: data.admin_teacher_id === '' ? null : Number(data.admin_teacher_id),
  }

  console.log('Sending awardData:', sanitizedData, 'action:', action)
  try {
    let url = '/awards'
    let method = 'POST'
    if (action === 'update' && data.id) {
      url = `/awards/${data.id}`
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
      console.log('Award response:', resData)
      fetchAwards()
    } else {
      showAlert(response.value.statusText || 'Gagal menyimpan data', 'error')
    }
  } catch (error) {
    console.error('Award save error:', error?.data?.errors || error)
    showAlert(error.message || 'Gagal menyimpan data', 'error')
  }
}

const deleteAward = async id => {
  try {
    if (confirm('Apakah kamu yakin ingin menghapus data ini?')) {
      console.log('Deleting award with ID:', id)
      await useApi(`/awards/${id}`, { method: 'DELETE' })
      showAlert('Data berhasil dihapus', 'success')
      fetchAwards()
    }
  } catch (err) {
    showAlert(err.message || 'Gagal menghapus data', 'error')
    console.error(err)
  }
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
                      :color="data.change > 40 ? 'success' : 'error'"
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

    <!-- 👉 awards -->
    <VCard
      title="Filters"
      class="mb-6"
    >
      <VCardText>
        <VRow>
          <!-- 👉 Select Student -->
          <VCol
            cols="12"
            sm="4"
          >
            <AppSelect
              v-model="selectedStudentId"
              placeholder="Student"
              :items="studentOptions"
              clearable
              clear-icon="tabler-x"
            />
          </VCol>

          <!-- 👉 Select Subject -->
          <VCol
            cols="12"
            sm="4"
          >
            <AppSelect
              v-model="selectedSubjectId"
              placeholder="Subject"
              :items="subjectOptions"
              clearable
              clear-icon="tabler-x"
            />
          </VCol>

          <!-- 👉 Select Semester -->
          <VCol
            cols="12"
            sm="4"
          >
            <AppSelect
              v-model="selectedSemester"
              placeholder="Semester"
              :items="[1, 2, 3, 4, 5, 6]"
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
            placeholder="Search Product"
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
            v-if="hasRoleAndAccess(2, 'Awards').value"
            color="primary"
            prepend-icon="tabler-plus"
            @click="() => { mode = 'add'; selectedAward = {}; isDrawerOpen = true }"
          >
            Add Academy Award
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
        :items="awards"
        :items-length="totalAwards"
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <!-- subject  -->
        <template #item.item="{ item }">
          <div class="d-flex align-center gap-x-2">
            <VAvatar
              v-if="item.image"
              size="38"
              variant="tonal"
              rounded
              :image="item.image"
            />
            <div class="d-flex flex-column">
              <span class="text-body-1 font-weight-medium">{{ item.item }}</span>
              <span class="text-sm text-disabled">{{ item.admin_student.name }}</span>
            </div>
          </div>
        </template>

        <!-- Subject -->
        <template #item.academy_subject.name="{ item }">
          <VAvatar
            size="30"
            variant="tonal"
            :color="resolveSubject(item.academy_subject.name).color"
            class="me-2"
          >
            <VIcon
              :icon="resolveSubject(item.academy_subject.name).icon"
              size="18"
            />
          </VAvatar>
          <span class="text-body-1 font-weight-medium">{{ item.academy_subject.name }}</span>
        </template>

        <!-- mentor -->
        <template #item.admin_teacher.name="{ item }">
          {{ item.admin_teacher.name }}
        </template>

        <!-- result -->
        <template #item.result="{ item }">
          <VChip
            v-bind="resolveResult(item.rate)"
            density="default"
            label
          >
            {{ item.result }}
          </VChip>
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <IconBtn
            color="primary"
            @click="editAward(item)"
          >
            <VIcon :icon="hasRoleAndAccess(3, 'Awards').value ? 'tabler-edit' : 'tabler-eye'" />
          </IconBtn>

          <IconBtn :disabled="!hasRoleAndAccess(3, 'Awards').value">
            <VIcon icon="tabler-dots-vertical" />
            <VMenu activator="parent">
              <VList>
                <VListItem
                  v-if="hasRole(4).value"
                  value="delete"
                  prepend-icon="tabler-trash"
                  @click="deleteAward(item.id)"
                >
                  Delete
                </VListItem>

                <VListItem
                  v-if="hasRoleAndAccess(2, 'Awards').value"
                  value="duplicate"
                  prepend-icon="tabler-copy"
                  @click="duplicateAward(item)"
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
              {{ paginationMeta({ page, itemsPerPage }, totalAwards) }}
            </p>

            <VPagination
              v-model="page"
              :length="Math.min(Math.ceil(totalAwards / itemsPerPage), 5)"
              :total-visible="$vuetify.display.xs ? 1 : Math.min(Math.ceil(totalAwards / itemsPerPage), 5)"
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
    
    <AddAwardsDrawer
      v-model:is-drawer-open="isDrawerOpen"
      :mode="mode"
      :award-data="selectedAward"
      @award-data="addNewAward"
    />
  </div>
</template>

<style lang="scss" scoped>
.product-widget{
  border-block-end: 1px solid rgba(var(--v-theme-on-surface), var(--v-border-opacity));
  padding-block-end: 1rem;
}
</style>
