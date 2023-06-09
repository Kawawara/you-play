<script setup lang="ts">
import { IconLike, IconDislike, IconShowBack, IconBoost, IconSuperLike } from '@/components';
import type { Picture, User, UserComplet } from '@/types';
import { useActions } from "@/services";

enum Actions {LIKE = "like",DISLIKE = "dislike",GOBACK = "goback", SUPERLIKE = "superlike"}

const props = defineProps({
    connectedUser: {
        type: Object as () => User,
        required: true,
    },
    otherUser: {
        type: Object as () => UserComplet,
        required: true,
    },
    otherUserProfilePic : {
        type: Object as () => Picture,
        required: true
    }
})
interface Emits {
    (e: 'reset'): void
}
const emits = defineEmits<Emits>();

const { postLike, postDislike, postSuperlike, goback } = await useActions()

async function doAction(type: string, myId: number, otherId: number, otherUser: UserComplet|null=null, pictures: Picture|null=null) {
    switch (type) {
        case 'goback':
        await goback(myId, otherId)
            break;
        case 'like':
            if (otherUser != null && pictures != null)
            await postLike(myId, otherId, otherUser,pictures);
            break;
        case 'dislike':
            await postDislike(myId, otherId);
            break;
        case 'superlike' : 
            if (otherUser != null && pictures != null)
            await postSuperlike(myId, otherId, otherUser,pictures);
            break;
        default:
            return
    }
    emits('reset')
}

</script>

<template>
    <div class="like-bar">
        <div></div>

        <div class="like-bar-button"><IconShowBack class="like-bar-item" @click="doAction(Actions.GOBACK ,props.connectedUser.id, props.otherUser.id)"/></div>
        <div class="like-bar-button"><IconDislike class="like-bar-item" @click="doAction(Actions.DISLIKE ,props.connectedUser.id, props.otherUser.id)"/></div>
        <div class="like-bar-button"><IconSuperLike class="like-bar-item" @click="doAction(Actions.SUPERLIKE ,props.connectedUser.id, props.otherUser.id, props.otherUser, props.otherUserProfilePic)"/></div>
        <div class="like-bar-button"><IconLike class="like-bar-item" @click="doAction(Actions.LIKE ,props.connectedUser.id, props.otherUser.id, props.otherUser, props.otherUserProfilePic)"/></div>
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