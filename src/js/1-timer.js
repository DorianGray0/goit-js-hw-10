import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const myInput = document.querySelector('#datetime-picker');
const myBtn = document.querySelector('.js-btn');

const elements = {
  days: document.querySelector('.js-days'),
  hours: document.querySelector('.js-hours'),
  minutes: document.querySelector('.js-minutes'),
  seconds: document.querySelector('.js-seconds'),
};

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    userSelectedDate = selectedDates[0];

    if (userSelectedDate <= currentDate) {
      myBtn.disabled = true;
      window.alert('Please choose a date in the future');
      elements.days.textContent = '00';
      elements.hours.textContent = '00';
      elements.minutes.textContent = '00';
      elements.seconds.textContent = '00';
    } else {
      myBtn.disabled = false;
    }
  },
};

const fp = flatpickr(myInput, options); // flatpickr

myBtn.addEventListener('click', handlerReverseCount);

function handlerReverseCount() {
  myInput.disabled = true;
  myBtn.disabled = true;

  setInterval(() => {
    const currentDate = new Date();
    const restTime = userSelectedDate - currentDate;
    if (restTime <= 0) {
      myInput.disabled = false;
      return;
    }
    // localStorage.setItem('test', JSON.stringify(convertMs(restTime)));

    const time = convertMs(restTime);
    updateTimerDisplay(time);
  }, 1000);

  // return convertMs(restTime);
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  elements.days.textContent = addLeadingZero(days);
  elements.hours.textContent = addLeadingZero(hours);
  elements.minutes.textContent = addLeadingZero(minutes);
  elements.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
