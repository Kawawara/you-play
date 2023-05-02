<script setup lang="ts">
  import { IconHome } from '@/components'
  import { ref, onMounted } from "vue";
  import { getUsers } from '@/services';

  const users = await getUsers();

  var myUser = users[0];
  for (const user of users) {
      if(user.id == 500){ //todo: recuperer l'id depuis le searchcomponent
          myUser = user;
          break;
      }
  }

  onMounted(() => {
    const photos = ['photo_1.jpg',  'photo_2.jpg',  'photo_3.jpg'];

    let currentPhotoIndex = 0;

    const photoContainer = document.getElementById("card-photo")!;
    const swipeLeftButton = document.getElementById("swipe-left")!;
    const swipeRightButton = document.getElementById("swipe-right")!;

    function displayPhoto() {
        photoContainer.style.backgroundImage = `url(${photos[currentPhotoIndex]})`;
    }

    function swipeLeft(event: MouseEvent) {
        currentPhotoIndex--;
        if (currentPhotoIndex < 0) {
          currentPhotoIndex = photos.length - 1;
        }
        displayPhoto();
    }

    function swipeRight(event: MouseEvent) {
        console.log("hey");
        currentPhotoIndex++;
        if (currentPhotoIndex > photos.length - 1) {
            currentPhotoIndex = 0;
        }
        displayPhoto();
    }

    swipeLeftButton.addEventListener('click', swipeLeft);
    swipeRightButton.addEventListener('click', swipeRight);

    displayPhoto();
  });
</script>

<template>
  <div class="card">
    <div class="card-photo" id="card-photo">
      <div class="button-container">
          <p class="swipe-left center-left" id="swipe-left">&lt;</p>
          <p class="swipe-right center-right" id="swipe-right">&gt;</p>
      </div>
      <div class="photo-container">
      </div>
    </div>
    <hr>
    <div class="card-info">
      <h2 class="no-padding-margin">{{myUser.name}}, {{myUser.age}}</h2>
      <div class="svg-container">
        <IconHome />
        <span class="svg-text"> à 1 km</span>
      </div>
      <hr>
      <p class="padding-margin">Bonjour, je suis ici à la recherche de partenaires pour jouer aux jeux vidéos, tels que Phasmophobia, World of Warcraft (healer lvl 97), Among Us, Valorant, etc...
        J'habite à strasbourg et je cherche des partenaires de sport avec qui pratiquer du Badminton et du Kayak.
        De façon générale j'aime beaucoup les activités de plein air et je suis ouverte à la découverte de vos activitées pour partager une part de votre soleil !</p>
        <hr>
        <strong>Location: </strong>{{myUser.city}}
      <div class="interests">
        <h3>Musique</h3>
        <ul>
          <li>Techno</li>
          <li>Rap</li>
          <li>Pop</li>
          <li>Latino</li>
          <li>Jazz</li>
        </ul>
      </div>
      <hr>
      <div class="interests">
        <h3>Films</h3>
        <ul>
          <li>Harry Potter</li>
          <li>Back to the Future</li>
          <li>Spider-Man</li>
        </ul>
      </div>
      <hr>
      <div class="interests">
        <h3>Jeux</h3>
        <ul>
          <li>R6S</li>
          <li>FIFA</li>
          <li>Super Mario</li>
          <li>Poker</li>
        </ul>
      </div>
      <hr>
      <div class="interests">
        <h3>Langues</h3>
        <ul>
          <li>Français</li>
          <li>Franglais</li>
        </ul>
      </div>
    </div>
  </div>
</template>
    
<style scoped>

.no-padding-margin{
    padding: 0%;
    margin: 0%;
}

.svg-container svg,
.svg-container .svg-text {
  display: inline-block;
  vertical-align: middle;
}

.card {
    padding: 10px;
    background-color: #fff;
    position: relative;
    width: 300px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    font-family: 'Prosto One', sans-serif;
    display: flex;
    top: 100%;
}

.card-photo {
    position: relative;
    height: 380px;
    width: 280px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    
}
.card-photo img {
    height: 380px;
    width: 280px;
}

.card-info {
    position: relative;
    bottom: 0;
    left: 0;
    background-color: #fff;
    color: #000;
    width: 100%;
}

.card-info h2 {
    margin: 0;
    font-size: 1.5rem;
}

.card-info p {
    margin: 0;
}

.card-info ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.card-info li {
    margin-bottom: 0.5rem;
}

.interests {
    margin-top: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
}

.interests h3 {
    font-size: 20px;
    font-weight: bold;
    margin: 0 0 10px;
}

.interests ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;
}

.interests li {
    background-color: #eee;
    border-radius: 20px;
    color: #555;
    font-size: 14px;
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 5px 10px;
}

hr {
    height: 1px;
    border: none;
    background-color: #ddd;
    margin: 1rem 0;
}

.swipe-left,
.swipe-right {
    width: 2rem;
    height: 2rem;
    font-size: 1.5rem;
    color: #000;
    cursor: pointer;
}

.center-right{
    position: relative;
    text-align: center;
    top: 150px;
    right: -90%;
}

.center-left{
    position: absolute;
    text-align: center;
    top: 150px;
}

</style>

