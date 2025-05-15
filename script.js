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