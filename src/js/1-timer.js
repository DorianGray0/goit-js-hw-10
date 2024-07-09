import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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
    const currentTime = new Date();
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= currentTime) {
      myBtn.disabled = true;

      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
    } else {
      myBtn.disabled = false;
    }
  },
};

const fp = flatpickr(myInput, options);

myBtn.addEventListener('click', handlerReverseCount);

function handlerReverseCount() {
  myBtn.disabled = true;
  myInput.disabled = true;

  const countTime = setInterval(() => {
    const currentTime = new Date();
    const differenceTime = userSelectedDate - currentTime;

    if (differenceTime <= 0) {
      myInput.disabled = false;
      clearInterval(countTime);
      return;
    }

    const time = convertMs(differenceTime);
    updateTimerDisplay(time);
  }, 1000);
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
