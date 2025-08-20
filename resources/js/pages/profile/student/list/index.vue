<script setup>
import { useUserAccess } from '@/@core/utils/helpers'
import { fetchStudentData, fetchStudents, students } from '@/composables/fetchStudentData'
import AddNewStudent from '@/views/profile/student/list/AddNewStudent.vue'
import { paginationMeta } from '@api-utils/paginationMeta'
import { computed, onMounted, ref } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const { hasRoleOrStudent, hasRoleAndAccess, hasRole } = useUserAccess()

onMounted (() => {
  fetchStudentData()
})

// 👉 Store
const searchQuery = ref('')
const selectedYear = ref('')
const selectedCity = ref('')
const selectedStatus = ref('')

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
  selectedStatus.value = options.status || ''
  selectedCity.value = options.city || ''
  selectedYear.value = options.year || ''

  if (options.sortBy?.length) {
    sortBy.value = options.sortBy[0].key
    orderBy.value = options.sortBy[0].order
  } else {
    sortBy.value = null
    orderBy.value = null
  }

  fetchUsers()
}

// Headers
const headers = [
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Year',
    key: 'registered',
  },
  {
    title: 'City',
    key: 'city',
  },
  {
    title: 'Status',
    key: 'graduation',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

// panggil data siswa
const fetchUsers = async () => {
  const params = {
    q: searchQuery.value || '',
    status: selectedStatus.value || '',
    city: selectedCity.value || '',
    year: selectedYear.value || '',
    itemsPerPage: itemsPerPage.value,
    page: page.value,
    sortBy: sortBy.value || '',
    orderBy: orderBy.value || '',
  }
  
  try {
    const result = await fetchStudents(params)

    console.log('📦 FETCHING with:', params, result)

    usersData.value = result
  } catch (error) {
    console.error('Error fetching students:', error.message)
  }
}

// data untuk tabel
const users = computed(() => usersData.value?.users || [])
const totalUsers = computed(() => usersData.value?.totalUsers || 0)

// data option select
const years = computed(() => {
  const userYears = usersData.value?.users?.map(user => user.registered) || []
  const uniqueYears = [...new Set(userYears.filter(year => typeof year === 'number'))]
  
  return uniqueYears.map(year => ({ title: String(year), value: String(year) }))
})

const cities = computed(() => {
  const userCities = usersData.value?.users?.map(user => user.city) || []
  const uniqueCities = [...new Set(userCities.filter(Boolean))]
  
  return uniqueCities.map(city => ({ title: city, value: city }))
})

const status = [
  {
    title: 'Graduated',
    value: 'graduated',
  },
  {
    title: 'Active',
    value: 'active',
  },
  {
    title: 'Inactive',
    value: 'inactive',
  },
]

// ✅ Dynamic: Count students by gender
const countStudentByGender = gender => {
  return students.value.filter(student => {
    return (student.gender || '').toLowerCase() === gender.toLowerCase() &&
           student.graduation === null
  }).length
}

// ✅ Dynamic: Percentage of students by gender
const countPercentageStudentByGender = gender => {
  if (students.value.length === 0) return 0
  
  return ((countStudentByGender(gender) / students.value.length) * 100).toFixed(0)
}

// ✅ Dynamic: Percentage of students by graduation
const graduatedCount = computed(() => {
  return students.value.filter(student => {
    const grad = student.graduation || ''
    
    return String(grad).startsWith('2')
  }).length
})

// ✅ Dynamic: Count suspended students
const suspendedCount = computed(() => {
  return students.value.filter(student => student.graduation === 0).length
})

// ✅ Dynamic: Percentage of students by graduation
const countPercentageStudentByGraduated = angka => {
  if (students.value.length === 0) return 0

  return ((angka / students.value.length) * 100).toFixed(0)
}

// data untuk widget
const widgetData = ref([
  {
    title: 'Male Active',
    value: countStudentByGender('Laki-laki').toLocaleString(),
    change: countPercentageStudentByGender('Laki-laki'),
    desc: 'Total Students',
    icon: 'tabler-user',
    iconColor: 'primary',
  },
  {
    title: 'Female Active',
    value: countStudentByGender('Perempuan').toLocaleString(),
    change: countPercentageStudentByGender('Perempuan'),
    desc: 'Total Students',
    icon: 'tabler-user',
    iconColor: 'warning',
  },
  {
    title: 'Graduated',
    value: graduatedCount.value,
    change: countPercentageStudentByGraduated(graduatedCount.value),
    desc: 'Graduated Students',
    icon: 'tabler-user-check',
    iconColor: 'success',
  },
  {
    title: 'Suspended',
    value: suspendedCount.value,
    change: countPercentageStudentByGraduated(suspendedCount.value),
    desc: 'Suspended Students',
    icon: 'tabler-user-exclamation',
    iconColor: 'error',
  },
])

// Resolusi status pengguna
const resolveUserStatusVariant = stat => {
  if (!stat) return 'primary' // default color kalau null/undefined
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'active') return 'primary'
  if (statLowerCase === 'graduated') return 'success'
  if (statLowerCase === 'inactive') return 'warning'
  
  return 'primary'
}

const isAddNewStudentVisible = ref(false)

// create new student
const addNewStudent = async userData => {
  console.log('Sending userData:', userData)
  try {
    const { data, response } = await useApi('/students', {
      method: 'POST',
      body: JSON.stringify(userData), // harus JSON
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })

    if (response.value.ok) {
      showAlert('Data berhasil ditambahkan', 'success')
      console.log('Student created:', data)
      fetchUsers()
    }else {
      showAlert(response.value.statusText || 'Gagal menambahkan data', 'error')
    }
    
  } catch (error) {
    console.error('Create student error:', error?.data?.errors || error)
    showAlert(error.message || 'Gagal menambahkan data', 'error')
  }
}

// destroy data siswa
const deleteStudent = async id => {
  try {
    if (confirm('Apakah kamu yakin ingin menghapus data ini?')) {
      console.log('Deleting student with ID:', id)
      await useApi(`/students/${id}`, { method: 'DELETE' })
      showAlert('Data berhasil dihapus', 'success')
      fetchUsers() 
    }
  } catch (err) {
    showAlert(err.message || 'Gagal menghapus data', 'error')
    console.error(err)
  }
}
</script>

<template>
  <section>
    <!-- 👉 Widgets -->
    <div class="d-flex mb-6">
      <VRow>
        <template
          v-for="(data, id) in widgetData"
          :key="id"
        >
          <VCol
            cols="12"
            md="3"
            sm="6"
          >
            <VCard>
              <VCardText>
                <div class="d-flex justify-space-between">
                  <div class="d-flex flex-column gap-y-1">
                    <span class="text-body-1 text-medium-emphasis">{{ data.title }}</span>
                    <div>
                      <h4 class="text-h4">
                        {{ data.value }}
                        <span
                          class="text-base "
                          :class="data.change > 0 ? 'text-success' : 'text-error'"
                        >({{ prefixWithPlus(data.change) }}%)</span>
                      </h4>
                    </div>
                    <span class="text-sm">{{ data.desc }}</span>
                  </div>
                  <VAvatar
                    :color="data.iconColor"
                    variant="tonal"
                    rounded
                    size="38"
                  >
                    <VIcon
                      :icon="data.icon"
                      size="26"
                    />
                  </VAvatar>
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </template>
      </VRow>
    </div>

    <VCard
      title="Filters"
      class="mb-6"
    >
      <VCardText>
        <VRow>
          <!-- 👉 Select Year -->
          <VCol
            cols="12"
            sm="4"
          >
            <AppSelect
              v-model="selectedYear"
              label="Select Year"
              placeholder="Select Year"
              :items="years"
              clearable
              clear-icon="tabler-x"
              @update:model-value="fetchUsers"
            />
          </VCol>
          <!-- 👉 Select Plan -->
          <VCol
            cols="12"
            sm="4"
          >
            <AppSelect
              v-model="selectedCity"
              label="Select City"
              placeholder="Select City"
              :items="cities"
              clearable
              clear-icon="tabler-x"
              @update:model-value="fetchUsers"
            />
          </VCol>
          <!-- 👉 Select Status -->
          <VCol
            cols="12"
            sm="4"
          >
            <AppSelect
              v-model="selectedStatus"
              label="Select Status"
              placeholder="Select Status"
              :items="status"
              clearable
              clear-icon="tabler-x"
              @update:model-value="fetchUsers"
            />
          </VCol>
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

    <VCard>
      <VCardText class="d-flex flex-wrap py-4 gap-4">
        <div class="me-3 d-flex gap-3">
          <AppSelect
            :model-value="itemsPerPage"
            :items="[
              { value: 10, title: '10' },
              { value: 25, title: '25' },
              { value: 50, title: '50' },
              { value: 100, title: '100' },
              { value: -1, title: 'All' },
            ]"
            style="inline-size: 6.25rem;"
            @update:model-value="itemsPerPage = parseInt($event, 10)"
          />
        </div>
        <VSpacer />

        <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
          <!-- 👉 Search  -->
          <div style="inline-size: 10rem;">
            <AppTextField
              v-model="searchQuery"
              placeholder="Search"
              density="compact"
              @input="fetchUsers"
            />
          </div>

          <!-- 👉 Export button -->
          <VBtn
            variant="tonal"
            color="secondary"
            prepend-icon="tabler-screen-share"
          >
            Export
          </VBtn>

          <!-- 👉 Add user button -->
          <VBtn
            v-if="hasRoleAndAccess(2, 'Profile').value"
            prepend-icon="tabler-plus"
            @click="isAddNewStudentVisible = true"
          >
            Add New Student
          </VBtn>
        </div>
      </VCardText>

      <VDivider />

      <!-- SECTION datatable -->
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :items="users"
        :items-length="totalUsers"
        :headers="headers"
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <!-- Name -->
        <template #item.name="{ item }">
          <div class="d-flex align-center">
            <VAvatar
              size="34"
              :variant="!item.avatar ? 'tonal' : undefined"
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
              <h6 class="text-base">
                <RouterLink
                  :to="{ name: 'profile-student-id-tab', params: { id: item.id, tab: 'account' } }"
                  class="font-weight-medium text-link"
                >
                  {{ item.name }}
                </RouterLink>
              </h6>
              <span class="text-sm text-medium-emphasis">{{ item.nis }} - {{ item.nickname }}</span>
            </div>
          </div>
        </template>

        <!-- 👉 Year -->
        <template #item.registered="{ item }">
          <div class="d-flex align-center gap-4">
            <span class="text-capitalize">{{ item.registered }}</span>
          </div>
        </template>

        <!-- City -->
        <template #item.city="{ item }">
          <span class="text-capitalize font-weight-medium">{{ item.city }}</span>
        </template>

        <!-- Status -->
        <template #item.graduation="{ item }">
          <VChip
            :color="resolveUserStatusVariant(
              item.graduation === null ? 'active' : (item.graduation === 0 ? 'inactive' : 'graduated')
            )"
            size="small"
            label
            class="text-capitalize"
          >
            {{ item.graduation === null ? 'Active' : (item.graduation === 0 ? 'Inactive' : 'Graduated') }}
          </VChip>
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <IconBtn
            :disabled="!hasRoleAndAccess(4, 'Profile').value"
            :color="hasRoleAndAccess(4, 'Profile').value ? 'error' : 'secondary'"
            @click="deleteStudent(item.id)"
          >
            <VIcon icon="tabler-trash" />
          </IconBtn>

          <IconBtn
            :to="{ name: 'profile-student-id-tab', params: { id: item.id, tab: 'account' } }"
            :color="hasRole(2).value && hasRoleOrStudent(4, item.id).value ? 'primary' : 'secondary'"
            :disabled="!hasRole(2).value || !hasRoleOrStudent(4, item.id).value"
          >
            <VIcon icon="tabler-edit" />
          </IconBtn>
        </template>

        <!-- pagination -->
        <template #bottom>
          <VDivider />
          <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-disabled mb-0">
              {{ paginationMeta({ page, itemsPerPage }, totalUsers) }}
            </p>

            <VPagination
              v-model="page"
              :length="Math.ceil(totalUsers / itemsPerPage)"
              :total-visible="$vuetify.display.xs ? 1 : Math.ceil(totalUsers / itemsPerPage)"
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
      <!-- SECTION -->
    </VCard>
    <!-- 👉 Add New Student -->
    <AddNewStudent
      v-model:is-drawer-open="isAddNewStudentVisible"
      @user-data="addNewStudent"
    />
  </section>
</template>
