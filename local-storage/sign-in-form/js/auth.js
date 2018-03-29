'use strict';

const buttons = document.querySelectorAll('.button');

function sendRequest(event) {
  event.preventDefault();
  let form, url, formType, outputForm;
  if (event.target.parentElement.parentElement.classList.contains('sign-in-htm')) {
    form = document.querySelector('.sign-in-htm');
    url = 'https://neto-api.herokuapp.com/signin';
    formType = 'sign-in-htm';
    outputForm = document.querySelector('.sign-in-htm .error-message');
  } else {
    form = document.querySelector('.sign-up-htm');
    url = 'https://neto-api.herokuapp.com/signup';
    formType = 'sign-up-htm';
    outputForm = document.querySelector('.sign-up-htm .error-message');
  }
  const formData = new FormData(form);
  const data = {};
  for (const [k, v] of formData) {
    console.log(k + ': ' + v);
    data[k] = v;
  }
  
  const request = fetch(url, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then((res) => {
      if (200 <= res.status && res.status < 300) {
        res.json().then((content) => {
          if (content.error) {
            outputForm.innerHTML = content.message; 
            return;
          }
          
          if (formType == 'sign-in-htm') {
            outputForm.innerHTML = `Пользователь ${content.name} успешно авторизован`  
          } else {
            outputForm.innerHTML = `Пользователь ${content.name} успешно зарегистрирован`
          }   
        })
        .catch((err) => {
          outputForm.innerHTML = err.message || 'Ошибка JSON-а!';  
        });
      } else {
        outputForm.innerHTML = response.statusText;
      }
      
    })
    .catch((err) => {
      outputForm.innerHTML = err.message || 'Ошибка запроса!';  
    });
}

Array.from(buttons).forEach(button => {
  button.addEventListener('click', sendRequest);
});
