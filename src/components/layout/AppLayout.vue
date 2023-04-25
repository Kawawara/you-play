<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { MultiTabs } from '@/components'
  import type { Tab } from '@/types';

// TODO check if user is in configuration mode and change the icon.

  const route = useRoute()

  const props = defineProps({
    tabs: {
      type: Array as () => Tab[],
      default: () => [],
      required: true,
    },
    profile: {
        type: Boolean,
        required: true,
    }
  })


</script>

<template>
    <div id='main-app-frame'>
        <div id="left-menu">
            <div id="top-menu" class="bg-title">
                <div></div>
                <router-link to="/" class="flex items-center">You-Play</router-link>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <router-link v-if="!profile" to="profile" class="flex items-center">Profile</router-link>
                <router-link v-if="profile" to="/" class="flex items-center">Search</router-link>
                <div></div>
            </div>
            <MultiTabs :tabs="tabs"/>
        </div>
        <div id="main-container">
            <slot></slot>
        </div>
    </div>
</template>

<style>

#main-app-frame {
    width: 100vw;
    height: 100vh;
    margin: 0;
    display: flex;
}

#left-menu {
    width: 350px;
    border: solid 1px red;
    height: 100%;
    display: flex;
    flex-direction: column;
}

#top-menu {
    display: flex;
    justify-content: space-between;
    height: 80px;
    background: linear-gradient(41.15deg, rgba(93, 84, 203, 0.5) 5.67%, rgba(255, 218, 85, 0.5) 79.51%), linear-gradient(125.28deg, #FF3FFF 40.37%, #5D54CB 114.21%);;
}

#main-container {
    background-color: grey;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>