<script setup>
import { humanDate } from '@/@core/utils/helpers'
import { useApi } from '@/composables/useApi'
import { paginationMeta } from '@api-utils/paginationMeta'
import { onMounted } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const widgetData = ref([
  {
    title: 'In-Store Sales',
    value: '$5,345.43',
    icon: 'tabler-home',
    desc: '5k orders',
    change: 5.7,
  },
  {
    title: 'Website Sales',
    value: '$674,347.12',
    icon: 'tabler-device-laptop',
    desc: '21k orders',
    change: 12.4,
  },
  {
    title: 'Discount',
    value: '$14,235.12',
    icon: 'tabler-gift',
    desc: '6k orders',
  },
  {
    title: 'Affiliate',
    value: '$8,345.23',
    icon: 'tabler-wallet',
    desc: '150 orders',
    change: -3.5,
  },
])

const headers = [
  {
    title: 'Subject',
    key: 'subject',
  },
  {
    title: 'Semester',
    key: 'semester',
  },
  {
    title: 'Date',
    key: 'created_at',
  },
  {
    title: 'Data',
    key: 'count',
  },
  {
    title: 'Serial',
    key: 'serial',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

const subjects = ref([])
const years = ref([])

onMounted(async () => {
  const { data: subjectsData } = await useApi('/subjects')
  const { data: yearsData } = await useApi('/public/students/years')

  subjects.value = subjectsData.value.data || []
  years.value = yearsData.value || []
})

const selectedSubject = ref()
const selectedSemester = ref()
const selectedYear = ref()
const searchQuery = ref('')

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

const resolveSemester = semester => {
  if (semester === 1)
    return {
      color: 'error',
      icon: 'tabler-circle-number-1',
    }
  if (semester === 2)
    return {
      color: 'info',
      icon: 'tabler-circle-number-2',
    }
  if (semester === 3)
    return {
      color: 'primary',
      icon: 'tabler-circle-number-3',
    }
  if (semester === 4)
    return {
      color: 'success',
      icon: 'tabler-circle-number-4',
    }
  if (semester === 5)
    return {
      color: 'warning',
      icon: 'tabler-circle-number-5',
    }
  if (semester === 6)
    return {
      color: 'primary',
      icon: 'tabler-circle-number-6',
    }
}

const {
  data: scoresData,
} = await useApi(createUrl('/scores-distinct', {
  query: {
    q: searchQuery,
    year: selectedYear,
    semester: selectedSemester,
    subject: selectedSubject,
    page,
    itemsPerPage,
    sortBy,
    orderBy,
  },
}))

console.log('scoresData', scoresData)

const scores = computed(() => scoresData.value?.data || [])
const totalScores = computed(() => scoresData.value?.total || 0)
</script>

<template>
  <div>
    <!-- 👉 widgets -->
    <VCard class="mb-6 d-none">
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
                      :color="data.change > 0 ? 'success' : 'error'"
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

    <!-- 👉 scores -->
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
              v-model="selectedSubject"
              placeholder="Subject"
              :items="subjects"
              item-title="name"
              item-value="id"
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

          <!-- 👉 Select Year -->
          <VCol
            cols="12"
            sm="4"
          >
            <AppSelect
              v-model="selectedYear"
              placeholder="Period"
              :items="years"
              item-title="year"
              item-value="year"
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
            color="primary"
            prepend-icon="tabler-plus"
            @click="$router.push('/academy/assessment/scores/edit/new')"
          >
            New Inputs
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
        :items="scores"
        :items-length="totalScores"
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <!-- subject  -->
        <template #item.subject="{ item }">
          <div class="d-flex align-center gap-x-2">
            <VAvatar
              v-if="item.subject"
              size="38"
              variant="tonal"
              :color="resolveSemester(item.semester)?.color"
              rounded
            >
              <VIcon :icon="item.semester == '1' ? 'tabler-square-number-1' : item.semester == '2' ? 'tabler-square-number-2' : item.semester == '3' ? 'tabler-square-number-3' : item.semester == '4' ? 'tabler-square-number-4' : 'tabler-square-number-5'" />
            </VAvatar>
            <div class="d-flex flex-column">
              <span class="text-body-1 font-weight-medium">{{ item.subject }}</span>
              <span class="text-sm text-disabled">{{ item.teacher }}</span>
            </div>
          </div>
        </template>

        <!-- semester -->
        <template #item.semester="{ item }">
          <VAvatar
            size="30"
            variant="tonal"
            :color="resolveSemester(item.semester)?.color"
            class="me-2"
          >
            <VIcon
              :icon="resolveSemester(item.semester)?.icon"
              size="18"
            />
          </VAvatar>
          {{ item.year }}
        </template>

        <!-- date -->
        <template #item.created_at="{ item }">
          {{ humanDate(item.created_at) }}
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <IconBtn>
            <RouterLink :to="'/academy/assessment/scores/edit/' + item.serial">
              <VIcon icon="tabler-eye" />
            </RouterLink>
          </IconBtn>

          <IconBtn>
            <VIcon icon="tabler-dots-vertical" />
            <VMenu activator="parent">
              <VList>
                <VListItem
                  value="download"
                  prepend-icon="tabler-download"
                >
                  Download
                </VListItem>

                <VListItem
                  value="duplicate"
                  prepend-icon="tabler-copy"
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
              {{ paginationMeta({ page, itemsPerPage }, totalScores) }}
            </p>

            <VPagination
              v-model="page"
              :length="Math.min(Math.ceil(totalScores / itemsPerPage), 5)"
              :total-visible="$vuetify.display.xs ? 1 : Math.min(Math.ceil(totalScores / itemsPerPage), 5)"
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
  </div>
</template>

<style lang="scss" scoped>
.product-widget{
  border-block-end: 1px solid rgba(var(--v-theme-on-surface), var(--v-border-opacity));
  padding-block-end: 1rem;
}
</style>
