<script setup>
import { fetchTeacherData, fetchTeachers, teachers } from '@/composables/fetchTeacherData'
import AddNewTeacher from '@/views/profile/teacher/list/AddNewTeacher.vue'
import { paginationMeta } from '@api-utils/paginationMeta'
import { computed, onMounted, ref } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const currentUser = useCookie('userData').value

onMounted (() => {
  fetchTeacherData()
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
    key: 'status',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

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
    const result = await fetchTeachers(params)

    console.log('📦 FETCHING with:', params, result)

    usersData.value = result
  } catch (error) {
    console.error('Error fetching Teachers:', error.message)
  }
}

const users = computed(() => usersData.value?.users || [])
const totalUsers = computed(() => usersData.value?.totalUsers || 0)

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
    title: 'Active',
    value: 'active',
  },
  {
    title: 'On Duty',
    value: 'on_duty',
  },
  {
    title: 'Passive',
    value: 'passive',
  },
  {
    title: 'Suspend',
    value: 'suspend',
  },
]

// ✅ Dynamic: Count teachers by gender
const countTeacherByGender = gender => {
  return teachers.value.filter(teacher => {
    return (teacher.gender || '').toLowerCase() === gender.toLowerCase() &&
           teacher.status === "Active"
  }).length
}

// ✅ Dynamic: Percentage of teachers by gender
const countPercentageTeacherByGender = gender => {
  if (teachers.value.length === 0) return 0

  return ((countTeacherByGender(gender) / teachers.value.length) * 100).toFixed(0)
}

const suspendedCount = computed(() => {
  return teachers.value.filter(teacher => teacher.status === "Suspend").length
})

const countPercentageTeacherByStatus = angka => {
  if (teachers.value.length === 0) return 0

  return ((angka / teachers.value.length) * 100).toFixed(0)
}

const resolveUserStatusVariant = stat => {
  if (!stat) return 'primary' // default color kalau null/undefined
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'active') return 'primary'
  if (statLowerCase === 'passive') return 'warning'
  if (statLowerCase === 'on duty') return 'success'
  if (statLowerCase === 'suspend') return 'error'
  
  return 'primary'
}

const isAddNewTeacherVisible = ref(false)

const addNewTeacher = async userData => {
  console.log('Sending userData:', userData)
  try {
    const { data, response } = await useApi('/teachers', {
      method: 'POST',
      body: JSON.stringify(userData), // harus JSON
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })

    if (response.value.ok) {
      showAlert('Data berhasil ditambahkan', 'success')
      console.log('Teacher created:', data)
      fetchUsers()
    }else {
      showAlert(response.value.statusText || 'Gagal menambahkan data', 'error')
    }
    
  } catch (error) {
    console.error('Create Teacher error:', error?.data?.errors || error)
    showAlert(error.message || 'Gagal menambahkan data', 'error')
  }
}


const deleteTeacher = async id => {
  try {
    if (confirm('Apakah kamu yakin ingin menghapus data ini?')) {
      console.log('Deleting teacher with ID:', id)
      await useApi(`/teachers/${id}`, { method: 'DELETE' })
      showAlert('Data berhasil dihapus', 'success')
      fetchUsers() 
    }
  } catch (err) {
    showAlert(err.message || 'Gagal menghapus data', 'error')
    console.error(err)
  }
}

const widgetData = ref([
  {
    title: 'Male Active',
    value: countTeacherByGender('Laki-laki').toLocaleString(),
    change: countPercentageTeacherByGender('Laki-laki'),
    desc: 'Total Teachers',
    icon: 'tabler-user',
    iconColor: 'primary',
  },
  {
    title: 'Female Active',
    value: countTeacherByGender('Perempuan').toLocaleString(),
    change: countPercentageTeacherByGender('Perempuan'),
    desc: 'Total Teachers',
    icon: 'tabler-user',
    iconColor: 'warning',
  },
  {
    title: 'Suspended',
    value: suspendedCount.value,
    change: countPercentageTeacherByStatus(suspendedCount.value),
    desc: 'Suspended Teachers',
    icon: 'tabler-user-exclamation',
    iconColor: 'error',
  },
])
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
            md="4"
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
            v-if="currentUser?.role >= 4"
            prepend-icon="tabler-plus"
            @click="isAddNewTeacherVisible = true"
          >
            Add New Teacher
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
                  :to="{ name: 'profile-teacher-id-tab', params: { id: item.id, tab: 'account' } }"
                  class="font-weight-medium text-link"
                >
                  {{ item.name }}
                </RouterLink>
              </h6>
              <span class="text-sm text-medium-emphasis">{{ item.nig }} - {{ item.nickname }}</span>
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
        <template #item.status="{ item }">
          <VChip
            :color="resolveUserStatusVariant(
              item.status || ''
            )"
            size="small"
            label
            class="text-capitalize"
          >
            {{ item.status }}
          </VChip>
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <IconBtn
            v-if="currentUser?.role >= 4"
            @click="deleteTeacher(item.id)"
          >
            <VIcon icon="tabler-trash" />
          </IconBtn>

          <IconBtn 
            :to="currentUser.admin_teacher_id === item.id || currentUser?.role >= 4 ? { name: 'profile-teacher-id-tab', params: { id: item.id, tab: 'account' } } : undefined"
            :disabled="currentUser.admin_teacher_id !== item.id || currentUser?.role < 4"
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
    <!-- 👉 Add New Teacher -->
    <AddNewTeacher
      v-model:is-drawer-open="isAddNewTeacherVisible"
      @user-data="addNewTeacher"
    />
  </section>
</template>
