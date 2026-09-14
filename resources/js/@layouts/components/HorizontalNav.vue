<script setup>
import HorizontalNavGroup from './HorizontalNavGroup.vue'
import HorizontalNavLink from './HorizontalNavLink.vue'

const props = defineProps({
  navItems: {
    type: null,
    required: true,
  },
})

const resolveNavItemComponent = item => {
  if ('children' in item)
    return HorizontalNavGroup
  
  return HorizontalNavLink
}

const filteredNavItems = computed(() => (props.navItems || []).filter(item => item && !('heading' in item)))
</script>

<template>
  <ul class="nav-items">
    <Component
      :is="resolveNavItemComponent(item)"
      v-for="(item, index) in filteredNavItems"
      :key="index"
      :item="item"
    />
  </ul>
</template>

<style lang="scss">
.layout-wrapper.layout-nav-type-horizontal {
  .nav-items {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
