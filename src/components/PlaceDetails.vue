<template>
  <div class="w-full">
    <header>
      <nav class="flex items-center absolute top-0 right-0 p-6">
        <div
          class="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md cursor-pointer select-none"
          role="button"
          tabIndex="0"
          @keydown.prevent.enter.space="handleClose"
          @click.prevent="handleClose"
        >
          <fa-icon class="text-gray-900" icon="times"></fa-icon>
        </div>
      </nav>

      <div class="mb-8">
        <cover
          :source="place.cover"
          :fallback="`https://www.toptal.com/designers/subtlepatterns/patterns/food.png`"
          class="w-full h-64 object-cover bg-gray-200"
          alt="cover"
        />
      </div>
      <div class="px-6">
        <div class="m-0">
          <span class="text-xs uppercase font-bold text-gray-600">Restaurant</span>
        </div>
        <div class="mt-2">
          <div class="text-4xl capitalize font-bold leading-none text-gray-900 my-2">
            {{ place.name }}
          </div>
          <div class="mt-2">
            <span class="text-sm">{{ place.ratings }} ratings</span>
          </div>
        </div>
      </div>
    </header>

    <main class="mb-6">
      <divider class="mx-6"></divider>

      <section>
        <div class="mx-6">
          <venue
            :name="place.name"
            :address="place.address"
            :phone-number="place.phoneNumber"
            :types="place.types"
            :gmap="place.gmap"
            :website="place.website"
            :is-open-now="place.isOpen()"
          ></venue>
        </div>
      </section>

      <divider class="mx-6"></divider>

      <section>
        <div class="mx-6">
          <header class="mb-6">
            <span class="text-2xl font-bold">Reviews</span>
          </header>

          <div v-if="place.reviews.length">
            <review
              v-for="(review, index) in place.reviews"
              :key="`review-${index}`"
              :avatar="review.avatar"
              :author="review.author"
              :date="review.date.toUTCString()"
              :comment="review.comment"
            ></review>
          </div>
          <div v-else>
            <div class="mb-4">
              <div class="text-2xl font-bold text-center">No Reviews, yet.</div>
              <div class="text-center">
                No reviews yet in this restaurant! Start adding a new review.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="mx-6">
          <button
            class="w-full py-4 text-sm font-semibold leading-none text-white uppercase tracking-wider bg-indigo-600 rounded-lg"
            @keydown.prevent.enter.space="handleClickAddReview"
            @click.prevent="handleClickAddReview"
          >
            Add Review
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
////////////////////////////////////////////////////////////////////////////////////////////////////

import Divider from './Divider.vue';
import Venue from './Venue.vue';
import Review from './Review.vue';
import Cover from './Cover.vue';

////////////////////////////////////////////////////////////////////////////////////////////////////

export default {
  name: 'PlaceDetails',
  props: ['place'],
  setup(_, { emit }) {
    let handleClose = () => {
      emit('handle-close');
    };

    let handleClickAddReview = () => {
      emit('handle-click-add-review');
    };

    return { handleClose, handleClickAddReview };
  },
  components: { Divider, Venue, Review, Cover },
};
</script>

<style></style>
