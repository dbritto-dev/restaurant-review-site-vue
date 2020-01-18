<template>
  <div
    ref="scrollableRef"
    class="relative w-full h-full max-h-full overflow-x-hidden overflow-y-scroll"
  >
    <slot></slot>
  </div>
</template>

<script>
import { ref, watch } from '@vue/composition-api';

export default {
  name: 'Scrollable',
  props: ['trigger'],
  setup(props) {
    const scrollableRef = ref({ scrollTo: () => {} });

    watch(
      () => props.trigger,
      () => {
        scrollableRef.value.scrollTo(0, 0);
      }
    );

    return { scrollableRef };
  },
};
</script>

<style></style>
