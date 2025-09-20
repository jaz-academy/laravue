<script setup>
import AssessmentEditable from '@/views/academy/assessment/edit/AssessmentEditable.vue'

const route = useRoute('academy-assessment-scores-edit-id')
const serialNumber = computed(() => route.params.id)

// assessmentData akan menampung semua data untuk halaman ini
const assessmentData = ref({
  header: {
    semester: null,
    academy_competence_id: null,
    teacher: '',
  },
  studentScores: [], // Array untuk menampung data skor per siswa
})

// Cek apakah ini halaman untuk edit (serial sudah ada) atau buat baru
if (serialNumber.value && serialNumber.value !== 'new') {
  // Panggil API yang benar untuk mengambil data skor berdasarkan serial
  const { data: scoresResponse } = await useApi(`/scores-by-serial/${serialNumber.value}`)

  if (scoresResponse.value && scoresResponse.value.data.length > 0) {
    const scores = scoresResponse.value.data
    
    // Asumsikan data header (kompetensi, semester, dll) sama untuk semua data dalam satu serial
    const firstScore = scores[0]
    
    assessmentData.value.header = {
      year: firstScore.admin_student?.registered,
      semester: firstScore.semester,
      academy_competence_id: firstScore.academy_competence_id,
      teacher: firstScore.academy_competence?.admin_teacher?.name,
    }
    assessmentData.value.studentScores = scores
  }
}

// Fungsi untuk menambah item/siswa baru ke dalam form
const addStudentScore = (studentData = {}) => {
  assessmentData.value?.studentScores.push({
    // Sediakan nilai default untuk skor baru
    admin_student_id: studentData.admin_student_id || null,
    month_1: 0, month_2: 0, month_3: 0, month_4: 0, month_5: 0, month_6: 0, final_score: 0,
    is_ok_1: 0, competence_1: '',
    is_ok_2: 0, competence_2: '',
    is_ok_3: 0, competence_3: '',
    ...studentData,
  })
}

const removeStudentScore = id => {
  assessmentData.value?.studentScores.splice(id, 1)
}
</script>

<template>
  <VRow>
    <!-- 👉 InvoiceEditable -->
    <VCol cols="12">
      <AssessmentEditable
        v-if="assessmentData"
        v-model:data="assessmentData"
        :serial-number="serialNumber"
        @push="addStudentScore"
        @remove="removeStudentScore"
      />
    </VCol>
  </VRow>
</template>
