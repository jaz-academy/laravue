<script setup>
import { humanDate, useUserAccess } from '@/@core/utils/helpers'
import InvoiceAddPaymentDrawer from '@/views/financial/finance/InvoiceAddPaymentDrawer.vue'
import InvoiceSendInvoiceDrawer from '@/views/financial/finance/InvoiceSendInvoiceDrawer.vue'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

const { hasRoleAndAccess } = useUserAccess()
const route = useRoute('financial-finance-preview-id')
const invoiceNumber = computed(() => route.params.id)
const isAddPaymentSidebarVisible = ref(false)
const isSendPaymentSidebarVisible = ref(false)
const invoice = ref([])
const school = ref([])

const { data: invoiceData } = await useApi(`/finances-by-invoice/${invoiceNumber.value}`)
const { data: schoolData } = await useApi('/schools')

//! Console Log to check the raw data from the API
console.log('Raw invoiceData from API:', invoiceData.value)

invoice.value = invoiceData.value.data
school.value = schoolData.value

const totalAmount = computed(() => {
  // Calculate the total amount from the invoice items
  return invoice.value.reduce((total, item) => total + (Number(item.amount) || 0), 0)
})

const printInvoice = () => {
  window.print()
}
</script>

<template>
  <section v-if="invoiceData">
    <VRow>
      <VCol
        cols="12"
        md="9"
      >
        <VCard v-if="invoiceNumber !== 'new'">
          <!-- SECTION Header -->
          <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row">
            <!-- 👉 Left Content -->
            <div class="ma-sm-4">
              <div class="d-flex align-center mb-6">
                <!-- 👉 Logo -->
                <VNodeRenderer
                  :nodes="themeConfig.app.logo"
                  class="me-3"
                />

                <!-- 👉 Title -->
                <h6 class="font-weight-bold text-capitalize text-h4">
                  {{ themeConfig.app.title }}
                </h6>
              </div>

              <!-- 👉 Address -->
              <template v-if="school?.data?.length">
                <p class="mb-0">
                  {{ school.data[0].name }} ✪ <strong>{{ school.data[0].organization }}</strong>
                </p>
                <p class="my-2">
                  {{ school.data[0].address }}
                </p>
                <p class="mb-0">
                  <VIcon
                    icon="tabler-phone"
                    class="me-2"
                  />
                  {{ school.data[0].phone }}
                  <VIcon
                    icon="tabler-mail"
                    class="mx-2"
                  />
                  {{ school.data[0].email }}
                </p>
              </template>
            </div>

            <!-- 👉 Right Content -->
            <div class="mt-4 ma-sm-4">
              <!-- 👉 Invoice ID -->
              <h6 class="font-weight-medium text-h5">
                Invoice #{{ invoiceNumber }}
              </h6>
            </div>
          </VCardText>
          <!-- !SECTION -->

          <VDivider />

          <!-- 👉 Payment Details -->
          <VCardText class="d-flex justify-space-between flex-wrap flex-column flex-sm-row print-row">
            <div class="ma-sm-4" />

            <div class="mt-4 ma-sm-4">
              <h6 class="text-h6 font-weight-medium mb-6">
                Invoice Details:
              </h6>
              <table>
                <tbody>
                  <tr>
                    <td class="pe-6 pb-1">
                      Date:
                    </td>
                    <td class="pb-1">
                      <span class="font-weight-medium">
                        {{ humanDate(invoice[0]?.date) }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="pe-6 pb-1">
                      Vendor:
                    </td>
                    <td class="pb-1">
                      {{ invoice[0]?.vendor }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pe-6 pb-1">
                      Account:
                    </td>
                    <td class="pb-1">
                      {{ invoice[0]?.finance_account?.number }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pe-6 pb-1">
                      Remark:
                    </td>
                    <td class="pb-1">
                      {{ invoice[0]?.finance_account?.description }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </VCardText>

          <!-- 👉 Table -->
          <VDivider />

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
                  AMOUNT
                </th>
                <th class="d-none d-md-table-cell" />
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(item, i) in invoice"
                :key="i"
              >
                <td class="d-none d-md-table-cell" />
                <td class="text-no-wrap">
                  {{ i+1 }}
                </td>
                <td class="text-no-wrap">
                  {{ item.description }}
                </td>
                <td class="text-end">
                  {{ Number(item.amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
                </td>
                <td class="d-none d-md-table-cell" />
              </tr>
            </tbody>
          </VTable>

          <VDivider class="mb-2" />

          <!-- Total -->
          <VCardText class="d-flex justify-space-between flex-column flex-sm-row print-row">
            <div class="my-2 mx-sm-4 text-base">
              <div class="d-flex align-center mb-1">
                <h6 class="text-base font-weight-medium me-1">
                  Admin:
                </h6>
                <span>{{ invoice[0]?.admin }}</span>
              </div>
              <p>Thanks for your business</p>
            </div>

            <div class="my-2 mx-sm-4">
              <table>
                <tbody>
                  <tr class="text-end">
                    <td class="text-end">
                      <div class="me-5">
                        <p class="mb-0">
                          Total:
                        </p>
                      </div>
                    </td>
                    <td class="font-weight-medium text-high-emphasis">
                      <p class="mb-0">
                        {{ Number(totalAmount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </VCardText>

          <VDivider />

          <VCardText>
            <div class="d-flex mx-sm-4">
              <h6 class="text-base font-weight-medium me-1">
                Note:
              </h6>
              <span>{{ invoice[0]?.remark }}</span>
            </div>
          </VCardText>
        </VCard>
        <VCard v-else>
          <VCardText>
            Select the invoice you want to preview.
          </VCardText>
        </VCard>
      </VCol>

      <VCol
        cols="12"
        md="3"
        class="d-print-none"
      >
        <VCard>
          <VCardText>
            <!-- 👉 Send Invoice Trigger button -->
            <VBtn
              block
              prepend-icon="tabler-send"
              class="mb-2 d-none"
              @click="isSendPaymentSidebarVisible = true"
            >
              Send Invoice
            </VBtn>

            <VBtn
              block
              class="mb-2"
              @click="printInvoice"
            >
              Print
            </VBtn>

            <VBtn
              v-if="hasRoleAndAccess(3, 'Finance').value"
              block
              color="secondary"
              variant="tonal"
              class="mb-2"
              :to="{ name: 'financial-finance-edit-id', params: { id: route.params.id } }"
            >
              Edit Invoice
            </VBtn>
            
            <VBtn
              block
              color="secondary"
              variant="tonal"
              :to="{ name: 'financial-finance' }"
            >
              Exit
            </VBtn>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- 👉 Add Payment Sidebar -->
    <InvoiceAddPaymentDrawer v-model:is-drawer-open="isAddPaymentSidebarVisible" />

    <!-- 👉 Send Invoice Sidebar -->
    <InvoiceSendInvoiceDrawer v-model:is-drawer-open="isSendPaymentSidebarVisible" />
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
