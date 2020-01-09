<template>
  <badge class="bg-blue-200 text-blue-800">
    <slot></slot>
  </badge>
</template>

<script>
import Badge from './Badge.vue';

export default {
  name: 'RatingBadge',
  components: { Badge },
};
</script>

<style></style>
