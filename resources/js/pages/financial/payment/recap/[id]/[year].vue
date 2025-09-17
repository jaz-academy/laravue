<script setup>
import { periode } from '@/@core/utils/helpers'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

const route = useRoute('financial-payment-recap-id-year')
const periodYear = route.params.year === 'last' || !route.params.year ? periode(new Date()) : Number(route.params.year)
const studentId = Number(route.params.id)

// 1. Fetch student data first to get the payment category
const { data: studentResult } = await useApi(`/students/${studentId}`)
const student = computed(() => studentResult.value?.data)

// 2. Get payment category from student data, with a fallback
const studentCategory = student.value?.payment_category ?? 'Regular'
const studentRegistered = student.value?.registered ?? 0

// 3. Fetch the rest of the data in parallel
const [{ data: billingsData }, { data: discountsData }, { data: paymentsData }, { data: schoolResult }] = await Promise.all([
  useApi(`/billings-by-year/${studentRegistered}/${studentCategory}`),
  useApi(`/discounts-by-year/${periodYear}/${studentId}`),
  useApi(`/payments-by-student/${studentId}`),
  useApi('/schools'),
])

const billings = computed(() => billingsData.value?.data)
const discounts = computed(() => discountsData.value?.data)
const payments = computed(() => paymentsData.value?.data)
const school = computed(() => schoolResult.value?.data)

console.log('billings', billings.value)
console.log('discounts', discounts.value)
console.log('payments', payments.value)
console.log('student', student.value) // Now student.value will have data
console.log('school', school.value)

const months = [
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
]

const paymentRecap = computed(() => {
  if (!billings.value || !discounts.value || !payments.value) return []

  return billings.value.flatMap(bill => {
    if (bill.is_monthly) {
      return months.map((m, i) => {
        const year = i < 6 ? periodYear : periodYear + 1
        const billing = `${bill.name} ${m}-${year}`

        const discount = discounts.value
          .filter(d => d.billing === billing)
          .reduce((sum, d) => sum + d.amount, 0)

        const paid = payments.value
          .filter(p => p.billing === billing)
          .reduce((sum, p) => sum + p.amount, 0)

        return {
          description: billing,
          billed: bill.amount,
          discount,
          paid,
          remain: bill.amount - paid - discount,
          month: i + 1,
        }
      })
    }

    if (bill.is_once) {
      const billing = `${bill.name} ${bill.year}`

      const discount = discounts.value
        .filter(d => d.billing === billing)
        .reduce((sum, d) => sum + d.amount, 0)

      const paid = payments.value
        .filter(p => p.billing === billing)
        .reduce((sum, p) => sum + p.amount, 0)
      
      return {
        description: billing,
        billed: bill.amount,
        discount,
        paid,
        remain: bill.amount - paid - discount,
      }
    }

    const billing = `${bill.name} ${periodYear}`

    const discount = discounts.value
      .filter(d => d.billing === billing)
      .reduce((sum, d) => sum + d.amount, 0)

    const paid = payments.value
      .filter(p => p.billing === billing)
      .reduce((sum, p) => sum + p.amount, 0)
    
    return [{
      description: billing,
      billed: bill.amount,
      discount,
      paid,
      remain: bill.amount - paid - discount,
    }]
  })
})

const recapTotals = computed(() => {
  return paymentRecap.value.reduce((totals, item) => {
    totals.billed += item.billed || 0
    totals.discount += item.discount || 0
    totals.paid += item.paid || 0
    totals.remain += item.remain || 0
    
    return totals
  }, { billed: 0, discount: 0, paid: 0, remain: 0 })
})
</script>

<template>
  <section v-if="student && billings && payments && school">
    <VRow>
      <VCol cols="12">
        <VCard>
          <!-- SECTION Header -->
          <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row">
            <!-- 👉 Left Content -->
            <div
              v-if="school?.length"
              class="ma-sm-4"
            >
              <div class="d-flex align-center mb-6">
                <!-- 👉 Logo -->
                <VNodeRenderer
                  :nodes="themeConfig.app.logo"
                  class="me-3"
                />

                <!-- 👉 Title -->
                <h6 class="font-weight-bold text-capitalize text-h4">
                  Jaz Academy
                </h6>
              </div>

              <!-- 👉 Address -->
              <p class="mb-0">
                {{ school[0]?.name }} ✪ <strong>{{ school[0]?.organization }}</strong>
              </p>
              <p class="my-2">
                {{ school[0]?.address }}
              </p>
              <p class="mb-0">
                <VIcon
                  icon="tabler-phone"
                  class="me-2"
                />
                {{ school[0]?.phone }}
          
                <VIcon
                  icon="tabler-mail"
                  class="mx-2"
                />
                {{ school[0]?.email }}
              </p>
            </div>

            <!-- 👉 Right Content -->
            <div
              v-if="student"
              class="mt-4 ma-sm-4 text-end"
            >
              <!-- 👉 Nama -->
              <h6 class="font-weight-medium text-h4">
                {{ student.name }}
              </h6>

              <!-- 👉 No Induk -->
              <p class="my-3 font-weight-medium text-h5">
                <span>Angkatan : </span>
                <span>{{ student.registered - 2022 }}</span>
              </p>

              <!-- 👉 Angkatan -->
              <p class="mb-0">
                <span>Payment : </span>
                <span>{{ student.payment_category }}</span>
              </p>

              <!-- 👉 Semester -->
              <p class="mb-0">
                <span>NID : </span>
                <span>{{ student.nis }}</span>
              </p>
            </div>
          </VCardText>

          <VDivider />

          <!-- 👉 Report Details -->
          <VCardText class="text-center">
            <h2>REKAPITULASI PEMBAYARAN</h2>
            <p
              v-if="student"
              class="font-weight-medium text-h5"
            >
              Periode {{ billings[0]?.year }} - {{ Number(billings[0]?.year) + 1 }}
            </p>
          </VCardText>

          <VDivider />
          
          <!-- 👉 Table -->
          <VTable class="invoice-preview-table">
            <thead>
              <tr>
                <th class="d-none d-md-table-cell" />
                <th scope="col">
                  NO
                </th>
                <th scope="col">
                  DESCRIPTION
                </th>
                <th
                  scope="col"
                  class="text-end"
                >
                  BILLING
                </th>
                <th
                  scope="col"
                  class="text-end"
                >
                  PAID
                </th>
                <th
                  scope="col"
                  class="text-end"
                >
                  DISCOUNT
                </th>
                <th
                  scope="col"
                  class="text-end"
                >
                  REMAINING
                </th>
                <th class="d-none d-md-table-cell" />
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(item, index) in paymentRecap"
                :key="item.name"
              >
                <td class="d-none d-md-table-cell" />
                <td class="text-no-wrap">
                  {{ index + 1 }}
                </td>
                <td class="text-no-wrap">
                  {{ item.description }}
                </td>
                <td class="text-end">
                  {{ item.billed.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
                </td>
                <td class="text-end">
                  {{ item.paid.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
                </td>
                <td class="text-end">
                  {{ item.discount.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
                </td>
                <td class="text-end">
                  {{ item.remain.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
                </td>
                <td class="d-none d-md-table-cell" />
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th class="d-none d-md-table-cell" />
                <th
                  scope="row"
                  colspan="2"
                  class="text-end text-uppercase"
                >
                  Total
                </th>
                <td class="text-end font-weight-bold">
                  {{ recapTotals.billed.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
                </td>
                <td class="text-end font-weight-bold">
                  {{ recapTotals.paid.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
                </td>
                <td class="text-end font-weight-bold">
                  {{ recapTotals.discount.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
                </td>
                <td class="text-end font-weight-bold text-error">
                  {{ recapTotals.remain.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
                </td>
                <th class="d-none d-md-table-cell" />
              </tr>
            </tfoot>
          </VTable>

          <VDivider class="mb-2" />

          <!-- Total -->
          <VCardText class="d-flex justify-space-between flex-column flex-sm-row print-row">
            <div class="my-2 mx-sm-4 text-base">
              <!-- 👉 Left Content -->
            </div>

            <div class="my-2 mx-sm-4 text-end">
              <!-- 👉 Right Content -->
            </div>
          </VCardText>

          <VDivider />

          <VCardText>
            <div class="d-flex mx-sm-4">
              <h6 class="text-base font-weight-medium me-1">
                Note:
              </h6>
              <span>Pendidikan adalah investasi sepanjang hidup di dunia s.d. akhirat!</span>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </vrow>
  </section>
</template>

<style lang="scss">
.invoice-preview-table {
  --v-table-row-height: 44px !important;
}

@media print {
  .v-theme--dark {
    --v-theme-surface: 255, 255, 255;
    --v-theme-on-surface: 94, 86, 105;
  }

  body {
    background: none !important;
  }

  @page { margin: 0; size: auto; }

  .layout-page-content,
  .v-row,
  .v-col-md-9 {
    padding: 0;
    margin: 0;
  }

  .product-buy-now {
    display: none;
  }

  .v-navigation-drawer,
  .layout-vertical-nav,
  .app-customizer-toggler,
  .layout-footer,
  .layout-navbar,
  .layout-navbar-and-nav-container {
    display: none;
  }

  .v-card {
    box-shadow: none !important;

    .print-row {
      flex-direction: row !important;
    }
  }

  .layout-content-wrapper {
    padding-inline-start: 0 !important;
  }

  .v-table__wrapper {
    overflow: hidden !important;
  }
}
</style>
