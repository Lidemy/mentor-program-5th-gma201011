<?php
  require_once('conn.php');

  function generateToken() {
    $s = '';
    for ($i = 1; $i <= 16; $i++) {
      $s .= chr(rand(65, 90));
    }
    return $s;
  }

  function getUserFromUsername($username) {
    global $conn;
    $sql = sprintf(
      "select * from gma201011_users where username = '%s'",
      $username
    );
    $result = $conn -> query($sql);
    $row = $result -> fetch_assoc();
    return $row;
  }

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }
  
  //$action:update, delete, create
  function hasPermission($user, $action, $comment) {
    if(isset($user)){
      if ($user["permission"] === "ADMIN") {
        return true;
      }
      if ($user["permission"] === "NORMAL") {
        if ($action === "create") return true;
        return ($comment["username"] === $user["username"]);
      }
      if ($user["permission"] === "BANNED") {
        return $action !== "create";
      }
    }
  }
?>
