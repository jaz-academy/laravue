<script setup>
import { fetchStudents } from '@/composables/fetchStudentData'
import AddNewUserDrawer from '@/views/profile/student/list/AddNewUserDrawer.vue'
import { paginationMeta } from '@api-utils/paginationMeta'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

// 👉 Store
const searchQuery = ref('')
const selectedYear = ref()
const selectedCity = ref()
const selectedStatus = ref()

// Data table options
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()
const usersData = ref([])

const updateOptions = options => {
  page.value = options.page
  sortBy.value = options.sortBy[0]?.key
  orderBy.value = options.sortBy[0]?.order
}

const fetchUsers = async () => {
  try {
    const result = await fetchStudents({
      q: searchQuery,
      status: selectedStatus,
      city: selectedCity,
      year: selectedYear,
      itemsPerPage: itemsPerPage,
      page: page,
      sortBy: sortBy,
      orderBy: orderBy,
    })
    
    usersData.value = result
  } catch (error) {
    console.error('Error fetching students:', error.message)
  }
}

onMounted(() => {
  fetchUsers()
})

const users = computed(() => usersData.value?.users || [])
const totalStudents = computed(() => usersData.value?.totalUsers || 0)

console.log(users.value)

// Headers
const headers = [
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Year',
    key: 'year',
  },
  {
    title: 'City',
    key: 'city',
  },
  {
    title: 'Address',
    key: 'address',
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

// 👉 search filters
const distinctYear = [...new Set(users.value.map(student => student.registered))]

const years = distinctYear.map(year => ({
  title: year,
}))

const distinctCities = [...new Set(users.value.map(student => student.city))]

const cities = distinctCities.map(city => ({
  title: city,
  value: city.toLowerCase(),
}))

const distinctStatus = [...new Set(users.value.map(student => student.graduation))]

const status = []

distinctStatus.forEach(statusItem => {
  if (statusItem === null) {
    status.push({
      title: 'Active',
      value: null,
    })
  } else if (statusItem === 0) {
    status.push({
      title: 'Suspend',
      value: '-',
    })
  } else {
    status.push({
      title: statusItem,
      value: statusItem,
    })
  }
})

const resolveUserStatusVariant = stat => {
  if (!stat) return 'primary'
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === '-')
    return 'warning'
  if (statLowerCase === '')
    return 'success'
  if (statLowerCase > 2023)
    return 'secondary'
  
  return 'primary'
}

const isAddNewUserDrawerVisible = ref(false)

const addNewUser = async userData => {
  await $fake('/apps/users', {
    method: 'POST',
    body: userData,
  })

  // refetch User
  fetchUsers()
}

const deleteUser = async id => {
  await $fake(`/apps/users/${ id }`, { method: 'DELETE' })

  // refetch User
  fetchUsers()
}

const widgetData = ref([
  {
    title: 'Session',
    value: '21,459',
    change: 29,
    desc: 'Total Users',
    icon: 'tabler-user',
    iconColor: 'primary',
  },
  {
    title: 'Paid Users',
    value: '4,567',
    change: 18,
    desc: 'Last Week Analytics',
    icon: 'tabler-user-plus',
    iconColor: 'error',
  },
  {
    title: 'Active Users',
    value: '19,860',
    change: -14,
    desc: 'Last Week Analytics',
    icon: 'tabler-user-check',
    iconColor: 'success',
  },
  {
    title: 'Pending Users',
    value: '237',
    change: 42,
    desc: 'Last Week Analytics',
    icon: 'tabler-user-exclamation',
    iconColor: 'warning',
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
          <!-- 👉 Select Role -->
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
            />
          </VCol>
          <!-- 👉 Select City -->
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
            />
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
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
            prepend-icon="tabler-plus"
            @click="isAddNewUserDrawerVisible = true"
          >
            Add New User
          </VBtn>
        </div>
      </VCardText>

      <VDivider />

      <!-- SECTION datatable -->
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :items="users"
        :items-length="totalStudents"
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
              :color="!item.avatar ? 'primary' : undefined"
              class="me-3"
            >
              <VImg
                v-if="item.avatar"
                :src="item.avatar"
              />
              <span v-else>{{ avatarText(item.name) }}</span>
            </VAvatar>
            <div class="d-flex flex-column">
              <h6 class="text-base">
                <RouterLink
                  :to="{ name: 'profile-student-detail-tab', params: { tab: 'account' } }"
                  class="font-weight-medium text-link"
                >
                  {{ item.name }}
                </RouterLink>
              </h6>
              <span class="text-sm text-medium-emphasis">{{ item.email || item.nickname }}</span>
            </div>
          </div>
        </template>

        <!-- 👉 Year -->
        <template #item.year="{ item }">
          <div class="d-flex align-center gap-4">
            <span class="text-capitalize">{{ item.registered }}</span>
          </div>
        </template>

        <!-- City -->
        <template #item.city="{ item }">
          <span class="text-capitalize font-weight-medium">{{ item.city }}</span>
        </template>

        <!-- Address -->
        <template #item.address="{ item }">
          <span class="text-capitalize font-weight-medium">{{ item.address }}</span>
        </template>

        <!-- Status -->
        <template #item.status="{ item }">
          <VChip
            :color="resolveUserStatusVariant(item.graduation)"
            size="small"
            label
            class="text-capitalize"
          >
            {{ item.graduation || 'Active' }}
          </VChip>
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <IconBtn @click="deleteUser(item.id)">
            <VIcon icon="tabler-trash" />
          </IconBtn>

          <IconBtn>
            <VIcon icon="tabler-edit" />
          </IconBtn>

          <VBtn
            icon
            variant="text"
            size="small"
            color="medium-emphasis"
          >
            <VIcon
              size="24"
              icon="tabler-dots-vertical"
            />
            <VMenu activator="parent">
              <VList>
                <VListItem :to="{ name: 'profile-student-detail-tab', params: { tab: 'account' } }">
                  <template #prepend>
                    <VIcon icon="tabler-eye" />
                  </template>

                  <VListItemTitle>View</VListItemTitle>
                </VListItem>

                <VListItem link>
                  <template #prepend>
                    <VIcon icon="tabler-pencil" />
                  </template>
                  <VListItemTitle>Edit</VListItemTitle>
                </VListItem>

                <VListItem @click="deleteUser(item.id)">
                  <template #prepend>
                    <VIcon icon="tabler-trash" />
                  </template>
                  <VListItemTitle>Delete</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
        </template>

        <!-- pagination -->
        <template #bottom>
          <VDivider />
          <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-disabled mb-0">
              {{ paginationMeta({ page, itemsPerPage }, totalStudents) }}
            </p>

            <VPagination
              v-model="page"
              :length="Math.ceil(totalStudents / itemsPerPage)"
              :total-visible="$vuetify.display.xs ? 1 : Math.ceil(totalStudents / itemsPerPage)"
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
    <!-- 👉 Add New User -->
    <AddNewUserDrawer
      v-model:is-drawer-open="isAddNewUserDrawerVisible"
      @user-data="addNewUser"
    />
  </section>
</template>
