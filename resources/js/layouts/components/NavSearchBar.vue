<script setup>
import { useConfigStore } from '@core/stores/config'
import Shepherd from 'shepherd.js'

defineOptions({
  // 👉 Is App Search Bar Visible
  inheritAttrs: false,
})

const configStore = useConfigStore()
const isAppSearchBarVisible = ref(false)

// 👉 Default suggestions
const suggestionGroups = [
  {
    title: 'Pilihan Populer',
    content: [
      { icon: 'tabler-smart-home', title: 'Projects Dashboard', url: { name: 'dashboard-projects' } },
      { icon: 'tabler-calendar', title: 'Agenda Kalender', url: { name: 'academy-calendar' } },
      { icon: 'tabler-mail', title: 'JazMail', url: { name: 'academy-jazmail' } },
      { icon: 'tabler-code', title: 'SSO Provider', url: { name: 'developer-sso' } },
    ],
  },
  {
    title: 'Akademi & Santri',
    content: [
      { icon: 'tabler-users', title: 'Daftar Santri', url: { name: 'profile-student-list' } },
      { icon: 'tabler-book-2', title: 'Mata Pelajaran', url: { name: 'academy-course-list' } },
      { icon: 'tabler-forms', title: 'Rencana Proyek', url: { name: 'academy-project-plans' } },
      { icon: 'tabler-chart-bar', title: 'Nilai Santri', url: { name: 'academy-assessment-scores' } },
    ],
  },
  {
    title: 'Keuangan',
    content: [
      { icon: 'tabler-pig-money', title: 'Tabungan Santri', url: { name: 'financial-savings' } },
      { icon: 'tabler-receipt', title: 'Tagihan Pembayaran', url: { name: 'financial-payment-list' } },
      { icon: 'tabler-building-bank', title: 'Kas & Rekening', url: { name: 'financial-finance' } },
    ],
  },
]

// 👉 No Data suggestion
const noDataSuggestions = [
  {
    title: 'Projects Dashboard',
    icon: 'tabler-smart-home',
    url: { name: 'dashboard-projects' },
  },
  {
    title: 'Kalender Akademik',
    icon: 'tabler-calendar',
    url: { name: 'academy-calendar' },
  },
  {
    title: 'Developer SSO',
    icon: 'tabler-code',
    url: { name: 'developer-sso' },
  },
]

const jazSearchCatalog = [
  {
    title: 'Dashboards',
    category: 'dashboards',
    children: [
      { url: { name: 'dashboard-projects' }, icon: 'tabler-smart-home', title: 'Projects Dashboard' },
      { url: { name: 'dashboard-academy' }, icon: 'tabler-book', title: 'Academy Dashboard' },
      { url: { name: 'dashboard-finance' }, icon: 'tabler-report-money', title: 'Finance Dashboard' },
    ],
  },
  {
    title: 'Academy',
    category: 'academy',
    children: [
      { url: { name: 'academy-calendar' }, icon: 'tabler-calendar', title: 'Calendar Akademik' },
      { url: { name: 'academy-jazmail' }, icon: 'tabler-mail', title: 'JazMail Webmail' },
      { url: { name: 'academy-project-plans' }, icon: 'tabler-forms', title: 'Project Plans' },
      { url: { name: 'academy-project-tasks' }, icon: 'tabler-checkbox', title: 'Project Tasks' },
      { url: { name: 'academy-awards' }, icon: 'tabler-trophy', title: 'Penghargaan / Awards' },
      { url: { name: 'academy-course-list' }, icon: 'tabler-book-2', title: 'Mata Kuliah / Courses' },
      { url: { name: 'academy-assessment-scores' }, icon: 'tabler-chart-bar', title: 'Penilaian / Assessment Scores' },
      { url: { name: 'academy-assessment-reflection' }, icon: 'tabler-notes', title: 'Refleksi Santri' },
    ],
  },
  {
    title: 'Profile & Pengguna',
    category: 'profile',
    children: [
      { url: { name: 'profile-student-list' }, icon: 'tabler-users', title: 'Daftar Santri' },
      { url: { name: 'profile-teacher-list' }, icon: 'tabler-user-check', title: 'Daftar Guru / Pengajar' },
      { url: { name: 'profile-school' }, icon: 'tabler-building', title: 'Profil Sekolah' },
      { url: { name: 'profile-users' }, icon: 'tabler-user', title: 'Manajemen Pengguna' },
    ],
  },
  {
    title: 'Financials',
    category: 'financials',
    children: [
      { url: { name: 'financial-savings' }, icon: 'tabler-pig-money', title: 'Tabungan Santri' },
      { url: { name: 'financial-payment-list' }, icon: 'tabler-receipt', title: 'Daftar Pembayaran & SPP' },
      { url: { name: 'financial-finance' }, icon: 'tabler-building-bank', title: 'Kas & Rekening Keuangan' },
    ],
  },
  {
    title: 'Developer Tools',
    category: 'developer',
    children: [
      { url: { name: 'developer-sso' }, icon: 'tabler-code', title: 'SSO Provider & Widget Generator' },
      { url: { name: 'developer-api' }, icon: 'tabler-file-code', title: 'Dokumentasi API' },
      { url: { name: 'admin-oauth-clients' }, icon: 'tabler-key', title: 'OAuth2 Client Manager' },
    ],
  },
]

const searchQuery = ref('')
const router = useRouter()
const searchResult = ref([])

const fetchResults = () => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) {
    searchResult.value = []
    return
  }

  const results = []
  for (const group of jazSearchCatalog) {
    const matchedChildren = group.children.filter(child =>
      child.title.toLowerCase().includes(query)
    )
    if (matchedChildren.length) {
      results.push({
        ...group,
        children: matchedChildren,
      })
    }
  }
  searchResult.value = results
}

watch(searchQuery, fetchResults)

const redirectToSuggestedOrSearchedPage = selected => {
  router.push(selected.url)
  isAppSearchBarVisible.value = false
  searchQuery.value = ''
}

const LazyAppBarSearch = defineAsyncComponent(() => import('@core/components/AppBarSearch.vue'))
</script>

<template>
  <div
    class="d-flex align-center cursor-pointer"
    v-bind="$attrs"
    style="user-select: none;"
    @click="isAppSearchBarVisible = !isAppSearchBarVisible"
  >
    <!-- 👉 Search Trigger button -->
    <!-- close active tour while opening search bar using icon -->
    <IconBtn
      class="me-1"
      @click="Shepherd.activeTour?.cancel()"
    >
      <VIcon
        size="26"
        icon="tabler-search"
      />
    </IconBtn>

    <span
      v-if="configStore.appContentLayoutNav === 'vertical'"
      class="d-none d-md-flex align-center text-disabled"
      @click="Shepherd.activeTour?.cancel()"
    >
      <span class="me-3">Search</span>
      <span class="meta-key">&#8984;K</span>
    </span>
  </div>

  <!-- 👉 App Bar Search -->
  <LazyAppBarSearch
    v-model:is-dialog-visible="isAppSearchBarVisible"
    :search-results="searchResult"
    @search="searchQuery = $event"
  >
    <!-- suggestion -->
    <template #suggestions>
      <VCardText class="app-bar-search-suggestions h-100 pa-10">
        <VRow
          v-if="suggestionGroups"
          class="gap-y-4"
        >
          <VCol
            v-for="suggestion in suggestionGroups"
            :key="suggestion.title"
            cols="12"
            sm="6"
            class="ps-6"
          >
            <p class="text-xs text-disabled text-uppercase">
              {{ suggestion.title }}
            </p>
            <VList class="card-list">
              <VListItem
                v-for="item in suggestion.content"
                :key="item.title"
                link
                :title="item.title"
                class="app-bar-search-suggestion"
                @click="redirectToSuggestedOrSearchedPage(item)"
              >
                <template #prepend>
                  <VIcon
                    :icon="item.icon"
                    size="20"
                    class="me-2"
                  />
                </template>
              </VListItem>
            </VList>
          </VCol>
        </VRow>
      </VCardText>
    </template>
    <!-- no data suggestion -->
    <template #noDataSuggestion>
      <div class="mt-8">
        <span class="d-flex justify-center text-disabled">Try searching for</span>
        <h6
          v-for="suggestion in noDataSuggestions"
          :key="suggestion.title"
          class="app-bar-search-suggestion text-sm font-weight-regular cursor-pointer mt-3"
          @click="redirectToSuggestedOrSearchedPage(suggestion)"
        >
          <VIcon
            size="20"
            :icon="suggestion.icon"
            class="me-3"
          />
          <span class="text-sm">{{ suggestion.title }}</span>
        </h6>
      </div>
    </template>
    <!-- search result -->
    <template #searchResult="{ item }">
      <VListSubheader class="text-disabled">
        {{ item.title }}
      </VListSubheader>
      <VListItem
        v-for="list in item.children"
        :key="list.title"
        link
        @click="redirectToSuggestedOrSearchedPage(list)"
      >
        <template #prepend>
          <VIcon
            size="20"
            :icon="list.icon"
            class="me-3"
          />
        </template>
        <template #append>
          <VIcon
            size="20"
            icon="tabler-corner-down-left"
            class="enter-icon text-disabled"
          />
        </template>
        <VListItemTitle>
          {{ list.title }}
        </VListItemTitle>
      </VListItem>
    </template>
  </LazyAppBarSearch>
</template>

<style lang="scss" scoped>
@use "@styles/variables/_vuetify.scss";

.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>
