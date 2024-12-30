export default [
  {
    title: 'Profile',
    icon: { icon: 'tabler-users' },
    children: [
      { title: 'User', to: { name: 'profile-user-tab', params: { tab: 'overview' } } },
      { title: 'School', to: 'profile-school' },
      {
        title: 'Teacher',
        children: [
          { title: 'List', to: 'profile-teacher-list' },
          { title: 'Detail', to: { name: 'profile-teacher-detail-tab', params: { tab: 'account' } } },
        ],
      },
      {
        title: 'Student',
        children: [
          { title: 'List', to: 'profile-student-list' },
          { title: 'Detail', to: { name: 'profile-student-detail-tab', params: { tab: 'account' } } },
        ],
      },

    ],
  },
]
