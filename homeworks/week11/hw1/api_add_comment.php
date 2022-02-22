<?php
  require_once('./conn.php');
  
  header('Content-type: application/json;charset=utf-8');

  // 檢查留言內容
  if (empty($_POST['content']) || empty($_POST['username'])) {
    $json = array(
      "ok" => false,
      "messsage" => "Please input content"
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $content = $_POST['content'];
  $username = $_POST['username'];

  // 加到資料庫
  $sql = "INSERT INTO comments(`username`, `content`) VALUES (?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $username, $content);
  

  try {
    $stmt->execute();
    $json = array(
      "ok" => true,
      "messsage" => '新增成功'
    );
    $response = json_encode($json);
    echo $response;
  } catch (Exception $e) {
    $json = array(
      "ok" => false,
      "messsage" => $e->getMessage()
    );
    $response = json_encode($json);
    echo $response;
  }
?>