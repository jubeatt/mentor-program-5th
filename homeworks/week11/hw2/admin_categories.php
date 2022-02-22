<?php
  require_once('conn.php');
  session_start();

  // 防止訪客進入
  if (empty($_SESSION['username'])) {
    header('Location: index.php');
    die();
  }

  /*
    分頁製作
    current_page: 目前頁數
    per_page: 一頁顯示幾篇文章
    offset: 略過幾篇文章
  */
  $current_page = 1;
  $per_page = 9;
  $sql = "SELECT COUNT(categories.id) AS total FROM categories";
  $stmt = $conn->prepare($sql);
  $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $total = $row['total'];
  // 總頁數 / 每頁數量（無條件進位）
  $total_page = intval(ceil($total/$per_page));
  if (!empty($_GET['page'])) {
    $current_page = intval($_GET['page']);
  }
  // 防止亂改 page 參數
  if ($current_page > $total_page) {
    $current_page = $total_page;
  }
  if ($current_page < 1) {
    $current_page = 1;
  }
  $offset = ($current_page-1) * $per_page;
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

  <section class="banner banner--admin">
    <h2 class="banner__title">分類管理</h2>
  </section>


  <main class="main">
    <div class="container">

      <div class="d-flex flex-wrap justify-content-center align-items-center mb-5">
        <a class="button-category" href="admin_add_category.php">新增分類</a>
      </div>

      <div class="card mb-5">
        <div class="card-header py-4 fs-4">
          分類列表
        </div>
        <ul class="list-group list-group-flush">
          <?php
            $template = '
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <div>
                %s
              </div>
              <div class="d-flex flex-shrink-0 align-items-center">
                <a href="admin_update_category.php?id=%d" class="btn btn-warning me-1">編輯</a>
                <form method="POST" action="handle_admin_delete_category.php">
                  <input type="hidden" name="id" value="%d">
                  <input type="submit" class="btn btn btn-danger" value="刪除">
                </form>
              </div>
            </li>';
            $sql = "SELECT * FROM categories ORDER BY id DESC LIMIT ? OFFSET ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('ii', $per_page, $offset);
            $stmt->execute();
            $result = $stmt->get_result();
            while ($row = $result->fetch_assoc()) {
              echo sprintf(
                $template,
                htmlspecialchars($row['name']),
                htmlspecialchars($row['id']),
                htmlspecialchars($row['id']),
              );
            }
          ?>
        </ul>
      </div>

      <nav aria-label="Page navigation example">
        <div class="d-flex justify-content-center">
          <ul class="pagination">
            <li class="page-item <?php echo $current_page === 1 ? 'disabled' : '' ?>">
              <a class="page-link" href="admin_categories.php?page=<?php echo $current_page - 1?>">Previous</a>
            </li>
            <?php
              $template = '
              <li class="page-item %s">
                <a class="page-link" href="admin_categories.php?page=%d">%d</a>
              </li>';
              for ($i=1; $i<=$total_page; $i++) {
                echo sprintf(
                  $template,
                  $i === $current_page ? 'active' : '',
                  $i,
                  $i
                );
              }
            ?>
            <li class="page-item <?php echo $current_page === $total_page ? 'disabled' : '' ?>">
              <a class="page-link" href="admin_categories.php?page=<?php echo $current_page + 1?>">Next</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </main>
  
  <footer class="footer bg-dark text-center p-3 text-light">
    Copyright © 2022 Peanu's Blog All Rights Reserved.
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

</body>
</html>