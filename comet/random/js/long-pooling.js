'use strict';

const longPoolingSection = document.querySelector('.long-pooling');
const longPooling = longPoolingSection.querySelectorAll('div');

const longPoolingContent = Array.from(longPooling).map(function(content) {
  return content.innerHTML;
});
let longPoolingNumber;
let lastLp = 0;

function getLongPoolingRandomNumber() {
  const longPoolingRequest = new XMLHttpRequest();
  longPoolingRequest.addEventListener("readystatechange",isReadyStateChange);
  longPoolingRequest.open("GET",
   "https://neto-api.herokuapp.com/comet/long-pooling");
  longPoolingRequest.send();

  function isReadyStateChange() {
    if (longPoolingRequest.readyState !== 4) { 
      return;
    }
    longPoolingNumber = (longPoolingRequest.responseText).replace(/\s/g, "");;
    console.log(longPoolingNumber, 'longPolling')
    if (longPooling[lastLp].classList.contains('flip-it')) {
      longPooling[lastLp].classList.remove('flip-it');
    };
    
    for (let i = 0; i< longPoolingContent.length-1; i++) {
      if (longPoolingContent[i] == longPoolingNumber.toString()) {
        longPooling[i].classList.add('flip-it')
        lastLp = i;
      }   
    }
    getLongPoolingRandomNumber();
  } 
}

getLongPoolingRandomNumber()
