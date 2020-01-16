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
                        v-model.trim="state.query"
                      />
                      <div
                        v-if="state.query.length > 0"
                        class="flex flex-initial w-10 h-10 items-center justify-center cursor-pointer"
                        tab-index="0"
                        role="button"
                        @keydown.prevent.enter.space="state.query = ''"
                        @click="state.query = ''"
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
                      v-model="state.minRating"
                    >
                      <option value="0">New</option>
                      <option
                        v-for="option in state.minRatingRange"
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
                      v-model="state.maxRating"
                    >
                      <option
                        v-for="option in state.maxRatingRange"
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
          <div class="relative flex-1 max-h-full">
            <div class="absolute inset-0">
              <div class="relative w-full h-full max-h-full overflow-x-hidden overflow-y-scroll">
                <main class="p-6" @keydown.prevent="handleKeyboardNavigationPlaces($event)">
                  <div v-if="state.placesFiltered.length > 0">
                    <place
                      v-for="restaurant in state.placesFiltered"
                      :key="restaurant.id"
                      :id="restaurant.id"
                      :name="restaurant.name"
                      :cover="restaurant.cover"
                      :types="restaurant.types"
                      :rating="restaurant.rating"
                      :ratings="restaurant.ratings"
                      @handleClick="state.placeId = restaurant.id"
                    ></place>
                  </div>
                  <div v-else>
                    <div class="flex items-center justify-center mb-6">
                      <fa-icon class="text-purple-400" icon="sad-tear" size="5x"></fa-icon>
                    </div>
                    <div class="text-2xl font-bold text-gray-900 text-center">
                      No Results!
                    </div>
                    <div class="text-gray-700 text-center">
                      Sorry there are no results for this search. Please try again.
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="state.showPlaceDetails" class="absolute left-xl w-full max-w-lg h-screen z-20">
        <div class="absolute inset-0 bg-black opacity-50 -z-1" />
        <div class="p-6"></div>
      </div>

      <div v-if="state.showAddRestaurant" class="absolute left-xl w-full max-w-lg h-screen z-20">
        <div class="absolute inset-0 bg-black opacity-50 -z-1" />
        <div class="p-6">
          <add-restaurant-form
            :location="state.locationClicked"
            @handleCancel="handleCancelAddRestaurantForm"
            @handleSubmit="handleSubmitAddRestaurantForm"
          ></add-restaurant-form>
        </div>
      </div>

      <div class="flex-auto relative">
        <div ref="mapContainer" class="absolute inset-0"></div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars, no-console */
import { reactive, ref, computed, watch, onMounted } from '@vue/composition-api';
import {
  range,
  debounce,
  getCurrentPosition,
  getNearbyPlaces,
  getSortedPlaces,
  getFilteredPlaces,
  cleanMarkers,
  noop,
} from './helpers';

import Place from './components/Place.vue';
import AddRestaurantForm from './components/AddRestaurantForm.vue';

window.places = {};
window.markers = {};

export default {
  name: 'app',
  setup() {
    let mapContainer = ref(null);
    let state = reactive({
      query: '',
      minRatingRange: range(1, 5),
      minRating: 0,
      maxRatingRange: computed(() => range(state.minRating + 1, 6)),
      maxRating: 5,
      map: null,
      service: null,
      locationClicked: { lat: 0, lng: 0 },
      showAddRestaurant: false,
      showAddReview: false,
      centerPosition: new window.google.maps.LatLng(0, 0),
      places: {},
      placesFiltered: computed(() =>
        getSortedPlaces(
          getFilteredPlaces(state.places, state.query, state.minRating, state.maxRating)
        )
      ),
      placeId: null,
      showPlaceDetails: computed(() => !!state.placeId),
    });

    onMounted(() => {
      state.map = new window.google.maps.Map(mapContainer.value, {
        center: new window.google.maps.LatLng(0, 0),
        zoom: 16,
        fullscreenControl: false,
        mapTypeControl: false,
        gestureHandling: 'cooperative',
      });
      state.service = new window.google.maps.places.PlacesService(state.map);

      state.map.addListener('click', e => {
        state.locationClicked = e.latLng.toJSON();
        state.showAddRestaurant = true;
      });

      state.map.addListener(
        'bounds_changed',
        debounce(() => {
          state.centerPosition = state.map.getCenter();
        })
      );

      getCurrentPosition()
        .then(position => {
          state.centerPosition = position;
          state.map.setCenter(position);

          new window.google.maps.Marker({
            map: state.map,
            position,
            icon: {
              url: 'images/marker.png',
              scaledSize: { width: 32, height: 48 },
              labelOrigin: { x: 16, y: 18 },
            },
            label: '😊',
          });
        })
        .catch(noop);
    });

    watch(
      () => state.centerPosition,
      () => {
        getNearbyPlaces(state.service, state.centerPosition)
          .then(result => {
            state.places = result;
          })
          .catch(noop);
      }
    );

    // watch(
    //   () => state.locationClicked,
    //   () => {
    //     console.log(state.locationClicked);
    //   }
    // );

    watch(
      () => state.places,
      () => {
        cleanMarkers();

        const markers = Object.values(state.places).reduce(
          (accumulator, { location: position, id, rating }) => {
            const marker = new window.google.maps.Marker({
              map: state.map,
              position,
              icon: {
                url: 'images/marker.png',
                scaledSize: { width: 32, height: 48 },
                labelOrigin: { x: 16, y: 18 },
              },
              label: {
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: '600',
                fontSize: '12px',
                color: '#fff',
                text: rating > 0 ? rating.toFixed(1) : 'N',
              },
            });

            marker.addListener('click', () => {
              state.placeId = id;
            });

            accumulator[id] = marker;

            return accumulator;
          },
          {}
        );

        window.markers = markers;
      }
    );

    watch(
      () => state.places,
      () => {
        if (state.placeId && !Object.prototype.hasOwnProperty.call(state.places, state.placeId)) {
          state.placeId = null;
        }
      }
    );

    watch(
      () => state.placeId,
      () => {
        console.log(state.placeId);
      }
    );

    let addNewRestaurant = data => {
      window.places[data.id] = data;

      state.places[data.id] = window.places[data.id];
      state.showAddRestaurant = false;
    };

    let addNewReview = (data, place) => {
      const reviews = [data, ...place.reviews];
      const rating = place.rating
        ? // Incremental Average:
          // Formula: ( ( ( Total Count - 1 ) * Previous Rating (AVG) ) + New Rating ) / Total Count
          (place.ratings * place.rating + data.rating) / (place.ratings + 1)
        : data.rating;
      const ratings = place.ratings + 1;

      window.places[place.id] = {
        ...place,
        rating,
        ratings,
        reviews,
      };
      window.markers[place.id].setLabel(rating.toString());

      state.places[place.id] = window.places[place.id];
      state.showAddReview = false;
    };

    let handleKeyboardNavigationPlaces = () => {};

    let handlePlaceClick = placeId => {
      state.placeId = placeId;
    };

    let handleCancelAddRestaurantForm = () => {
      state.showAddRestaurant = false;
    };

    let handleSubmitAddRestaurantForm = () => {};

    return {
      state,
      mapContainer,
      addNewRestaurant,
      addNewReview,
      handleKeyboardNavigationPlaces,
      handlePlaceClick,
      handleCancelAddRestaurantForm,
      handleSubmitAddRestaurantForm,
    };
  },
  components: { Place, AddRestaurantForm },
};
</script>

<style>
body {
  font-family: 'Montserrat', sans-serif;
}
.left-xl {
  left: 36rem;
}
.-z-1 {
  z-index: -1;
}
.max-w-lg {
  max-width: 32rem;
}
</style>
