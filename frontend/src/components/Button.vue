<script setup lang="ts">
const { type = 'primary' } = defineProps<{ type?: "primary"|"secondary"}>()
</script>

<template>
  <button 
    :class="[
      'px-4 py-2 rounded-md text-white font-semibold cursor-pointer',
      type === 'primary' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'
    ]"
  >
    <slot>Button</slot>
  </button>
</template>