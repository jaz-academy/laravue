export default [
  { heading: 'Templates' },
  {
    title: 'Developer Only',
    to: null,
    icon: { icon: 'tabler-eye-off' },
    disable: true,
  },
  {
    title: 'Dashboards',
    icon: { icon: 'tabler-smart-home' },
    children: [
      {
        title: 'Analytics',
        to: 'dashboards-analytics',
      },
      {
        title: 'CRM',
        to: 'dashboards-crm',
      },
      {
        title: 'Ecommerce',
        to: 'dashboards-ecommerce',
      },
      {
        title: 'Academy',
        to: 'dashboards-academy',
      },
      {
        title: 'Logistics',
        to: 'dashboards-logistics',
      },
    ], 
  },
]
