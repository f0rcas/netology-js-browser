'use strict';

const img = document.getElementById('currentPhoto');
const prevPhoto = document.getElementById('prevPhoto');
const nextPhoto = document.getElementById('nextPhoto');
const images = ['./i/breuer-building.jpg', './i/guggenheim-museum.jpg', './i/headquarters.jpg', './i/IAC.jpg', './i/new-museum.jpg'];

let item = -1;

nextPhoto.onclick = function() {
//  img.src = images[item];
  if (item < images.length - 1) {
    item++;
    img.src = images[item];
  } else {
    item = 0;
    img.src = images[item];
  }
}

prevPhoto.onclick = function() {
//  img.src = images[item];
  if (item > 0) {
  item--;
  img.src = images[item];
  } else {
    item = images.length-1;
    img.src = images[item];
  }
}
