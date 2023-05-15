<script setup lang="ts">
import { AppLayout, ParametresMenu, ProfileCard, PromotionsMenu } from '@/components';
import { useAuth, useSearch } from '@/services'
import { useRouter } from 'vue-router'

const { user } = await useAuth();
const { getUser } = await useSearch()

var logedIn = false
if (user?.value) {
  logedIn = true
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
    props: {}
  },
  {
    name: 'Paramètres',
    label: 'Paramètres',
    component: ParametresMenu,
    props: {}
  }
]

const User = await getUser(user.value.id)
</script>

<template>
  <AppLayout :tabs="tabs" :profile="true">

    <ProfileCard :user="User"></ProfileCard>

  </AppLayout>
</template>
