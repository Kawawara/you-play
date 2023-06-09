<script setup lang="ts">
import {
  ProfileDescriptionComponnent,
  ProfileStatusComponent,
  ProfileTagsOfflineGamesComponent,
  ProfileTagsMovieComponent,
  ProfileTagsVideoGamesComponent,
  ProfileTagsActivitiesComponent,
  ProfileTagsNightActivitiesComponent,
  ProfileTagsSportsComponent
} from '@/components'
import type { UserComplet } from '@/types';

const props = defineProps({
    user : {
        type : Object as () => UserComplet,
        required : true
    }
})
const tags_offline_video_games = ["zelda", "tetris", "darksoul"]
const tags_movies_type = ["Drama", "Horreur", "Sci-fi"]
const tags_video_games = ["R6S", "FIFA", "Super Mario", "Poker"]
const tags_sports = ["Kayak", "Badminton", "MMA"]
const tags_activities = ["Café", "Musés"]
const tags_night_activities = ["Boites de nuit", "Bars"]

</script>

<template>
  <ProfileStatusComponent :user_id="props.user.id" :user_city="props.user.city"/>
  <br>
  <ProfileDescriptionComponnent :user_id="props.user.id" :user_description="props.user.description" :name="'Déscription'"/>
  <br>
  <ProfileTagsVideoGamesComponent :user_id="props.user.id" :tags="tags_video_games" :name="'Jeux vidéos'"/>

  <ProfileTagsSportsComponent :user_id="props.user.id" :tags="tags_sports" :name="'Sports'"/>

  <ProfileTagsOfflineGamesComponent :user_id="props.user.id" :tags="tags_offline_video_games" :name="'Jeux vidéos offline'"/>

  <ProfileTagsMovieComponent :user_id="props.user.id" :tags="tags_movies_type" :name="'Genres de films'"/>

  <ProfileTagsActivitiesComponent :user_id="props.user.id" :tags="tags_activities" :name="'Sorties'"/>

  <ProfileTagsNightActivitiesComponent :user_id="props.user.id" :tags="tags_night_activities" :name="'Sorties nocturnes'"/>

</template>