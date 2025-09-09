<script setup>
import { humanDate } from '@/@core/utils/helpers'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { computed } from 'vue'

const route = useRoute('academy-assessment-report-id')
const studentId = Number(route.params.id)

// Fetch all data in parallel
const [{ data: scoreData }, { data: studentResult }, { data: schoolResult }] = await Promise.all([
  useApi(`/scores-by-person?student_id=${studentId}&semester=`),
  useApi(`/students/${studentId}`),
  useApi('/schools'),
])

const student = computed(() => studentResult.value?.data)
const school = computed(() => schoolResult.value?.data)

const averageScore = computed(() => {
  if (!scoreData.value?.data || scoreData.value.data.length === 0)
    return 0
  
  const total = scoreData.value.data.reduce((sum, item) => sum + (item.final_score || 0), 0)
  
  return (total / scoreData.value.data.length).toFixed(2)
})

const getPredicate = score => {
  if (score >= 95)
    return 'A+'
  if (score >= 90)
    return 'A'
  if (score >= 85)
    return 'A-'
  if (score >= 80)
    return 'B'
  if (score >= 75)
    return 'B-'
  if (score >= 70)
    return 'C+'
  if (score >= 65)
    return 'C'
  if (score >= 60)
    return 'C-'
  
  return 'D'
}
</script>

<template>
  <section v-if="scoreData && student && school">
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
                <span>Period : </span>
                <span>{{ student.registered }}</span>
              </p>

              <!-- 👉 Semester -->
              <p class="mb-0">
                <span>NID : </span>
                <span>{{ student.nis }}</span>
              </p>
            </div>
          </VCardText>
          <!-- !SECTION -->

          <VDivider />

          <!-- 👉 Payment Details -->
          <VCardText class="text-center">
            <h2>LAPORAN HASIL STUDI</h2>
            <p
              v-if="student"
              class="font-weight-medium text-h5"
            >
              Semester {{ scoreData.semester }}
            </p>
          </VCardText>


          <!-- 👉 Table -->
          <VDivider />

          <VTable class="invoice-preview-table">
            <thead>
              <tr>
                <th class="d-none d-md-table-cell" />
                <th
                  scope="col"
                  class="text-center"
                >
                  NOMOR
                </th>
                <th scope="col">
                  KATEGORI
                </th>
                <th scope="col">
                  BIDANG STUDI
                </th>
                <th
                  scope="col"
                  class="text-center"
                >
                  NILAI
                </th>
                <th
                  scope="col"
                  class="text-center"
                >
                  PREDIKAT
                </th>
                <th class="d-none d-md-table-cell" />
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="item in scoreData.data"
                :key="item.name"
              >
                <td class="d-none d-md-table-cell" />
                <td class="text-center">
                  {{ item.number }}
                </td>
                <td class="text-no-wrap">
                  {{ item.group }}
                </td>
                <td class="text-no-wrap">
                  {{ item.name }}
                </td>
                <td class="text-center">
                  {{ item.final_score }}
                </td>
                <td class="text-center">
                  {{ getPredicate(item.final_score) }}
                </td>
                <td class="d-none d-md-table-cell" />
              </tr>
            </tbody>
          </VTable>

          <VDivider class="mb-2" />

          <!-- Total -->
          <VCardText class="d-flex justify-space-between flex-column flex-sm-row print-row">
            <div class="my-4 mx-sm-4">
              <h6 class="text-base font-weight-medium">
                Nilai Rata-rata:
                <span class="font-weight-bold">{{ averageScore }}</span>
              </h6>
            </div>
            <VSpacer />
            <div
              v-if="school?.length"
              class="my-4 mx-sm-4 text-end"
            >
              Tasikmalaya, {{ humanDate(new Date(), 'd MMM yyyy') }}
              <br>✪ <strong>{{ school[0]?.organization }}</strong>
            </div>
          </VCardText>

          <VDivider />

          <VCardText>
            <div class="d-flex mx-sm-4">
              <h6 class="text-base font-weight-medium me-1">
                Note:
              </h6>
              <span>Ilmu itu di dalam Dada.. Bukan diatas Kertas..</span>
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
