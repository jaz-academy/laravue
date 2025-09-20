<script setup>
import { useUserAccess } from '@/@core/utils/helpers'
import { useApi } from '@/composables/useApi'
import { paginationMeta } from '@api-utils/paginationMeta'
import { onMounted } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const { hasRoleAndAccess, currentUser } = useUserAccess()

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
    title: 'Invoice',
    key: 'invoice',
  },
  {
    title: 'Date',
    key: 'date',
  },
  {
    title: 'Period',
    key: 'period',
  },
  {
    title: 'Student',
    key: 'student',
  },
  {
    title: 'Item',
    key: 'total_items',
  },
  {
    title: 'Amount',
    key: 'total_amount',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

const dates = ref([])
const students = ref([])
const amounts = ref([])

const selectedDate = ref()
const selectedStudent = ref()
const selectedAmount = ref()
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

const fetchFilterOptions = async () => {
  // Idealnya, ini adalah endpoint terpisah di backend, e.g., /payments/filter-options
  // Untuk sementara, kita ambil dari data yang sudah ada jika memungkinkan,
  // atau lakukan panggilan terpisah jika diperlukan.
  const { data: paymentsForFilter } = await useApi('/payments')
  if (paymentsForFilter.value?.data) {
    const allPayments = paymentsForFilter.value.data

    dates.value = [...new Set(allPayments.map(f => f.date))].sort((a, b) => b.localeCompare(a))
    students.value = [...new Set(allPayments.map(f => f.admin_student.name))].sort((a, b) => a.localeCompare(b))
    amounts.value = [...new Set(allPayments.map(f => f.amount))].sort((a, b) => b - a)
  }
}

onMounted(fetchFilterOptions)

const {
  data: paymentsData,
} = await useApi(createUrl('/payments-distinct', {
  query: {
    q: searchQuery,
    date: selectedDate,
    student: selectedStudent,
    amount: selectedAmount,
    page,
    itemsPerPage,
    sortBy,
    orderBy,
  },
}))

console.log('paymentsData', paymentsData.value?.data)

const paymentsList = computed(() => paymentsData.value?.data || [])
const totalpayments = computed(() => paymentsData.value?.total || 0)
</script>

<template>
  <div>
    <!-- 👉 widgets -->
    <VCard class="mb-6 d-none">
      <VCardText>
        <VRow>
          <VCol
            v-for="(data, id) in widgetData"
            :key="id"
            cols="12"
            sm="6"
            md="3"
            class="px-6 position-relative"
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
                    {{ data.change }}%
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
            <VDivider
              v-if="($vuetify.display.mdAndUp && id < widgetData.length - 1) || ($vuetify.display.smOnly && id % 2 === 0)"
              vertical
              inset
              class="position-absolute"
              style=" block-size: 70%;inset-block-start: 50%; inset-inline-end: 0; transform: translateY(-50%);"
            />
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <!-- 👉 payment items -->
    <VCard
      title="Filters"
      class="mb-6"
    >
      <VCardText>
        <VRow>
          <!-- 👉 Select Date -->
          <VCol
            cols="12"
            sm="4"
          >
            <AppSelect
              v-model="selectedDate"
              placeholder="Date"
              :items="dates"
              clearable
              clear-icon="tabler-x"
            />
          </VCol>

          <!-- 👉 Select Student -->
          <VCol
            cols="12"
            sm="4"
          >
            <AppSelect
              v-model="selectedStudent"
              placeholder="Student"
              :items="students"
              item-title="name"
              item-value="id"
              clearable
              clear-icon="tabler-x"
            />
          </VCol>

          <!-- 👉 Select Amount -->
          <VCol
            cols="12"
            sm="4"
          >
            <AppSelect
              v-model="selectedAmount"
              placeholder="Amount"
              :items="amounts"
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
            v-if="hasRoleAndAccess(2, 'Payment').value"
            color="primary"
            prepend-icon="tabler-plus"
            @click="$router.push('/financial/payment/edit/new')"
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
        :items="paymentsList"
        :items-length="totalpayments"
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <!-- invoice  -->
        <template #item.invoice="{ item }">
          <div class="d-flex align-center gap-x-2">
            <VAvatar 
              v-if="item.invoice" 
              size="38"
              variant="tonal"
              :color="item.total_amount < 0 ? 'error' : 'info'"
              rounded
            >
              <VIcon icon="tabler-file-text" />
            </VAvatar>
            <div class="d-flex flex-column">
              <div class="text-body-1 font-weight-medium">
                {{ item.invoice }}
              </div>
              <span class="text-sm text-disabled">{{ item.billing }}</span>
            </div>
          </div>
        </template>

        <template #item.period="{ item }">
          <VChip
            v-if="hasRoleAndAccess(2, 'Payment').value"
            :to="`/financial/payment/recap/${item.admin_student_id}/${item.period}`"
            target="_blank"
            color="info"
            variant="tonal"
            size="small"
            label
          >
            {{ item.period }}
          </VChip>
          <VChip
            v-else
            color="info"
            variant="tonal"
            size="small"
            label
          >
            {{ item.period }}
          </VChip>
        </template>

        <template #item.total_amount="{ item }">
          <span :class="`text-${item.total_amount < 0 ? 'error' : 'info'}`">
            {{ Number(item.total_amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
          </span>
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <IconBtn>
            <RouterLink :to="'/financial/payment/preview/' + item.invoice">
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
              {{ paginationMeta({ page, itemsPerPage }, totalpayments) }}
            </p>

            <VPagination
              v-model="page"
              :length="Math.ceil(totalpayments / itemsPerPage)"
              :total-visible="$vuetify.display.xs ? 1 : Math.min(Math.ceil(totalpayments / itemsPerPage), 5)"
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
