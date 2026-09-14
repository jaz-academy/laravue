<script setup>
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { useWindowScroll } from '@vueuse/core'
import { useDisplay } from 'vuetify'

const props = defineProps({ activeId: String })

const display = useDisplay()
const { y } = useWindowScroll()
const route = useRoute()
const router = useRouter()
const sidebar = ref(false)

const lastScrollY = ref(0)
const isNavbarVisible = ref(true)

watch(y, newY => {
  const diff = newY - lastScrollY.value

  // Always show navbar near the top of the page
  if (newY <= 60) {
    isNavbarVisible.value = true
  } else if (diff > 8) {
    // Scrolling down -> hide navbar
    isNavbarVisible.value = false
  } else if (diff < -8) {
    // Scrolling up -> show navbar
    isNavbarVisible.value = true
  }
  lastScrollY.value = newY
})

watch(() => display, () => {
  return display.mdAndUp ? sidebar.value = false : sidebar.value
}, { deep: true })

</script>

<template>
  <!-- 👉 Navigation drawer for mobile devices  -->
  <VNavigationDrawer
    v-model="sidebar"
    width="275"
    disable-resize-watcher
  >
    <!-- Nav items -->
    <div>
      <div class="d-flex flex-column gap-y-4 pa-4">
        <RouterLink
          class="nav-link font-weight-medium ms-2 mt-4"
          to="/"
          :class="[ $route.path === '/' ? 'active-link' : '']"
        >
          Home
        </RouterLink>

        <RouterLink
          class="nav-link font-weight-medium ms-2 mt-3"
          to="/project"
          :class="[ $route.path === '/project' ? 'active-link' : '']"
        >
          Project
        </RouterLink>

        <RouterLink
          class="nav-link font-weight-medium ms-2 mt-3"
          to="/about"
          :class="[ $route.path === '/about' ? 'active-link' : '']"
        >
          About
        </RouterLink>

        <RouterLink
          class="nav-link font-weight-medium ms-2 mt-3"
          to="/learning"
          :class="[ $route.path === '/learning' ? 'active-link' : '']"
        >
          Learning
        </RouterLink>

        <RouterLink
          class="nav-link font-weight-medium ms-2 mt-3"
          to="/contact"
          :class="[ $route.path === '/contact' ? 'active-link' : '']"
        >
          Contact
        </RouterLink>

        <RouterLink
          class="nav-link font-weight-medium ms-2 mt-3"
          to="/login"
          :class="[ $route.path === '/login' ? 'active-link' : '']"
        >
          Login
        </RouterLink>
      </div>
    </div>

    <!-- Navigation drawer close icon -->
    <VIcon
      id="navigation-drawer-close-btn"
      icon="tabler-x"
      size="20"
      @click="sidebar = !sidebar"
    />
  </VNavigationDrawer>

  <!-- 👉 Navbar for desktop devices  -->
  <div class="front-page-navbar">
    <VAppBar
      :color="$vuetify.theme.current.dark ? 'rgba(var(--v-theme-background))' : 'rgba(255,255,255, 0.38)'"
      :class="[
        y > 10 ? 'app-bar-scrolled' : [$vuetify.theme.current.dark ? 'app-bar-dark' : 'app-bar-light', 'elevation-0'],
        { 'navbar-hidden': !isNavbarVisible }
      ]"
      class="navbar-blur"
    >
      <!-- toggle icon for mobile device -->
      <IconBtn
        id="vertical-nav-toggle-btn"
        class="ms-n3 me-2 d-inline-block d-md-none"
        @click="sidebar = !sidebar"
      >
        <VIcon
          size="26"
          icon="tabler-menu-2"
          color="rgba(var(--v-theme-on-surface))"
        />
      </IconBtn>
      <!-- Title and Landing page sections -->
      <div class="d-flex align-center">
        <VAppBarTitle class="me-6">
          <RouterLink
            to="/"
            class="d-flex gap-x-4"
            :class="$vuetify.display.mdAndUp ? 'd-none' : 'd-block'"
          >
            <div class="d-flex gap-x-3 align-center">
              <VNodeRenderer :nodes="themeConfig.app.logo" />
              <h4 class="text-h4 text-capitalize text-truncate font-weight-bold">
                {{ themeConfig.app.title }}
              </h4>
            </div>
          </RouterLink>
        </VAppBarTitle>

        <!-- landing page sections -->
        <div class="text-base align-center d-none d-md-flex">
          <RouterLink
            class="nav-link font-weight-medium px-2 px-lg-4 py-2"
            to="/"
            :class="[ $route.path === '/' ? 'active-link' : '']"
          >
            Home
          </RouterLink>

          <RouterLink
            class="nav-link font-weight-medium px-2 px-lg-4 py-2"
            to="/project"
            :class="[ $route.path === '/project' ? 'active-link' : '']"
          >
            Project
          </RouterLink>

          <RouterLink
            class="nav-link font-weight-medium px-2 px-lg-4 py-2"
            to="/about"
            :class="[ $route.path === '/about' ? 'active-link' : '']"
          >
            About
          </RouterLink>

          <RouterLink
            class="nav-link font-weight-medium px-2 px-lg-4 py-2"
            to="/learning"
            :class="[ $route.path === '/learning' ? 'active-link' : '']"
          >
            Learning
          </RouterLink>

          <RouterLink
            class="nav-link font-weight-medium px-2 px-lg-4 py-2"
            to="/contact"
            :class="[ $route.path === '/contact' ? 'active-link' : '']"
          >
            Contact
          </RouterLink>
        </div>
      </div>

      <VSpacer />

      <div class="d-none d-md-flex gap-x-4">
        <NavbarThemeSwitcher />

        <VBtn
          variant="elevated"
          color="primary"
          href="/login"
          rel="noopener noreferrer"
        >
          <VIcon
            icon="tabler-login"
            size="18"
          />
          <span class="d-none d-lg-block ms-2">Member Area</span>
        </VBtn>
      </div>
    </VAppBar>
  </div>
</template>

<style lang="scss" scoped>
.nav-menu{
  display: flex;
  gap: 3rem;
}

.nav-link{
  &:not(:hover){
    color: rgb(var(--v-theme-on-surface))
  }
}

.page-link{
  &:hover{
    color: rgb(var(--v-theme-primary)) !important;
  }
}

@media (max-width: 1280px){
  .nav-menu{
    gap: 2.25rem;
  }
}

@media (min-width: 1920px) {
  .front-page-navbar {
    .v-toolbar {
      max-inline-size: calc(1440px - 32px);
    }
  }
}

@media (min-width: 1280px) and (max-width: 1919px) {
  .front-page-navbar {
    .v-toolbar {
      max-inline-size: calc(1200px - 32px);
    }
  }
}

@media (min-width: 960px) and (max-width: 1279px) {
  .front-page-navbar {
    .v-toolbar {
      max-inline-size: calc(900px - 32px);
    }
  }
}

@media (min-width: 600px) and (max-width: 959px) {
  .front-page-navbar {
    .v-toolbar {
      max-inline-size: calc(100% - 64px);
    }
  }
}

@media (max-width: 600px) {
  .front-page-navbar {
    .v-toolbar {
      max-inline-size: calc(100% - 32px);
    }
  }
}

.nav-item-img {
  border: 10px solid rgb(var(--v-theme-background));
  border-radius: 10px;
}

.active-link {
  color: rgb(var(--v-theme-primary)) !important;
}

.app-bar-light{
  border: 2px solid rgba(var(--v-theme-surface),68%);
  border-radius: 0.5rem;
  background-color: rgba(var(-v--theme-surface),38%);
  transition: all 0.1s ease-in-out;
}

.app-bar-dark{
  border: 2px solid rgba(255,255,255,8%);
  border-radius: 0.5rem;
  background-color: rgba(255,255,255,4%);
  transition: all 0.1s ease-in-out;
}

.app-bar-scrolled{
  border-radius: 0.5rem;
  background-color: rgb(var(--v-theme-surface)) !important;
  transition: all 0.1s ease-in-out;
}

.front-page-navbar::after{
  position: fixed;
  z-index: 1;
  backdrop-filter: saturate(100%) blur(6px);
  block-size: 5rem;
  content: '';
  inline-size: 100%;
  inset-block-start: 0;
  inset-inline-start: 0;
  pointer-events: none;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease;
}

.front-page-navbar:has(.navbar-hidden)::after {
  opacity: 0;
  transform: translateY(-100%);
}
</style>

<style lang="scss">
@use "@layouts/styles/mixins" as layoutMixins;

.mega-menu{
  position: fixed !important;
  inset-block-start: 5rem;
  inset-inline-start: 50%;
  transform: translateX(-50%);
}

.front-page-navbar {
  .v-toolbar__content {
    padding-inline: 1.5rem !important;
  }

  .v-toolbar {
    inset-block-start: 0 !important;
    inset-inline: 0 !important;
    margin-block-start: 1rem !important;
    margin-inline: auto !important;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease, box-shadow 0.2s ease !important;

    &.navbar-hidden {
      transform: translateY(calc(-100% - 2rem)) !important;
    }
  }

}

.mega-menu-item {
  &:hover {
    color: rgb(var(--v-theme-primary)) !important;
  }
}

#navigation-drawer-close-btn {
  position: absolute;
  cursor: pointer;
  inset-block-start: 0.5rem;
  inset-inline-end: 1rem;
}
</style>
