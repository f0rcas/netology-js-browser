'use strict';

const tabs = document.querySelectorAll('nav > a'); // все табы
const preloader = document.getElementById('preloader'); // убирать класс hidden
const content = document.getElementById('content');


function startLoad() {
  preloader.classList.remove('hidden');
}

function endLoad() {
  preloader.classList.add('hidden');
}


const request = new XMLHttpRequest();

request.addEventListener('loadstart', startLoad);
request.addEventListener('loadend', endLoad);
request.addEventListener('load', function() {
  let data = request.responseText;
  content.innerHTML = data;
  });


function email() {
  request.open("GET", tabs[0].href, true);
  request.send();
}

function openTab(event) {
  event.preventDefault();
  if (this.classList.contains('active')) {
    return;
  } else {
    this.classList.add('active');
  }
  for (const tab of tabs) {
    tab.classList.remove('active');
  }
  request.open("GET", this.href, true);
  request.send();
}


for (const tab of tabs) {
  tab.addEventListener('click', openTab);
}

document.addEventListener('DOMContentLoaded', email);
