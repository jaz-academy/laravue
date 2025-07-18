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
