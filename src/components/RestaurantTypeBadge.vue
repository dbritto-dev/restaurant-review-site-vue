<template>
  <badge class="bg-purple-200 text-purple-800">
    <slot></slot>
  </badge>
</template>

<script>
import Badge from './Badge.vue';

export default {
  name: 'RatingTypeBadge',
  components: { Badge },
};
</script>

<style></style>
