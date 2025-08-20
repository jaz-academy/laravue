import { useCalendarStore } from '@/views/apps/calendar/useCalendarStore'
import { useConfigStore } from '@core/stores/config'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'

export const blankEvent = {
  title: '',
  start: '',
  end: '',
  allDay: false,
  url: '',
  extendedProps: {
    /*
          ℹ️ We have to use undefined here because if we have blank string as value then select placeholder will be active (moved to top).
          Hence, we need to set it to undefined or null
        */
    calendar: undefined,
    guests: [],
    location: '',
    description: '',
  },
}
export const useCalendar = (event, isEventHandlerSidebarActive, isLeftSidebarOpen) => {
  const configStore = useConfigStore()

  // 👉 Store
  const store = useCalendarStore()

  // 👉 Calendar template ref
  const refCalendar = ref()


  // 👉 Calendar colors
  const calendarsColor = {
    Academic: 'primary',
    Task: 'success',
    Important: 'error',
    Project: 'warning',
    Activity: 'info',
  }


  // ℹ️ Extract event data from event API
  const extractEventDataFromEventApi = eventApi => {
    const { id, title, start, end, url, extendedProps: { calendar, guests, location, description }, allDay } = eventApi
    
    return {
      id,
      title,
      start,
      end,
      url,
      extendedProps: {
        calendar,
        guests,
        location,
        description,
      },
      allDay,
    }
  }

  if (typeof process !== 'undefined' && process.server)
    store.fetchEvents()


  // 👉 Fetch events
  const fetchEvents = (info, successCallback) => {
    if (!info) return

    store.fetchEvents()
      .then(r => {
      // Terapkan filter di sini, karena inilah sumber events yang dipakai FullCalendar
        const selected = new Set(store.selectedCalendars)
        const filtered = r.filter(e => selected.has(e.remark))

        successCallback(filtered.map(e => ({
          id: e.id,
          title: e.title,
          start: new Date(e.start_date),
          end: new Date(e.end_date),
          extendedProps: {
            calendar: e.remark,
            description: e.description,
          },
        })))
      })
      .catch(e => {
        console.error('Error occurred while fetching calendar events', e)
      })
  }




  // 👉 Calendar API
  const calendarApi = ref(null)


  // 👉 Update event in calendar [UI]
  const updateEventInCalendar = (updatedEventData, propsToUpdate, extendedPropsToUpdate) => {
    const existingEvent = calendarApi.value?.getEventById(String(updatedEventData.id))
    if (!existingEvent) {
      console.warn('Can\'t found event in calendar to update')
      
      return
    }

    // ---Set event properties except date related
    // Docs: https://fullcalendar.io/docs/Event-setProp
    // dateRelatedProps => ['start', 'end', 'allDay']
    for (let index = 0; index < propsToUpdate.length; index++) {
      const propName = propsToUpdate[index]

      existingEvent.setProp(propName, updatedEventData[propName])
    }

    // --- Set date related props
    // ? Docs: https://fullcalendar.io/docs/Event-setDates
    existingEvent.setDates(updatedEventData.start, updatedEventData.end, { allDay: updatedEventData.allDay })

    // --- Set event's extendedProps
    // ? Docs: https://fullcalendar.io/docs/Event-setExtendedProp
    for (let index = 0; index < extendedPropsToUpdate.length; index++) {
      const propName = extendedPropsToUpdate[index]

      existingEvent.setExtendedProp(propName, updatedEventData.extendedProps[propName])
    }
  }


  // 👉 Remove event in calendar [UI]
  const removeEventInCalendar = eventId => {
    const _event = calendarApi.value?.getEventById(eventId)
    if (_event)
      _event.remove()
  }


  // 👉 refetch events
  const refetchEvents = () => {
    calendarApi.value?.refetchEvents()
  }

  watch(() => store.selectedCalendars, refetchEvents)


  // 👉 Add event
  const addEvent = _event => {
    const payload = {
      title: _event.title,
      description: _event.extendedProps?.description ?? "",
      start_date: _event.start,
      end_date: _event.end,
      remark: _event.extendedProps?.calendar ?? "",
    }

    store.addEvent(payload)
      .then(() => {
        refetchEvents()
      })
  }

  // 👉 Update event
  const updateEvent = _event => {
    const payload = {
      id: _event.id,
      title: _event.title,
      description: _event.extendedProps?.description ?? "",
      start_date: _event.start,   // ✅ sesuai DB
      end_date: _event.end,       // ✅ sesuai DB
      remark: _event.extendedProps?.calendar ?? "",
    }

    store.updateEvent(payload)
      .then(res => {
        const updated = res.data?.data ?? payload

        const updatedEvent = {
          id: updated.id,
          title: updated.title,
          start: new Date(updated.start_date),
          end: new Date(updated.end_date),
          extendedProps: {
            calendar: updated.remark,
            description: updated.description,
          },
          allDay: _event.allDay,
        }

        // update UI di tempat
        const propsToUpdate = ['id', 'title']
        const extendedPropsToUpdate = ['calendar', 'description']

        updateEventInCalendar(updatedEvent, propsToUpdate, extendedPropsToUpdate)

        // refetch supaya sync benar-benar dari backend
        refetchEvents()
      })
      .catch(err => {
        console.error("Update failed", err)
      })
  }



  // 👉 Remove event
  const removeEvent = eventId => {
    store.removeEvent(eventId).then(() => {
      removeEventInCalendar(eventId)
    })
  }


  // 👉 Calendar options
  const calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'drawerToggler,prev,next title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
    },
    events: fetchEvents,

    // ❗ We need this to be true because when its false and event is allDay event and end date is same as start data then Full calendar will set end to null
    forceEventDuration: true,

    /*
        Enable dragging and resizing event
        Docs: https://fullcalendar.io/docs/editable
      */
    editable: true,

    /*
        Enable resizing event from start
        Docs: https://fullcalendar.io/docs/eventResizableFromStart
      */
    eventResizableFromStart: true,

    /*
        Automatically scroll the scroll-containers during event drag-and-drop and date selecting
        Docs: https://fullcalendar.io/docs/dragScroll
      */
    dragScroll: true,

    /*
        Max number of events within a given day
        Docs: https://fullcalendar.io/docs/dayMaxEvents
      */
    dayMaxEvents: 2,

    /*
        Determines if day names and week names are clickable
        Docs: https://fullcalendar.io/docs/navLinks
      */
    navLinks: true,
    eventClassNames({ event: calendarEvent }) {
      const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar]
      
      return [
        // Background Color
        `bg-light-${colorName} text-${colorName}`,
      ]
    },
    eventClick({ event: clickedEvent }) {
      // * Only grab required field otherwise it goes in infinity loop
      // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
      event.value = extractEventDataFromEventApi(clickedEvent)
      isEventHandlerSidebarActive.value = true
    },

    // customButtons
    dateClick(info) {
      event.value = { ...event.value, start: info.date }
      isEventHandlerSidebarActive.value = true
    },

    /*
          Handle event drop (Also include dragged event)
          Docs: https://fullcalendar.io/docs/eventDrop
          We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
        */
    eventDrop({ event: droppedEvent }) {
      updateEvent(extractEventDataFromEventApi(droppedEvent))
    },

    /*
          Handle event resize
          Docs: https://fullcalendar.io/docs/eventResize
        */
    eventResize({ event: resizedEvent }) {
      if (resizedEvent.start && resizedEvent.end)
        updateEvent(extractEventDataFromEventApi(resizedEvent))
    },
    customButtons: {
      drawerToggler: {
        text: 'calendarDrawerToggler',
        click() {
          isLeftSidebarOpen.value = true
        },
      },
    },
  }


  // 👉 onMounted
  onMounted(() => {
    calendarApi.value = refCalendar.value.getApi()
  })


  // 👉 Jump to date on sidebar(inline) calendar change
  const jumpToDate = currentDate => {
    calendarApi.value?.gotoDate(new Date(currentDate))
  }

  watch(() => configStore.isAppRTL, val => {
    calendarApi.value?.setOption('direction', val ? 'rtl' : 'ltr')
  }, { immediate: true })
  
  return {
    refCalendar,
    calendarOptions,
    calendarApi,
    refetchEvents,
    fetchEvents,
    addEvent,
    updateEvent,
    removeEvent,
    jumpToDate,
  }
}
