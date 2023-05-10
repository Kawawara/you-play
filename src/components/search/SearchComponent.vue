<script setup lang="ts">
import { ProfileCardShort, LikesOptionBar } from '@/components'
import { useSearch } from '@/services';
import type { User } from '@/types';


const { getUsers } = await useSearch();
const users = await getUsers();

const props = defineProps({
  user: {
    type: Object as () => User,
    required: true,
  }
})

</script>

<template>
  <div>
    <ProfileCardShort :user="users[0]">
      <LikesOptionBar :connectedUser="user" :otherUser="users[0]"/>
    </ProfileCardShort>
  </div>
  <!-- <div v-for="user in users" :key="user.id" style="display: none;">
    <ProfileCardShort :user="user">
      <LikesOptionBar />
    </ProfileCardShort>
  </div> -->
</template>
