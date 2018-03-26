'use strict';

const articles = tabs.querySelector('.tabs-content').children;
const titlesContainer = document.querySelector('ul');

for (let i = 0; i < articles.length; i++) {
  let cloneTab = titlesContainer.firstElementChild.cloneNode(true);
  cloneTab.firstElementChild.innerHTML = articles[i].dataset.tabTitle;
  cloneTab.firstElementChild.classList.add(articles[i].dataset.tabIcon);
  titlesContainer.appendChild(cloneTab);  
}  

const liElems = document.querySelectorAll('li');
liElems[0].parentNode.removeChild(liElems[0]);
const allTabs = document.querySelector('ul').children;

hideAll();
firstView();

function changeMainView() {
  hideAll();
  
  let indexForShow = Array.from(allTabs).indexOf(this);
  allTabs[indexForShow].classList.add('ui-tabs-active');
  articles[indexForShow].classList.remove('hidden');
}

function hideAll() {
  for (let i = 0; i < articles.length; i++) {
    articles[i].classList.add('hidden');
  } 
 
  for (let i = 0; i < allTabs.length; i++) {
    allTabs[i].classList.remove('ui-tabs-active');
  }
}

function firstView() {
  articles[0].classList.remove('hidden');
  allTabs[0].classList.add('ui-tabs-active');
}

Array.from(allTabs).forEach(elem => {
  elem.addEventListener('click', changeMainView);
});
