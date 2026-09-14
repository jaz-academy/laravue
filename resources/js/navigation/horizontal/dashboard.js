const currentUser = useCookie('userData')

export default [
  {
    title: 'Dashboard',
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
      ...(currentUser.value?.admin_teacher_id ? [{
        title: 'Finance',
        to: 'dashboard-finance',
      }] : []),
    ],
    badgeContent: '3',
    badgeClass: 'bg-global-primary',
  },
]
