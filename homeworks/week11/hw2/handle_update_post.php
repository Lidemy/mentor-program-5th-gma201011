<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (
    empty($_GET["id"]) ||
    empty($_POST["content"])||
    empty($_POST["title"])
  ) {
    header("Location:" . $_SERVER['HTTP_REFERER']);
    die("資料不齊全");
  }

  if (empty($_SESSION['username'])) {
    header('Location:index.php');
    exit();
  }

  $id = $_GET['id'];
  $content = $_POST["content"];
  $title = $_POST["title"];

  $sql = "UPDATE gma201011_posts SET title = ?, content = ? WHERE id = ?";

  $stmt = $conn -> prepare($sql);
  $stmt -> bind_param('ssi', $title, $content, $id);

  $result = $stmt -> execute();
  if (!$result) {
    die($conn -> error);
  }
  
  header("Location:post.php?id=".$id);

?>
