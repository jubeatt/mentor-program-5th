<?php
  require_once('conn.php');
  session_start();

  // 防止訪客刪除 or 沒帶 id
  if (empty($_SESSION['username']) || empty($_POST['id'])) {
    header('Location: index.php');
    die();
  }

  // 檢查內容
  if (empty($_POST['name'])) {  
    header('Location: admin_update_category.php?id=' . $_POST['id'] . '&errorCode=1');
    die();
  }


  $category_name = $_POST['name'];
  $category_id = $_POST['id'];


  $sql = "UPDATE categories SET name=?  WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $category_name, $category_id);
  $stmt->execute();

  // 刷新
  header('Location: admin_categories.php');

?>