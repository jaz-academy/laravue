const currentUser = useCookie('userData')

export default [
  { heading: String(useCookie('userAbilityRules').value?.[0]?.member ?? 'Menu') },
  {
    title: 'Dashboards',
    icon: { icon: 'tabler-smart-home' },
    children: [
      {
        title: 'Academy',
        to: 'dashboard-academy',
      },
      {
        title: 'Projects',
        to: 'dashboard-projects',
      },
      ...(currentUser.admin_teacher_id !== null ? [{
        title: 'Finance',
        to: 'dashboard-finance',
      }] : []),
    ],
    badgeContent: '3',
    badgeClass: 'bg-global-primary',
  },
]
