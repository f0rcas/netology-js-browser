'use strict';

function createElement(node) {
    if (typeof node === 'string') {
      return document.createTextNode(node);
    } else if (typeof node === 'object') {
      return el(node.name, node.props ? {'class':node.props.class} : {}, node.childs);
    }
  }
  
  function el(tagName, attributes, children) {
    const element = document.createElement(tagName);
    if (typeof attributes === 'object') {
      Object.keys(attributes).forEach(i => element
        .setAttribute(i, attributes[i]));
    }
    if (typeof children === 'string') {
      element.textContent = children;
    } else if (children instanceof Array) {
      children.forEach((child) => {
        element.appendChild((typeof child === 'string') ? document.createTextNode(child) : createElement(child));
      })
  }
    return element;
  }
