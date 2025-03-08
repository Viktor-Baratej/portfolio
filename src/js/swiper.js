import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

const swiper = new Swiper('.swiper-container', {
  loop: true, // Безкінечний цикл
  autoplay: {
    delay: 0, // Мінімальна затримка (0 блокує стрілки)
    disableOnInteraction: false, // Продовжує рух після взаємодії
    pauseOnMouseEnter: true, // Зупиняється при наведенні мишки
    stopOnLastSlide: false, // Продовжує рух без перерв
  },
  speed: 4000, // Плавний перехід між слайдами (3 секунди)
  slidesPerView: 1, // По 1 слайду на мобільних
  spaceBetween: 20, // Відстань між слайдами
  centeredSlides: true, // Центрування активного слайда
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  grabCursor: true, // Курсор "рука"
  keyboard: {
    enabled: true,
    onlyInViewport: true, // Працює тільки якщо Swiper у вікні перегляду
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 15,
      centeredSlides: true, // Центруємо на мобільних
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30, // Більше простору між слайдами на планшеті
      centeredSlides: false, // Вирівнюємо по лівому краю
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 40, // Оптимальне розташування на десктопі
      centeredSlides: false, // Вирівнюємо по лівому краю
    },
  },
});
