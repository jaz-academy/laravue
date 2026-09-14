import { ref, shallowRef, reactive } from 'vue'
import { $api } from '@/utils/api'

// Global in-memory cache shared across all components and page views
const memoryCache = new Map()

// In-flight request deduplication map
const pendingRequests = new Map()

/**
 * Enhanced API Composable with Stale-While-Revalidate (SWR) & In-Memory/Session Caching
 * Ensures data is loaded once and rendered instantly across page navigation.
 *
 * @param {string} endpoint - API endpoint relative to base URL (e.g., '/public/tasks/best')
 * @param {object} [options]
 * @param {number} [options.ttl=300000] - Cache time-to-live in ms (default: 5 minutes)
 * @param {boolean} [options.persist=true] - Persist to sessionStorage for instant loads across reloads
 * @param {boolean} [options.swr=true] - Stale-While-Revalidate: serve cached data instantly, refetch in background if stale
 * @param {boolean} [options.immediate=true] - Immediately execute fetch on call
 * @returns {{ data: Ref<any>, error: Ref<any>, loading: Ref<boolean>, isStale: Ref<boolean>, refresh: Function, clearCache: Function }}
 */
export function useCachedApi(endpoint, options = {}) {
  const {
    ttl = 5 * 60 * 1000, // 5 minutes default
    persist = true,
    swr = true,
    immediate = true,
  } = options

  const cacheKey = `jaz_cache_${endpoint}`
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)
  const isStale = ref(false)

  const isValidating = ref(false)

  // 1. Try to read from in-memory cache or sessionStorage
  const getCachedData = () => {
    // Check in-memory map first (fastest)
    if (memoryCache.has(cacheKey)) {
      return memoryCache.get(cacheKey)
    }

    // Check sessionStorage
    if (persist && typeof window !== 'undefined' && window.sessionStorage) {
      try {
        const item = sessionStorage.getItem(cacheKey)
        if (item) {
          const parsed = JSON.parse(item)
          // Populate memory cache
          memoryCache.set(cacheKey, parsed)
          return parsed
        }
      } catch (e) {
        console.warn('[useCachedApi] Failed to parse sessionStorage item', e)
      }
    }

    return null
  }

  // 2. Save to cache
  const setCachedData = (val) => {
    const entry = {
      data: val,
      timestamp: Date.now(),
    }
    memoryCache.set(cacheKey, entry)

    if (persist && typeof window !== 'undefined' && window.sessionStorage) {
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(entry))
      } catch (e) {
        // Storage quota exceeded or disabled
      }
    }
  }

  // 3. Clear cache
  const clearCache = () => {
    memoryCache.delete(cacheKey)
    if (persist && typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.removeItem(cacheKey)
    }
  }

  // 4. Fetch logic with in-flight deduplication
  const executeFetch = async (force = false) => {
    // If request already in-flight, reuse the same promise to prevent duplicate network calls
    if (pendingRequests.has(cacheKey)) {
      try {
        const result = await pendingRequests.get(cacheKey)
        data.value = result
        return result
      } catch (err) {
        error.value = err
        throw err
      }
    }

    if (!data.value) {
      loading.value = true
    }
    isValidating.value = true
    error.value = null

    const fetchPromise = $api(endpoint)
      .then(res => {
        const resultData = res?.data !== undefined ? res.data : res
        data.value = resultData
        setCachedData(resultData)
        isStale.value = false
        return resultData
      })
      .catch(err => {
        error.value = err
        console.error(`[useCachedApi] Fetch error for ${endpoint}:`, err)
        throw err
      })
      .finally(() => {
        loading.value = false
        isValidating.value = false
        pendingRequests.delete(cacheKey)
      })

    pendingRequests.set(cacheKey, fetchPromise)
    return fetchPromise
  }

  // 5. Initial resolution
  const cached = getCachedData()
  if (cached) {
    data.value = cached.data
    const age = Date.now() - cached.timestamp
    const expired = age > ttl

    if (expired) {
      isStale.value = true
      if (swr && immediate) {
        // Stale-While-Revalidate: data is already available instantly, silently refetch in background
        executeFetch(true).catch(() => {})
      }
    }
  } else if (immediate) {
    // Cache miss: execute network fetch
    executeFetch()
  }

  const refresh = () => executeFetch(true)

  return {
    data,
    error,
    loading,
    isValidating,
    isStale,
    refresh,
    clearCache,
  }
}
