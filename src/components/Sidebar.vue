<script setup>
import { ref } from "vue"

const activeLabel = ref("All")
const emit = defineEmits(["showForm", "filterNotes"])
const labels = [
  { name: "Personal", color: "bg-blue-500" },
  { name: "Work", color: "bg-green-500" },
  { name: "Social", color: "bg-orange-500" },
  { name: "Important", color: "bg-purple-500" }
]

const setActiveLabel = label => {
  activeLabel.value = label
  emit("filterNotes", label)
}
</script>

<template>
  <aside class="min-h-screen w-64 rounded-r-xl bg-white p-4 shadow-sm">
    <button
      class="mb-6 w-full rounded-full bg-purple-600 py-2 font-semibold text-white hover:bg-purple-700"
      @click="emit('showForm')"
    >
      + Add Notes
    </button>

    <nav class="space-y-4">
      <div>
        <button
          class="flex w-full items-center rounded-lg px-3 py-2"
          :class="{
            'bg-purple-100 font-medium text-purple-700': activeLabel === 'All',
            'hover:bg-gray-100': activeLabel !== 'All'
          }"
          @click="setActiveLabel('All')"
        >
          <i class="fas fa-edit mr-2"></i>
          All
        </button>
      </div>

      <div>
        <button
          class="flex w-full items-center rounded-lg px-3 py-2"
          :class="{
            'bg-purple-100 font-medium text-purple-700': activeLabel === 'Favorites',
            'hover:bg-gray-100': activeLabel !== 'Favorites'
          }"
          @click="setActiveLabel('Favorites')"
        >
          <i class="far fa-star mr-2"></i>
          Favorites
        </button>
      </div>

      <div class="mt-6">
        <h3 class="mb-2 text-xs tracking-wide text-gray-400 uppercase">Labels</h3>
        <ul class="space-y-2">
          <li v-for="label in labels" :key="label.name">
            <button
              class="flex w-full items-center rounded-lg px-3 py-2"
              :class="{
                'bg-purple-100 font-medium text-purple-700': activeLabel === label.name,
                'hover:bg-gray-100': activeLabel !== label.name
              }"
              @click="setActiveLabel(label.name)"
            >
              <span class="mr-3 h-2 w-2 rounded-full" :class="label.color"></span>
              {{ label.name }}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>
