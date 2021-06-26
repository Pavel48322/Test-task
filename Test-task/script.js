//Calendar
// const modal = document.querySelector('.modal');
const elem = document.querySelector('.calendar');

function createCalendar(elem, year, month) {
  
  const mon = month - 1; 
  const d = new Date(year, mon);
  let table = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';

  for (let i = 0; i < getDay(d); i++) {
    table += '<td></td>';
  }

  const price = () => {
    if (getDay(d) == 5 || getDay(d) == 6) {
      table = +"30";
    } else {
      table = +"10";
    }
    return table;
  };

  while (d.getMonth() == mon) {
    table += `<td>${d.getDate()}<br/><button class="btn btn-calendar">${price()}р.</button></td>`;
    if (getDay(d) % 7 == 6) { 
      table += '</tr><tr>';
    }
    d.setDate(d.getDate() + 1);
  }

  if (getDay(d) != 0) {
    for (let i = getDay(d); i < 7; i++) {
      table += '<td></td>';
    }
  }

  table += '</tr></table>';
  elem.innerHTML = table;
}

function getDay(date) {
  let day = date.getDay();
  if (day == 0) {
    day = 7;
  }
  return day - 1;
}

createCalendar(elem, 2021, 9);

//Modal

const btnCalendar = document.querySelectorAll('.btn-calendar');



btnCalendar.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const modal = document.createElement('div');
    modal.innerHTML = '<button>10:00</button><button>12:00</button><button>14:00</button>';
    modal.classList.add("modal");
    modal.classList.add("hidden");
    item.append(modal);
    modal.classList.toggle('hidden'); 

  });
});




