'use strict';

const canvas = document.querySelector('#draw');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let thickness = 100;
let thicknessDirection = -1;
let hue = 0;
// let color = 'hsl(' + hue + ',100%,50%)';  

// canvas.addEventListener('mousedown', (e) => {
//   console.log(e.clientX, e.clientY);
// })
function hueChange(e) {
  if (e.shiftKey) {
    if (hue == 0) {
      hue = 359;
    } else {
      hue--;
    }
  } else {
    if (hue == 359) {
      hue = 0;
    } else {
      hue++;
    }
  }
}

function thicknessChange() {
  thickness += thicknessDirection; 
  if (thickness == 0 || thickness == 100) {
    thicknessDirection = -thicknessDirection;
  }
}

window.addEventListener('resize', (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
})
// canvas.addEventListener('click', (e) => {
//   console.log(1)
// })

canvas.addEventListener('mousemove', (e) => {
  if (e.which == 1) {
    ctx.beginPath();
    hueChange(e);
    thicknessChange();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = thickness;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;  
    ctx.moveTo(e.clientX, e.clientY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.closePath();
    ctx.stroke();
  } else {
    console.log(false)
  }
})
