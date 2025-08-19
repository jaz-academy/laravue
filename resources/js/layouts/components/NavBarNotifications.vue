<script setup>
const { data: notifData, error } = useApi('/notifications').json()

const notifications = ref([])

watchEffect(() => {
  if (Array.isArray(notifData.value)) {
    notifications.value = notifData.value.map(n => ({
      id: n.id,
      title: n.data?.title ?? 'Notification',
      subtitle: n.data?.message ?? '',
      img: n.data?.img,
      text: n.data?.text || 'Abu Kafa',
      time: new Date(n.created_at).toLocaleString(),
      isSeen: n.read_at !== null,
    }))
  }
})

const removeNotification = async notificationId => {
  await useApi(`/notifications/${notificationId}`, { method: 'DELETE' })
  notifications.value = notifications.value.filter(item => item.id !== notificationId)
}

const markRead = async notificationId => {
  await useApi(`/notifications/${notificationId}/read`, { method: 'POST' })
  notifications.value.forEach(item => {
    notificationId.forEach(id => {
      if (id === item.id)
        item.isSeen = true
    })
  })
}

const markUnRead = async notificationId => {
  await useApi(`/notifications/${notificationId}/unread`, { method: 'POST' })
  notifications.value.forEach(item => {
    notificationId.forEach(id => {
      if (id === item.id)
        item.isSeen = false
    })
  })
}

const handleNotificationClick = notification => {
  if (!notification.isSeen)
    markRead([notification.id])
}
</script>

<template>
  <Notifications
    :notifications="notifications"
    @remove="removeNotification"
    @read="markRead"
    @unread="markUnRead"
    @click:notification="handleNotificationClick"
  />
</template>
