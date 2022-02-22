<?php
  require_once('conn.php');
  session_start();
  
  // 沒帶 id，導回首頁
  if (empty($_GET['id'])) {
    header('Location: index.php');
    die();
  }

  $username = null;

  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

  $post_id = $_GET['id'];
  $sql = 
  "SELECT posts.title, posts.content, posts.created_at, posts.category_id, categories.name AS category FROM posts
  LEFT JOIN categories ON categories.id = posts.category_id
  WHERE posts.id=? AND posts.is_deleted = 0;";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $post_id);
  $stmt->execute();
  $result = $stmt->get_result();

  // 找不到對應文章，導回首頁
  if ($result->num_rows === 0) {
    header('Location: index.php');
    die();
  }

  $row = $result->fetch_assoc();
  
  // 取出所需資料
  $title = htmlspecialchars($row['title']);
  $category_id = htmlspecialchars($row['category_id']);
  $category = htmlspecialchars($row['category']);
  $content = $row['content'];
  $date = htmlspecialchars($row['created_at']);


  // 用 SQL 做日期格式
  $format = '%Y年%c月%e日';
  $sql = "SELECT DATE_FORMAT(?, ?) AS formated";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $date, $format);
  $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $created_at = htmlspecialchars($row['formated']);

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PeaNu's Blog</title>
  <!-- font-awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <!-- bootstrap -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <!-- highlight -->
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/agate.min.css">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <?php require_once('nav.php'); ?>

  <section class="banner">
    <h2 class="banner__title"><?php echo $title;?></h2>
  </section>


  <main class="main">
    <div class="container">
      <div class="post-header-item">
        <i class="far fa-calendar-alt"></i>
        日期：<?php echo $created_at;?>
      </div>
      <div class="post-header-item">
        <i class="fas fa-tag"></i>
        分類：<a href="filter.php?category_id=<?php echo  $category_id;?>"><?php echo $category;?></a>
      </div>
      <div class="line-break"></div>
      <div class="post-content"><?php echo $content;?></div>
    </div>

  </main>

  <footer class="footer bg-dark text-center p-3 text-light">
    Copyright © 2022 Peanu's Blog All Rights Reserved.
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/highlight.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/highlightjs-line-numbers.js/2.8.0/highlightjs-line-numbers.min.js"></script>

  <script>
    hljs.highlightAll();
    hljs.initLineNumbersOnLoad({
      singleLine: true
    });
  </script>
</body>
</html>