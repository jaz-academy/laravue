export const useCalendarStore = defineStore('calendar', {
  // arrow function recommended for full type inference
  state: () => ({
    availableCalendars: [
      {
        color: 'error',
        label: 'Personal',
      },
      {
        color: 'primary',
        label: 'Business',
      },
      {
        color: 'warning',
        label: 'Family',
      },
      {
        color: 'success',
        label: 'Holiday',
      },
      {
        color: 'info',
        label: 'ETC',
      },
    ],
    selectedCalendars: ['Personal', 'Business', 'Family', 'Holiday', 'ETC'],
  }),
  actions: {
    async fetchEvents() {
      const { data, error } = await useFake(createUrl('/apps/calendar', {
        query: {
          calendars: this.selectedCalendars,
        },
      }))

      if (error.value)
        return error.value
      
      return data.value
    },
    async addEvent(event) {
      await $fake('/apps/calendar', {
        method: 'POST',
        body: event,
      })
    },
    async updateEvent(event) {
      return await $fake(`/apps/calendar/${event.id}`, {
        method: 'PUT',
        body: event,
      })
    },
    async removeEvent(eventId) {
      return await $fake(`/apps/calendar/${eventId}`, {
        method: 'DELETE',
      })
    },
  },
})
