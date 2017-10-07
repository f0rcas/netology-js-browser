'use strict';

const menu = document.getElementsByClassName('wrapper-dropdown')[0];

menu.onclick = function () {
	menu.classList.toggle('active');
}
