<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import { useCookie } from '@/@core/composable/useCookie'
import { fetchProjectData, plans } from '@/composables/fetchProjectData'
import { fetchStudentData, students } from '@/composables/fetchStudentData'
import { fetchTeacherData } from '@/composables/fetchTeacherData'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { VForm } from 'vuetify/components/VForm'

const props = defineProps({
  isDrawerOpen: { type: Boolean, required: true },
  mode: { type: String, default: 'add' }, // add | edit | duplicate | review
  taskData: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['update:isDrawerOpen', 'taskData'])
const currentUser = useCookie('userData')

onMounted(async () => {
  await fetchStudentData()
  await fetchProjectData()
  await fetchTeacherData()
})

const refVForm = ref()
const isFormValid = ref(false)

const form = reactive({
  project_plan_id: '',
  admin_student_id: currentUser.value?.admin_student_id || '',
  semester: '',
  name: '',
  description: '',
  date: '',
  status: '',
  media: '',
  embed: '',
  link: '',
  accepted: 0,
  rate: '',
  review: '',
  admin_teacher_id: '',
})

watch(
  () => [props.taskData, props.mode],
  () => {
    if ((props.mode === 'edit' || props.mode === 'review') && props.taskData) {
      Object.assign(form, {
        project_plan_id: props.taskData.project_plan_id || '',
        admin_student_id: props.taskData.admin_student_id || '',
        semester: props.taskData.semester || '',
        name: props.taskData.name || '',
        description: props.taskData.description || '',
        date: props.taskData.date || '',
        status: props.taskData.status || '',
        media: props.taskData.media || '',
        embed: props.taskData.embed || '',
        link: props.taskData.link || '',
        accepted: props.taskData.accepted || 0,
        rate: props.taskData.rate || '',
        review: props.taskData.review || '',
        admin_teacher_id: props.taskData.admin_teacher_id || '',
      })
    } else if ((props.mode === 'duplicate') && props.taskData) {
      Object.assign(form, {
        project_plan_id: props.taskData.project_plan_id || '',
        admin_student_id: props.taskData.admin_student_id || '',
        semester: props.taskData.semester || '',
        name: '',
        description: props.taskData.description || '',
        date: '',
        status: '',
        media: props.taskData.media || '',
        embed: '',
        link: '',
        accepted: 0,
        rate: '',
        review: '',
        admin_teacher_id: '',
      })
    } else {
      Object.assign(form, {
        project_plan_id: '',
        admin_student_id: currentUser.value?.admin_student_id || '',
        semester: '',
        name: '',
        description: '',
        date: '',
        status: '',
        media: '',
        embed: '',
        link: '',
        accepted: 0,
        rate: '',
        review: '',
        admin_teacher_id: '',
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
  refVForm.value?.reset()
  refVForm.value?.resetValidation()
}

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (props.mode !== 'review' && !valid) return

    const payload = { ...form }
    if (props.mode === 'edit' || props.mode === 'review') {
      payload.id = props.taskData.id
      emit('taskData', { action: 'update', data: payload })
    } else {
      emit('taskData', { action: 'create', data: payload })
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
      :title="props.mode === 'edit' ? 'Edit Task' : props.mode === 'duplicate' ? 'Duplicate Task' : props.mode === 'review' ? 'Review Task' : 'Add New Task'"
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
            <VRow
              v-if="props.mode !== 'review'"
              class="g-4"
            >
              <VCol cols="12">
                <AppSelect
                  v-model="form.project_plan_id"
                  placeholder="Select Project Plan"
                  label="Project Plan"
                  :rules="[requiredValidator]"
                  :items="plans"
                  item-title="theme"
                  item-value="id"
                />
              </VCol>
              
              <VCol cols="12">
                <AppSelect
                  v-model="form.admin_student_id"
                  placeholder="Select Student"
                  label="Student"
                  :rules="[requiredValidator]"
                  :items="students"
                  item-title="name"
                  item-value="id"
                  :readonly="!!currentUser.value?.admin_student_id"
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
                <AppTextField
                  v-model="form.name"
                  label="Write Title"
                  :rules="[requiredValidator]"
                  placeholder="Task Title"
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
                  v-model="form.date"
                  label="Date"
                  placeholder="Select date"
                />
              </VCol>

              <VCol cols="12">
                <AppSelect
                  v-model="form.status"
                  :rules="[requiredValidator]"
                  placeholder="Select Status"
                  label="Status"
                  :items="['In Progress', 'On Hold', 'Completed']"
                />
              </VCol>

              <VCol cols="12">
                <AppSelect
                  v-model="form.media"
                  :rules="[requiredValidator]"
                  placeholder="Select Media"
                  label="Media"
                  :items="['Instagram', 'TikTok', 'YouTube', 'Google Drive']"
                />
              </VCol>

              <VCol cols="12">
                <AppTextarea
                  v-model="form.link"
                  label="Link"
                  placeholder="Paste Link"
                  auto-grow
                />
              </VCol>
            </VRow>
            <VRow v-else>
              <VCol cols="12">
                <AppSelect
                  v-model="form.admin_teacher_id"
                  label="Mentor"
                  placeholder="Select Mentor"
                  :items="teachers"
                  item-title="nickname"
                  item-value="id"
                />
              </VCol>

              <VCol cols="12">
                <AppSelect
                  v-model="form.accepted"
                  label="Accepted"
                  placeholder="Not Accepted"
                  :items="[
                    { text: 'Accepted', value: 1 },
                    { text: 'Not Accepted', value: 0 }
                  ]"
                  item-title="text"
                  item-value="value"
                />
              </VCol>
                    
              <VCol
                cols="12"
                class="text-center"
              >
                <VRating
                  v-model="form.rate"
                  half-increments
                  hover
                />
                <AppTextarea
                  v-model="form.review"
                  placeholder="Write your review..."
                  :rows="3"
                />
              </VCol>
            </VRow>
            <VRow class="mt-4">
              <VCol cols="12">
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
