'use strict';

const img = document.getElementById('slider');
const images = ['./i/airmax.png', './i/airmax-jump.png', './i/airmax-on-foot.png', './i/airmax-playground.png', './i/airmax-top-view.png'];

let item = 0;

setInterval(() => {
  img.src = images[item];
  item === 4 ? item = 0 : item += 1;
}, 5000);
