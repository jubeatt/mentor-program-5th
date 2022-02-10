<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');
  $username = $_SESSION['username'];
  $user = getUser($username);
  $nickname = $user['nickname'];
  $content = $_POST['content'];

  // 檢查留言內容
  if (empty($content)) {
    header('Location: index.php?errorCode=1');
    die();
  }

  // 加到資料庫
  $sql = "INSERT INTO comments(`nickname`, `content`) VALUES (?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $nickname, $content);
  

  try {
    $result = $stmt->execute();
    header('Location: index.php');
  } catch (Exception $e) {
    echo '執行失敗：' . $e->getMessage() . '<br>';
    echo '錯誤代碼：' . $conn->errno;
  }
?>