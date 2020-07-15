<template>
  <div class="mb-8">
    <div class="flex items-center">
      <div class="w-12 h-12">
        <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
      </div>
      <div class="ml-2">
        <div class="text-sm leading-snug font-bold w-20 bg-gray-400" v-html="'&nbsp;'"></div>
        <div class="text-sm leading-snug w-48 bg-gray-400" v-html="'&nbsp;'"></div>
      </div>
    </div>
    <div class="my-4">
      <div dir="ltr" class="text-base w-full h-20 bg-gray-400">
        &nbsp;
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewPlaceholder',
};
</script>

<style></style>
