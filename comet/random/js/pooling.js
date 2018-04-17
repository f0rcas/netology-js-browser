'use strict';

const poolingSection = document.querySelector('.pooling');
const pooling = poolingSection.querySelectorAll('div');

const poolingContent = Array.from(pooling).map(function(content) {
  return content.innerHTML;
});
let poolingNumber;
let lastP = 0;

function getPoolingRandomNumber() {
  const poolingRequest = new XMLHttpRequest();
  poolingRequest.addEventListener("readystatechange",onReadyStateChange);
  poolingRequest.open("GET",
   "https://neto-api.herokuapp.com/comet/pooling");
  poolingRequest.send();

  function onReadyStateChange() {
    if (poolingRequest.readyState !== 4) { 
      return;
    }
    poolingNumber = (poolingRequest.responseText).replace(/\s/g, "");;
    
    if (pooling[lastP].classList.contains('flip-it')) {
      pooling[lastP].classList.remove('flip-it');
    };
    console.log(poolingNumber, 'polling')
    for (let i = 0; i< poolingContent.length-1; i++) {
      if (poolingContent[i] == poolingNumber.toString()) {
        pooling[i].classList.add('flip-it')
        lastP = i;
      }
    }
  } 
}

setInterval(getPoolingRandomNumber, 10000);
