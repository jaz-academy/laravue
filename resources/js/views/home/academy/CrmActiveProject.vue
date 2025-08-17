<script setup>
import bootstrapLogo from '@images/icons/brands/bootstrap-logo.png'
import figmaLogo from '@images/icons/brands/figma-logo.png'
import laravelLogo from '@images/icons/brands/laravel-logo.png'
import reactLogo from '@images/icons/brands/react-logo.png'
import sketchLogo from '@images/icons/brands/sketch-logo.png'
import vuejsLogo from '@images/icons/brands/vuejs-logo.png'

const props = defineProps({
  bahasa: Array,
  dirosah: Array,
})

const logos = [
  bootstrapLogo,
  figmaLogo,
  laravelLogo,
  reactLogo,
  sketchLogo,
  vuejsLogo,
]

const subjects = computed(() => [
  ...Object.entries(props.bahasa || {}).map(([key, value], i) => ({
    avatarImg: logos[i % logos.length],
    title: key.substring(key.indexOf('-') + 1),
    subtitle: key.substring(0, key.indexOf('-')),
    stats: value,
    progressColor: value >= 90 ? 'success' : (value >= 75 ? 'primary' : 'error'),
  })),
  ...Object.entries(props.dirosah || {}).map(([key, value], i) => ({
    avatarImg: logos[i + 3 % logos.length],
    title: key.substring(key.indexOf('-') + 1),
    subtitle: key.substring(0, key.indexOf('-')),
    stats: value,
    progressColor: value >= 90 ? 'success' : (value >= 75 ? 'primary' : 'error'),
  })),
])

const moreList = [
  {
    title: 'Refresh',
    value: 'Refresh',
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
    title="Dirosah"
    subtitle="Languages & Lessons"
  >
    <template #append>
      <div class="mt-n4 me-n2">
        <MoreBtn :menu-list="moreList" />
      </div>
    </template>

    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="project in subjects"
          :key="project.title"
        >
          <template #prepend>
            <VAvatar
              size="34"
              rounded
            >
              <VImg :src="project.avatarImg" />
            </VAvatar>
          </template>

          <VListItemTitle class="font-weight-medium">
            {{ project.title }}
          </VListItemTitle>
          <VListItemSubtitle class="text-disabled">
            {{ project.subtitle }}
          </VListItemSubtitle>

          <template #append>
            <div class="d-flex align-center">
              <div
                class="me-4"
                style="inline-size: 15rem;"
              >
                <VProgressLinear
                  :model-value="project.stats"
                  :color="project.progressColor"
                  height="8"
                  rounded-bar
                  rounded
                />
              </div>
              <span :class="`text-${project.progressColor}`">{{ project.stats }}</span>
            </div>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>
