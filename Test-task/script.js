//Calendar
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
      table = "30";
    } else {
      table = "10";
    }
    return table;
  };

  while (d.getMonth() == mon) {
    table += `<td class="day__mon">${d.getDate()}<br/><button class="btn btn-calendar" >${price()}р.</button></td>`;
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

//Price

const btnCalendar = document.querySelectorAll('.btn-calendar'),
      result = document.querySelector('.total__price'),
      dayMon = document.querySelectorAll('.day__mon'),
      allDay = document.querySelector('.all__day'),
      totalDay = document.createElement('span'),
      btnForm = document.querySelector('.btn-form'),
      modalInputEmail = document.querySelector('.modal__input__email'),
      modalInputName = document.querySelector('.modal__input__name');

let countPrice = 0;

btnCalendar.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    allDay.append(totalDay);
    const dateNext = document.createElement('span');
    let date = e.target.parentNode.textContent;

      if (date.length === 5) {
        dateNext.innerHTML = `${date.slice(0,1)}, `;
      } else {
        dateNext.innerHTML = `${date.slice(0,2)}, `;
      }

    item.classList.toggle('green');

    if(e.target.className === 'btn btn-calendar green') {
      const dateNext = document.createElement('span');
      totalDay.append(dateNext);
      if (e.target.textContent === "10р.") {
        countPrice += 10;
      } else {
        countPrice += 30;
      }
    }else{
      totalDay.remove(dateNext);

      if (e.target.textContent === "10р.") {
        countPrice -= 10;
      } else {
        countPrice -= 30;
      }
    }
    
    // Date booking
    btnForm.addEventListener('click', (event) => {
      console.log(modalInputName.value);
      console.log(modalInputEmail.value);
      if(e.target.className === 'btn btn-calendar green' && modalInputName.value !== "" && modalInputEmail.value !== "") {
        event.preventDefault();
        item.classList.remove('green');
        item.classList.add('block');
        item.setAttribute('disabled', false);
        item.textContent = modalInputName.value;
        countPrice = 0;
        closeModal();
      }
    });

    result.textContent = countPrice;
    totalDay.textContent = dateNext.textContent;
  });
});

// Modal Form
const btnBook = document.querySelector('.btn-book'),
      modalForm = document.querySelector('.modal__form');


function openModal() {
    modalForm.classList.add('show');
    modalForm.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalForm.classList.add('hidden');
    modalForm.classList.remove('show');
    document.body.style.overflow = ''; 
}

btnBook.addEventListener('click', (e) => {
  openModal();
});

modalForm.addEventListener('click', (e) => {
  if (e.target === modalForm || e.target.getAttribute('data-close') == "") {
      closeModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape' && modalForm.classList.contains('show')) {
      closeModal();
  }
});












