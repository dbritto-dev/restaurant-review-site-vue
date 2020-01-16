<template>
  <div
    role="button"
    tabIndex="0"
    class="flex p-3 -mx-3 my-2 rounded hover:shadow-md focus:shadow-md"
    @keydown.prevent.enter.space="handleClick"
    @click.prevent="handleClick"
  >
    <div class="w-32 min-w-32 h-32">
      <img
        v-if="cover"
        alt="cover"
        class="w-32 h-32 object-cover bg-gray-200 rounded"
        :src="cover"
      />
      <div v-else class="flex items-center justify-center w-32 h-32 bg-gray-200 rounded">
        <span class="uppercase text-lg font-bold">{{ name.charAt(0) }}</span>
      </div>
    </div>
    <div class="flex flex-col items-start flex-1 pl-4">
      <div class="flex items-start mb-2">
        <RatingBadge class="mr-2">{{ rating > 0 ? rating.toFixed(1) : 'New' }}</RatingBadge>
        <span class="inline-block text-lg font-bold leading-none text-gray-900">
          {{ name }}
        </span>
      </div>
      <div>
        <rating-type-badge v-for="type in types" :key="type">{{ type }}</rating-type-badge>
      </div>
      <div class="text-xs font-bold text-gray-600 mt-auto">
        {{ ratings > 0 ? `${ratings} ratings` : 'Without ratings' }}
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars, no-console */
import RatingBadge from './RatingBadge.vue';
import RatingTypeBadge from './RestaurantTypeBadge.vue';

export default {
  name: 'Place',
  props: ['name', 'cover', 'rating', 'ratings', 'types'],
  setup(_, { emit }) {
    let handleClick = () => {
      emit('handleClick');
    };

    return { handleClick };
  },
  components: { RatingBadge, RatingTypeBadge },
};
</script>

<style></style>
