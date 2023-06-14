<script setup lang="ts">
const props = defineProps({
    position: {
      type: Number,
      required: true,
    },
    total: {
        type: Number,
        required: true
    }
  });
</script>

<template>
    <div v-for="index in props.total" class="picture-indicator" :class="{ activepicture: index == props.position, disabledpicture : index != props.position }"></div>
</template>