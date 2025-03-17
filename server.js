import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config(); // Завантажуємо .env

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // Твоя пошта на ukr.net
    pass: process.env.EMAIL_PASS, // Пароль SMTP згенерований у ukr.net
  },
});

app.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send('❌ Усі поля повинні бути заповнені.');
  }

  const mailOptions = {
    from: process.env.EMAIL_USER, // Твоя ukr.net пошта (обов'язково!)
    replyTo: email, // Користувацький email для відповіді
    to: 'Viktor_baratejj@ukr.net', // Куди надсилати повідомлення
    subject: `Нове повідомлення від ${name}`,
    text: `Ім'я: ${name}\nEmail: ${email}\nПовідомлення:\n${message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Лист відправлено: ${info.response}`);
    res.status(200).send('✅ Лист відправлено.');
  } catch (error) {
    console.error('❌ Помилка при відправці:', error);
    res.status(500).send(`❌ Не вдалося відправити лист: ${error.message}`);
  }
});

app.listen(5000, () => {
  console.log('🚀 Сервер працює на порту 5000');
});
