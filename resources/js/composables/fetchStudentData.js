import { useApi } from '@/composables/useApi'
import { ref } from 'vue'

export const students = ref([])

export const fetchStudentData = async () => {
  const { data: studentsData, error: studentsError } = await useApi(`/public/students`)
  if (studentsError.value) {
    console.log('Students Error:', studentsError.value)
  } else {
    if (studentsData.value) {
      students.value = studentsData.value.data
    }
  }
}

