<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'

const props = defineProps({
  mode: {
    type: String,
    required: true, // 'add' or 'edit'
  },
  selectedData: {
    type: Object,
    required: false,
    default: () => ({
      id: null,
      title: '',
      amount: 0,
      icon: '',
      color: '',
    }),
  },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'submit',
  'delete',
  'update:isDialogVisible',
])

const refForm = ref()
const dialogTitle = computed(() => props.mode === 'add' ? 'Add Deposit' : 'Edit Deposit')
const submitButtonText = computed(() => props.mode === 'add' ? 'Submit' : 'Update')

const icons = [
  { label: 'Bank', value: 'tabler-building-bank' },
  { label: 'Piggy Bank', value: 'tabler-pig-money' },
  { label: 'Wallet', value: 'tabler-wallet' },
  { label: 'Credit Card', value: 'tabler-credit-card' },
  { label: 'Cash', value: 'tabler-cash' },
]

const colors = [
  { text: 'Primary', value: 'primary' },
  { text: 'Warning', value: 'warning' },
  { text: 'Info', value: 'info' },
  { text: 'Success', value: 'success' },
  { text: 'Error', value: 'error' },
  { text: 'Secondary', value: 'secondary' },
]

const deposit = ref(structuredClone(toRaw(props.selectedData)))

watch(() => props.isDialogVisible, isVisible => {
  if (isVisible) {
    // Reset form with new data when dialog opens
    deposit.value = structuredClone(toRaw(props.selectedData))
  }
})

const onFormSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      emit('update:isDialogVisible', false)
      emit('submit', { mode: props.mode, data: deposit.value })
    }
  })
}

const onFormReset = () => {
  emit('update:isDialogVisible', false)
}

const onFormDelete = () => {
  if (deposit.value.id) {
    emit('delete', deposit.value.id)
  }
}

const dialogModelValueUpdate = val => {
  emit('update:isDialogVisible', val)
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 420 "
    :model-value="props.isDialogVisible"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />

    <VCard class="pa-sm-8 pa-5">
      <VCardItem class="text-center">
        <VCardTitle class="text-h3 mb-3">          
          {{ dialogTitle }}
        </VCardTitle>
        <p class="mb-0">
          Tambahkan Deposit Saldo baru.
        </p>
      </VCardItem>

      <VCardText>
        <!-- 👉 Form -->
        <VForm
          ref="refForm"
          class="mt-4"
          @submit.prevent="onFormSubmit"
        >
          <VRow>
            <!-- 👉 Title -->
            <VCol cols="12">
              <AppTextField
                v-model="deposit.title"
                :rules="[requiredValidator]"
                label="Title"
                placeholder="Deposit Account"
              />
            </VCol>

            <!-- 👉 Amount -->
            <VCol cols="12">
              <AppTextField
                v-model="deposit.amount"
                :rules="[requiredValidator]"
                label="amount"
                placeholder="Deposit Amount"
                type="number"
              />
            </VCol>

            <!-- 👉 Icon -->
            <VCol cols="12">
              <AppSelect
                v-model="deposit.icon"
                label="Deposit Icon"
                placeholder="Deposit Icon"
                :items="icons"
                item-title="label"
                item-value="value"
              >
                <!-- tampilan list item -->
                <template #item="{ props, item }">
                  <VListItem v-bind="props">
                    <VIcon
                      :icon="item.raw.value"
                      class="me-2"
                    />
                    <span> {{ item.raw.label }}</span>
                  </VListItem>
                </template>

                <!-- tampilan item terpilih -->
                <template #selection="{ item }">
                  <VIcon
                    :icon="item.raw.value"
                    class="me-2"
                  />
                  <span> {{ item.raw.label }}</span>
                </template>
              </AppSelect>
            </VCol>

            <!-- 👉 Color -->
            <VCol cols="12">
              <AppSelect
                v-model="deposit.color"
                label="Deposit Color"
                placeholder="Deposit Color"
                :items="colors"
                item-title="text"
                item-value="value"
              />
            </VCol>

            <!-- 👉 Submit and Cancel -->
            <VCol
              cols="12"
              class="d-flex flex-wrap justify-center gap-4 mt-6"
            >
              <VBtn type="submit">
                {{ submitButtonText }}
              </VBtn>
              
              <VBtn
                color="secondary"
                variant="tonal"
                @click="onFormReset"
              >
                Cancel
              </VBtn>
            
              <VBtn
                v-if="props.mode === 'edit'"
                color="error"
                variant="tonal"
                @click="onFormDelete"
              >
                Delete
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
