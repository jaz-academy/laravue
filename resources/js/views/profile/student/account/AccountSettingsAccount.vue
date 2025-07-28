<script setup>
import avatar from '@images/avatars/no-profile.png'
import { ref, watch } from 'vue'

const { student } = defineProps({
  student: Object,
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
  () => student,
  newStudent => {
    if (newStudent) {
      const parsedStudent = JSON.parse(JSON.stringify(newStudent))

      // Fix: Pastikan skills adalah array
      if (typeof parsedStudent.skills === 'string') {
        try {
          const jsonParsed = JSON.parse(parsedStudent.skills)

          parsedStudent.skills = Array.isArray(jsonParsed) ? jsonParsed : []
        } catch (e) {
          // fallback kalau JSON.parse gagal
          parsedStudent.skills = parsedStudent.skills.split(',').map(s => s.trim())
        }
      }

      accountDataLocal.value = parsedStudent
    }
  },
  { immediate: true },
)


const profileImg = computed(() => {
  const imagePath = accountDataLocal.value?.image
  
  return imagePath ? `/storage/${imagePath}` : avatar
})


const resetForm = () => {
  accountDataLocal.value = JSON.parse(JSON.stringify(student))
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
              <!-- 👉 NIS -->
              <VCol
                md="4"
                cols="12"
              >
                <AppTextField
                  v-model="accountDataLocal.nis"
                  placeholder="201122"
                  label="NIS"
                />
              </VCol>

              <!-- 👉 Name -->
              <VCol
                md="4"
                cols="12"
              >
                <AppTextField
                  v-model="accountDataLocal.name"
                  placeholder="John"
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
                  placeholder="Doe"
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

              <!-- 👉 ownPhone -->
              <VCol
                cols="12"
                md="4"
              >
                <AppTextField
                  v-model="accountDataLocal.ownPhone"
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
                  placeholder="Jln. Sirot No. 123"
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
                  placeholder="Dusun Mustaqim"
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
                  placeholder="Desa / Kec. Jannah"
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
              <!-- 👉 hobby -->
              <VCol
                cols="12"
                md="4"
              >
                <AppTextField
                  v-model="accountDataLocal.hobby"
                  label="Hobby"
                  placeholder="What do you like to do?"
                />
              </VCol>

              <!-- 👉 sport -->
              <VCol
                cols="12"
                md="4"
              >
                <AppTextField
                  v-model="accountDataLocal.sport"
                  label="Sport"
                  placeholder="What is your favorite sport?"
                />
              </VCol>

              <!-- 👉 ambition -->
              <VCol
                cols="12"
                md="4"
              >
                <AppTextField
                  v-model="accountDataLocal.ambition"
                  label="Ambition"
                  placeholder="What do you want to be?"
                />
              </VCol>

              <!-- 👉 role -->
              <VCol
                cols="12"
                md="4"
              >
                <AppSelect
                  v-model="accountDataLocal.role"
                  label="Role"
                  :items="['Content Creator', 'Entrepreneur', 'Influencer', 'Developer']"
                  placeholder="Select Role"
                />
              </VCol>

              <!-- 👉 skill -->
              <VCol
                cols="12"
                md="8"
              >
                <AppSelect
                  v-model="accountDataLocal.skills"
                  label="Skills"
                  placeholder="Select Skills"
                  multiple
                  :items="['Design', 'Editing', 'Copywriting', 'Photography', 'HTML', 'CSS', 'JavaScript', 'React', 'NodeJS', 'MongoDB', 'MySQL', 'Python']"
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
