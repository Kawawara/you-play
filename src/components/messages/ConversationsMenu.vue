<script setup lang="ts">
import { getMessages, getUser, getUsers, useAuth } from '@/services';
import { getConvs } from '@/services';

const {user} = await useAuth();
var convs = await getConvs(user.value.id);

console.log(convs)

for (const conv of convs[0]) {
    const mess_envoye = await getMessages(conv.idFirstUser, conv.id);
    const mess_recu = await getMessages(conv.idSecondUser, conv.id)
    const all_mess = [...mess_envoye, ...mess_recu];
    all_mess.sort((a, b) => b.id - a.id);
    if(all_mess.length > 0)
    {
        const lastMess = all_mess[0];
        const userMess = await getUser(conv.idSecondUser);
        conv.secondUserName = userMess.name.substring(0, 15);
        conv.secondUserPhoto = 'photo_1.jpg';
        conv.contentLastMessage = lastMess.content.substring(0, 15);
        conv.nameLastMessage = "You";
        const dateLastMessage = new Date(lastMess.created_at);
        const minutes = dateLastMessage.getMinutes();
        const minutesString = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
        conv.timeLastMessage = dateLastMessage.getHours() + ":" + minutesString;
        if(lastMess.idUser != user.value.id){
            conv.nameLastMessage = userMess.name;
        }
    }
}
</script>

<template>
  <ul class="conversation-list">
    <li v-for="conv in convs[0]" :key="conv.id">
      <router-link class="link" :to="{name:'message', params: { id: conv.id }}">
        <div>
          <img class="avatar" :src="conv.secondUserPhoto">
          <div class="conversation-info">
            <h3>{{ conv.secondUserName }}</h3>
            <p><span class="sender-name">{{conv.nameLastMessage}}:</span> {{ conv.contentLastMessage }}</p>
            <span class="timestamp">{{ conv.timeLastMessage }}</span>
          </div>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<style type="text/css">
.conversation-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.conversation-list li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

.avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
}

.link {
  display: block;
  align-items: center;
  width: 100%;
  text-decoration: none;
  color: var(--vt-c-indigo);
}

.link:hover {
  background-color: transparent;
}

.conversation-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.conversation-info h3 {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
}

.conversation-info p {
    margin: 0;
    font-size: 14px;
}

.sender-name {
    font-weight: bold;
}

.timestamp {
    font-size: 12px;
    color: #999;
}
</style>