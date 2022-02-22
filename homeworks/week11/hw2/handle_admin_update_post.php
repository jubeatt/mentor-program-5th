<?php
  require_once('conn.php');
  session_start();

  // 防止訪客修改 or 沒帶 id
  if (empty($_SESSION['username']) || empty($_POST['id'])) {
    header('Location: index.php');
    die();
  }

  // 檢查內容
  if (
    empty($_POST['title']) ||
    empty($_POST['content']) ||
    empty($_POST['preview']) ||
    empty($_POST['category'])
  ) {  
    header('Location: admin_update_post.php?id=' . $_POST['id'] . '&errorCode=1');
    die();
  }


  $post_id = $_POST['id'];
  $post_title = $_POST['title'];
  $post_content = $_POST['content'];
  $post_preview = $_POST['preview'];
  $post_category_id = $_POST['category'];



  $sql = "UPDATE posts SET title=?, content=?, preview=?, category_id=? WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sssss', $post_title, $post_content, $post_preview, $post_category_id, $post_id);
  $stmt->execute();

  // 刷新
  header('Location: admin_posts.php');

?>