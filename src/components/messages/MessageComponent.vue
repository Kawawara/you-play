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
    @apply bg-gray-200 max-w-4xl mx-auto px-4 py-8 rounded-lg shadow-md
}

.messages {
    @apply flex flex-col items-start mb-20 overflow-y-auto max-h-96
}

.received {
    @apply flex flex-col mb-3 p-3 rounded-2xl bg-white shadow-md self-start max-w-[60%]
}

.sent {
    @apply flex flex-col mb-3 p-3 rounded-2xl bg-blue-500 shadow-md self-end max-w-[60%]
}

.received p {
    @apply m-0 p-0 text-base leading-relaxed text-gray-700
}

.sent p {
    @apply text-white
}

.form {
    @apply flex flex-row mb-5
}

.form input {
    @apply flex-grow px-4 py-2 rounded-md bg-white shadow-md text-base text-gray-700
}

.form button {
    @apply ml-4 px-5 py-2 rounded-md bg-blue-500 shadow-md text-white text-base cursor-pointer
}

#miniPicture {
    @apply w-12 h-12 rounded-full mx-3 my-3
}

.user-header {
    @apply flex items-center
}

.user-name {
    @apply text-2xl font-bold
}
</style>