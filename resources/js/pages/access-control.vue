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
        <VCardText class="text-primary">
          You already registered in <strong>Jazmedia.</strong> What next?
        </VCardText>
        <VCardText>
          Contact your administrator in Jaz Academy to assign you the necessary access data, menu and permissions.
        </VCardText>
      </VCard>
    </VCol>
    <VCol
      v-if="$can('read', 'all')"
      cols="12"
      md="6"
    >
      <VCard title="Approved User 👍">
        <VCardText class="text-primary">
          User with subject's 'Read' ability can view this card
        </VCardText>
        <VCardText class="text-danger">
          This card is visible to member of Jaz Academy only. You can now view and modify your data and access more informations.
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
