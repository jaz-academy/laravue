import { useCookie } from '@/@core/composable/useCookie'
import { useApi } from '@/composables/useApi'
import { ref } from 'vue'

export const member = ref(null)
export const activities = ref(null)

export const fetchMemberData = async () => {
  const userData = useCookie('userData').value
  const isStudent = userData.admin_student_id
  let memberAPI
  let activitiesAPI

  if (isStudent != null && isStudent != undefined) {
    memberAPI = `/public/student/${userData.admin_student_id}`
    activitiesAPI = `/public/task-by-student/${userData.admin_student_id}`
  } else {
    memberAPI = `/public/teacher/${userData.admin_teacher_id}`
    activitiesAPI = `/public/task-by-teacher/${userData.admin_teacher_id}`
  }

  // Fetch member data
  const { data: memberData, error: memberError } = await useApi(memberAPI)
  if (memberError.value) {
    console.log('Member Error:', memberError.value)
  } else {
    console.log('Member Data:', memberData.value)

    if (memberData.value) {
      member.value = memberData.value.data
    }
  }

  // Fetch activities data
  const { data: activitiesData, error: activitiesError } = await useApi(activitiesAPI)
  if (activitiesError.value) {
    console.log('Activities Error:', activitiesError.value)
  } else {
    if (activitiesData.value) {
      activities.value = activitiesData.value.data
    }
  }
}
