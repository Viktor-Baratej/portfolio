const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Перевіряємо, яка тема була збережена в localStorage
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'light') {
  body.classList.remove('dark-theme');
  themeIcon.textContent = '🌙'; // Іконка для перемикання на темну тему
} else {
  body.classList.add('dark-theme');
  themeIcon.textContent = '☀️'; // Іконка для перемикання на світлу тему
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-theme');

  if (body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
    themeIcon.textContent = '☀️';
  } else {
    localStorage.setItem('theme', 'light');
    themeIcon.textContent = '🌙';
  }
});
