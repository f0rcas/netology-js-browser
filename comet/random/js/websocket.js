'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
const websocketSection = document.querySelector('.websocket');
const websocket = websocketSection.querySelectorAll('div');

const wsContent = Array.from(websocket).map(function(content) {
  return content.innerHTML;
});
let lastWS = 0;

connection.addEventListener('message', event => {
  if (websocket[lastWS].classList.contains('flip-it')) {
      websocket[lastWS].classList.remove('flip-it');
  };
  console.log(event.data, 'ws')
  for (let i = 0; i< wsContent.length-1; i++) {
    if (wsContent[i] === event.data) {
      websocket[i].classList.add('flip-it');
      lastWS = i;
    }
  }
});

connection.addEventListener('close', event => {
  console.log(`код закрытия соединения = ${event.code}`);
});
