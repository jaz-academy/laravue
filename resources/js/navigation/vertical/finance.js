export default [
  { heading: 'Financials' },
  {
    title: 'Savings',
    icon: { icon: 'tabler-report-money' },
    to: 'financial-savings',
  },
  {
    title: 'Payment',
    icon: { icon: 'tabler-calendar-dollar' },
    children: [
      { 
        title: 'Items',
        children: [
          { title: 'List', to: 'financial-payment-list' },
          { title: 'Add', to: 'financial-payment-add' },
          { title: 'Edit', to: { name: 'financial-payment-edit-id', params: { id: '5036' } } },
          { title: 'Preview', to: { name: 'financial-payment-preview-id', params: { id: '5036' } } },
        ],
      },
      { title: 'Recap', to: { name: 'financial-payment-recap-id', params: { id: '5036' } } },

      // { title: 'Discount', to: 'financial-payment-discount' },
      // { title: 'Billing', to: 'financial-payment-billing' },
    ],
  },
  {
    title: 'Finance',
    icon: { icon: 'tabler-building-bank' },
    children: [
      { 
        title: 'Items',
        children: [
          { title: 'List', to: 'financial-finance' },
          { title: 'Edit', to: { name: 'financial-finance-edit-id', params: { id: '5036' } } },
          { title: 'Preview', to: { name: 'financial-finance-preview-id', params: { id: '5036' } } },
        ],
      },
      { title: 'Account', to: 'financial-finance-account' },
    ],
  },
]
  