<template>
  <div class="absolute inset-0">
    <div class="flex relative w-full h-full overflow-hidden">
      <div class="flex-initial relative w-full max-w-xl h-full shadow-xl z-50">
        <div class="flex flex-col w-full h-full">
          <header class="flex-none">
            <nav class="flex py-4 border-b">
              <div class="w-full px-6">
                <div class="flex items-center h-12 shadow-md rounded">
                  <label for="" class="w-full">
                    <div class="flex">
                      <div
                        class="flex flex-initial w-10 h-10 items-center justify-center cursor-pointer"
                      >
                        <fa-icon class="text-gray-900" icon="search"></fa-icon>
                      </div>
                      <input
                        type="text"
                        class="flex-auto h-10 font-bold text-gray-900 placeholder-gray-600 rounded"
                        placeholder="Search a Restaurant"
                        v-model.trim="query"
                      />
                      <div
                        v-if="query.length > 0"
                        class="flex flex-initial w-10 h-10 items-center justify-center cursor-pointer"
                        tab-index="0"
                        role="button"
                        @keydown.prevent.enter.space="query = ''"
                        @click="query = ''"
                      >
                        <fa-icon class="text-gray-900" icon="times"></fa-icon>
                      </div>
                    </div>
                  </label>
                </div>
                <div class="flex mt-3">
                  <div class="flex-1">
                    <select
                      class="w-full h-12 px-4 font-bold text-gray-900 bg-gray-200 shadow-inner appeareance-none rounded"
                      v-model="minRating"
                    >
                      <option value="0">New</option>
                      <option
                        v-for="option in minRatingRange"
                        :key="`min-rating-option-${option}`"
                        :value="option"
                        >{{ option }}</option
                      >
                    </select>
                  </div>
                  <div class="flex items-center justify-center w-12">
                    <span class="font-bold">⯈</span>
                  </div>
                  <div class="flex-1">
                    <select
                      class="w-full h-12 px-4 font-bold text-gray-900 bg-gray-200 shadow-inner appeareance-none rounded"
                      v-model="maxRating"
                    >
                      <option
                        v-for="option in maxRatingRange"
                        :key="`min-rating-option-${option}`"
                        :value="option"
                        >{{ option }}</option
                      >
                    </select>
                  </div>
                </div>
              </div>
            </nav>
          </header>
          <div class="relative flex-1 max-h-full"></div>
        </div>
      </div>
      <div class="flex-auto relative">
        <div class="absolute inset-0"></div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
// import Vue from 'vue';
import { ref, computed } from '@vue/composition-api';
import { range } from './helpers';

// import GMap from './components/GMap.vue';

window.places = {};
window.markers = {};

export default {
  name: 'app',
  setup() {
    let query = ref('');
    let minRatingRange = range(1, 5);
    let minRating = ref(0);
    let maxRatingRange = computed(() => range(minRating.value + 1, 6));
    let maxRating = ref(5);

    return { query, minRatingRange, minRating, maxRatingRange, maxRating };
  },
  components: {},
};
</script>

<style>
body {
  font-family: 'Montserrat', sans-serif;
}
.left-xl {
  left: 36rem;
}
.z-1 {
  z-index: -1;
}
</style>
