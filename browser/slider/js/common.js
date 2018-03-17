'use strict';

const img = document.getElementById('slider');
const images = ['./i/airmax.png', './i/airmax-jump.png', './i/airmax-on-foot.png', './i/airmax-playground.png', './i/airmax-top-view.png'];

let item = 0;
setInterval(() => {
  img.src = images[item];
	if (item < images.length - 1) {
    item++;
  }
  else {
    item = 0;
  }
}, 5000);
