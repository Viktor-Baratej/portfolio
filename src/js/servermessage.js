document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contactForm');

  const textarea = document.getElementById('text');

  // Очистка плейсхолдера при завантаженні
  if (textarea.value.trim() === 'Enter your message') {
    textarea.value = '';
  }

  // Плейсхолдер зникає при фокусі
  textarea.addEventListener('focus', () => {
    textarea.placeholder = '';
  });

  textarea.addEventListener('blur', () => {
    if (!textarea.value.trim()) {
      textarea.placeholder = 'Enter your message';
    }
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const { name, email, message } = getFormValues();
    if (!validateForm(name, email, message)) return;

    try {
      await sendFormViaEmailJS(form); // через EmailJS
      form.reset();
      textarea.placeholder = 'Enter your message';

      showToast('success', ' Успішно', 'Ваше повідомлення відправлено!');
    } catch (error) {
      console.error('❌ EmailJS error:', error);
      showToast('error', 'Помилка', 'Щось пішло не так. Спробуйте пізніше.');
    }
  });
});

// ⬇️ Далі йдуть ті самі допоміжні функції
function getFormValues() {
  return {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    message: document.getElementById('text').value.trim(),
  };
}

function validateForm(name, email, message) {
  if (!name) {
    showToast('error', 'Помилка', 'Поле "Ім\'я" не може бути порожнім!');
    return false;
  }

  if (name.length < 2) {
    showToast('warning', "Ім\'я занадто коротке", "Мінімум 2 символи.");
    return false;
  }
  if (!email) {
    showToast('error', 'Помилка', 'Поле "Email" не може бути порожнім!');
    return false;
  }

  if (!isValidEmail(email)) {
    showToast('warning', 'Email некоректний', 'Формат email невірний.');
    return false;
  }

  if (!message) {
    showToast('error', 'Помилка', 'Поле "Повідомлення" не може бути порожнім!');
    return false;
  }

  if (message.length < 5) {
    showToast('warning', 'Занадто коротке повідомлення', 'Мінімум 5 символів.');
    return false;
  }

  return true;
}

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// ✉️ Відправлення через EmailJS
function sendFormViaEmailJS(form) {
  emailjs.init('tCeQhyVJg_81iAir8'); // PUBLIC KEY
  return emailjs.sendForm('service_d1xxnof', 'template_kdven8c', form);
}

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
    width: '240px',
    titleSize: '13px',
    messageSize: '14px',
    padding: '8px',
  });
}

function getToastColor(type) {
  switch (type) {
    case 'success': return '#2ecc71';
    case 'error': return '#e74c3c';
    case 'warning': return '#f1c40f';
    default: return '#3498db';
  }
}
