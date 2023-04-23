<script setup lang="ts">
  import { useAuth } from '@/services'
  const {logout} = await useAuth();

</script>

<template>
    <p>Params</p>
        <slot></slot>
      <button class="btn btn-error rounded-md hover:bg-opacity-90"
        @click.prevent="logout">Déconnexion</button>

</template>