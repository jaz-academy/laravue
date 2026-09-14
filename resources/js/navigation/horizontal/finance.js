const currentUser = useCookie('userData')

export default [
  { heading: 'Financials' },
  {
    title: 'Savings',
    icon: { icon: 'tabler-report-money' },
    to: 'financial-savings',
  },
  ...((currentUser.value?.access ?? []).includes('Payment') ? [{
    title: 'Payment',
    icon: { icon: 'tabler-calendar-dollar' },
    children: [
      { 
        title: 'Items',
        children: [
          { title: 'List', to: 'financial-payment-list' },
          { title: 'Preview', to: { name: 'financial-payment-preview-id', params: { id: 'new' } } },
          ...((currentUser.value?.role >= 4) ? [
            { title: 'Edit', to: { name: 'financial-payment-edit-id', params: { id: 'new' } } },
          ] : []),
          { title: 'Recap', to: { name: 'financial-payment-recap-id-year', params: { id: currentUser.value?.admin_student_id || '3', year: 'last' } } },
        ],
      },
      ...((currentUser.value?.role >= 4) ? [
        { title: 'Discount', to: 'financial-payment-discount' },
        { title: 'Billing', to: 'financial-payment-billing' },
      ] : []),
    ],
  }] : []),
  ...((currentUser.value?.access ?? []).includes('Finance') ? [{
    title: 'Finance',
    icon: { icon: 'tabler-building-bank' },
    children: [
      { 
        title: 'Items',
        children: [
          { title: 'List', to: 'financial-finance' },
          { title: 'Preview', to: { name: 'financial-finance-preview-id', params: { id: 'new' } } },
          { title: 'Edit', to: { name: 'financial-finance-edit-id', params: { id: 'new' } } },
        ],
      },
      { title: 'Account', to: 'financial-finance-account' },
    ],
  }] : []),
]
  