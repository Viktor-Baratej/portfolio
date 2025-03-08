import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

const swiper = new Swiper('.swiper-container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  loop: true, // Безкінечний цикл
  autoplay: {
    delay: 1000, // Автоматична зміна слайдів кожні 5 секунд
    disableOnInteraction: false, // Не зупиняється після ручного прокручування
  },
  grabCursor: true, // UX-поліпшення (курсор у вигляді руки)
  keyboard: {
    enabled: true,
    onlyInViewport: true, // Працює тільки якщо Swiper у вікні перегляду
  },
  speed: 500, // Плавний перехід між слайдами
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 15,
      centeredSlides: true,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
  },
});
