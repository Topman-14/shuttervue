<template src="./ImageItem.html"></template>
<style src="./ImageItem.scss" lang="scss" scoped></style>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  image: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click', props.image)
}

const isMiddleColumn = (index: number) => {
  return index % 3 === 1 // Check if it's in the middle column (0-indexed)
}
</script>
