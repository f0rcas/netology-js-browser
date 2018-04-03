'use strict'

const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');

const messagesContent = document.querySelector('.chat .messages-content');
messagesContent.style.overflow = 'auto';
const messagesTemplates = document.querySelector('.chat .messages .messages-templates');

const chatStatus = document.querySelector('.chat .chat-status');
const submitButton = document.querySelector('.chat .message-submit');
const messagesStatus = messagesTemplates.querySelector('.message-status');
const messagesUser = messagesTemplates.querySelector('[class="message"]');
const messagesPersonal = messagesTemplates.querySelector('.message-personal');
const messagesLoading = messagesTemplates.querySelector('.loading');

const cloneMessagesStatus = messagesStatus.cloneNode(true);

connection.addEventListener('open', () => {
  chatStatus.innerHTML = chatStatus.dataset.online;
  submitButton.disabled = false;
  cloneMessagesStatus.querySelector('.message-text').innerHTML = 'Пользователь появился в сети';
  messagesContent.append(cloneMessagesStatus);
});

connection.addEventListener('message', event => {
  const cloneMessagesLoading = messagesLoading.cloneNode();
  const cloneMessagesUser = messagesUser.cloneNode(true);
  if (event.data === '...') {
    messagesContent.append(cloneMessagesLoading);
  } else {
    cloneMessagesUser.querySelector('.message-text').innerHTML = event.data;
    const currentTime = new Date();
    cloneMessagesUser.querySelector('.timestamp').innerHTML = `${padZero(currentTime.getHours())}:${padZero(currentTime.getMinutes())}`;
    if (cloneMessagesLoading.parentNode) {
      messagesContent.replaceChild(cloneMessagesUser, cloneMessagesLoading);
    } else {
      messagesContent.append(cloneMessagesUser);
    }
  }  
});

function sendMessage(event) {
  event.preventDefault(); 
  const inputMessage = document.querySelector('.chat .message-input');
  const cloneMessagesPersonal = messagesPersonal.cloneNode(true);
  if (inputMessage !== "") {
    connection.send(inputMessage);
    cloneMessagesPersonal.querySelector('.message-text').innerHTML = inputMessage.value;
    const currentTime = new Date();
    cloneMessagesPersonal.querySelector('.timestamp').innerHTML = `${padZero(currentTime.getHours())}:${padZero(currentTime.getMinutes())}`;
    messagesContent.append(cloneMessagesPersonal);
    gotoBottom(messagesContent);
    inputMessage.value = '';
  }
}

connection.addEventListener('close', event => {
  chatStatus.innerHTML = chatStatus.dataset.offline;
  cloneMessagesStatus.querySelector('.message-text').innerHTML = 'Пользователь не в сети';
  messagesContent.append(cloneMessagesStatus);
});

connection.addEventListener('error', error => {
  console.log(`Произошла ошибка: ${error.data}`);
});

function padZero(time) {
  return time < 10 ? '0' + time : '' + time;
}  

function gotoBottom(element){
   element.scrollTop = element.scrollHeight - element.clientHeight;
}

submitButton.addEventListener('click', sendMessage);
