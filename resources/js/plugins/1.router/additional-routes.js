// 👉 Redirects
export const redirects = [
  // ℹ️ We are redirecting to different pages based on role.
  // NOTE: Role is just for UI purposes. ACL is based on abilities.
  {
    path: '/login',
    name: 'login-redirect',
    redirect: to => {
      const returnTo = to.query.return_to || to.query.to
      const userData = useCookie('userData')

      if (returnTo && userData.value) {
        window.location.href = String(returnTo)
        return
      }

      if (!userData.value) {
        return { name: 'login', query: to.query }
      }

      const userRole = userData.value?.role ?? 0
      if (userRole > 0)
        return { name: 'dashboard-projects' }
      if (userRole == 0)
        return { name: 'access-control' }
      
      return { name: 'login', query: to.query }
    },
  },
  {
    path: '/',
    name: 'index',
    component: () => import('@/pages/index.vue'),
  },
  {
    path: '/',
    name: 'front',
    component: () => import('@/pages/index.vue'),
  },
  // Backward compatibility redirects for /front prefix
  {
    path: '/front',
    redirect: '/',
  },
  {
    path: '/front/home',
    redirect: '/',
  },
  {
    path: '/front/project',
    redirect: '/project',
  },
  {
    path: '/front/about',
    redirect: '/about',
  },
  {
    path: '/front/learning',
    redirect: '/learning',
  },
  {
    path: '/front/contact',
    redirect: '/contact',
  },
  // Backward compatibility redirects for /home and /dashboard prefix
  {
    path: '/dashboard',
    redirect: '/dashboard/projects',
  },
  {
    path: '/home',
    redirect: '/dashboard/projects',
  },
  {
    path: '/home/projects',
    redirect: '/dashboard/projects',
  },
  {
    path: '/home/academy',
    redirect: '/dashboard/academy',
  },
  {
    path: '/home/finance',
    redirect: '/dashboard/finance',
  },
  {
    path: '/pages/user-profile',
    name: 'pages-user-profile',
    redirect: () => ({ name: 'profile-user-tab', params: { tab: 'overview' } }),
  },
  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    redirect: () => ({ name: 'profile-user-tab', params: { tab: 'security' } }),
  },
]

export const routes = [
  {
    path: '/dashboards/academy',
    name: 'dashboards-academy',
    component: () => import('@/pages/academy/dashboard.vue'),
  },
]
