const userData = useCookie('userData')
const idTeacher = userData.value?.admin_teacher_id || 1
const idStudent = userData.value?.admin_student_id || 1

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
          { title: 'Detail', to: { name: 'profile-teacher-id-tab', params: { id: idTeacher, tab: 'account' } } },
        ],
      },
      {
        title: 'Student',
        children: [
          { title: 'List', to: 'profile-student-list' },
          { title: 'Detail', to: { name: 'profile-student-id-tab', params: { id: idStudent, tab: 'account' } } },
        ],
      },

    ],
  },
]
