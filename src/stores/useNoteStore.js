import { defineStore } from "pinia"
import axios from "axios"

export const useNoteStore = defineStore("note", {
  state: () => ({
    notes: [],
    loading: false
  }),
  actions: {
    async fetchNotes() {
      this.loading = true
      try {
        const response = await axios.get("http://localhost:3000/api/notes")
        this.notes = response.data
      } finally {
        this.loading = false
      }
    },
    deleteNote(id) {
      this.notes = this.notes.filter(note => note.id !== id)
    },
    async addNote(note) {
      const response = await axios.post("http://localhost:3000/api/notes", note)
      this.notes.push(response.data)
    },
    async toggleFavorite(id) {
      const note = this.notes.find(n => n.id === id)
      if (note) {
        note.isFavorite = !note.isFavorite
        await axios.put(`http://localhost:3000/api/notes/${id}/favorite`, {
          isFavorite: note.isFavorite
        })
      }
    }
  }
})
