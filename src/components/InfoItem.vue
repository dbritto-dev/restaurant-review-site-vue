<template>
  <tr>
    <td class="w-6 pr-2 py-2 align-top">
      <fa-icon :icon="icon"></fa-icon>
    </td>
    <td class="w-6/12 py-2 align-top">
      <slot></slot>
    </td>
    <td class="w-6/12 py-2 text-right align-top">
      <slot name="action">&nbsp;</slot>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'InfoItem',
  props: ['icon'],
};
</script>

<style></style>
