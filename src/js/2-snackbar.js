import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  // Formdan değerleri al
  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  // Promise üret
  createPromise(delay, state)
    .then(delay => {
      iziToast.success({
        title: '✅ Yerine getirildi',
        message: ` Yerine getirilen söz ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '❌ Reddedilmiş',
        message: ` Reddedilen söz ${delay}ms`,
        position: 'topRight',
      });
    });
});

// Promise üreteci fonksiyonu
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
