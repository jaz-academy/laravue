import { useApi } from '@/composables/useApi'
import { onMounted, ref } from 'vue'

export const fetchUserData = () => {
  const user = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const fetchUser = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await useApi('/user')

      user.value = response.data?.value ?? null
      console.log('User Data:', user.value)


      // Simpan ke cookie jika mau
      const userCookie = useCookie('userData')

      userCookie.value = user.value
      
    } catch (err) {
      error.value = err
      console.error('Failed to fetch user:', err)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(fetchUser)

  return { user, isLoading, error }
}

export const fetchAllUsers = async ({
  q = '',
  page = 1,
  itemsPerPage = 10,
  sortBy = '',
  orderBy = 'asc',
}) => {
  // Build query string
  const params = new URLSearchParams({
    q,
    page,
    itemsPerPage,
    sortBy,
    orderBy,
  })

  const { data: usersData, error: usersError } = await useApi(`/users?${params.toString()}`)

  if (usersError.value) {
    console.error('Error fetching users:', usersError.value)
    throw new Error(usersError.value)
  }

  return {
    users: usersData.value?.data || [],
    totalPages: usersData.value?.totalPages || 0,
    totalUsers: usersData.value?.count || 0,
    page: usersData.value?.page || 1,
  }
}
