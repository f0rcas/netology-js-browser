'use strict';

const taskList = document.querySelectorAll('input');
const outputText = document.querySelector('output');
const listBlock = document.querySelector('.list-block');
let total = 1;
outputText.value = `${total} из 4`;

function countTask() {
  if (this.checked) {
    total++;
  } else {
    total--;
  }
  
  if (total == 4) {
    listBlock.classList.add('complete');  
  } else {
    listBlock.classList.remove('complete'); 
  }
  outputText.value = `${total} из 4`;
}

Array.from(taskList).forEach(task => {
  task.addEventListener('change', countTask);
});
