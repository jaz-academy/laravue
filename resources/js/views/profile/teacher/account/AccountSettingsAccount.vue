<script setup>
import avatar from '@images/avatars/no-profile.png'
import { ref, watch } from 'vue'

const { teacher } = defineProps({
  teacher: Object,
})

const emit = defineEmits([
  'userData',
])

const refForm = ref()
const selectedFile = ref(null)
const refInputEl = ref()
const isConfirmDialogOpen = ref(false)
const accountDataLocal = ref({})

watch(
  () => teacher,
  newTeacher => {
    if (newTeacher) {
      const parsedTeacher = JSON.parse(JSON.stringify(newTeacher))

      // Fix: Pastikan note adalah array
      if (typeof parsedTeacher.note === 'string') {
        try {
          const jsonParsed = JSON.parse(parsedTeacher.note)

          parsedTeacher.note = Array.isArray(jsonParsed) ? jsonParsed : []
        } catch (e) {
          // fallback kalau JSON.parse gagal
          parsedTeacher.note = parsedTeacher.note.split(',').map(s => s.trim())
        }
      }

      accountDataLocal.value = parsedTeacher
    }
  },
  { immediate: true },
)


const profileImg = computed(() => {
  const imagePath = accountDataLocal.value?.image
  
  return imagePath ? `/storage/${imagePath}` : avatar
})


const resetForm = () => {
  accountDataLocal.value = JSON.parse(JSON.stringify(teacher))
}

const changeAvatar = file => {
  const fileReader = new FileReader()
  const { files } = file.target
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        profileImg.value = fileReader.result
        uploadAvatar()
      }
    }

    // Simpan file ke ref agar bisa diupload nanti
    selectedFile.value = files[0]
  }
}

const resetAvatar = () => {
  profileImg.value = avatar
}

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      console.log('SUBMIT PAYLOAD', accountDataLocal.value)
      emit('userData', { ...accountDataLocal.value })
    }
  })
}

const uploadAvatar = async () => {
  if (!selectedFile.value) return

  const formData = new FormData()

  formData.append('image', selectedFile.value)
  formData.append('_method', 'PUT') // Laravel support

  try {
    const response = await useApi('/user/profile', {
      method: 'POST', // ini POST karena FormData PUT sering error
      body: formData,
    })

    const newImagePath = response.data.image
    const newImageUrl = response.data.url

    // Update image di local UI
    profileImg.value = newImageUrl
    accountDataLocal.value.image = newImagePath

    // ✅ Update userData biar ke-sync ke seluruh app
    userData.value.image = newImagePath

    console.log('Upload success', response)
  } catch (err) {
    console.error('Upload failed', err)
  }
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Profile Details">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded
            size="100"
            class="me-6"
            :image="profileImg"
          />

          <!-- 👉 Upload Photo -->
          <div class="d-flex flex-column justify-center gap-4">
            <div class="d-flex flex-wrap gap-2">
              <VBtn
                color="primary"
                @click="refInputEl?.click()"
              >
                <VIcon
                  icon="tabler-cloud-upload"
                  class="d-sm-none"
                />
                <span class="d-none d-sm-block">Upload new photo</span>
              </VBtn>

              <input
                ref="refInputEl"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="changeAvatar"
              >

              <VBtn
                type="reset"
                color="secondary"
                variant="tonal"
                @click="resetAvatar"
              >
                <span class="d-none d-sm-block">Reset</span>
                <VIcon
                  icon="tabler-refresh"
                  class="d-sm-none"
                />
              </VBtn>
            </div>

            <p class="text-body-1 mb-0">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p>
          </div>
        </VCardText>

        <!-- 👉 Form -->
        <VForm
          ref="refForm"
          @submit.prevent="onSubmit"
        >
          <VDivider class="my-4" />

          <VCardText class="pt-2">
            <VRow>
              <!-- 👉 NIG -->
              <VCol
                md="4"
                cols="12"
              >
                <AppTextField
                  v-model="accountDataLocal.nig"
                  placeholder="201122"
                  label="NIG"
                />
              </VCol>

              <!-- 👉 Name -->
              <VCol
                md="4"
                cols="12"
              >
                <AppTextField
                  v-model="accountDataLocal.name"
                  placeholder="John Doe"
                  label="Name"
                />
              </VCol>

              <!-- 👉 Nickname -->
              <VCol
                md="4"
                cols="12"
              >
                <AppTextField
                  v-model="accountDataLocal.nickname"
                  placeholder="Mr. Doe"
                  label="Nickname"
                />
              </VCol>

              <!-- 👉 birthPlace -->
              <VCol
                cols="12"
                md="4"
              >
                <AppTextField
                  v-model="accountDataLocal.birth_place"
                  label="Birth Place"
                  placeholder="Enter your birth place"
                />
              </VCol>

              <!-- 👉 Birth Date -->
              <VCol
                cols="12"
                md="4"
              >
                <AppTextField
                  v-model="accountDataLocal.birth_date"
                  label="Birth Date"
                  placeholder="Select Birth Date"
                />
              </VCol>

              <!-- 👉 phone -->
              <VCol
                cols="12"
                md="4"
              >
                <AppTextField
                  v-model="accountDataLocal.phone"
                  label="Phone Number"
                  placeholder="+62 888 1234 5678"
                />
              </VCol>

              <!-- 👉 Address -->
              <VCol
                cols="12"
                md="4"
              >
                <AppTextField
                  v-model="accountDataLocal.address"
                  label="Address"
                  placeholder="Jln. Sirot No 1 RT 2/3 Kp. Mustaqim"
                />
              </VCol>

              <!-- 👉 hamlet -->
              <VCol
                cols="12"
                md="4"
              >
                <AppTextField
                  v-model="accountDataLocal.hamlet"
                  label="Hamlet"
                  placeholder="Desa Ma'wa"
                />
              </VCol>

              <!-- 👉 village -->
              <VCol
                cols="12"
                md="4"
              >
                <AppTextField
                  v-model="accountDataLocal.village"
                  label="Village"
                  placeholder="Kec. Jannah"
                />
              </VCol>

              <!-- 👉 city -->
              <VCol
                cols="12"
                md="4"
              >
                <AppTextField
                  v-model="accountDataLocal.city"
                  label="City / Regency"
                  placeholder="Kota / Kabupaten Firdaus"
                />
              </VCol>

              <!-- 👉 district -->
              <VCol
                cols="12"
                md="4"
              >
                <AppTextField
                  v-model="accountDataLocal.district"
                  label="Province"
                  placeholder="Prop. Firdaus"
                />
              </VCol>

              <!-- 👉 postal_code Code -->
              <VCol
                cols="12"
                md="4"
              >
                <AppTextField
                  v-model="accountDataLocal.postal_code"
                  label="Zip Code"
                  placeholder="10001"
                />
              </VCol>
            </VRow>
          </VCardText>

          <VDivider class="mt-4" />

          <VCardText class="pt-2 mt-6">
            <VRow>
              <!-- 👉 role -->
              <VCol
                cols="12"
                md="12"
              >
                <AppSelect
                  v-model="accountDataLocal.role"
                  label="Role"
                  placeholder="Select Role"
                  multiple
                  :items="['CEO', 'COO', 'CMO', 'Musyrif', 'Murobbi', 'Mentor', 'ICT', 'Tsaqofah', 'Alquran', 'English', 'Arabic']"
                />
              </VCol>

              <!-- 👉 Form Actions -->
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4 mt-4"
              >
                <VBtn type="submit">
                  Save changes
                </VBtn>

                <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"
                  @click.prevent="resetForm"
                >
                  Reset
                </VBtn>
              </VCol>
            </VRow>
          </VCardText>
        </vform>
      </VCard>
    </VCol>
  </VRow>

  <!-- Confirm Dialog -->
  <ConfirmDialog
    v-model:is-dialog-visible="isConfirmDialogOpen"
    confirmation-question="Are you sure you want to deactivate your account?"
    confirm-title="Deactivated!"
    confirm-msg="Your account has been deactivated successfully."
    cancel-title="Cancelled"
    cancel-msg="Account Deactivation Cancelled!"
  />
</template>
