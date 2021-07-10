<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (
    empty($_POST["username"]) ||
    empty($_POST["password"]) 
    ) {
    header("Location: login.php?errCode=1");
    die();
  }

  $username = $_POST["username"];
  $password = $_POST["password"];

  $sql = 
  "select * from gma201011_users where username = ?";
  $stmt = $conn -> prepare($sql);
  $stmt -> bind_param("s", $username);

  //看是否拿資料成功
  $result = $stmt -> execute();
  if (!$result) {
    die($conn -> error);
  }

  //先判斷有沒有查到使用者
  $result = $stmt -> get_result();//把結果回傳
  if ($result -> num_rows === 0) {
    header("Location: login.php?errCode=2");
    exit();
  }

  $row = $result -> fetch_assoc();
  if (password_verify($password, $row['password'])) {
    $_SESSION['username'] = $username;
    header("Location: index.php");
  } else {
    header("Location: login.php?errCode=2");
  }

?>
