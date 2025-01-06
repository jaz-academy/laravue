<script setup>
import { useApi } from '@/composables/useApi'
import { reactive, ref } from 'vue'

const accountData = reactive({})
const flashMessage = ref('')
const flashStatus = ref('')
const refInputEl = ref()

const { data, error } = await useApi('/schools')
if (error.value) {
  console.log(error.value)
} else if (data.value) {
  Object.assign(accountData, data.value.data[0])
}

const resetForm = () => {
  Object.assign(accountData, data.value.data[0])
}

const changeAvatar = file => {
  const fileReader = new FileReader()
  const { files } = file.target
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        accountData.logo = fileReader.result
      }
    }
  }
}

const resetAvatar = () => {
  accountData.logo = data.value.data[0].logo
}

const editSchoolProfile = async () => {
  try {
    const response = await $api(`/schools/${accountData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('accessToken').value}`,
      },
      body: JSON.stringify(accountData),
    })

    if (response) {
      flashStatus.value = response.status
      flashMessage.value = response.message
    }
  } catch (err) {
    errorMessage.value = 'An error occurred while updating the profile'
    console.error(err)
  }
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="School Profile Details">
        <VDivider />

        <VCardText>
          <VAlert
            v-if="flashStatus"
            :type="flashStatus"
            dismissible
            @click="flashStatus = ''"
          >
            {{ flashMessage }}
          </VAlert>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="editSchoolProfile">
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountData.name"
                  label="Institution Name"
                />
              </VCol>
              <VCol
                cols="6"
                md="3"
              >
                <AppTextField
                  v-model="accountData.nickname"
                  label="Initial"
                />
              </VCol>
              <VCol
                cols="6"
                md="3"
              >
                <AppTextField
                  v-model="accountData.npsn"
                  label="NPSN"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountData.organization"
                  label="Organization"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountData.permit"
                  label="Permit"
                />
              </VCol>
              <VCol cols="12">
                <AppTextField
                  v-model="accountData.address"
                  label="Address"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountData.map"
                  label="Location"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountData.phone"
                  label="Phone Number"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountData.email"
                  label="E-mail"
                  type="email"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountData.motto"
                  label="Motto"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountData.period"
                  label="Period"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountData.head"
                  label="Head"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountData.contact"
                  label="Contact"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountData.note"
                  label="Note"
                />
              </VCol>
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn type="submit">
                  Save changes
                </VBtn>
                <VBtn
                  color="secondary"
                  variant="tonal"
                  @click.prevent="resetForm"
                >
                  Reset
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard title="Logo">
        <VCardText class="d-flex">
          <VAvatar
            :image="accountData.logo"
            rounded
            size="100"
            class="me-6"
          />

          <form class="d-flex flex-column justify-center gap-4">
            <div class="d-flex flex-wrap gap-2">
              <VBtn
                color="primary"
                @click="refInputEl?.click()"
              >
                Upload
              </VBtn>
              <input
                ref="refInputEl"
                type="file"
                accept=".jpeg,.png,.jpg,.gif"
                hidden
                @input="changeAvatar"
              >
              <VBtn
                type="reset"
                color="secondary"
                variant="tonal"
                @click="resetAvatar"
              >
                Reset
              </VBtn>
            </div>
            <p>Allowed JPG, GIF or PNG. Max size of 800K</p>
          </form>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
