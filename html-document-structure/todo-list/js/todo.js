'use strict';

const undoneList = document.querySelector('.undone');
const doneList = document.querySelector('.done');
const taskList = document.querySelectorAll('input');

function changeList() {
let checkedTask = this.parentNode;

  if (this.checked) {
    doneList.appendChild(undoneList.removeChild(checkedTask));
  } else {
    undoneList.appendChild(doneList.removeChild(checkedTask));
  }
}

Array.from(taskList).forEach(task => {
  task.addEventListener('click', changeList);
});
