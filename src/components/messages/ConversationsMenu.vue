<script setup lang="ts">
import { getMessage, getUser, useAuth } from '@/services';
import { getConv } from '@/services';

const {user} = await useAuth();
const convs = await getConv(user.value.id);

for (const conv of convs) {
    const mess = await getMessage(conv.id);
    if(mess.length > 0)
    {
        const lastMess = mess[mess.length - 1]; //TODO sort ID desc
        const userMess = await getUser(lastMess.idUser);
        conv.secondUserName = userMess[0].name;
        conv.secondUserPhoto = 'photo_1.jpg';
        conv.contentLastMessage = lastMess.content;
        conv.nameLastMessage = "You";
        conv.timeLastMessage = lastMess.created_at.getHours().toString()
        if(lastMess.idUser != user.value.id){
            conv.nameLastMessage = userMess[0].name;
        }
    }
}

</script>

<template>
  <ul class="conversation-list">
    <li v-for="conv in convs" :key="conv.id">
      <router-link :to="{name:'message', params: { id: conv.id }}">
        <img class="avatar" :src="conv.secondUserPhoto">
        <div class="conversation-info">
          <h3>{{ conv.secondUserName }}</h3>
          <p><span class="sender-name">{{conv.nameLastMessage}}:</span> {{ conv.contentLastMessage }}</p>
          <span class="timestamp">{{ conv.timeLastMessage }}</span>
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
    margin-left: auto;
}
</style>