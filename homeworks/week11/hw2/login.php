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

  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand fw-bold" href="index.php">PeaNu</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 w-100">
          <li class="nav-item">
            <a class="nav-link" href="category.php">文章分類</a>
          </li>
          <li class="nav-item me-lg-auto">
            <a class="nav-link" href="about.php">關於我</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="login.php">登入</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <section class="banner banner--admin">
    <h2 class="banner__title">登入</h2>
  </section>


  <main class="main">
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
          } else if ($_GET['errorCode'] === '2') {
            $msg = '帳號或密碼不正確';
          }
          echo sprintf($template, $msg);
        }
      ?>
      <form action="handle_login.php" method="POST">
        <div class="row">
          <div class="col-lg-6 mx-auto mb-3">
            <input type="text" name="username" class="form-control" placeholder="請輸入帳號">
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 mx-auto mb-3">
            <input type="password" name="password" class="form-control" placeholder="請輸入密碼">
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 mx-auto mb-3">
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