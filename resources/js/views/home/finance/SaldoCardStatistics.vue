<script setup>
import { useApi } from '@/composables/useApi'
import AddDepositDialog from '@/views/financial/finance/AddDepositDialog.vue'

const currentUser = useCookie('userData')
const deposits = ref([])
const depositDialogVisible = ref(false)
const dialogMode = ref('add')
const selectedDeposit = ref({})

// Fetch deposits
const fetchDeposits = async () => {
  try {
    const { data } = await useApi('/deposits')

    const rawDeposits = data.value?.data || []
    const totalAmount = rawDeposits.reduce((sum, deposit) => sum + deposit.amount, 0)

    deposits.value = rawDeposits.map(d => ({
      ...d,
      value: new Intl.NumberFormat('id-ID').format(d.amount),
      change: totalAmount > 0 ? parseFloat(((d.amount / totalAmount) * 100).toFixed(0)) : 0,
      isHover: false,
    }))
  }
  catch (error) {
    showAlert('Failed to fetch deposits.', 'error')
    console.error(error)
  }
}

onMounted(fetchDeposits)

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

const openAddDepositDialog = () => {
  dialogMode.value = 'add'
  selectedDeposit.value = {
    title: '',
    amount: 0,
    icon: 'tabler-building-bank',
    color: 'primary',
  }
  depositDialogVisible.value = true
}

const openEditDepositDialog = deposit => {
  dialogMode.value = 'edit'
  selectedDeposit.value = JSON.parse(JSON.stringify(deposit)) // Deep copy
  depositDialogVisible.value = true
}

// Handle submit from dialog
const handleSubmit = async payload => {
  const { mode, data } = payload

  try {
    let apiResponse
    if (mode === 'add') {
      apiResponse = await useApi('/deposits', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
    }
    else {
      apiResponse = await useApi(`/deposits/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
    }
    if (apiResponse.response.value?.ok) {
      showAlert(`Deposit ${mode === 'add' ? 'added' : 'updated'} successfully.`, 'success')
      fetchDeposits()
    } else {
      const errorData = apiResponse.data.value
      const errorMessage = errorData?.errors ? Object.values(errorData.errors).flat().join('\n') : (errorData?.message || `Failed to ${mode} deposit.`)

      showAlert(errorMessage, 'error')
    }
  }
  catch (error) {
    showAlert(`Failed to ${mode} deposit.`, 'error')
    console.error(error)
  }
}

// Handle delete from dialog
const handleDelete = async id => {
  try {
    await useApi(`/deposits/${id}`, {
      method: 'DELETE',
    })
    showAlert('Deposit deleted successfully.', 'success')
    fetchDeposits()
  }
  catch (error) {
    showAlert('Failed to delete deposit.', 'error')
    console.error(error)
  }
  depositDialogVisible.value = false
}
</script>

<template>
  <VRow>
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
    
    <!-- Deposit Card Statistics WITH EDITS -->
    <VCol
      v-for="(data, index) in deposits"
      :key="index"
      cols="12"
      :md="deposits.length <= 2 ? 6 : deposits.length <= 4 ? 3 : deposits.length <= 6 ? 2 : 6"
      sm="6"
    >
      <div>
        <VCard
          class="logistics-card-statistics cursor-pointer"
          :style="data.isHover ? { 'border-block-end': `2px solid rgba(var(--v-theme-${data.color}))` } : { 'border-block-end': `2px solid rgba(var(--v-theme-${data.color}), var(--v-disabled-opacity))` }"
          @click="openEditDepositDialog(data)"
          @mouseenter="data.isHover = true"
          @mouseleave="data.isHover = false"
        >
          <VCardText>
            <div class="d-flex align-center gap-x-4 mb-2">
              <VAvatar
                variant="tonal"
                class="avatar-hover"
                :color="data.color"
                rounded
              >
                <VIcon
                  :icon="data.icon"
                  size="28"
                />
              </VAvatar>
              <h5 class="text-h5 font-weight-medium">
                {{ data.value }}
              </h5>
            </div>
            <div class="text-body-1">
              {{ data.title }}
            </div>
            <div class="d-flex gap-x-2">
              <h6 class="text-h6 font-weight-medium">
                {{ data.change }}%
              </h6>
              <span class="text-disabled">from Total</span>
            </div>
          </VCardText>
        </VCard>
      </div>
    </VCol>

    <!-- TAMBAH DEPOSIT BARU -->
    <VCol
      v-if="deposits.length == 0 || deposits.length % 2 !== 0 || currentUser.admin_teacher_id"
      :md="deposits.length <= 2 ? 6 : deposits.length <= 4 ? 3 : deposits.length <= 6 ? 2 : 6"
      cols="12"
      sm="6"
      @click="openAddDepositDialog"
    >
      <div>
        <VCard class="logistics-card-statistics cursor-pointer">
          <VCardText>
            <div class="d-flex align-center gap-x-4 mb-2">
              <VAvatar
                variant="tonal"
                class="avatar-hover"
                rounded
                size="85"
              >
                <VIcon
                  size="42"
                  icon="tabler-plus"
                />
              </VAvatar>
            </div>
          </VCardText>
        </VCard>
      </div>
    </VCol>

    <!-- 👉 Edit user info dialog -->
    <AddDepositDialog
      v-if="currentUser.admin_teacher_id"
      v-model:is-dialog-visible="depositDialogVisible"
      :mode="dialogMode"
      :selected-data="selectedDeposit"
      @submit="handleSubmit"
      @delete="handleDelete"
    />
  </VRow>
</template>

<style lang="scss" scoped>
@use "@core-scss/base/mixins" as mixins;

.logistics-card-statistics:hover {
  @include mixins.elevation(12);

  transition: all 0.1s ease-out;
}

.avatar-hover {
  transition: filter 0.3s, opacity 0.3s;
}

.avatar-hover:hover {
  filter: brightness(3); 
}

.avatar-hover:active {
  filter: brightness(0.7);
  transform: scale(0.95);
}
</style>
