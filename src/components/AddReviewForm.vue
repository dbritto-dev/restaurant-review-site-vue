<template>
  <div class="bg-white rounded-lg overflow-hidden">
    <form @submit.prevent="handleSubmit">
      <div class="px-4 pt-4 pb-2 border-b">
        <div class="text-xs leading-none">Rating</div>
        <div class="mt-1">
          <div class="flex justify-around py-1">
            <label role="button" tabIndex="0" class="cursor-pointer">
              <fa-icon
                :class="[state.rating === 1 ? 'text-gray-900' : 'text-gray-600']"
                icon="angry"
                size="3x"
              ></fa-icon>
              <input
                class="hidden"
                type="radio"
                name="rating"
                value="1"
                :checked="state.rating === 1"
                @change="handleChangeRating"
              />
            </label>
            <label role="button" tabIndex="0" class="cursor-pointer">
              <fa-icon
                :class="[state.rating === 2 ? 'text-gray-900' : 'text-gray-600']"
                icon="frown"
                size="3x"
              ></fa-icon>
              <input
                class="hidden"
                type="radio"
                name="rating"
                value="2"
                :checked="state.rating === 2"
                @change="handleChangeRating"
              />
            </label>
            <label role="button" tabIndex="0" class="cursor-pointer">
              <fa-icon
                :class="[state.rating === 3 ? 'text-gray-900' : 'text-gray-600']"
                icon="meh"
                size="3x"
              ></fa-icon>
              <input
                class="hidden"
                type="radio"
                name="rating"
                value="3"
                :checked="state.rating === 3"
                @change="handleChangeRating"
              />
            </label>
            <label role="button" tabIndex="0" class="cursor-pointer">
              <fa-icon
                :class="[state.rating === 4 ? 'text-gray-900' : 'text-gray-600']"
                icon="smile"
                size="3x"
              ></fa-icon>
              <input
                class="hidden"
                type="radio"
                name="rating"
                value="4"
                :checked="state.rating === 4"
                @change="handleChangeRating"
              />
            </label>
            <label role="button" tabIndex="0" class="cursor-pointer">
              <fa-icon
                :class="[state.rating === 5 ? 'text-gray-900' : 'text-gray-600']"
                icon="laugh"
                size="3x"
              ></fa-icon>
              <input
                class="hidden"
                type="radio"
                name="rating"
                value="5"
                :checked="state.rating === 5"
                @change="handleChangeRating"
              />
            </label>
          </div>
        </div>
      </div>

      <div class="px-4 pt-4 pb-2 border-b">
        <div class="text-xs leading-none">Name</div>
        <div class="mt-1">
          <input
            class="w-full py-1"
            type="text"
            placeholder="Enter your name"
            v-model.trim="state.author"
            required
          />
        </div>
      </div>

      <div class="px-4 pt-4 pb-2">
        <div class="text-xs leading-none">Comment</div>
        <div class="mt-1">
          <textarea
            class="w-full py-1"
            type="text"
            rows="4"
            placeholder="Write a comment about your experience"
            v-model.trim="state.comment"
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
/* eslint-disable no-console */
import { reactive, onMounted, onUnmounted } from '@vue/composition-api';

////////////////////////////////////////////////////////////////////////////////////////////////////

const getRandomAvatar = avatars => avatars[Math.floor(Math.random() * (avatars.length - 1))];

////////////////////////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////////////////////////

const avatars = [
  'https://lh6.ggpht.com/-jaAm1eO765Q/AAAAAAAAAAI/AAAAAAAAAAA/HfmyBFH1UZs/s128-c0x00000000-cc-rp-mo/photo.jpg',
  'https://lh4.ggpht.com/-Cu-MPkJG_4Y/AAAAAAAAAAI/AAAAAAAAAAA/DX_BrEbhVuQ/s128-c0x00000000-cc-rp-mo/photo.jpg',
  'https://lh5.ggpht.com/-hgFk-liXn3A/AAAAAAAAAAI/AAAAAAAAAAA/A16JG3gJSpU/s128-c0x00000000-cc-rp-mo/photo.jpg',
  'https://lh5.ggpht.com/-HsotJk0cfrw/AAAAAAAAAAI/AAAAAAAAAAA/z3atZ66qn0A/s128-c0x00000000-cc-rp-mo/photo.jpg',
  'https://lh3.ggpht.com/-KmajRHZh-sw/AAAAAAAAAAI/AAAAAAAAAAA/MCXjoNGSZO0/s128-c0x00000000-cc-rp-mo/photo.jpg',
  'https://lh4.ggpht.com/-rImN8nsM2fY/AAAAAAAAAAI/AAAAAAAAAAA/iL9CadC9kXw/s128-c0x00000000-cc-rp-mo/photo.jpg',
  'https://lh5.ggpht.com/-xeAcqbCc1fs/AAAAAAAAAAI/AAAAAAAAAAA/g9V9J9JSvos/s128-c0x00000000-cc-rp-mo/photo.jpg',
  'https://lh3.ggpht.com/-sSicK12N2DM/AAAAAAAAAAI/AAAAAAAAAAA/vXSAqNet4Ag/s128-c0x00000000-cc-rp-mo/photo.jpg',
  'https://lh3.ggpht.com/-iy8gIz3zJYY/AAAAAAAAAAI/AAAAAAAAAAA/zzUjb0ENeaw/s128-c0x00000000-cc-rp-mo/photo.jpg',
  'https://lh3.ggpht.com/-hReL3evr7Wg/AAAAAAAAAAI/AAAAAAAAAAA/fjuD5e2zxv8/s128-c0x00000000-cc-rp-mo/photo.jpg',
];
const initialState = {
  avatar: '',
  rating: 1,
  author: '',
  comment: '',
};

export default {
  name: 'AddReviewForm',
  setup(props, { emit }) {
    // Use reactive({ ...initialState }) instead of reactive(initialState)
    // because `reactive(initialState)` override the value of initialState
    // initialState<Object> -> initialState<Observable>
    let state = reactive({ ...initialState });

    let handleSubmit = () => {
      const data = { ...state, avatar: getRandomAvatar(avatars), date: new Date() };

      emit('handle-submit', data);
    };

    let handleCancel = () => {
      emit('handle-cancel');
    };

    let handleChangeRating = e => {
      state.rating = +e.target.value;
    };

    // Reset the state to initial state after the component is unmounted because vue keeps the
    // the value of reactive()
    useResetStateToInitialState(state, initialState);

    useEscape(e => e.key === 'Escape' && handleCancel(e));

    return {
      state,
      handleSubmit,
      handleCancel,
      handleChangeRating,
    };
  },
};
</script>

<style></style>
