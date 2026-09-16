import { createFetch } from '@vueuse/core'
import { destr } from 'destr'

export const useApi = createFetch({
  baseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
  fetchOptions: {
    headers: {
      Accept: 'application/json',
      ContentType: 'application/json',
    },
  },
  options: {
    refetch: true,
    async beforeFetch({ options }) {
      const accessToken = useCookie('accessToken').value
      if (accessToken) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        }
      }
      
      return { options }
    },
    afterFetch(ctx) {
      const { data, response } = ctx

      // Parse data if it's JSON
      let parsedData = null
      try {
        parsedData = destr(data)
      }
      catch (error) {
        console.error(error)
      }
      
      return { data: parsedData, response }
    },
    onFetchError(ctx) {
      const { response, error } = ctx

      if (response?.status === 401) {
        // Clear stale credentials
        useCookie('accessToken').value = null
        useCookie('userData').value = null
        useCookie('userAbilityRules').value = null

        if (typeof window !== 'undefined') {
          const path = window.location.pathname
          const isPublic = ['/', '/login', '/register', '/about', '/contact', '/learning', '/project'].includes(path) || path.startsWith('/front')
          if (!isPublic) {
            window.location.href = `/login?to=${encodeURIComponent(path + window.location.search)}`
          }
        }
      }

      return { error, response }
    },
  },
})
