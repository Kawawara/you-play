<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { AppLayout, LikesMenu, MessagesMenu } from '@/components';
import { useAuth } from '@/services'
import { useRouter } from 'vue-router'

const {user} = await useAuth();

var logedIn = false
if (user?.value) {
  logedIn=true
}
if (!logedIn) {
  const router = useRouter()
  router.push({ name: 'login' })
}

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
    <AppLayout :tabs="tabs" :profile="false" >

      <TheWelcome></TheWelcome>

    </AppLayout>
</template>
