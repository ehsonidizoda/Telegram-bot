<?php
$token = '7663638497:AAGbujp3Yv9uPc0P5C4FcuOa8RhjkZewd3k'; // Замените на свой токен Telegram-бота
$chat_id = '7608899588'; // Замените на ваш chat_id (можно взять у @userinfobot)

// Получаем данные из формы
$name     = $_POST['name'] ?? 'не указано';
$phone    = $_POST['phone'] ?? 'не указано';
$telegram = $_POST['telegram'] ?? 'не указано';
$comment  = $_POST['comment'] ?? '—';
$file     = $_FILES['check_file'];

// Проверка файла
if (!$file || $file['error'] !== UPLOAD_ERR_OK) {
    echo '<script>alert("Ошибка загрузки файла."); window.history.back();</script>';
    exit;
}

// Собираем сообщение
$caption = "💳 Новая заявка на VIP доступ:\n"
         . "👤 Имя: $name\n"
         . "📞 Телефон: $phone\n"
         . "📨 Telegram: $telegram\n"
         . "💬 Комментарий: $comment";

// Готовим файл
$send_url = "https://api.telegram.org/bot$token/sendDocument";

$post_fields = [
  'chat_id'   => $chat_id,
  'caption'   => $caption,
  'document'  => new CURLFile($file['tmp_name'], $file['type'], $file['name'])
];

// Отправка в Telegram
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $send_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
$response = curl_exec($ch);
curl_close($ch);

// Подтверждение пользователю
echo '<script>alert("✅ Чек отправлен! Мы свяжемся с вами в Telegram."); window.history.back();</script>';
?>