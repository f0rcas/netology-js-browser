'use strinct';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');
connection.addEventListener('open', () => {
  console.log('Вебсокет-соединение открыто');
  showBubbles(connection);
});

function callShowBubbles(event) {
  let coords = {};
  coords.x = event.clientX;
  coords.y = event.clientY;
  connection.send(JSON.stringify(coords)); 
}
document.addEventListener('click', callShowBubbles);
