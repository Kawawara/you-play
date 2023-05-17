<script setup lang="ts">
    import { useOverlay } from '@overlays/vue'
    import { IconDislike } from '@/components'
    import type { Picture, UserComplet } from '@/types'
    const props = defineProps({
        title: String,
        visible: Boolean,
        data: Object as any,
        likedUser: {
            type: Object as () => UserComplet,
            required: true
        },
        profilePic: {
            type: Object as () => Picture,
            required: true
        }
        
    })

    const { visible, resolve, reject } = useOverlay({})
</script>

<template>
  <div v-if="visible" class="match-overlay">
    <div class="match-overlay-content card p-2">
        <div class="spaced-content">
            <h2>{{ title }}</h2>
            <div class="close-button-modal">
                <IconDislike @click="reject(`${title}:confirmed`)" />
            </div>
        </div>
        <div>
            <img class="user-picture" :src="'http://127.0.0.1:8000/api/public/' + (profilePic?.fileName ?? 'utilisateur1.png')" />
            <h2 class="no-padding-margin title">{{ likedUser.name }}, {{ likedUser.age }}</h2>
        </div>
        <div class="spaced-content">
            <button @click="resolve(`${title}:confirmed`)" class="btn btn-primary m-1 p-1">Envoyer un message</button>
            <button @click="reject(`${title}:confirmed`)" class="btn m-1 p-1">Continuer de naviguer</button>
        </div>
    </div>
  </div>
</template>

<style>
.match-overlay {
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:1000;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
div:has(> div.match-overlay) { 
    position: static;
}
.match-overlay-content {
    width: fit-content;
    height: fit-content;
    background-color: azure;
}
.match-overlay-content > .spaced-content{
    display: flex;
    justify-content: space-between;
}
.close-button-modal {
    height: 20px;
    width: 20px;
    cursor: pointer;
}
</style>