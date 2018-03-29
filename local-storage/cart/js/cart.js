'use strict';

const colorList = document.querySelector('#colorSwatch');
const sizeList = document.querySelector('#sizeSwatch');
const basket = document.querySelector('#quick-cart');
const addToCartForm = document.querySelector('#AddToCartForm');

let colorRange, sizeRange, basketState;

const colorRequest = new XMLHttpRequest();
const sizeRequest = new XMLHttpRequest();

colorRequest.addEventListener("readystatechange",onReadyStateChange);
colorRequest.open("GET",
 "https://neto-api.herokuapp.com/cart/colors");
colorRequest.send();

sizeRequest.addEventListener("readystatechange",onReadyStateChange);
sizeRequest.open("GET",
 "https://neto-api.herokuapp.com/cart/sizes");
sizeRequest.send();

function onReadyStateChange() {
  if (colorRequest.readyState !== 4) { 
    return;
  } 
  if (sizeRequest.readyState !== 4) {
    return;
  }
  colorRange = JSON.parse(colorRequest.responseText);
  sizeRange = JSON.parse(sizeRequest.responseText);
  
  colorList.innerHTML = colorRange.reduce(function(list, current) {
    return `${list}<div data-value=${current.type} class="swatch-element color ${current.type} ${(current.isAvailable) ? 'available' : 'soldout'}">
    <div class="tooltip">${current.title}</div>
    <input quickbeam="color" id="swatch-1-${current.type}" type="radio" name="color" value=${current.type} ${(localStorage.color == current.type) ? 'checked' : ''} ${(current.isAvailable) ? '' : 'disabled'}>
    <label for="swatch-1-${current.type}" style="border-color: red;">
      <span style="background-color: ${current.code};"></span>
      <img class="crossed-out"
        src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
    </label>
  </div>`  
 }, '');

  sizeList.innerHTML = sizeRange.reduce(function(list, current) {
    return `${list}<div data-value=${current.type} class="swatch-element plain ${current.type} ${(current.isAvailable) ? 'available' : 'soldout'}">
    <input id="swatch-0-${current.type}" type="radio" name="size" value=${current.type} ${(localStorage.size == current.type) ? 'checked' : ''} ${(current.isAvailable) ? '' : 'disabled'}>
    <label for="swatch-0-${current.type}">
      ${current.title}
      <img class="crossed-out"
        src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
    </label>
  </div>`  
  }, '');
}

loadBasket()

function updateLocalStorage(event) {
  const form = event.currentTarget;
  const formData = new FormData(form);
  localStorage.setItem('color', formData.get('color'));
  localStorage.setItem('size', formData.get('size'));    
}

function addToCart(event){
  event.preventDefault(); 
  const form = event.target;
  const formData = new FormData(form);
  formData.append('productId', form.dataset.productId);

  const request = fetch("https://neto-api.herokuapp.com/cart", {
    body: formData,
    method: 'POST',    
  }) 
    .then((res) => {
      if (200 <= res.status && res.status < 300) {
        res.json().then((content) => {
          if (content.error) {
            alert(content.message); 
            return;
          }
          updateBasket(content);
        })
      }
    })   
}

function removeFromCart(event) {
  if (event.target.classList.contains('remove')) {
    const form = event.target;
    const formData = new FormData();
    formData.append('productId', form.dataset.id);
    const request = fetch("https://neto-api.herokuapp.com/cart/remove", {
    body: formData,
    method: 'POST',    
  }) 
    .then((res) => {
      if (200 <= res.status && res.status < 300) {
        res.json().then((content) => {
          if (content.error) {
            alert(content.message); 
            return;
          }
          updateBasket(content);
        })
      }
    })   
  }   
}

function loadBasket() {
  const basketRequest = new XMLHttpRequest();
  basketRequest.addEventListener("readystatechange",onReadyStateChange);
  basketRequest.open("GET",
   "https://neto-api.herokuapp.com/cart");
  basketRequest.send();
  function onReadyStateChange() {
    if (basketRequest.readyState !== 4) { 
      return;
    } 
    basketState = JSON.parse(basketRequest.responseText);
    updateBasket(basketState)
  }    
}

function updateBasket(content) {
  const sum = content.reduce(function(last, current) {
    return last + current.price * current.quantity;  
  }, 0);
  
  basket.innerHTML = content.reduce(function(list, current) {
    return `${list}<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${current.productId}" style="opacity: 1;">
              <div class="quick-cart-product-wrap">
                <img src=${current.pic} title="Tony Hunfinger T-Shirt New York">
                <span class="s1" style="background-color: #000; opacity: .5">$800.00</span>
                <span class="s2"></span>
              </div>
              <span class="count hide fadeUp" id="quick-cart-product-count-${current.productId}">${current.quantity}</span>
              <span class="quick-cart-product-remove remove" data-id=${current.productId}></span>
            </div>`
  }, '') + 
    `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ${(content.length == 0) ? '' : 'open'}">
            <span>
              <strong class="quick-cart-text">Оформить заказ<br></strong>
              <span id="quick-cart-price">$${sum}</span>
            </span>
            </a>`
}

addToCartForm.addEventListener('submit',addToCart);
addToCartForm.addEventListener('click',updateLocalStorage);
basket.addEventListener('click', removeFromCart);
