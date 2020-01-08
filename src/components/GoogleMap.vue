<template>
  <div ref="mapRef"></div>
</template>

<script>
import { ref, onMounted } from '@vue/composition-api';

export default {
  name: 'GoogleMap',
  setup() {
    let mapRef = ref(null);
    let map = ref(null);
    let service = ref(null);

    onMounted(() => {
      map = new window.google.maps.Map(mapRef.value, {
        center: { lat: 0, lng: 0 },
        zoom: 1,
      });
      service = new window.google.maps.places.PlacesService(map);
    });

    return { mapRef };
  },
};
</script>

<style></style>
