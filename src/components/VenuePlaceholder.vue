<template>
  <div class="w-full">
    <div class="w-full h-64 bg-gray-200 rounded" />

    <info>
      <info-item :icon="'map-marker'">
        <template v-slot:action>
          <div class="text-sm inline-block w-24 bg-gray-400" v-html="'&nbsp;'"></div>
        </template>

        <div class="text-sm w-full h-20 bg-gray-400" v-html="'&nbsp;'"></div>
      </info-item>

      <info-item :icon="'phone-alt'">
        <template v-slot:action>
          <div class="text-sm inline-block w-16 bg-gray-400" v-html="'&nbsp;'"></div>
        </template>

        <div class="text-sm w-40 bg-gray-400" v-html="'&nbsp;'"></div>
      </info-item>

      <info-item :icon="'globe'">
        <div class="text-sm w-24 bg-gray-400" v-html="'&nbsp;'"></div>
      </info-item>

      <info-item :icon="'clock'">
        <div class="text-sm w-24 bg-gray-400" v-html="'&nbsp;'"></div>
      </info-item>

      <info-item :icon="'utensils'">
        <div class="text-sm capitalize w-24 bg-gray-400" v-html="'&nbsp;'"></div>
      </info-item>
    </info>
  </div>
</template>

<script>
////////////////////////////////////////////////////////////////////////////////////////////////////

import Info from './Info.vue';
import InfoItem from './InfoItem.vue';

////////////////////////////////////////////////////////////////////////////////////////////////////

export default {
  name: 'VenuePlaceholder',
  components: { Info, InfoItem },
};
</script>

<style></style>
