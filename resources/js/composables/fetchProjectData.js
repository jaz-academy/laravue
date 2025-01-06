import { useApi } from '@/composables/useApi'
import { ref } from 'vue'

export const plansTasks = ref([])
export const plans = ref([])
export const tasks = ref([])

export const fetchProjectData = async () => {
  const { data: plansTasksData, error: plansTasksError } = await useApi(`/public/plans-with-tasks`)
  if (plansTasksError.value) {
    console.log('Plans Error:', plansTasksError.value)
  } else {
    if (plansTasksData.value) {
      plansTasks.value = plansTasksData.value.data
    }
  }
  
  const { data: plansData, error: plansError } = await useApi(`/public/plans-with-tasks`)
  if (plansError.value) {
    console.log('Plans Error:', plansError.value)
  } else {
    if (plansData.value) {
      plans.value = plansData.value.data
    }
  }

  const { data: tasksData, error: tasksError } = await useApi(`/tasks`)
  if (tasksError.value) {
    console.log('Tasks Error:', tasksError.value)
  } else {
    if (tasksData.value) {
      tasks.value = tasksData.value.data
    }
  }
}

