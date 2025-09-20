<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import AppTextarea from '@/@core/components/app-form-elements/AppTextarea.vue'
import { useUserAccess } from '@/@core/utils/helpers'
import { fetchTeacherData, teachers } from '@/composables/fetchTeacherData'
import { useApi } from '@/composables/useApi'
import { onMounted } from 'vue'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { VBtn } from 'vuetify/components/VBtn' // pastikan path benar
import { VForm } from 'vuetify/components/VForm'

const props = defineProps({
  isDrawerOpen: { type: Boolean, required: true },
  mode: { type: String, default: 'add' },
  selectedData: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['update:isDrawerOpen', 'selectedData'])

const refVForm = ref()
const isFormValid = ref(false)
const subjects = ref([])
const { hasRole } = useUserAccess()

const form = reactive({
  academy_subject_id: '',
  semester: '',
  admin_teacher_id: '',
  competence_1: '',
  competence_2: '',
  competence_3: '',
})

watch(
  () => [props.selectedData, props.mode],
  () => {
    if (props.mode === 'edit' && props.selectedData) {
      Object.assign(form, {
        academy_subject_id: props.selectedData.academy_subject_id || '',
        semester: props.selectedData.semester || '',
        admin_teacher_id: props.selectedData.admin_teacher_id || '',
        competence_1: props.selectedData.competence_1 || '',
        competence_2: props.selectedData.competence_2 || '',
        competence_3: props.selectedData.competence_3 || '',
      })
    } else {
      Object.assign(form, {
        academy_subject_id: '',
        semester: '',
        admin_teacher_id: '',
        competence_1: '',
        competence_2: '',
        competence_3: '',
      })
    }
  },
  { immediate: true },
)

onMounted( async () => {
  const res = await useApi('/subjects')

  subjects.value = res.data.value.data || []
  fetchTeacherData()
})

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
      payload.id = props.selectedData.id
      emit('selectedData', { action: 'update', data: payload })
    } else {
      emit('selectedData', { action: 'create', data: payload })
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
      :title="props.mode === 'edit' ? 'Edit Competence' : 'Add New Competence'"
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
            <VCol cols="12">
              <AppSelect
                v-model="form.academy_subject_id"
                placeholder="Select Subject"
                label="Subject"
                :rules="[requiredValidator]"
                :items="subjects"
                item-title="name"
                item-value="id"
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
                v-model="form.admin_teacher_id"
                placeholder="Select Semester"
                label="Teacher"
                :rules="[requiredValidator]"
                :items="teachers"
                item-title="nickname"
                item-value="id"
              />
            </VCol>
              
            <VCol cols="12">
              <AppTextarea
                v-model="form.competence_1"
                label="Competence 1"
                :rules="[requiredValidator]"
                placeholder="Kemampuan Dasar"
              />
            </VCol>
              
            <VCol cols="12">
              <AppTextarea
                v-model="form.competence_2"
                label="Competence 2"
                placeholder="Kemampuan Standar"
              />
            </VCol>
              
            <VCol cols="12">
              <AppTextarea
                v-model="form.competence_3"
                label="Competence 3"
                placeholder="Kemampuan Maksimal"
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
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
