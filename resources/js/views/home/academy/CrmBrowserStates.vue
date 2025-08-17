<script setup>
import brave from '@images/logos/brave.png'
import chrome from '@images/logos/chrome.png'
import firefox from '@images/logos/firefox.png'
import internetExplorer from '@images/logos/internet-explorer.png'
import operaMini from '@images/logos/opera-mini.png'
import safari from '@images/logos/safari.png'
import { computed } from 'vue'

const props = defineProps({
  informatics: { type: Array, default: () => [] },
  multimedias: { type: Array, default: () => [] },
})

console.log("informatics: ", props.informatics)
console.log("multimedias: ", props.multimedias)

const logos = [
  brave,
  chrome,
  firefox,
  internetExplorer,
  operaMini,
  safari,
]

const subjects = computed(() => [
  ...Object.entries(props.informatics || {}).map(([key, value], i) => ({
    avatarImg: logos[i % logos.length],
    title: key,
    stats: value,
    progress: value >= 90 ? 'success' : (value >= 75 ? 'primary' : 'error'),
  })),
  ...Object.entries(props.multimedias || {}).map(([key, value], i) => ({
    avatarImg: logos[i % logos.length],
    title: key,
    stats: value,
    progress: value >= 90 ? 'success' : (value >= 75 ? 'primary' : 'error'),
  })),
])

const moreList = [
  {
    title: 'Refresh',
    value: 'refresh',
  },
  {
    title: 'Download',
    value: 'Download',
  },
  {
    title: 'View All',
    value: 'View All',
  },
]
</script>

<template>
  <VCard
    title="Informatics"
    subtitle="Multimedia & Programming"
  >
    <template #append>
      <div class="mt-n4 me-n2">
        <MoreBtn :menu-list="moreList" />
      </div>
    </template>

    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="state in subjects"
          :key="state.title"
        >
          <template #prepend>
            <VAvatar size="28">
              <VImg :src="state.avatarImg" />
            </VAvatar>
          </template>

          <VListItemTitle class="font-weight-medium">
            {{ state.title }}
          </VListItemTitle>

          <template #append>
            <span
              class="font-weight-medium text-medium-emphasis me-3"
              :class="`text-${state.progress}`"
            >{{ state.stats }}</span>
            <VProgressCircular
              :model-value="state.stats"
              :color="state.progress"
              width="4"
              size="28"
            />
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 30px;
}
</style>
