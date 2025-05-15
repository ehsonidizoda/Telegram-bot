body {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  background: black;
  color: white;
  text-align: center;
  position: relative;
  overflow-x: hidden;
}

body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: 
    url('https://cdn-icons-png.flaticon.com/512/535/535183.png'), 
    url('https://cdn-icons-png.flaticon.com/512/2583/2583434.png');
  background-size: 64px, 48px;
  background-repeat: repeat;
  background-position: 0 0, 120px 120px;
  opacity: 0.03;
  z-index: 0;
  pointer-events: none;
  animation: moveBg 120s linear infinite;
}

@keyframes moveBg {
  0% { background-position: 0 0, 120px 120px; }
  100% { background-position: 1000px 800px, 1100px 900px; }
}

document.addEventListener('DOMContentLoaded', function() {
    const ageGate = document.getElementById('ageGate');
    const mainContent = document.getElementById('mainContent');
    const confirmBtn = document.getElementById('confirmBtn');
    const exitBtn = document.getElementById('exitBtn');

    // Проверяем, подтвержден ли уже возраст
    if (localStorage.getItem('ageVerified') === 'true') {
        ageGate.style.display = 'none';
        mainContent.style.display = 'block';
    }

    // Обработчик кнопки "Да"
    confirmBtn.addEventListener('click', function() {
        localStorage.setItem('ageVerified', 'true');
        ageGate.style.display = 'none';
        mainContent.style.display = 'block';
    });

    // Обработчик кнопки "Нет"
    exitBtn.addEventListener('click', function() {
        localStorage.removeItem('ageVerified');
        window.location.href = 'https://google.com';
    });
});