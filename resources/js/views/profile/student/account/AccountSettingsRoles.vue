<script setup>
import { fetchUserData } from '@/composables/fetchUserData'

const userData = useCookie('userData')
const userAbilityRules = useCookie('userAbilityRules').value[0]

const { user, isLoading, error } = fetchUserData()

const recentAccess = userData.value?.access?.split(',').map(item => item.trim()) || []
const selectedRole = ref(null)

const adminRolesOption = [
  { text: 'User', value: 1 },
  { text: 'Editor', value: 2 },
  { text: 'Administrator', value: 3 },
  { text: 'Manager', value: 4 },
  { text: 'Programmer', value: 5 },
]
</script>

<template>
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
            <AppTextField v-model="userAbilityRules.member" />
          </VCol>
          <VCol
            md="4"
            cols="12"
          >
            <AppTextField v-model="userAbilityRules.action" />
          </VCol>
          <VCol
            md="4"
            cols="12"
          >
            <AppTextField v-model="userAbilityRules.subject" />
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
            v-for="access in recentAccess"
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

    <VCardText>
      <VForm @submit.prevent="() => {}">
        <h6 class="text-base font-weight-medium mb-3">
          Admin Roles
        </h6>

        <VRow>
          <VCol
            cols="12"
            sm="6"
          >
            <AppSelect
              v-model="selectedRole"
              mandatory
              :items="adminRolesOption"
              item-title="text"
              item-value="value"
              placeholder="Select Role"
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
