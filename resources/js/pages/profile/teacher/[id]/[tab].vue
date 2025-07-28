<script setup>
import { useApi } from '@/composables/useApi'
import AccountSettingsAccount from '@/views/profile/teacher/account/AccountSettingsAccount.vue'
import AccountSettingsOthers from '@/views/profile/teacher/account/AccountSettingsOthers.vue'
import AccountSettingsRoles from '@/views/profile/user/security/AccountSettingsRoles.vue'
import AccountSettingsSecurity from '@/views/profile/user/security/AccountSettingsSecurity.vue'

const route = useRoute('profile-teacher-id-tab')

const activeTab = computed({
  get: () => route.params.tab,
  set: () => route.params.tab,
})

const teacherId = computed(() => route.params.id)
const teacher = ref(null)
const isLoading = ref(false)
const error = ref(null)
const userData = useCookie('userData')

const canShowMenu = computed(() => {
  return teacherId.value == userData.value?.admin_teacher_id
})

// 👉 Alert
const isAlertVisible = ref(false)
const alertMessage = ref('')
const alertColor = ref('primary')

const showAlert = (message, color = 'primary') => {
  alertMessage.value = message
  alertColor.value = color
  isAlertVisible.value = true
  setTimeout(() => {
    isAlertVisible.value = false
  }, 10000)
}

const fetchTeacher = async () => {
  isLoading.value = true
  error.value = null

  try {
    const response = await useApi(`/public/teachers/${teacherId.value}`)

    teacher.value = response.data.value.data ?? null
    console.log('teacher data:', teacherId.value, teacher.value)
  } catch (err) {
    error.value = err
    console.error('Failed to fetch teacher:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchTeacher)

// tabs
const tabs = [
  {
    title: 'Account',
    icon: 'tabler-users',
    tab: 'account',
  },
  {
    title: 'Others data',
    icon: 'tabler-link',
    tab: 'others',
  },
  {
    title: 'Security',
    icon: 'tabler-lock',
    tab: 'security',
  },
  {
    title: 'Roles',
    icon: 'tabler-bell',
    tab: 'roles',
  },
]

definePage({ meta: { navActiveLink: 'profile-teacher-id-tab' } })

const updateTeacher = async (teacherId, userData) => {
  console.log('Updating Teacher:', teacherId, userData)
  try {
    const { data, response } = await useApi(`/teachers/${teacherId}`, {
      method: 'PATCH',
      body: JSON.stringify(userData), // kirim data dalam format JSON
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })

    if (response.value.ok) {
      showAlert('Data berhasil diperbarui', 'success')
      console.log('teacher updated:', data)
    } else {
      showAlert(response.value.statusText || 'Gagal memperbarui data', 'error')
      console.error('Update error response:', response.value)
    }
    
  } catch (error) {
    console.error('Update teacher error:', error?.data?.errors || error)
    showAlert(error.message || 'Gagal memperbarui data', 'error')
  }
}
</script>

<template>
  <div>
    <VTabs
      v-model="activeTab"
      class="v-tabs-pill"
    >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
        :to="{ name: 'profile-teacher-id-tab', params: { tab: item.tab } }"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        {{ item.title }}
      </VTab>
    </VTabs>

    <VSnackbar
      v-model="isAlertVisible"
      location="center"
      variant="tonal"
      transition="scale-transition"
      :color="alertColor"
      class="text-center"
    >
      {{ alertMessage }}
      <template #actions>
        <VBtn
          :color="alertColor"
          @click="isAlertVisible = false"
        >
          Close
        </VBtn>
      </template>
    </VSnackbar>

    <VWindow
      v-model="activeTab"
      class="mt-6 disable-tab-transition"
      :touch="false"
    >
      <!-- Account -->
      <VWindowItem value="account">
        <AccountSettingsAccount
          :teacher="teacher"
          @user-data="updateTeacher(teacherId, $event)"
        />
      </VWindowItem>

      <!-- others -->
      <VWindowItem value="others">
        <AccountSettingsOthers
          :teacher="teacher"
          @user-data="updateTeacher(teacherId, $event)"
        />
      </VWindowItem>

      <!-- Security -->
      <VWindowItem value="security">
        <AccountSettingsSecurity v-if="canShowMenu" />
      </VWindowItem>

      <!-- roles -->
      <VWindowItem value="roles">
        <AccountSettingsRoles v-if="canShowMenu" />
      </VWindowItem>
    </VWindow>
  </div>
</template>
