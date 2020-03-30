<template>
  <div class="w-full">
    <map :name="name"></map>

    <info>
      <info-item icon="map-marker">
        <template v-slot:action>
          <a
            rel="noopener noreferrer"
            class="text-sm text-indigo-600 no-underline hover:underline"
            :href="gmap"
            target="_blank"
          >
            Get directions
          </a>
        </template>

        <span class="text-sm text-gray-900">{{ address }}</span>
      </info-item>

      <info-item v-if="phoneNumber.length" icon="phone-alt">
        <template v-slot:action>
          <a
            rel="noopener noreferrer"
            class="text-sm text-indigo-600 no-underline hover:underline"
            :href="`tel:${phoneNumber.replace(/ /g, '')}`"
            target="_blank"
          >
            Call
          </a>
        </template>

        <span class="text-sm text-gray-900">{{ phoneNumber }}</span>
      </info-item>

      <info-item v-if="website.length" icon="globe">
        <a
          rel="noopener noreferrer"
          class="text-sm text-indigo-600 break-all no-underline hover:underline"
          href="{website}"
          target="_blank"
        >
          {{ website.indexOf('facebook') > -1 ? 'facebook.com' : website }}
        </a>
      </info-item>

      <info-item icon="clock">
        <span class="text-sm text-gray-900">{{ `${isOpenNow ? 'Open' : 'Closed now'}` }}</span>
      </info-item>

      <info-item icon="utensils">
        <span class="text-sm capitalize text-gray-900">{{ types.join(', ') }}</span>
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
  name: 'Venue',
  props: ['name', 'gmap', 'website', 'phoneNumber', 'types', 'isOpenNow', 'address'],
  components: { Info, InfoItem },
};
</script>

<style></style>
