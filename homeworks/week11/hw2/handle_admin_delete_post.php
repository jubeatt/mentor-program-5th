<?php
  require_once('conn.php');
  session_start();

  // 防止訪客刪除 or 沒帶 id
  if (empty($_SESSION['username']) || empty($_POST['id'])) {
    header('Location: index.php');
    die();
  }

  $post_id = $_POST['id'];

  $sql = "UPDATE posts SET is_deleted=1 WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $post_id);
  $stmt->execute();

  // 刷新
  header('Location: admin_posts.php');

?>