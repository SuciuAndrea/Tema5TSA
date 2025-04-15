<script setup>
import { onMounted, computed } from "vue"
import { useNoteStore } from "../stores/useNoteStore"
import NoteCard from "../components/NoteCard.vue"
import axios from 'axios'

const props = defineProps({
  filteredLabel: String
})

const noteStore = useNoteStore()

onMounted(() => {
  noteStore.fetchNotes()
})

const handleDelete = async id => {
  try {
    await axios.delete(`http://localhost:3000/api/notes/${id}`)
    noteStore.deleteNote(id)
  } catch (err) {
    console.error("Delete failed", err)
  }
}

const handleToggleFavorite = async (note) => {
  try {
    await noteStore.toggleFavorite(note.id)
  } catch (err) {
    console.error("Toggle favorite failed", err)
  }
}

const filteredNotes = computed(() => {
  if (props.filteredLabel === "Favorites") {
    return noteStore.notes.filter(note => note.isFavorite)
  } else if (props.filteredLabel === "All") {
    return noteStore.notes
  } else {
    return noteStore.notes.filter(note => note.label === props.filteredLabel)
  }
})
</script>

<template>
  <main class="flex-1 p-6">
    <h1 class="mb-4 text-xl font-semibold">Note Lists</h1>

    <div v-if="noteStore.loading" class="text-gray-500">Loading...</div>

    <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <NoteCard
  v-for="note in filteredNotes"
  :key="note.id"
  :note="note"
  @delete="handleDelete"
  @toggle-favorite="handleToggleFavorite"
/>
    </div>
  </main>
</template>
