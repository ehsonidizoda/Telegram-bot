require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const csrf = require('csurf');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Генерация секретного ключа для CSRF
const csrfProtection = csrf({ cookie: true });

// Middleware
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Лимитер для защиты от брутфорса
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 5, // 5 попыток
  message: 'Слишком много попыток, попробуйте позже'
});

// Хранилище кодов (в реальном проекте используйте БД)
const accessCodes = new Set([
  crypto.createHash('sha256').update(process.env.DEFAULT_CODE || '18PLUS2023').digest('hex')
]);

// Генерация нового кода
function generateNewCode() {
  const code = crypto.randomBytes(4).toString('hex').toUpperCase();
  const hashedCode = crypto.createHash('sha256').update(code).digest('hex');
  accessCodes.add(hashedCode);
  return code;
}

// Маршруты
app.get('/', csrfProtection, (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/verify', limiter, csrfProtection, (req, res) => {
  const { code } = req.body;
  const hashedCode = crypto.createHash('sha256').update(code).digest('hex');
  
  if (accessCodes.has(hashedCode)) {
    // Успешная верификация
    res.cookie('ageVerified', 'true', { 
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    return res.json({ success: true });
  }
  
  return res.status(403).json({ 
    success: false, 
    error: 'Неверный код доступа' 
  });
});

app.get('/admin/generate-code', (req, res) => {
  // В реальном проекте добавьте аутентификацию!
  const newCode = generateNewCode();
  res.json({ code: newCode });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('path/to/key.pem'),
  cert: fs.readFileSync('path/to/cert.pem')
};

https.createServer(options, app).listen(443);