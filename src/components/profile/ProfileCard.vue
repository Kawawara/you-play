<script setup lang="ts">
import {
  IconMoreInfos,
  ProfileCardDetailledComponent,
  ProfileCardModificationComponent,
  ProfileDescriptionComponnent,
  ProfileStatusComponent,
  ProfileTagsMusiqueComponent,
  ProfileTagsMovieComponent,
  ProfileTagsVideoGamesComponent,
  ProfileTagsLangageComponent,
  ProfileTagsSportsComponent,
  ProfilePicturesIndicator,
  LikesOptionBar,
  IconSetting,
  ProfilePictureModification
} from '@/components'
import type { UserComplet, User } from '@/types';
import { computed, defineComponent, ref } from 'vue';
import { useSearch } from '@/services'

const { getPictures } = await useSearch()

const props = defineProps({
  otherUser: {
    type: Object as () => UserComplet,
    required: true,
  },
  user: {
    type: Object as () => UserComplet,
    required: true,
  }
})
const pics = await getPictures(props?.otherUser?.id ?? props?.user?.id)

const tags_musique = ["Techno", "Rap", "Pop", "Jazz", "Latino"]
const tags_movies = ["Harry Potter", "Back to the Future", "Spider-Man"]
const tags_video_games = ["R6S", "FIFA", "Super Mario", "Poker"]
const tags_sports = ["Kayak", "Badminton", "MMA"]
const tags_langage = ["Français", "Franglais"]

const sections = [
  {
    name: "Status",
    position: 1,
    component: ProfileStatusComponent,
    props: {
      user_id: props.otherUser?.id,
      user_city: props.otherUser?.city
    }
  },
  {
    position: 2,
    component: ProfileDescriptionComponnent,
    props: {
      name: "Description",
      user_id: props.otherUser?.id,
      user_description: props.otherUser?.description ?? ""
    }
  },
  {
    position: 3,
    component: ProfileTagsVideoGamesComponent,
    props: {
      name: "Jeux vidéos",
      user_id: props.otherUser?.id,
      tags: tags_video_games
    }
  },
  {
    position: 4,
    component: ProfileTagsSportsComponent,
    props: {
      name: "Sports",
      user_id: props.otherUser?.id,
      tags: tags_sports
    }
  },
  {
    position: 5,
    component: ProfileTagsMusiqueComponent,
    props: {
      name: "Musiques",
      user_id: props.otherUser?.id,
      tags: tags_musique
    }
  },
  {
    position: 6,
    component: ProfileTagsMovieComponent,
    props: {
      name: "Films",
      user_id: props.otherUser?.id,
      tags: tags_movies
    }
  },
  {
    position: 7,
    component: ProfileTagsLangageComponent,
    props: {
      name: "Langues",
      user_id: props.otherUser?.id,
      tags: tags_langage
    }
  },
  {
    position: 8,
    component: defineComponent({}),
    props: {
      name: ""
    }
  },
  {
    position: 9,
    component: defineComponent({}),
    props: {
      name: ""
    }
  },
]

const currentSectionIndex = ref(1)
const currentSection = computed(() => sections.find(item => item.position == currentSectionIndex.value))
const currentPicture = computed(() => pics.find(item => item.position == currentSectionIndex.value))

const detailView = ref(false)

let isMyProfile = false
if (props.user.id === props.otherUser?.id) {
  isMyProfile = true
}

const profileModification = ref(false)


function posPlus() {
  if (currentSectionIndex.value < pics.length) {
    currentSectionIndex.value++
  }
}

function posMinus() {
  if (currentSectionIndex.value > 1) {
    currentSectionIndex.value--
  }
}

function updateUser() {
  profileModification.value = !profileModification.value
  // TODO sync with back-end when profile modification is done ?
}

function resetImageBar() {
  currentSectionIndex.value = 1
}
</script>

<template>
  <div class="card" :class="{'card-detailed overflow-hidden' : detailView||profileModification}">
    <div :class="{'w-full h-full' : detailView||profileModification, 'h-full': !detailView&&!profileModification}">
      <div :class="{' scroll-without-scrollbar' : detailView||profileModification, 'h-full': !detailView&&!profileModification}">

        <div class="relative" v-if="!profileModification">
          <img class="user-picture" :src="'http://127.0.0.1:8000/api/public/' + (currentPicture?.fileName ?? 'utilisateur1.png')" />
          <div class="pictures-indicator" v-if="pics.length > 0">
            <ProfilePicturesIndicator :position="currentSectionIndex" :total="pics.length" />
          </div>
          <IconSetting v-if="isMyProfile" class="setting-icon" @click="updateUser()"/>
          <div class="button-container" v-if="pics.length > 0">
            <p class="swipe-left center-left" @click=" posMinus()">&lt;</p>
            <p class="swipe-right center-right" @click=" posPlus()">&gt;</p>
          </div>
        </div>

        <div v-if="profileModification" class="relative">
          <IconSetting v-if="isMyProfile" class="setting-icon" @click="() => {profileModification = !profileModification}"/>
          <div class="profile-picture-modification">
            <ProfilePictureModification v-for="section in sections" :key="section.position" :position="section.position" :picture="pics[section.position -1]"/>
          </div>
        </div>

        <div :class="{'card-info ': !detailView&&!profileModification, ' p-2 card-info-detailled': detailView||profileModification}">
          <div class="flex justify-between">
            <h2 class="no-padding-margin title">{{ otherUser?.name }}, {{ otherUser?.age }}</h2>
            <div v-if="!profileModification" class="svg-container detaille" @click="() => {detailView = !detailView}">
              <IconMoreInfos />
            </div>
          </div>
          <div class="card-container" v-if="!profileModification">
            <component v-if="detailView" :is="ProfileCardDetailledComponent" :user="props.otherUser"></component>
            <component v-if="!detailView" :is="currentSection!.component" v-bind="currentSection!.props"></component>
          </div>
          <div class="card-container" v-if="profileModification">
            <ProfileCardModificationComponent :user="props.user"/>
          </div>
          <div class="option-bar">
            <LikesOptionBar v-if="!isMyProfile" :connectedUser="user" :otherUser="props.otherUser" :otherUserProfilePic="pics[0]" @reset="resetImageBar"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.option-bar {
  width: 100%;
}
.setting-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 100;
}
.profile-picture-modification {
  display: flex;
  flex-wrap: wrap;
  margin-left: 30px ;
}
</style>