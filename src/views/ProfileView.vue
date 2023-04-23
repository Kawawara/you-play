<script setup lang="ts">
import TheProfile from '../components/TheProfileWelcome.vue'
import { AppLayout, LikesMenu, MessagesMenu, ParametresMenu, PromotionsMenu } from '@/components';
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
    name: 'Promotions',
    label: 'Promotions',
    component: PromotionsMenu,
    props: {    }
  },
  {
    name: 'Paramètres',
    label: 'Paramètres',
    component: ParametresMenu,
    props: {    }
  }
]

</script>

<template>
    <AppLayout :tabs="tabs"  :profile="true">

      <TheProfile></TheProfile>

    </AppLayout>
</template>
