<script setup>
import { ref } from "vue"
import { useNoteStore } from "../stores/useNoteStore"

const emit = defineEmits(["close"])
const noteStore = useNoteStore()

const title = ref("")
const description = ref("")
const label = ref("Work")
const labels = ["Personal", "Work", "Social", "Important"]

const submitForm = async () => {
  const newNote = {
    title: title.value,
    description: description.value,
    label: label.value,
    isFavorite: false
  }

  try {
    await noteStore.addNote(newNote)
    emit("close")
  } catch (err) {
    console.error("Failed to add note:", err)
  }
}
</script>

<template>
  <div
    class="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-lg p-6 overflow-y-auto border-l border-gray-200"
  >
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-lg font-semibold">Add Note</h2>
      <button @click="emit('close')" class="text-gray-500 hover:text-black text-2xl">×</button>
    </div>

    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label class="mb-1 block text-sm font-medium">Title</label>
        <input
          v-model="title"
          type="text"
          placeholder="Note Title"
          class="w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium">Description</label>
        <textarea
          v-model="description"
          placeholder="Note Description"
          class="w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
          rows="4"
        ></textarea>
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium">Note Label</label>
        <select
          v-model="label"
          class="w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
        >
          <option v-for="option in labels" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <button
        type="submit"
        class="mt-4 w-full rounded bg-purple-600 py-2 text-white hover:bg-purple-700"
      >
        Add New Note
      </button>
    </form>
  </div>
</template>
