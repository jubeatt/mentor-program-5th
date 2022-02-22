<?php
  require_once('./conn.php');
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
    <h2 class="banner__title">關於我</h2>
  </section>


  <main class="main">
    <div class="container">
      <div class="post-content">
      <h3 style="margin-left:0px;">關於我</h3><p style="margin-left:0px;">Hi，我是 PeaNu（批努），PeaNu 這個名字是從 PeaNut 來聯想的，因為我很喜歡花生醬 ❤</p><p style="margin-left:0px;">目前的我正在努力轉職，目標是成為一個成為一個厲害的工程師。</p><p style="margin-left:0px;">在踏入這塊領域後，才體會到要成為一個工程師並不是件容易的事情。不過當自己成功做出一樣的東西時，心裡就會感到特別開心，也特別的有成就感。</p><p style="margin-left:0px;">目前學習前端已經有一段時間，還在持續努力加強自己的技術。</p><p style="margin-left:0px;"><strong>讓自己活得開心！是我認為最重要的事情。</strong></p><h3 style="margin-left:0px;">為什麼開始寫部落格？</h3><p style="margin-left:0px;">我相信每個人學習時難免會碰到困難，在這個時代，學習的來源除了書本以及學校之外，網路也是一個你絕不陌生的地方！</p><p style="margin-left:0px;">網路上有各個領域的專家或是分享者，我也從網路上學習到了不少知識。</p><p style="margin-left:0px;">由於自己是一位自學者，所以這期間撞了不少次牆壁，也有陷入苦惱或迷茫的時光。</p><blockquote><p style="margin-left:0px;"><i>唯有自己曾經走過的路，才能更加感同身受。</i></p></blockquote><p style="margin-left:0px;">基於這個想法，希望跟我一樣努力自學的人，能夠少走一些冤望路，往正確的方向前進。</p><p style="margin-left:0px;">另外一方面，也希望將自己學習的過程給記錄下來，累積自己學習的點點滴滴。</p>
      </div>
    </div>

  </main>
  
  <footer class="footer bg-dark text-center p-3 text-light">
    Copyright © 2022 Peanu's Blog All Rights Reserved.
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>
</html>