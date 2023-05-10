<script setup lang="ts">
import { IconHome, IconPosition, IconOnline } from "@/components"

const props = defineProps({
    user_id: {
        type: Number,
        required: true,
    },
    user_city: {
        type: String,
        required: true
    }
});
</script>

<template>
    <div :id="String(props.user_id) + '_card-one'">
        <div class="svg-container">
            <IconOnline />
            <span class="svg-text"> En ligne</span>
        </div>
        <div class="svg-container">
            <IconHome />
            <span class="svg-text"> Vit ici : {{ props.user_city }}</span>
        </div>
        <div class="svg-container">
            <IconPosition />
            <span class="svg-text"> à 1 km</span>
        </div>
    </div>
</template>

<style>
.svg-container svg,
.svg-container .svg-text {
    display: inline-block;
    vertical-align: middle;
}
</style>