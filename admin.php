<?php
session_start();
$auth_pass = '1234'; // Задай свой пароль

if (isset($_POST['password'])) {
  if ($_POST['password'] === $auth_pass) {
    $_SESSION['admin'] = true;
  } else {
    $error = "❌ Неверный пароль";
  }
}

if (!isset($_SESSION['admin'])) {
  echo '<form method="POST" style="margin-top:60px; text-align:center;">
          <input type="password" name="password" placeholder="Пароль"><br><br>
          <button type="submit">Войти</button>
          '.($error ?? '').'
        </form>';
  exit();
}

$db = new PDO("sqlite:db.sqlite");
$rows = $db->query("SELECT * FROM checks ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Админ-панель</title>
  <style>
    body { background: #111; color: #fff; font-family: sans-serif; padding: 40px; text-align: center; }
    .card { background: #1a1a1a; border-radius: 12px; padding: 20px; margin: 20px auto; max-width: 600px; box-shadow: 0 0 12px #ff2f8b; }
    a, button { background: #ff2f8b; color: white; padding: 10px; margin: 5px; border: none; border-radius: 8px; text-decoration: none; }
    img { max-width: 100%; margin-top: 10px; border-radius: 10px; }
  </style>
</head>
<body>
<h2>Заявки на VIP</h2>
<?php foreach ($rows as $row): ?>
  <div class="card">
    <strong>Имя:</strong> <?= htmlspecialchars($row['name']) ?><br>
    <strong>Telegram:</strong> <?= htmlspecialchars($row['telegram']) ?><br>
    <strong>Комментарий:</strong> <?= htmlspecialchars($row['comment']) ?><br>
    <strong>Дата:</strong> <?= $row['created_at'] ?><br>
    <strong>Статус:</strong> <?= $row['status'] ?><br>
    <?php if ($row['file']): ?>
      <a href="<?= $row['file'] ?>" target="_blank">Посмотреть файл</a>
    <?php endif; ?>
  </div>
<?php endforeach; ?>
</body>
</html>