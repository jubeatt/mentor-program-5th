<?php
  require_once('conn.php');
  session_start();

  // 防止訪客修改 or 沒帶 id
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

  <?php require_once('nav.php');?>

  <section class="banner banner--admin">
    <h2 class="banner__title">編輯文章</h2>
  </section>


  <main class="main">
    <div class="container">
      <?php
        // 錯誤訊息 
        if (!empty($_GET['errorCode'])) {
          $template = '
              <div class="row col-lg-8 mx-lg-auto mb-3">
                <div class="text-danger">錯誤：%s</div>
              </div>';
          $msg = 'Error';
          if ($_GET['errorCode'] === '1') {
            $msg = '資料不齊全，請重新輸入';
          }
          echo sprintf($template, $msg);
        }
      ?>
      <form action="./handle_admin_update_post.php" method="POST">

        <?php
          $post_id = $_GET['id'];
          $sql = 
          "SELECT posts.title, posts.content, posts.preview, posts.created_at, categories.name AS category FROM posts
          LEFT JOIN categories ON categories.id = posts.category_id
          WHERE posts.id=? AND posts.is_deleted = 0;";

          // 找出這篇文章的 category
          $stmt = $conn->prepare($sql);
          $stmt->bind_param('s', $post_id);
          $stmt->execute();
          $result = $stmt->get_result();
          $row = $result->fetch_assoc();
          $post_category = $row['category'];
          $post_title = $row['title'];
          $post_content = $row['content'];
          $post_preview = $row['preview'];
        ?>
        <div class="row col-lg-8 mx-lg-auto">
          <div class="mb-3">
            <select name="category" class="form-select" aria-label="Default select example">
              <?php
                // 找出所有 category
                $template = '<option value="%d" %s>%s</option>';
                $sql = "SELECT * FROM categories ORDER BY id DESC";
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $result = $stmt->get_result();
                while ($row = $result->fetch_assoc()) {
                  echo sprintf(
                    $template, $row['id'],
                    $row['name'] === $post_category ? 'selected' : '',
                    htmlspecialchars($row['name'])
                  );
                }
              ?>
            </select>
          </div>
        </div>
        <div class="row col-lg-8 mx-lg-auto">
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">文章標題</span>
            <input type="text" name="title" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" value="<?php echo htmlspecialchars($post_title);?>">
          </div>
        </div>
        <div class="row col-lg-8 mx-lg-auto mb-3">
          <div class="input-group">
            <span class="input-group-text">預覽文字</span>
            <textarea class="form-control" name="preview" aria-label="With textarea"><?php echo htmlspecialchars($post_preview);?></textarea>
          </div>
        </div>
        <div class="row col-lg-8 mx-lg-auto">
          <textarea name="content" id="editor" class="form-control" aria-label="With textarea"><?php echo htmlspecialchars($post_content);?></textarea>
        </div>
        <!-- 文章 id -->
        <input type="hidden" name="id" value="<?php echo $post_id?>">
        <div class="row col-lg-8 mx-lg-auto mt-3">
          <div class="text-end">
            <button type="submit" class="btn btn-warning">送出</button>
          </div>
        </div>
      </form>
    </div>
  </main>
  
  <footer class="footer bg-dark text-center p-3 text-light">
    Copyright © 2022 Peanu's Blog All Rights Reserved.
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
  <script src="./plug-in/ckeditor/ckeditor.js"></script>
  <script>
    ClassicEditor
    .create( document.querySelector( '#editor' ), {
      toolbar: [
        'heading', '|', 'bold', 'italic', 'code',
        'link','bulletedList','numberedList',
        '|','outdent','indent', '|',
        'blockQuote','insertTable','undo',
        'redo','codeBlock'
      ],
      indentBlock:{
        offset: 0.8,
        unit: 'em'
      },
      codeBlock: {
        languages: [
          { language: 'plaintext', label: 'Plain text' },
          { language: 'css', label: 'CSS' },
          { language: 'html', label: 'HTML' },
          { language: 'xml', label: 'XML' },
          { language: 'javascript', label: 'JavaScript' },
          { language: 'json', label: 'JSON' },
          { language: 'bash', label: 'Bash' },
          { language: 'sql', label: 'SQL' },
          { language: 'php', label: 'PHP' },
          { language: 'c', label: 'C' },
          { language: 'c#', label: 'C#' },
          { language: 'diff', label: 'Diff' },
          { language: 'java', label: 'Java' },
          { language: 'python', label: 'Python' },
          { language: 'ruby', label: 'Ruby' },
          { language: 'typescript', label: 'TypeScript' },
        ]
      }
    })
    .catch( error => {
        console.error( error );
    } );
  </script>
</body>
</html>