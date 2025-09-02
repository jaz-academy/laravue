<script setup>
import { properCase, rateColor, takePic } from '@/@core/utils/helpers'
import { paginationMeta } from '@api-utils/paginationMeta'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const props = defineProps({
  notAcceptedTasks: Array,
})

const notAcceptedData = computed(() => {
  return Object.values(props.notAcceptedTasks).map(task => {

    return {
      id: task?.id,
      title: task?.name || '',
      link: task?.link || '#',
      rate: task?.rate || 0,
      media: task?.media || '',
      date: formatDate(task?.date) || '',
      name: task?.students[0]?.name,
      image: task?.students[0]?.image || '',
      status: task?.status || '',
      progress: task?.rate ? task.rate * 20 : 0,
      color: rateColor(task?.rate),
    }
  })
})

const searchQuery = ref('')

// Data table options
const itemsPerPage = ref(5)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()

const updateOptions = options => {
  page.value = options.page
  sortBy.value = options.sortBy[0]?.key
  orderBy.value = options.sortBy[0]?.order
}

const headers = [
  {
    title: 'Title Task',
    key: 'name',
  },
  {
    title: 'Date',
    key: 'date',
  },
  {
    title: 'Stars',
    key: 'rate',
  },
  {
    title: 'Status',
    key: 'status',
  },
  {
    title: 'View',
    key: 'link',
    sortable: false,
  },
]

const filteredTasks = computed(() => {
  let data = [...notAcceptedData.value]

  // Search
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()

    data = data.filter(
      item =>
        item.title.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.status.toLowerCase().includes(q),
    )
  }

  // Sort
  if (sortBy.value) {
    data.sort((a, b) => {
      const aVal = a[sortBy.value]
      const bVal = b[sortBy.value]

      if (aVal === undefined) return 1
      if (bVal === undefined) return -1

      if (orderBy.value === 'desc') return aVal < bVal ? 1 : -1
      
      return aVal > bVal ? 1 : -1
    })
  }

  return data
})

const paginatedTasks = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  
  return filteredTasks.value.slice(start, end)
})
</script>

<template>
  <VCard>
    <VCardText>
      <div class="d-flex flex-wrap justify-space-between align-center gap-4">
        <h5 class="text-h5 font-weight-medium">
          Not Accepted Tasks
        </h5>
        <div>
          <AppTextField
            v-model="searchQuery"
            placeholder="Search"
            style=" max-inline-size: 200px;min-inline-size: 200px;"
          />
        </div>
      </div>
    </VCardText>

    <VDataTableServer
      v-model:items-per-page="itemsPerPage"
      v-model:page="page"
      :items-per-page-options="[5,10,20,-1]"
      :headers="headers"
      :items-length="filteredTasks.length"
      :items="paginatedTasks"
      show-select
      class="text-no-wrap"
      @update:options="updateOptions"
    >
      <!-- Course Name -->
      <template #item.name="{ item }">
        <div class="d-flex align-center gap-x-4 py-2">
          <div>
            <div class="text-base font-weight-medium mb-1">
              <RouterLink
                :to="{ name: 'academy-course-details' }"
                class="text-link"
              >
                {{ properCase(item.title).substring(0, 30) }}
              </RouterLink>
            </div>
            <div class="d-flex align-center">
              <VAvatar
                size="22"
                :image="takePic(item.image)"
              />
              <span class="text-base ms-2">
                {{ item.name }}
              </span>
            </div>
          </div>
        </div>
      </template>

      <template #item.date="{ item }">
        <span class="text-base text-high-emphasis font-weight-medium">
          {{ item.media }}
        </span>
        <div>
          {{ item.date }}
        </div>
      </template>

      <!-- rate -->
      <template #item.rate="{ item }">
        <div
          v-if="item.title"
          class="d-flex align-center gap-x-4 mb-2"
        >
          <VRating v-model="item.rate">
            <template #item="slotProps">
              <VIcon
                v-bind="slotProps"
                :size="25"
                :color="slotProps.isFilled ? rateColor(item.rate) : 'secondary'"
                class="me-3"
                :icon="slotProps.isFilled ? 'tabler-mood-smile-beam' : 'tabler-mood-sad'"
              />
            </template>
          </VRating>
        </div>
      </template>

      <!-- Status -->
      <template #item.link="{ item }">
        <div 
          v-if="item.title"
          class="d-flex justify-space-between gap-x-4"
        >
          <div>
            <a
              :href="`/?search=${item.id}`"
              target="_blank"
              rel="noopener noreferrer"
            >
              <VIcon
                icon="tabler-brand-zoom"
                :color="item.color"
                size="24"
                class="me-2"
              />
            </a>
          </div>
        </div>
      </template>

      <!-- Pagination -->
      <template #bottom>
        <VDivider />

        <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
          <p class="text-sm text-disabled mb-0">
            {{ paginationMeta({ page, itemsPerPage }, filteredTasks.length) }}
          </p>

          <VPagination
            v-model="page"
            :length="Math.ceil(filteredTasks.length / itemsPerPage)"
            :total-visible="$vuetify.display.xs ? 1 : Math.min(Math.ceil(filteredTasks.length / itemsPerPage), 5)"
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
</template>
