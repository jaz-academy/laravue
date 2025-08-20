<script setup>
import { useUserAccess } from '@/@core/utils/helpers'
import { fetchUserData } from '@/composables/fetchUserData'

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

const { currentUser, hasRole } = useUserAccess()
const { user, isLoading, error } = fetchUserData()
const selectedRole = ref(currentUser.value?.role ?? null)
const userAbilityRules = useCookie('userAbilityRules').value[0]

const selectedAccess = ref(
  (currentUser.value?.access ?? '')
    .split(',')
    .map(item => item.trim())
    .filter(Boolean),
)

const adminRolesOption = [
  { text: 'Annonimous', value: 0 },
  { text: 'Guest', value: 1 },
  { text: 'User', value: 2 },
  { text: 'Superuser', value: 3 },
  { text: 'Manager', value: 4 },
  { text: 'Programmer', value: 5 },
]

const adminAccessOption = [
  'Profile',
  'Project',
  'Awards',
  'Courses',
  'Assessment',
  'Saving',
  'Payment',
  'Finance',
]

const updateUserRole = async () => {
  if (!hasRole(4).value) {
    showAlert('You do not have permission to update roles', 'error')
    
    return
  }
  console.log('Updating user role with:', JSON.stringify({
    role: parseInt(selectedRole.value),
    access: selectedAccess.value.length > 0
      ? selectedAccess.value.filter(Boolean).join(',')
      : null,
  }))
  
  try {
    const response = await useApi('/user/role', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        role: parseInt(selectedRole.value),
        access: selectedAccess.value.length > 0
          ? selectedAccess.value.filter(Boolean).join(',')
          : null,
      }),
    })

    if (response.response.value.ok) {
      showAlert('Role and access updated successfully', 'success')
    } else {
      showAlert(response.response.value.statusText || 'Failed to update role and access', 'error')
      console.error('Error updating role and access:', response.response.value)
    }
  } catch (error) {
  // Ini tergantung isi dari error-nya
    const res = await error.response?.json?.() || {}

    // Ambil semua error
    const messages = Object.values(res.errors || {}).flat()

    // Tampilkan semua
    alert(messages.join('\n'))
  }
}
</script>

<template>
  <VAlert
    v-model="isAlertVisible"
    closable
    close-label="Close Alert"
    class="mb-6"
    :color="alertColor"
  >
    {{ alertMessage }}
  </VAlert>
  <VCard>
    <VCardItem>
      <VCardTitle>Access and Roles</VCardTitle>
      <p class="text-sm mt-2 mb-0">
        Can only be changed by the admin.
      </p>

      <VForm
        class="mt-4"
        @submit.prevent="() => {}"
      >
        <VRow>
          <!-- 👉 User Ability Roles -->
          <VCol
            md="4"
            cols="12"
          >
            <AppTextField
              v-model="userAbilityRules.member"
              readonly
            />
          </VCol>
          <VCol
            md="4"
            cols="12"
          >
            <AppTextField
              v-model="userAbilityRules.action"
              readonly
            />
          </VCol>
          <VCol
            md="4"
            cols="12"
          >
            <AppTextField
              v-model="userAbilityRules.subject"
              readonly
            />
          </VCol>
        </VRow>
      </VForm>
    </VCardItem>
    <VCardText>
      <VTable class="text-no-wrap rounded border">
        <thead>
          <tr>
            <th
              scope="col"
              style="inline-size: 70%;"
            >
              ACCESS
            </th>
            <th scope="col">
              VIEW
            </th>
            <th scope="col">
              EDIT
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="access in selectedAccess"
            :key="access"
          >
            <td>
              {{ access }}
            </td>
            <td>
              <VCheckbox />
            </td>
            <td>
              <VCheckbox />
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCardText>
    <VDivider />

    <VCardText v-if="hasRole(4).value">
      <VForm @submit.prevent="updateUserRole">
        <VRow>
          <VCol
            cols="12"
            sm="4"
          >
            <AppSelect
              v-model="selectedRole"
              :items="adminRolesOption"
              placeholder="Select Role"
              item-title="text"
              item-value="value"
              label="User Role"
            />
          </VCol>
          <VCol
            cols="12"
            sm="8"
          >
            <AppSelect
              v-model="selectedAccess"
              :items="adminAccessOption"
              placeholder="Select Access"
              label="User Access"
              multiple
            />
          </VCol>
        </VRow>

        <div class="d-flex flex-wrap gap-4 mt-4">
          <VBtn type="submit">
            Save Changes
          </VBtn>
          <VBtn
            color="secondary"
            variant="tonal"
            type="reset"
          >
            Reset
          </VBtn>
        </div>
      </VForm>
    </VCardText>
  </VCard>
</template>
