'use strict';

const canvas = document.querySelector('#starfield');
const ctx = canvas.getContext('2d');
const colors = ['#ffffff', '#ffe9c4', '#d4fbff'];

function generateNewStarField() {
  ctx.beginPath();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  let numberOfStars = Math.floor(getRandomArbitrary(200, 400));
  for (let i = 0; i < numberOfStars; i++) {
    let index = Math.floor(getRandomArbitrary(0, colors.length - 1));
    let color = colors[index];
    let radius = getRandomArbitrary(0, 1.1);
    // console.log(radius)
    // debugger
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let brightness = (getRandomArbitrary(0.8, 1)).toFixed(1);
    ctx.beginPath();
    ctx.globalAlpha = brightness;
    ctx.fillStyle = color;
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fill();
  }
  ctx.closePath();
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

canvas.addEventListener('click', generateNewStarField);
generateNewStarField()
