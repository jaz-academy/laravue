<script setup>
import AppTextarea from '@/@core/components/app-form-elements/AppTextarea.vue'
import AppTextField from '@/@core/components/app-form-elements/AppTextField.vue'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  semester: {
    type: Number,
    default: null,
  },
})

const emit = defineEmits([
  'remove',
  'update:data',
])

// Buat salinan lokal dari prop agar tidak mengubahnya secara langsung (menghindari anti-pattern)
const localScoreData = ref(structuredClone(toRaw(props.data)))
let isUpdatingFromProp = false

const generateMonth = () => {
  if (props.semester === null) {
    return { semester: null, monthName: [] }
  }
  const semesterType = props.semester % 2 === 0 ? 'genap' : 'ganjil'

  const monthName = semesterType === 'genap'
    ? ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni']
    : ['Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

  return { semester: semesterType, monthName }
}


// Ketika data lokal berubah, emit event ke parent
watch(localScoreData, newValues => {
  if (!isUpdatingFromProp) {
    emit('update:data', newValues)
  }
}, { deep: true })

// Jika prop dari parent berubah (misalnya saat data dari API selesai dimuat), update data lokal
watch(() => props.data, newValues => {
  isUpdatingFromProp = true
  localScoreData.value = structuredClone(toRaw(newValues))
  nextTick(() => {
    isUpdatingFromProp = false
  })
}, { deep: true })

const students = ref([]) // Anda perlu mengisi ini dengan data siswa dari API

const fetchStudents = async () => {
  const { data } = await useApi('/students')

  if (data.value?.data) {
    // Urutkan data siswa berdasarkan nama secara alfabetis
    const sortedStudents = data.value.data.sort((a, b) => a.name.localeCompare(b.name))

    students.value = sortedStudents
  }
}

fetchStudents()

const removeItem = () => {
  emit('remove', props.id)
}

const ticksLabels = { 0: 'D', 1: 'C', 2: 'B', 3: 'A' }
</script>

<template>
  <div class="mb-4">
    <VRow class="font-weight-medium py-2">
      <VCol
        cols="12"
        md="4"
      >
        <AppSelect
          v-model="localScoreData.admin_student_id"
          :items="students"
          item-title="name"
          item-value="id"
          placeholder="Select Student"
          density="compact"
        />
      </VCol>
      <VSpacer />
      <VCol
        cols="12"
        md="2"
      >
        <AppTextField
          v-model.number="localScoreData['final_score']"
          type="number"
        />
      </VCol>
    </VRow>
  </div>

  <VCard
    flat
    border
    class="d-flex flex-row"
  >
    <!-- 👉 Left Form -->
    <div class="pa-5 flex-grow-1">
      <VRow>
        <VCol
          v-for="i in 6"
          :key="i"
          cols="4"
          md="2"
        >
          <AppTextField
            v-model.number="localScoreData[`month_${i}`]"
            :label="generateMonth().monthName[i - 1] || `Month ${i}`"
            placeholder="0"
            type="number"
          />
        </VCol>
      </VRow>
      <VRow>
        <VCol
          v-for="i in 3"
          :key="i"
          cols="12"
          md="4"
        >
          <AppTextarea
            v-model="localScoreData[`competence_${i}`]"
            :label="i == 1 ? 'Kompetensi Dasar' : i == 2 ? 'Kompetensi Standar' : 'Kompetensi Unggulan'"
            placeholder="Write Description"
            row-height="30"
            rows="4"
            auto-grow
          />
          <VSlider
            v-model="localScoreData[`is_ok_${i}`]"
            :ticks="ticksLabels"
            :thumb-size="18"
            :max="3"
            step="1"
            show-ticks="always"
            tick-size="4"
          />
        </VCol>
      </VRow>
    </div>

    <!-- 👉 Item Actions -->
    <div class="d-flex flex-column justify-space-between border-s pa-1">
      <IconBtn @click="removeItem">
        <VIcon
          size="20"
          icon="tabler-x"
        />
      </IconBtn>

      <IconBtn>
        <VIcon
          size="20"
          icon="tabler-settings"
        />
      </IconBtn>
    </div>
  </VCard>
</template>
