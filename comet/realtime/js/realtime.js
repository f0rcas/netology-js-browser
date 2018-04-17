'use strict';

const ctx = document.getElementById('chart').getContext('2d');
const realtime = new Chart(ctx).Bar({
  labels: [],
  datasets: [{
    fillColor: 'rgba(0,60,100,1)',
    strokeColor: 'black',
    data: []
  }]
}, {
  responsive: true,
  barValueSpacing: 2
});

let isFirst = true;
const ws = new WebSocket('wss://neto-api.herokuapp.com/realtime');
ws.addEventListener('message', event => {
  // console.log(event.data);
  const receivedData = JSON.parse(event.data);
  // console.log(isFirst)
  if (isFirst) {
    receivedData.forEach(data => realtime.addData([data.online], data.time));
    isFirst = false;
  } else {
    realtime.removeData();
    realtime.addData([receivedData.online], receivedData.time);
  }
});
