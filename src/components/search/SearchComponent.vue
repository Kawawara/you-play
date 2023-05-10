<script setup lang="ts">
import { ProfileCardShort, LikesOptionBar } from '@/components'
import { useActions } from '@/services';
import type { User } from '@/types';


const { users } = await useActions()

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
</template>
