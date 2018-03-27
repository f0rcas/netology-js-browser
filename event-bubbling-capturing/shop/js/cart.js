'use strict';

let itemsList = document.querySelector('.items-list');

itemsList.addEventListener('click', append);

function append(event) {
  let btn = event.target,
      item = {
        title: btn.dataset.title,
        price: btn.dataset.price
      };
  
  if (btn.classList.contains('add-to-cart')) {
    event.preventDefault();
    addToCart(item)
  }
}
