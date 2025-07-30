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

export const fetchTeacherById = async id => {
  const { data: teacherData, error: teacherError } = await useApi(`/public/teachers/${id}`)
  if (teacherError.value) {
    console.log('Teacher Error:', teacherError.value)
  } else {
    if (teacherData.value) {
      teachers.value = [teacherData.value.data]
    }
  }
}

export const fetchTeachers = async ({
  q = '',
  status = '',
  city = '',
  year = '',
  itemsPerPage = 10,
  page = 1,
  sortBy = '',
  orderBy = 'asc',
}) => {
  // Build query string
  const params = new URLSearchParams({
    q,
    status,
    city,
    year,
    itemsPerPage,
    page,
    sortBy,
    orderBy,
  })

  const { data: teacherData, error: teacherError } = await useApi(`/public/teachers-show?${params.toString()}`)

  if (teacherError.value) {
    console.error('Error fetching teachers:', teacherError.value)
    throw new Error(teacherError.value)
  }

  return {
    users: teacherData.value?.data || [],
    totalPages: teacherData.value?.totalPages || 0,
    totalUsers: teacherData.value?.count || 0,
    page: teacherData.value?.page || 1,
  }
}
