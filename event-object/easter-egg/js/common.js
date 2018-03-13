'use strict';

const menu = document.getElementsByTagName('nav')[0];
const secret = document.getElementsByClassName('secret')[0];
const keyCode = "KeyYKeyTKeyNKeyJKeyKKeyJKeyUKeyBKeyZ";
let code = '';

function menuOpen(event) {
	if (event.ctrlKey && event.altKey && event.code === 'KeyT') {
		menu.classList.toggle('visible');
	} else {
		return;
	}
}

function surprise(event) {
  code += event.code;
  code = code.substr(-keyCode.length);
  console.log(code);
  if (code === keyCode) {
    secret.classList.add('visible');
  }
}

document.addEventListener('keydown', menuOpen);
document.addEventListener('keypress', surprise);
