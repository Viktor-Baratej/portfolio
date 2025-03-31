import { translations } from './translations.js';

function changeLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-lang]').forEach(element => {
    const key = element.getAttribute('data-lang');
    const value = translations[lang]?.[key];

    if (!value) return;

    // Для input або textarea оновлюємо placeholder
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.placeholder = value;
      return;
    }

    // Для якорних посилань типу <a href="#about">
    if (element.tagName === 'A' && element.getAttribute('href')?.startsWith('#')) {
      element.textContent = value;
      return;
    }

    // Якщо є іконка — залишаємо її і додаємо тільки переклад
    const icon = element.querySelector('i');
    if (icon) {
      element.innerHTML = ''; // очищаємо весь контент
      element.appendChild(icon); // додаємо іконку назад
      element.append(' ' + value); // додаємо текст перекладу
      return;
    }

    // За замовчуванням — звичайне оновлення тексту
    element.textContent = value;
  });

  // Плавний скрол
  setTimeout(attachSmoothScrolling, 50);

  // Зберігаємо мову
  localStorage.setItem('selectedLanguage', lang);
}

// Функція для плавного скролу
function attachSmoothScrolling() {
  document.querySelectorAll('.nav-menu a[href^="#"]').forEach(anchor => {
    anchor.removeEventListener('click', smoothScrollHandler);
    anchor.addEventListener('click', smoothScrollHandler);
  });
}

function smoothScrollHandler(event) {
  event.preventDefault();
  const targetId = this.getAttribute('href').substring(1);
  const targetElement = document.getElementById(targetId);

  if (targetElement) {
    const headerOffset = document.querySelector('header').offsetHeight;
    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset - 10;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}

// Завантаження сторінки
document.addEventListener('DOMContentLoaded', () => {
  const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
  document.getElementById('languages').value = savedLanguage;
  changeLanguage(savedLanguage);
  setTimeout(attachSmoothScrolling, 100);
});

// Обробник зміни мови
document.getElementById('languages').addEventListener('change', function () {
  changeLanguage(this.value);
});
