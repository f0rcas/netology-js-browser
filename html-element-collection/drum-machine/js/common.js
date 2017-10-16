'use strict';

const buttons = document.getElementsByTagName('li');


for (const button of buttons) {
	button.onclick = function () {
		const sound = button.getElementsByTagName('audio')[0];
		sound.play();
	}
}
