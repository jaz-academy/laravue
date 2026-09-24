<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import { useCookie } from '@/@core/composable/useCookie'
import { fetchProjectData, plans } from '@/composables/fetchProjectData'
import { fetchStudentData, students } from '@/composables/fetchStudentData'
import { fetchTeacherData, teachers } from '@/composables/fetchTeacherData'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { VForm } from 'vuetify/components/VForm'
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'

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

const mediaTypeOptions = [
  { title: 'Gambar / Carousel (Image)', value: 'image' },
  { title: 'Video (MP4 / Stream / YouTube)', value: 'video' },
  { title: 'Dokumen PDF (Document)', value: 'document' },
  { title: 'Game / Animasi (Scratch)', value: 'scratch' },
]

const form = reactive({
  project_plan_id: '',
  student_ids: currentUser.value?.admin_student_id ? [currentUser.value.admin_student_id] : [],
  semester: '',
  name: '',
  description: '',
  date: new Date().toLocaleDateString('en-CA'),
  status: 'In Progress',
  media_type: 'image',
  media_url: '',
  media_urls_text: '',
  media: 'image',
  embed: '',
  link: '',
  accepted: 0,
  rate: '',
  review: '',
  admin_teacher_id: '',
})

const totalImageCount = computed(() => {
  if (form.media_type !== 'image') return 0
  let count = 0
  if (form.media_url?.trim()) count++
  if (form.media_urls_text?.trim()) {
    const lines = form.media_urls_text.split('\n').map(l => l.trim()).filter(Boolean)
    count += lines.length
  }
  return count
})

const parseTaskMediaType = task => {
  const rawType = (task?.media_type || task?.media || '').toLowerCase()
  const rawUrl = (task?.media_url || task?.link || '').toLowerCase()

  if (rawType === 'document' || rawType.includes('pdf') || rawUrl.endsWith('.pdf')) {
    return 'document'
  }
  if (rawType === 'video' || rawType.includes('youtube') || rawType.includes('tiktok') || rawUrl.endsWith('.mp4')) {
    return 'video'
  }
  if (rawType === 'scratch' || rawType.includes('scratch') || rawUrl.includes('scratch.mit.edu')) {
    return 'scratch'
  }
  return 'image'
}

watch(
  () => [props.taskData, props.mode],
  () => {
    if (props.mode === 'edit' && props.taskData) {
      const resolvedType = parseTaskMediaType(props.taskData)
      let mainUrl = props.taskData.media_url || props.taskData.link || ''
      let urls = Array.isArray(props.taskData.media_urls) ? props.taskData.media_urls : []
      if (urls.length > 0 && !mainUrl) mainUrl = urls[0]
      const extraUrls = urls.filter(u => u !== mainUrl)

      Object.assign(form, {
        project_plan_id: props.taskData.project_plan_id || '',
        student_ids: (props.taskData.students || []).map(s => s.id),
        semester: props.taskData.semester || '',
        name: props.taskData.name || props.taskData.caption || '',
        description: props.taskData.description || '',
        date: props.taskData.date || '',
        status: props.taskData.status === 'Completed' || props.taskData.accepted === 1 ? 'Completed' : 'In Progress',
        media_type: resolvedType,
        media: resolvedType,
        media_url: mainUrl,
        media_urls_text: extraUrls.join('\n'),
        embed: mainUrl,
        link: mainUrl,
        accepted: props.taskData.accepted || 0,
        rate: props.taskData.rate || props.taskData.grade || '',
        review: props.taskData.review || props.taskData.review_comment || '',
        admin_teacher_id: props.taskData.admin_teacher_id || '',
      })
    } else if (props.mode === 'review' && props.taskData) {
      const resolvedType = parseTaskMediaType(props.taskData)
      let mainUrl = props.taskData.media_url || props.taskData.link || ''
      let urls = Array.isArray(props.taskData.media_urls) ? props.taskData.media_urls : []
      if (urls.length > 0 && !mainUrl) mainUrl = urls[0]
      const extraUrls = urls.filter(u => u !== mainUrl)

      Object.assign(form, {
        project_plan_id: props.taskData.project_plan_id || '',
        student_ids: (props.taskData.students || []).map(s => s.id),
        semester: props.taskData.semester || '',
        name: props.taskData.name || props.taskData.caption || '',
        description: props.taskData.description || '',
        date: props.taskData.date || '',
        status: props.taskData.accepted === 1 ? 'Completed' : 'In Progress',
        media_type: resolvedType,
        media: resolvedType,
        media_url: mainUrl,
        media_urls_text: extraUrls.join('\n'),
        embed: mainUrl,
        link: mainUrl,
        accepted: props.taskData.accepted || 0,
        rate: props.taskData.rate || props.taskData.grade || '',
        review: props.taskData.review || props.taskData.review_comment || '',
        admin_teacher_id: props.taskData.admin_teacher_id || '',
      })
    } else if (props.mode === 'duplicate' && props.taskData) {
      const resolvedType = parseTaskMediaType(props.taskData)
      let mainUrl = props.taskData.media_url || props.taskData.link || ''
      let urls = Array.isArray(props.taskData.media_urls) ? props.taskData.media_urls : []
      if (urls.length > 0 && !mainUrl) mainUrl = urls[0]
      const extraUrls = urls.filter(u => u !== mainUrl)

      Object.assign(form, {
        project_plan_id: '',
        student_ids: (props.taskData.students || []).map(s => s.id),
        semester: props.taskData.semester || '',
        name: '',
        description: props.taskData.description || '',
        date: new Date().toLocaleDateString('en-CA'),
        status: 'In Progress',
        media_type: resolvedType,
        media: resolvedType,
        media_url: mainUrl,
        media_urls_text: extraUrls.join('\n'),
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
        student_ids: currentUser.value?.admin_student_id ? [currentUser.value.admin_student_id] : [],
        semester: '',
        name: '',
        description: '',
        date: new Date().toLocaleDateString('en-CA'),
        status: 'In Progress',
        media_type: 'image',
        media: 'image',
        media_url: '',
        media_urls_text: '',
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

    // Bangun list media_urls
    let allMediaUrls = []
    if (form.media_url?.trim()) {
      allMediaUrls.push(form.media_url.trim())
    }
    if (form.media_type === 'image' && form.media_urls_text?.trim()) {
      const extra = form.media_urls_text.split('\n').map(l => l.trim()).filter(Boolean)
      allMediaUrls.push(...extra)
    }
    allMediaUrls = Array.from(new Set(allMediaUrls))

    const payload = {
      ...form,
      media_type: form.media_type,
      media: form.media_type,
      media_url: allMediaUrls[0] || form.media_url || '',
      media_urls: allMediaUrls,
      link: allMediaUrls[0] || form.media_url || '',
    }

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
                  :items="plans.filter(p => p.is_active && new Date(p.end_date) >= new Date())"
                  item-title="theme"
                  item-value="id"
                />
              </VCol>
              
              <!-- multiselect students -->
              <VCol cols="12">
                <AppSelect
                  v-model="form.student_ids"
                  :rules="[requiredValidator]"
                  :items="students"
                  item-title="nickname"
                  item-value="id"
                  placeholder="Select Creators"
                  label="Select Creators"
                  chips
                  multiple
                  closable-chips
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
                  v-model="form.media_type"
                  :rules="[requiredValidator]"
                  placeholder="Pilih Tipe Konten"
                  label="Tipe Postingan (Media)"
                  :items="mediaTypeOptions"
                  item-title="title"
                  item-value="value"
                />
              </VCol>

              <!-- Image & Carousel Fields -->
              <template v-if="form.media_type === 'image'">
                <VCol cols="12">
                  <AppTextField
                    v-model="form.media_url"
                    label="URL Gambar Utama (Cover)"
                    placeholder="https://lh3.googleusercontent.com/d/... atau https://..."
                    :rules="[requiredValidator]"
                  />
                </VCol>

                <VCol cols="12">
                  <div class="d-flex justify-space-between align-center mb-1">
                    <span class="text-caption text-medium-emphasis">URL Tambahan Carousel (Opsional)</span>
                    <VChip
                      v-if="totalImageCount > 1"
                      size="x-small"
                      color="primary"
                      variant="tonal"
                    >
                      Carousel {{ totalImageCount }} Foto
                    </VChip>
                  </div>
                  <AppTextarea
                    v-model="form.media_urls_text"
                    placeholder="Satu link per baris&#10;https://...&#10;https://..."
                    auto-grow
                    rows="3"
                  />
                  <span class="text-xs text-disabled">
                    * Masukkan satu tautan URL gambar Google Drive / image per baris untuk membuat postingan carousel.
                  </span>
                </VCol>
              </template>

              <!-- Video Field -->
              <template v-else-if="form.media_type === 'video'">
                <VCol cols="12">
                  <AppTextField
                    v-model="form.media_url"
                    label="Link Video (MP4 / Google Drive / YouTube / TikTok)"
                    placeholder="https://..."
                    :rules="[requiredValidator]"
                  />
                  <span class="text-xs text-disabled">
                    * Mendukung direct URL video MP4, Google Drive video preview, YouTube embed/watch, atau TikTok video.
                  </span>
                </VCol>
              </template>

              <!-- Document Field -->
              <template v-else-if="form.media_type === 'document'">
                <VCol cols="12">
                  <AppTextField
                    v-model="form.media_url"
                    label="Link Dokumen PDF (Google Drive / File PDF)"
                    placeholder="https://drive.google.com/file/d/.../view"
                    :rules="[requiredValidator]"
                  />
                  <span class="text-xs text-disabled">
                    * Dokumen PDF dari Google Drive atau tautan file PDF publik untuk viewer PDF interaktif.
                  </span>
                </VCol>
              </template>
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
