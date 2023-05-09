<script setup lang="ts">
import { 
  IconMoreInfos, 
  ProfileDescriptionComponnent, 
  ProfileStatusComponent, 
  ProfileTagsMusiqueComponent, 
  ProfileTagsMovieComponent, 
  ProfileTagsVideoGamesComponent, 
  ProfileTagsLangageComponent, 
  ProfileTagsSportsComponent 
} from '@/components'
import type { UserComplet } from '@/types';
import { computed, ref } from 'vue';



const props = defineProps({
  user: {
    type: Object as () => UserComplet,
    required: true,
  }
})

const tags_musique = ["Techno", "Rap", "Pop", "Jazz", "Latino"]
const tags_movies = ["Harry Potter", "Back to the Future", "Spider-Man"]
const tags_video_games = ["R6S", "FIFA", "Super Mario", "Poker"]
const tags_sports = ["Kayak", "Badminton", "MMA"]
const tags_langage = ["Français", "Franglais"]
    
const sections = [
{
  name: "status",
  position: 1,
  component: ProfileStatusComponent,
  props: {
    user_id: props.user.id,
    user_city: props.user.city
  }
},
{
  position: 2,
  component: ProfileDescriptionComponnent,
  props: {
    name: "Déscription",
    user_id: props.user.id,
    user_description: props.user.description ?? ""
  }
},
{
  position: 3,
  component: ProfileTagsMusiqueComponent,
  props: {
    name: "Musiques",
    user_id: props.user.id,
    tags: tags_musique
  }
},
{
  position: 4,
  component: ProfileTagsMovieComponent,
  props: {
    name: "Films",
    user_id: props.user.id,
    tags: tags_movies
  }
},
{
  position: 5,
  component: ProfileTagsVideoGamesComponent,
  props: {
    name: "Jeux vidéos",
    user_id: props.user.id,
    tags: tags_video_games
  }
},
{
  position: 6,
  component: ProfileTagsSportsComponent,
  props: {
    name: "Sports",
    user_id: props.user.id,
    tags: tags_sports
  }
},
{
  position: 7,
  component: ProfileTagsLangageComponent,
  props: {
    name: "Langues",
    user_id: props.user.id,
    tags: tags_langage
  }
},
]

const currentSectionIndex = ref(1)
const currentSection = computed(() => sections.find(item => item.position == currentSectionIndex.value))


  function posPlus() {
    if(currentSectionIndex.value < 7) {
      currentSectionIndex.value ++
    }
  }

  function posMinus() {
    if(currentSectionIndex.value > 1) {
      currentSectionIndex.value --
    }
  }
</script>

<template>
  <div class="card" :id="String(user.id)+'_card'">
    <div class="button-container">
      <p class="swipe-left center-left" :id="String(user.id)+'_swipe-left'" @click=" posMinus()">&lt;</p>
      <p class="swipe-right center-right" :id="String(user.id)+'_swipe-right'" @click=" posPlus()">&gt;</p>
    </div>
    <div class="card-info">
      <div class="svg-container detaille">
        <router-link :to="{name:'searchDetaille'}"><IconMoreInfos /></router-link>
      </div>
      <h2 class="no-padding-margin title">{{user.name}}, {{user.age}}</h2>
      <div class="card-container">

        <component :is="currentSection!.component" v-bind="currentSection!.props"></component>

      </div>
      <div class="option-bar">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style>
.option-bar {
  width: 100%;
}
</style>