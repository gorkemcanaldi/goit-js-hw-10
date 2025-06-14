// 📌 KÜTÜPHANE IMPORTLARI EN ÜSTE KOY
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// 📌 HTML ELEMENTLERİNİ SEÇ
const startBtn = document.querySelector('[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

// 📌 DEĞİŞKENLER
let userSelectedDate = null;
let timerId = null;
startBtn.disabled = true; // Sayfa yüklenince start kapalı

// 📌 FLATPICKR AYARLARI
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.warning({
        title: 'Warning',
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
    }
  },
};

// 📌 FLATPICKR BAŞLAT
flatpickr(dateTimePicker, options);

// 📌 START BUTON OLAYI
startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  dateTimePicker.disabled = true;

  iziToast.success({
    title: 'Başladı!',
    message: 'Zamanlayıcı çalışıyor.',
  });

  timerId = setInterval(() => {
    const now = new Date();
    const diff = userSelectedDate - now;

    if (diff <= 0) {
      clearInterval(timerId);
      updateTimerDisplay(0, 0, 0, 0);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);
    updateTimerDisplay(days, hours, minutes, seconds);
  }, 1000);
});

// 📌 ARAYÜZ GÜNCELLE
function updateTimerDisplay(days, hours, minutes, seconds) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

// 📌 MS HESAPLAMA
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// 📌 0 EKLE
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
