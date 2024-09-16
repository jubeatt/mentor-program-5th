<?php
  require_once('conn.php');
  session_start();

  // 防止訪客刪除 or 沒帶 id
  if (empty($_SESSION['username']) || empty($_POST['id'])) {
    header('Location: index.php');
    die();
  }

  $category_id = $_POST['id'];

  $sql = "DELETE FROM categories WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $category_id);
  $stmt->execute();

  // 刷新
  header('Location: admin_categories.php');

?>