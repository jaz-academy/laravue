<script setup>
import LastProject from '@/views/dashboards/academy/LastProject.vue'
import LiteracyProject from '@/views/dashboards/academy/LiteracyProject.vue'
import PopularMentors from '@/views/dashboards/academy/PopularMentors.vue'
import PostedTable from '@/views/dashboards/academy/PostedTable.vue'
import TopTenPosted from '@/views/dashboards/academy/TopTenPosted.vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const borderColor = 'rgba(var(--v-border-color), var(--v-border-opacity))'
const currentUser = useCookie('userData')
const studentId = ref('')
const semester = ref('')
const tasks = ref({ semester: semester.value, data: {} })

async function fetchProject() {
  const res = await useApi(`/dashboard-project?student_id=${studentId.value}&semester=${semester.value}`)

  tasks.value = res.data.value
}

const students = computed(() => tasks.value.students || [])
const teachers = computed(() => tasks.value.teacher || [])
const topTen = computed(() => tasks.value.topTen || [])
const lastProject = computed(() => tasks.value.lastProject || [])
const lastProjectTasks = computed(() => tasks.value.lastProjectTasks || [])
const literasiTasks = computed(() => tasks.value.literasiTasks || [])
const socialMediaTasks = computed(() => tasks.value.socialMediaTasks || [])

const progressTasks = computed(() => {
  const { accepted = 0, completed = 0, progress = 0 } = tasks.value.completedTasks?.[0] || {}
  const total = Number(accepted) + Number(completed) + Number(progress)
  const percentage = total ? ((accepted / total) * 100).toFixed(0) : 0


  return { accepted, completed, progress, total, percentage }
})


onMounted(async () => {
  await fetchProject()
  console.log("Project data fetched:", tasks.value)
})

const topicsChartConfig = computed(() => ({
  chart: {
    height: 270,
    type: 'bar',
    toolbar: { show: false },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '70%',
      distributed: true,
      startingShape: 'rounded',
      borderRadius: 7,
    },
  },
  colors: [
    '#7367f0',
    '#16B1FF',
    '#56CA00',
    '#8A8D93',
    '#FF4C51',
    '#FFB400',
  ],
  grid: {
    borderColor,
    strokeDashArray: 10,
    xaxis: { lines: { show: true } },
    yaxis: { lines: { show: false } },
    padding: { top: -35, bottom: -12 },
  },
  dataLabels: {
    enabled: true,
    style: { colors: ['#fff'], fontWeight: 200, fontSize: '13px' },
    offsetX: 0,
    dropShadow: { enabled: false },
    formatter(val, opt) {
      return tasks.value.media.name[opt.dataPointIndex] || ''
    },
  },
  xaxis: {
    categories: tasks.value.media?.count, // isi angka dari DB
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: {
      style: {
        colors: 'rgba(var(--v-theme-on-background), var(--v-disabled-opacity))',
        fontSize: '13px',
      },
      formatter(val) {
        return `${val}`
      },
    },
  },
  yaxis: {
    labels: {
      show: false,
      style: {
        colors: 'rgba(var(--v-theme-on-background), var(--v-disabled-opacity))',
        fontSize: '13px',
      },
    },
  },
  tooltip: {
    enabled: true,
    style: { fontSize: '12px' },
    onDatasetHover: { highlightDataSeries: false },
  },
  legend: { show: false },
}))

const topicsChartSeries = computed(() => [{
  data: tasks.value.media?.count || [],
}])


const donutChartColors = {
  donut: {
    series1: '#22A95E',
    series2: '#24B364',
    series3: '#56CA00',
    series4: '#53D28C',
    series5: '#7EDDA9',
    series6: '#A9E9C5',
  },
}

function daysUntil(targetDay) {
  const today = new Date()
  const todayDay = today.getDay() // Minggu=0, Senin=1, ... Sabtu=6
  const diff = (targetDay + 7 - todayDay) % 7
  
  return diff === 0 ? 7 : diff // kalau hari ini sama, hitung ke minggu depan
}

const timeSpendingChartConfig = {
  chart: {
    height: 157,
    width: 130,
    parentHeightOffset: 0,
    type: 'donut',
  },
  labels: [
    'Accepted',
    'Completed',
    'On Progress',
  ],
  colors: [
    donutChartColors.donut.series1,
    donutChartColors.donut.series4,
    donutChartColors.donut.series6,
  ],
  stroke: { width: 0 },
  dataLabels: {
    enabled: false,
    formatter(val) {
      return `${ Number.parseInt(val) }%`
    },
  },
  legend: { show: false },
  tooltip: { theme: false },
  grid: { padding: { top: 0 } },
  plotOptions: {
    pie: {
      donut: {
        size: '75%',
        labels: {
          show: true,
          value: {
            fontSize: '1.5rem',
            color: 'rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity))',
            fontWeight: 500,
            offsetY: -15,
            formatter(val) {
              return `${ Number.parseInt(val) }%`
            },
          },
          name: { offsetY: 20 },
          total: {
            show: true,
            fontSize: '.7rem',
            label: 'Total',
            color: 'rgba(var(--v-theme-on-background), var(--v-disabled-opacity))',
            formatter() {
              return `${ progressTasks.value.total }`
            },
          },
        },
      },
    },
  },
}

const timeSpendingChartSeries = computed(() => {
  const accepted = Number(progressTasks.value.accepted || 0)
  const completed = Number(progressTasks.value.completed || 0)
  const progress = Number(progressTasks.value.progress || 0)

  return [accepted, completed, progress]
})

const topicsData = computed(() => {
  const counts = tasks.value.media?.count || []
  const total = counts.reduce((a, b) => a + b, 0) || 1 // supaya nggak div 0

  return (tasks.value.media?.name || []).map((name, i) => {
    const percent = Math.round((counts[i] / total) * 100)
    
    return {
      title: name,
      value: percent,
      color: percent >= 50
        ? 'success'
        : (percent >= 5 ? 'primary' : 'error'),
    }
  })
})

const quotes = [
  "Setiap langkah kecil itu berarti. Jalan terus aja, hasilnya bakal keliatan nanti.",
  "Jangan tunggu mood bagus buat mulai. Mulai dulu, nanti mood bakal ikut datang.",
  "Capek itu wajar, berhenti sebentar boleh. Yang penting jangan nyerah. Kamu pasti bisa!",
  "Kalau gagal, itu tandanya kamu lagi belajar. Jadi makin dekat sama berhasil. Yuk coba lagi..",
  "Sedikit demi sedikit, lama-lama jadi bukit emas. Konsisten itu kuncinya. Yuk mulai lagi..",
  "Mimpi nggak bakal tercapai kalau cuma dipikirin. Gerak dikit aja udah selangkah lebih dekat.",
  "Jangan bandingin diri sama orang lain. Bandingin sama dirimu kemarin aja udah cukup.",
  "Hari ini nggak harus sempurna. Kamu hanya harus lebih baik daripada kemarin, gitu aja cukup kok!",
  "Semua orang pernah ragu. Bedanya, yang berhasil itu tetap jalan walau ragu.",
  "Hidup ini kayak naik sepeda. Kalau mau seimbang, ya harus terus ngegowes. 🚴",
]

const currentQuote = ref(quotes[0])
let index = 0
let interval

onMounted(() => {
  interval = setInterval(() => {
    index = (index + 1) % quotes.length
    currentQuote.value = quotes[index]
  }, 60000) // 1 menit
})

onUnmounted(() => clearInterval(interval))
</script>

<template>
  <div>
    <VRow class="py-6">
      <!-- 👉 Welcome -->
      <VCol
        cols="12"
        md="8"
        :class="$vuetify.display.mdAndUp ? 'border-e' : 'border-b'"
      >
        <div class="pe-3">
          <h3 class="text-h3 text-high-emphasis mb-1">
            Welcome back, <span class="font-weight-medium"> {{ currentUser.value?.name ?? '' }} 👋🏻 </span>
          </h3>

          <div
            class="mb-6 text-wrap"
            style="max-inline-size: 400px;"
          >
            <p>{{ currentQuote }}</p>
          </div>

          <div
            v-if="tasks.completedTasks?.length"
            class="d-flex justify-space-between flex-wrap gap-4 me-4 flex-column flex-md-row"
          >
            <div
              v-for="{ title, value, icon, color } in [
                { title: 'Accepted ', value: progressTasks.accepted, icon: 'custom-check', color: 'success' },
                { title: 'Completed ', value: progressTasks.completed, icon: 'custom-laptop', color: 'info' },
                { title: 'On Progress ', value: progressTasks.progress, icon: 'custom-lightbulb', color: 'warning' },
              ]"
              :key="title"
            >
              <div class="d-flex">
                <VAvatar
                  variant="tonal"
                  :color="color"
                  rounded
                  size="54"
                  class="text-primary me-4"
                >
                  <VIcon
                    :icon="icon"
                    size="38"
                  />
                </VAvatar>
                <div>
                  <span class="text-base">{{ title }}</span>
                  <h4
                    class="text-h4 font-weight-medium"
                    :class="`text-${color}`"
                  >
                    {{ value }}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </VCol>

      <!-- 👉 Tasks completed -->
      <VCol
        cols="12"
        md="4"
      >
        <div class="d-flex justify-space-between align-center">
          <div class="d-flex flex-column ps-3">
            <h5 class="text-h5 text-high-emphasis mb-2 text-no-wrap">
              Tasks Completed
            </h5>
            <span class="mb-7">Weekly Report</span>
            <div class="text-h3 mb-2 mt-3">
              {{ daysUntil(5) }} <span class="text-h4 text-medium-emphasis">d</span> Left
            </div>
            <div>
              <VChip
                :color="progressTasks.percentage > 90 ? 'success' : progressTasks.percentage > 75 ? 'primary' : 'error'"
                label
              >
                {{ progressTasks.percentage }}%
              </VChip>
            </div>
          </div>
          <div>
            <VueApexCharts
              type="donut"
              height="150"
              width="150"
              :options="timeSpendingChartConfig"
              :series="timeSpendingChartSeries"
            />
          </div>
        </div>
      </VCol>
    </VRow>

    <VRow class="match-height">
      <!-- 👉 Media Usage -->
      <VCol
        cols="12"
        md="8"
      >
        <!-- 👉 Media Usage -->
        <VCard>
          <VCardItem title="Media Usage">
            <template #append>
              <MoreBtn />
            </template>
          </VCardItem>

          <VCardText>
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <div>
                  <VueApexCharts
                    type="bar"
                    height="260"
                    :options="topicsChartConfig"
                    :series="topicsChartSeries"
                  />
                </div>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <div
                  class="d-flex flex-wrap gap-x-4 gap-y-10 mx-auto"
                  style="inline-size: 300px;"
                >
                  <div
                    v-for="topic in topicsData"
                    :key="topic.title"
                    class="d-flex gap-x-4"
                  >
                    <VBadge
                      dot
                      inline
                      class="mt-1 custom-badge"
                      :color="topic.color"
                    />
                    <div>
                      <div
                        class="text-body-1"
                        style="min-inline-size: 90px;"
                      >
                        {{ topic.title }}
                      </div>
                      <h4 class="text-h4">
                        {{ Number(topic.value) }}%
                      </h4>
                    </div>
                  </div>
                </div>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>

      <!-- 👉 Popular Mentor  -->
      <VCol
        cols="12"
        md="4"
        sm="6"
      >
        <PopularMentors
          v-if="teachers.length"
          :teachers="teachers"
        />
      </VCol>

      <!-- 👉 Top 10 posts  -->
      <VCol
        cols="12"
        md="4"
        sm="6"
      >
        <TopTenPosted 
          v-if="topTen.length"
          :top-ten="topTen"
        />
      </VCol>

      <!-- 👉 Last Project  -->
      <VCol
        cols="12"
        md="4"
        sm="6"
      >
        <LastProject 
          v-if="lastProjectTasks.length"
          :last-project="lastProject"
          :last-project-tasks="lastProjectTasks"
          :students="students"
        />
      </VCol>

      <!-- 👉 Literasi  -->
      <VCol
        cols="12"
        md="4"
        sm="6"
      >
        <LiteracyProject 
          v-if="literasiTasks.length"
          :literasi-tasks="literasiTasks"
          :students="students"
        />
      </VCol>

      <!-- 👉 Weekly Post  -->
      <VCol>
        <PostedTable 
          v-if="socialMediaTasks.length"
          :social-media-tasks="socialMediaTasks"
          :students="students"
        />
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss">
@use "@core-scss/template/libs/apex-chart.scss";
</style>
