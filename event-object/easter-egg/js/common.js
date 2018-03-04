'use strict';

const menu = document.getElementsByTagName('nav')[0];
const secret = document.getElementsByClassName('secret')[0];

function menuOpen(event) {
	if (event.ctrlKey && event.altKey && event.code === 'KeyT') {
		menu.classList.toggle('visible');
	} else {
		return;
	}
}

function surprise(event) {
	if ((event.code === 'KeyY') && (event.code === 'KeyT')) {
		secret.classList.toggle('visible');
	}
}

document.addEventListener('keydown', menuOpen);
document.addEventListener('keypress', surprise);
