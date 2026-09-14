const currentUser = useCookie('userData')

export default [
  {
    title: 'Academy',
    icon: { icon: 'tabler-school' },
    children: [
      {
        title: 'Calendar',
        icon: { icon: 'tabler-calendar' },

        to: 'academy-calendar',
      },
      {
        title: 'Email',
        icon: { icon: 'tabler-mail' },
        to: 'academy-jazmail',
      },
      {
        title: 'Awards',
        icon: { icon: 'tabler-trophy' },
        to: 'academy-awards',
      },
      {
        title: 'Savings',
        icon: { icon: 'tabler-report-money' },
        to: 'financial-savings',
      },
    ],
  },
  {
    title: 'Project',
    icon: { icon: 'tabler-forms' },
    children: [
      { title: 'Plans', to: 'academy-project-plans' },
      { title: 'Tasks', to: 'academy-project-tasks' },
    ],
  },
  {
    title: 'Course',
    icon: { icon: 'tabler-book' },
    children: [
      { title: 'List', to: 'academy-course-list' },
      { title: 'Details', to: { 
        name: 'academy-course-details', 
        query: { name: 'ICT - Pengantar Hardware', id: 52 }, 
      } },
      ...((currentUser.value?.access ?? []).includes('Courses') ? [{
        title: 'Collections',
        children: [
          { title: 'List', to: 'academy-product-list' },
        ],
      }] : []),
    ],
  },
  {
    title: 'Assessment',
    icon: { icon: 'tabler-chart-bar' },
    children: [
      ...(
        (currentUser.value?.access ?? []).includes('Assessment')
          ? [
            { title: 'Subject', to: 'academy-assessment-subject' },
            { title: 'Competence', to: 'academy-assessment-competence' },
            { title: 'Scores', to: 'academy-assessment-scores' },
            { title: 'Edit', to: { name: 'academy-assessment-scores-edit-id', params: { id: 'new' } } },
          ] : []
      ),

      { title: 'Report', to: { name: 'academy-assessment-report-id-semester', params: { id: currentUser.value?.admin_student_id || 3, semester: 'last' } } },
      { title: 'Reflection', to: 'academy-assessment-reflection' },
    ],
  },

]
