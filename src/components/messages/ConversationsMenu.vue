<script setup lang="ts">
import { getMessages, getUser, useAuth, getPhotos, getConvs } from '@/services';
import store from '@/components/messages/store';
import type { Conv } from '@/types';

const changerConversation = (conversationId: number) => {
    store.mutations.updateIdConv(store.state, conversationId);
    store.mutations.updateshowWelcome(store.state, false)
};

const {user} = await useAuth();
var convs = await getConvs(user.value.id);

var myConvs: Conv[] = [];

for (const conv of convs[0]) {
    const mess_envoye = await getMessages(conv.idFirstUser, conv.id);
    const mess_recu = await getMessages(conv.idSecondUser, conv.id)
    const all_mess = [...mess_envoye, ...mess_recu];
    all_mess.sort((a, b) => b.id - a.id);
    if(all_mess.length > 0){
        const lastMess = all_mess[0];
        const userMess = await getUser(conv.idSecondUser);
        conv.secondUserName = userMess.name.substring(0, 15);
        const photos = await getPhotos(conv.idSecondUser);
        const randomNumber: number = Math.floor(Math.random() * 6) + 1;
        conv.secondUserPhoto = 'http://localhost:8000/api/public/utilisateur' + randomNumber +'.png';
        for(const photo of photos){
            if(photo.position == 1){
                conv.secondUserPhoto = 'http://localhost:8000/api/public/users/' + photo.fileName;
                break;
            }
        }
        conv.contentLastMessage = lastMess.content.substring(0, 15);
        conv.nameLastMessage = "You";
        
        const dateLastMessage = new Date(lastMess.created_at);
        const currentTime = new Date();
        const timeDifference = currentTime.getTime() - dateLastMessage.getTime();
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

        if (hoursDifference < 24) {
            const minutes = dateLastMessage.getMinutes();
            const minutesString = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
            conv.timeLastMessage = dateLastMessage.getHours() + ':' + minutesString;
        } else if (hoursDifference < 48) {
            conv.timeLastMessage = 'Hier, ' + dateLastMessage.getHours() + ':' + dateLastMessage.getMinutes();
        } else {
            const day = dateLastMessage.getDate();
            const month = dateLastMessage.getMonth() + 1;
            const year = dateLastMessage.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            conv.timeLastMessage = formattedDate + ', ' + dateLastMessage.getHours() + ':' + dateLastMessage.getMinutes();
        }

        if(lastMess.idUser != user.value.id){
            conv.nameLastMessage = userMess.name;
        }
        myConvs.push(conv);
    }
}

// La valeur updated_at contient la date du dernier message recu, on fait un sort desc
myConvs.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

</script>

<template>
  <ul class="conversation-list">
    <li v-for="conv in myConvs" :key="conv.id" @click="changerConversation(conv.id)">
        <div>
          <img class="avatar" :src="conv.secondUserPhoto">
          <div class="conversation-info">
            <h3>{{ conv.secondUserName }}</h3>
            <p><span class="sender-name">{{conv.nameLastMessage}}:</span> {{ conv.contentLastMessage }}</p>
            <span class="timestamp">{{ conv.timeLastMessage }}</span>
          </div>
        </div>
    </li>
  </ul>
</template>

<style type="text/css">
.conversation-list {
    @apply list-none m-0 p-1 overflow-y-scroll
}

.conversation-list li {
    @apply flex items-center mb-4 p-4 bg-white rounded-lg shadow cursor-pointer
}

.avatar {
    @apply w-10 h-10 rounded-full mr-5
}

.link {
    @apply block items-center w-full no-underline outline-none text-indigo-950
}

.link:hover {
    @apply bg-transparent
}

.conversation-info {
    @apply flex flex-col flex-grow
}

.conversation-info h3 {
    @apply m-0 text-xl font-bold
}

.conversation-info p {
    @apply m-0 text-base
}

.sender-name {
    @apply font-bold;
}

.timestamp {
    @apply text-xs text-gray-500
}
</style>