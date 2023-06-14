<script setup lang="ts">
import type { Picture } from '@/types';
import { ref } from 'vue';
import { IconDislike } from '@/components'


const props = defineProps({
    position : {
        type: Number,
        required: true
    },
    picture : {
        type: Object as () => Picture
    }
})
const isPicture = ref(false)
if (props.picture !== undefined) {
    isPicture.value = true
}
</script>

<template>
    <div class="profile-picture-modification-zone rounded-md shadow-sm">
        <span>{{ props.position }}</span>
        <div class="close-button-modal" v-if="isPicture">
            <IconDislike />
        </div>
        <div>
            <br>
            <p v-if="isPicture">afficher photo</p>
            <p v-if="!isPicture">ajouter photo</p>
        </div>
    </div>
</template>

<style>
.profile-picture-modification-zone {
    width: 100px;
    height: 120px;
    margin: 5px;
    position: relative;
    background-color: rgba(240, 255, 255, 1);
}
.profile-picture-modification-zone > span {
    position: absolute;
    top: 0;
    left: 5px;
    z-index: 50;
}
.profile-picture-modification-zone > .close-button-modal {
    position: absolute;
    top: 0;
    right: 5px;
    z-index: 50;
}

</style>