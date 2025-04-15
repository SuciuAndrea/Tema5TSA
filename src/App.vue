<script setup>
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import MainContent from './components/MainContent.vue'
import NoteForm from './components/NoteForm.vue' 

const showForm = ref(false)
const filteredLabel = ref("All")

const handleShowForm = () => {
  showForm.value = true
}

const handleFilter = (label) => {
  filteredLabel.value = label
}
</script>

<template>
  <div class="flex min-h-screen">
    <Sidebar @showForm="handleShowForm" @filterNotes="handleFilter" />
    <MainContent :filteredLabel="filteredLabel" />
    <NoteForm v-if="showForm" @close="showForm = false" /> 
  </div>
</template>


<style>
@import "tailwindcss";
</style>