export default [
  { heading: 'Financials' },
  {
    title: 'Savings',
    icon: { icon: 'tabler-report-money' },
    children: [
      { title: 'List', to: 'apps-invoice-list' },
      { title: 'Preview', to: { name: 'apps-invoice-preview-id', params: { id: '5036' } } },
      { title: 'Edit', to: { name: 'apps-invoice-edit-id', params: { id: '5036' } } },
      { title: 'Add', to: 'apps-invoice-add' },
    ],
  },
  {
    title: 'Payment',
    icon: { icon: 'tabler-calendar-dollar' },
    children: [
      { title: 'Items' },
      { title: 'Recap' },
      { title: 'Discount' },
      { title: 'Billing' },
    ],
  },
  {
    title: 'Finance',
    icon: { icon: 'tabler-building-bank' },
    children: [
      { title: 'Items' },
      { title: 'Account' },
    ],
  },
]
  