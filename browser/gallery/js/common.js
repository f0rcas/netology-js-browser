'use strict';

const img = document.getElementById('currentPhoto');
const prevPhoto = document.getElementById('prevPhoto');
const nextPhoto = document.getElementById('nextPhoto');
const images = ['./i/breuer-building.jpg', './i/guggenheim-museum.jpg', './i/headquarters.jpg', './i/IAC.jpg', './i/new-museum.jpg'];

let item = -1;

img.src = images[item];

nextPhoto.onclick = function() {
  if (item < images.length - 1) {
    item++;
    
  }
  else {
    item = 0;

  }
}

prevPhoto.onclick = function() {
if (item > 0) {
  item--;

}  else {
    item = images.length-1;

  }
}