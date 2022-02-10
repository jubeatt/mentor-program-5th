<?php
  session_start();
  require_once('./conn.php');

  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = $_POST['password'];

  if (empty($nickname) || empty($username) || empty($password)) {
    header('Location: ./register.php?errorCode=1');
    die();
  }

  // 做雜湊
  $password = password_hash($password, PASSWORD_DEFAULT);

  $sql = "INSERT INTO users(`nickname`, `username`, `password`) VALUES (?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $nickname, $username, $password);
    

  try {
    $result = $stmt->execute();
    // 註冊成功就直接登入
    $_SESSION['username'] = $username;
    header('Location: ./index.php');
  } catch (Exception $e) {
    if ($conn->errno === 1062) {
      header('Location: ./register.php?errorCode=2');
    } else {
      echo 'Caught exception: ',  $e->getMessage(), '<br>';
    }
  }


?>