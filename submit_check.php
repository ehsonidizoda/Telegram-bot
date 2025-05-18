<?php
// Конфигурация
$token = '7663638497:AAGbujp3Yv9uPc0P5C4FcuOa8RhjkZewd3k';
$chat_id = '7608899588';

// Проверка метода запроса
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die('Method Not Allowed');
}

// Получаем данные из формы
$name = $_POST['name'] ?? 'не указано';
$telegram = $_POST['telegram'] ?? 'не указано';
$comment = $_POST['comment'] ?? '—';

// Проверка обязательных полей
if (empty($name) || empty($telegram)) {
    echo '<script>alert("Пожалуйста, заполните все обязательные поля."); window.history.back();</script>';
    exit;
}

// Проверка файла
if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    echo '<script>alert("Ошибка загрузки файла. Пожалуйста, выберите файл чека."); window.history.back();</script>';
    exit;
}

$file = $_FILES['file'];

// Проверка типа файла
$allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
if (!in_array($file['type'], $allowed_types)) {
    echo '<script>alert("Неподдерживаемый тип файла. Разрешены только изображения и PDF."); window.history.back();</script>';
    exit;
}

// Собираем сообщение
$caption = "💳 Новая заявка на VIP доступ:\n"
         . "👤 Имя: $name\n"
         . "📨 Telegram: $telegram\n"
         . "💬 Комментарий: $comment";

// Готовим файл
$send_url = "https://api.telegram.org/bot$token/sendDocument";

$post_fields = [
    'chat_id' => $chat_id,
    'caption' => $caption,
    'document' => new CURLFile($file['tmp_name'], $file['type'], $file['name'])
];

// Отправка в Telegram
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $send_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // На продакшене лучше true
$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo '<script>alert("Ошибка при отправке: ' . curl_error($ch) . '"); window.history.back();</script>';
    curl_close($ch);
    exit;
}

curl_close($ch);

// Проверка ответа Telegram
$response_data = json_decode($response, true);
if (!$response_data || !$response_data['ok']) {
    echo '<script>alert("Ошибка при отправке в Telegram. Пожалуйста, попробуйте позже."); window.history.back();</script>';
    exit;
}

// Успешная отправка
echo '<script>alert("✅ Чек успешно отправлен! Мы свяжемся с вами в Telegram в ближайшее время."); window.location.href = "vip.html";</script>';
?>