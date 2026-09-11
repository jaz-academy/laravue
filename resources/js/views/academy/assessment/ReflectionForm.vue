<script setup>
const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
  submitting: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit', 'cancel'])

// Dynamic score color: Red for low values, progressing to orange, cyan, green
const getScoreColor = val => {
  const score = Number(val) || 0
  if (score >= 85) return 'success'
  if (score >= 70) return 'info'
  if (score >= 50) return 'warning'
  
  return 'error'
}
</script>

<template>
  <form @submit.prevent="emit('submit')">
    <!-- Tanggal Input -->
    <div class="mb-4">
      <VLabel class="font-weight-medium mb-1 text-primary">
        Tanggal Refleksi
      </VLabel>
      <VTextField
        v-model="props.formData.date"
        type="date"
        density="compact"
        variant="outlined"
        color="primary"
        prepend-inner-icon="tabler-calendar"
        required
      />
    </div>

    <!-- 1. Achievement -->
    <VCard
      variant="outlined"
      color="primary"
      class="mb-4 pa-3"
    >
      <div class="d-flex justify-space-between align-center mb-1">
        <span class="text-subtitle-2 font-weight-bold d-flex align-center gap-1 text-primary">
          <VIcon
            icon="tabler-trophy"
            color="primary"
            size="18"
          /> 1. Achievement (Pencapaian)
        </span>
        <VChip
          size="x-small"
          variant="tonal"
          :color="getScoreColor(props.formData.achievement.nilai)"
        >
          Nilai: {{ props.formData.achievement.nilai }}
        </VChip>
      </div>
      <VSlider
        v-model="props.formData.achievement.nilai"
        min="0"
        max="100"
        step="1"
        color="primary"
        thumb-label
        class="mt-1 mb-2"
      />
      <VTextarea
        v-model="props.formData.achievement.deskripsi"
        rows="2"
        variant="outlined"
        density="compact"
        color="primary"
        placeholder="Apa pencapaian terbesar saya minggu ini?"
        no-resize
        auto-grow
      />
    </VCard>

    <!-- 2. Obstacles -->
    <VCard
      variant="outlined"
      color="primary"
      class="mb-4 pa-3"
    >
      <div class="d-flex justify-space-between align-center mb-1">
        <span class="text-subtitle-2 font-weight-bold d-flex align-center gap-1 text-primary">
          <VIcon
            icon="tabler-barrier-block"
            color="primary"
            size="18"
          /> 2. Obstacles (Hambatan)
        </span>
        <VChip
          size="x-small"
          variant="tonal"
          :color="getScoreColor(props.formData.obstacles.nilai)"
        >
          Tingkat: {{ props.formData.obstacles.nilai }}
        </VChip>
      </div>
      <VSlider
        v-model="props.formData.obstacles.nilai"
        min="0"
        max="100"
        step="1"
        color="primary"
        thumb-label
        class="mt-1 mb-2"
      />
      <VTextarea
        v-model="props.formData.obstacles.deskripsi"
        rows="2"
        variant="outlined"
        density="compact"
        color="primary"
        placeholder="Kendala apa yang paling menyita waktu/energi, dan bagaimana cara saya mengatasinya?"
        no-resize
        auto-grow
      />
    </VCard>

    <!-- 3. Lessons -->
    <VCard
      variant="outlined"
      color="primary"
      class="mb-4 pa-3"
    >
      <div class="d-flex justify-space-between align-center mb-1">
        <span class="text-subtitle-2 font-weight-bold d-flex align-center gap-1 text-primary">
          <VIcon
            icon="tabler-bulb"
            color="primary"
            size="18"
          /> 3. Lessons (Insight & Pelajaran)
        </span>
        <VChip
          size="x-small"
          variant="tonal"
          :color="getScoreColor(props.formData.lessons.nilai)"
        >
          Nilai: {{ props.formData.lessons.nilai }}
        </VChip>
      </div>
      <VSlider
        v-model="props.formData.lessons.nilai"
        min="0"
        max="100"
        step="1"
        color="primary"
        thumb-label
        class="mt-1 mb-2"
      />
      <VTextarea
        v-model="props.formData.lessons.deskripsi"
        rows="2"
        variant="outlined"
        density="compact"
        color="primary"
        placeholder="Pelajaran penting apa yang saya dapatkan minggu ini?"
        no-resize
        auto-grow
      />
    </VCard>

    <!-- 4. Priority -->
    <VCard
      variant="outlined"
      color="primary"
      class="mb-4 pa-3"
    >
      <div class="d-flex justify-space-between align-center mb-1">
        <span class="text-subtitle-2 font-weight-bold d-flex align-center gap-1 text-primary">
          <VIcon
            icon="tabler-flag"
            color="primary"
            size="18"
          /> 4. Priority (Fokus Berikutnya)
        </span>
        <VChip
          size="x-small"
          variant="tonal"
          :color="getScoreColor(props.formData.priority.nilai)"
        >
          Fokus: {{ props.formData.priority.nilai }}
        </VChip>
      </div>
      <VSlider
        v-model="props.formData.priority.nilai"
        min="0"
        max="100"
        step="1"
        color="primary"
        thumb-label
        class="mt-1 mb-2"
      />
      <VTextarea
        v-model="props.formData.priority.deskripsi"
        rows="2"
        variant="outlined"
        density="compact"
        color="primary"
        placeholder="Apa hal yang belum selesai dan harus menjadi prioritas utama minggu depan?"
        no-resize
        auto-grow
      />
    </VCard>

    <!-- 5. Health -->
    <VCard
      variant="outlined"
      color="primary"
      class="mb-4 pa-3"
    >
      <div class="d-flex justify-space-between align-center mb-1">
        <span class="text-subtitle-2 font-weight-bold d-flex align-center gap-1 text-primary">
          <VIcon
            icon="tabler-heart-rate-monitor"
            color="primary"
            size="18"
          /> 5. Health (Kebugaran & Mental)
        </span>
        <VChip
          size="x-small"
          variant="tonal"
          :color="getScoreColor(props.formData.health.nilai)"
        >
          Kondisi: {{ props.formData.health.nilai }}
        </VChip>
      </div>
      <VSlider
        v-model="props.formData.health.nilai"
        min="0"
        max="100"
        step="1"
        color="primary"
        thumb-label
        class="mt-1 mb-2"
      />
      <VTextarea
        v-model="props.formData.health.deskripsi"
        rows="2"
        variant="outlined"
        density="compact"
        color="primary"
        placeholder="Bagaimana kondisi fisik dan mental saya saat ini, serta apa yang perlu diperbaiki?"
        no-resize
        auto-grow
      />
    </VCard>

    <!-- Action Buttons -->
    <div class="d-flex align-center gap-3 mt-4">
      <VBtn
        color="primary"
        type="submit"
        :loading="props.submitting"
        class="flex-grow-1"
      >
        <VIcon
          start
          icon="tabler-device-floppy"
        />
        {{ props.isEditing ? 'Simpan Perubahan' : 'Simpan Refleksi' }}
      </VBtn>
      <VBtn
        variant="outlined"
        color="primary"
        @click="emit('cancel')"
      >
        Batal
      </VBtn>
    </div>
  </form>
</template>
