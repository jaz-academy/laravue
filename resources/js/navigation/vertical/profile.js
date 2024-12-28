export default [
  {
    title: 'Profile',
    icon: { icon: 'tabler-users' },
    children: [
      { title: 'Overview', to: { name: 'profile-user-tab', params: { tab: 'profile' } } },
      { title: 'School', to: '' },
      {
        title: 'Teacher',
        children: [
          { title: 'List', to: 'profile-teacher-list' },
          { title: 'View', to: { name: 'profile-teacher-view-id', params: { id: 21 } } },
          { title: 'Account', to: { name: 'profile-teacher-account-tab', params: { tab: 'account' } } },
        ],
      },
      {
        title: 'Student',
        children: [
          { title: 'List', to: 'profile-student-list' },
          { title: 'View', to: { name: 'profile-student-view-id', params: { id: 21 } } },
          { title: 'Account', to: { name: 'profile-student-account-tab', params: { tab: 'account' } } },
        ],
      },

    ],
  },
]
