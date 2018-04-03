'use strict';

const counter = document.querySelector('.counter');
const errors = document.querySelector('.errors');

const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');

connection.addEventListener('open', () => {
  console.log('Вебсокет-соединение открыто');
});

connection.addEventListener('message', event => {
  let data = JSON.parse(event.data);
  // console.log(data);
  counter.innerHTML = data.connections;
  errors.innerHTML = data.errors
});

connection.addEventListener('error', error => {
  console.log(`Произошла ошибка: ${error.data}`);
});

window.addEventListener('beforeunload', () => {
  connection.close(1000, 'Работа закончена')
});
