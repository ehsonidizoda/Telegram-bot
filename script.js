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