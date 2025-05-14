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