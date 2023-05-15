<script setup lang="ts">
    import { useOverlay } from '@overlays/vue'
    const props = defineProps({
        title: String,
        visible: Boolean,
        data: Object as any,
    })

    const { visible, resolve, reject } = useOverlay({})
    console.log("modal datas")
    console.log(props.data)
</script>

<template>
  <div v-if="visible" class="match-overlay">
    <div class="match-overlay-content card p-2">
        <h2>
            {{ title }}
        </h2>
        <div>
            <button @click="resolve(`${title}:confirmed`)" class="btn m-1">Confirmer</button>
            <button @click="reject(`${title}:confirmed`)" class="btn m-1">Annuler</button>
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
</style>