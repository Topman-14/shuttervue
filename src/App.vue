<template>
  <header class="header">
    <p v-if="loading && !fetched" class="status-display">
      Searching for
      <span> "{{ searchQuery }}" </span>
    </p>
    <p v-else-if="images.length > 0 && fetched" class="status-display">
      Search results for
      <span> "{{ searchQuery }}" </span>
    </p>
    <div v-else class="search-container">
      <button class="search-button" @click="searchImages">
        <SearchIcon />
      </button>
      <input
        v-model="searchQuery"
        @keyup.enter="searchImages"
        type="text"
        placeholder="Search for photo"
      />
    </div>
  </header>
  <div class="image-grid">
    <template v-if="loading">
      <SkeletonLoader v-for="n in 10" :key="n" />
    </template>
    <template v-else>
      <ImageItem
        v-for="(image, index) in images"
        :key="image.id"
        :image="image"
        :index="index"
        @click="openModal(image)"
      />
    </template>
  </div>
  <ImageModal v-if="selectedImage" :image="selectedImage" @close="closeModal" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import ImageItem from './components/ImageItem/ImageItem.vue'
import ImageModal from './components/ImageModal/ImageModal.vue'
import SkeletonLoader from './components/SkeletonLoader/SkeletonLoader.vue'
import SearchIcon from './components/icons/SearchIcon.vue'

const searchQuery = ref('')
const images = ref<any[]>([])
const loading = ref(true)
const fetched = ref(false)
const selectedImage = ref(null)

const searchImages = async () => {
  if (!searchQuery.value) return

  loading.value = true
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: searchQuery.value,
        per_page: 10,
        client_id: import.meta.env.VITE_APP_UNSPLASH_ACCESS_KEY
      }
    })
    images.value = response.data.results
  } catch (error) {
    console.error('Error fetching images:', error)
  } finally {
    loading.value = false
    fetched.value = true
  }
}

const populateImages = async () => {
  loading.value = true
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: 'African',
        per_page: 8,
        client_id: import.meta.env.VITE_APP_UNSPLASH_ACCESS_KEY
      }
    })
    images.value = response.data.results
  } catch (error) {
    console.error('Error fetching images:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  populateImages()
})

const openModal = (image: any) => {
  selectedImage.value = image
}

const closeModal = () => {
  selectedImage.value = null
}
</script>
