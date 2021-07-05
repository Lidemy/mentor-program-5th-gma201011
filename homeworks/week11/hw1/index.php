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
  $user = NULL; 
  //先檢查有沒有東西，再讀取，才不會導致報錯
  if (!empty($_SESSION['username'])){
    $username = $_SESSION['username'];
    $user = getUserFromUserName($username);
  }

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $item_per_page = 5;
  $offset = ($page - 1) * $item_per_page;

  $stmt = $conn -> prepare(
    "SELECT 
    C.id AS id, C.content AS content, C.created_at AS created_at, 
    U.nickname AS nickname, U.username AS username 
    FROM gma201011_comments AS C
    LEFT JOIN gma201011_users AS U ON C.username = U.username
    WHERE C.is_deleted IS NULL
    ORDER BY C.id DESC 
    LIMIT ? OFFSET ?"
  );
  $stmt->bind_param('ii', $item_per_page, $offset);
  $result = $stmt -> execute();
  

  if (!$result) {
    die ('Error' . $conn -> error);
  }

  $result = $stmt -> get_result();

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
        <span class = update-nickname__edit>編輯暱稱</span>
      <?php if ($user && $user['permission'] === "ADMIN") {?>
        <a class = "board__btn" href = "admin.php">管理後台</a>
      <?php } ?>
      <form class = "hide board__update-nickname" method = "POST" action = "update_nickname.php">
        <div class = "update-nickname__column">
          <span class= "update-nickname__title">新的暱稱：</span>
          <input class = "update-nickname__input" type = "text" name = "nickname" />
        </div>
        <input class = "update-nickname__btn" type  = "submit" value = "提交" />
      </form>
      <h3 class = "board__greeting">你好！<?php echo $user['nickname']; ?></h3>
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
      <?php if ($username && !hasPermission($user, 'create', NULL)) { ?>
        <h3 class = "banned__alert">你已被停權</h3>
      <?php } else if ($username) { ?>
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
              <?php echo escape($row['nickname']); ?>
              (@<?php echo escape($row['username']); ?>)
              </div>
              <span class = "card__time">
              <?php echo escape($row['created_at']); ?>
              <!-- 只有 username 符合登入資訊的才會出現編輯留言連結 -->

              <?php if(hasPermission($user, 'update', $row) && $user['permission'] !== "BANNED") {?>
                <a href = "update_comment.php?id=<?php echo $row['id']?>">編輯留言</a>
                <a href = "handle_delete_comment.php?id=<?php echo $row['id']?>">刪除留言</a>
              <? } ?>
              </span>
            </div>
            <p class = "card__content"><?php echo escape($row['content']); ?></p>
            <!-- 縮成一行的原因是：若是有空行會影響文字顯示的效果 -->
          </div>
        </div>
      <?php } ?>
      </section>
      <hr class = "board__hr" color ="#e8e8e8">
      <?php
        $stmt = $conn -> prepare(
          "SELECT count(id) AS count FROM gma201011_comments WHERE is_deleted IS NULL"
        );
        $result = $stmt -> execute();
        $result = $stmt -> get_result();
        $row = $result -> fetch_assoc();
        $count = $row['count'];
        $total_page = ceil($count / $item_per_page);
      ?>
      <div class = "page-info">
        <span>總共有 <?php echo $count ?> 筆留言，頁數：</span>
        <span><?php echo $page ?> / <?php echo $total_page ?></span>
        分頁
      </div>
      <div class = "paginator">
        <?php if ($page != 1) { ?>
          <a href = "index.php?page=1">首頁</a>
          <a href = "index.php?page=<?php echo $page - 1 ?>">上一頁</a>
        <?php } ?>
        <?php if ($page != $total_page) { ?>
          <a href = "index.php?page=<?php echo $page + 1 ?>">下一頁</a>
          <a href = "index.php?page=<?php echo $total_page ?>">最末頁</a>
        <?php } ?>
      </div>
    </main>

    <script>
      var btn = document.querySelector('.update-nickname__edit')
      btn.addEventListener('click', function() {
        var form = document.querySelector('.board__update-nickname')
        form.classList.toggle('hide')
      })
    </script>
  </body>
</html>