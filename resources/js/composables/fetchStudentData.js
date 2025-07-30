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

export const fetchStudentById = async id => {
  const { data: studentData, error: studentError } = await useApi(`/public/students/${id}`)
  if (studentError.value) {
    console.log('Student Error:', studentError.value)
  } else {
    if (studentData.value) {
      students.value = [studentData.value.data]
    }
  }
}

export const fetchStudents = async ({
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

  const { data: studData, error: studError } = await useApi(`/public/students-show?${params.toString()}`)

  if (studError.value) {
    console.error('Error fetching students:', studError.value)
    throw new Error(studError.value)
  }

  return {
    users: studData.value?.data || [],
    totalPages: studData.value?.totalPages || 0,
    totalUsers: studData.value?.count || 0,
    page: studData.value?.page || 1,
  }
}
