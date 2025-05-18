<?php
$db = new PDO("sqlite:db.sqlite");
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$db->exec("CREATE TABLE IF NOT EXISTS checks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  telegram TEXT,
  comment TEXT,
  file TEXT,
  status TEXT DEFAULT 'pending',
  created_at TEXT
)");

$name = $_POST['name'] ?? '';
$telegram = $_POST['telegram'] ?? '';
$comment = $_POST['comment'] ?? '';
$created_at = date('Y-m-d H:i:s');

if (isset($_FILES['check_file'])) {
  $filename = basename($_FILES['check_file']['name']);
  $target = 'uploads/' . time() . '_' . $filename;

  if (!file_exists('uploads')) mkdir('uploads');

  move_uploaded_file($_FILES['check_file']['tmp_name'], $target);

  $stmt = $db->prepare("INSERT INTO checks (name, telegram, comment, file, created_at) VALUES (?, ?, ?, ?, ?)");
  $stmt->execute([$name, $telegram, $comment, $target, $created_at]);

  echo "<script>alert('✅ Заявка отправлена!'); window.location.href='vip.html';</script>";
} else {
  echo "<script>alert('❌ Ошибка: файл не загружен.'); window.history.back();</script>";
}
?>