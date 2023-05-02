<script setup lang="ts">
import { ProfileCardShort } from '@/components'
import { getUsers } from '@/services';


const users = await getUsers();

</script>

<template>
  <ProfileCardShort :user="users[0]">
    <p>Revenir, refuser, superlike, like, boost</p>
  </ProfileCardShort>
  <div v-for="user in users" :key="user.id" style="display: none;">
    <ProfileCardShort :user="user">
      <p>Revenir, refuser, superlike, like, boost</p>
  </ProfileCardShort>
  </div>
</template>
