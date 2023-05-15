<script setup lang="ts">
import {
  ProfileCardDetailledComponent,
  ProfileDescriptionComponnent,
  ProfileStatusComponent,
  ProfileTagsMusiqueComponent,
  ProfileTagsMovieComponent,
  ProfileTagsVideoGamesComponent,
  ProfileTagsLangageComponent,
  ProfileTagsSportsComponent,
  ProfilePicturesIndicator
} from '@/components'
import type { UserComplet } from '@/types';

const props = defineProps({
    user : {
        type : Object as () => UserComplet,
        required : true
    }
})
console.log(props.user)
</script>

<template>

</template>