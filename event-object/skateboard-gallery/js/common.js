'use strict';

const hrefs = document.getElementsByTagName('a');
const img = document.getElementsByTagName('img')[0];

for (let href of hrefs) {
  href.addEventListener('click', gallery);
}

function gallery(event) {
	event.preventDefault();
	img.src = this.href;
	const href = document.querySelector('.gallery-current');
	href.classList.remove('gallery-current');
	this.classList.add('gallery-current');
}
