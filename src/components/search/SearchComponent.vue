<script setup lang="ts">
import { ProfileCardShort, LikesOptionBar } from '@/components'
import { getUsers } from '@/services';


const users = await getUsers();

</script>

<template>
  <div>
    <ProfileCardShort :user="users[0]">
      <LikesOptionBar />
    </ProfileCardShort>
  </div>
  <div v-for="user in users" :key="user.id" style="display: none;">
    <ProfileCardShort :user="user">
      <LikesOptionBar />
    </ProfileCardShort>
  </div>
</template>
