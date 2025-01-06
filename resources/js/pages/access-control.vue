<script setup>
definePage({
  meta: {
    action: 'read',
    subject: 'AclDemo',
  },
})
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Welcome Aboard! 🚀">
        <VCardText>You already registered in <strong>Jazmedia.</strong> What next?</VCardText>
        <VCardText>
          Contact your administrator to assign you the necessary permissions
        </VCardText>
      </VCard>
    </VCol>
    <VCol
      v-if="$can('read', 'all')"
      cols="12"
      md="6"
    >
      <VCard title="Approved User 👍">
        <VCardText>User with 'Analytics' subject's 'Read' ability can view this card</VCardText>
        <VCardText class="text-danger">
          This card is visible to 'admin' only
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
