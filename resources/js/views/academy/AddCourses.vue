<script setup>
import AppTextField from '@/@core/components/app-form-elements/AppTextField.vue'
import { useUserAccess } from '@/@core/utils/helpers'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { VForm } from 'vuetify/components/VForm'

const props = defineProps({
  isDrawerOpen: { type: Boolean, required: true },
  mode: { type: String, default: 'add' },
  courseData: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['update:isDrawerOpen', 'courseData'])
const subjectsData = await useApi('/subjects')

const subjectsDataOptions = computed(() => {
  const groups = [...new Set(subjectsData?.data.value.data?.map(s => s.group))]
  
  return groups.map(g => ({ value: g, label: g }))
})

console.log("subjectsData", subjectsDataOptions)

const { hasRoleAndAccess } = useUserAccess()

const refVForm = ref()
const isFormValid = ref(false)

const form = reactive({
  name: '',
  subject: '',
  note: '',
  author: '',
  title: '',
  section: '',
  description: '',
  video_url: '',
  video_duration: '',
})

watch(
  () => [props.courseData, props.mode],
  () => {
    if ((props.mode === 'edit' || props.mode === 'duplicate') && props.courseData) {
      Object.assign(form, {
        name: props.courseData.name || '',
        subject: props.courseData.subject || '',
        note: props.courseData.note || '',
        author: props.courseData.author || '',
        title: props.courseData.title || '',
        section: props.courseData.section || '',
        description: props.courseData.description || '',
        video_url: props.courseData.video_url || '',
        video_duration: props.courseData.video_duration || '',
      })
    } else {
      Object.assign(form, {
        name: '',
        subject: '',
        note: '',
        author: '',
        title: '',
        section: '',
        description: '',
        video_url: '',
        video_duration: '',
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
      payload.id = props.courseData.id
      emit('courseData', { action: 'update', data: payload })
    } else {
      emit('courseData', { action: 'create', data: payload })
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
      :title="props.mode === 'edit' ? 'Edit Courses' : props.mode === 'duplicate' ? 'Duplicate Courses' : 'Add New Courses'"
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
                <AppTextField
                  v-model="form.name"
                  label="Name"
                  placeholder="Enter course name"
                />
              </VCol>

              <VCol cols="12">
                <AppSelect
                  v-model="form.subject"
                  label="Subject"
                  :rules="[requiredValidator]"
                  :items="subjectsDataOptions"
                  item-title="label"
                  item-value="value"
                  placeholder="Choose Project Subject"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="form.note"
                  label="Write Note"
                  :rules="[requiredValidator]"
                  placeholder="Courses Note"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="form.author"
                  label="Write Author"
                  :rules="[requiredValidator]"
                  placeholder="Courses Author"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="form.section"
                  label="Write Section"
                  :rules="[requiredValidator]"
                  placeholder="Courses Section"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="form.title"
                  label="Write Title"
                  :rules="[requiredValidator]"
                  placeholder="Courses Title"
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
                <AppTextarea
                  v-model="form.video_url"
                  label="Video URL"
                  placeholder="Write Video URL"
                  auto-grow
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="form.video_duration"
                  label="Write Video Duration"
                  :rules="[requiredValidator]"
                  placeholder="Courses Video Duration"
                />
              </VCol>

              <VCol
                v-if="hasRoleAndAccess(2, 'Courses')"
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
