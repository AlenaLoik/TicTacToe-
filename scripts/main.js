'use strict';

const button = document.querySelector('.button');

function startGame() {
  const caption = document.querySelector('caption');
  const table = document.querySelector('table');

  button.addEventListener('click', (e) => {
    setTimeout(() => action(button.textContent), 500);

    function action(buttonContent) {
      if (buttonContent === 'зіграємо') {
        const userName = prompt(`Привіт, будь-ласка, введи своє ім'я...`,
          'невідомий');

        if (userName) {
          caption.textContent += `${userName}`;
          button.style = 'top: 500px';
          table.style = 'visibility: visible';
          button.textContent = 'почати знову';
        };
      }

      if (buttonContent === 'почати знову') {
        const cellList = table.querySelectorAll('td');

        for (const cell of cellList) {
          cell.textContent = '';
        }
      }
    }
  });
}

startGame();

function putingSumbolsOnTable(table) {
  const tbody = table.querySelector('tbody');
  const topCell = table.querySelectorAll('.row__top');
  const middleCell = table.querySelectorAll('.row__middle');
  const buttomCell = table.querySelectorAll('.row__buttom');
  let variable = false;

  tbody.addEventListener('click', (e) => {
    const tableCell = e.target.closest('[data-cell]');

    if (!tableCell) {
      return;
    }

    if (tableCell.textContent) {
      return alert(`В цій клітинці вже хтось проживає,
      знайди собі іншу фбо почни гру з початку`);
    }

    if (variable) {
      variable = false;
      tableCell.textContent = 'o';
      checkedWinner('o');
    } else {
      variable = true;
      tableCell.textContent = 'x';
      checkedWinner('x');
    }

    function checkedWinner(value) {
      if ((value === topCell[0].textContent
        & value === topCell[1].textContent
        & value === topCell[2].textContent)
        || (value === middleCell[0].textContent
          & value === middleCell[1].textContent
          & value === middleCell[2].textContent)
        || (value === buttomCell[0].textContent
          & value === buttomCell[1].textContent
          & value === buttomCell[2].textContent)
        || (value === topCell[0].textContent
          & value === middleCell[0].textContent
          & value === buttomCell[0].textContent)
        || (value === buttomCell[1].textContent
          & value === topCell[1].textContent
          & value === middleCell[1].textContent)
        || (value === buttomCell[2].textContent
          & value === middleCell[2].textContent
          & value === topCell[2].textContent)
        || (value === topCell[0].textContent
          & value === middleCell[1].textContent
          & value === buttomCell[2].textContent)
        || (value === topCell[2].textContent
          & value === middleCell[1].textContent
          & value === buttomCell[0].textContent)) {
        alert(`' ${value.toUpperCase()} ' - ПЕРЕМОГЛИ!`);
      }
    }
  });
}

putingSumbolsOnTable(document.querySelector('table'));
