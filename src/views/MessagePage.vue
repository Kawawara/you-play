<script setup lang="ts">
import { getUsers } from '@/services'
import { useAuth } from '@/services'
import { useRouter } from 'vue-router'
import { AppLayout, LikesMenu, ConversationsMenu } from '@/components';
import MessageComponent from '../components/messages/MessageComponent.vue'

const {user} = await useAuth();

const router = useRouter()
if (user?.value == undefined) {
    router.push({ name: 'login' })
  }

const users = await getUsers();

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
    component: ConversationsMenu,
    props: {    }
  }
]

</script>

<template>
  <AppLayout :tabs="tabs" :profile="false">
    
    <MessageComponent></MessageComponent>

  </AppLayout>
</template>