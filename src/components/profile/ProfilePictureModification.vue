<script setup lang="ts">

const props = defineProps({
    position : {
        type: Number,
        required: true
    }
})
</script>

<template>
    <div class="profile-picture-modification-zone">
        <span>{{ props.position }}</span>

    </div>
</template>

<style>
.profile-picture-modification-zone {
    width: 100px;
    height: 120px;
    border: solid red 1px;
    margin: 5px;
}

</style>