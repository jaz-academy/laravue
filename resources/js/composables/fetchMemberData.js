import { useCookie } from '@/@core/composable/useCookie'
import { useApi } from '@/composables/useApi'
import { ref } from 'vue'

export const member = ref(null)
export const activities = ref(null)

export const fetchMemberData = async () => {
  const currentUser = useCookie('userData')
  const studentId = currentUser.value?.admin_student_id
  const teacherId = currentUser.value?.admin_teacher_id

  let memberAPI
  let activitiesAPI

  if (studentId) {
    memberAPI = `/public/student/${studentId}`
    activitiesAPI = `/public/task-by-student/${studentId}`
  } else if (teacherId) {
    memberAPI = `/public/teacher/${teacherId}`
    activitiesAPI = `/public/task-by-teacher/${teacherId}`
  } else {
    console.log('User ID not found, skipping fetch')
    
    return
  }

  // Fetch member data
  const { data: memberData, error: memberError } = await useApi(memberAPI)
  if (memberError.value) {
    console.log('Member Error:', memberError.value)
  } else if (memberData.value) {
    member.value = memberData.value.data
  }

  // Fetch activities data
  const { data: activitiesData, error: activitiesError } = await useApi(activitiesAPI)
  if (activitiesError.value) {
    console.log('Activities Error:', activitiesError.value)
  } else if (activitiesData.value) {
    activities.value = activitiesData.value.data
  }
}

