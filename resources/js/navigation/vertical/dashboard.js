export default [
  { heading: useCookie('userAbilityRules').value[0].member || 'Menu' },
  {
    title: 'Dashboards',
    icon: { icon: 'tabler-smart-home' },
    children: [
      {
        title: 'Academy',
        to: 'home-academy',
      },
      {
        title: 'Projects',
        to: 'home-projects',
      },
    ],
    badgeContent: '3',
    badgeClass: 'bg-global-primary',
  },
]
