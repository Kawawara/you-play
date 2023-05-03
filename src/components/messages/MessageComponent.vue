<script setup lang="ts">
import { getMessage, useAuth } from '@/services';
import { useRoute } from 'vue-router';
import { getConv } from '@/services';

const route = useRoute();
const convId = Number(route.params.id);

const {user} = await useAuth();
const mess = await getMessage(convId);

var secondUserName = '';
var secondUserPhoto = '';

const convs = await getConv(user.value.id);
for (const conv of convs) {
    if(conv.id == convId){
        secondUserName = conv.secondUserName;
        secondUserPhoto = conv.secondUserPhoto;
        break;
    }
}
// TODO sort mess created_at

const submit = async () => {
    // envoyer message au back
};

</script>

<template>
    <div class="container">
		<h1><img id="miniPicture" :src="secondUserPhoto"/> {{ secondUserName }}</h1>
		<div class="messages">
			<div v-for="mes in mess" :key="mes.id" :class="{ 'received': mes.idUser === user.value.id, 'sent': mes.idUser !== user.value.id }">
				<p>{{ mes.content }}</p>
			</div>
		</div>
		<form class="form" @submit.prevent="submit">
			<input type="text" placeholder="Type a message...">
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
    align-self: flex-end;
    background-color: #218AFF;
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
    background-size: cover;
    background-position: center;
}
</style>