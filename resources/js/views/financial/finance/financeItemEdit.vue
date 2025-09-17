<script setup>
import AppTextField from '@/@core/components/app-form-elements/AppTextField.vue'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits([
  'remove',
  'update:data',
])

// Buat salinan lokal dari prop agar tidak mengubahnya secara langsung (menghindari anti-pattern)
const localData = ref(structuredClone(toRaw(props.data)))
let isUpdatingFromProp = false

// Ketika data lokal berubah, emit event ke parent
watch(localData, newValues => {
  if (!isUpdatingFromProp) {
    emit('update:data', newValues)
  }
}, { deep: true })

// Jika prop dari parent berubah (misalnya saat data dari API selesai dimuat), update data lokal
watch(() => props.data, newValues => {
  isUpdatingFromProp = true
  localData.value = structuredClone(toRaw(newValues))
  nextTick(() => {
    isUpdatingFromProp = false
  })
}, { deep: true })

const removeItem = () => {
  emit('remove', props.id)
}
</script>

<template>
  <VCard
    flat
    border
    class="d-flex flex-row"
  >
    <!-- 👉 Left Form -->
    <div class="pa-5 flex-grow-1">
      <VRow>
        <VCol
          cols="12"
          sm="8"
        >
          <AppTextField
            v-model="localData.description"
            label="Description"
            placeholder="Write Description"
          />
        </VCol>
        <VCol
          cols="12"
          sm="4"
        >
          <AppTextField
            v-model="localData.amount"
            label="Amount"
            placeholder="Amount"
          />
        </VCol>
      </VRow>
    </div>

    <!-- 👉 Item Actions -->
    <div class="d-flex flex-column justify-space-between border-s pa-1">
      <IconBtn @click="removeItem">
        <VIcon
          size="20"
          icon="tabler-x"
        />
      </IconBtn>

      <IconBtn>
        <VIcon
          size="20"
          icon="tabler-settings"
        />
      </IconBtn>
    </div>
  </VCard>
</template>
