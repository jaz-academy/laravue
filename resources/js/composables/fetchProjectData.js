import { useApi } from '@/composables/useApi'
import { ref } from 'vue'

export const plansTasks = ref([])
export const plans = ref([])
export const tasks = ref([])
export const allTasks = ref([])
export const uploadTasks = ref([])
export const instagramTasks = ref([])
export const bookmarkTasks = ref([])
export const homeTasks = ref({ data: [], current_page: 1, last_page: 1 })
export const isLoading = ref(false)

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

  const { data: allTasksData, error: allTasksError } = await useApi(`/public/all-tasks`)
  if (allTasksError.value) {
    console.log('Tasks Error:', allTasksError.value)
  } else {
    if (allTasksData.value) {
      allTasks.value = allTasksData.value.data
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

export const useTasks = async (querystring = '') => {
  const { data: useTasksData, error } = await useApi(`/public/tasks${querystring}`)
  if (error.value) {
    console.error('Fetch Tasks Error:', error.value)
    
    return []
  } else {
    return useTasksData.value ? useTasksData.value.data : []
  }
}

export const fetchMoreHomeTasks = async page => {
  const { data: newTasksData, error } = await useApi(`/public/home-tasks-with-all?page=${page}`)
  if (error.value) {
    console.error('Fetch More Tasks Error:', error.value)
    
    return
  } else {
    return newTasksData.value ? newTasksData.value.data : []
  }
}

export const fetchMoreInstagramTasks = async page => {
  const { data: newInstagramTasks, error } = await useApi(`/public/instagram-tasks-with-all?page=${page}`)
  if (error.value) {
    console.error('Fetch More Tasks Error:', error.value)
    
    return
  } else {
    return newInstagramTasks.value ? newInstagramTasks.value.data : []
  }
}

export const fetchMoreUploadTasks = async page => {
  const { data: newInstagramTasks, error } = await useApi(`/public/upload-tasks-with-all?page=${page}`)
  if (error.value) {
    console.error('Fetch More Tasks Error:', error.value)
    
    return
  } else {
    return newInstagramTasks.value ? newInstagramTasks.value.data : []
  }
}

export const useBookmarkTasks = async id => {
  const { data: bookmarkTasksData, error: bookmarkTasksError } = await useApi(`/public/bookmarks-by-participant/${id}`)
  if (bookmarkTasksError.value) {
    console.log('Tasks Error:', bookmarkTasksError.value)
  } else {
    if (bookmarkTasksData.value) {
      bookmarkTasks.value = bookmarkTasksData.value.data
    }
  }
}


export const fetchTasksList = async ({
  admin_student_id = '',
  search = '',
  status = '',
  media = '',
  accepted = '',
  perPage = 10,
  page = 1,
  sortBy = '',
  orderBy = 'asc',
}) => {
  // Build query string
  const params = new URLSearchParams({
    admin_student_id,
    search,
    status,
    media,
    accepted,
    perPage,
    page,
    sortBy,
    orderBy,
  })

  const { data: taskData, error: taskError } = await useApi(`/public/tasks?${params.toString()}`)

  if (taskError.value) {
    console.error('Error fetching tasks:', taskError.value)
    throw new Error(taskError.value)
  }

  return {
    tasks: taskData.value?.data || [],
    totalPages: taskData.value?.totalPages || 0,
    totalTasks: taskData.value?.count || 0,
    page: taskData.value?.page || 1,
  }
}
