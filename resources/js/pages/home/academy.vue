<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import { fetchStudentData, students } from '@/composables/fetchStudentData'
import { useApi } from '@/composables/useApi'
import AlquranAreaCharts from '@/views/home/academy/AlquranAreaCharts.vue'
import AlquranDetailOverview from '@/views/home/academy/AlquranDetailOverview.vue'
import BahasaDonutCharts from '@/views/home/academy/BahasaDonutCharts.vue'
import DirosahActive from '@/views/home/academy/DirosahActive.vue'
import InformaticsStates from '@/views/home/academy/InformaticsStates.vue'
import MonthlyAreaChart from '@/views/home/academy/MonthlyAreaChart.vue'
import TsaqofalAnalytics from '@/views/home/academy/TsaqofalAnalytics.vue'
import { computed } from 'vue'

const currentUser = useCookie('userData')
const studentId = ref(currentUser.value?.admin_student_id || '')
const semester = ref('')
const scores = ref({ semester: null, data: {} })

async function fetchScores() {
  const res = await useApi(`/dashboard-academic?student_id=${studentId.value}&semester=${semester.value}`)

  scores.value = res.data.value || { semester: semester.value, data: {} }
}

function findScores(subject) {
  const key = Object.keys(scores.value.data || {}).find(k => k.includes(subject))
  
  return key ? scores.value.data[key] || [] : []
}

function lastValues(subjectPrefix) {
  const data = scores.value.data || {}
  
  return Object.keys(data)
    .filter(k => k.startsWith(subjectPrefix))
    .reduce((acc, key) => {
      const arr = data[key]

      acc[key] = arr?.at(-1) ?? 0
      
      return acc
    }, {})
}

const informatics = computed(() => lastValues('Informatika'))
const multimedias = computed(() => lastValues('Multimedia'))
const bahasa = computed(() => lastValues('Bahasa'))
const dirosah = computed(() => lastValues('Dirosah'))

function ordinalNumber(num) {
  const suffix = ["th", "st", "nd", "rd"]
  const mod = num % 100
  
  return num + (suffix[(mod - 20) % 10] || suffix[mod] || suffix[0])
}

const bulan = computed(() => {
  return scores.value.semester % 2 === 0
    ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    : ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
})

function averageNonNull(...arrays) {
  const combined = arrays.flat(Infinity) // gabung semua level
  const valid = combined.filter(v => typeof v === 'number' && !isNaN(v) && v !== 0)
  
  return valid.length ? valid.reduce((a, b) => a + b, 0) / valid.length : 0
}

const simpleStatisticsDemoCards = computed(() => [
  {
    icon: 'tabler-book-2',
    color: 'primary',
    title: 'Tsaqofah',
    subTitle: 'Average',
    stat: averageNonNull(findScores('Pemahaman'), findScores('Sikap')).toFixed(0),
  },
  {
    icon: 'tabler-device-gamepad-2',
    color: 'info',
    title: 'Multimedia',
    subTitle: 'Average',
    stat: averageNonNull(findScores('Multimedia'), findScores('Informatika')).toFixed(0),
  },
])

onMounted(async () => {
  await fetchStudentData()
  await fetchScores()
})

watch([studentId, semester], async ([newId, newSem]) => {
  if (newId && newSem) {
    const res = await useApi(`/dashboard-academic?student_id=${newId}&semester=${newSem}`)

    scores.value = structuredClone(res.data.value)
    console.log("response: ", scores.value)
    console.log("inggris: ", Number(findScores('Inggris').at(-1) ?? 0))
  }
})
</script>

<template>
  <VRow class="match-height">
    <VCol
      cols="12"
      md="8"
    >
      <span class="font-weight-medium text-h3">{{ scores.semester ? ordinalNumber(scores.semester) : 'All' }} Semester </span> 
      <span class="text-secondary"> {{ scores.studentName }}</span>
    </VCol>
    <VCol
      class="d-flex align-center justify-end gap-6"
      cols="12"
      md="4"
    >
      <AppSelect
        v-if="currentUser.value?.admin_teacher_id ?? 0"
        v-model="studentId"
        :items="students"
        item-title="nickname"
        item-value="id"
        placeholder="Select Student"
        @change="fetchScores"
      />
      <AppSelect
        v-model="semester"
        :items="[1, 2, 3, 4, 5, 6]"
        placeholder="Select Semester"
        @change="fetchScores"
      />
    </VCol>
    <!-- Monthly Progress Area Chart (Kiri) -->
    <VCol
      cols="12"
      md="8"
    >
      <VCard>
        <VCardText>
          <MonthlyAreaChart
            v-if="scores.data && Object.keys(scores.data).length"
            :key="semester + '-' + studentId"
            :bulan="bulan"
            :academic="findScores('Adab') || []"
            :character="findScores('Tahfidzh') || []"
          />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Kartu-Kartu Samping (Kanan, md=4) -->
    <VCol
      cols="12"
      md="4"
    >
      <VRow>
        <!-- Alquran -->
        <VCol
          cols="12"
          md="6"
        >
          <AlquranAreaCharts 
            v-if="scores.data && Object.keys(scores.data).length"
            :key="semester + '-' + studentId"
            :tahsin="findScores('Tahsin') || []"
          />
        </VCol>
        <!-- Bahasa -->
        <VCol
          cols="12"
          md="6"
        >
          <BahasaDonutCharts
            v-if="scores.data && Object.keys(scores.data).length"
            :key="semester + '-' + studentId"
            :inggris="Number(findScores('Inggris').at(-1) ?? 0)"
            :arab="Number(findScores('Arab').at(-1) ?? 0)"
          />
        </VCol>

        <!-- Tsaqofah & Multimedia (Loop) -->
        <VCol
          v-for="demo in simpleStatisticsDemoCards"
          :key="demo.title"
          cols="12"
          md="6"
        >
          <VCard>
            <VCardText>
              <VAvatar
                :color="demo.color"
                variant="tonal"
                rounded
                size="42"
              >
                <VIcon :icon="demo.icon" />
              </VAvatar>

              <h5 class="text-h5 mt-4">
                {{ demo.title }}
              </h5>
              <p class="text-sm text-disabled my-1 mb-0">
                {{ demo.subTitle }}
              </p>
              <p class="mb-3">
                {{ demo.stat }}
              </p>
              <VChip
                :color="demo.color < 75 ? 'error' : demo.color"
                label
              >
                {{ demo.stat >= 90 ? 'Excellent' : demo.stat >= 75 ? 'Good' : 'Improve' }}
              </VChip>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VCol>

    <!-- 👉 Alquran Details -->
    <VCol
      cols="12"
      md="8"
    >
      <AlquranDetailOverview 
        v-if="scores.data && Object.keys(scores.data).length"
        :key="semester + '-' + studentId"
        :bulan="bulan"
        :qr-adab="findScores('Adab') || []"
        :qr-tahfidz="findScores('Tahfidz') || []"
        :qr-tajwid="findScores('Tajwid') || []"
        :qr-tahsin="findScores('Tahsin') || []"
      />
    </VCol>

    <!-- 👉 Tsaqofah -->
    <VCol
      cols="12"
      md="4"
    >
      <TsaqofalAnalytics 
        v-if="scores.data && Object.keys(scores.data).length"
        :bulan="bulan"
        :pemahaman="findScores('Pemahaman') || []"
        :sikap="findScores('Sikap') || []"
      />
    </VCol>

    <!-- 👉 ICT -->
    <VCol
      cols="12"
      md="6"
    >
      <InformaticsStates 
        v-if="scores.data && Object.keys(scores.data).length"
        :informatics="informatics"
        :multimedias="multimedias"
      />
    </VCol>

    <!-- 👉 Dirosah -->
    <VCol
      cols="12"
      md="6"
    >
      <DirosahActive 
        v-if="scores.data && Object.keys(scores.data).length"
        :bahasa="bahasa"
        :dirosah="dirosah"
      />
    </VCol>
  </VRow>
</template>
