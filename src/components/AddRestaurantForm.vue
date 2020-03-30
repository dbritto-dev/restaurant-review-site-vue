<template>
  <div class="bg-white rounded-lg overflow-hidden">
    <form @submit.prevent="handleSubmit">
      <div class="relative bg-indigo-400 h-64">
        <label class="absolute inset-0">
          <img
            v-if="state.cover.length"
            class="w-full h-full object-fit"
            :alt="state.name"
            :src="state.cover"
          />
          <div v-else class="flex flex-col items-center justify-center relative w-full h-full">
            <fa-icon icon="image" color="#fff" size="8x"></fa-icon>
            <div
              class="inline-block px-4 py-1 text-xs font-semibold text-indigo-800 bg-indigo-200 rounded-lg"
            >
              Add a preview image
            </div>
            <input
              class="absolute inset-0 opacity-0 cursor-pointer z-10"
              type="file"
              name="cover"
              accept="image/png, image/jpeg"
              placeholder="Cover"
              @change="handleChangeCover"
              required
            />
          </div>
        </label>
      </div>

      <div class="px-4 pt-4 pb-2 border-b">
        <div class="text-xs leading-none">Name</div>
        <div class="mt-1">
          <input
            class="w-full py-1"
            type="text"
            placeholder="What is the name of the restaurant?"
            v-model.trim="state.name"
            required
          />
        </div>
      </div>

      <div class="px-4 pt-4 pb-2 border-b">
        <div class="text-xs leading-none">Location</div>
        <div class="flex mt-1">
          <div class="w-6/12">
            <input
              class="w-full py-1"
              type="text"
              placeholder="Latitude"
              v-model="state.location.lat"
              required
            />
          </div>
          <div class="w-6/12">
            <input
              class="w-full py-1"
              type="text"
              placeholder="Longitude"
              v-model="state.location.lng"
              required
            />
          </div>
        </div>
      </div>

      <div class="px-4 pt-4 pb-2 border-b">
        <div class="text-xs leading-none">Phone Number</div>
        <div class="mt-1">
          <input
            class="w-full py-1"
            type="text"
            placeholder="Phone Number"
            v-model.trim="state.phoneNumber"
          />
        </div>
      </div>

      <div class="px-4 pt-4 pb-2 border-b">
        <div class="text-xs leading-none">Website</div>
        <div class="mt-1">
          <input class="w-full py-1" type="text" placeholder="Website" v-model="state.website" />
        </div>
      </div>

      <div class="px-4 pt-4 pb-2">
        <div class="text-xs leading-none">Address</div>
        <div class="mt-1">
          <input
            class="w-full py-1"
            type="text"
            placeholder="Entrer the address of the restaurant"
            v-model.trim="state.address"
            required
          />
        </div>
      </div>

      <div class="p-4 bg-gray-100">
        <div class="flex justify-end">
          <button
            class="px-4 py-2 text-sm font-semibold text-indigo-600 rounded"
            type="button"
            @keydown.prevent.enter.space="handleCancel"
            @click="handleCancel"
          >
            Cancel
          </button>
          <button
            class="px-4 py-2 ml-2 text-sm font-semibold text-white bg-indigo-600 rounded"
            type="submit"
          >
            Send
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, watch, onMounted, onUnmounted } from '@vue/composition-api';
import { getDataURI, uniqid, noop } from '../helpers';

const useEscape = handleEscape => {
  onMounted(() => window.addEventListener('keydown', handleEscape));

  onUnmounted(() => window.removeEventListener('keydown', handleEscape));
};

const useResetStateToInitialState = (state, initialState) => {
  onUnmounted(() => {
    Object.entries(initialState).map(([key, value]) => {
      state[key] = value;
    });
  });
};

let initialState = {
  name: '',
  cover: '',
  location: { lat: '', lng: '' },
  phoneNumber: '',
  website: '',
  address: '',
  // static values
  gmap: null,
  isOpen: () => true,
  rating: 0,
  ratings: 0,
  reviews: [],
  types: ['restaurant'],
};

export default {
  name: 'AddRestaurantForm',
  props: {
    location: {
      type: [Object, window.google.maps.LatLng],
      required: true,
    },
  },
  setup(props, { emit }) {
    // Use reactive({ ...initialState }) instead of reactive(initialState)
    // because `reactive(initialState)` override the value of initialState
    // initialState<Object> -> initialState<Observable>
    let state = reactive({ ...initialState });

    let handleSubmit = () => {
      const data = { ...state, id: uniqid() };

      emit('handle-submit', data);
    };

    let handleCancel = () => {
      emit('handle-cancel');
    };

    let handleChangeCover = e => {
      getDataURI(e.target.files[0])
        .then(result => {
          state.cover = result;
        })
        .catch(noop);
    };

    watch(
      () => props.location,
      () => {
        state.location = props.location;
      }
    );

    // Reset the state to initial state after the component is unmounted because vue keeps the
    // the value of reactive()
    useResetStateToInitialState(state, initialState);

    useEscape(e => e.key === 'Escape' && handleCancel(e));

    return { state, handleSubmit, handleCancel, handleChangeCover };
  },
};
</script>

<style></style>
