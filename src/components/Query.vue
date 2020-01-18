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
/* eslint-disable no-console */
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

    console.log(props.variables);

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

        console.log(props.variables);
      }
    );

    return { state, refetch: fetch };
  },
};
</script>

<style></style>
