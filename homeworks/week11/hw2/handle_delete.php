<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (
    empty($_GET["id"]) 
    ) {
    header("Location: admin.php?errCode=1");
    die("資料不齊全");
  }

  if (empty($_SESSION['username'])) {
    header('Location:index.php');
    exit();
  }

  $id = $_GET['id'];

  $sql = "UPDATE gma201011_posts SET is_deleted = 1 WHERE id = ?";

  $stmt = $conn -> prepare($sql);
  $stmt -> bind_param('i', $id);

  $result = $stmt -> execute();
  if (!$result) {
    die($conn -> error);
  }

  header("Location: admin.php");

?>
