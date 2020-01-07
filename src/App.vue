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
                        v-if="query.length"
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
                <div class="flex mt-3"></div>
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
import { ref } from '@vue/composition-api';

window.places = {};
window.markers = {};

export default {
  name: 'app',
  setup() {
    let query = ref('');
    let setQuery = q => {
      query = q;
    };

    return { query, setQuery };
  },
  components: {},
};
</script>
