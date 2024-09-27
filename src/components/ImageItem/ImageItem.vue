<template src="./ImageItem.html"></template>
<style src="./ImageItem.scss" lang="scss" scoped></style>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  image: Object
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click', props.image)
}
</script>
