'use strict';

let inputAll = document.querySelectorAll('input'),
    sendBtn = document.querySelector('button[type="submit"]'),
    changeBtn = document.querySelectorAll('button')[1],
    zip = document.querySelector('input[name="zip"]'),
    form = document.querySelector('.contentform'),
    objInfo = {},
    output = document.querySelector('main'),
    outputAll = document.querySelectorAll('output'),
    textarea = document.querySelector('textarea');

let inputArr = Array.from(inputAll);
inputArr.forEach(function (item) {
  item.addEventListener('keyup', sendBtnEnabled);
})

textarea.addEventListener('keyup', sendBtnEnabled);

zip.addEventListener('input', function () {
  if (this.value.search(/[A-zА-яЁё]/) !== -1) {
    this.value = this.value.replace(/[A-zА-яЁё]/g, '');
  }
});

sendBtn.addEventListener('click', function (e) {
  e.preventDefault();
  form.classList.add('hidden');
  output.classList.remove('hidden');
  let outputAllArr = Array.from(outputAll);
  for (let i = 0; i < inputArr.length; i++) {
    objInfo[inputArr[i].name] = inputArr[i].value;
  }
  objInfo['message'] = textarea.value;
  enumerationObj(objInfo, outputAll)
});

changeBtn.addEventListener('click', function (e) {
  enumerationObj(objInfo, inputAll)
  form.classList.remove('hidden');
  output.classList.add('hidden');
})

function enumerationObj(obj, arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let key in obj) {
      if (key === arr[i].id) {
        arr[i].innerHTML = obj[key];
      }
    }
  }
}

function sendBtnEnabled() {
  if (testForm()) {
      sendBtn.disabled = false;
    } else {
      sendBtn.disabled = true;
    }
}

function testForm() {
  if (testInput() && textarea.value) {
    return true;
  } 
  return false;
}

function testInput() {
  for (let item of inputAll) {
    if (item.value.length === 0) {
      return false;
    } 
  }
  return true;
}
