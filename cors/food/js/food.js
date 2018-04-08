'use strict';

const pic = document.querySelector('[data-pic]');
const title = document.querySelector('[data-title]');
const ingredients = document.querySelector('[data-ingredients]');
const rating = document.querySelector('[data-rating]');
const star = document.querySelector('[data-star]');
const votes = document.querySelector('[data-votes]');
const consumers = document.querySelector('[data-consumers]');

function fetchJsonp(url) {
  const randomName = `callback${Math.random()}`.replace('.', '');
  const elem = document.createElement("script");
  elem.src = url + `?callback=${randomName}`;
  
  document.head.appendChild(elem);
  
  return new Promise((resolve, reject) => {
    window[randomName] = function (data) {
      resolve(data);  
    }  
  });
}

function loadRecipe(data) {
 
  pic.style.backgroundImage = `url(${data.pic})`;
  title.innerHTML = data.title;
  let allIngredients = data.ingredients.reduce(function (list, next) {
    return `${list}${next},`
  }, '');
  ingredients.innerHTML = allIngredients.slice(0, -1);
}

function loadRating(data) {
  const nonRoundedValue = data.rating;
  rating.innerHTML = Math.round(nonRoundedValue * 100) / 100;
  votes.innerHTML = `${data.votes} оценок`
  // console.log(ratingData);
}

function loadUsersList(data) {
  consumers.innerHTML = data.consumers.reduce(function (list, next) {
    return `${list}<img src=${next.pic} title=${next.name}>`
  }, '') + '(+20)'
  
  console.log(data)
}


fetchJsonp('https://neto-api.herokuapp.com/food/42')
  .then(loadRecipe)

fetchJsonp('https://neto-api.herokuapp.com/food/42/rating')
  .then(loadRating)


fetchJsonp('https://neto-api.herokuapp.com/food/42/consumers')
  .then(loadUsersList)
