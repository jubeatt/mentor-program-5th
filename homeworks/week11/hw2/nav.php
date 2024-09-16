<?php
  $username = null;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }
?>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand fw-bold" href="index.php">PeaNu</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 w-100">
        <li class="nav-item">
          <a class="nav-link 
          <?php
            if (str_contains($_SERVER['REQUEST_URI'], '/categories.php')) { 
              echo 'active';
            } 
          ?>" 
          href="categories.php">文章分類</a>
        </li>
        <li class="nav-item me-lg-auto">
          <a class="nav-link
          <?php
            if (str_contains($_SERVER['REQUEST_URI'], '/about.php')) { 
              echo 'active';
            }
          ?>"
          href="about.php">關於我</a>
        </li>
        <?php if (empty($username)) { ?>
          <li class="nav-item">
            <a class="nav-link" href="login.php">登入</a>
          </li>
        <?php } else { ?>
          <li class="nav-item">
            <a class="nav-link
            <?php
              if (str_contains($_SERVER['REQUEST_URI'], '/admin.php')) { 
                echo 'active';
              } 
            ?>" 
            href="admin.php">後台管理</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="handle.logout.php">登出</a>
          </li>
        <?php } ?>
      </ul>
    </div>
  </div>
</nav>