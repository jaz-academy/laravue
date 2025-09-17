<script setup>
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { computed, nextTick, ref, toRaw, watch } from 'vue'
import AssessmentItemEdit from './AssessmentItemEdit.vue'

const props = defineProps({
  serialNumber: String,
  data: {
    type: null,
    required: true,
  },
})

const emit = defineEmits([
  'push',
  'remove',
  'update:data',
])

const isAlertVisible = ref(false)
const alertMessage = ref('')
const alertColor = ref('primary')

const showAlert = (message, color = 'primary') => {
  alertMessage.value = message
  alertColor.value = color
  isAlertVisible.value = true
  setTimeout(() => {
    isAlertVisible.value = false
  }, 10000)
}

// 👉 Create a local ref to avoid mutating props directly
const localData = ref(structuredClone(toRaw(props.data)))
let isUpdatingFromProp = false

// 👉 Watch for changes in localData and emit them to the parent
watch(localData, newValues => {
  if (!isUpdatingFromProp) {
    emit('update:data', newValues)
  }
}, { deep: true })

// 👉 Watch for changes in the prop from the parent and update the local ref
watch(() => props.data, newValues => {
  isUpdatingFromProp = true
  localData.value = structuredClone(toRaw(newValues))
  nextTick(() => {
    isUpdatingFromProp = false
  })
}, { deep: true })

const updateStudentScore = (index, newScore) => {
  localData.value.studentScores[index] = newScore
}

const school = ref([])
const years = ref([])
const competences = ref([])

const fetchSchool = async () => {
  const { data, error } = await useApi('/schools')
  if (error.value)
    console.log(error.value)
  else
    school.value = data.value
}

const fetchYears = async () => {
  const { data, error } = await useApi('/public/students/years')
  if (error.value)
    console.log(error.value)
  else
    years.value = data.value
}

const fetchCompetences = async () => {
  const { data, error } = await useApi('/competences')
  if (error.value)
    console.log(error.value)
  else
    competences.value = data.value.data
}

const competencesOptions = computed(() =>
  competences.value
    .map(c => ({
      id: c.id,
      title: `${c.academy_subject.group} - ${c.academy_subject.name}`,
      group: c.academy_subject.group,
      name: c.academy_subject.name,
    }))
    .sort((a, b) => {
      // urutkan berdasarkan group dulu
      if (a.group < b.group) return -1
      if (a.group > b.group) return 1

      // kalau group sama, urutkan berdasarkan name
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      
      return 0
    })

    // hapus field bantu supaya cuma id & title
    .map(({ id, title }) => ({ id, title })),
)


fetchCompetences()
fetchYears()
fetchSchool()

watch(() => localData.value.header.semester, async semester => {
  if (semester) {
    // Reset pilihan kompetensi saat semester berubah
    localData.value.header.academy_competence_id = null

    const { data } = await useApi(`/competences?semester=${semester}`)

    competences.value = data.value.data
  }
})

watch(() => localData.value.header.academy_competence_id, competenceId => {
  // Jika ID kompetensi dikosongkan, reset field terkait
  if (!competenceId) {
    localData.value.header.teacher = ''
    localData.value.studentScores.forEach(score => {
      score.competence_1 = ''
      score.competence_2 = ''
      score.competence_3 = ''
    })

    return
  }

  // Cari kompetensi yang dipilih dari data yang sudah ada di frontend
  const competence = competences.value.find(c => c.id === competenceId)

  if (competence) {
    // Update nama guru di header
    localData.value.header.teacher = competence.admin_teacher?.name || ''

    // Update deskripsi kompetensi untuk semua siswa yang sudah ada di daftar
    localData.value.studentScores.forEach(score => {
      score.competence_1 = competence.competence_1 || ''
      score.competence_2 = competence.competence_2 || ''
      score.competence_3 = competence.competence_3 || ''
    })
  }
})

watch(() => localData.value.header.year, async year => {
  // Hanya jalankan jika ini adalah form baru dan tahun sudah dipilih
  if (year && props.serialNumber === 'new') {
    // Kosongkan daftar skor siswa yang ada
    localData.value.studentScores = []

    // Ambil data siswa aktif berdasarkan tahun registrasi
    const { data: studentsResponse } = await useApi(`/public/students-show?year=${year}&itemsPerPage=999&status=active`)

    if (studentsResponse.value?.data) {
      const students = studentsResponse.value.data

      // Urutkan siswa berdasarkan nama
      students.sort((a, b) => a.name.localeCompare(b.name))

      // Tambahkan setiap siswa ke dalam daftar penilaian
      students.forEach(student => {
        emit('push', { admin_student_id: student.id })
      })
    }
  }
})

// 👉 Add item function
const addItem = () => {
  emit('push')
}

const removeItem = id => {
  emit('remove', id)
}

const isFormValid = computed(() => {
  const header = localData.value.header
  if (!header.year || !header.semester || !header.academy_competence_id)
    return false

  // Izinkan menyimpan jika tidak ada siswa,
  // tetapi jika ada, mereka harus valid.
  if (localData.value.studentScores.length > 0) {
    for (const score of localData.value.studentScores) {
      // Setiap baris skor harus memiliki siswa yang dipilih.
      if (!score.admin_student_id)
        return false
    }
  }

  // Form valid jika semua siswa telah ditambahkan atau tidak ada siswa sama sekali.
  return localData.value.studentScores.length > 0
})

const isLoading = ref(false)
const router = useRouter()

const saveAssessment = async () => {
  isLoading.value = true

  // 1. Siapkan payload dari data lokal.
  const payload = toRaw(localData.value)

  // Tambahkan serial number jika ini adalah data yang sudah ada.
  // Jika 'new', biarkan backend yang membuat serial number baru.
  if (props.serialNumber !== 'new') {
    payload.header.serial = props.serialNumber
  }

  console.log('Payload:', payload)
  
  try {
    // 2. Panggil API backend untuk menyimpan/memperbarui data.
    const { data: response, error } = await useApi('/scores/bulk-store', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })

    if (error.value) {
      // Tangani error validasi 422 dari Laravel
      if (error.value.data?.errors) {
        const validationErrors = error.value.data.errors
        const firstErrorKey = Object.keys(validationErrors)[0]
        const firstErrorMessage = validationErrors[firstErrorKey][0]

        // Ganti alert ini dengan komponen notifikasi/snackbar yang lebih baik
        showAlert(`Save failed: ${firstErrorMessage}`, 'error')
      } else if (error.value.data?.message) {
        showAlert(`An error occurred: ${error.value.data.message}`, 'error')
      } else {
        // Fallback untuk error lainnya
        showAlert('An unknown error occurred while saving. Please check the console.', 'error')
      }
      console.error('Error saving assessment:', error.value)
    } else {
      // 3. Jika berhasil, arahkan ke halaman edit dengan serial number yang baru/diperbarui.
      router.push(`/academy/assessment/scores/edit/${response.value.data.serial}`)
      showAlert('Data berhasil disimpan!', 'success')
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <VAlert
    v-model="isAlertVisible"
    closable
    class="mb-6"
    :color="alertColor"
  >
    {{ alertMessage }}
  </VAlert>
    
  <VCard>
    <!-- SECTION Header -->

    <VCardText class="d-flex flex-wrap justify-space-between gap-y-5 flex-column flex-sm-row">
      <!-- 👉 Left Content -->
      <div
        v-if="school?.data?.length"
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
            {{ themeConfig.app.title }}
          </h6>
        </div>

        <!-- 👉 Address -->
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
      </div>

      <!-- 👉 Right Content -->
      <div class="mt-4 ma-sm-4">
        <!-- 👉 Invoice Id -->
        <h6 class="d-flex align-center font-weight-medium justify-sm-end text-xl mb-3">
          <span>
            <AppTextField
              :model-value="props.serialNumber"
              disabled
              prefix="#"
              density="compact"
              style="inline-size: 9.5rem;"
            />
          </span>
        </h6>
      </div>
    </VCardText>
    <!-- !SECTION -->

    <VDivider />

    <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row">
      <VRow>
        <VCol
          cols="12"
          sm="6"
          md="2"
        >
          <AppSelect
            v-model="localData.header.year"
            :items="years"
            item-title="year"
            item-value="year"
            placeholder="Period"
            density="compact"
            label="Period"
          />
        </VCol>
        <VCol
          cols="12"
          sm="6"
          md="2"
        >
          <AppSelect
            v-model="localData.header.semester"
            :items="[1, 2, 3, 4, 5, 6]"
            placeholder="Semester"
            density="compact"
            label="Semester"
          />
        </VCol>
        <VCol
          cols="12"
          sm="6"
          md="5"
        >
          <AppSelect
            v-model="localData.header.academy_competence_id"
            :items="competencesOptions"
            item-title="title"
            item-value="id"
            placeholder="Competence"
            density="compact"
            label="Subject"
          />
        </VCol>
        <VCol
          cols="12"
          sm="6"
          md="3"
        >
          <AppTextField
            v-model="localData.header.teacher"
            label="Teacher"
          />
        </VCol>
      </VRow>
    </VCardText>

    <VDivider />

    <!-- 👉 Add score item -->
    <VCardText class="add-products-form">
      <div
        v-for="(score, index) in localData.studentScores"
        :key="index"
        class="my-4 ma-sm-4"
      >
        <AssessmentItemEdit
          :id="index"
          :data="score"
          :semester="localData.header.semester"
          @update:data="newScore => updateStudentScore(index, newScore)"
          @remove="removeItem"
        />
      </div>
      
      <div class="d-flex justify-content-between align-items-center mt-6 w-100">
        <!-- 👉 Kiri -->
        <div class="ms-sm-4">
          <VBtn @click="addItem">
            Add Item
          </VBtn>
        </div>
        <VSpacer />
        <!-- 👉 Kanan -->
        <div class="d-flex gap-x-4 me-sm-4 flex-end">
          <VBtn
            color="secondary"
            variant="tonal"
            @click="router.go(-1)"
          >
            Exit
          </VBtn>
          <VBtn
            :loading="isLoading"
            :disabled="!isFormValid"
            color="success"
            @click="saveAssessment"
          >
            Save Assessment
          </VBtn>
        </div>
      </div>
    </VCardText>

    <VDivider />
    
    <VCardText>
      <VRow>
        <VCol cols="12 text-center">
          <span class="text-disabled px-4">D : Belum Mampu</span>
          <span class="text-disabled px-4">C : Perlu Bimbingan</span>
          <span class="text-disabled px-4">B : Mampu</span>
          <span class="text-disabled px-4">A : Sangat Mampu</span>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
