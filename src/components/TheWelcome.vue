<script setup lang="ts">
  import { useAuth } from '@/services'

  const {user, logout} = await useAuth();

  var logedIn = false
  if (user?.value) {
    logedIn=true
  }
  // console.log(user.value)
</script>

<template>
  <div>
    <h1>WELCOME</h1>
    <div v-if="logedIn">
      <button 
                        class="btn btn-error rounded-md hover:bg-opacity-90"
                        @click.prevent="logout"
      >Déconnexion</button>
    </div>
    <div v-if="!logedIn">
      <router-link to="login" class="flex items-center">Login</router-link>
      <router-link to="signin" class="flex items-center">Signin</router-link>
    </div>
    <router-link to="search" class="flex items-center">Search</router-link>
  </div>
</template>
