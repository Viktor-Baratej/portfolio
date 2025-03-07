import { translations } from './translations.js';

function changeLanguage(lang) {
  // Оновлюємо атрибут "lang" у <html>, щоб коректно відображалась вибрана мова
  document.documentElement.lang = lang;

  // Отримуємо всі елементи, які мають атрибут data-lang
  document.querySelectorAll('[data-lang]').forEach(element => {
    // Отримуємо значення data-lang, яке відповідає ключу у translations
    const key = element.getAttribute('data-lang');

    // Якщо у перекладах є відповідне значення, оновлюємо текст елемента
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  // Зберігаємо вибрану мову в localStorage, щоб вона залишалась після перезавантаження сторінки
  localStorage.setItem('selectedLanguage', lang);
}

// Додаємо обробник події зміни мови при виборі у <select>
document.getElementById('languages').addEventListener('change', function () {
  // Передаємо вибране значення (this.value) у функцію changeLanguage
  changeLanguage(this.value);
});

// Завантажуємо збережену мову при відкритті сторінки
document.addEventListener('DOMContentLoaded', () => {
  // Отримуємо збережену мову з localStorage або встановлюємо англійську за замовчуванням
  const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';

  // Встановлюємо збережене значення в <select> для відображення вибраної мови
  document.getElementById('languages').value = savedLanguage;

  // Викликаємо функцію зміни мови, щоб оновити текст на сторінці
  changeLanguage(savedLanguage);
});
