<script setup lang="ts">
defineProps(['title'])
</script>

<template>
    <div class="flex flex-col gap-6 rounded-xl border py-6 shadow-sm w-full max-w-md p-8">

         <p class="text-center text-2xl font-bold text-gray-900 ">{{ title }}</p>
         <slot />
    </div>
    
</template>