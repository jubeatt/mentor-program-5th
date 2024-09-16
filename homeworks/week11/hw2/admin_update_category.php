<?php
  require_once('conn.php');
  session_start();

  // 防止訪客刪除 or 沒帶 id
  if (empty($_SESSION['username']) || empty($_GET['id'])) {
    header('Location: index.php');
    die();
  }
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

  

  <section class="banner banner--admin">
    <h2 class="banner__title">新增分類</h2>
  </section>

  <?php require_once('nav.php')?>


  <main class="main py-5">
    <div class="container">
      <?php
        // 錯誤訊息 
        if (!empty($_GET['errorCode'])) {
          $template = '
            <div class="row">
              <div class="col-lg-6 mx-auto mb-3">
                <div class="text-danger">錯誤：%s</div>
              </div>
            </div>';
          $msg = 'Error';
          if ($_GET['errorCode'] === '1') {
            $msg = '資料不齊全，請重新輸入';
          }
          echo sprintf($template, $msg);
        }
      ?>
      <form action="./handle_admin_update_category.php" method="POST">
        <div class="row justify-content-center">
          <div class="col-lg-4 mb-lg-0 mb-3">
            <?php
              $category_id = $_GET['id'];
              $sql = "SELECT name FROM categories WHERE id=?";
              $stmt = $conn->prepare($sql);
              $stmt->bind_param('s', $category_id);
              $stmt->execute();
              $result = $stmt->get_result();
              $row = $result->fetch_assoc();
            ?>
            <input 
              type="text"
              name="name"
              class=" form-control"
              placeholder="請輸入分類名稱" 
              value="<?php echo empty($row['name']) ? '' : htmlspecialchars($row['name']);?>">
            <input type="hidden" name="id" value="<?php echo $category_id ?>">
          </div>
          <div class="col-lg-2">
            <button type="submit" class="d-block w-100 btn btn-warning">送出</button>
          </div>
        </div>
      </form>
    </div>
  </main>
  
  <footer class="footer bg-dark text-center p-3 text-light">
    Copyright © 2022 Peanu's Blog All Rights Reserved.
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>
</html>