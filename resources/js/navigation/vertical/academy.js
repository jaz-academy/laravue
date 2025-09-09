const currentUser = useCookie('userData')

export default [
  { heading: 'Academy' },
  {
    title: 'Calendar',
    icon: { icon: 'tabler-calendar' },

    to: 'academy-calendar',
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
    title: 'Awards',
    icon: { icon: 'tabler-trophy' },
    to: 'academy-awards',
  },
  {
    title: 'Courses',
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

      // { title: 'Details', to: { name: 'academy-assessment-details-id', params: { id: 478426 } } },
      { title: 'Report', to: { name: 'academy-assessment-report-id', params: { id: currentUser.value?.admin_student_id || 1 } } },
    ],
  },

]
