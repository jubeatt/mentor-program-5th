<?php
  require_once('conn.php');
  session_start();

  // 防止訪客進入
  if (empty($_SESSION['username'])) {
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
    <h2 class="banner__title">新增文章</h2>
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
      <form action="./handle_admin_add_post.php" method="POST">
        <div class="row col-lg-8 mx-lg-auto mb-3">
          <div class="select-box">
            <select name="category" class="form-select" aria-label="Default select example">
              <option value="4" selected>Others</option>
              <?php
                $template = '<option value="%d">%s</option>';
                $sql = "SELECT * FROM categories ORDER BY id DESC";
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $result = $stmt->get_result();
                while ($row = $result->fetch_assoc()) {
                  if ($row['name'] === 'Others') {
                    continue;
                  }
                  echo sprintf($template, $row['id'], htmlspecialchars($row['name']));
                }
              ?>
            </select>
          </div>
        </div>
        <div class="row col-lg-8 mx-lg-auto mb-3">
          <div class="input-group">
            <span class="input-group-text" id="inputGroup-sizing-default">文章標題</span>
            <input type="text" name="title" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
          </div>
        </div>
              
        <div class="row col-lg-8 mx-lg-auto mb-3">
          <div class="input-group">
            <span class="input-group-text">預覽文字</span>
            <textarea class="form-control" name="preview" aria-label="With textarea"></textarea>
          </div>
        </div>

        <div class="row col-lg-8 mx-lg-auto">
          <textarea name="content" id="editor" class="form-control" aria-label="With textarea"></textarea>
        </div>
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