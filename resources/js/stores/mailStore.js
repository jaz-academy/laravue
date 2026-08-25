import { defineStore } from 'pinia'
import { $api } from '@/utils/api'

export const useMailStore = defineStore('mail', {
  state: () => ({
    emails: [],
    currentFolder: 'INBOX',
    loading: false,
    selectedEmail: null,
  }),
  actions: {
    async fetchEmails(folder = 'INBOX') {
      this.loading = true
      this.currentFolder = folder
      try {
        const response = await $api(`/mail/${folder}`)
        this.emails = response.data || response
      } catch (error) {
        console.error('Failed to fetch emails', error)
      } finally {
        this.loading = false
      }
    },
    async sendEmail(payload) {
      this.loading = true
      try {
        const formData = new FormData()
        formData.append('to', payload.to)
        formData.append('subject', payload.subject)
        formData.append('body', payload.body)
        if (payload.attachments) {
          Array.from(payload.attachments).forEach(file => {
            formData.append('attachments[]', file)
          })
        }
        await $api('/mail/send', {
          method: 'POST',
          body: formData,
        })
        return true
      } catch (error) {
        console.error('Failed to send email', error)
        throw error
      } finally {
        this.loading = false
      }
    },
    async readEmail(uid) {
      try {
        const response = await $api(`/mail/${this.currentFolder}/${uid}`)
        this.selectedEmail = response
        // Update read status locally
        const index = this.emails.findIndex(e => e.uid === uid)
        if (index !== -1) {
          this.emails[index].is_read = true
        }
      } catch (error) {
        console.error('Failed to read email', error)
      }
    },
    async trashEmail(uid) {
      try {
        await $api(`/mail/${this.currentFolder}/${uid}`, {
          method: 'DELETE',
        })
        this.emails = this.emails.filter(e => e.uid !== uid)
        this.selectedEmail = null
      } catch (error) {
        console.error('Failed to trash email', error)
      }
    }
  }
})
