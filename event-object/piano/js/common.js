'use strict';

const soundLower = ['../sounds/lower/first.mp3', '../sounds/lower/second.mp3', '../sounds/lower/third.mp3', '../sounds/lower/fourth.mp3', '../sounds/lower/fifth.mp3'];
const soundMiddle = ['../sounds/middle/first.mp3', '../sounds/middle/second.mp3', '../sounds/middle/third.mp3', '../sounds/middle/fourth.mp3', '../sounds/middle/fifth.mp3'];
const soundHigher = ['../sounds/higher/first.mp3', '../sounds/higher/second.mp3', '../sounds/higher/third.mp3', '../sounds/higher/fourth.mp3', '../sounds/higher/fifth.mp3'];

const url = './sounds/'; 
const slash = '/';
const keySounds = [
  'first.mp3',
  'second.mp3',
  'third.mp3',
  'fourth.mp3',
  'fifth.mp3'
];

const set = document.getElementsByClassName('set')[0];
const keys = document.getElementsByTagName('li');
let count = 0;
let octave = 'middle';
let path = url + octave + slash;

for (let key of keys) {
  key.addEventListener('click', playSound);
	const sound = key.getElementsByTagName('audio')[0];
	sound.src = keySounds[count];
  count++;
}

function playSound() {
  const sound = this.getElementsByTagName('audio')[0];
	sound.src = path + sound.getAttribute('src');
  sound.play();
}

function setOctave(event) {
  if (set.classList.contains(octave)) {
    set.classList.remove(octave);
    if ((event.key == 'Alt' || event.key == 'Shift') && event.type == 'keyup') {
    octave = 'middle';
    } 
    else if (event.altKey) {
      octave = 'higher';
    }
    else if (event.shiftKey) {
      octave = 'lower';
    }
  }
  path = url + octave + slash;
  set.classList.add(octave);
}

document.addEventListener('keydown', setOctave);
document.addEventListener('keyup', setOctave);