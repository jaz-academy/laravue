import { canNavigate } from '@layouts/plugins/casl'

export const setupGuards = router => {
  // 👉 router.beforeEach
  // Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
  router.beforeEach(to => {
    // Bypass guard untuk path '/'
    if (to.path === '/') {
      return
    }

    /*
         * If it's a public route, continue navigation. This kind of pages are allowed to visited by login & non-login users. Basically, without any restrictions.
         * Examples of public routes are, 404, under maintenance, etc.
         */
    if (to.meta.public)
      return

    /**
         * Check if user is logged in by checking if token & user data exists in local storage
         * Feel free to update this logic to suit your needs
         */
    const userData = useCookie('userData')
    const accessToken = useCookie('accessToken')

    const isLoggedIn = computed(() => !!(userData.value && accessToken.value))

    /*
          If user is logged in and is trying to access login like page, redirect to home
          else allow visiting the page
          (WARN: Don't allow executing further by return statement because next code will check for permissions)
         */
    if (to.meta.unauthenticatedOnly) {
      if (isLoggedIn.value)
        return '/'
      else
        return undefined
    }
    
    // Exclude routes in the front-page folder
    if (to.path.startsWith('/front')) {
      return
    }

    if (!canNavigate(to)) {
      /* eslint-disable indent */
            return isLoggedIn.value
                ? { name: 'not-authorized' }
                : {
                    name: 'login',
                    query: {
                        ...to.query,
                        to: to.fullPath !== '/' ? to.path : undefined,
                    },
                }
            /* eslint-enable indent */
    }
  })
}
