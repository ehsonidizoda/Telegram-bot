<?php
require 'config.php'; // Подключает файл с токеном и chat_id

// Получаем данные из формы
$name     = $_POST['name'] ?? 'не указано';
$telegram = $_POST['telegram'] ?? 'не указано';
$comment  = $_POST['comment'] ?? '-';
$file     = $_FILES['check_file'] ?? null;

// Проверка файла
if (!$file || $file['error'] !== UPLOAD_ERR_OK) {
    exit('<script>alert("❌ Ошибка загрузки файла"); history.back();</script>');
}

// Подпись сообщения
$caption = "💳 Новая заявка на VIP:\n"
         . "👤 Имя: $name\n"
         . "📨 Telegram: $telegram\n"
         . "💬 Комментарий: $comment";

// Подготовка и отправка файла в Telegram
$send_url = "https://api.telegram.org/bot$token/sendDocument";
$post_fields = [
    'chat_id' => $chat_id,
    'caption' => $caption,
    'document' => new CURLFile($file['tmp_name'], $file['type'], $file['name'])
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $send_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
$response = curl_exec($ch);
curl_close($ch);

// Ответ пользователю
if ($response) {
    echo '<script>alert("✅ Чек отправлен! Мы свяжемся с вами."); history.back();</script>';
} else {
    echo '<script>alert("❌ Ошибка при отправке. Проверьте данные."); history.back();</script>';
}
?>