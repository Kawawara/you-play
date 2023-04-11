<script setup lang="ts">
  import { useAuth } from '@/services'

  const {user, logout} = await useAuth();
  console.log(user?.value)
  var x = false
  if (user?.value) {
    x=true
  }
  // console.log(user.value)
</script>

<template>
  <div>
    <h1>WELCOME</h1>
    <div v-if="x">
      <button 
                        class="btn btn-error rounded-md hover:bg-opacity-90"
                        @click.prevent="logout"
      >Déconnexion</button>
    </div>
    <div v-if="!x">
      <router-link to="login" class="flex items-center">Login</router-link>
      <router-link to="signin" class="flex items-center">Signin</router-link>
    </div>
    <router-link to="search" class="flex items-center">Search</router-link>
  </div>
</template>
