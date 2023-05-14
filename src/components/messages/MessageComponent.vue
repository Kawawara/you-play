<script setup lang="ts">

import { getMessages, useAuth, getConv, getUser, useAxios, addMess } from '@/services';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import type { Message } from '@/types/Message';
import type { RouteLocationNormalized } from 'vue-router';
import { onBeforeRouteUpdate } from 'vue-router';

const { Axios } = useAxios()
const route = useRoute();
var convId = Number(route.params.id);

const {user} = await useAuth();

var conv = await getConv(convId);

var userMess = await getUser(conv.idSecondUser);

var secondUserName = userMess.name;
var secondUserPhoto = 'photo_1.jpg';

var all_mess = ref<Message[]>([]);

const fetchMessages = async () => {
    const mess_envoye = await getMessages(conv.idFirstUser, conv.id);
    const mess_recu = await getMessages(conv.idSecondUser, conv.id);
    const new_messages = [...mess_envoye, ...mess_recu].sort((a, b) => a.id - b.id);
    all_mess.value = new_messages;
};

fetchMessages();

setInterval(() => {
    fetchMessages();
}, 5000);

const content = ref('');

const submit = async () => {
    try {
        console.log(content.value)
        await addMess(content.value, conv.id, user.value.id);
        content.value = '';
        fetchMessages();
    } catch (error) {
        console.error(error);
    }
};

const beforeRouteUpdate = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: () => void) => {
  if (to.params.id !== from.params.id) {
    convId = Number(to.params.id);
    conv = await getConv(convId);
    userMess = await getUser(conv.idSecondUser);
    secondUserName = userMess.name;
    fetchMessages();
  }
  next();
};

onBeforeRouteUpdate(beforeRouteUpdate);

</script>

<template>
    <div class="container">
        <h1 class="user-header">
            <img id="miniPicture" :src="secondUserPhoto"/>
            <span class="user-name">{{ secondUserName }}</span>
        </h1>
		<div class="messages">
			<div v-for="mes in all_mess" :key="mes.id" :class="{ 'sent': mes.idUser === conv.idFirstUser, 'received': mes.idUser !== conv.idFirstUser }">
				<p>{{ mes.content }}</p>
			</div>
		</div>
		<form name="content" class="form" @submit.prevent="submit">
			<input v-model="content" name="content" type="text" placeholder="Type a message...">
			<button>Send</button>
		</form>
	</div>
</template>

<style type="text/css">
.container {
    font-family: 'Prosto One', sans-serif;
    background-color: #f0f0f0;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.messages {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
    overflow-y: auto;
    max-height: calc(100vh - 250px);
}

.received {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 2px 5px rgba(0,0,0,0.2);
    align-self: flex-start;
    max-width: 60%;
}

.sent {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: #218AFF;
    box-shadow: 0px 2px 5px rgba(0,0,0,0.2);
    align-self: flex-end;
    max-width: 60%;
}

.received p {
    margin: 0;
    padding: 0;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
}

.sent p {
    color: #fff;
}

.form {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
}

.form input {
    flex-grow: 1;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #fff;
    box-shadow: 0px 2px 5px rgba(0,0,0,0.2);
    font-size: 16px;
    color: #333;
}

.form button {
    margin-left: 10px;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: #218AFF;
    box-shadow: 0px 2px 5px rgba(0,0,0,0.2);
    font-size: 16px;
    color: #fff;
    cursor: pointer;
}

#miniPicture {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 15px;
}

.user-header {
  display: flex;
  align-items: center;
}

.user-name {
  font-size: 24px;
  font-weight: bold;
}
</style>