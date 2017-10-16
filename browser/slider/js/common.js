'use strict';

const img = document.getElementById('slider');
const images = ['./i/airmax.png', './i/airmax-jump.png', './i/airmax-on-foot.png', './i/airmax-playground.png', './i/airmax-top-view.png'];

let item = 0;
img.src = images[item];
setInterval(() => {
	if (item < images.length - 1) {
    item++;
    img.src = images[item];
  }
  else {
    item = 0;
    img.src = images[item];
  }
}, 5000);
