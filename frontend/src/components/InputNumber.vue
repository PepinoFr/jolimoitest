<script setup lang="ts">
defineProps(['label','maxNumber', 'minNumber','placeholder'])
const nombre = defineModel()
</script>

<template>
  <div class="flex flex-col gap-2">
    <label class="text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      type="number"
      :max="maxNumber"
      :min="minNumber"
      :placeholder="placeholder"
      v-model="nombre"
      class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</template>