<template>
  <VRow>
    <VCol cols="12">
      <VCard title="JazMail (Email Client)">
        <VTabs v-model="activeTab">
          <VTab value="INBOX">Inbox</VTab>
          <VTab value="Sent">Sent</VTab>
          <VTab value="Trash">Trash</VTab>
          <VTab value="Compose">Compose</VTab>
        </VTabs>

        <VDivider />

        <VWindow v-model="activeTab" class="pa-4">
          <!-- Folder Tabs (Inbox, Sent, Trash) -->
          <VWindowItem v-for="folder in ['INBOX', 'Sent', 'Trash']" :key="folder" :value="folder">
            <div v-if="mailStore.loading" class="text-center pa-5">
              <VProgressCircular indeterminate color="primary" />
            </div>
            
            <VList v-else-if="!mailStore.selectedEmail" lines="two">
              <VListItem
                v-for="email in mailStore.emails"
                :key="email.uid"
                @click="viewEmail(email.uid)"
                :title="email.subject || '(No Subject)'"
                :subtitle="`${email.from} - ${email.received_at}`"
                :class="!email.is_read ? 'font-weight-bold' : ''"
              >
                <template #prepend>
                  <VIcon :icon="email.is_read ? 'tabler-mail-opened' : 'tabler-mail'" />
                </template>
                <template #append>
                  <VBtn icon variant="text" color="error" @click.stop="deleteEmail(email.uid)">
                    <VIcon icon="tabler-trash" />
                  </VBtn>
                </template>
              </VListItem>
              
              <div v-if="!mailStore.emails.length" class="text-center pa-5 text-muted">
                No emails in {{ folder }}
              </div>
            </VList>

            <!-- Email Detail View -->
            <VCard v-else variant="outlined" class="pa-4">
              <VBtn prepend-icon="tabler-arrow-left" variant="text" @click="mailStore.selectedEmail = null" class="mb-4">Back</VBtn>
              <VBtn icon variant="text" color="error" class="mb-4 float-right" @click="deleteEmail(mailStore.selectedEmail.uid)">
                <VIcon icon="tabler-trash" />
              </VBtn>
              <h3>{{ mailStore.selectedEmail.subject }}</h3>
              <p class="text-muted">From: {{ mailStore.selectedEmail.from }} | To: {{ mailStore.selectedEmail.to }}</p>
              <VDivider class="my-4" />
              <div v-html="mailStore.selectedEmail.body"></div>
            </VCard>
          </VWindowItem>

          <!-- Compose Tab -->
          <VWindowItem value="Compose">
            <VForm @submit.prevent="sendMail" ref="composeForm">
              <VTextField v-model="compose.to" label="To" type="email" required class="mb-4" />
              <VTextField v-model="compose.subject" label="Subject" required class="mb-4" />
              <VTextarea v-model="compose.body" label="Message" rows="8" required class="mb-4" />
              <VFileInput v-model="compose.attachments" label="Attachments (optional)" multiple class="mb-4" />
              <VBtn type="submit" color="primary" :loading="mailStore.loading" prepend-icon="tabler-send">Send Email</VBtn>
            </VForm>
          </VWindowItem>
        </VWindow>
      </VCard>
    </VCol>
  </VRow>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useMailStore } from '@/stores/mailStore'

const mailStore = useMailStore()
const activeTab = ref('INBOX')

const compose = ref({
  to: '',
  subject: '',
  body: '',
  attachments: null
})
const composeForm = ref(null)

const loadFolder = () => {
  mailStore.selectedEmail = null
  if (['INBOX', 'Sent', 'Trash'].includes(activeTab.value)) {
    mailStore.fetchEmails(activeTab.value)
  }
}

onMounted(() => {
  loadFolder()
})

watch(activeTab, () => {
  loadFolder()
})

const viewEmail = (uid) => {
  mailStore.readEmail(uid)
}

const deleteEmail = async (uid) => {
  if (confirm('Move to trash / delete?')) {
    await mailStore.trashEmail(uid)
  }
}

const sendMail = async () => {
  try {
    await mailStore.sendEmail(compose.value)
    alert('Email sent successfully!')
    compose.value = { to: '', subject: '', body: '', attachments: null }
    activeTab.value = 'Sent'
  } catch (error) {
    alert('Failed to send email.')
  }
}
</script>
