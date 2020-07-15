<template>
  <img ref="img" />
</template>

<script>
import { onMounted, onBeforeUnmount } from '@vue/composition-api';

const asyncLoadImage = src =>
  new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(src);
    img.onabort = () => reject();
    img.onerror = () => reject();

    img.src = src;
  });

const getIsIntersecting = entry => {
  if ('isIntersecting' in IntersectionObserverEntry.prototype) {
    return entry.isIntersecting;
  }

  return entry.intersectionRatio > 0;
};

export default {
  name: 'Cover',
  props: ['source', 'fallback'],
  setup(props, { refs }) {
    if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window) {
      const observer = new IntersectionObserver(([entry]) => {
        const isIntersecting = getIsIntersecting(entry);

        if (isIntersecting) {
          asyncLoadImage(props.source)
            .then(source => {
              entry.target.src = source;
            })
            .catch(() => {
              entry.target.src = props.fallback;
            })
            .finally(() => {
              entry.target.style.opacity = 1;
              observer.unobserve(entry.target);
            });
        }
      });

      onMounted(() => observer.observe(refs.img));

      onBeforeUnmount(() => observer.unobserve(refs.img));
    } else {
      onMounted(() => {
        const image = refs.img;

        asyncLoadImage(props.source)
          .then(source => {
            image.src = source;
          })
          .catch(() => {
            image.src = props.fallback;
          })
          .finally(() => {
            image.style.opacity = 1;
          });
      });
    }
  },
};
</script>

<style scoped>
img {
  opacity: 0;
  transition: 0.3s all ease;
}
img.active {
  opacity: 1;
}
</style>
