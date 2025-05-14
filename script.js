// Загрузка переводов
async function loadLanguage(lang) {
    const response = await fetch(`lang/${lang}.json`);
    return await response.json();
}

// Смена языка
async function changeLanguage(lang) {
    const translations = await loadLanguage(lang);
    
    // Применяем перевод ко всем элементам с data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translations[key];
    });

    // Для арабской вязи (если нужно)
    if (lang === 'tg') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }
}

// Возрастной гейт
function enterSite() {
    document.getElementById('ageGate').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
    localStorage.setItem('adult', 'true');
}

function exitSite() {
    window.location.href = 'https://google.com';
}

// Проверяем, подтверждал ли пользователь возраст ранее
if (localStorage.getItem('adult') === 'true') {
    enterSite();
}

// По умолчанию загружаем русский
changeLanguage('ru'); 