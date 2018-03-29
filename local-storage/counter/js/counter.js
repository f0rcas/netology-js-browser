'use strict';

onst value = document.querySelector('#counter');
const buttons = document.querySelectorAll('button');
const buttonIncrement = document.querySelector('#increment');
const buttonDecrement = document.querySelector('#decrement');
const buttonReset = document.querySelector('#reset');

value.innerHTML = localStorage.saveValue || 0;

function alertInfo() {
  if (this == buttonIncrement) {
    value.innerHTML++;  
  } else if (this == buttonDecrement) {
    value.innerHTML--;  
  } else {
    value.innerHTML = 0; 
  }
  localStorage.setItem('saveValue', value.innerHTML);
}

Array.from(buttons).forEach(button => {
  button.addEventListener('click', alertInfo);
});
