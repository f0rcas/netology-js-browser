'use strict';

const name = document.querySelector('[data-name]');
const description = document.querySelector('[data-description]');
const pic = document.querySelector('[data-pic]');
const position = document.querySelector('[data-position]');
const technologies = document.querySelector('[data-technologies]');
const content = document.querySelector('.content');
const urlForTechnologies = 'https://neto-api.herokuapp.com/profile/:id/technologies';

function fetchJsonp(url) {
  const elem = document.createElement("script");
  elem.src = url;
  document.head.appendChild(elem);
  
  return new Promise((resolve, reject) => {
    window.callback = function (data) {
      resolve(data);  
    }  
  });
}


function loadProfile(data) {
  name.innerHTML = data.name;
  description.innerHTML = data.description;
  pic.src = data.pic;
  position.innerHTML = data.position;
  technologies.innetHTML = data.technologies;
  const newUrl = urlForTechnologies.replace(':id', `${data.id}`);
  fetchJsonp(newUrl)
    .then(loadTechnologies)
}

function loadTechnologies(data) {
  console.log(data)
  technologies.innerHTML = data.reduce(function(list, more) {
  return `${list}<span class="devicons devicons-${more}"></span>`;
}, '');
  console.log(technologies);
  content.style.display = 'initial';
}

fetchJsonp('https://neto-api.herokuapp.com/profile/me')
  .then(loadProfile)
