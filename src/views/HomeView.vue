<script setup>
import { ref, computed, onMounted } from "vue"
import Sidebar from "../components/Sidebar.vue"
import NoteForm from "../components/NoteForm.vue"
import MainContent from "../components/MainContent.vue"
import { useNoteStore } from "../stores/useNoteStore"

const showForm = ref(false)
const filterType = ref("All")

const noteStore = useNoteStore()

const openForm = () => {
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
}


onMounted(() => {
  noteStore.fetchNotes()
})

const notes = computed(() => {
  if (filterType.value === "All") return noteStore.notes
  if (filterType.value === "Favorites") return noteStore.notes.filter(n => n.isFavorite)
  return noteStore.notes.filter(n => n.label === filterType.value)
})

const deleteNote = async (id) => {
  await noteStore.deleteNote(id)
}

const toggleFavorite = async (note) => {
  await noteStore.updateNote(note.id, { isFavorite: !note.isFavorite })
}

const setFilter = (type) => {
  filterType.value = type
}
</script>

<template>
  <div class="flex">
    <Sidebar @showForm="openForm" @filterNotes="setFilter" />
    <MainContent
      :notes="notes"
      @delete-note="deleteNote"
      @toggle-favorite="toggleFavorite"
    />
    <NoteForm v-if="showForm" @close="closeForm" />
  </div>
</template>
