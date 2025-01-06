import { useCookie } from '@/@core/composable/useCookie'
import { useApi } from '@/composables/useApi'
import { ref } from 'vue'

export const member = ref(null)

export const fetchTimelineData = async () => {
  const userData = useCookie('userData').value
  const isStudent = userData.admin_student_id
  let memberAPI

  if (isStudent) {
    memberAPI = `/students/${userData.admin_student_id}`
  } else {
    memberAPI = `/teacher/${userData.admin_teacher_id}`
  }

  const { data, error } = await useApi(memberAPI)
  if (error.value) {
    console.log(error.value)
  } else {
    if (data.value) {
      member.value = data.value.data
    }
  }
}
