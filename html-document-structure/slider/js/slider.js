'use strict';

let prev = document.querySelector('[data-action="prev"]'),
    next = document.querySelector('[data-action="next"]'),
    first = document.querySelector('[data-action="first"]'),
    last = document.querySelector('[data-action="last"]'),
    slides = document.querySelector('.slides');

slides.firstElementChild.classList.add('slide-current');
first.classList.add('disabled');
prev.classList.add('disabled');

function Slider(container) {
  next.addEventListener('click', event => moveSlide(true));
  prev.addEventListener('click', event => moveSlide(false));
  last.addEventListener('click', event => slideFirst(true));
  first.addEventListener('click', event => slideFirst(false));
  
  function slideFirst(isForward) {
    const currentSlide = container.querySelector('.slide-current');
    const activatedSlide = isForward ? slides.lastElementChild : slides.firstElementChild;
    currentSlide.classList.remove('slide-current');
    activatedSlide.classList.add('slide-current');
    if (activatedSlide === slides.lastElementChild) {
      last.classList.add('disabled');
      next.classList.add('disabled');
      prev.classList.remove('disabled');
      first.classList.remove('disabled');
    } else {
      prev.classList.add('disabled');
      first.classList.add('disabled');
      last.classList.remove('disabled');
      next.classList.remove('disabled');
    }
  }

  function moveSlide(isForward) {
    const currentSlide = container.querySelector('.slide-current');
    const activatedSlide = isForward ? currentSlide.nextElementSibling : currentSlide.previousElementSibling;
	  testSlide(activatedSlide, currentSlide);
  }
  
  function testSlide(activatedSlide, currentSlide) {
    if (activatedSlide === currentSlide.nextElementSibling) {
      if (activatedSlide === slides.lastElementChild) {
        last.classList.add('disabled');
        next.classList.add('disabled');
      }
      if (activatedSlide !== null) {
        currentSlide.classList.remove('slide-current');
        activatedSlide.classList.add('slide-current');
        prev.classList.remove('disabled');
        first.classList.remove('disabled');
      } 
    } else {
      if (activatedSlide === slides.firstElementChild) {
        first.classList.add('disabled');
        prev.classList.add('disabled');
      }
      if (activatedSlide !== null) {
        currentSlide.classList.remove('slide-current');
        activatedSlide.classList.add('slide-current');
        next.classList.remove('disabled');
        last.classList.remove('disabled');
      }
    }
  }
}

const sliders = document.querySelectorAll('.slider');
Array.from(sliders).forEach(item => Slider(item));

