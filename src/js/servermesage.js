document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contactForm');
  const textarea = document.getElementById('text');

  // Очистка плейсхолдера після завантаження сторінки
  if (textarea.value.trim() === 'Enter your message') {
    textarea.value = '';
  }

  // Події для приховування плейсхолдера при введенні
  textarea.addEventListener('focus', () => {
    textarea.placeholder = ''; // Плейсхолдер зникає при фокусі
  });

  textarea.addEventListener('blur', () => {
    if (!textarea.value.trim()) {
      textarea.placeholder = 'Enter your message'; // Якщо поле порожнє, повертаємо плейсхолдер
    }
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const { name, email, message } = getFormValues();
    if (!validateForm(name, email, message)) return;

    try {
      await sendFormData({ name, email, message });
      form.reset();
      textarea.placeholder = 'Enter your message'; // Повертаємо плейсхолдер після очищення
    } catch (error) {
      console.error('❌ Помилка при відправці:', error);
    }
  });
});

/**
 * Отримує значення з полів форми та повертає об'єкт.
 */
function getFormValues() {
  return {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    message: document.getElementById('text').value.trim(),
  };
}

/**
 * Перевіряє, чи всі поля заповнені та чи вони мають правильний формат.
 */
function validateForm(name, email, message) {
  if (!name) {
    showToast('error', 'Помилка', 'Поле "Ім\'я" не може бути порожнім!');
    return false;
  }

  if (name.length < 2) {
    showToast(
      'warning',
      "Некоректне ім'я",
      "Ім'я повинно містити мінімум 2 символи."
    );
    return false;
  }

  if (!email) {
    showToast('error', 'Помилка', 'Поле "Email" не може бути порожнім!');
    return false;
  }

  if (!isValidEmail(email)) {
    showToast(
      'warning',
      'Некоректний email',
      'Введіть коректний email (наприклад, example@mail.com).'
    );
    return false;
  }

  if (!message) {
    showToast('error', 'Помилка', 'Поле "Повідомлення" не може бути порожнім!');
    return false;
  }

  if (message.length < 5) {
    showToast(
      'warning',
      'Некоректне повідомлення',
      'Повідомлення повинно містити мінімум 5 символів.'
    );
    return false;
  }

  return true;
}

/**
 * Перевіряє коректність email через регулярний вираз.
 */
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

/**
 * Відправляє форму на сервер через `fetch` API.
 */
async function sendFormData(formData) {
  const response = await fetch('http://localhost:5000/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const result = await response.text();

  if (response.ok) {
    showToast('success', 'Успішно!', 'Ваше повідомлення відправлено!');
  } else {
    showToast('warning', 'Помилка', `Сервер повернув помилку: ${result}`);
  }
}

/**
 * Універсальна функція для показу iziToast.
 */
function showToast(type, title, message) {
  iziToast[type]({
    title,
    message,
    position: 'topCenter',
    timeout: 3000,
    transitionIn: 'fadeInDown',
    transitionOut: 'fadeOutUp',
    backgroundColor: getToastColor(type),
    progressBar: true,
    drag: false,
    width: '200px',
    titleSize: '13px',
    messageSize: '14px',
    padding: '5px',
  });
}

/**
 * Функція, яка повертає колір залежно від типу повідомлення.
 */
function getToastColor(type) {
  switch (type) {
    case 'success':
      return '#2ecc71';
    case 'error':
      return '#e74c3c';
    case 'warning':
      return '#f1c40f';
    default:
      return '#3498db';
  }
}
