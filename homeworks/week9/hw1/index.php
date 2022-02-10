<?php
  session_start();
  require_once("./conn.php");
  require_once("./utils.php");
  $username = Null;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUser($username);
    $nickname = $user['nickname'];
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>留言板</title>
  <link rel="stylesheet" href="./css/reset.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.6.0/css/all.min.css" integrity="sha512-ykRBEJhyZ+B/BIJcBuOyUoIxh0OfdICfHPnPfBy7eIiyJv536ojTCsgX8aqrLQ9VJZHGz4tvYyzOM0lkgmQZGw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link rel="stylesheet" href="./css/style.css">
</head>
<body>

  <header class="warning">注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</header>


  <main class="board">
    <div class="board__header">
      <div class="board__top">
        <h1 class="board__title">Comments</h1>
        <div class="board__buttons">
          <?php if (empty($username)) {?>
            <a class="button" href="./login.php">會員登入</a>
            <a class="button" href="./register.php">會員註冊</a>
          <?php } else { ?>
            <a class="button" href="./handle_logout.php">登出</a>
          <?php }?>
        </div>
      </div>

      <form class="board__form" method="POST" action="./handle_add_comments.php">
        <?php
          $msg = 'Error';
          if (!empty($_GET['errorCode'])) {
            if ($_GET['errorCode'] === '1') {
              $msg = '請輸入內容';
            }
            echo '<div class="error-msg">錯誤：' . $msg . '</div>';
          }
        ?>
        <?php if (!empty($username)) {?>
          <div class="greeting">嗨～<?php echo escape($nickname); ?>，今天也來寫點東西吧 (ﾉ>ω<)ﾉ</div>
        <?php }?>
        <div class="input-block">
          <label class="input-block__label" for="content">內容：</label>
          <textarea class="input-block__textarea" name="content" id="content" placeholder="請輸入你的留言..."></textarea>
        </div>
        <?php if (empty($username)) {?>
          <div class="login-please">請先登入</div>
        <?php } else { ?>
          <button class="button">送出</button>
        <?php } ?>
      </form>
    </div>

    <div class="line-break"></div>


    <div class="board__body">

      <?php
        $sql = "SELECT * FROM comments ORDER BY created_at DESC";
        $stmt = $conn->prepare($sql);
        $result = $stmt->execute();
        if (!$result) {
          die('執行失敗，' . $conn->error);
        }
        $result = $stmt->get_result();
        while ($row = $result->fetch_assoc()) {
      ?>
      <div class="card">
        <div class="card__avatar"></div>
        <div class="card__content">
          <div class="card__info">
            <div class="card__author"><?php echo escape($row['nickname']); ?></div>
            <div class="card__time"><?php echo escape($row['created_at']); ?></div>
          </div>
          <div class="card__text"><?php echo escape($row['content']); ?></div>
        </div>
        <div class="card__editor">
          <button><i class="fas fa-pen"></i></button>
          <button><i class="fas fa-trash-alt"></i></button>
        </div>
      </div>
      <?php }; ?>
    </div>
  </main>

  
</body>
</html>