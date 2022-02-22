<?php
  require_once('./conn.php');
  $limit = 10;
  $offset = 0;
  
  if (!empty($_GET['limit'])) {
    $limit = intval($_GET['limit']);
  }
  if (!empty($_GET['offset'])) {
    $offset = intval($_GET['offset']);
  }

  $sql = 
    "SELECT users.username, users.nickname, comments.content, comments.created_at, comments.id, comments.is_deleted
    FROM comments LEFT JOIN users ON comments.username=users.username
    WHERE comments.is_deleted IS null
    ORDER BY comments.id DESC LIMIT ? OFFSET ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii', $limit, $offset);
  $result = $stmt->execute();
  if (!$result) {
    die('執行失敗，' . $conn->error);
  }
  $result = $stmt->get_result();

  $comments = array();
  while ($row = $result->fetch_assoc()) {
    array_push($comments, array(
        "id" => $row['id'],
        "username" => $row['username'],
        "nickname" => $row['nickname'],
        "content" => $row['content'],
        "created_at" => $row['created_at']
      )
    );
  }
  $json = array(
    "comments" => $comments
  );
  $response = json_encode($json);
  header('Content-type: application/json;charset=utf-8');
  echo $response;
?>