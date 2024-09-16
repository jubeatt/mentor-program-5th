<?php
  require_once('conn.php');
  session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'domain' => 'localhost',
    'secure' => TRUE,
    'httponly' => TRUE,
    'samesite' => 'Lax'
  ]);
  session_start();

  // 資料不完整
  if (empty($_POST['username']) || empty($_POST['password'])) {
    header('Location: login.php?errorCode=1');
    die();
  }

  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = "SELECT * FROM users WHERE username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);
  $stmt->execute();
  $result = $stmt->get_result();

  // 帳號不對
  if ($result->num_rows === 0) {
    header('Location: login.php?errorCode=2');
    die();
  }

  $row = $result->fetch_assoc();
  // 正確的話
  if (password_verify($password, $row['password'])) {
    // 設定 session
    $_SESSION['username'] = strtolower($username);
    // 導回首頁
    header('Location: index.php');
  } else {
    header('Location: login.php?errorCode=2');
  }
?>