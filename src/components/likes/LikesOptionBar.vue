<script setup lang="ts">
import { IconLike, IconDislike, IconShowBack, IconBoost, IconSuperLike } from '@/components';
</script>

<template>
    <div class="like-bar">
        <div></div>

        <div class="like-bar-button"><IconShowBack class="like-bar-item" /></div>
        <div class="like-bar-button"><IconDislike class="like-bar-item" /></div>
        <div class="like-bar-button"><IconSuperLike class="like-bar-item" /></div>
        <div class="like-bar-button"><IconLike class="like-bar-item" /></div>
        <div class="like-bar-button"><IconBoost class="like-bar-item" /></div>

        <div></div>
    </div>
</template>

<style>
.like-bar-item{
    height: 32px;
    width: auto;
    margin: auto;
}

.like-bar {
    display:flex;
    justify-content: space-evenly;
    margin-top: 10px;
}

.like-bar-button {
    height: 36px;
    width: 36px;
    border-radius: 36px;
    background-color: azure;
    display: flex;
}
</style>