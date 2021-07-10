<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (
    empty($_GET["id"])||
    empty($_GET["permission"])
    ) {
    die("發生錯誤");
  }
  

  $username = $_SESSION['username'];
  $user = getUserFromUserName($username);
  $id = $_GET['id'];
  $permission = $_GET["permission"];

  if (!$user || $user['permission'] !== "ADMIN") {
    header('Location:admin.php');
    exit();
  }


  $sql = "UPDATE gma201011_users SET permission = ? WHERE id = ?";
  $stmt = $conn -> prepare($sql);
  $stmt -> bind_param('si', $permission, $id);


  $result = $stmt -> execute();
  if (!$result) {
    die($conn -> error);
  }

  header("Location: admin.php");

?>
