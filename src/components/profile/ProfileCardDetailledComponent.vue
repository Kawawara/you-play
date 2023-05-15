<script setup lang="ts">
import {
  ProfileDescriptionComponnent,
  ProfileStatusComponent,
  ProfileTagsMusiqueComponent,
  ProfileTagsMovieComponent,
  ProfileTagsVideoGamesComponent,
  ProfileTagsLangageComponent,
  ProfileTagsSportsComponent
} from '@/components'
import type { UserComplet } from '@/types';

const props = defineProps({
    user : {
        type : Object as () => UserComplet,
        required : true
    }
})
const tags_musique = ["Techno", "Rap", "Pop", "Jazz", "Latino"]
const tags_movies = ["Harry Potter", "Back to the Future", "Spider-Man"]
const tags_video_games = ["R6S", "FIFA", "Super Mario", "Poker"]
const tags_sports = ["Kayak", "Badminton", "MMA"]
const tags_langage = ["Français", "Franglais"]

</script>

<template>
  <ProfileStatusComponent :user_id="props.user.id" :user_city="props.user.city"/>
  <br>
  <ProfileDescriptionComponnent :user_id="props.user.id" :user_description="props.user.description" :name="'Déscription'"/>
  <br>
  <ProfileTagsVideoGamesComponent :user_id="props.user.id" :tags="tags_video_games" :name="'Jeux vidéos'"/>

  <ProfileTagsSportsComponent :user_id="props.user.id" :tags="tags_sports" :name="'Sports'"/>

  <ProfileTagsMusiqueComponent :user_id="props.user.id" :tags="tags_musique" :name="'Musique'"/>

  <ProfileTagsMovieComponent :user_id="props.user.id" :tags="tags_movies" :name="'Films'"/>

  <ProfileTagsLangageComponent :user_id="props.user.id" :tags="tags_langage" :name="'Langues'"/>

</template>