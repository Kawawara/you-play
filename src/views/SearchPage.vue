<script setup lang="ts">
import { getUsers } from '@/services'
import { useAuth } from '@/services'
import { useRouter } from 'vue-router'
import { AppLayout, LikesMenu, MessagesMenu } from '@/components';

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
    component: MessagesMenu,
    props: {    }
  }
]

console.log(users)


</script>

<template>
  <AppLayout :tabs="tabs" :profile="false">
    
    <router-link :to="{name:'home'}" class="flex items-center">retour</router-link>
    <div v-if="user !== undefined" class="about">
      <ul>
        <li v-for="user in users" :key="user.id" :field="user">
            <span>{{user?.name}}&nbsp;</span>
            <span>{{user?.lastName}}&nbsp;</span>
            <span>{{user?.gender}}&nbsp;</span>
            <span>{{user?.city}}&nbsp;</span>
        </li>
      </ul>
    </div>

  </AppLayout>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>