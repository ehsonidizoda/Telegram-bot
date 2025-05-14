// Проверяем при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Если возраст не подтверждён - показываем гейт
    if(localStorage.getItem('ageVerified') !== 'true') {
        document.getElementById('ageGate').style.display = 'block';
        document.getElementById('mainContent').style.display = 'none';
    } else {
        document.getElementById('ageGate').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    }
});

// Функция подтверждения возраста
function enterSite() {
    localStorage.setItem('ageVerified', 'true');
    document.getElementById('ageGate').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
}

function exitSite() {
    window.location.href = 'https://google.com';
}