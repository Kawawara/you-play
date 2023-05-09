<script setup lang="ts">

const props = defineProps({
    user_id: {
      type: Number,
      required: true,
    },
    user_description: {
        type: String,
        required: true,
        default: ""
    },
    name: {
      type: String,
      required: true
    }
  });
</script>

<template>
    <div :id="String(props.user_id)+'_card-two'">
        <p>{{ props?.name }} :</p>
        <p id="bio">{{ props?.user_description }}</p>
    </div>
</template>