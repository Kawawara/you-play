<script setup lang="ts">
import { getUser, useAuth, getMatches, getLikes, getConvs, getMessages, getSubscriptions, getPhotos } from '@/services';
import store from '@/components/messages/store';
import type { Match, Like } from '@/types';

const changerConversation = (conversationId: number) => {
    store.mutations.updateIdConv(store.state, conversationId);
    store.mutations.updateshowWelcome(store.state, false)
};

const {user} = await useAuth();

var hasAbonnement = false;
const abonnements = await getSubscriptions(user.value.id);
if(abonnements.length > 0){
    hasAbonnement = true;
    // enlever
    hasAbonnement = false;
}

var notAbonneWithLikes = false;

// matchs
var myMatches: Match[] = [];
var matches = await getMatches(user.value.id)
var convs = await getConvs(user.value.id);
for (const match of matches) {
    const userMess = await getUser(match.idUser2);
    match.secondUserName = userMess.name.substring(0, 6);
    const photos = await getPhotos(match.idUser2);
    const randomNumber: number = Math.floor(Math.random() * 6) + 1;
    match.secondUserPhoto = 'http://localhost:8000/api/public/utilisateur' + randomNumber +'.png';
    for(const photo of photos){
        if(photo.position == 1){
            match.secondUserPhoto = 'http://localhost:8000/api/public/users/' + (photo.fileName ?? 'utilisateur1.png');
            break;
        }
    }
    for(const conv of convs[0]){
        if(conv.idFirstUser == match.idUser && conv.idSecondUser == match.idUser2){
            match.idConversation = conv.id;
            const mess_envoye = await getMessages(conv.idFirstUser, conv.id);
            const mess_recu = await getMessages(conv.idSecondUser, conv.id)
            const all_mess = [...mess_envoye, ...mess_recu];
            if(all_mess.length == 0){
                myMatches.push(match);
            }
            break;
        }
    }
}

// likes
var myLikes: Like[] = [];
var likes = await getLikes(user.value.id);

for (const like of likes) {
    const userMess = await getUser(like.idUserWhoLiked);
    var isMatch = false;
    like.secondUserName = userMess.name.substring(0, 6);
    const randomNumber: number = Math.floor(Math.random() * 6) + 1;
    like.secondUserPhoto = 'http://localhost:8000/api/public/utilisateur' + randomNumber +'.png';
    const photos = await getPhotos(like.idUserWhoLiked);
    for(const photo of photos){
        if(photo.position == 1){
            like.secondUserPhoto = 'http://localhost:8000/api/public/users/' + photo.fileName;
            break;
        }
    }
    for(const match of matches){
        if(match.idUser2 == like.idUserWhoLiked){
            isMatch = true;
            break;
        }
    }
    if(!isMatch){
        myLikes.push(like);
    }
}

const nbLike = myLikes.length;

if(!hasAbonnement && myLikes.length > 0){
    notAbonneWithLikes = true;
}

myLikes.sort((a, b) => b.id - a.id);
const lastLike = myLikes[0];

if(!hasAbonnement){
    myLikes = []; // j'affiche pas les likes aux gens sans abonnements
}
</script>

<template>
    <ul class="match-list" style="max-height: 80vh;">
        <li v-if="notAbonneWithLikes" class="match-card likes" id="background-likes" :style="{ backgroundImage: `url(${lastLike.secondUserPhoto})`}">
            <h3>{{nbLike}} Likes</h3>
        </li>
        <li v-for="like in myLikes" :key="like.id" class="match-card likes" :style="{ backgroundImage: `url(${like.secondUserPhoto})`}">
            <h3>{{like.secondUserName}}</h3>
        </li>
        <li v-for="match in myMatches" :key="match.id" class="match-card matches" :style="{ backgroundImage: `url(${match.secondUserPhoto})`}" @click="changerConversation(match.idConversation)">
            <h3>{{match.secondUserName}}</h3>
        </li>
    </ul>
</template>
  
<style>
.match-list {
    @apply flex flex-wrap list-none p-0 m-0 overflow-y-scroll
}
  
.match-card {
    @apply w-1/3 box-border m-3 rounded-2xl relative bg-cover cursor-pointer
}

.likes {
    @apply border-2 border-yellow-400
}

.matches {
    @apply border border-black
}
  
#background-likes {
    @apply blur-sm
}
  
.match-card h3 {
    position: absolute;
    bottom: 0;
    margin: 3px;
    -webkit-text-stroke: 0.5px black;
    -webkit-text-fill-color: white;
}

.match-card::before {
    content: "";
    display: block;
    padding-bottom: 100%;
}
</style>