'use strict';

const loaderIndicator = document.querySelector('div');
const selectFrom = document.querySelector('#from');
const selectTo = document.querySelector('#to');
const contentWrapper = document.querySelectorAll('#content');
const selectedAmount = document.querySelector('#source');
const answer = document.querySelector('#result');

const request = new XMLHttpRequest();
request.addEventListener("readystatechange",onReadyStateChange);
request.open("GET",
 "https://neto-api.herokuapp.com/currency",
 true);
request.send();

function onReadyStateChange() {
  if (request.readyState !== 4) {
    loaderIndicator.classList.remove('hidden'); 
  } else { 
  loaderIndicator.classList.toggle('hidden'); 
  contentWrapper[0].classList.remove('hidden');
  }
  
  const currencyList = JSON.parse(request.responseText);

  selectFrom.innerHTML = currencyList.reduce(function(list, currency) {
    return `${list}<option id="${from}" label="${currency.code}" value="${currency.value}"><strong> ${currency.title}</strong></option>`;
  }, '');

  selectTo.innerHTML = currencyList.reduce(function(list, currency) {
    return `${list}<option id="${from}" label="${currency.code}" value="${currency.value}"><strong> ${currency.title}</strong></option>`;
  }, ''); 
}

function showHint() {
  let conversion = (selectedAmount.value * selectFrom.value / selectTo.value).toFixed(2)
  answer.value = conversion;
}
   
selectedAmount.addEventListener('input', showHint);
selectFrom.addEventListener('change', showHint);
selectTo.addEventListener('change', showHint);
