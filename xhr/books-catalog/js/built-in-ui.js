/* Данный JS код */

// Регулируем видимость карточки
function toggleCardVisible () {
 document.getElementById('content').classList.toggle('hidden');
 document.getElementById('card').classList.toggle('hidden');
}


document.getElementById('close').addEventListener('click', toggleCardVisible);

document.getElementById('content').addEventListener('click', (event) => {
    let target = null;
    if (event.target.tagName === 'LI') {
        target = event.target;
    }
    if (event.target.parentNode.tagName === 'LI') {
        target = event.target.parentNode;
    }

    if (target) {
      toggleCardVisible();
      document.getElementById('card-title').innerHTML = target.dataset.title;
      document.getElementById('card-author').innerHTML = target.dataset.author;
      document.getElementById('card-info').innerHTML = target.dataset.info;
      document.getElementById('card-price').innerHTML = target.dataset.price;
    }
});

const contentList = document.querySelector('#content');

const request = new XMLHttpRequest();
request.addEventListener("load", onLoad);
request.open("GET",
 "https://neto-api.herokuapp.com/book/",
 true);
request.send();

function onLoad() {
  let firstBook = document.querySelector('li');
  let database = JSON.parse(request.responseText);
  
  contentList.innerHTML = database.reduce(function(firstBook, data) {
    return `${firstBook}<li data-title="${data.title}" data-author="${data.author.name}" data-info="${data.info}" data-price="${data.price}"><img src="${data.cover.small}"> </li>`;
  }, '');
}
