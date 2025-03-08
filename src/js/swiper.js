import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

const swiper = new Swiper('.swiper-container', {
  loop: true, // Безкінечний цикл
  loopedSlides: 3, // Мінімізує баги при loop
  autoplay: {
    delay: 2000, // Оптимальна швидкість зміни слайдів
    disableOnInteraction: false, // Продовжує рух після взаємодії
    pauseOnMouseEnter: true, // Зупиняється при наведенні мишки
  },
  speed: 3000, // Плавний перехід між слайдами
  slidesPerView: 1, // По замовчуванню 1 слайд
  spaceBetween: 10,
  centeredSlides: true, // Центрування активного слайда (тільки на мобільних)
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  grabCursor: true, // UX-поліпшення (курсор у вигляді руки)
  keyboard: {
    enabled: true,
    onlyInViewport: true, // Працює тільки коли Swiper у вікні перегляду
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
      centeredSlides: true,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
      centeredSlides: false,
    },
    1024: {
      slidesPerView: 'auto',
      spaceBetween: 30,
      centeredSlides: false,
    },
  },
});
