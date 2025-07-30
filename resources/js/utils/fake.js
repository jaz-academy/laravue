import { ofetch } from 'ofetch'

export const $fake = ofetch.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/fake',
  async onRequest({ options }) {
    const accessToken = useCookie('accessToken').value
    if (accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      }
    }
  },
})
