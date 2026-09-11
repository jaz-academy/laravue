<script setup>
import ReflectionForm from '@/views/academy/assessment/ReflectionForm.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { useDisplay, useTheme } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'

const vuetifyTheme = useTheme()
const { mdAndUp } = useDisplay()

// State
const loadingChart = ref(false)
const loadingTable = ref(false)
const submitting = ref(false)
const deleting = ref(false)
const isAlertVisible = ref(false)
const alertMessage = ref('')
const alertColor = ref('success')

// Filter & Chart Visibility (hidden by default)
const dateRangePreset = ref(null) // null = non-aktif/hidden, '7', '30', 'month', 'all'
const isChartVisible = computed(() => !!dateRangePreset.value)
const customStartDate = ref('')
const customEndDate = ref('')

// Form State (Dynamic: Side Menu on PC, Modal on Mobile)
const isFormOpen = ref(false)
const isEditing = ref(false)
const currentEditId = ref(null)

// Delete Dialog
const isDeleteDialogOpen = ref(false)
const reflectionToDelete = ref(null)

const getTodayString = () => {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  
  return `${year}-${month}-${day}`
}

const defaultForm = () => ({
  date: getTodayString(),
  achievement: { nilai: 80, deskripsi: '' },
  obstacles: { nilai: 30, deskripsi: '' },
  lessons: { nilai: 85, deskripsi: '' },
  priority: { nilai: 90, deskripsi: '' },
  health: { nilai: 85, deskripsi: '' },
})

const formData = reactive(defaultForm())

// Data from API
const timelineData = ref({
  dates: [],
  series: [],
  averages: {
    achievement: 0,
    obstacles: 0,
    lessons: 0,
    priority: 0,
    health: 0,
  },
  total_entries: 0,
})

const reflectionsList = ref([])
const tableSearch = ref('')

// Table Headers
const tableHeaders = [
  { title: 'TANGGAL', key: 'date', sortable: true },
  { title: 'ACHIEVEMENT', key: 'achievement', sortable: false, align: 'center' },
  { title: 'OBSTACLES', key: 'obstacles', sortable: false, align: 'center' },
  { title: 'LESSONS', key: 'lessons', sortable: false, align: 'center' },
  { title: 'PRIORITY', key: 'priority', sortable: false, align: 'center' },
  { title: 'HEALTH', key: 'health', sortable: false, align: 'center' },
  { title: 'AKSI', key: 'actions', sortable: false, align: 'center' },
]

// Dynamic score color: Red for low values, progressing to orange, cyan, green
const getScoreColor = val => {
  const score = Number(val) || 0
  if (score >= 85) return 'success'
  if (score >= 70) return 'info'
  if (score >= 50) return 'warning'
  
  return 'error'
}

// Alert helper
const showAlert = (message, color = 'success') => {
  alertMessage.value = message
  alertColor.value = color
  isAlertVisible.value = true
  setTimeout(() => {
    isAlertVisible.value = false
  }, 5000)
}

// Compute Date Range Params
const getDateRangeParams = () => {
  const params = {}
  const now = new Date()

  if (dateRangePreset.value === '7') {
    const past = new Date(now)

    past.setDate(now.getDate() - 7)
    params.start_date = past.toISOString().split('T')[0]
    params.end_date = now.toISOString().split('T')[0]
  } else if (dateRangePreset.value === '30') {
    const past = new Date(now)

    past.setDate(now.getDate() - 30)
    params.start_date = past.toISOString().split('T')[0]
    params.end_date = now.toISOString().split('T')[0]
  } else if (dateRangePreset.value === 'month') {
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    params.start_date = firstDay.toISOString().split('T')[0]
    params.end_date = lastDay.toISOString().split('T')[0]
  } else if (dateRangePreset.value === 'custom') {
    if (customStartDate.value) params.start_date = customStartDate.value
    if (customEndDate.value) params.end_date = customEndDate.value
  }
  
  return params
}

// Fetch Timeline
const fetchTimeline = async () => {
  if (!dateRangePreset.value) return
  loadingChart.value = true
  try {
    const dateParams = getDateRangeParams()
    const query = new URLSearchParams(dateParams).toString()
    const url = `/reflections/timeline${query ? `?${query}` : ''}`

    const { data } = await useApi(url)
    if (data.value && data.value.status === 'success') {
      timelineData.value = data.value.data
    }
  } catch (err) {
    console.error('Error fetching timeline:', err)
  } finally {
    loadingChart.value = false
  }
}

// Fetch Table Data
const fetchReflections = async () => {
  loadingTable.value = true
  try {
    const dateParams = getDateRangeParams()
    const queryParams = { ...dateParams, all: true }
    const query = new URLSearchParams(queryParams).toString()
    const url = `/reflections?${query}`

    const { data } = await useApi(url)
    if (data.value && data.value.status === 'success') {
      reflectionsList.value = data.value.data || []
    }
  } catch (err) {
    console.error('Error fetching reflections list:', err)
  } finally {
    loadingTable.value = false
  }
}

// Handle Filter Selection & Toggle Active/Non-Active
const onFilterChange = val => {
  dateRangePreset.value = val || null
  if (val) {
    fetchTimeline()
  }
  fetchReflections()
}

// Deactivate filter and hide chart
const deactivateFilter = () => {
  dateRangePreset.value = null
  fetchReflections()
}

const reloadAll = () => {
  if (isChartVisible.value) {
    fetchTimeline()
  }
  fetchReflections()
}

// Open Form (New Reflection)
const openNewForm = () => {
  resetForm()
  isEditing.value = false
  currentEditId.value = null
  isFormOpen.value = true
}

// Edit Item (Populate Form and Open Drawer/Modal)
const editItem = item => {
  isEditing.value = true
  currentEditId.value = item.id
  formData.date = item.date ? item.date.split('T')[0] : getTodayString()
  formData.achievement = {
    nilai: item.achievement?.nilai ?? 80,
    deskripsi: item.achievement?.deskripsi ?? '',
  }
  formData.obstacles = {
    nilai: item.obstacles?.nilai ?? 30,
    deskripsi: item.obstacles?.deskripsi ?? '',
  }
  formData.lessons = {
    nilai: item.lessons?.nilai ?? 85,
    deskripsi: item.lessons?.deskripsi ?? '',
  }
  formData.priority = {
    nilai: item.priority?.nilai ?? 90,
    deskripsi: item.priority?.deskripsi ?? '',
  }
  formData.health = {
    nilai: item.health?.nilai ?? 85,
    deskripsi: item.health?.deskripsi ?? '',
  }
  isFormOpen.value = true
}

// Close Form
const closeForm = () => {
  isFormOpen.value = false
  resetForm()
}

// Handle Form Submit (Store or Update)
const handleSubmit = async () => {
  if (!formData.date) {
    showAlert('Tanggal refleksi harus diisi', 'error')
    
    return
  }

  submitting.value = true
  try {
    const payload = {
      date: formData.date,
      achievement: formData.achievement,
      obstacles: formData.obstacles,
      lessons: formData.lessons,
      priority: formData.priority,
      health: formData.health,
    }

    let url = '/reflections'
    let method = 'POST'

    if (isEditing.value && currentEditId.value) {
      url = `/reflections/${currentEditId.value}`
      method = 'PUT'
    }

    const { data, response } = await useApi(url, {
      method,
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })

    if (response.value?.ok || (data.value && data.value.status === 'success')) {
      showAlert(
        isEditing.value ? 'Refleksi berhasil diperbarui!' : 'Refleksi hari ini berhasil disimpan!',
        'success',
      )
      isFormOpen.value = false
      resetForm()
      reloadAll()
    } else {
      showAlert(data.value?.message || 'Gagal menyimpan data refleksi', 'error')
    }
  } catch (err) {
    console.error('Error submitting reflection:', err)
    showAlert('Terjadi kesalahan saat menyimpan refleksi', 'error')
  } finally {
    submitting.value = false
  }
}

// Reset Form
const resetForm = () => {
  isEditing.value = false
  currentEditId.value = null

  const reset = defaultForm()

  Object.assign(formData, reset)
}

// Delete Item
const confirmDelete = item => {
  reflectionToDelete.value = item
  isDeleteDialogOpen.value = true
}

const executeDelete = async () => {
  if (!reflectionToDelete.value) return
  deleting.value = true
  try {
    const { data, response } = await useApi(`/reflections/${reflectionToDelete.value.id}`, {
      method: 'DELETE',
    })

    if (response.value?.ok || (data.value && data.value.status === 'success')) {
      showAlert('Refleksi berhasil dihapus', 'info')
      isDeleteDialogOpen.value = false
      if (currentEditId.value === reflectionToDelete.value.id) {
        closeForm()
      }
      reloadAll()
    } else {
      showAlert(data.value?.message || 'Gagal menghapus data', 'error')
    }
  } catch (err) {
    showAlert('Terjadi kesalahan saat menghapus', 'error')
  } finally {
    deleting.value = false
    reflectionToDelete.value = null
  }
}

// Chart Configuration
const chartConfig = computed(() => {
  const isDark = vuetifyTheme.current.value.dark
  const textColor = isDark ? '#b6bee3' : '#6f6b7d'
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(47,43,61,0.1)'

  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
    },
    colors: ['#7367f0', '#ff9f43', '#28c76f', '#00cfe8', '#ea5455'],
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.8,
        opacityFrom: 0.35,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      strokeWidth: 2,
      strokeColors: '#fff',
      hover: {
        size: 7,
      },
    },
    grid: {
      borderColor,
      strokeDashArray: 5,
      xaxis: {
        lines: { show: true },
      },
      yaxis: {
        lines: { show: true },
      },
      padding: {
        top: 0,
        right: 15,
        bottom: 0,
        left: 10,
      },
    },
    xaxis: {
      categories: timelineData.value.dates || [],
      axisBorder: { show: false },
      axisTicks: { color: borderColor },
      labels: {
        style: {
          colors: textColor,
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: {
        style: {
          colors: textColor,
          fontSize: '12px',
        },
        formatter: val => `${Math.round(val)}`,
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '13px',
      labels: {
        colors: textColor,
      },
      markers: {
        radius: 12,
        offsetX: -3,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 4,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: val => `${val}/100`,
      },
    },
  }
})

// Format Date Display
const formatDate = dateStr => {
  if (!dateStr) return '-'
  try {
    const d = new Date(dateStr)
    
    return d.toLocaleDateString('id-ID', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch (e) {
    return dateStr
  }
}

onMounted(() => {
  reloadAll()
})
</script>

<template>
  <div class="reflection-assessment-page">
    <!-- Notification Alert -->
    <VAlert
      v-if="isAlertVisible"
      :color="alertColor"
      variant="tonal"
      closable
      class="mb-4"
      @click:close="isAlertVisible = false"
    >
      {{ alertMessage }}
    </VAlert>

    <!-- Page Header & Filter Controls -->
    <VCard class="mb-6">
      <VCardItem>
        <div class="d-flex flex-wrap align-center justify-space-between gap-4">
          <div>
            <VCardTitle class="text-h4 d-flex align-center gap-2">
              <span class="text-primary font-weight-bold">Weekly Report & Reflection</span>
            </VCardTitle>
            <VCardSubtitle class="text-subtitle-1 mt-1">
              Refleksi personal dan evaluasi mingguan.
            </VCardSubtitle>
          </div>

          <!-- Date Preset Filter Buttons (Toggle Active / Non-Active) -->
          <div class="d-flex align-center flex-wrap gap-2">
            <VBtnToggle
              v-model="dateRangePreset"
              color="primary"
              variant="outlined"
              density="comfortable"
              divided
              @update:model-value="onFilterChange"
            >
              <VBtn value="7">
                <VIcon
                  start
                  icon="tabler-calendar-time"
                />
                7 Hari
              </VBtn>
              <VBtn value="30">
                <VIcon
                  start
                  icon="tabler-calendar-stats"
                />
                30 Hari
              </VBtn>
              <VBtn value="month">
                <VIcon
                  start
                  icon="tabler-calendar-month"
                />
                Bulan Ini
              </VBtn>
              <VBtn value="all">
                <VIcon
                  start
                  icon="tabler-calendar"
                />
                Semua
              </VBtn>
            </VBtnToggle>

            <VBtn
              icon
              variant="text"
              color="primary"
              title="Muat Ulang"
              @click="reloadAll"
            >
              <VIcon icon="tabler-refresh" />
            </VBtn>
          </div>
        </div>
      </VCardItem>
    </VCard>

    <!-- TOP SECTION: Personal Timeline Chart & KPI Cards (Hidden by default, shown on filter select) -->
    <VExpandTransition>
      <VCard
        v-if="isChartVisible"
        class="mb-6"
      >
        <VCardItem>
          <!-- 5 Summary Score Cards (Color Primary, Values Dynamic) -->
          <VRow class="mb-2">
            <!-- Achievement -->
            <VCol
              cols="6"
              sm="4"
              md="2"
              lg="2"
              class="d-flex"
            >
              <VCard
                variant="tonal"
                color="primary"
                class="flex-grow-1 pa-2 text-center"
              >
                <div class="text-caption font-weight-medium text-primary">
                  ACHIEVEMENT
                </div>
                <div class="text-h5 font-weight-bold mt-1">
                  <VChip
                    size="small"
                    variant="tonal"
                    :color="getScoreColor(timelineData.averages.achievement)"
                  >
                    {{ timelineData.averages.achievement }}%
                  </VChip>
                </div>
                <div class="text-caption text-medium-emphasis">
                  Rata-rata
                </div>
              </VCard>
            </VCol>

            <!-- Obstacles -->
            <VCol
              cols="6"
              sm="4"
              md="2"
              lg="2"
              class="d-flex"
            >
              <VCard
                variant="tonal"
                color="primary"
                class="flex-grow-1 pa-2 text-center"
              >
                <div class="text-caption font-weight-medium text-primary">
                  OBSTACLES
                </div>
                <div class="text-h5 font-weight-bold mt-1">
                  <VChip
                    size="small"
                    variant="tonal"
                    :color="getScoreColor(timelineData.averages.obstacles)"
                  >
                    {{ timelineData.averages.obstacles }}%
                  </VChip>
                </div>
                <div class="text-caption text-medium-emphasis">
                  Rata-rata
                </div>
              </VCard>
            </VCol>

            <!-- Lessons -->
            <VCol
              cols="6"
              sm="4"
              md="2"
              lg="2"
              class="d-flex"
            >
              <VCard
                variant="tonal"
                color="primary"
                class="flex-grow-1 pa-2 text-center"
              >
                <div class="text-caption font-weight-medium text-primary">
                  LESSONS
                </div>
                <div class="text-h5 font-weight-bold mt-1">
                  <VChip
                    size="small"
                    variant="tonal"
                    :color="getScoreColor(timelineData.averages.lessons)"
                  >
                    {{ timelineData.averages.lessons }}%
                  </VChip>
                </div>
                <div class="text-caption text-medium-emphasis">
                  Rata-rata
                </div>
              </VCard>
            </VCol>

            <!-- Priority -->
            <VCol
              cols="6"
              sm="4"
              md="2"
              lg="2"
              class="d-flex"
            >
              <VCard
                variant="tonal"
                color="primary"
                class="flex-grow-1 pa-2 text-center"
              >
                <div class="text-caption font-weight-medium text-primary">
                  PRIORITY
                </div>
                <div class="text-h5 font-weight-bold mt-1">
                  <VChip
                    size="small"
                    variant="tonal"
                    :color="getScoreColor(timelineData.averages.priority)"
                  >
                    {{ timelineData.averages.priority }}%
                  </VChip>
                </div>
                <div class="text-caption text-medium-emphasis">
                  Rata-rata
                </div>
              </VCard>
            </VCol>

            <!-- Health -->
            <VCol
              cols="6"
              sm="4"
              md="2"
              lg="2"
              class="d-flex"
            >
              <VCard
                variant="tonal"
                color="primary"
                class="flex-grow-1 pa-2 text-center"
              >
                <div class="text-caption font-weight-medium text-primary">
                  HEALTH
                </div>
                <div class="text-h5 font-weight-bold mt-1">
                  <VChip
                    size="small"
                    variant="tonal"
                    :color="getScoreColor(timelineData.averages.health)"
                  >
                    {{ timelineData.averages.health }}%
                  </VChip>
                </div>
                <div class="text-caption text-medium-emphasis">
                  Rata-rata
                </div>
              </VCard>
            </VCol>

            <!-- Status Indicator -->
            <VCol
              cols="6"
              sm="4"
              md="2"
              lg="2"
              class="d-flex"
            >
              <VCard
                variant="outlined"
                color="primary"
                class="flex-grow-1 pa-2 text-center"
              >
                <div class="text-caption font-weight-medium text-primary">
                  STATUS
                </div>
                <div class="text-h6 font-weight-bold mt-1 text-primary">
                  Aktif
                </div>
                <div class="text-caption text-medium-emphasis">
                  Evaluasi
                </div>
              </VCard>
            </VCol>
          </VRow>

          <!-- VueApexCharts Timeline Line/Area -->
          <div
            v-if="loadingChart"
            class="d-flex justify-center align-center py-12"
          >
            <VProgressCircular
              indeterminate
              color="primary"
            />
          </div>
          <div
            v-else-if="timelineData.dates.length === 0"
            class="text-center py-10"
          >
            <VIcon
              icon="tabler-chart-dots"
              size="48"
              color="primary"
              class="mb-2"
            />
            <div class="text-body-1 font-weight-medium text-primary">
              Belum ada catatan refleksi pada rentang tanggal ini.
            </div>
            <div class="text-caption text-medium-emphasis">
              Klik tombol "Isi Refleksi" untuk memulai pencatatan refleksi personal Anda.
            </div>
          </div>
          <div
            v-else
            class="mt-4"
          >
            <VueApexCharts
              type="area"
              height="360"
              :options="chartConfig"
              :series="timelineData.series"
            />
          </div>
        </VCardItem>
      </VCard>
    </VExpandTransition>

    <!-- MAIN SECTION: Tabel Riwayat Refleksi (Selalu Terlihat di Semua Media) -->
    <VCard elevation="2">
      <VCardItem>
        <div class="d-flex flex-wrap justify-space-between align-center gap-3">
          <div>
            <VCardTitle class="d-flex align-center gap-2">
              <span class="text-primary font-weight-bold">Riwayat Refleksi Mingguan</span>
            </VCardTitle>
            <VCardSubtitle>
              Daftar laporan personal dan refleksi.
            </VCardSubtitle>
          </div>

          <div class="d-flex align-center gap-3 flex-wrap">
            <!-- Search Field -->
            <div style="inline-size: 220px;">
              <VTextField
                v-model="tableSearch"
                density="compact"
                variant="outlined"
                color="primary"
                placeholder="Cari tanggal..."
                prepend-inner-icon="tabler-search"
                clearable
              />
            </div>

            <!-- Button Open Form (Dynamic: Side Menu on PC, Modal on Mobile) -->
            <VBtn
              color="primary"
              prepend-icon="tabler-plus"
              @click="openNewForm"
            >
              Isi Refleksi
            </VBtn>
          </div>
        </div>
      </VCardItem>

      <VDivider />

      <!-- VDataTable -->
      <VDataTable
        :headers="tableHeaders"
        :items="reflectionsList"
        :search="tableSearch"
        :loading="loadingTable"
        density="comfortable"
        class="text-no-wrap pb-6"
      >
        <!-- Date Column -->
        <template #item.date="{ item }">
          <div class="font-weight-medium text-primary">
            {{ formatDate(item.date || item.raw?.date) }}
          </div>
          <div class="text-caption text-medium-emphasis">
            {{ item.date || item.raw?.date }}
          </div>
        </template>

        <!-- Achievement Column (Dynamic Score Color) -->
        <template #item.achievement="{ item }">
          <VChip
            size="small"
            variant="tonal"
            :color="getScoreColor(item.achievement?.nilai ?? item.raw?.achievement?.nilai ?? 0)"
          >
            {{ (item.achievement?.nilai ?? item.raw?.achievement?.nilai ?? 0) }}
          </VChip>
        </template>

        <!-- Obstacles Column (Dynamic Score Color) -->
        <template #item.obstacles="{ item }">
          <VChip
            size="small"
            variant="tonal"
            :color="getScoreColor(item.obstacles?.nilai ?? item.raw?.obstacles?.nilai ?? 0)"
          >
            {{ (item.obstacles?.nilai ?? item.raw?.obstacles?.nilai ?? 0) }}
          </VChip>
        </template>

        <!-- Lessons Column (Dynamic Score Color) -->
        <template #item.lessons="{ item }">
          <VChip
            size="small"
            variant="tonal"
            :color="getScoreColor(item.lessons?.nilai ?? item.raw?.lessons?.nilai ?? 0)"
          >
            {{ (item.lessons?.nilai ?? item.raw?.lessons?.nilai ?? 0) }}
          </VChip>
        </template>

        <!-- Priority Column (Dynamic Score Color) -->
        <template #item.priority="{ item }">
          <VChip
            size="small"
            variant="tonal"
            :color="getScoreColor(item.priority?.nilai ?? item.raw?.priority?.nilai ?? 0)"
          >
            {{ (item.priority?.nilai ?? item.raw?.priority?.nilai ?? 0) }}
          </VChip>
        </template>

        <!-- Health Column (Dynamic Score Color) -->
        <template #item.health="{ item }">
          <VChip
            size="small"
            variant="tonal"
            :color="getScoreColor(item.health?.nilai ?? item.raw?.health?.nilai ?? 0)"
          >
            {{ (item.health?.nilai ?? item.raw?.health?.nilai ?? 0) }}
          </VChip>
        </template>

        <!-- Actions Column: ONLY Edit and Delete (View removed) -->
        <template #item.actions="{ item }">
          <div class="d-flex align-center justify-center gap-1">
            <!-- Edit -->
            <VBtn
              icon
              variant="text"
              size="small"
              color="primary"
              title="Edit Refleksi Ini"
              @click="editItem(item.raw || item)"
            >
              <VIcon icon="tabler-pencil" />
            </VBtn>

            <!-- Delete -->
            <VBtn
              icon
              variant="text"
              size="small"
              color="error"
              title="Hapus Refleksi"
              @click="confirmDelete(item.raw || item)"
            >
              <VIcon icon="tabler-trash" />
            </VBtn>
          </div>
        </template>

        <!-- Empty State -->
        <template #no-data>
          <div class="py-6 text-center text-medium-emphasis">
            <VIcon
              icon="tabler-notes-off"
              size="36"
              color="primary"
              class="mb-2"
            />
            <div class="text-primary font-weight-medium">
              Belum ada data refleksi yang tercatat.
            </div>
            <div class="text-caption mt-1">
              Klik tombol "Isi Refleksi" di atas untuk menambahkan refleksi pertama Anda.
            </div>
          </div>
        </template>
      </VDataTable>
    </VCard>

    <!-- DYNAMIC FORM: MODE PC (Side Menu / Navigation Drawer) -->
    <VNavigationDrawer
      v-if="mdAndUp"
      v-model="isFormOpen"
      temporary
      location="end"
      :width="460"
      class="elevation-10"
    >
      <div class="pa-4 d-flex align-center justify-space-between border-b">
        <div class="d-flex align-center gap-2">
          <VIcon
            :icon="isEditing ? 'tabler-edit' : 'tabler-edit-circle'"
            color="primary"
            size="24"
          />
          <span class="text-h6 font-weight-bold text-primary">
            {{ isEditing ? 'Edit Refleksi' : 'Isi Refleksi Mingguan' }}
          </span>
        </div>
        <VBtn
          icon
          variant="text"
          size="small"
          color="primary"
          @click="closeForm"
        >
          <VIcon icon="tabler-x" />
        </VBtn>
      </div>

      <div
        class="pa-4 overflow-y-auto"
        style="max-block-size: calc(100vh - 70px);"
      >
        <ReflectionForm
          :form-data="formData"
          :is-editing="isEditing"
          :submitting="submitting"
          @submit="handleSubmit"
          @cancel="closeForm"
        />
      </div>
    </VNavigationDrawer>

    <!-- DYNAMIC FORM: MODE MOBILE (Modal Dialog) -->
    <VDialog
      v-else
      v-model="isFormOpen"
      max-width="580"
      scrollable
    >
      <VCard>
        <VCardItem class="border-b">
          <div class="d-flex align-center justify-space-between">
            <VCardTitle class="d-flex align-center gap-2 text-primary font-weight-bold">
              <VIcon
                :icon="isEditing ? 'tabler-edit' : 'tabler-edit-circle'"
                color="primary"
              />
              {{ isEditing ? 'Edit Refleksi' : 'Isi Refleksi Harian' }}
            </VCardTitle>
            <VBtn
              icon
              variant="text"
              size="small"
              color="primary"
              @click="closeForm"
            >
              <VIcon icon="tabler-x" />
            </VBtn>
          </div>
        </VCardItem>

        <VCardText class="pa-4">
          <ReflectionForm
            :form-data="formData"
            :is-editing="isEditing"
            :submitting="submitting"
            @submit="handleSubmit"
            @cancel="closeForm"
          />
        </VCardText>
      </VCard>
    </VDialog>

    <!-- Modal Dialog Konfirmasi Hapus -->
    <VDialog
      v-model="isDeleteDialogOpen"
      max-width="420px"
    >
      <VCard v-if="reflectionToDelete">
        <VCardItem>
          <VCardTitle class="text-h6 text-error d-flex align-center gap-2">
            <VIcon icon="tabler-alert-triangle" />
            Konfirmasi Hapus Refleksi
          </VCardTitle>
        </VCardItem>
        <VCardText>
          Apakah Anda yakin ingin menghapus catatan refleksi untuk tanggal
          <strong>{{ formatDate(reflectionToDelete.date) }}</strong>? Tindakan ini tidak dapat dibatalkan.
        </VCardText>
        <VCardActions class="pa-4">
          <VSpacer />
          <VBtn
            variant="text"
            color="secondary"
            :disabled="deleting"
            @click="isDeleteDialogOpen = false"
          >
            Batal
          </VBtn>
          <VBtn
            color="error"
            :loading="deleting"
            @click="executeDelete"
          >
            Hapus
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>
.reflection-assessment-page {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
