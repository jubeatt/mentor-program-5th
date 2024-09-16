<?php
  require_once('conn.php');
  session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PeaNu's Blog</title>
  <!-- bootstrap -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>


  <?php require_once('nav.php'); ?>

  <section class="banner">
    <h2 class="banner__title">文章分類</h2>
  </section>


  <main class="main">
    <div class="container">
      <div class="row category-buttons-wrap">
        <?php
          $template = '
          <a href="filter.php?category_id=%s" class="btn category-button ms-3 mb-3">
            %s <span class="badge">%s</span>
          </a>
          ';

          // 撈出所有 category
          $sql = "SELECT * FROM categories ORDER BY id DESC";
          $stmt = $conn->prepare($sql);
          $stmt->execute();
          $result = $stmt->get_result();
          while ($row = $result->fetch_assoc()) {
            // 儲存 category_id  category_name
            $category_id = htmlspecialchars($row['id']);
            $category_name = htmlspecialchars($row['name']);

            // 查詢 category 數量
            $sql = "SELECT COUNT(category_id) AS total FROM posts WHERE posts.category_id=? AND is_deleted=0";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('s', $category_id);
            $stmt->execute();
            $result_for_category_total = $stmt->get_result();
            $row = $result_for_category_total->fetch_assoc();
            $category_total = $row['total'];


            echo sprintf(
              $template,
              $category_id,
              $category_name,
              $category_total
            );
          }
        ?>
      </div>
    </div>

  </main>
  
  <footer class="footer bg-dark text-center p-3 text-light">
    Copyright © 2022 Peanu's Blog All Rights Reserved.
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>
</html>