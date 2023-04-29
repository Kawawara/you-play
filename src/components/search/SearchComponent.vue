<template>
  <div v-for="user in users" :key="user.id" class="card" :id="String(user.id)+'_card'">
    <div class="button-container">
      <p class="swipe-left center-left" :id="String(user.id)+'_swipe-left'">&lt;</p>
      <p class="swipe-right center-right" :id="String(user.id)+'_swipe-right'">&gt;</p>
    </div>
    <div class="svg-container detaille">
      <router-link :to="{name:'searchDetaille'}"><IconHome /></router-link>
    </div>
    <div class="card-info">
      <h2 class="no-padding-margin">{{user.name}}, {{user.age}}</h2>
      <div class="card-container">
        <div :id="String(user.id)+'_card-one'">
          <div class="svg-container">
            <IconHome />
          <span class="svg-text"> En ligne</span>
          </div>
          <div class="svg-container">
            <IconHome />
          <span class="svg-text"> Vit ici : {{user.city}}</span>
          </div>
          <div class="svg-container">
            <IconHome />
          <span class="svg-text"> à 1 km</span>
          </div>
        </div>
        <div :id="String(user.id)+'_card-two'">
          <p id="bio">Bonjour, je suis ici à la recherche de partenaires pour jouer aux jeux vidéos, tels que Phasmophobia, World of Warcraft (healer lvl 97), Among Us, Valorant, etc...
            J'habite à strasbourg et je cherche des partenaires de sport avec qui pratiquer du Badminton et du Kayak.
            De façon générale j'aime beaucoup les activités de plein air et je suis ouverte à la découverte de vos activitées pour partager une part de votre soleil !</p>
        </div>
        <div :id="String(user.id)+'_card-three'">
          <div class="interests">
            <ul>
              <li>Techno</li>
              <li>Rap</li>
              <li>Pop</li>
              <li>Latino</li>
              <li>Jazz</li>
            </ul>
          </div>
        </div>
        <div :id="String(user.id)+'_card-four'">
          <div class="interests">
            <ul>
              <li>Harry Potter</li>
              <li>Back to the Future</li>
              <li>Spider-Man</li>
            </ul>
          </div>
        </div>
        <div :id="String(user.id)+'_card-five'">
          <div class="interests">
            <ul>
              <li>R6S</li>
              <li>FIFA</li>
              <li>Super Mario</li>
              <li>Poker</li>
            </ul>
          </div>
        </div>
        <div :id="String(user.id)+'_card-six'">
          <div class="interests">
            <ul>
              <li>Français</li>
              <li>Franglais</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.svg-container svg,
.svg-container .svg-text {
  display: inline-block;
  vertical-align: middle;
}

.detaille{
    position: relative;
    top: 40%;
    right: -90%;
}

.no-padding-margin{
    padding: 0%;
    margin: 0%;
}

.card {
    position: relative;
    height: 400px;
    width: 300px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    font-family: 'Prosto One', sans-serif;
}

.card-info {
    font-size: 11px;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    width: 100%;
    height: 35%;
}

.card-info h2 {
    margin: 0;
    font-size: 1.5rem;
}

.card-info p {
    margin: 0;
}

.interests {
    padding: 10px;
}

.interests ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;
}

.interests li {
    border: 1px solid white;
    border-radius: 20px;
    color: white;
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 5px 10px;
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
    top: 150%;
    right: -90%;
}

.center-left{
    position: relative;
    text-align: center;
    top: 200%;
}

#bio {
    overflow: hidden;
    max-width: 30ch;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>

<script setup lang="ts">
import Vue from 'vue';
import { IconHome } from '@/components'
const photos: string[] = ['photo_1.jpg',  'photo_2.jpg',  'photo_3.jpg'];

import { ref, onMounted } from "vue";
import { getUsers } from '@/services';

const users = await getUsers();

var position = 0;

onMounted(() => {
  for (const user of users) {
    position++;
    let currentPhotoIndex: number = 0;

    const photoContainer = document.getElementById(String(user.id)+'_card')!;
    const swipeLeftButton = document.getElementById(String(user.id)+'_swipe-left')!;
    const swipeRightButton = document.getElementById(String(user.id)+'_swipe-right')!;

    if(position != 3)
      photoContainer.style.display = "none";

    const cardOne = document.getElementById(String(user.id)+'_card-one');
    const cardTwo = document.getElementById(String(user.id)+'_card-two');
    const cardThree = document.getElementById(String(user.id)+'_card-three');
    const cardFour = document.getElementById(String(user.id)+'_card-four');
    const cardFive = document.getElementById(String(user.id)+'_card-five');
    const cardSix = document.getElementById(String(user.id)+'_card-six');

    if(cardOne && cardTwo && cardThree && cardFour && cardFive && cardSix)
    {
        cardOne.style.display = "none";
        cardTwo.style.display = "none";
        cardThree.style.display = "none";
        cardFour.style.display = "none";
        cardFive.style.display = "none";
        cardSix.style.display = "none";
    }
    

    function displayPhoto(): void {
        photoContainer.style.backgroundImage = `url(${photos[currentPhotoIndex]})`;
    }

    function displayCard(): void {
      switch(currentPhotoIndex) {
        case 0:
                if(cardOne && cardTwo && cardThree && cardFour && cardFive && cardSix)
                {
                    cardOne.style.display = "block";
                    cardTwo.style.display = "none";
                    cardThree.style.display = "none";
                    cardFour.style.display = "none";
                    cardFive.style.display = "none";
                    cardSix.style.display = "none";
                }
                break;
        case 1:
                if(cardOne && cardTwo && cardThree && cardFour && cardFive && cardSix)
                {
                    cardOne.style.display = "none";
                    cardTwo.style.display = "block";
                    cardThree.style.display = "none";
                    cardFour.style.display = "none";
                    cardFive.style.display = "none";
                    cardSix.style.display = "none";
                }
                break;
        case 2:
                if(cardOne && cardTwo && cardThree && cardFour && cardFive && cardSix)
                {
                    cardOne.style.display = "none";
                    cardTwo.style.display = "none";
                    cardThree.style.display = "block";
                    cardFour.style.display = "none";
                    cardFive.style.display = "none";
                    cardSix.style.display = "none";
                }
                break;
        case 3:
                if(cardOne && cardTwo && cardThree && cardFour && cardFive && cardSix)
                {
                    cardOne.style.display = "none";
                    cardTwo.style.display = "none";
                    cardThree.style.display = "none";
                    cardFour.style.display = "block";
                    cardFive.style.display = "none";
                    cardSix.style.display = "none";
                }
                break;
        case 4:
                if(cardOne && cardTwo && cardThree && cardFour && cardFive && cardSix)
                {
                    cardOne.style.display = "none";
                    cardTwo.style.display = "none";
                    cardThree.style.display = "none";
                    cardFour.style.display = "none";
                    cardFive.style.display = "block";
                    cardSix.style.display = "none";
                }
                break;
        default:
                if(cardOne && cardTwo && cardThree && cardFour && cardFive && cardSix)
                {
                    cardOne.style.display = "none";
                    cardTwo.style.display = "none";
                    cardThree.style.display = "none";
                    cardFour.style.display = "none";
                    cardFive.style.display = "none";
                    cardSix.style.display = "block";
                }
                break;
        }
    }

    function swipeLeft(event: MouseEvent) {
      currentPhotoIndex--;
      if (currentPhotoIndex < 0) {
        currentPhotoIndex = photos.length - 1;
      }
      displayPhoto();
      displayCard();
    }

    function swipeRight(event: MouseEvent) {
      currentPhotoIndex++;
      if (currentPhotoIndex > photos.length - 1) {
        currentPhotoIndex = 0;
      }
      displayPhoto();
      displayCard();
    }

    swipeLeftButton.addEventListener('click', swipeLeft);
    swipeRightButton.addEventListener('click', swipeRight);

    displayPhoto();
    displayCard();
  }
});
</script>