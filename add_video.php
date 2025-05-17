<?php
$file = 'videos.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = strip_tags($_POST['title']);
    $url = strip_tags($_POST['url']);

    if ($title && $url) {
        $videos = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
        $videos[] = ["title" => $title, "url" => $url];
        file_put_contents($file, json_encode($videos, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        echo "<h3 style='color:lime;'>✅ Видео добавлено!</h3>";
    } else {
        echo "<h3 style='color:red;'>Ошибка: заполните все поля</h3>";
    }
}
?>
<a href="admin.html" style="color:#ff2f8b;">Вернуться</a>