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
    title: 'Course',
    icon: { icon: 'tabler-book' },
    children: [
      { title: 'List', to: 'academy-course-list' },
      { title: 'Details', to: 'academy-course-details' },
      {
        title: 'Product',
        children: [
          { title: 'Courses', to: 'academy-product-courses' },
          { title: 'List', to: 'academy-product-list' },
          { title: 'Add', to: 'academy-product-add' },
        ],
      },
    ],
  },
  {
    title: 'Assessment',
    icon: { icon: 'tabler-chart-bar' },
    children: [
      { title: 'Subject', to: 'academy-assessment-subject' },
      { title: 'Competence', to: 'academy-assessment-competence' },

      { title: 'Scores', to: 'academy-assessment-scores' },
      { title: 'Edit', to: { name: 'academy-assessment-scores-edit-id', params: { id: '5036' } } },
      { title: 'Details', to: { name: 'academy-assessment-details-id', params: { id: 478426 } } },
      { title: 'Report', to: { name: 'academy-assessment-report-id', params: { id: '5036' } } },
    ],
  },
]
