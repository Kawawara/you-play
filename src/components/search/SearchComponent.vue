<script setup lang="ts">
import { ProfileCard, LikesOptionBar, Spinner } from '@/components'
import { useSearch, useAuth, useActions } from '@/services';
import type { UserComplet } from '@/types';
import { ref } from 'vue';


const { users, initService } = await useActions()

const props = defineProps({
  user: {
    type: Object as () => UserComplet,
    required: true,
  }
})
const loaded = ref(false)
initService(props.user.id)
var aviableUsers = [props.user]  
if (users != undefined) {
  aviableUsers = users
  loaded.value = true
} 
</script>

<template>
  <div v-if="loaded">

    <div v-if="props?.user?.id != undefined && aviableUsers?.length > 0">
      <ProfileCard :otherUser="aviableUsers[0]" :user="props.user">
        
      </ProfileCard>
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
  <div v-else>
    <Spinner />
  </div>
</template>
