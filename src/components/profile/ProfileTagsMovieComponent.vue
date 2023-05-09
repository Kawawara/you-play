<script setup lang="ts">

const props = defineProps({
    user_id: {
      type: Number,
      required: true,
    },
    tags: {
        type: Array<string>,
        required: true
    },
    name: {
      type: String,
      required: true
    }
  });


</script>

<template>
    <div :id="String(props.user_id)+'_card-four'">
        <p>{{ props.name }} :</p>
        <div class="interests">
        <ul>
            <li v-for="tag in props.tags">{{ tag }}</li>
        </ul>
        </div>
    </div>
</template>