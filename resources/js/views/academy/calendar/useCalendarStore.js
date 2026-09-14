import { useApi } from "@/composables/useApi"

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    availableCalendars: [
      { color: 'error', label: 'Important' },
      { color: 'primary', label: 'Academic' },
      { color: 'warning', label: 'Project' },
      { color: 'success', label: 'Task' },
      { color: 'info', label: 'Activity' },
    ],
    selectedCalendars: ['Important', 'Academic', 'Project', 'Task', 'Activity'],
    events: [], // ✅ Tambahin state khusus events
  }),
  actions: {
    async fetchEvents() {
      const res = await useApi('/events')
      const raw = res.data?.value ?? res.data
      const events = raw?.data ?? raw

      if (!Array.isArray(events)) {
        console.error("❌ Events is not array:", events)
        
        return []
      }

      // ✅ simpan di state
      this.events = events.map(e => ({
        id: e.id,
        title: e.title,
        start_date: e.start_date,
        end_date: e.end_date,
        description: e.description,
        remark: e.remark,
      }))

      return this.events // ✅ biar bisa di-.map() di luar
    },
    async addEvent(event) {
      await useApi('/events', {
        method: 'POST',
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(event),
      })
    },
    async updateEvent(event) {
      // pastikan id diambil dari object event
      const eventId = event.id  

      // jangan ikut sertakan id di payload
      const { id, ...rest } = event

      const payload = {
        ...rest,
        start_date: formatDate(rest.start_date),
        end_date: formatDate(rest.end_date),
      }

      try {
        const res = await useApi(`/events/${eventId}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(payload),
        })

        return res.data?.value ?? res.data
      } catch (error) {
        console.error("Update failed", error)
        throw error
      }
    },
    async removeEvent(eventId) {
      return await useApi(`/events/${eventId}`, { method: 'DELETE' })
    },
  },
})

