<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $id = $_GET['id'];


  $username = NULL;
  $user = NULL; 

  if (!empty($_SESSION['username'])){
    $username = $_SESSION['username'];
    $user = getUserFromUserName($username);
  }

  $stmt = $conn -> prepare("SELECT * FROM gma201011_comments WHERE id = ?");
  $stmt -> bind_param("i", $id);
  $result = $stmt -> execute();
  
 
  if (!$result) {
    die ('Error' . $conn -> error);
  }

  $result = $stmt -> get_result();
  $row = $result -> fetch_assoc();

?>

<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>留言板</title>
    <link rel="stylesheet" href="style.css">

  </head>

  <body>
    <header class="warning">
    <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
    </header>
    <main class="board">
      <h1 class = "board__title">編輯留言</h1>
      <?php
        if (!empty($_GET['errCode'])) {
          $code = $_GET['errCode'];
          $msg = 'Error';
          if ($code === '1') {
            $msg = '資料不齊全';
          }
          echo '<h2 class = "error">錯誤：' . $msg . '<h2>';
        }
      ?>
      <?php if ($username) { ?>
        <form class = "board__new-form" method = "POST" action = "handle_update_comment.php">
        <textarea class = "board_textarea" name = "content" row = "5" placeholder="請輸入留言"><?php 
        echo $row['content']?></textarea>
        <input type = "hidden" name = "id" value = "<?php echo $row['id'] ?>" />
        <input class = "board__submit-btn" type = "submit" value = "提交" />
        </form>
      <?php } ?>
    </main>
  </body>
</html>