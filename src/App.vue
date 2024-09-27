<template>
  <header class="header">
    <div class="search-container">
      <input
        v-model="searchQuery"
        @keyup.enter="searchImages"
        type="text"
        placeholder="Search images..."
      />
      <button @click="searchImages">Search</button>
    </div>
    <div class="image-grid">
      <template v-if="loading">
        <SkeletonLoader v-for="n in 10" :key="n" />
      </template>
      <template v-else>
        <ImageItem
          v-for="image in images"
          :key="image.id"
          :image="image"
          @click="openModal(image)"
        />
      </template>
    </div>
    <ImageModal v-if="selectedImage" :image="selectedImage" @close="closeModal" />
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import ImageItem from './components/ImageItem/ImageItem'
import ImageModal from './components/ImageModal/ImageModal'
import SkeletonLoader from './components/SkeletonLoader/SkeletonLoader.vue'

const searchQuery = ref('')
const images = ref<any[]>([])
const loading = ref(false)
const selectedImage = ref(null)

const searchImages = async () => {
  if (!searchQuery.value) return

  loading.value = true
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: searchQuery.value,
        per_page: 10,
        client_id: 'YOUR_UNSPLASH_API_KEY' // Replace with your actual API key
      }
    })
    images.value = response.data.results
  } catch (error) {
    console.error('Error fetching images:', error)
  } finally {
    loading.value = false
  }
}

const openModal = (image: any) => {
  selectedImage.value = image
}

const closeModal = () => {
  selectedImage.value = null
}
</script>
