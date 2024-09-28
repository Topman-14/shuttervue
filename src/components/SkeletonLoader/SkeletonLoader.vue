<template src="./SkeletonLoader.html"></template>
<style src="./SkeletonLoader.scss" lang="scss" scoped></style>
<script setup lang="ts">
const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})

const isMiddleColumn = (index: number) => {
  return index % 3 === 1 // Check if it's in the middle column (0-indexed)
}
</script>
