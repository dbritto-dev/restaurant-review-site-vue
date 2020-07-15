<template>
  <div class="w-full">
    <header>
      <nav class="flex items-center absolute top-0 right-0 p-6">
        <div
          class="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md cursor-pointer select-none"
          role="button"
          tabIndex="0"
        >
          <fa-icon class="text-gray-900" icon="times"></fa-icon>
        </div>
      </nav>

      <div class="mb-8">
        <div class="w-full h-64 bg-gray-100" />
      </div>
      <div class="px-6">
        <div class="m-0">
          <div class="text-xs uppercase font-bold w-24 bg-gray-400" v-html="'&nbsp;'"></div>
        </div>
        <div class="mt-2">
          <div class="text-4xl font-bold leading-none my-2 w-full bg-gray-400" v-html="'&nbsp;'"></div>
          <div class="mt-2">
            <div class="text-sm w-20 bg-gray-400" v-html="'&nbsp;'"></div>
          </div>
        </div>
      </div>
    </header>

    <main class="mb-6">
      <divider class="mx-6"></divider>

      <section>
        <div class="mx-6">
          <venue-placeholder />
        </div>
      </section>

      <divider class="mx-6"></divider>

      <section>
        <div class="mx-6">
          <header class="mb-6">
            <div class="text-2xl font-bold w-32 bg-gray-400" v-html="'&nbsp;'"></div>
          </header>

          <review-placeholder />
        </div>
      </section>

      <section>
        <div class="mx-6">
          <button
            class="w-full py-4 text-sm font-semibold leading-none text-white uppercase tracking-wider bg-indigo-600 rounded-lg"
          >
            &nbsp;
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
////////////////////////////////////////////////////////////////////////////////////////////////////

import VenuePlaceholder from './VenuePlaceholder.vue';
import ReviewPlaceholder from './ReviewPlaceholder.vue';
import Divider from './Divider.vue';

////////////////////////////////////////////////////////////////////////////////////////////////////

export default {
  name: 'PlaceDetailsPlaceholder',
  components: { VenuePlaceholder, ReviewPlaceholder, Divider },
};
</script>

<style></style>
