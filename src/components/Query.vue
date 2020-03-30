<template>
  <div>
    <slot
      :loading="state.loading"
      :error="state.error"
      :data="state.data"
      :refetch="refetch"
    ></slot>
  </div>
</template>

<script>
import { reactive, watch, onMounted, onUnmounted } from '@vue/composition-api';

export default {
  name: 'Vue',
  props: {
    query: {
      type: Function,
      required: true,
    },
    variables: {
      type: Object,
      default: undefined,
    },
    sync: {
      type: Function,
      default: props => () => props.variables,
    },
    deepSync: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const state = reactive({
      loading: true,
      error: '',
      data: null,
    });

    const fetch = () => {
      state.loading = true;

      props
        .query(props.variables)
        .then(data => {
          state.data = data;
        })
        .catch(error => {
          state.error = error;
        })
        .finally(() => {
          state.loading = false;
        });
    };

    onMounted(() => fetch());

    let unwatch = watch(props.sync(props), () => fetch(), { deep: props.deepSync });

    onUnmounted(() => unwatch());

    return { state, refetch: fetch };
  },
};
</script>

<style></style>
