<script setup lang="ts">
import {
  IconMoreInfos,
  ProfileCardDetailledComponent,
  ProfileCardModificationComponent,
  ProfileDescriptionComponnent,
  ProfileStatusComponent,
  ProfileTagsOfflineGamesComponent,
  ProfileTagsMovieComponent,
  ProfileTagsVideoGamesComponent,
  ProfileTagsSportsComponent,
  ProfilePicturesIndicator,
  LikesOptionBar,
  IconSetting,
  ProfilePictureModification,
ProfileTagsActivitiesComponent,
ProfileTagsNightActivitiesComponent
} from '@/components'
import type { Activity, UserComplet } from '@/types';
import { computed, defineComponent, ref } from 'vue';
import { useSearch, useActivities } from '@/services'

enum ActitiesType {
    NIGHTACTIVITY = 6, 
    ACTIVITY = 5,
    OFFLINEGAME = 4, 
    ONLINEGAME = 3,
    SPORTS = 2,
    MOVIETYPE = 1
}
// TODO filter on getActivitybyUSer

const { getPictures } = await useSearch()
const { getActivitiesByType } = await useActivities()

const props = defineProps({
  otherUser: {
    type: Object as () => UserComplet,
    required: true,
  },
  user: {
    type: Object as () => UserComplet,
    required: true,
  },
  detailView : {
    type: Boolean
  },
  profileModification: {
    type: Boolean
  }
})

interface Emits {
    (e: 'update'): void,
    (e: 'modif'): void,
    (e: 'detail'): void,
}
const emits = defineEmits<Emits>();
const userTags :Activity[] = props.user.activities

const tags: Activity | any[] = []
tags[ActitiesType.MOVIETYPE] = {type: ActitiesType.MOVIETYPE , name:"Genres de films", activities: getActivitiesByType(ActitiesType.MOVIETYPE, userTags)}
tags[ActitiesType.OFFLINEGAME] = {type: ActitiesType.OFFLINEGAME , name:"Jeux vidéos offline", activities: getActivitiesByType(ActitiesType.OFFLINEGAME, userTags)}
tags[ActitiesType.ONLINEGAME] = {type: ActitiesType.ONLINEGAME , name:"Jeux vidéos", activities: getActivitiesByType(ActitiesType.ONLINEGAME, userTags)}
tags[ActitiesType.SPORTS] = {type: ActitiesType.SPORTS , name:"Sports", activities: getActivitiesByType(ActitiesType.SPORTS, userTags)}
tags[ActitiesType.ACTIVITY] = {type: ActitiesType.ACTIVITY , name:"Sorties", activities: getActivitiesByType(ActitiesType.ACTIVITY, userTags)}
tags[ActitiesType.NIGHTACTIVITY] = {type: ActitiesType.NIGHTACTIVITY , name:"Sorties nocturnes", activities: getActivitiesByType(ActitiesType.NIGHTACTIVITY, userTags)}
// tags.shift()



const pics = await getPictures(props?.otherUser?.id ?? props?.user?.id)

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
      tags: tags[ActitiesType.ONLINEGAME].activities
    }
  },
  {
    position: 4,
    component: ProfileTagsSportsComponent,
    props: {
      name: "Sports",
      user_id: props.otherUser?.id,
      tags: tags[ActitiesType.SPORTS].activities
    }
  },
  {
    position: 5,
    component: ProfileTagsOfflineGamesComponent,
    props: {
      name: "Jeux vidéos offline",
      user_id: props.otherUser?.id,
      tags: tags[ActitiesType.OFFLINEGAME].activities
    }
  },
  {
    position: 6,
    component: ProfileTagsMovieComponent,
    props: {
      name: "Genres de films",
      user_id: props.otherUser?.id,
      tags: tags[ActitiesType.MOVIETYPE].activities
    }
  },
  {
    position: 7,
    component: ProfileTagsActivitiesComponent,
    props: {
      name: "Sorties",
      user_id: props.otherUser?.id,
      tags: tags[ActitiesType.ACTIVITY].activities
    }
  },
  {
    position: 8,
    component: ProfileTagsNightActivitiesComponent,
    props: {
      name: "Sorties nocturnes",
      user_id: props.otherUser?.id,
      tags: tags[ActitiesType.NIGHTACTIVITY].activities
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


let isMyProfile = false
if (props.user.id === props.otherUser?.id) {
  isMyProfile = true
}



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


function resetImageBar() {
  currentSectionIndex.value = 1
}
</script>

<template>
  <div class="card" :class="{'card-detailed overflow-hidden' : props.detailView||props.profileModification}">
    <div :class="{'w-full h-full' : props.detailView||props.profileModification, 'h-full': !props.detailView&&!props.profileModification}">
      <div :class="{' scroll-without-scrollbar' : props.detailView||props.profileModification, 'h-full': !props.detailView&&!props.profileModification}">

        <div class="relative" v-if="!props.profileModification">
          <img class="user-picture" :src="'http://127.0.0.1:8000/api/public/' + (currentPicture?.fileName ?? 'utilisateur1.png')" />
          <div class="pictures-indicator" v-if="pics.length > 0">
            <ProfilePicturesIndicator :position="currentSectionIndex" :total="pics.length" />
          </div>
          <IconSetting v-if="isMyProfile" class="setting-icon" @click="$emit('modif')"/>
          <div class="button-container" v-if="pics.length > 0">
            <p class="swipe-left center-left" @click=" posMinus()">&lt;</p>
            <p class="swipe-right center-right" @click=" posPlus()">&gt;</p>
          </div>
        </div>

        <div v-if="props.profileModification" class="relative">
          <IconSetting v-if="isMyProfile" class="setting-icon" @click="$emit('modif')"/>
          <div class="profile-picture-modification">
            <ProfilePictureModification v-for="section in sections" :key="section.position" :position="section.position" :picture="pics[section.position -1]"/>
          </div>
        </div>

        <div :class="{'card-info ': !props.detailView&&!props.profileModification, ' p-2 card-info-detailled': props.detailView||props.profileModification}">
          <div class="flex justify-between">
            <h2 class="no-padding-margin title">{{ otherUser?.name }}, {{ otherUser?.age }}</h2>
            <div v-if="!props.profileModification" class="svg-container detaille" @click="$emit('detail')">
              <IconMoreInfos />
            </div>
          </div>
          <div class="card-container" v-if="!props.profileModification">
            <component v-if="props.detailView" :is="ProfileCardDetailledComponent" :user="props.otherUser"></component>
            <component v-if="!props.detailView" :is="currentSection!.component" v-bind="currentSection!.props"></component>
          </div>
          <div class="card-container" v-if="props.profileModification">
            <ProfileCardModificationComponent :user="props.user" @updateuser="$emit('update')"/>
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