<?php
session_start();
require_once("conn.php");
require_once("utils.php");

/*
驗證 token 是否對應到 username:
1.從 cookie 讀取 PHPSESSID(token)
2.從檔案讀取 session id 的內容
3.放到 $_SESSION
*/
$username = NULL; 
//先檢查有沒有東西，再讀取，才不會導致報錯
if (!empty($_SESSION['username'])){
  $username = $_SESSION['username'];
}

if (!empty($_COOKIE['username'])) {
  $username = $_COOKIE['username'];
}

$result = $conn -> query("select * from gma201011_comments order by id desc");

if (!$result) {
  die ('Error' . $conn_error);
}
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
  <?php if (!$username) { ?>
  <a class = "board__btn" href = "register.php">註冊</a>
  <a class = "board__btn" href = "login.php">登入</a>
  <?php } else { ?>
    <a class = "board__btn" href = "logout.php">登出</a>
    <h3 class = "board__greeting">你好！<?php echo $username; ?></h3>
    <?php } ?>
  <h1 class = "board__title">Comments</h1>
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
    <form class = "board__new-form" method = "POST" action = "handle_add_comment.php">
    <textarea class = "board_textarea" name = "content" row = "5" placeholder="請輸入留言"></textarea>
    <input class = "board__submit-btn" type = "submit" value = "提交" />
    </form>
  <?php } else { ?>
    <h3 class = "login__alert">請登入發布留言</h3>
  <?php } ?>
  <hr class = "board__hr" color ="#e8e8e8">
  <section>
    <?php
      while ($row = $result -> fetch_assoc()) {

    ?>
    <div class = "card">
      <div class = "card__avatar"></div>
      <div class = "card__body">
        <div class = "card__info">
          <div class = "card__author">
          <?php echo $row['nickname']; ?>
          </div>
          <span class = "card__time">
          <?php echo $row['created_at']; ?>
          </span>
        </div>
        <p class = "card__content"><?php echo $row['content']; ?></p>
        <!-- 縮成一行的原因是：若是有空行會影響文字顯示的效果 -->
      </div>
    </div>
  <?php } ?>
  </section>
</main>
</body>
</html>