'use strict';

const commentsContainer = document.querySelector('.comments');

function el(tagName, attributes, children) {
  const element = document.createElement(tagName);
  if (typeof attributes === 'object') {
    Object.keys(attributes).forEach(i => element
      .setAttribute(i, attributes[i]));
  }
  if (typeof children === 'string') {
    element.textContent = children;
  } else if (children instanceof Array) {
    children.forEach(child => element
      .appendChild(child));
}
  return element;
} 

function createComment(comment) {
  return el('div', {class: 'comment-wrap'}, [
    el('div', {class: 'photo', title: comment.author.name}, [
      el('div', {class: 'avatar', style: `background-image: url(${comment.author.pic})`})
    ]),
    el('div', {class: 'comment-block'}, [
      el('p', {class: 'comment-text', style: 'white-space:pre-line'}, comment.text),
      el('div', {class: 'bottom-comment'}, [
        el('div', {class: 'comment-date'}, comment.date),
        el('ul', {class: 'comment-actions'}, [
          el('li', {class: 'complain'}, 'Пожаловаться'),
          el('li', {class: 'reply'}, 'Ответить')
        ]),  
      ]),
    ]),
  ])
}

function showComments(list) {
  const comments = list.map(createComment);
  const fragment = comments.reduce((fragment, currentValue) => {
    fragment.appendChild(currentValue);
    return fragment;
  }, document.createDocumentFragment());
  commentsContainer.appendChild(fragment);
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
