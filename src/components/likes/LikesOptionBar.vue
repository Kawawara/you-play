<script setup lang="ts">
import { IconLike, IconDislike, IconShowBack, IconBoost, IconSuperLike } from '@/components';
import type { User, UserComplet } from '@/types';
import { useActions } from "@/services";

const props = defineProps({
    connectedUser: {
        type: Object as () => User,
        required: true,
    },
    otherUser: {
        type: Object as () => UserComplet,
        required: true,
    },
})

const { postLike, postDislike, postSuperlike, goback } = await useActions()



</script>

<template>
    <div class="like-bar">
        <div></div>

        <div class="like-bar-button"><IconShowBack class="like-bar-item" @click="goback(props.connectedUser.id, props.otherUser.id)"/></div>
        <div class="like-bar-button"><IconDislike class="like-bar-item" @click="postDislike(props.connectedUser.id, props.otherUser.id)"/></div>
        <div class="like-bar-button"><IconSuperLike class="like-bar-item" @click="postSuperlike(props.connectedUser.id, props.otherUser.id)"/></div>
        <div class="like-bar-button"><IconLike class="like-bar-item" @click="postLike(props.connectedUser.id, props.otherUser.id)"/></div>
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
    display: flex;
    cursor: pointer;
}
</style>