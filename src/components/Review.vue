<template>
  <div class="mb-8">
    <div class="flex items-center">
      <div class="w-12 h-12">
        <img class="w-12 h-12 object-fit" :alt="author" :src="avatar" />
      </div>
      <div class="ml-2">
        <div class="text-sm leading-snug font-bold text-gray-900">{{ author }}</div>
        <div class="text-sm leading-snug text-gray-600">{{ date }}</div>
      </div>
    </div>
    <div class="my-4">
      <div dir="ltr" class="text-base text-gray-900">
        {{ comment }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Review',
  props: ['author', 'avatar', 'date', 'comment'],
};
</script>

<style></style>
