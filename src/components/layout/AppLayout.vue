<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { LikesMenu, MessagesMenu, MultiTabs } from '@/components'


  const route = useRoute()



  const tabs = [
  {
    name: 'Likes',
    label: 'Likes',
    component: LikesMenu,
    props: {    }
  },
  {
    name: 'Messages',
    label: 'Messages',
    component: MessagesMenu,
    props: {    }
  }
]
</script>

<template>
    <div class=''>
        <div id="left-menu">
            <MultiTabs :tabs="tabs"/>
        </div>
        <slot></slot>
    </div>
</template>