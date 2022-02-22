<?php
  require_once('conn.php');
  session_start();

  // 防止訪客新增分類
  if (empty($_SESSION['username'])) {
    header('Location: index.php');
    die();
  }

  // 檢查內容
  if (empty($_POST['name'])) {
    header('Location: admin_add_category.php?errorCode=1');
    die();
  }

  $category_name= $_POST['name'];
  $sql = "INSERT INTO categories(name) VALUES(?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $category_name);
  $stmt->execute();
  
  header('Location: admin_categories.php');

?>