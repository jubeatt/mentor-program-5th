<?php
  require_once('./conn.php');
  function generateToken() {
    $s = '';
    for ($i=0; $i<15; $i++) {
      // A ~ Z
      $s .= chr(rand(65,90));
    }
    return $s;
  }

  function getUser($username) {
    global $conn;
    // 從 token 找出對應的 user
    $sql = "SELECT * FROM users WHERE username='$username'";
    try {
      $result = $conn->query($sql);
      if ($result->num_rows > 0) {
        return $result->fetch_assoc();
      }
      return 'No match user';
    } catch (Exception $e) {
      return 'Failed' . $e;
    }
  }

  function escape($unsafe) {
    return htmlspecialchars($unsafe, ENT_QUOTES);
  } 
?>