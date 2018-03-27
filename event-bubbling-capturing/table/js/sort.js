'use strict';

function handleTableClick(event) {
    let elem = event.target,
        table = document.querySelector('table');
    
    if (elem.classList.contains('prop__name')) {
      table.setAttribute('data-sort-by', elem.getAttribute('data-prop-name'));
      (elem.getAttribute('data-dir') === '1') ? elem.setAttribute('data-dir', -1) : elem.setAttribute('data-dir', 1);
      sortTable(elem.dataset.propName, elem.dataset.dir);
    }
  }
