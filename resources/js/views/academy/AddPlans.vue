<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import { useUserAccess } from '@/@core/utils/helpers'
import { useApi } from '@/composables/useApi'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { VBtn } from 'vuetify/components/VBtn' // pastikan path benar
import { VForm } from 'vuetify/components/VForm'

const props = defineProps({
  isDrawerOpen: { type: Boolean, required: true },
  mode: { type: String, default: 'add' },
  planData: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['update:isDrawerOpen', 'planData'])

const subjectsData = await useApi('/subjects')

const subjectOptions = computed(() => {
  const groupsSet = new Set()

  subjectsData.data.value.data?.forEach(subject => {
    if (subject && subject.group) {
      groupsSet.add(subject.group)
    }
  })

  return Array.from(groupsSet).map(group => ({
    value: group,
    title: group,
  }))
})

const refVForm = ref()
const isFormValid = ref(false)
const { hasRole } = useUserAccess()

const form = reactive({
  subject: '',
  theme: '',
  description: '',
  start_date: '',
  end_date: '',
  is_active: 1,
})

watch(
  () => [props.planData, props.mode],
  () => {
    if (props.mode === 'edit' && props.planData) {
      Object.assign(form, {
        subject: props.planData.subject || '',
        theme: props.planData.theme || '',
        description: props.planData.description || '',
        start_date: props.planData.start_date || '',
        end_date: props.planData.end_date || '',
        is_active: props.planData.is_active ?? 1,
      })
    } else {
      Object.assign(form, {
        subject: '',
        theme: '',
        description: '',
        start_date: '',
        end_date: '',
        is_active: 1,
      })
    }
  },
  { immediate: true },
  console.log(typeof props.planData.is_active, props.planData.is_active),
  console.log(typeof form.is_active, form.is_active),
)

watch(
  () => props.isDrawerOpen,
  open => {
    if (!open) {
      refVForm.value?.reset()
      refVForm.value?.resetValidation()
    }
  },
)

const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}

const resetForm = () => {
  refVForm.value?.reset()
  refVForm.value?.resetValidation()
}

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (!valid) return

    const payload = { ...form }
    if (props.mode === 'edit') {
      payload.id = props.planData.id
      emit('planData', { action: 'update', data: payload })
    } else {
      emit('planData', { action: 'create', data: payload })
    }

    emit('update:isDrawerOpen', false)
    nextTick(resetForm)
  })
}
</script>

<template>
  <VNavigationDrawer
    :model-value="props.isDrawerOpen"
    temporary
    location="end"
    width="370"
    class="category-navigation-drawer scrollable-content"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <AppDrawerHeaderSection
      :title="props.mode === 'edit' ? 'Edit Plan' : 'Add New Plan'"
      @cancel="$emit('update:isDrawerOpen', false)"
    />

    <VDivider />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <VForm
            ref="refVForm"
            v-model="isFormValid"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <VCol cols="12">
                <AppSelect
                  v-model="form.subject"
                  label="Subject"
                  :rules="[requiredValidator]"
                  :items="subjectOptions"
                  placeholder="Choose Project Subject"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="form.theme"
                  label="Theme"
                  :rules="[requiredValidator]"
                  placeholder="Project Theme"
                />
              </VCol>

              <VCol cols="12">
                <AppTextarea
                  v-model="form.description"
                  label="Description"
                  placeholder="Write Description"
                  auto-grow
                />
              </VCol>

              <VCol cols="12">
                <AppDateTimePicker
                  v-model="form.start_date"
                  label="Date"
                  placeholder="Select date"
                />
              </VCol>

              <VCol cols="12">
                <AppDateTimePicker
                  v-model="form.end_date"
                  label="Deadline"
                  placeholder="Select date"
                />
              </VCol>

              <VCol cols="12">
                <AppSelect
                  v-model="form.is_active"
                  placeholder="Select Status"
                  label="Status"
                  :rules="[requiredValidator]"
                  :items="[
                    { title: 'Activated', value: 1 },
                    { title: 'Deactivated', value: 0 }
                  ]"
                  item-title="title"
                  item-value="value"
                />
              </VCol>

              <VCol
                v-if="hasRole(4).value"
                cols="12"
              >
                <div class="d-flex justify-start">
                  <VBtn
                    type="submit"
                    color="primary"
                    class="me-4"
                  >
                    {{ props.mode === 'edit' ? 'Update' : 'Add' }}
                  </VBtn>
                  <VBtn
                    color="error"
                    variant="tonal"
                    @click="resetForm"
                  >
                    Discard
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
