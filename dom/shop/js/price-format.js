function getPriceFormatted(value) {
  return  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

const addProduct = document.querySelectorAll('.add');
const productsPrices = document.querySelectorAll('p');
const cartCount = document.querySelector('#cart-count');
const totalPrice = document.querySelector('#cart-total-price');

function fillBox() {
  let zeroPrice  = totalPrice.innerHTML;
  totalPrice.innerHTML = +zeroPrice + +this.dataset.price;
  cartCount.innerHTML ++;
}

Array.from(addProduct).forEach(product => {
  product.addEventListener('click', fillBox);
});
