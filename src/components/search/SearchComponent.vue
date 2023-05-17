<script setup lang="ts">
import { ProfileCard, LikesOptionBar } from '@/components'
import { useActions } from '@/services';
import type { UserComplet } from '@/types';


const { users } = await useActions()

const props = defineProps({
  user: {
    type: Object as () => UserComplet,
    required: true,
  }
})

</script>

<template>
  <div>
    <ProfileCard :otherUser="users[0]" :user="props.user">
      
    </ProfileCard>
  </div>
</template>
