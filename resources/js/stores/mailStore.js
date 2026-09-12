import { defineStore } from 'pinia'
import { $api } from '@/utils/api'

export const useMailStore = defineStore('mail', {
  state: () => ({
    emails: [],
    currentFolder: 'INBOX',
    loading: false,
    selectedEmail: null,
    account: null,
  }),
  actions: {
    async fetchAccount() {
      try {
        const response = await $api('/mail/account')
        this.account = response
      } catch (error) {
        console.error('Failed to fetch account info', error)
      }
    },
    async fetchEmails(folder = 'INBOX', sync = false) {
      this.loading = true
      this.currentFolder = folder
      try {
        const query = sync ? '?sync=1' : ''
        const response = await $api(`/mail/${folder}${query}`)
        this.emails = Array.isArray(response?.data) ? response.data : (Array.isArray(response) ? response : [])
      } catch (error) {
        console.error('Failed to fetch emails', error)
        this.emails = []
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
