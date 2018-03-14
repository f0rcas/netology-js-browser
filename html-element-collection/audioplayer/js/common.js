'use strict';

const player = document.getElementsByClassName('mediaplayer')[0];
const audio = document.getElementsByTagName('audio')[0];
const buttonPlayPause = document.getElementsByClassName('playstate')[0];
const title = document.getElementsByClassName('title')[0];
const buttonStop = document.getElementsByClassName('stop')[0];
const buttonNext = document.getElementsByClassName('next')[0];
const buttonBack = document.getElementsByClassName('back')[0];
const tracks = ['mp3/LA Chill Tour.mp3', 'mp3/LA Fusion Jam.mp3', 'mp3/This is it band.mp3'];
const tracksTitle = ['LA Chill Tour', 'LA Fusion Jam', 'This is it band'];

let item = 0;

buttonPlayPause.onclick = function () {
	player.classList.toggle('play');
	player.classList.contains('play') ? audio.play() :	audio.pause();
}

buttonStop.onclick = function () {
	player.classList.remove('play');
	audio.pause();
	audio.currentTime = 0;
}

buttonNext.onclick = function () {
	if (item < tracks.length - 1) {
		item++;
		title.title = tracksTitle[item];
		audio.src = tracks[item];
  }
  else {
		item = 0;
		title.title = tracksTitle[item];
		audio.src = tracks[item];
	}
}

buttonBack.onclick = function () {
	if (item > 0) {
		item--;
		title.title = tracksTitle[item];
		audio.src = tracks[item];
	}
	else {
		item = tracks.length-1;
		title.title = tracksTitle[item];
		audio.src = tracks[item];
	}
}
