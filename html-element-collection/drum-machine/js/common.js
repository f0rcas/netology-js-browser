'use strict';

const clap = document.getElementsByClassName('key-clap')[0];
const hihat = document.getElementsByClassName('key-hihat')[0];
const kick = document.getElementsByClassName('key-kick')[0];
const openhat = document.getElementsByClassName('key-openhat')[0];
const boom = document.getElementsByClassName('key-boom')[0];
const ride = document.getElementsByClassName('key-ride')[0];
const audioTagClap = document.getElementsByTagName('audio')[0];
const audioTagHihat = document.getElementsByTagName('audio')[1];
const audioTagkick = document.getElementsByTagName('audio')[2];
const audioTagOpenhat = document.getElementsByTagName('audio')[3];
const audioTagBoom = document.getElementsByTagName('audio')[4];
const audioTagRide = document.getElementsByTagName('audio')[5];

clap.onclick = function () {
	audioTagClap.play();
}

hihat.onclick = function () {
	audioTagHihat.play();
}

kick.onclick = function () {
	audioTagkick.play();
}

openhat.onclick = function () {
	audioTagOpenhat.play();
}

boom.onclick = function () {
	audioTagBoom.play();
}

ride.onclick = function () {
	audioTagRide.play();
}
