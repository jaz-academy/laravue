import { useApi } from '@/composables/useApi'
import { ref } from 'vue'

export const teachers = ref([])

export const fetchTeacherData = async () => {
  const { data: teachersData, error: teachersError } = await useApi(`/public/teachers`)
  if (teachersError.value) {
    console.log('Teachers Error:', teachersError.value)
  } else {
    if (teachersData.value) {
      teachers.value = teachersData.value.data
    }
  }
}

