<script setup>
const shortcuts = [
  {
    icon: 'tabler-calendar',
    title: 'Calendar',
    subtitle: 'Agenda Akademik',
    to: { name: 'academy-calendar' },
  },
  {
    icon: 'tabler-mail',
    title: 'JazMail',
    subtitle: 'Webmail Client',
    to: { name: 'academy-jazmail' },
  },
  {
    icon: 'tabler-smart-home',
    title: 'Projects',
    subtitle: 'Project Dashboard',
    to: { name: 'dashboard-projects' },
  },
  {
    icon: 'tabler-users',
    title: 'Santri',
    subtitle: 'Daftar Santri',
    to: { name: 'profile-student-list' },
  },
  {
    icon: 'tabler-report-money',
    title: 'Tabungan',
    subtitle: 'Tabungan Siswa',
    to: { name: 'financial-savings' },
  },
  {
    icon: 'tabler-code',
    title: 'Developer',
    subtitle: 'SSO & API Docs',
    to: { name: 'developer-sso' },
  },
]
</script>

<template>
  <Shortcuts :shortcuts="shortcuts" />
</template>
