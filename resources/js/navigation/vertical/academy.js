export default [
  { heading: 'Academy' },
  {
    title: 'Calendar',
    icon: { icon: 'tabler-calendar' },
    to: 'apps-calendar',
  },
  {
    title: 'Project',
    icon: { icon: 'tabler-forms' },
    children: [
      { title: 'Plan' },
      { title: 'Task' },
    ],
  },
  {
    title: 'Award',
    icon: { icon: 'tabler-trophy' },
    to: '',
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
          { title: 'List', to: 'apps-ecommerce-product-list' },
          { title: 'Add', to: 'apps-ecommerce-product-add' },
          { title: 'Category', to: 'apps-ecommerce-product-category-list' },
        ],
      },
    ],
  },
  {
    title: 'Assessment',
    icon: { icon: 'tabler-chart-bar' },
    children: [
      { title: 'List', to: 'apps-ecommerce-customer-list' },
      { title: 'Details', to: { name: 'apps-ecommerce-customer-details-id', params: { id: 478426 } } },
      { title: 'Subject' },
      { title: 'Competence' },
      { title: 'Score' },
      { title: 'Report' },
    ],
  },
]
