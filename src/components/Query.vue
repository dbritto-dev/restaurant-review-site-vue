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
import { watch, reactive } from '@vue/composition-api';

export default {
  name: 'Vue',
  props: ['query', 'variables'],
  setup(props) {
    const state = reactive({
      loading: false,
      error: '',
      data: null,
    });

    const fetch = () => {
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

    watch(
      () => props.variables,
      () => {
        state.loading = true;

        fetch();
      }
    );

    return { state, refetch: fetch };
  },
};
</script>

<style></style>
