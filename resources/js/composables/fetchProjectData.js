import { useApi } from '@/composables/useApi'
import { ref } from 'vue'

export const plansTasks = ref([])
export const plans = ref([])
export const tasks = ref([])
export const homeTasks = ref([])
export const uploadTasks = ref([])
export const instagramTasks = ref([])

export const fetchProjectData = async () => {
  const { data: plansTasksData, error: plansTasksError } = await useApi(`/public/plans-with-tasks`)
  if (plansTasksError.value) {
    console.log('Plans Error:', plansTasksError.value)
  } else {
    if (plansTasksData.value) {
      plansTasks.value = plansTasksData.value.data
    }
  }
  
  const { data: plansData, error: plansError } = await useApi(`/public/plans`)
  if (plansError.value) {
    console.log('Plans Error:', plansError.value)
  } else {
    if (plansData.value) {
      plans.value = plansData.value.data
    }
  }
  
  const { data: tasksData, error: tasksError } = await useApi(`/public/tasks`)
  if (tasksError.value) {
    console.log('Tasks Error:', tasksError.value)
  } else {
    if (tasksData.value) {
      tasks.value = tasksData.value.data
    }
  }

  const { data: homeTasksData, error: homeTasksError } = await useApi(`/public/home-tasks-with-all`)
  if (homeTasksError.value) {
    console.log('Tasks Error:', homeTasksError.value)
  } else {
    if (homeTasksData.value) {
      homeTasks.value = homeTasksData.value.data
    }
  }

  const { data: uploadTasksData, error: uploadTasksError } = await useApi(`/public/upload-tasks-with-all`)
  if (uploadTasksError.value) {
    console.log('Tasks Error:', uploadTasksError.value)
  } else {
    if (uploadTasksData.value) {
      uploadTasks.value = uploadTasksData.value.data
    }
  }

  const { data: instagramTasksData, error: instagramTasksError } = await useApi(`/public/instagram-tasks-with-all`)
  if (instagramTasksError.value) {
    console.log('Tasks Error:', instagramTasksError.value)
  } else {
    if (instagramTasksData.value) {
      instagramTasks.value = instagramTasksData.value.data
    }
  }
}

