<script setup lang="ts">
import { getUsers, useAuth } from '@/services';
import { getConv } from '@/services';

const {user} = await useAuth();
const convs = await getConv(user.value.id);

console.log(user.value.id);
console.log(convs);

const users = await getUsers();
console.log(users);

</script>

<template>

    <ul class="conversation-list">
		<router-link :to="{name:'message'}"><li>
		  <img class="avatar" src="photo_1.jpg"/>
		  <div class="conversation-info">
			<h3>Fiona</h3>
			<p><span class="sender-name">You:</span> Hey, how's it going?</p>
			<span class="timestamp">22:30</span>
		  </div>
		</li></router-link>
		<router-link :to="{name:'message'}"><li>
		  <img class="avatar" src="photo_2.jpg"/>
		  <div class="conversation-info">
			<h3>Ciuchino</h3>
			<p><span class="sender-name">Ciuchino:</span> Not bad, thanks for asking.</p>
			<span class="timestamp">17:03</span>
		  </div>
		</li></router-link>
		<router-link :to="{name:'message'}"><li>
		  <img class="avatar" src="photo_3.jpg"/>
		  <div class="conversation-info">
			<h3>Zenzy</h3>
			<p><span class="sender-name">You:</span> What are you up to today?</p>
			<span class="timestamp">10:09</span>
		  </div>
		</li></router-link>
	</ul>	  

    <p>Messages</p>
    <p>{{user.username}}</p>
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