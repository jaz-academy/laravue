<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const router = useRouter()
const ability = useAbility()

// TODO: Get type from backend
const userData = useCookie('userData')
const userAbilityRules = useCookie('userAbilityRules').value[0]
const accountPage = ref({})

// Pastikan userData.value ada dulu
if (userData.value) {
  if (userData.value.admin_teacher_id && userData.value.admin_teacher_id > 0) {
    accountPage.value = {
      name: 'profile-teacher-id-tab',
      params: { id: userData.value.admin_teacher_id, tab: 'account' },
    }
  } else if (userData.value.admin_student_id) {
    accountPage.value = {
      name: 'profile-student-id-tab',
      params: { id: userData.value.admin_student_id, tab: 'account' },
    }
  }
}

const logout = async () => {

  // Remove "accessToken" from cookie
  useCookie('accessToken').value = null

  // Remove "userData" from cookie
  userData.value = null

  // Redirect to login page
  await router.push('/')

  // ℹ️ We had to remove abilities in then block because if we don't nav menu items mutation is visible while redirecting user to login page

  // Remove "userAbilities" from cookie
  useCookie('userAbilityRules').value = null

  // Reset ability to initial ability
  ability.update([])
  console.log('You Logged out!')
}

const userProfileList = [
  { type: 'divider' },
  {
    type: 'navItem',
    icon: 'tabler-users',
    title: 'Users',
    to: { name: 'profile-users' },
  },
  {
    type: 'navItem',
    icon: 'tabler-settings',
    title: 'Account',
    to: accountPage.value,
  },
  {
    type: 'navItem',
    icon: 'tabler-help-circle',
    title: 'Manual',
    to: { name: 'pages-faq' },
  },
  { type: 'divider' },
  {
    type: 'navItem',
    icon: 'tabler-logout',
    title: 'Logout',
    onClick: logout,
  },
]
</script>

<template>
  <VBadge
    v-if="userData"
    dot
    bordered
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
  >
    <VAvatar
      class="cursor-pointer overflow-hidden"
      :color="!(userData?.image) ? 'primary' : undefined"
      :variant="!(userData?.image) ? 'tonal' : undefined"
    >
      <VImg
        v-if="userData?.image"
        cover
        :src="`/storage/${userData.image}`"
      />
      <VIcon
        v-else
        icon="tabler-user"
      />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                  bordered
                >
                  <VAvatar
                    class="cursor-pointer overflow-hidden"
                    :color="!(userData?.image) ? 'primary' : undefined"
                    :variant="!(userData?.image) ? 'tonal' : undefined"
                  >
                    <VImg
                      v-if="userData?.image"
                      cover
                      :src="`/storage/${userData.image}`"
                    />
                    <VIcon
                      v-else
                      icon="tabler-user"
                    />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-medium">
              {{ userData.name || userData.email }}
            </VListItemTitle>
            <VListItemSubtitle>{{ userAbilityRules.member }}</VListItemSubtitle>
          </VListItem>

          <PerfectScrollbar :options="{ wheelPropagation: false }">
            <template
              v-for="item in userProfileList"
              :key="item.title"
            >
              <VListItem
                v-if="item.type === 'navItem'"
                :to="item.to"
                @click="item.onClick && item.onClick()"
              >
                <template #prepend>
                  <VIcon
                    class="me-2"
                    :icon="item.icon"
                    size="22"
                  />
                </template>

                <VListItemTitle>{{ item.title }}</VListItemTitle>

                <template
                  v-if="item.badgeProps"
                  #append
                >
                  <VBadge v-bind="item.badgeProps" />
                </template>
              </VListItem>

              <VDivider
                v-else
                class="my-2"
              />
            </template>
          </PerfectScrollbar>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
