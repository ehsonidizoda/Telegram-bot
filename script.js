// АНИМИРОВАННЫЙ БАННЕР
const slides = document.querySelectorAll('.promo-slide');
let currentSlide = 0;
setInterval(() => {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}, 10000);

// ФИЛЬТР КАНАЛОВ И БОТОВ
function filterChannels(type) {
  document.querySelectorAll('.channel-card').forEach(card => {
    card.style.display = (type === 'all' || card.dataset.type === type) ? 'block' : 'none';
  });
}

// РЕАКЦИИ
document.querySelectorAll(".reaction").forEach(r => {
  const id = r.dataset.id;
  const saved = localStorage.getItem("react-" + id);
  if (saved) r.innerHTML = saved;
  else {
    r.innerHTML = `
      <span data-type="like">❤️ 0</span>
      <span data-type="fire">🔥 0</span>
      <span data-type="dislike">👎 0</span>
    `;
  }

  r.addEventListener("click", e => {
    if (e.target.tagName === "SPAN") {
      e.target.style.transform = "scale(1.5)";
      setTimeout(() => e.target.style.transform = "", 300);
      const parts = e.target.textContent.split(" ");
      let count = parseInt(parts[1] || "0") + 1;
      e.target.textContent = parts[0] + " " + count;
      localStorage.setItem("react-" + id, r.innerHTML);
    }
  });
});

const spinBtn = document.getElementById("spin-btn");
const resultEl = document.getElementById("spin-result");
const COOLDOWN_HOURS = 24;

const prizes = [
  "🔥 Секретный VIP-канал!",
  "❤️ 1 день VIP-доступа",
  "👀 Бесплатный просмотр модели",
  "💥 Промокод на скидку",
  "😔 Сегодня не повезло, попробуй завтра!"
];

function canSpinAgain() {
  const lastSpin = localStorage.getItem("lastSpin");
  if (!lastSpin) return true;

  const elapsed = Date.now() - parseInt(lastSpin);
  return elapsed >= COOLDOWN_HOURS * 60 * 60 * 1000;
}

function updateCountdown() {
  const timerEl = document.getElementById('next-spin-timer');
  const lastSpin = localStorage.getItem('lastSpin');
  if (!lastSpin) {
    timerEl.textContent = "";
    return;
  }

  const nextSpinTime = new Date(parseInt(lastSpin) + COOLDOWN_HOURS * 60 * 60 * 1000);
  const now = new Date();
  const remaining = nextSpinTime - now;

  if (remaining <= 0) {
    timerEl.textContent = "Ты можешь крутить снова!";
    spinBtn.disabled = false;
    spinBtn.textContent = "Крутить!";
  } else {
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
    timerEl.textContent = `Следующая попытка через: ${hours}ч ${minutes}м ${seconds}с`;
    spinBtn.disabled = true;
    spinBtn.textContent = "Подожди...";
  }
}

function handleSpin() {
  const prize = prizes[Math.floor(Math.random() * prizes.length)];
  resultEl.innerHTML = `<div style="margin-top:10px; font-size:1.2em;">${prize}</div>`;
  localStorage.setItem("lastSpin", Date.now());
  updateCountdown();
}

document.addEventListener("DOMContentLoaded", () => {
  updateCountdown();
  setInterval(updateCountdown, 1000);
  spinBtn.addEventListener("click", handleSpin);
  if (canSpinAgain()) {
    spinBtn.disabled = false;
    spinBtn.textContent = "Крутить!";
  } else {
    spinBtn.disabled = true;
    spinBtn.textContent = "Подожди...";
  }
});

.adult-card {
  background: linear-gradient(145deg, #2c001f, #000000);
  border: 2px solid #ff2f8b;
  box-shadow: 0 0 20px #ff2f8b99;
  border-radius: 16px;
  padding: 18px;
  margin: 20px auto;
  animation: pulseAdult 3s infinite ease-in-out;
}

.adult-card h3 {
  font-size: 1.2em;
  color: #ff69b4;
  text-shadow: 0 0 8px #ff2f8b;
}

.adult-card .link-button {
  background: #e42072;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  padding: 10px 18px;
  margin-top: 10px;
  text-decoration: none;
  box-shadow: 0 0 12px #ff2f8b;
  transition: transform 0.3s;
}

.adult-card .link-button:hover {
  transform: scale(1.05);
  background: #ff2f8b;
}

@keyframes pulseAdult {
  0%, 100% { box-shadow: 0 0 12px #ff2f8b80; }
  50% { box-shadow: 0 0 25px #ff2f8b; }
}

.cards-container {
  max-width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
}