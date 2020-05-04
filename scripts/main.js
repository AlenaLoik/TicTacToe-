'use strict';

const button = document.querySelector('.button');
const caption = document.querySelector('caption');
let userName1 = '';
let userName2 = '';

function startGame() {
  const table = document.querySelector('table');

  button.addEventListener('click', (e) => {
    setTimeout(() => action(button.textContent), 500);

    function action(buttonContent) {
      if (buttonContent === 'зіграємо') {
        userName1 = prompt(`Привіт, Гравець 1, ім'я: `,
          'невідомий 1');

        userName2 = prompt(`Гравець 2, ім'я: `,
          'невідомий 2');
        caption.textContent = `Починає гру: ${userName1}`;
        button.style = 'top: 500px';
        table.style = 'visibility: visible';
        button.textContent = 'почати знову';
      }

      if (buttonContent === 'почати знову') {
        const cellList = table.querySelectorAll('td');

        for (const cell of cellList) {
          cell.textContent = '';
        }

        table.removeEventListener('click', listener);
        putingSumbolsOnTable(document.querySelector('table'));
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

  const listener = function(e) {
    const tableCell = e.target.closest('[data-cell]');

    if (!tableCell) {
      return;
    }

    if (tableCell.textContent) {
      return alert(`В цій клітинці вже хтось проживає,
      знайди собі іншу або почни гру з початку`);
    }

    if (variable) {
      variable = false;
      caption.textContent = `Хід: ${userName1}`;
      tableCell.textContent = 'o';
      checkedWinner('o');
    } else {
      variable = true;
      caption.textContent = `Хід: ${userName2}`;
      tableCell.textContent = 'x';
      checkedWinner('x');
    }
  };

  tbody.addEventListener('click', listener);

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
      alert(` ${value.toUpperCase()} ' - ПЕРЕМОГЛИ!`);

      const cellList = table.querySelectorAll('td');

      for (const cell of cellList) {
        cell.textContent = '';
      }
    }
  }
}

putingSumbolsOnTable(document.querySelector('table'));
