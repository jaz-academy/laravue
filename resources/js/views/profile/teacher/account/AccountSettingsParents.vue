<script setup>
import BillingHistoryTable from './BillingHistoryTable.vue'

const countryList = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'New Zealand',
  'India',
  'Russia',
  'China',
  'Japan',
]
</script>

<template>
  <VRow>
    <!-- 👉 Parents -->
    <VCol cols="12">
      <VCard title="Parents Data">
        <VCardText>
          <VForm @submit.prevent="() => {}">
            <VRow>
              <!-- 👉 Company name -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  label="Company Name"
                  placeholder="Pixinvent"
                />
              </VCol>

              <!-- 👉 Billing Email -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  label="Billing Email"
                  placeholder="pixinvent@email.com"
                />
              </VCol>

              <!-- 👉 Tax ID -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  label="Tax ID"
                  placeholder="123 123 1233"
                />
              </VCol>

              <!-- 👉 Vat Number -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  label="VAT Number"
                  placeholder="121212"
                />
              </VCol>

              <!-- 👉 Mobile -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  dirty
                  label="Phone Number"
                  type="number"
                  prefix="US (+1)"
                  placeholder="+1 123 456 7890"
                />
              </VCol>

              <!-- 👉 Country -->
              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  label="Country"
                  :items="countryList"
                  placeholder="Select Country"
                />
              </VCol>

              <!-- 👉 Parents -->
              <VCol cols="12">
                <AppTextField
                  label="Parents"
                  placeholder="1234 Main St"
                />
              </VCol>

              <!-- 👉 State -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  label="State"
                  placeholder="New York"
                />
              </VCol>

              <!-- 👉 Zip Code -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  label="Zip Code"
                  type="number"
                  placeholder="100006"
                />
              </VCol>

              <!-- 👉 Actions Button -->
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn type="submit">
                  Save changes
                </VBtn>
                <VBtn
                  type="reset"
                  color="secondary"
                  variant="tonal"
                >
                  Reset
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Billing History -->
    <VCol cols="12">
      <BillingHistoryTable />
    </VCol>
  </VRow>
</template>

<style lang="scss">
.pricing-dialog {
  .pricing-title {
    font-size: 1.5rem !important;
  }

  .v-card {
    border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    box-shadow: none;
  }
}
</style>
