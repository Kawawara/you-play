<template>
    <div class="container">
		<h1><img id="miniPicture" src="photo_1.jpg"/> Fiona</h1>
		<div class="messages">
			<div class="message">
				<p>Hello!</p>
			</div>
			<div class="message sent">
				<p>Hi, how are you?</p>
			</div>
			<div class="message">
				<p>I'm good, thanks for asking. How about you?</p>
			</div>
			<div class="message sent">
				<p>I'm doing well too, thanks.</p>
			</div>
		</div>
		<form class="form">
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
.message {
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
.message.sent {
    align-self: flex-end;
    background-color: #218AFF;
}
.message p {
    margin: 0;
    padding: 0;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
}
.message.sent p {
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