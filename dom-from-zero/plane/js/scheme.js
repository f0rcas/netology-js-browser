'use strict'

let acSelect = document.querySelector('#acSelect'),
    btnSeatMap = document.querySelector('#btnSeatMap'),
    seatMapDiv = document.querySelector('#seatMapDiv'),
    seatMapTitle = document.querySelector('#seatMapTitle'),
    btnSetFull = document.querySelector('#btnSetFull'),
    btnSetEmpty = document.querySelector('#btnSetEmpty'),
    totalPax = document.querySelector('#totalPax'),
    totalAdult = document.querySelector('#totalAdult'),
    totalHalf = document.querySelector('#totalHalf'),
    objAirplane;

btnSetFull.disabled = true;
btnSetEmpty.disabled = true;

acSelect.addEventListener('change', airplane);
btnSeatMap.addEventListener('click', airplaneScheme);

function airplaneScheme(e) {
  e.preventDefault()
  
  totalPax.textContent = 0;
  totalAdult.textContent = 0;
  totalHalf.textContent = 0;
  
  btnSetFull.disabled = false;
  btnSetEmpty.disabled = false;
  
  while(seatMapDiv.firstChild){
    seatMapDiv.removeChild(seatMapDiv.firstChild);
  }
  
  objAirplane.scheme.forEach(function (item, index) {
    if (item === 6) {
      seatMapDiv.appendChild(createAirplaneSixNode(index));
    } else if (item === 4) {
      seatMapDiv.appendChild(createAirplaneFourNode(index));
    } else {
      seatMapDiv.appendChild(createAirplaneZeroNode(index));
    }
  })
  
  btnSetFull.addEventListener('click', occupiedPlace);
  btnSetEmpty.addEventListener('click', clear);
  
  let seatAll = document.querySelectorAll('.seat');
  
  Array.from(seatAll).forEach(function (item) {
    item.addEventListener('mousedown', choosePlace);
  })
}

function request(value) {
  let xhr = new XMLHttpRequest();
  
  xhr.open(
    "GET",
    `https://neto-api.herokuapp.com/plane/${value}`,
    false
  );
  xhr.send();
  
  let data = JSON.parse(xhr.responseText);
  
  return data;
}

function airplane(event) {
  switch(event.target.value) {
  case "a319": 
    objAirplane = request("a319");
    break;
  case "a320":
    objAirplane = request("a320");
    break;
  case "a320x":
    objAirplane = request("a320x");
    break;
  default:
    objAirplane = request("a321");
  }
  
  seatMapTitle.textContent = `${objAirplane.title} (${objAirplane.passengers} пассажиров)`
}

function el(tagName, attributes, children) {
  const element = document.createElement(tagName);
  if (typeof attributes === 'object') {
    Object.keys(attributes).forEach(i => element.setAttribute(i, attributes[i]));
  }
  if (typeof children === 'string') {
    element.textContent = children;
  } else if (children instanceof Array) {
    children.forEach(child => element.appendChild(child));
  }
  return element;
}

function createAirplaneSixNode(index) {
  return el('div', {class: 'row seating-row text-center'}, [
    el('div', {class: 'col-xs-1 row-number'}, [
      el('h2', {class: ''}, (index + 1 + ''))
    ]),
    el('div', {class: 'col-xs-5'}, [
      el('div', {class: 'col-xs-4 seat'}, [
        el('span', {class: 'seat-label'}, objAirplane.letters6[0])
      ]),
      el('div', {class: 'col-xs-4 seat'}, [
        el('span', {class: 'seat-label'}, objAirplane.letters6[1])
      ]),
      el('div', {class: 'col-xs-4 seat'}, [
        el('span', {class: 'seat-label'}, objAirplane.letters6[2])
      ])
    ]),
    el('div', {class: 'col-xs-5'}, [
      el('div', {class: 'col-xs-4 seat'}, [
        el('span', {class: 'seat-label'}, objAirplane.letters6[3])
      ]),
      el('div', {class: 'col-xs-4 seat'}, [
        el('span', {class: 'seat-label'}, objAirplane.letters6[4])
      ]),
      el('div', {class: 'col-xs-4 seat'}, [
        el('span', {class: 'seat-label'}, objAirplane.letters6[5])
      ])
    ])
  ]);
}

function createAirplaneFourNode(index) {
  return el('div', {class: 'row seating-row text-center'}, [
    el('div', {class: 'col-xs-1 row-number'}, [
      el('h2', {class: ''}, (index + 1 + ''))
    ]),
    el('div', {class: 'col-xs-5'}, [
      el('div', {class: 'col-xs-4 seat'}, [
        el('span', {class: 'seat-label'}, objAirplane.letters6[0])
      ]),
      el('div', {class: 'col-xs-4 seat'}, [
        el('span', {class: 'seat-label'}, objAirplane.letters6[1])
      ]),
      el('div', {class: 'col-xs-4 no-seat'}),
    ]),
    el('div', {class: 'col-xs-5'}, [
      el('div', {class: 'col-xs-4 no-seat'}),
      el('div', {class: 'col-xs-4 seat'}, [
        el('span', {class: 'seat-label'}, objAirplane.letters6[2])
      ]),
      el('div', {class: 'col-xs-4 seat'}, [
        el('span', {class: 'seat-label'}, objAirplane.letters6[3])
      ])
    ])
  ]);
}

function createAirplaneZeroNode(index) {
  return el('div', {class: 'row seating-row text-center'}, [
    el('div', {class: 'col-xs-1 row-number'}, [
      el('h2', {class: ''}, (index + 1 + ''))
    ]),
    el('div', {class: 'col-xs-5'}),
    el('div', {class: 'col-xs-5'})
  ]);
}

function occupiedPlace(e) {
   e.preventDefault();
  
  let seat = document.querySelectorAll('.seat');
  
  Array.from(seat).forEach(function (item) {
    item.classList.add('adult');
  })
  
  totalPax.textContent = objAirplane.passengers;
  totalAdult.textContent = objAirplane.passengers;
  totalHalf.textContent = 0;
  
}

function clear(e) {
  e.preventDefault();
  
  let seat = document.querySelectorAll('.seat');
  
  Array.from(seat).forEach(function (item) {
    if (item.classList.contains('adult')) {
      item.classList.remove('adult');
    }
    if (item.classList.contains('half')) {
      item.classList.remove('half');
    }
  })
  
  totalPax.textContent = 0;
  totalAdult.textContent = 0;
  totalHalf.textContent = 0;
}

function choosePlace(e) {
  if (this.classList.contains('adult')) {
    this.classList.remove('adult');
    totalAdult.textContent--;
    totalPax.textContent--; 
  } else if (this.classList.contains('half')) {
    this.classList.remove('half');  
    totalPax.textContent--;
    totalHalf.textContent--;
  } else {
   if (e.altKey) {
     this.classList.add('half');
     totalPax.textContent++;
     totalHalf.textContent++;
   } else{
     this.classList.add('adult');
     totalAdult.textContent++;
     totalPax.textContent++;
   }
  }
}
