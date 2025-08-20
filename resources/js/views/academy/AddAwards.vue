<script setup>
import { useUserAccess } from '@/@core/utils/helpers'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { VForm } from 'vuetify/components/VForm'

const props = defineProps({
  isDrawerOpen: { type: Boolean, required: true },
  mode: { type: String, default: 'add' },
  awardData: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['update:isDrawerOpen', 'awardData'])
const subjectsData = await useApi('/subjects')
const studentsData = await useApi('/students')
const teachersData = await useApi('/teachers')

const { hasRoleAndAccess } = useUserAccess()

const refVForm = ref()
const isFormValid = ref(false)

const form = reactive({
  date: '',
  admin_student_id: '',
  semester: '',
  academy_subject_id: '',
  item: '',
  rate: '',
  result: '',
  admin_teacher_id: '',
  remark: '',
})

watch(
  () => [props.awardData, props.mode],
  () => {
    if ((props.mode === 'edit' || props.mode === 'duplicate') && props.awardData) {
      Object.assign(form, {
        date: props.awardData.date || '',
        admin_student_id: props.awardData.admin_student_id || '',
        semester: props.awardData.semester || '',
        academy_subject_id: props.awardData.academy_subject_id || '',
        item: props.awardData.item || '',
        rate: props.awardData.rate || '',
        result: props.awardData.result || '',
        admin_teacher_id: props.awardData.admin_teacher_id || '',
        remark: props.awardData.remark || '',
      })
    } else {
      Object.assign(form, {
        date: '',
        admin_student_id: '',
        semester: '',
        academy_subject_id: '',
        item: '',
        rate: '',
        result: '',
        admin_teacher_id: '',
        remark: '',
      })
    }
  },
  { immediate: true },
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
  emit('update:isDrawerOpen', false)
  refVForm.value?.reset()
}

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (!valid) return

    const payload = { ...form }
    if (props.mode === 'edit') {
      payload.id = props.awardData.id
      emit('awardData', { action: 'update', data: payload })
    } else {
      emit('awardData', { action: 'create', data: payload })
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
    <!-- 👉 Header -->
    <AppDrawerHeaderSection
      :title="props.mode === 'edit' ? 'Edit Awards' : props.mode === 'duplicate' ? 'Duplicate Awards' : 'Add New Awards'"
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
                <AppDateTimePicker
                  v-model="form.date"
                  label="Date"
                  placeholder="Select date"
                />
              </VCol>

              <VCol cols="12">
                <AppSelect
                  v-model="form.admin_student_id"
                  label="Student"
                  :rules="[requiredValidator]"
                  :items="studentsData.data.value.data"
                  item-title="name"
                  item-value="id"
                  placeholder="Choose Project Student"
                />
              </VCol>
              
              <VCol cols="12">
                <AppSelect
                  v-model="form.semester"
                  placeholder="Select Semester"
                  label="Semester"
                  :rules="[requiredValidator]"
                  :items="[1, 2, 3, 4, 5, 6]"
                />
              </VCol>

              <VCol cols="12">
                <AppSelect
                  v-model="form.academy_subject_id"
                  label="Subject"
                  :rules="[requiredValidator]"
                  :items="subjectsData.data.value.data"
                  item-title="name"
                  item-value="id"
                  placeholder="Choose Project Subject"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="form.item"
                  label="Write Title"
                  :rules="[requiredValidator]"
                  placeholder="Awards Title"
                />
              </VCol>
              
              <VCol
                cols="12"
                class="text-center"
              >
                <VRating
                  v-model="form.rate"
                  :rules="[requiredValidator]"
                  :readonly="!hasRoleAndAccess(3, 'Awards').value"
                  half-increments
                  size="x-large"
                  hover
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="form.result"
                  label="Write Result"
                  :rules="[requiredValidator]"
                  placeholder="Awards Result"
                />
              </VCol>

              <VCol cols="12">
                <AppSelect
                  v-model="form.admin_teacher_id"
                  label="Teacher"
                  :rules="[requiredValidator]"
                  :items="teachersData.data.value.data"
                  item-title="nickname"
                  item-value="id"
                  placeholder="Choose Project Teacher"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="form.remark"
                  label="Write Remark"
                  :rules="[requiredValidator]"
                  placeholder="Awards Remark"
                />
              </VCol>

              <VCol
                v-if="hasRoleAndAccess(2, 'Awards').value"
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

<style lang="scss">
.category-navigation-drawer{
  .ProseMirror {
    padding: 0.5rem;
    min-block-size: 15vh;

    p {
      margin-block-end: 0;
    }

    p.is-editor-empty:first-child::before {
      block-size: 0;
      color: #adb5bd;
      content: attr(data-placeholder);
      float: inline-start;
      pointer-events: none;
    }
  }

  .is-active {
    border-color: rgba(var(--v-theme-primary), var(--v-border-opacity)) !important;
    background-color: rgba(var(--v-theme-primary), var(--v-activated-opacity));
    color: rgb(var(--v-theme-primary));
  }

  .ProseMirror-focused{
    outline: none !important;
  }
}
</style>
